
const base_url =  "https://pokeapi.co/api/v2/";

/*
fetch(base_url + "pokemon" + 1)
.then((res) => res.json())
.then((data) => console.log(data));
*/

const createPokemonCard = (pokemon) => { 
    const cardContainer = document.querySelector('.card--container');
    const card = document.createElement("div");
    card.classList.add("card");
    const img = document.createElement("img");
    img.src = pokemon.sprites.front_default;
    img.alt = pokemon.name;
    img.classList.add('pokemon-image');

    const name = document.createElement("h3");
    name.textContent = pokemon.name;

    const id = document.createElement("p");
    id.textContent = `ID: ${pokemon.id}`;

    const weight = document.createElement("p");
    weight.textContent = `Weight: ${pokemon.weight / 10} kg`;

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(id);
    card.appendChild(weight);

    cardContainer.innerHTML = ``;
    cardContainer.appendChild(card);

}


const fetchPokemon = async(pokemon) => {
    try{
     const response = await fetch(`${base_url}pokemon/${pokemon}`);
     console.log(response);
     const parsedData = await response.json();
     console.log(parsedData);
     return parsedData;
    } catch(err){
     console.error(err); 
    }
}

document.getElementById("get-btn").addEventListener('click', async () => {
    const text = document.getElementById("poke-name").value.toLowerCase();
    const pokemon = await fetchPokemon(text);
    if (pokemon) {
        localStorage.setItem("currentPokeId", pokemon.id)
    }
});7

document.addEventListener("DOMContentLoaded", async () => {
    const storedId = localStorage.getItem("currentPokeId");
    const initialId = storedId ? parseInt (storedId) : 1;
    const pokemon = await fetchPokemon(initialId);
    if (pokemon){
        createPokemonCard(pokemon)
    }
})

document.getElementById("previous-btn").addEventListener('click', async() => {
    const currentPokeId = parseInt(localStorage.getItem("currentPokeId"));
    const newId = Math.max(1, currentPokeId - 1);
    const pokemon = await fetchPokemon(newId);
    if (pokemon){
        localStorage.setItem("currentPokeId", newId);
        createPokemonCard(pokemon);
    }
});

document.getElementById("next-btn").addEventListener('click', async () => {
    const currentPokeId = parseInt(localStorage.getItem("currentPokeId"));
    const newId = currentPokeId + 1;
    const pokemon =await fetchPokemon(newId);
    if (pokemon){
        localStorage.setItem("currentPokeId", newId);
        createPokemonCard(pokemon)
    }
});

fetch("https://jsonplaceholder.typicode.com//posts",{
    method: `POST`,
    body: JSON.stringify({
        title: "title1",
        body: "Lorem ipsum", 
        userId: 1
     }),
     headers:{
        "Content-type": "application/json; charset=UTF-8",
     }
}) .then(res => res.json())
   .then(json => console.log(json))

