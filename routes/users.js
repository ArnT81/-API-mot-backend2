const express = require('express')
const router = express.Router()
const Users = require('../models/user')

//GETTING ALL
router.get('/', async (req, res) => {
    try {
        const users = await Users.find()
        res.send(users)
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
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