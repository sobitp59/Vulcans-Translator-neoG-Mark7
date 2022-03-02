const inputArea = document.querySelector('.input-area');
const outputArea = document.querySelector('.output-area');
const btn = document.querySelector('.btn-translate');


const url = 'https://api.funtranslations.com/translate/doge.json';

function serverUrl(text){
    return url + '?text=' + text;
}

function errorHandler(error){
    alert(`something wrong with the server! Try again after sometime.`)
}

const translated = () => {
    let engInput = inputArea.value;
   
    fetch(serverUrl(engInput))
    .then(res => res.json())
    .then(json =>{
        outputArea.innerText =  json.contents.translated;
    }) 
    .catch(errorHandler)
        
}
btn.addEventListener('click', translated);

