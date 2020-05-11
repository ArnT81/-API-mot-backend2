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
        res.status(500).json({ message: err.message })
    }
})

//GETTING ONE
router.get('/:id', getUser, (req, res) => {
    res.send(req.user.name)
})

//CREATING ONE
router.post('/', async (req, res) => {
    const user = new Users({
        name: req.body.name,
        email: req.body.email
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//UPDATING ONE
router.patch('/:id', (req, res) => {

})

//DELETE ONE
router.delete('/:id', (req, res) => {

})

async function getUser(req, res, next) {
    let user
    try {
        user = await Users.findById(req.params._id)
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
    req.user = user
    next()
}

module.exports = router