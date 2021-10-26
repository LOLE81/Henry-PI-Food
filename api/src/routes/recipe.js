const { Router } = require('express');
const { Recipe } = require('../db')



const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const { name, summary, score, healthScore, steps } = req.body
        const newRecipe = await Recipe.create({
            name,
            summary,
            score,
            healthScore,
            steps
        })
        res.send(newRecipe)  
    } catch (error) {
        next(error)
    };
});



module.exports = router;