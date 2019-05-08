import Search from './models/Search';
import Recipe from './models/Recipe';

import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';

import { elements, renderLoader, clearLoader } from './views/base';


const state = {};

//search controllers
const controlSearch = async () => {

    //get query from the veiw
    const query = searchView.getInput();

    if (query) {

        //new Search obj add it to state
        state.search = new Search(query);

        //prepare ui for the results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        //search for recipes based on query
        try {
            await state.search.getResults();
            console.log(state.search.results)

            //render results on UI
            clearLoader();
            searchView.renderResults(state.search.results);
        }
        catch (err) {
            console.log(err);
            clearLoader();
        }

    }
};

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

elements.searchResPages.addEventListener('click', e => {
    //console.log(e.target); check the elements clicked

    const btn = e.target.closest('.btn-inline');
    if (btn) {
        searchView.clearResults();
        const goToPa = parseInt(btn.dataset.goto, 10);
        searchView.renderResults(state.search.results, goToPa);

    }

});


// recipe controllers

const controllRecipe = async () => {
    //get id from url
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        //changes in the UI
        renderLoader(elements.recipe);
        state.recipe = new Recipe(id);

        try {
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            state.recipe.calcTime();
            state.recipe.calcServings();

            clearLoader();
            recipeView.renderRecipe(state.recipe);
        }
        catch (err) {
            console.log(err);
        }


    }
}

//converting these two lines of code into one line below
// window.addEventListener('hashchange', controllRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controllRecipe));





















//-----------------------------------------------------------------------------------------
//TEST IMPORTS FOR PRACTICE
//one way of importing is this
// import { add, mult, ID } from './views/searchView'
// console.log(`using import functions ${str} ${add(ID, 2)}`);

//second way of importing is this
// import { add as a, mult as m, ID as I} from './views/searchView'
// console.log(`using import functions ${str} ${a(I, 2)}`);

// third way of importing is this
// import * as searchView from './views/searchView'
// console.log(`using import functions ${str} ${searchView.add(searchView.ID, 2)}`);
//-----------------------------------------------------------------------------------------