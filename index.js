"use strict";
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
const express = require("express")
var cors = require('cors')

dotenv.config()
const app = express()
const PORT = 2583

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('public'))

app.get(`/xrpc`, (req, res) => {
    res.send(200)
})

app.post(`/xrpc/com.atproto.server.createAccount`, (req, res) => {
    let handle = req.body.handle
    let password = req.body.password
    let email = req.body.email
    let inviteCode = req.body.inviteCode
    let recoveryKey = req.body.recoveryKey
    
    const accessJwt = jwt.sign({handle: handle}, process.env.TOKEN_SECRET)
    const refreshJwt = jwt.sign({handle: handle}, process.env.TOKEN_SECRET)
    
    let did = `did:plc:7iza6de2dwap2sbkpav7c6c6`
    
    res.send({accessJwt: accessJwt, refreshJwt: accessJwt, handle: handle, did: did})
})

app.get(`/xrpc/com.atproto.server.describeServer`, (req, res) => {
    let availableUserDomains = [`http://localhost`]
    let inviteCodeRequired = false
    let links = {}
    res.send({availableUserDomains: availableUserDomains, inviteCodeRequired: inviteCodeRequired, links: links})
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
})