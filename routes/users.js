const express = require('express')
const router = express.Router()
const Users = require('../models/user')

//GETTING ALL OR BY QUERIES
router.get('/', async (req, res) => {
    let search = {}

    // BY NAME
    if (req.query.name) {
        search = { name: req.query.name }
    }
    // BY USERNAME
    if (req.query.username) {
        search = { username: req.query.username }
    }
    // BY PHONE-NUMBER
    if (req.query.phone) {
        search = { phone: req.query.phone }
    }
    // BY EMAIL
    if (req.query.email) {
        search = { email: req.query.email }
    }
    // BY CITY
    if (req.query.city) {
        search = { address: { city: req.query.city } }
        console.log(search)
    }

    try {
        const users = await Users.find(search)
        if (users.length < 1) {
            return res.status(404).json({ message: 'User not found' })
        }
        else return res.status(200).send(users)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//GETTING ONE
router.get('/:_id', getUser, (req, res) => {
    res.json(req.user)
})

//CREATING ONE
router.post('/', async (req, res) => {
    console.log(req.headers, req.body)
    const user = new Users({
        id: req.body.id,
        name: req.body.name,
        username: req.body.username,
        phone: req.body.phone,
        email: req.body.email,
        homepage: req.body.homepage,
        address: {
            city: req.body.address.city,
            street: req.body.address.street,
            zipcode: req.body.address.zipcode,
        }
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
router.patch('/:_id', getUser, async (req, res) => {
    if (req.body.name) {
        req.user.name = req.body.name
        console.log('Changing name to', req.body.name)
    }
    if (req.body.email) {
        req.user.email = req.body.email
        console.log('Changing email to', req.body.email)
    }
    try {
        const updateUser = await req.user.save()
        res.status(202).json(updateUser)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//DELETE ONE
router.delete('/:_id', getUser, async (req, res) => {
    try {
        await req.user.remove()
        res.status(200).json({ message: 'Deleted User' })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//MIDDLEWARE FOR FINDING USER
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