import express from 'express'
import {User} from '../models/user.model.js'

const router=express.Router();


/*1st route that handles incoming http get request 

means if we have the route 'localhost:5000/users/'
then this get request url will perform the specified action

*/
router.route('/').get((req,res)=>{
   User.find()  /*find method returns a promise */
   .then(users=>res.json(users))
   .catch(err=>res.status(400).json('Error '+err));
});


router.route('/add').post((req,res)=>{
    console.log(req.body.username)
    const username=req.body.username;
    const newUser=new User({username});
    newUser.save()
    .then(()=>res.json('User added! '))
    .catch(err=>res.status(400).json('Error '+err));
})


export default router;