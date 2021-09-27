const express=require('express')
const router =express.Router()
const Person=require("../models/personSchema.js")


router.post("/newPerson",(req,res)=>{
  Person.create(req.body).then((data)=>
    res.send(data))
    .catch((err)=>res.send(err))
})

router.get("/getpersonbyname/:salma",(req, res) => {
    Person.find({name:req.params.name},(err,data)=>{
        if (err) throw err;
        else 
        res.json(data);
    });
   });


router.put("/edit/:id",(req,res)=>{
  Person.findById(req.params.id,(err,data)=>{
    if (err) throw err 
    else{
      data.favoriteFood.push("sushi")
      data.save((err,Person)=>{
        if (err) throw err
        else res.json(person)
      })
    }
  })
})

router.put("/findedit/:id",(req,res)=>{
  Person.findByIdAndRemove(req.params.id,(err,data)=>{
    if (err) throw err
    else res.send("deleted")
  })
})

router.get("/listperson",(req,res)=>{
  Person.find({favoriteFood:{$all:["sandwich"]}})
  .sort({name:"alm"})
  .limit(2)
  .select("-age")
  .exec((err,data)=>{
    if (err) throw err 
    else res.json(data)
  })
})
module.exports=router ;