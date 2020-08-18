const { date, grade } = require('../../lib/utils')
const Student = require('../models/Student')

module.exports = {
    index(req, res) {
        Student.all(function(students) {
            let studentsList = []
                // for percorre cada estudante para então entrar na função da grade
                // para exibição na tela index
            for (let i = 0; i < students.length + 1; i++) {
                const foundStudent = students.find(function(student, index) {
                    return index == i
                })
                if (foundStudent) {
                    studentsList.push({
                        ...foundStudent,
                        grade: grade(foundStudent.grade)
                    })
                }
            }

            return res.render('students/index', { students: studentsList })
        })
    },
    create(req, res) {
        Student.teacherSelectOptions(function(options) {
            return res.render('students/create', { teacherOptions: options })
        })
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Por favor preencha todos os campos!")
        }

        Student.create(req.body, function(student) {
            return res.redirect(`/students/${student.id}`)
        })
    },
    show(req, res) {
        Student.find(req.params.id, function(student) {
            if (!student) return res.send('Student not found!')

            student.birth = date(student.birth).birthDay
            student.grade = grade(student.grade)

            return res.render('students/show', { student })
        })
    },
    edit(req, res) {
        Student.find(req.params.id, function(student) {
            if (!student) return res.send('Student not found!')

            student.birth = date(student.birth).iso

            Student.teacherSelectOptions(function(options) {
                return res.render('students/edit', { student, teacherOptions: options })
            })
        })
    },
    update(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Por favor preencha todos os campos!")
        }

        Student.update(req.body, function() {
            return res.redirect(`/students/${req.body.id}`)
        })
    },
    delete(req, res) {
        Student.delete(req.body.id, function() {
            return res.redirect(`/students`)
        })
    }
}