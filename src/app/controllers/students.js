const Intl = require('intl')
const { age, graduation, date, grade } = require('../../lib/utils')
const Student = require('../models/student')
const db = require('../../config/db')

module.exports = {
    index(req, res) {
        Student.all(function(students) {

            let studentsList = []

            // for percorre cada estudante para então entrar na função da grade
            // para exibição na tela index
            for (let i = 1; i < students.length + 1; i++) {
                const foundStudent = students.find(function(student) {
                    return student.id == i
                })

                studentsList.push({
                    ...foundStudent,
                    grade: grade(foundStudent.grade)
                })
            }

            return res.render('students/index', { students: studentsList })
        })
    },
    create(req, res) {
        return res.render('students/create')
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

            return res.render('students/edit', { student })
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