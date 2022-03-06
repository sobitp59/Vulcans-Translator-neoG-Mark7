const btn = document.querySelector('.speakBtn');
const input = document.querySelector('.input');
const output = document.querySelector('.output');

// Speech Recognition
var SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();


// Speech Synthesizer
function readOutLoud(message){
    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}

btn.addEventListener('click', function(){
    btn.style.background = 'none';
    btn.style.color = 'rgb(249,41,65)';
    
   recognition.start();
   console.log('start')
   
   
   recognition.onresult = function(event){

    const current = event.resultIndex;
    const transcriptInput = event.results[current][0].transcript;
    input.textContent = transcriptInput;
     
    const url = 'https://api.funtranslations.com/translate/vulcan.json';

    function serverUrl(text){
        return url + '?text=' + text;
    }

    function errorHandler(error){
        alert(`Sorry! We have a mission, will talk to you later. Okay!`);
    }
    
    const translated = () => {
        let inputData = transcriptInput;   
        fetch(serverUrl(inputData))
        .then(res => res.json())
        .then(json => {
            let translateOut = json.contents.translated;
            readOutLoud(translateOut);
            output.innerText = translateOut;
        }) 
        .catch(errorHandler)
            
    }
translated();
}   

});

