module.exports = require('mongoose')
    .connect('mongodb+srv://agendamento:agendamento@cluster0.oc5be.mongodb.net/agendamento?retryWrites=true&w=majority',
        { useUnifiedTopology: true, useNewUrlParser: true })
    .then(
        console.log('conected in MongoAtlas')
    ).catch(err => {
        console.log(err)
    })