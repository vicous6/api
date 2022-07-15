const { Pokemon } = require('../db/sequelize')
const{ValidationError, UniqueconstraintError}= require ('sequelize')

const auth = require('../auth/auth')

module.exports = (app) => {
  app.put('/api/pokemons/:id', auth,(req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
     return Pokemon.findByPk(id).then(pokemon => {
        if(pokemon=== null){
            const message = 'la ressource n\'existe pas'
            return res.status(404).json({message})
          }
        const message = `Le pokemon ${pokemon.name} a bien été modifié.`
        res.json({ message, data: pokemon })

        
      })
    })
    .catch(error => { 
        if (error instanceof ValidationError){
            return res.status(400).json({message: error.message, data:error})
          }
          if (error instanceof UniqueconstraintError){
            return res.status(400).json({message: error.message, data:error})
          }
        const message = `la liste n' apas pus etre modifié`
        res.status(500).json( {message, data: error})
  })
 
  })
}