const pokemons = require('../db/mock-pokemon')
const { Pokemon } = require('../db/sequelize')
const pokemon = require('../models/pokemon')
const {Op }= require('sequelize')
const auth = require('../auth/auth')
module.exports = (app) => {
  app.get('/api/pokemons',auth, (req, res) => {
    if(req.query.name){
      const name = req.query.name
      const limit = parseInt(req.query.limit) || 5
      
      if (name.length < 2){
        const message = `Il faut plus de deux lettre pour rechercher un pokemon `
       return res.status(400).json({message})
      }
      return Pokemon.findAndCountAll({
        
        where : {// 'name' est la propriété du model pokemon
          name:{ [Op.like]:`%${name}%`//'name' est le critère de la recherche

          }
        },
        order : ['name'],

        limit:limit
      })
      .then(({count, rows}) => {
        const message = `Il t a ${count} qui correspondent a ${name} `
        res.json({message, data: rows})
      })
    }
    
    else{
      Pokemon.findAll({order:['name']})
      .then(pokemons => {
       
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error => { 
        const message = `la liste ne peut pas etre recuperée`
        res.status(500).json( {message, data: error})
  })
  }
    } )
}