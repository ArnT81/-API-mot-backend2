require('dotenv').config()

const express = require('express')
var cors = require('cors')
const app = express()
const port = process.env.port || 4000
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Dababase'))

app.use(cors())
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
        Examples: {
            'get users': 'curl http://localhost:4000/users/',
            'create new user(doesnt´t work)': `curl -X POST -H "Content-Type:application/json"  http://localhost:4000/users -d "{"name":"Anders","email":"anders@mail.com","address":{"city":"Vislanda","street":"Movägen","zipcode":"34250"}}"`,
            'Delete user': 'curl -X DELETE http://localhost:4000/users/id'
        }
    }])
})

app.listen(port, () => console.log('Server started on port', port))