const express = require('express');
const router = express.Router();

const database = require("./database");
const dotenv = require("dotenv");
dotenv.config()
const client = require('twilio')(process.env.TWILIO_ID, process.env.TWILIO_SK);
/* utilizado para envio de mensajes por wasapt */
client.messages
      .create({
         from: 'whatsapp:+14155238886',
         body: 'Se acaba de crear un contrato en UOCContactaYA, Por favor verifque',
         to:   'whatsapp:+593989968908'
       })
      .then(message => console.log(message.sid));

module.exports = router;