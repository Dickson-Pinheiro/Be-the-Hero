const conection = require('../database/conection')

module.exports = {
    async create(req, res) {
        const {id} = req.body
        console.log(id)
        const ong = await conection('ongs').where('id', id).select('name').first()

        if (!ong) {
            return res.status(400).json({Error: 'No ong found with this ID'})
        }
        
        return res.json(ong)
    }
}