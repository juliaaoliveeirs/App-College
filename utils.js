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
            case "Master's degree":
                graduation = "Mestrado"
                break
            case "Doctorate degree":
                graduation = "Doutorado"
                break
        }

        return graduation

    }
}