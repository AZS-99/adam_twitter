const router = require('express').Router()
const db = require('../models/database')
const notifier = require('node-notifier')


router.get('/sign_up', (req, res) => {
    res.render('register')
})


router.post('/sign_up', async (req, res) => {
    try {
        await db.add_user(req.body)
        if (true) {
            notifier.notify('added successfully')
            res.render('home')
        } else {
            notifier.notify('Nope')
        }
        
    } catch (error) {
        notifier.notify(error)
    }
})



router.get('/log_in', (req, res) => {
    res.render('log_in')
})


router.post('/log_in', async (req, res) => {
    try {
        const user = await db.verify(req.body)
        if (user) {
            req.session.user = user
            res.redirect('/')
        } else {
            res.send('combination does not exist')
        }
    } catch (error) {console.log}
    
})

module.exports = router