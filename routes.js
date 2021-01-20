const routes = require('express').Router()

const AppointmentService = require('./services/AppointmentService')
const appointment = require('./services/AppointmentService')

routes.get('/', (req, res) => {
    res.render('index')
})

routes.get('/create', (req, res) => {
    res.render('create')
})

routes.post('/create', async (req, res) => {
    const {name, email, description, cpf, date, time} = req.body

    const data = await appointment
        .Create(name, email, description, cpf, date, time)

    if(data) {

        return res.redirect('/')
    }
    else{
        return res.send('deu errado')
    }
})

routes.get('/calendar', async(req, res) => {

    const datas = await appointment.Index(false)

    res.json(datas)
})

routes.get('/event/:id', async(req, res) => {
    var data = await appointment.GetById(req.params.id)

    if(data){
        res.render('event', {data})
    }else{
       res.redirect('/') 
    }
})

routes.post('/update/:id', async(req, res) => {
    
    
    await appointment.Update(req.params.id, req.body)

        res.redirect('/')

})

routes.post('/finished', async(req, res) => {
    var id = req.body.id
    var result = await appointment.Finished(id)
    if(result){
        res.redirect('/')
    }
})

routes.get('/list', async (req, res) =>{
 var data = await AppointmentService.Index(true)

 res.render('list', {data})
})

routes.get('/search', async (req, res) => {
    var datas = await appointment.Search(req.query.search)
    res.render('list', {data: datas})
})

// 5 minutos
var poolTime =  1000 * 60 * 5
setInterval(async () => {
    
    await appointment.SendNotification()



}, poolTime) 

module.exports = routes