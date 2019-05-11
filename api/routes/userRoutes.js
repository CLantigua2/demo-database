const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()

const { getUsers, getUser, addUser, updateUser, deleteUser } = require('../helpers/userHelper')

/*
@GET: All Users
@PARAMS: none
@ROUTE: "/"
*/

router.get('/', (req, res) => {
    getUsers()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ message: "server broke", err })
        })
})

/*
@GET: All Users
@PARAMS: id[STRING]!
@ROUTE: "/:id"
*/
router.get('/:id', (req, res) => {
    const { id } = req.params
    getUser(id)
        .then(user => {
            if (!user) {
                res.status(400).json(`message: That user id ${id} doesn't exist`)
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({ message: "server broke", err })
        })
})

router.post('/', (req, res) => {
    // grab username and password from body
    const creds = req.body;
    // generate the hash from the user's password
    const hash = bcrypt.hashSync(creds.password, 14); // rounds is 2^X
    // override the user.password with the hash
    creds.password = hash;
    // save the user to the database
    addUser(creds)
        .then((ids) => {
            res.status(201).json(ids);
        })
        .catch((err) => res.status(500).json(err));
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const updates = req.body

    updateUser(id, updates)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({ message: "the server broke", err })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    deleteUser(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({ message: "the server broke", err })
        })
})

module.exports = router