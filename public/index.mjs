import Dictionary from './DictionaryModule/dictionary.mjs';

const pokemonCount = 151;
let pokedex = {};
let selectedPokemonId = null;
const noBtn = document.getElementById("no");
const enBtn = document.getElementById("en");
const normalBtn = document.getElementById("normal");
const shinyBtn = document.getElementById("shiny");

const addToWishlistBtn = document.getElementById("addToWishlist");

window.onload = async function () {

    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);
 
        let pokemon = document.createElement("div");
        pokemon.id = i;
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
        pokemon.classList.add("pokemonName");


        pokemon.addEventListener("click", function updatePokemon() {
            document.getElementById("pokemonImg").src = pokedex[this.id]["img"];

            let typesDiv = document.getElementById("pokemonTypes");
            while (typesDiv.firstChild) {
                typesDiv.firstChild.remove();
            }

            let types = pokedex[this.id]["types"];
            for (let i = 0; i < types.length; i++) {
                let type = document.createElement("span");
                type.innerText = types[i]["type"]["name"].toUpperCase();
                type.classList.add("typeBox");
                type.classList.add(types[i]["type"]["name"]);
                typesDiv.append(type);
            }

            document.getElementById("pokemonDescription").innerText = pokedex[this.id]["desc"];

            let pokemonImg = pokedex[this.id]["img"];
            let pokemonShiny = pokedex[this.id]["shinyImg"];
            if (document.getElementById("normal").checked) {
                document.getElementById("pokemonImg").src = pokemonImg;
            }
            else if (document.getElementById("shiny").checked) {
                document.getElementById("pokemonImg").src = pokemonShiny;
            }
        });

        document.getElementById("pokemonDescription").innerText = pokedex[1]["desc"];

        document.getElementById("pokemonList").append(pokemon);
    }
    console.log(pokedex);
}

async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let res = await fetch(url);
    let pokemon = await res.json();
    console.log(pokemon);

    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["front_default"];
    let pokemonShiny = pokemon["sprites"]["front_shiny"];


    res = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await res.json();
    pokemonDesc = pokemonDesc["flavor_text_entries"][9]["flavor_text"];

    pokedex[num] = { "name": pokemonName, "img": pokemonImg, "types": pokemonType, "desc": pokemonDesc };

    normalBtn.addEventListener("click", function normalImg() {
        pokedex[num] = { "name": pokemonName, "img": pokemonImg, "types": pokemonType, "desc": pokemonDesc };
    });

    shinyBtn.addEventListener("click", function shinyImg() {
        pokedex[num] = { "name": pokemonName, "img": pokemonShiny, "types": pokemonType, "desc": pokemonDesc };
    });
}

noBtn.addEventListener("click", async function (evt) {
    h2.innerHTML = Dictionary.no.h2;
    normalBtn.innerHTML = Dictionary.no.normal;
    shinyBtn.innerHTML = Dictionary.no.shiny;
    addToWishlistBtn.innerHTML = Dictionary.no.addToWishlist;
});

enBtn.addEventListener("click", async function (evt) {
    h2.innerHTML = Dictionary.en.h2;
    normalBtn.innerHTML = Dictionary.en.normal;
    shinyBtn.innerHTML = Dictionary.en.shiny;
    addToWishlistBtn.innerHTML = Dictionary.en.addToWishlist;
});


let numOfItems = 0;
let wishlistContent = document.getElementById("wishlistContent");

addToWishlistBtn.addEventListener("click", function () {

    for (let i = 1; i <= pokemonCount; i++) {
        let pokemon = document.getElementById(i);
        pokemon.addEventListener("click", function () {
            selectedPokemonId = i;
        });
    }

    if (selectedPokemonId) {
        numOfItems++;
        let wishlistItem = document.createElement("div");
        let wishlistItemImage = document.createElement("img");
        let wishlistItemName = document.createElement("p");
        wishlistItemImage.src = pokedex[selectedPokemonId]["img"];
        wishlistItemName.innerHTML = pokedex[selectedPokemonId]["name"].toUpperCase();
        let wishlistDelete = document.createElement("button");
        wishlistDelete.innerHTML = "Delete";

        wishlistContent.appendChild(wishlistItem);
        wishlistItem.appendChild(wishlistItemImage);
        wishlistItem.appendChild(wishlistItemName);
        wishlistItem.appendChild(wishlistDelete);

        console.log(numOfItems);

        wishlistDelete.addEventListener("click", function () {
            wishlistItem.remove();
            numOfItems--;
            console.log(numOfItems);
        });
    }
});



