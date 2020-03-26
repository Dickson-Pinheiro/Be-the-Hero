const conection = require('../database/conection')

module.exports = {
    async index(req, res) {
        const {page = 1} = req.query

        const [count] = await conection('incidents').count()

        const incidents = await conection('incidents')
        .limit(5)
        .offset((page-1)*5)
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .select('incidents.*',
         'ongs.name',
         'ongs.email',
         'ongs.whatsapp',
         'ongs.city', 
         'ongs.uf')
        res.header('x-total-count', count['count(*)'])

        return res.json(incidents)
        
    },
    async create(req, res) {
        const {title, description, value} = req.body
        const ong_id = req.headers.authorization

        const [id] = await conection('incidents').insert ({
            title,
            description,
            value,
            ong_id
        })
        return res.json({id})
    },
    async delete (req, res){
        const { id } = req.params
        const ong_id = req.headers.authorization
        const incident = conection('insidents').where('id', id).select('ong_id').first()
        if (incident.ong_id =! ong_id) {
            return res.status(401).json("Operação não autorizada")
        } else {
            await conection('incidents').where('id', id).delete()
            res.status(204).send()
        }
    }
}