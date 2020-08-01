const fs = require('fs')
const data = require('./data.json')
const Intl = require('intl')
const { age, graduation, date } = require('./utils')

// show
exports.show = function (req, res) {

    const { id } = req.params

    const foundTeacher = data.teachers.find(function (teacher) {
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

// create
exports.post = function (req, res) {

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

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write file error")

        return res.redirect("/teachers")
    })
}

// edit
exports.edit = function (req, res) {
    const { id } = req.params

    const foundTeacher = data.teachers.find(function (teacher) {
        return teacher.id == id
    })

    if (!foundTeacher) return res.send('Teacher not found!')

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    }

    return res.render('teachers/edit', { teacher })
}

// update
exports.update = function (req, res) {

    const { id } = req.body
    let index = 0

    const foundTeacher = data.teachers.find(function (teacher, foundIndex) {
        if (teacher.id == id) {
            index = foundIndex

            return true
        }
    })

    if (!foundTeacher) return res.send('Teacher not found!')

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.teachers[index] = teacher

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send('Write file error')
    })

    return res.redirect(`/teachers/${id}`)
}

// delete
exports.delete = function (req, res) {
    const { id } = req.body

    const filteredTeachers = data.teachers.filter(function(teacher){
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send('Write file error')

        return res.redirect('/teachers')
    })
}