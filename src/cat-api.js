import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_UivUqlx2I5jiOynNulnIZrh0LbDTBAuA9XAy8nLALoiXWspOtYaaJVxM2AfDwaHe";
import { refs } from "./index";

const BASE_URL = "https://api.thecatapi.com/v1/breeds"
const CATS_URL = "https://api.thecatapi.com/v1/images/search";   
    
export function fetchBreeds() {
    return axios.get(BASE_URL)
        .then(response => response.data)
        .catch(error => {
            refs.error.hidden = false;
            refs.loader.hidden = true;
            refs.breedSelect.hidden = true;
            refs.catInfoCard.innerHTML = "";
            console.error(error);
            return [];
        });
}

export function fetchCatByBreed(breedId) {
    const searchUrl = `${CATS_URL}?breed_ids=${breedId}`;
    return axios.get(searchUrl)
        .then(response => response.data)
        .catch(error => {
            refs.error.hidden = false;
            refs.loader.hidden = true;
            refs.breedSelect.hidden = true;
          refs.catInfoCard.innerHTML = "";
            console.error(error);
            return null;
        });
} 
   






