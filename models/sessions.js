
module.exports = (database, Sequelize) => {
    return database.define('sessions', {
        sid: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        expire: {
            type: 'TIMESTAMP(6)',
            allowNull: false
        },
        sess: {
            type: Sequelize.JSON,
            allowNull: false
        }
    }, {
        indexes: [
            {
                fields: ['expire'],
                name: "IDX_SESSION_EXPIRE"
            }
        ],
        timestamps: false
    })
}