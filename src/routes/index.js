const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');

router.get('/',(req,res)=>{
    res.render('index');
});

module.exports =  router;