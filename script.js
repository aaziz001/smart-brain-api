const express = require('express')
const bodyParser = require('body-parser')
const knex = require ('knex')
const bcrypt = require('bcrypt')
const cors = require('cors')
const app = express()

const register = require('./handlers/register')
const signin = require('./handlers/signin')
const profile = require('./handlers/getuser')
const image = require('./handlers/image')

app.use(bodyParser.json())
app.use(cors())

const PORT = process.env.PORT || 3000

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
})

app.get('/', (req, res)=> { db.select('*').from('users').then(data => {res.send(data)})})

app.post('/signin', signin.handleSignin(db,bcrypt))

app.post('/register', register.handleRegister(db,bcrypt))

app.get('/profile/:id', profile.getUserProfile(db))

app.put('/image', image.getEntries(db))

app.post('/imageURL', image.apiCall)

app.listen(PORT, ()=> {
    console.log(`Server Started running on Port ${PORT}`)
})