// toggle hamburger
function ToggleMenu(){
    setTimeout(()=>{
        let menu = document.getElementById('menu');
        if(menu.hasAttribute('hidden')){
            menu.removeAttribute('hidden');
        }
        else{
            menu.setAttribute('hidden', true);
        }
    },150);
    
}

console.log("Tic Tac Toe");

//Audios
let clickAudio = new Audio("assets/click.mp3");
let resetAudio = new Audio("assets/reset.mp3");
let winAudio = new Audio("assets/win.mp3");
let gameoverAudio = new Audio("assets/game-over.mp3")
let backgroundmusic = new Audio("assets/Music-Loop-1.mp3");
backgroundmusic.volume = 0.7;
backgroundmusic.play();
setInterval(() => { //audio loop
    backgroundmusic.play();
}, 41000);

//Declarations
let gameDraw = false;
let gameover = false;
let turn = "X";
let boxtextcolor = "red";

//Function to replace gifs
const imgReplace = ()=>{
    if(turn == "X"){
        img1.setAttribute('hidden', true);
        winImg1.style.width = "16vw";
    }
    else{
        img2.setAttribute('hidden', true);
        winImg2.style.width = "16vw";
    }
}


//Function to reset gifs
const imgReset = ()=>{
    imgbox.innerHTML = `
    <div>
        <img id="winImg1" class="w-[0vw] ml-[3vw] transition-all duration-1000 ease-in-out" src="assets/HappySpongebob.gif" alt="Error">
        <img id="img1" class="w-[20vw]" src="assets/X-letter.gif" alt="X">
        <img id="winImg2" class="w-[0vw] ml-[3vw] transition-all duration-1000 ease-in-out" src="assets/HappySpongebob.gif" alt="Error">
        <img id="img2" class="w-[20vw]" src="assets/O-letter.gif" alt="O">
    </div>`;
    
}

//Function to change the turn and change color
const changeTurn = (element)=>{ 
    element.style.color = boxtextcolor;
    boxtextcolor = boxtextcolor == "red" ? "blue" : "red";
    
    return turn == "X"? "O": "X";
}

let boxes = document.getElementsByClassName("box");

//Function to check win and draw
const checkWinner = () =>{
    //Game win
    let wins = [
        [0,1,2,3,5,0,4,9,0],
        [3,4,5,3,15,0,4,30,0],
        [6,7,8,3,25,0,4,50,0],
        [0,3,6,-7,15,90,-16,29,90],
        [1,4,7,3,15,90,4,29,90],
        [2,5,8,13,15,90,24,29,90],
        [0,4,8,3,15,45,4,29,45],
        [2,4,6,3,15,-45,4,29,-45],
    ];
    wins.forEach(e =>{ 
        if((boxes[e[0]].innerHTML == boxes[e[1]].innerHTML) && (boxes[e[1]].innerHTML == boxes[e[2]].innerHTML) && (boxes[e[0]].innerHTML != "")){
            document.getElementById("TurnFor").innerHTML = boxes[e[0]].innerHTML + " Won!";
            gameover = true;
            winAudio.play();
            imgReplace();
            
            //This code is for drawing animation line
            let x = window.matchMedia("(max-width: 767px)");
            if(x.matches){
                line.style.width = "52vw";
                line.style.transform = `translate(${e[6]}vw, ${e[7]}vw) rotate(${e[8]}deg)`;
            }
            else{
                line.style.width = "24vw";
                line.style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            }
            AllotEvents();
        }
    });

    //Game Draw
    if(!gameover){
        let boxArray = Array.from(boxes);
        for(let i=0; i<9; i++){
            
            if(boxArray[i].innerHTML != ""){
                gameDraw = true;
            }
            else{
                gameDraw = false;
                break;
            }
        }
        if(gameDraw){
            TurnFor.innerHTML = "Game Draw!";
            gameoverAudio.play();
            gameover = true;
        }
    }
};

//Game Logic
let Events = [];
for(let i=1; i<10; i++){
    
    let event = function (){
        if(boxes[i-1].innerHTML == ""){
            boxes[i-1].innerHTML = turn;
            turn = changeTurn(boxes[i-1]);
            clickAudio.play();
            checkWinner();
            if(!gameover){
                document.getElementById("TurnFor").innerHTML = "Turn For " + turn;
            }
        }
    }
    Events.push(event);
}
AllotEvents();
function AllotEvents(){
    let i = 0;
    Array.from(boxes).forEach(element=>{

        if(gameover){
            element.removeEventListener("click", Events[i]);
        }
        if(!gameover){
            element.addEventListener("click", Events[i]);
        }
        i++;
    });
}

//Reset button resets all the things
reset.addEventListener("click", (e)=>{
    e.preventDefault();
    resetAudio.play();
    Array.from(boxes).forEach(element =>{
        element.innerHTML = "";
    });
    gameDraw = false;
    gameover = false;
    turn = "X";
    boxtextcolor = "red";
    TurnFor.innerHTML = "Turn For X"
    imgReset();
    line.style.width = "0vw";
    line.style.transform = `translate(0vw, 0vw) rotate(0deg)`;
    AllotEvents();
});