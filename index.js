const app = require('express')()
const static = require('express').static

const bodyParser = require('body-parser')
const routes = require('./routes')

require('./config/mongo')
app.use(static('public'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.set('view engine', 'ejs')

app.use(routes)

app.listen(2020, console.log('API runing in port 2020'))