const faker = require('faker')
const bcrypt = require('bcryptjs')
const uuid = require('uuid/v4')

// list of premade roles
const userRole = ['user', 'admin', 'owner', 'guest']

// pick a random item from an array
const pickOne = item => item[Math.floor(Math.random() * item.length)]

// create a user
function generateUsers() {
    return {
        id: uuid(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        role: pickOne(userRole),
        email: faker.internet.email(),
        password: bcrypt.hashSync(faker.lorem.word(), 10)
    }
}

// helper to generate a specified amount of users
//call back will be the users function, iterator will be how many we want to generate
function accumulate(cb, iteration) {
    if (iteration > 0) {
        return [cb()].concat(accumulate(cb, iteration - 1))
    } else {
        // recursive base case
        return []
    }
}

module.exports = {
    genUsers: accumulate(generateUsers, 100)
}