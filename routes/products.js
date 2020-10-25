const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/products/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toString() + file.originalname);
    }
})
const fileFilter = (rez, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif' || file.mimetype === 'image/svg' || file.mimetype === 'image/bmp' || file.mimetype === 'image/tiff') {
        cb(null, true)
    } else cb(null, false)
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


//GETTING ALL
router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        res.send(products)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//GETTING ONE
router.get('/:_id', getProduct, (req, res) => {
    res.json(req.product)
})

//CREATING ONE
router.post('/', upload.single('productImage'), async (req, res) => {
    console.log(req.file)
    console.log(req.headers, req.body)
    const product = new Product({
        title: req.body.title,
        text: req.body.text,
        price: req.body.price,
        productImage: req.file.path
    })
    try {
        const newProduct = await product.save()
        res.status(201).json(newProduct)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//UPDATING ONE
router.patch('/:_id', getProduct, async (req, res) => {
    if (req.body.name) {
        req.product.title = req.body.title
        console.log('Changing title to', req.body.title)
    }
    if (req.body.text) {
        req.product.text = req.body.text
        console.log('Changing description to', req.body.text)
    }
    if (req.body.price) {
        req.product.price = req.body.price
        console.log('Changing price to', req.body.price)
    }
    try {
        const updateProduct = await req.product.save()
        res.json(updateProduct)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//DELETE ONE
router.delete('/:_id', getProduct, async (req, res) => {
    try {
        await req.product.remove()
        res.json({ message: 'Deleted Product' })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//MIDDLEWARE FOR FINDING PRODUCT
async function getProduct(req, res, next) {
    let product
    try {
        product = await Product.findById(req.params._id)
        if (product == null) {
            return res.status(404).json({ message: 'Cannot find product' })
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
    req.product = product
    next()
}

module.exports = router