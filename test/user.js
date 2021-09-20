import supertest from "supertest";
import  {expect} from 'chai';
const faker = require('faker')
const request = supertest("https://gorest.co.in/public/v1/")
const TOKEN = '8040fa6af27e1ea2713ee68054c9540edef06954c1beef8291fcf00b7b99ceb7';
describe ('Users',()=>{
    let UserID;
    it ('GET /users', ()=>{
           return request
            .get(`users?access-token=${TOKEN}`).then((res)=>{
                expect(200)
                expect(res.body.data).to.not.be.empty;   
            });
    });
    it ('GET / Specific users ', ()=>{
       
           return request.get(`users/313?access-token=${TOKEN}`).then((res)=>{
                expect(200) 
                expect(res.body.data.id).to.be.eq(313);   
            });
    });
    it ('GET /users with query params', ()=>{

        const url=`users?access-token=${TOKEN}&page=5&gender=female&status=active`
       
        return request.get(url).then((res)=>{
            expect(200)
             console.log(res.body);  
             expect(res.body.data).to.not.be.empty;
             res.body.data.forEach(data => {
                 expect(data.gender).to.be.eq('female')
                 expect(data.status).to.be.eq('active') 
             }); 
             //console.log(res.body.meta)
             expect(res.body.meta.pagination.page).to.be.eq(5)
         });
 });
 it ('Post /users ', ()=>{
    const data = {
        email: faker.internet.email(),name: faker.name.firstName(),gender: "male",status: "active"
    } 
    return request.post('users').set('Authorization', `Bearer ${TOKEN}`).send(data).then((res)=>{
   // return request.post(`users?access-token=${TOKEN}&email=fahimali3@gmail.com&name=hasibali&gender=male&status=active`).then((res)=>{
        expect(201)
        expect(res.body.data).to.deep.include(data);
        UserID= res.body.data.id;
     });
});
it ('Put /users/:id ', ()=>{
    const editdata = {
    
        gender: "female",
        status: "active"
    }
    return request.put('users/313').set('Authorization', `Bearer ${TOKEN}`).send(editdata).then((res)=>{
        if (res.status==200){
            console.log("Test Passed")
         }
         else{
            console.log("Test Failed")
         }
         
         expect(res.body.data).to.deep.include(editdata);
     });
});
it ('Delete /users/:id ', ()=>{
    return request.delete(`users/${UserID}?access-token=${TOKEN}`).then((res)=>{
        expect(204)
         expect(res.body.data).to.be.undefined
     });
    });
});