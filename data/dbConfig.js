const knex = require('knex')
const knexConfig = require('../knexfile')

// set your environment based on production or development
let env = process.env.NODE_ENV || 'development'

// if the environment is in test then use development knex config for db

module.exports = knex(knexConfig[env])