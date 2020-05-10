const express = require('express')
const router = express.Router()
// const user = require('../models/user')

//GETTING ALL
router.get('/', async (req, res) => {
    res.send('Hello from router')
})

//GETTING ONE
router.get('/:id', (req, res) => {
    res.send(req.params.id)
})

//CREATING ONE
router.post('/', (req, res) => {

})

//UPDATING ONE
router.patch('/', (req, res) => {

})

//DELETE ONE
router.delete('/:id', (req, res) => {

})

module.exports = router