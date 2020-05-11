const express = require('express')
const router = express.Router()
const Posts = require('../models/post')

//GETTING ALL
router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find()
        res.send(posts)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//GETTING ONE
router.get('/:_id', (req, res) => {
    res.json(req.post)
})

//CREATING ONE
router.post('/', async (req, res) => {
    const post = new Posts({
        title: req.body.title,
        text: req.body.text
    })
    try {
        const newPost = await post.save()
        res.status(201).json(newPost)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})
//UPDATING ONE
//DELETE ONE

module.exports = router