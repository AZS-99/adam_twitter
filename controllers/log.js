const router = require('express').Router()
const db = require('../models/database')
const notifier = require('node-notifier')



router.get('/log_in', (req, res) => {
    res.render('log_in')
})


router.post('/log_in', async (req, res) => {
    try {
        const user = await db.verify(req.body)
        if (user) {
            req.session.user = user
            notifier.notify("User " + req.session.user.email + "logged successfuly")
            res.redirect('/')
        } else {
            res.send('combination does not exist')
        }
    } catch (error) {console.log}
    
})

module.exports = router