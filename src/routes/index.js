const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const Post = require('../models/post');
const User = require('../models/user');
const Categoria = require('../models/categoria');

router.get('/', async (req, res) => {
    const data = await Post.find().limit(7);
    const cats =  await Categoria.find();
    const { cookies } = req;
    if ('name' in cookies){
        res.render('index', { data ,cats,log: true,cookies });
        console.log(cookies);
    } else {
        res.render('index', { data ,log: ''});
    }
});

router.post('/create-user', async (req, res) => {
    let body = req.body;
    if (body.name != '' && body.nick_name != '' && body.email != '' && body.password != '') {
        var password = await bcrypt.hash(body.password,10);

        if (body.file) {
            const user = new User({
                'name': req.body.name,
                'nick_name': req.body.nick_name,
                'email': req.body.email,
                'password': password,
                'image': req.file.originalname,
            });
            await user.save();
            res.redirect('/');
        } else {
            const user = new User({
                'name': req.body.name,
                'nick_name': req.body.nick_name,
                'email': req.body.email,
                'password': password,
            });
            await user.save();
            res.redirect('/');
        }


    } else {
        res.redirect('/');
    }
});

router.post('/login', async (req, res) => {
    const user = await User.find({ 'email': req.body.email });
    if (user != []) {
        let verification = await bcrypt.compare(req.body.password,user[0].password);

        if (verification) {
            res.cookie('id',user[0].id);
            res.cookie('name',user[0].name);
            res.cookie('nick',user[0].nick_name);
            res.cookie('email',user[0].email);
            res.cookie('image',user[0].image);
            res.redirect('/');
        } else {
            res.redirect('/');
        } 
    }  
})

router.get('/logout',(req,res)=>{
    res.clearCookie('id');
    res.clearCookie('name');
    res.clearCookie('email');
    res.clearCookie('nick');
    res.clearCookie('image');
    res.redirect('/')
})

router.get('/create-post',async (req,res)=>{
    const cats =  await Categoria.find();
    const data = await Categoria.find(); 
    console.log(data);
    const { cookies } = req;
    if ('name' in cookies){
        res.render('create-post', {data,cats,log: true,cookies });
    } else {
        res.redirect('/')
    }
});

router.post('/save-post/:user',async (req,res)=>{
    const post = new Post({
        'title': req.body.title,
        'description': req.body.description,
        'categoria': req.body.categoria,
        'user': req.params.user,
    });
    await post.save();

    res.redirect('/');
})

router.get('/create-cat',async (req,res)=>{ 
    const cats =  await Categoria.find();
    const { cookies } = req;
    if ('name' in cookies){
        res.render('create-cat',{cats,log: true,cookies });
    } else {
        res.redirect('/')
    }
});

router.post('/save-cat',async (req,res)=>{
    const cat = new Categoria({
        'name': req.body.name,
    });
    await cat.save();

    res.redirect('/');
});

router.get('/src/:id',async (req,res)=>{
    const cats =  await Categoria.find();
    const post = await Post.findById(req.params.id);
    res.render('post',{cats,post,log: ''});
})

module.exports = router;