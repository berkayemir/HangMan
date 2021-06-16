const world_el = document.getElementById("word");
const popup = document.getElementById("popup-container");
const correctLetters = []
const wrongLetters = [];
const message_el = document.getElementById("success-message");
let selectedWord = getRandomWord();
const wrongLetters_el=document.getElementById("wrong-letters")
const items=document.querySelectorAll(".item")
const message_=document.getElementById("message")
const PlayAgainBtn=document.getElementById("play-again")

function getRandomWord() {
    const words = ["javascript", "java", "python","css","alper","yasemin","berkay"]

    return words[Math.floor(Math.random() * words.length)]
}


function displayWord() {


    world_el.innerHTML = `
    ${selectedWord.split('').map(letter => `
        <div class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
        </div>
    `).join('')}

    `;

    const w = world_el.innerText.replace(/\n/g, '');
    if (w === selectedWord) {
        popup.style.display = "flex";
        message_el.innerText = 'Tebrikler Kazandınız.'
    }


}
function updateWrongLetters(){
    wrongLetters_el.innerHTML=`
        ${wrongLetters.length>0?"<h3>Hatalı Harfler</h3>":""}
        ${wrongLetters.map(letter=>`<span>${letter}<span>`)}
    
    `;
    items.forEach((items,index)=>{
        const errorCount=wrongLetters.length;
        
        if(index<errorCount){
            items.style.display="block";
        }else{
            items.style.display="none";
        }
    })

    if(wrongLetters.length == items.length){
        popup.style.display = "flex";
        message_el.innerText = 'Maalesef kaybettiniz.'
    }
}

function displayMessage(){
    message.classList.add("show")
    
    setTimeout(function(){
        message.classList.remove("show");
    },2000);
}
PlayAgainBtn.addEventListener("click",function(){
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord=getRandomWord();

    displayWord();
    updateWrongLetters();
     popup.style.display="none";
})

window.addEventListener("keydown", function (e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter=e.key;

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            }else{
                displayMessage();
              

            }
        }else {
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                //hatalı harfleri güncelle
                updateWrongLetters();
            }
        }
    }



})

displayWord();