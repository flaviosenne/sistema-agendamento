class AppointmentFactory {
    Build(simpleAppointment){

        var { date, time }= simpleAppointment
        var year  = date.getFullYear()
        var month = date.getMonth()
        var day = date.getDate()+1

        var minutes = Number.parseInt(time.split(':')[1])
        var hour = Number.parseInt(time.split(':')[0])
        
        var start = new Date(year,month,day,hour,minutes,0,0)
        // start.setHours(start.getHours() - 3)

        var appointment = {
            id: simpleAppointment._id,
            title: simpleAppointment.name+'-'+ simpleAppointment.description,
            start,
            end: start,
            notified: simpleAppointment.notified,
            name: simpleAppointment.name,
            email: simpleAppointment.email,
        }

        return appointment
    }
}

module.exports = new AppointmentFactory()