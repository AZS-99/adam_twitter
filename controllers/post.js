const router = require('express').Router()
const db = require('../models/database')
const notifier = require('node-notifier')

router.post('/tweet', async (req, res) => {
    try {
        const saved = await db.save_tweet(req.session.user.id, req.body.tweet)
        if (saved) {
            notifier.notify('Tweet sent')
            res.redirect('/')
        }
    } catch (eror) {}
})


router.get('/delete_tweet/:id', async (req, res) => {
    try {
        console.log(req.params.id, req.session.user.id)
        const deleted = await db.delete_tweet(req.params.id, req.session.user.id)
        res.send(deleted)
    } catch (error) {

    }
})


router.get('/update_tweet', async (req, res) => {
    try {
        const id = req.query.tweet_id
        const updated_tweet = req.query.updated_tweet

        console.log(id, updated_tweet, req.session.user.id)
        await db.update_tweet(id, updated_tweet, req.session.user.id)
        res.redirect('/')
    } catch (error) {

    }
    
})

module.exports = router