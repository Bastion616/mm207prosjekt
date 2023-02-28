import Dictionary from './DictionaryModule/dictionary.mjs';
        
let noBtn = document.getElementById("no");  
let enBtn = document.getElementById("en");
let vits = document.getElementById("vits");
let h1 = document.getElementById("h1");

noBtn.addEventListener("click", async function(evt){
    let resp = await fetch("/joke/no");
    let data = await resp.json();
    vits.innerHTML = data.joke;
    h1.innerHTML = Dictionary.no.h1;
    h2.innerHTML = Dictionary.no.h2;
});

enBtn.addEventListener("click", async function(evt){
    let resp = await fetch("/joke/en");
    let data = await resp.json();
    vits.innerHTML = data.joke;
    h1.innerHTML = Dictionary.en.h1;
    h2.innerHTML = Dictionary.en.h2;
}); 