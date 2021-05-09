const { Pool } = require('pg')
const express_session = require('express-session')
const Session_store = require('connect-pg-simple')(express_session)

const client = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production'? {rejectUnauthorized: false} : false
})

const session = (express_session({
    store: new Session_store({
        pool: client,
        tableName: 'sessions'
    }),
    secret: 'ourfatherwhoartinheavans',
    name: 'twitter',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production'? true : false 
    }
}))

module.exports = session