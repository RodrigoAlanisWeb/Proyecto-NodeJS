const express = require('express');
const mongoose =  require('mongoose');
const path =  require('path');
const multer = require('multer');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();

// Multer configuration

const storage = multer.diskStorage({
    destination: path.join(__dirname,'public'),
    filename: (req,file,cb)=>{
        cb(null,file.originalname);
    },
})

const uploads =  multer({
    storage,
    fileFilter:(req,file,cb)=>{
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));

        if (mimetype && extname) {
            return cb(null,true);
        } else {
            return cb('Error: El archivo debe ser una imagen valida');
        }
    }
}).single('image');

// conection

mongoose.connect('mongodb://localhost:27017/app-posts',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Settings

app.set('port',3000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

// middlewares

app.use(morgan('dev'));
app.use(uploads);
app.use('/statics',express.static(__dirname + '/statics'));
app.use('/public',express.static(__dirname + '/public'));
app.use(cookieParser());

// Router

app.use(require('./routes/index'));

// Start The Server
app.listen(app.get('port'),()=>{
    console.log(`Server On Port ${app.get('port')}`);
})
