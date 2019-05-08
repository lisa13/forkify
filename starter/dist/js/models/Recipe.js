import Axios from 'axios';
import { key, cors } from '../config';


export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {

        try {
            const res = await Axios(`${cors}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            console.log(res);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        }
        catch (err) {
            console.log(err)
        }
    }

    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.calcServings = 4;
    }

    parseIngredients() {
     const  unitsLong = ['tablespoon', 'tablespoons', 'ounces', 'ounce', 'teaspoon', 'teaspoons', 'cups', 'pounds'];
     const  unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'cup', 'pound'];

        const newIngredients = this.ingredients.map(el => {
            //uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            //remove parenthese
            ingredient = ingredient.replace(/ *\([^]*\) */g, ' ');

            //parse ingredients

            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));

            let objIng;
            if (unitIndex > -1) {

                const arrCount = arrIng.slice(0, unitIndex);

                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }

            } else if (parseInt(arrIng[0], 10)) {

                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }

            }
            else if (unitIndex === -1) {

                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            return ingredient;
        });

        this.ingredients = newIngredients;
    }
}