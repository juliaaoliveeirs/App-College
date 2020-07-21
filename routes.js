const express = require('./node_modules/express')
const routes = express.Router()
const teachers = require('./teachers.js')

routes.get('/', function(req, res) {
    return res.redirect('/teachers')
})

routes.get('/teachers', function(req, res) {
    return res.render('teachers/index')
})

routes.get('/teachers/create', function(req, res) {
    return res.render('teachers/create')
})

routes.get('/students', function(req, res) {
    return res.render('students/index')
})

routes.post("/teachers", teachers.post)

routes.use(function(req, res) {
    res.status(404).render("not-found");
});

module.exports = routes