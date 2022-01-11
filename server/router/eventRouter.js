const express = require('express');
const router = express.Router();
const {check, validationResult, body} = require('express-validator');
const Event = require('../models/Event')
const authenticate = require('../middleware/authenticate')

/*
     Usage: Free event
     url: https://localhost:5000/events/free
     method: GET
     fields: no-fields
     Access: Public
 */

router.get('/free', async (request, response) =>{
  try {
    let event = await Event.find({type: 'FREE'});
    response.status(200).json(event)
  }
  catch (error){
    response.status(500).json({
      errors : [
        {
          msg: error.message
        }
      ]
    })
  }
})

/*
     Usage: Pro event
     url: https://localhost:5000/events/free
     method: GET
     fields: no-fields
     Access: Private[Authentication(logged in user)]
 */
router.get('/pro', authenticate.verifyToken ,async (request, response) =>{
  try {
    let event = await Event.find({type: 'PRO'});
    response.status(200).json(event)
  }
  catch (error){
    response.status(500).json({
      errors : [
        {
          msg: error.message
        }
      ]
    })
  }
})

/*
     Usage: Upload event
     url: https://localhost:5000/events/upload
     method: POST
     fields: name, image, date, price, type, info
     Access: Private[Authentication(logged in user) + Authorization(must be admin)]
 */
router.post('/upload',
  [ // Server side form validations
    body('name').notEmpty().withMessage('Event Name is required'),
    body('image').notEmpty().withMessage('Image URL is required'),
    body('date').notEmpty().withMessage('Event Date is required'),
    //body('price').notEmpty().withMessage('Event Price is required'),
    body('type').notEmpty().withMessage('Event Type is required'),
    body('info').notEmpty().withMessage('Event Info is required'),
  ],
  async (request, response) =>{
  try {
    let errors = validationResult(request)
    if(!errors.isEmpty()){
      response.status(401).json({
        errors: errors.array()
      })
    }

    //Get form data
    let {name, image, date, type, info} = request.body;
    console.log(`Upload Event Form Data, ${JSON.stringify({name, image, date, type, info})}`)

    // Check price is coming from UI or not, Since price is optional for Free events
    let price = (type === 'FREE') ? request.body.price : 0

    let event = new Event({name, image, date, price, type, info})
    event = await event.save() // Save to DB
    response.status(200).json({
      result: 'Upload successful',
      event: event
    })
  }
  catch (error){
    response.status(500).json({
      errors : [
        {
          msg: error.message
        }
      ]
    })
  }
})

module.exports = router;
