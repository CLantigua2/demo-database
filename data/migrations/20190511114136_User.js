
exports.up = function (knex, Promise) {
    // used to create a table
    return knex.schema.createTable('users', tbl => {
        // used when you want to create your own id with UUID
        tbl.string('id')
            .primary()
            .notNullable()
        tbl.string('first_name', 128).notNullable()
        tbl.string('last_name', 128).notNullable()
        tbl.string('role', 128).notNullable()
        tbl.string('email', 128)
        tbl.string('password')
    })
};

exports.down = function (knex, Promise) {
    // used for rollbacks
    return knex.schema.dropTableIfExists('users')
};
