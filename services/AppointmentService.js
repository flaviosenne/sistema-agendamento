const Appointment = require('../model/Appointment')

const AppointmentFactory = require('../factories//AppointmentFactory')

const nodemailer = require('nodemailer')
class AppointmentServices {

    async Create(name, email, description, cpf, date, time) {
        const appointment = new Appointment({
            name,
            email,
            description,
            cpf,
            date,
            time,
            finished: false,
            notified: false
        })

        try {

            await appointment.save()
            return true
        }
        catch (err) {
            console.log(err)
            return false
        }
    }

    async Index(showFinished) {

        if (showFinished) {
            return await Appointment.find()
        } else {
            var appointment = await Appointment.find({ 'finished': false })

            var appointments = []

            appointment.forEach(appointment => {

                if (appointment.date !== undefined || appointment.time !== undefined) {
                    appointments.push(
                        AppointmentFactory.Build(appointment))

                }
            })

            return appointments
        }
    }

    async GetById(id) {

        try {

            return await Appointment.findById(id)
        }
        catch (err) {
            console.log(err)
        }
    }

    async Update(id, data) {

        try {

            return await Appointment.findByIdAndUpdate(id, data)

        }
        catch (err) {
            console.log(err)
        }
    }

    async Finished(id) {
        try {
            await Appointment.findByIdAndUpdate(id, { finished: true })

            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

    async Search(data) {

        console.log(data)
        try {

            return await Appointment.find().or(
                [
                    { email: data },
                    { cpf: data }
                ])
        } catch (err) {
            console.log(err)
            return []
        }

    }

    async SendNotification() {
        var appointments = await this.Index(false)


        var config = {
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: '9a75971236d92c',
                pass: 'a76e0329cbf718'
            }
        }

        var transporter = nodemailer.createTransport(config)

        appointments.forEach(async appointment => {

            var date = appointment.start.getTime()
            var hour = 1000 * 60 * 60
            var gap = date - Date.now()

            var email = {
                from: 'sistema agendamento <sistema@agendamento.com>',
                to: `${appointment.name} <${appointment.email}>`,
                subject: 'Agendamento',
                html: `<h1> Sua agenda está marcada para menos de uma hora</h1>
                <span>data: </span> 
                ${appointment.start.getDate() < 10 ?
                        '0' + appointment.start.getDate() :
                        appointment.start.getDate()}/
                
                ${appointment.start.getMonth() + 1 < 10 ?
                        '0' + (appointment.start.getMonth() + 1) :
                        appointment.start.getMonth() + 1}/

                ${appointment.start.getFullYear()}
                `
            }
            if (gap <= hour) {

                if (!appointment.notified) {
                    await Appointment.findByIdAndUpdate(
                        appointment.id, { notified: true })

                    transporter.sendMail(email, (err, info) => {
                        if (err) {
                            console.log(err)
                        }
                    })

                }
            }
        })
    }
}

module.exports = new AppointmentServices()