const btn = document.querySelector('.speakBtn');
const input = document.querySelector('.input');
const output = document.querySelector('.output');




btn.addEventListener('click', function(){
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
        alert(`something wrong with the server! Try again after sometime. ${error.message}`);
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
})



//-------------------- SPEECH -----------------------//

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
// ---------------------- SPEECH ---------------------------//