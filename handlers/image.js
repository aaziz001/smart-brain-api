const Clarifai = require('clarifai')

const apiCall = (req,res) => {
    const app = new Clarifai.App({
        apiKey: 'ea60c88d6c204e198a177598a2dd9f10'
    });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.imageURL)
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch(err => res.status(500).json('Unable to connect to api'))
}
const getEntries = (db) => (req, res) => {
    const {id} = req.body
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => {
        res.status(400).json('Unable to get entries')
    })
}

module.exports = {
    apiCall,
    getEntries
}