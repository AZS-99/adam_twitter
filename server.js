require('dotenv').config()
const {urlencoded} = require('body-parser')
const express = require('express')
const exphbs = require('express-handlebars')
const db = require('./models/database')
const user_table = require('./models/users')
const register = require('./controllers/register')
const log = require('./controllers/log')
const main = require('./controllers/main')
const post = require('./controllers/post')
const session = require('./middlewares/express_session')
const path = require('path')

const app = express()

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: 'hbs'
}))
app.set('view engine', 'hbs')


app.use(urlencoded({extended: true}))
app.use(session)
app.use('/public', express.static(path.join(__dirname, '/public')))
app.use('/', main)
app.use('/register', register)
app.use('/log', log)
app.use('/post', post)



app.use((req, res, next) => {
    res.locals.session = req.session
    next()
})




;(async () => {
    await db.initialize()
    app.listen(process.env.PORT)
}) ()
