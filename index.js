require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.port || 3000
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Dababase'))

app.use(express.json())

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

const postsRouter = require('./routes/posts')
app.use('/posts', postsRouter)

app.get('/', (req, res) => {
    res.send([{
        'Description': 'Available endpoints, methods and responses for this API',
        Endpoints: {
            Users: '/users',
            Posts: '/posts'
        },
        Methods: {
            '/users': 'GET, POST',
            '/users/Id': 'GET, PATCH, DELETE',
            '/posts': 'GET, POST',
            '/posts/Id': 'GET, PATCH, DELETE'
        },
        Response: {
            'OK': '200',
            'Created': '201',
            'Bad request': '400',
            'Not found': '404'
        },
        Useful_syntax: {
            'cls': 'clear screen',
            'curl --help': 'gives you all available curl options',
            '|jq after request': 'structures JSON data',
            
        },
        Examples: {
            'Create user': `curl POST ''Content-Type: application/json'' http://localhost:3000/users/ {''name'': ''Your name'', ''email'': ''Your email''}`
        }
    }])
})

app.listen(port, () => console.log('Server started on port', port))