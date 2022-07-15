const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')
module.exports = (app) => {
  app.get('/api/pokemons/:id', auth ,(req, res) => {
   return  Pokemon.findByPk(req.params.id)
      .then(function (pokemon) {
        if(pokemon === null ){
          const message =' ressource non trouvé';
          return res.status(404).json({message})
        }
          const message = 'Un pokémon a bien été trouvé.'
          res.json({ message, data: pokemon })
        })
       
    .catch(error => { 
      const message = `le pokemon n'a pas été trouvé`
      res.status(500).json( {message, data: error})
})
  })
}