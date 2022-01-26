const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

router.get('/celebrities/create', async (req, res, next) => {
    try {
        res.render('celebrities/new-celebrity');
    } catch (e) {
        next(e)
    }
})

router.post('/celebrities/create', async (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body;
    try {
        const celebrity = await Celebrity.create({name, occupation, catchPhrase});
        res.redirect('/celebrities')
    } catch (e) {
        next(e)
    }
})

router.get('/celebrities', async (req, res, next) => {
    try {
        const allCelebrities = await Celebrity.find()
        res.render('celebrities/celebrities', {allCelebrities})
    } catch (e) {
        next(e)
    }
})

module.exports = router;