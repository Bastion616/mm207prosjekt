export const pokemonCount = 151;

export async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let res = await fetch(url);
    let pokemon = await res.json();

    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["front_default"];
    let pokemonShiny = pokemon["sprites"]["front_shiny"];

    res = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await res.json();
    pokemonDesc = pokemonDesc["flavor_text_entries"][9]["flavor_text"];

    return { "name": pokemonName, "img": pokemonImg, "types": pokemonType, "desc": pokemonDesc, "shinyImg": pokemonShiny };
}