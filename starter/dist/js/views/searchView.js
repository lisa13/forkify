// export const add = (a, b) => a + b;
// export const mult = (a, b) => a * b;
// export const ID = 13;
//-----------------------------------------------------------------------------------------
import { elements } from './base';


export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
}

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

const limitTitle = (title, limit = 17) => {
    const newTitle = [];

    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const renderRecipe = recipe => {
    const markup = `
    <li>
    <a class="results__link results__link--active" href="#${recipe.recipe_id}">

       <figure class="results__fig">
        <img style="height:100px; width:90px; margin-left:10px; border-radius: 90px" src="${recipe.image_url}" alt="${recipe.title}">
       </figure>
       
        <div class="results__data">
            <h4 class="results__name">${limitTitle(recipe.title)}</h4>
            <p class="results__author">"${recipe.publisher}</p>
        </div>
    </a>
</li>
    `;

    elements.searchResList.insertAdjacentHTML('beforeend', markup);
}

const createButton = (page, type) => {
    //creating the markup for the prev and next button  
    return `<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>`;
}

const renderButtons = (page, numRes, resPerPage) => {

    const pages = Math.ceil(numRes / resPerPage);
    let button;

    if (page === 1 && pages > 1) {
        //next page
        button = createButton(page, 'next');

    } else if (page < pages) {
        //both buttons show
        button = `
        ${createButton(page, 'next')};
        ${createButton(page, 'prev')};
        `
    } else if (page === pages && pages > 1) {
        //previous page
        button = createButton(page, 'prev');
    }
    elements.searchResPages.insertAdjacentHTML("afterbegin", button);
}

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    console.log(recipes);

    recipes.slice(start, end).forEach(renderRecipe);
    //render pagination
    renderButtons(page, recipes.length, resPerPage);
}