import request from "../config/commmon";
const faker = require('faker')
import  {expect} from 'chai';
const TOKEN = '8040fa6af27e1ea2713ee68054c9540edef06954c1beef8291fcf00b7b99ceb7';
describe ('Users',()=>{
    let userId;
    describe ('POST',()=>{
    it ('Post /users ', ()=>{
        const data = {
            email: faker.internet.email(),name: faker.name.firstName(),gender: "male",status: "active"
        } 
        return request.post('users').set('Authorization', `Bearer ${TOKEN}`).send(data).then((res)=>{
            userId=res.body.data.id;
            console.log(userId)
            if (res.status==201){ console.log("Test Passed") }
             else{console.log("Test Failed") }         
             expect(res.body.data).to.deep.include(data);
         });
    });
});
describe ('GET',()=>{
    it ('all users', ()=>{
           return request
            .get(`users?access-token=${TOKEN}`).then((res)=>{
                expect(200)
                expect(res.body.data).to.not.be.empty; });
    });
    it (' Specific users ', ()=>{
           return request.get(`users/${userId}?access-token=${TOKEN}`).then((res)=>{
                 expect(200)
                expect(res.body.data.id).to.be.eq(userId);    });
    });
    it ('users with query params', ()=>{
        const url=`users?access-token=${TOKEN}&page=5&gender=female&status=active`
        return request.get(url).then((res)=>{
                expect(200)
             console.log(res.body);  
             expect(res.body.data).to.not.be.empty;
             res.body.data.forEach(data => {
                 expect(data.gender).to.be.eq('female')
                 expect(data.status).to.be.eq('active') 
             }); 
             expect(res.body.meta.pagination.page).to.be.eq(5)
         });
 });
});
describe ('Put test',()=>{
it ('Put /users/:id ', ()=>{
    const editdata = {
        gender: "female", status: "active"
    }
    return request.put(`users/${userId}`).set('Authorization', `Bearer ${TOKEN}`).send(editdata).then((res)=>{
        expect(200)
         expect(res.body.data).to.deep.include(editdata);  });
});
});
describe ("Delete user",()=>{
it ('users/:id ', ()=>{
    return request.delete(`users/${userId}?access-token=${TOKEN}`).then((res)=>{
        expect(204)
         console.log(res.body)
         expect(res.body.data).to.be.undefined
     });
    });
});
});
