const { Router } = require('express');
const axios = require('axios');
const { Recipe, Diet } = require('../db');
const { getApiInfo, getBdInfo, getAllRecipes, getDbInfo, getDbById} = require('../controllers/recipes');
const router = Router();
const { API_KEY } = process.env;
  
// Controller functions: 
// const getApiInfo = async () => {
//     const apiUrl =  await axios.get(`https://api.spoonacular.com/recipes/complexSearch?${API_KEY}&addRecipeInformation=true`);
    
//     const apiInfo = await apiUrl.data.results.map(e => {
//         return {
//             id: e.id,
//             image: e.image,
//             name: e.title,
//             dietTypes: e.diets, //// me trae un arreglo
//             summary: e.summary,
//             score: e.spoonacularScore,
//             healthScore: e.healthScore,
//             steps: e.analyzedInstructions[0]?.steps.map(e => {
//                 return {
//                     number: e.number,
//                     step: e.step
//                 }
//             })
//         }
//     })
    
//     return apiInfo;
// };

// const getDbInfo = async () => {
//     return await Recipe.findAll({
//         include: {
//             model: Diet,
//             attributes: ['name'],
//             through: {
//                 attributes: [],
//             }
//         }
//     });
// }

// const getAllRecipes = async () => {
//     const apiInfo = await getApiInfo();
//     const dbInfo = await getDbInfo();
//     const totalInfo = apiInfo.concat(dbInfo);
//     return totalInfo;
// }

// Hasta acá las controller functions ----> Crear archivo nuevo, modularizar, exportar e importar acá.

router.get('/', async (req, res, next) => {
    try {
        const { name } = req.query;
        let allRecipes = await getAllRecipes()
        
        if (name) {
            let recipeByName = await allRecipes.filter(e => e.name.toLowerCase().includes(name.toString().toLowerCase()));
           
            if (recipeByName.length) {
                let recipes = recipeByName.map(e => {
                    return {
                        image: e.image,
                        name: e.name,
                        dietTypes: e.dietTypes,
                        score: e.score
                    }
                })
                return res.status(200).send(recipes); 
            }  
        return res.status(404).send('Sorry, recipe not found')
        } else {
            let recipes = allRecipes.map(e => {
                return {
                    image: e.image,
                    name: e.name,
                    dietTypes: e.dietTypes,
                    score: e.score
                }
            })
            return res.status(200).send(recipes);
        }
    } catch {
       return res.status(400).send('invalid input');
    }
});

router.get('/:id', async (req, res, next) => {
    //mostrar image, name, dietTypes, dishTypes, summary, score, healthScore, steps 
    const { id } = req.params  
    try {
        if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)) {
            let dbRecipesById = await getDbById(id);            
            return res.json(dbRecipesById)
        } else { 
            apiRecipesById = await axios.get (`https://api.spoonacular.com/recipes/${id}/information?${API_KEY}`)                
            if (apiRecipesById.data.id) {
                let recipeDetails =  {                    
                    image: apiRecipesById.data.image,
                    name: apiRecipesById.data.title,
                    dishTypes: apiRecipesById.data.dishTypes,
                    dietTypes: apiRecipesById.data.diets,
                    summary: apiRecipesById.data.summary,
                    score: apiRecipesById.data.spoonacularScore,
                    healthScore: apiRecipesById.data.healthScore,
                    steps: apiRecipesById.data.analyzedInstructions[0]?.steps.map(e => {
                        return {
                            number: e.number,
                            step: e.step
                        }
                    })
                }
                return res.status(200).send(recipeDetails); 
            }
        } 
    } catch {
        return res.status(404).send('Recipe not found')
    }
});
    
    
module.exports = router;