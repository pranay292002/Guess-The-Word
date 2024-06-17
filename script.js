let word = "word";
let hint = "hint";
const startBtn = document.querySelector('.start');
const checkBtn = document.querySelector('.guess');
let hintText = document.querySelector('#hint-text');
const scrambled = document.querySelector('.scrambled');
const result = document.querySelector('.result');
let input = document.querySelector('input');
let time = document.getElementById('time');
let pointText = document.getElementById('points');
const resetBtn = document.querySelector('.reset')
let point = 0;
let shuffled ="shuffled";
let answer ="answer";
let sec = 30;
let timer;





async function getWord() {

    let response = await fetch(`https://random-word-api.vercel.app/api?words=1&length=7`);
    let arr = await response.json();
    return arr[0];
}

async function getWordDef(gameWord) {
    let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${gameWord}`);
    let arr = await response.json();

    return arr[0].meanings[0].definitions[0].definition;
}

function displayLetters(shuffled){

    scrambled.innerHTML = "";

    for(let i =0; i<shuffled.length; i++){
         scrambled.innerHTML += `<span>${shuffled[i]}</span>`
    }
   


}

async function startGame (){
     if(startBtn.innerHTML === 'Start'){

        startBtn.innerHTML = 'Change Word'
     }

     clearInterval(timer);


     word = await  getWord();
     hint = await getWordDef(word);

     hintText.innerHTML = hint;

     shuffled = word.split('').sort(function(){return 0.5-Math.random()}).join('');

    
     displayLetters(shuffled.toUpperCase());

     result.innerHTML ="";

     sec = 30;

     timer = setInterval(()=>{
     
        sec --;
        time.innerHTML = sec;


    },1000)

    setInterval(()=>{

        if(sec == 0){
            clearInterval(timer);
            sec = 30;
            point-- ;
            pointText.innerHTML = point;
            result.innerHTML = `<h3>Oops! Time Over.</h3> <br> <h4>The Answer Was ${word}</h4>`;
            setTimeout(()=>{
            result.innerHTML = `<h3>Now Guess The Next Word...</h3>`
            },3000)
            
            setTimeout(startGame, 5000);
        }

    })

    


}



startBtn.addEventListener('click', startGame);

resetBtn.addEventListener('click', ()=>{
    clearInterval(timer);
    word = " ";
    displayLetters(word);
    hint = "Hint will appear here"
    hintText.innerHTML = hint;
    point = 0;
    pointText.innerHTML = point;
    sec = 30;
    time.innerHTML = sec;
    startBtn.innerHTML = 'Start';
    input.value = "";
    result.innerHTML = "";

});

checkBtn.addEventListener('click', () =>{

    if(startBtn.innerHTML === 'Start'){
        result.innerHTML = `<h3>Please Start The Game.</h3>`;
    }
    else{

        
    clearInterval(timer);

    answer = input.value.trim();

    if(answer.toUpperCase() === word.toUpperCase()){
        point++;
       
        result.innerHTML = `<h3>Excellent! Correct Answer.</h3>`;
        pointText.innerHTML = point;
     
    }
    else{
        point--;

        result.innerHTML = `<h3>Oops! Wrong Answer.</h3> <br> <h4>The Answer Was ${word}</h4>`;
        pointText.innerHTML = point;
    }

    setTimeout(nextWord, 3000)
    
    setTimeout(startGame, 5000);

    }

});


function nextWord(){

    result.innerHTML = `<h3>Now Guess The Next Word...</h3>`

}
