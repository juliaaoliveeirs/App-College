const browserSync = require("browser-sync")

module.exports = {

    age: function(timestamp) {

        const today = new Date()
        const birth = new Date(timestamp)

        let age = today.getFullYear() - birth.getFullYear()
        const month = today.getMonth() - birth.getMonth()

        if (month < 0 || month == 0 && today.getDate() - birth.getDate())
            age = age - 1

        return age
    },

    graduation: function(selected) {

        let graduation = ""
        switch (selected) {
            case "Complete High School":
                graduation = "Ensino Médio Completo"
                break
            case "Complete Higher Education":
                graduation = "Ensino Superior Completo"
                break
            case "Masters degree":
                graduation = "Mestrado"
                break
            case "Doctorate degree":
                graduation = "Doutorado"
                break
        }

        return graduation

    },

    date: function(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return `${year}-${month}-${day}`
    }
}