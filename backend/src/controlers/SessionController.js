const conection = require('../database/conection')

module.exports = {
    async create(req, res) {
        const {id} = req.body

        const ongs = await conection('ongs').where('id', id).select('name').first()

        if (!ongs) {
            return res.status(400).json({Error: 'No ong found with this ID'})
        } else {
            return res.json(ongs)
        }
    }
}