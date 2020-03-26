const express = require('express')
const routes = express.Router()
const OngController = require('./controlers/OngController')
const IncidentController = require('./controlers/IncidentController')
const ProfileController = require('./controlers/ProfileController')
const SessionControler = require('./controlers/SessionController')

routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.create)

routes.get('/incidents', IncidentController.index)
routes.post('/incidents', IncidentController.create)
routes.delete('/incidents/:id', IncidentController.delete)

routes.get('/profile', ProfileController.index)

routes.post('/sessions', SessionControler.create)

module.exports = routes