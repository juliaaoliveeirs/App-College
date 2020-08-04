const fs = require('fs')
const data = require('../data.json')
const Intl = require('intl')
const { age, graduation, date } = require('../utils')

exports.index = function(req, res) {

    // criar um array vazio
    let teach = []

    // faz um for para percorrer cada um dos professores
    // utilizando o i = 1 para ser igual ao numero do ID
    for (let i = 1; i < data.teachers.length + 1; i++) {
        const foundTeacher = data.teachers.find(function(teacher) {
            // se retornar TRUE então a informação fica na const
            return teacher.id == i
        })

        if (!foundTeacher) return res.send("Teacher not found")

        // preenhe o array lá de fora com as informações do 
        // teacher encontrado e do occupation separado conforme precisamos
        teach.push({
            ...foundTeacher,
            occupation_area: foundTeacher.occupation_area.split(",")
        })
    }

    return res.render('teachers/index', { teachers: teach })
}

exports.show = function(req, res) {

    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id
    })

    if (!foundTeacher) return res.send('Teacher not found!')

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        education_level: graduation(foundTeacher.education_level),
        occupation_area: foundTeacher.occupation_area.split(","),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.created_at)
    }

    return res.render('teachers/show', { teacher })
}

exports.create = function(req, res) {
    return res.render('teachers/create')
}

exports.post = function(req, res) {

    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "")
            return res.send("Por favor preencha todos os campos!")
    }

    let { avatar_url, name, birth, education_level, type_of_class, occupation_area } = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        education_level,
        type_of_class,
        occupation_area,
        created_at
    })

    // return res.send(key)

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error")

        return res.redirect("/teachers")
    })
}

exports.edit = function(req, res) {
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id
    })

    if (!foundTeacher) return res.send('Teacher not found!')

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth).iso
    }

    return res.render('teachers/edit', { teacher })
}

exports.update = function(req, res) {

    const { id } = req.body
    let index = 0

    const foundTeacher = data.teachers.find(function(teacher, foundIndex) {
        if (teacher.id == id) {
            index = foundIndex

            return true
        }
    })

    if (!foundTeacher) return res.send('Teacher not found!')

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.teachers[index] = teacher

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Write file error')
    })

    return res.redirect(`/teachers/${id}`)
}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredTeachers = data.teachers.filter(function(teacher) {
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Write file error')

        return res.redirect('/teachers')
    })
}