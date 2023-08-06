import express from 'express'
import {Exercise} from '../models/exercise.model.js'

const router =express.Router();


       /*get all the data of exercises */

      router.route('/').get((req,res)=>{
      Exercise.find()
      .then(exerxises=>res.json(exerxises))
      .catch(err=>res.status(400).json('Error : '+err))
     });         
        
 /*------------------------------------------------------ */
        
        


      /*get the data of a particular exercise */

      router.route('/:id').get((req,res)=>{
        Exercise.findById(req.params.id)
        .then(exercise=>res.json(exercise))
        .catch(err=>res.status(400).json('Error : '+err))
      });


/*------------------------------------------------------ */


      /*delete a particular exercise */

      router.route('/:id').delete((req,res)=>{
        Exercise.findByIdAndDelete(req.params.id)
        .then(()=>res.json('Exercise deleted'))
        .catch(err=>res.status(400).json('Error: '+err))
      })

/*------------------------------------------------------ */



              /*add an exercise */
    router.route('/add').post((req,res)=>{
      const username=req.body.username;
      const description=req.body.description;
      const duration =Number(req.body.duration);
      const date=Date.parse(req.body.date);


      const newExercise=new Exercise({
          username,
          description,
          duration,
          date,
      })

      newExercise.save()
      .then(()=>res.json('Ecercise added!'))
      .catch(err=>res.status(400).json('Error'+err))

    })
  
/*------------------------------------------------------ */



       

       /*Update the data of a particular exercise */

    router.route('/update/:id').post((req,res)=>{

        Exercise.findById(req.params.id)
        .then(exercise=>{
            exercise.username=req.body.username;
            exercise.description=req.body.description;
            exercise.duration=Number(req.body.duration);
            exercise.date=Date.parse(req.body.date);
            
            exercise.save()
            .then(()=>res.json('Exercise updated successfulyy!'))
            .catch(err=>res.status(400).json('Error: '+err))
        })
        .catch(err=>res.status(400).json('Error: '+err));

    });

     /*------------------------------------------------------ */

  

export default router;