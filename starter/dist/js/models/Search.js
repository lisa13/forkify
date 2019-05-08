// export default 'I am an exported string';
//-----------------------------------------------------------------------------------------
import Axios from 'axios';
import {key, cors} from '../config';


export default class Search {

    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const res = await Axios(`${cors}https://www.food2fork.com/api/search/?key=${key}&q=${this.query}`);
            this.results = res.data.recipes;
            // console.log(this.results);

        } catch (error) {
            console.log(error);
        }
    }

}