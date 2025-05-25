const express = require('express');
const Project = require('../models/Projects');
const router = express.Router();

router.put('/editProject/:id', async(req,res)=>{
    console.log(req.body)
})