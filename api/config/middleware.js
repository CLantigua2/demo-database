const helmet = require('helmet')
const morgan = require('morgan')

module.exports = server => {
    server.use(helmet())
    server.use(morgan('dev'))
}

