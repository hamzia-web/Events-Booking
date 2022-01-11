const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const User = require('../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

let JWT_SECRET_KEY = 'ssshhh';
/*
     Usage: Register a user
     url: https://localhost:5000/users/register
     method: POST
     fields: name, email, password
 */
// async-await ES8 feature
router.post('/register',[
  body('name').notEmpty().withMessage('Name required'),
  body('email').notEmpty().withMessage('Email required'),
  body('password').notEmpty().withMessage('Password required')
], async (request, response) =>{
  try {
    let errors = validationResult(request)
    if(!errors.isEmpty()){
      response.status(401).json({
        errors: errors.array()
      })
    }

    // Get Form Data
    let {name, email, password} = request.body;
    console.log(`Register Form Data, ${JSON.stringify({name, email, password})}`)

    // Check user already exist or not[email is unique]
    let user = await User.findOne({email: email})
    if(user)
    {
      return response.status(401).json({
        errors: [
          {
            msg: 'User already exist'
          }
        ]
      })
    }

    // Convert to Hashed password
    let salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt)
    console.log(`Hashed Password: ${password}`)

    // Get avatar url
    let avatar = gravatar.url(email, {
      s : '200',
      r : 'G',
      d : 'mm'
    })
    console.log(`Gravatar image url: ${avatar}`)

    // make isAdmin false
    let isAdmin = false;

    // Save to DB
    user = new User({name, email, password, avatar ,isAdmin})
    user = await user.save(); // Save to DB
    response.status(200).json({
      result: 'Registration successful',
      user: user
    })
  }
  catch (error){
    response.status(500).json({
      error: error
    })
  }
})

/*
     Usage: Login a user
     url: https://localhost:5000/users/login
     method: POST
     fields: email, password
 */
// async-await ES8 feature
router.post('/login', [
      body('email').notEmpty().withMessage('Email required'),
      body('password').notEmpty().withMessage('Password required')
  ],
  async (request, response) =>{
  try {
     let errors = validationResult(request)
     if(!errors.isEmpty())
     {
         response.status(401).json({
         errors: errors.array()
       })
     }
    // Get form data
    let {email, password} = request.body
    console.log(`Login Form Data, ${JSON.stringify({email, password})}`)

    //Check user exist or not
    let user = await User.findOne({email: email})
    if(!user)
    {
      return response.status(401).json({
        errors: [
          {
            msg: 'Invalid credential'
          }
        ]
      })
    }
    // Password match or not
    let isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
      return response.status(401).json({
        errors: [
          {
            msg: 'Invalid credential'
          }
        ]
      })
    }

    // Allow login and create a JWT token and send to client
    let payload = {
      user: {
        id: user.id,
        name: user.name
      }
    }

    jwt.sign(payload, JWT_SECRET_KEY, (error, token) =>{
       if(error) throw error
      response.status(200).json({
        result: 'Login successful',
        token: token,
        user: user
      })
    })
  }
  catch (error){
    response.status(500).json({
      error: error
    })
  }
})

module.exports = router;
