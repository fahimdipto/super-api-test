import supertest from "supertest";
const faker = require('faker')
const request = supertest("https://gorest.co.in/public/v1/")
const TOKEN = '8040fa6af27e1ea2713ee68054c9540edef06954c1beef8291fcf00b7b99ceb7';

export const CreateUserForPost = async()=>{
    const userData = {
        email: faker.internet.email(),name: faker.name.firstName(),gender: "male",status: "active"
    } 
     const res =await request.post('users').set('Authorization', `Bearer ${TOKEN}`).send(userData)
     console.log(res.body.data.id)
        return  res.body.data.id;
}