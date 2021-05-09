const bcrypt = require('bcrypt')
SALT_ROUNDS = 10

module.exports = (database, Sequelize) => {
    return database.define('users', {
        forename: {
            type: Sequelize.STRING
        },
        surname: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            validate: {
                is: {
                    args: ['^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9_]{8,30}$'],
                    msg: ["Database rejected password"]
                }
            }
        }
    }, {
        hooks: {
            afterValidate: async (user, options) => {
                user.password = await bcrypt.hash(user.password, SALT_ROUNDS)
            }
        }
    })
}