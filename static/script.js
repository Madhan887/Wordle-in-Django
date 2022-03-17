
document.addEventListener("DOMContentLoaded",()=>{
    createSquares();
    wordle=['which','there','their','about','would','these','other','words','could','write',
    'first','water','after','where','right','think','three','years','place','sound','great'];
    let guessedWords=[[]];
    let availableSpace=1;
    let word=wordle[Math.floor(Math.random()*wordle.length)];
    let guessedWordCount=0;
    keys=document.querySelectorAll(".keyboard-row button");
    
    
    function getCurrentWordArr(){
        numberOfGuessedWords = guessedWords.length
        return guessedWords[numberOfGuessedWords - 1]
    }
    
    function updateGuessedWords(letter){
        currentWordArr=getCurrentWordArr()
        if (currentWordArr && currentWordArr.length < 5){
            currentWordArr.push(letter);
            availableSpaceEl=document.getElementById(String(availableSpace));
            availableSpace=availableSpace+1;
            availableSpaceEl.textContent=letter;
        }
    }
    
    function getTileColor(letter,index){
        isCorrectLetter=word.includes(letter);
        if(!isCorrectLetter){
            return "grey";
        }
        letterInThatPosition=word.charAt(index);
        isCorrectPosition=(letter===letterInThatPosition);
    
        if (isCorrectPosition){
            return "rgb(83,141,78)";
        }
    
        return "rgb(181,159,59)";
    }
    function handleSubmitWord(){
        currentWordArr=getCurrentWordArr();
        currentWord=currentWordArr.join('');
        firstLetterId=guessedWordCount*5+1;
        interval=200;
        currentWordArr.forEach((letter,index)=>{
        setTimeout(()=>{
            const tileColor=getTileColor(letter,index);
            letterId=firstLetterId+index;
            letterEl=document.getElementById(letterId);
            letterEl.classList.add("animate__flipInX");
            letterEl.style='background-color:'+tileColor+';border-color:'+tileColor+'';
            },interval*index)
        });
    
        guessedWordCount+=1;
        if (currentWord===word){
            window.alert("Congratulation")
        }
        if (guessedWords.length===6){
            window.alert('sorry,you have no more guesses! The word is '+word+'.')
        }
        guessedWords.push([])
    }
    function createSquares() {
        gameboard=document.getElementById("board");
        
        for(let index=0;index<30;index++)
        {
        square=document.createElement("div");
        square.classList.add("square");
        square.classList.add("animate_animated");
        square.setAttribute("id",index+1);
        gameboard.appendChild(square);
        }
    }
    
    function handleDeleteLetter(){
        currentWordArr=getCurrentWordArr();
        removedLetter=currentWordArr.pop();
        guessedWords[guessedWords.length-1]=currentWordArr;
        LastLetterEl=document.getElementById(String(availableSpace-1));
        LastLetterEl.textContent='';
        availableSpace=availableSpace-1;
    }

    for (let i=0;i< keys.length;i++){
        keys[i].onclick=({target})=>{
        letter= target.getAttribute("data-key");
    if (letter==="enter"){
        currentWordArr=getCurrentWordArr()
    if (currentWordArr.length!==5){
        window.alert("word must be 5 letters");
        return;
    }
    else{
        handleSubmitWord()
        return;
    }
    }
    if (letter==="del"){
        handleDeleteLetter()
        return;
    }
    
    updateGuessedWords(letter)
    }
    }
    }
    )

