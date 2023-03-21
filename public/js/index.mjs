import Dictionary from '../DictionaryModule/dictionary.mjs';

const registerBt = document.getElementById("register");
const submitLoginBt = document.getElementById("submitLogin");
const submitRegBt = document.getElementById("submitRegistration");

const createUserForm = document.getElementById("CreateUserForm");
const createLoginForm = document.getElementById("CreateLoginForm");
const pokedexPage = document.getElementById("pokedexPage");

const noBtn = document.getElementById("no");
const enBtn = document.getElementById("en");
const normalBtn = document.getElementById("normal");
const shinyBtn = document.getElementById("shiny");
const wishlistTxt = document.getElementById("wishlist");
const logoutBt = document.getElementById("logoutBt");
const addToWishlistBtn = document.getElementById("addToWishlist");

createLoginForm.classList.remove('hidden');
createUserForm.classList.add('hidden');
pokedexPage.classList.add('hidden');

let userId = null;

registerBt.onclick = (e) => {
    e.preventDefault();
    createUserForm.classList.toggle("hidden");
    pokedexPage.classList.add("hidden");
    createLoginForm.classList.toggle("hidden");
}

const pokemonCount = 151;
let pokedex = {};
let selectedPokemonId = null;

window.onload = async function () {

    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);

        let pokemon = document.createElement("div");
        pokemon.id = i;
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
        pokemon.classList.add("pokemonName");

        pokemon.addEventListener("click", function updatePokemon() {
            selectedPokemonId = parseInt(this.id);
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

    async function registerUser() {
        const usernameInput = document.getElementById('usernameRegister');
        const passwordInput = document.getElementById('passwordRegister');

        const response = await fetch('/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: usernameInput.value, password: passwordInput.value })
        });

        if (response.ok) {
            let data = await response.json();
            console.log(data);
            alert("New user created");
        }
    }

    let isLoggedIn = false;
let wishlistContent = document.createElement("ul");

async function fetchWishlistItems(userId) {
    try {
        const response = await fetch(`/wishlist/${userId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching wishlist items:', error);
    }
}

async function loginUser() {
    const usernameLogin = document.getElementById('usernameLogin');
    const passwordLogin = document.getElementById('passwordLogin');

    const response = await fetch('/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: usernameLogin.value, password: passwordLogin.value })
    });

    if (response.ok) {
        let data = await response.json();
        console.log(data);

        userId = data.id;
        isLoggedIn = true;
        console.log("User is logged in: " + isLoggedIn);
        console.log("User ID: " + userId);
        document.getElementById("CreateLoginForm").classList.add("hidden");
        document.getElementById("pokedexPage").classList.remove("hidden");

        const wishlistItems = await fetchWishlistItems(userId);
        console.log(wishlistItems);

        wishlistContent.innerHTML = '';
        numOfItems = 0;
        wishlistItems.forEach(wishlistItem => {
            numOfItems++;
            let wishlistListItem = document.createElement("li");
            wishlistListItem.classList.add("wishlist-item");
            let wishlistItemImage = document.createElement("img");
            let wishlistItemName = document.createElement("p");
            wishlistItemImage.src = pokedex[wishlistItem.pokemon_id]["img"];
            wishlistItemName.innerHTML = pokedex[wishlistItem.pokemon_id]["name"].toUpperCase();
            let wishlistDelete = document.createElement("button");

            let trashcanImage = document.createElement("img");
            trashcanImage.src = "../Images/trashcan.png";
            trashcanImage.alt = "Delete";
            trashcanImage.style.width = "45px";
            trashcanImage.style.height = "50px";
            trashcanImage.style.display = "block";
            trashcanImage.style.margin = "auto";

            wishlistContent.appendChild(wishlistListItem);
            wishlistListItem.appendChild(wishlistItemImage);
            wishlistListItem.appendChild(wishlistItemName);
            wishlistListItem.appendChild(wishlistDelete);
            wishlistDelete.appendChild(trashcanImage);

            wishlistDelete.addEventListener("click", async function () {
                try {
                    const response = await fetch('/wishlist/delete', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ userId: userId, pokemon_id: wishlistItem.pokemon_id })
                    });

                    if (response.ok) {
                        wishlistListItem.remove();
                        numOfItems--;
                        console.log(numOfItems);
                    } else {
                        console.error('Error deleting item from wishlist.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            });
        });
        document.getElementById("wishlistContent").appendChild(wishlistContent);
    } else {
        alert('Login failed. Please check your credentials.');
    }
}

    function logoutUser() {
        userId = null;
        isLoggedIn = false;
        console.log("User is logged in: " + isLoggedIn);
        document.getElementById("CreateLoginForm").classList.remove("hidden");
        document.getElementById("pokedexPage").classList.add("hidden");
        document.getElementById("CreateUserForm").classList.add("hidden");
        document.getElementById("usernameLogin").value = "";
        document.getElementById("passwordLogin").value = "";
    }

    registerBt.addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById('CreateUserForm').classList.remove('hidden');
        document.getElementById('CreateLoginForm').classList.add('hidden');
    });

    submitRegBt.addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById('CreateUserForm').classList.add('hidden');
        document.getElementById('CreateLoginForm').classList.remove('hidden');
        registerUser();
    });

    submitLoginBt.addEventListener('click', (event) => {
        event.preventDefault();
        loginUser();
    });

    logoutBt.addEventListener('click', (event) => {
        event.preventDefault();
        logoutUser();
    })

    normalBtn.addEventListener("click", function normalImg() {
        if (selectedPokemonId) {
            document.getElementById("pokemonImg").src = pokedex[selectedPokemonId]["img"];
        }
    });

    shinyBtn.addEventListener("click", function shinyImg() {
        if (selectedPokemonId) {
            document.getElementById("pokemonImg").src = pokedex[selectedPokemonId]["shinyImg"];
        }
    });
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

    pokedex[num] = { "name": pokemonName, "img": pokemonImg, "types": pokemonType, "desc": pokemonDesc, "shinyImg": pokemonShiny };
}

noBtn.addEventListener("click", async function () {
    h2.innerHTML = Dictionary.no.h2;
    normalBtn.innerHTML = Dictionary.no.normal;
    shinyBtn.innerHTML = Dictionary.no.shiny;
    addToWishlistBtn.innerHTML = Dictionary.no.addToWishlist;
    wishlistTxt.innerHTML = Dictionary.no.wishlist;
    logoutBt.innerHTML = Dictionary.no.logoutBt;
});

enBtn.addEventListener("click", async function () {
    h2.innerHTML = Dictionary.en.h2;
    normalBtn.innerHTML = Dictionary.en.normal;
    shinyBtn.innerHTML = Dictionary.en.shiny;
    addToWishlistBtn.innerHTML = Dictionary.en.addToWishlist;
    wishlistTxt.innerHTML = Dictionary.en.wishlist;
    logoutBt.innerHTML = Dictionary.en.logoutBt;
});

let numOfItems = 0;
let wishlistContent = document.createElement("ul");

addToWishlistBtn.addEventListener("click", async function () {

    if (!userId) {
        alert('Please log in before adding Pokémon to the wishlist.');
        return;
    }

    if (selectedPokemonId) {
        try {
            const response = await fetch('/wishlist/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userId, pokemonId: selectedPokemonId })
            });

            if (response.ok) {
                numOfItems++;
                let wishlistItem = document.createElement("li");
                wishlistItem.classList.add("wishlist-item");
                let wishlistItemImage = document.createElement("img");
                let wishlistItemName = document.createElement("p");
                wishlistItemImage.src = pokedex[selectedPokemonId]["img"];
                wishlistItemName.innerHTML = pokedex[selectedPokemonId]["name"].toUpperCase();
                let wishlistDelete = document.createElement("button");

                let trashcanImage = document.createElement("img");
                trashcanImage.src = "../Images/trashcan.png";
                trashcanImage.alt = "Delete";
                trashcanImage.style.width = "45px";
                trashcanImage.style.height = "50px";
                trashcanImage.style.display = "block";
                trashcanImage.style.margin = "auto";

                wishlistContent.appendChild(wishlistItem);
                wishlistItem.appendChild(wishlistItemImage);
                wishlistItem.appendChild(wishlistItemName);
                wishlistItem.appendChild(wishlistDelete);
                wishlistDelete.appendChild(trashcanImage);

                console.log(numOfItems);

                wishlistDelete.addEventListener("click", function () {
                    wishlistItem.remove();
                    numOfItems--;
                    console.log(numOfItems);
                });
                document.getElementById("wishlistContent").appendChild(wishlistContent);
            } else {
                console.error('Error adding Pokémon to wishlist.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
});


