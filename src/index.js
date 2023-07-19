import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import SlimSelect from 'slim-select'
import "slim-select/dist/slimselect.css"

export const refs = {
    breedSelect: document.querySelector(".breed-select"),
    catInfoCard: document.querySelector(".cat-info"),
    loader: document.querySelector(".loader"),
    error: document.querySelector(".error")
} 

fetchBreeds()
    .then(breeds => {
        const breedItem = breeds.map(({ id, name }) => 
        `<option value="${id}">${name}</option>`
        ).join("");
    
        refs.breedSelect.insertAdjacentHTML("beforeend", breedItem);
            new SlimSelect({
            select: refs.breedSelect
            })
        refs.breedSelect.hidden = false;
    })
    .catch(error => {
        console.error(error);
        refs.error.hidden = false;
        refs.loader.hidden = true;
        refs.catInfoCard.innerHTML = "";
    })
 

refs.breedSelect.addEventListener("change", onSelectedBreedId);

function onSelectedBreedId(breed) {
    const selectedBreedId = refs.breedSelect.value;
    refs.breedSelect.hidden = true;
    refs.catInfoCard.innerHTML = "";
    refs.loader.hidden = false;
    fetchCatByBreed(selectedBreedId)
        .then(cat => {
            const catCard = cat.map((catItem) =>
                `<img src="${catItem.url}" width="600">
                <div class="description">
                <b class="name">${catItem.breeds[0].name}</b>
                <p>${catItem.breeds[0].description}</p>
                <p><b>Temperament:</b> ${catItem.breeds[0].temperament}</p>
                </div>`
            ).join("");
            refs.catInfoCard.innerHTML = catCard;
            refs.loader.hidden = true;
            refs.breedSelect.hidden = false;
            refs.error.hidden = true;
        })
        .catch(error => {
            console.error(error);
            refs.error.hidden = false;
            refs.loader.hidden = true;
        });
   
};
