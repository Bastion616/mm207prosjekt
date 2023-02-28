import Dictionary from './DictionaryModule/dictionary.mjs';
console.log(Dictionary);

const pokemonCount = 151;
let pokedex = {}; 
let noBtn = document.getElementById("no");
let enBtn = document.getElementById("en");
let normalBtn = document.getElementById("normal");
let shinyBtn = document.getElementById("shiny");

window.onload = async function() 
{

    for (let i = 1; i <= pokemonCount; i++)
    {
        await getPokemon(i);

        //Gets the names and id of the pokemon and displays them in the div in uppercase. 
        let pokemon = document.createElement("div");
        pokemon.id = i;
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase(); 
        pokemon.classList.add("pokemon-name");

        

        pokemon.addEventListener("click", function updatePokemon()
        {
            document.getElementById("pokemon-img").src = pokedex[this.id]["img"];

            //Remove previous type
            let typesDiv = document.getElementById("pokemon-types");
            while (typesDiv.firstChild) 
            {
                typesDiv.firstChild.remove();
            }

            //Update types
            let types = pokedex[this.id]["types"];
            for (let i = 0; i < types.length; i++) 
            {
                let type = document.createElement("span");
                type.innerText = types[i]["type"]["name"].toUpperCase();
                type.classList.add("type-box");
                type.classList.add(types[i]["type"]["name"]);
                typesDiv.append(type); 
            }

            //Update descripton
            document.getElementById("pokemon-description").innerText = pokedex[this.id]["desc"];

             //Update image
            let pokemonImg = pokedex[this.id]["img"];
            let pokemonShiny = pokedex[this.id]["shinyImg"];
            if (document.getElementById("normal").checked) 
            {
                document.getElementById("pokemon-img").src = pokemonImg;
            } 
            else if (document.getElementById("shiny").checked) 
            {
                document.getElementById("pokemon-img").src = pokemonShiny;
            }
        });

        document.getElementById("pokemon-description").innerText = pokedex[1]["desc"];

        document.getElementById("pokemon-list").append(pokemon);
    }

    console.log(pokedex);
}

async function getPokemon(num) 
{
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

    pokedex[num] = {"name" : pokemonName, "img" : pokemonImg, "types" : pokemonType, "desc" : pokemonDesc};

    normalBtn.addEventListener("click", function normalImg()
    {
        pokedex[num] = {"name" : pokemonName, "img" : pokemonImg, "types" : pokemonType, "desc" : pokemonDesc};
    });

    shinyBtn.addEventListener("click", function shinyImg()
    {
        pokedex[num] = {"name" : pokemonName, "img" : pokemonShiny, "types" : pokemonType, "desc" : pokemonDesc};
    });
}

noBtn.addEventListener("click", async function(evt){
    h2.innerHTML = Dictionary.no.h2;
    normalBtn.innerHTML = Dictionary.no.normal;
    shinyBtn.innerHTML = Dictionary.no.shiny;
});

enBtn.addEventListener("click", async function(evt){
    h2.innerHTML = Dictionary.en.h2;
    normalBtn.innerHTML = Dictionary.en.normal;
    shinyBtn.innerHTML = Dictionary.en.shiny;
});