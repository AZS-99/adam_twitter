const router = require('express').Router()


router.get('/', (req, res) => {
    if (req.session.user)
        res.render('home_logged')
    else 
        res.render('home')
})


module.exports = router