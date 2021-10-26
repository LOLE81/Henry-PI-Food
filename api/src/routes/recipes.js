const { Router } = require('express');
const axios = require('axios');
const { Recipe, Diet } = require('../db');
const router = Router();
const {
   API_KEY,
  } = process.env;
  
// Controller functions: 
const getApiInfo = async () => {
    const apiUrl =  await axios.get(`https://api.spoonacular.com/recipes/complexSearch?${API_KEY}&addRecipeInformation=true`);
    
    const apiInfo = await apiUrl.data.results.map(e => {
        return {
            id: e.id,
            image: e.image,
            name: e.title,
            dietTypes: e.diets, //// me trae un arreglo
            summary: e.summary,
            score: e.spoonacularScore,
            healthScore: e.healthScore,
            steps: e.analyzedInstructions[0]?.steps.map(e => {
                return {
                    number: e.number,
                    step: e.step
                }
            })
        }
    })
    
    return apiInfo;
};

const getDbInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
}

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const totalInfo = apiInfo.concat(dbInfo);
    return totalInfo;
}

// Hasta acá las controller functions ----> Crear archivo nuevo, modularizar, exportar e importar acá.

router.get('/', async (req, res, next) => {
    try {
        const { name } = req.query;
        let allRecipes = await getAllRecipes()
        if (name) {
            let recipeByName = await allRecipes.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            console.log(recipeByName)
            if (recipeByName.length) {
                let recipes = recipeByName.map(e => {
                    return {
                        image: e.image,
                        name: e.name,
                        dietTypes: e.dietTypes
                    }
                })
                res.status(200).send(recipes);
            } else { 
                res.status(404).send('Sorry, recipe not found')
            }
        } // next(error); ver qué poner acá para que devueva error si no sé completa nada?
        
    } catch(error) {
        next(error)
    }
});

router.get('/', async (req, res, next) => {
    res.send('--------- get / recipe details')  //usar include?
})


module.exports = router;