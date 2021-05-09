module.exports = (database, Sequelize) => {
    return database.define('post', {
        user_id: 'INT NOT NULL REFERENCES users(id) ON DELETE CASCADE',
        tweet: Sequelize.TEXT
    }, {
        indexes: [
            {
                fields: 'user_id',
                name: 'IDX_POST_USER_ID'
            }
        ]
    })
}