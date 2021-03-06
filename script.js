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

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'test',
        database: 'smartbrain'
    }
})

app.get('/', (req, res)=> { res.send(db.users) })

app.post('/signin', signin.handleSignin(db,bcrypt))

app.post('/register', register.handleRegister(db,bcrypt))

app.get('/profile/:id', profile.getUserProfile(db))

app.put('/image', image.getEntries(db))

app.post('/imageURL', image.apiCall)

app.listen(PORT, ()=> {
    console.log(`Server Started running on Port ${PORT}`)
})