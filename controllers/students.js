const fs = require('fs')
const data = require('../data.json')
const Intl = require('intl')
const { grade, date } = require('../utils')

exports.index = function(req, res) {

    // criar um array vazio
    let students = []

    // faz um for para percorrer cada um dos professores
    // utilizando o i = 1 para ser igual ao numero do ID
    for (let i = 1; i < data.students.length + 1; i++) {
        const foundStudent = data.students.find(function(student) {
            // se retornar TRUE então a informação fica na const
            return student.id == i
        })

        if (!foundStudent) return res.send("Student not found")

        // preenhe o array lá de fora com as informações do 
        // student encontrado e do occupation separado conforme precisamos
        students.push({
            ...foundStudent,
            grade: grade(foundStudent.grade)
        })
    }

    return res.render('students/index', { students: students })
}

exports.show = function(req, res) {

    const { id } = req.params

    const foundStudent = data.students.find(function(student) {
        return student.id == id
    })

    if (!foundStudent) return res.send('Student not found!')

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).birthDay,
        grade: grade(foundStudent.grade)
    }

    return res.render('students/show', { student })
}

exports.create = function(req, res) {
    return res.render('students/create')
}

exports.post = function(req, res) {

    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "")
            return res.send("Por favor preencha todos os campos!")
    }

    birth = Date.parse(req.body.birth)
    let id = 1
    const lastId = data.students[data.students.length - 1]

    if (lastId) id = lastId.id + 1

    data.students.push({
        ...req.body,
        id,
        birth
    })

    // return res.send(key)

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error")

        return res.redirect(`/students/${id}`)
    })
}

exports.edit = function(req, res) {
    const { id } = req.params

    const foundStudent = data.students.find(function(student) {
        return student.id == id
    })

    if (!foundStudent) return res.send('Student not found!')

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso
    }

    return res.render('students/edit', { student })
}

exports.update = function(req, res) {

    const { id } = req.body
    let index = 0

    const foundStudent = data.students.find(function(student, foundIndex) {
        if (student.id == id) {
            index = foundIndex

            return true
        }
    })

    if (!foundStudent) return res.send('Student not found!')

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.students[index] = student

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Write file error')
    })

    return res.redirect(`/students/${id}`)
}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredStudents = data.students.filter(function(student) {
        return student.id != id
    })

    data.students = filteredStudents

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Write file error')

        return res.redirect('/students')
    })
}