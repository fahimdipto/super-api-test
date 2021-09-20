import request from "../config/commmon";
import  {expect} from 'chai';
require ('dotenv').config();
const faker = require('faker');
import { CreateUserForPost } from "../helper/user_helper";
const TOKEN = process.env.USER_TOKEN;
describe ('Users Posts',()=>{
  let postId,userId; 
  before (async()=>{
  userId = await CreateUserForPost();
  })
it ('/posts',  async()=>{
    const data = {
      user_id: userId,title: faker.lorem.sentence(),body: faker.lorem.paragraph() }
      
     const postRes = await request.post('posts').set('Authorization', `Bearer ${TOKEN}`).send(data)
      postId=postRes.body.data.id;
      console.log(postRes.body)
       expect(postRes.body.data).to.deep.include(data);
   });

  it ('GET /posts/:id',async()=>{
    await request.get(`posts/${postId}`).set('Authorization', `Bearer ${TOKEN}`)
    .expect(200);
  });
describe ("Negatuve Test",()=>{
  it("401 Authentication Failed",async()=>{
    const data = {
      user_id: userId,title: faker.lorem.sentence(),body: faker.lorem.paragraph() }
     const postRes = await request.post('posts').send(data).expect(401)
     expect(postRes.body.data.message).to.eq('Authentication failed');
  }); 
  it("422 Validation Failed",async()=>{
    const data = {
      user_id: null,title:faker.lorem.paragraph(),body: faker.lorem.paragraph() }
     const postRes = await request.post('posts').set('Authorization', `Bearer ${TOKEN}`).send(data).expect(422)
     expect(postRes.body.data[0].message).to.eq("must exist");
  }); 
});
});