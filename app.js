const express = require('express')

const sequelize = require('./src/db/sequelize')
const bodyParser= require('body-parser')


const favicon = require('serve-favicon')


const app = express()
const port = process.env.PORT || 3000

app.get('/', (req,res)=>{
  res.json('hello heroku')
})

app


.use(bodyParser.json())
sequelize.initDb()
// endpoint
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/upddatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login.js')(app)

app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
      res.status(404).json({message});
  });

app.listen(port,() => console.log(`notre application node est demarer sur : http://localhost:${port}`))

