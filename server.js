const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const app = express();
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
app.use(cors());
app.use(bodyParser.json());
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'postgres',
    database : 'face'
  }
});

app.get('/',(req, res) => {res.send('Hello World')})
app.post('/signin',(req, res) =>{signin.handleSignin(req,res,db,bcrypt)})
app.post('/register',(req,res) =>{register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res) =>{profile.handleProfileGet(req,res,db)})
app.put('/image', (req,res) =>{image.handleImage(req,res,db)})
app.post('/imageurl', (req,res) =>{image.handleApiCall(req,res)})

app.listen(3001,()=> {
	console.log('port running 3001');
})