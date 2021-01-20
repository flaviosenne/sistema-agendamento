const Appointment = require('../model/Appointment')

const AppointmentFactory = require('../factories//AppointmentFactory')

class AppointmentServices {

    async Create(name, email, description, cpf, date, time){
         const appointment = new Appointment({
             name,
             email,
             description,
             cpf,
             date,
             time,
             finished: false
         })

         try{

             await appointment.save()
             return true
            }
            catch(err) {
                console.log(err)
                return false
         }
    }

    async Index(showFinished){

        if(showFinished){
            return await Appointment.find()
        }else{
            var appointment = await Appointment.find({'finished': false})

            var appointments = []

            appointment.forEach(appointment => {

                if(appointment.date !== undefined || appointment.time !== undefined){
                    appointments.push(
                        AppointmentFactory.Build(appointment))

                }
            })

            return appointments
        }
    }

    async GetById(id){

        try{

            return await Appointment.findById(id)
        }
        catch(err){
            console.log(err)
        }
    }

    async Update(id, data){

        try{

            return await Appointment.findByIdAndUpdate(id, data)

        }
        catch(err){
            console.log(err)
        }
    }

    async Finished(id){
        try{
            await Appointment.findByIdAndUpdate(id, {finished: true})

            return true
        }catch(err){
            console.log(err)
            return false
        }
    }
}

module.exports = new AppointmentServices()