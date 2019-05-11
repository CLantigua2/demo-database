const db = require('../../data/dbConfig')
const uuid = require('uuid/v4')

// get all users
function getUsers() {
    return db('users')
}

// get a single user
function getUser(id) {
    return db('users as u').where({ 'u.id': id }).first()
}

// add a user
function addUser(user) {
    const newUser = { id: uuid(), ...user }
    return db('users')
        .insert(newUser)
        .then(res => {
            return res
        })
}

// update a user
function updateUser(id, updates) {
    return db('users as u')
        .where({ 'u.id': id })
        .update(updates)
}

// delete a user
function deleteUser(id) {
    if (id === undefined) {
        return Promise.reject('deleteUser requires an id')
    }
    return db('users as u')
        .where({ "u.id": id })
        .del()
}

module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
}