import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import SlimSelect from 'slim-select'
import "slim-select/dist/slimselect.css"

const refs = {
    breedSelect: document.querySelector(".breed-select"),
    catInfoCard: document.querySelector(".cat-info"),
    loader: document.querySelector(".loader"),
    error: document.querySelector(".error")
} 

fetchBreeds()
    .then(breeds => {
        console.log(breeds);
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
     refs.error.hidden = false;
        console.error(error);
           refs.error.hidden = false;
    })

  

refs.breedSelect.addEventListener("change", onSelectedBreedId);

function onSelectedBreedId(breed) {
    const selectedBreedId = refs.breedSelect.value;
refs.breedSelect.hidden = true;
    console.log(selectedBreedId);
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
            console.log(catCard);
            refs.loader.hidden = true;
refs.breedSelect.hidden = false;
        })
        .catch(error => {
            refs.error.hidden = false;
        console.error(error);
        });
   
};

 // breeds.forEach(breed => {
        //     const option = document.createElement("option");
        //     option.value = breed.id;
        //     option.textContent = breed.name;
        //     refs.breedSelect.appendChild(option);


// // Виклик функції fetchBreeds() для отримання колекції порід котів
// fetchBreeds()
//   .then(breeds => {
//     // Обробка отриманих порід
//     console.log(breeds);

//     // Наповнення select елементу з класом .breed-select
//     const breedSelect = document.querySelector(".breed-select");
//     breeds.forEach(breed => {
//       const option = document.createElement("option");
//       option.value = breed.id;
//       option.textContent = breed.name;
//       breedSelect.appendChild(option);
//     });
//   })
//   .catch(error => {
//     console.error("Error:", error);
//   });

// // / Обробник події для вибору опції в селекті
// const breedSelect = document.querySelector(".breed-select");
// breedSelect.addEventListener("change", () => {
//     const selectedBreedId = breedSelect.value;
    
//     fetchCatByBreed(selectedBreedId)
//         .then(cat => {
//             // Відображення зображення та інформації про кота
//             const catInfo = document.querySelector(".cat-info");

//             const html = cat.map(catItem => `
//       <img src="${catItem.url}">
//       <p>Breed: ${catItem.breeds[0].name}</p>
//       <p>Description: ${catItem.breeds[0].description}</p>
//       <p>Temperament: ${catItem.breeds[0].temperament}</p>
//     `).join("");

//             catInfo.innerHTML = html;
//         })
//         .catch(error => {
//             console.error("Error:", error);
//         });
// });
  