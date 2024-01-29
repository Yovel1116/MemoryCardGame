
let form = document.getElementById('form');
form.style.display='none';//hide game until start click

var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
if (isMobile ) {//Change style due to screen size
    let qsmark,img; 
    for(let i=1;i<17;i++){
        qsmark = document.getElementById("qs"+i.toString());
        img = document.getElementById("img"+i.toString());
        img.style.width = '120px'; 
        qsmark.style.width='120px';
        qsmark.style.height='120px';
    }            
   let timer =document.getElementById('timer').style.fontSize='80px';
   let controlbtn1 =document.getElementById('controlbtn1').style.fontSize='50px';
   let controlbtn2 =document.getElementById('controlbtn2').style.fontSize='50px';
   let controlbtn3 =document.getElementById('controlbtn3').style.fontSize='50px';




   

    
}

let click=0,fliped=0; //Counter for match cards & clicks
let img1,img2,qsmark1,qsmark2; // Variables for 2 diff cards (front&back sides)
let images= document.getElementsByClassName('images');//Catch all images
let Card2IDs =[];// reset 2 fliped Cards ID
let imgElement;//Variable to catch images src's by ID
let srcArray=['img/img-1.png','img/img-2.png','img/img-3.png','img/img-4.png',
'img/img-5.png','img/img-6.png','img/img-7.png','img/img-8.png'];

shufflecards(srcArray,imgElement);

function shufflecards(srcArray,imgElement){//This function mix src's images and put them into cards
    
    for(i=srcArray.length-1;i>0;i--){//Shuffle members in array randomaly  
        const j = Math.floor(Math.random() * (i+1))
        const temp = srcArray[i];
        srcArray[i]=srcArray[j]
        srcArray[j] = temp;}

    for(i=1;i<9;i++){//Set src's in each img element
        imgElement = document.getElementById('img' + i.toString());
        imgElement.src = srcArray[i-1]; }

    for(i=srcArray.length-1;i>0;i--){//Shuffle members in array randomaly
        const j = Math.floor(Math.random() * (i+1))
        const temp = srcArray[i];
        srcArray[i]=srcArray[j]
        srcArray[j] = temp; }

    for(i=9;i<17;i++){//Set src's in each img element
        imgElement = document.getElementById('img' + i.toString());
        imgElement.src = srcArray[i-9];}
    return;
}

function flip(img , qs,cardID){//This function "flip" cards, display image and hide qs mark
    Card2IDs.push(document.getElementById(cardID));
    click++;//count clicks
    if(click==1){//click on first card
        let imgElmnt1 = document.getElementById(img);
        let qsElmnt1 = document.getElementById(qs);
        imgElmnt1.style.display='block';//display image
        qsElmnt1.style.display='none';//hide QS mark    
        img1=imgElmnt1;//Set updated object with new display
        qsmark1=qsElmnt1;//Set updated object with new display
        Card2IDs[0].style.pointerEvents ='none';//avoid user click on the same card twice
    }
    if(click==2){//click on second card
        disclk();//function to disable user click more then 2 times
        let imgElmnt2 = document.getElementById(img);
        let qsElmnt2 = document.getElementById(qs);
        imgElmnt2.style.display='block';//display image
        qsElmnt2.style.display='none';//hide QS mark
        img2=imgElmnt2;//Set updated object with new display
        qsmark2=qsElmnt2;//Set updated object with new display
        checkEQ(img1,img2,Card2IDs);//Check if there is a match
        Card2IDs =[]; // reset 2 ID's  
    }
    if(fliped==16){//Winning game after 16 flip cards
        clearInterval(interval);

        confetti({//start confetti
            spread: 180,
            particleCount: 200,
            ticks:300,
            gravity:1.2
          });
        setTimeout(function(){//reload page after 4.5 sec
            location.reload();
        },4500);}
    return;
}

function checkEQ(img1,img2,Card2IDs){//Function to check equal of 2 ID's
    let src1 = document.getElementById(img1.id).src;//Save src of img1
    let src2 = document.getElementById(img2.id).src;//Save src of img2
    if(src1==src2){//if there is a match reset click and count 2 flip cards
        click=0;
        fliped+=2;
        Card2IDs[0].removeAttribute('onclick');//avoid user click on the same card twice
        Card2IDs[1].removeAttribute('onclick');//avoid user click on the same card twice
    }
    else {//if there is no match reset click and call unflip function
        click=0;
        unflip(img1,img2);}
    setTimeout(returnclick,370);//disable user to click other cards before unfliping
    return;
}

function returnclick(){//Function to return the click event
    let cards = document.getElementsByClassName('cards');
    for(i=0;i<16;i++){//return all click events to the cards
        cards[i].style.pointerEvents = 'auto'; }
    return;
}

function unflipdelay(){//return images to hide and show qs marks
    img1.style.display="none";
    img2.style.display="none";
    qsmark1.style.display="block";
    qsmark2.style.display="block";
    return;
}

function unflip(){//Call unflip function with delay 
    setTimeout(unflipdelay,420);
    return;
}

function disclk(){//Function to remove click event from cards to avoid 3 click and more
    let cards = document.getElementsByClassName('cards');
    for(i=0;i<16;i++){
        cards[i].style.pointerEvents = 'none';}
    return;
}




const btnStartElement = document.querySelector('[data-action="start"]');
const btnStopElement = document.querySelector('[data-action="stop"]');
const btnResetElement = document.querySelector('[data-action="reset"]');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
let timerTime = 0;
let interval;

function hidestart() {
    btnStartElement.style.pointerEvents ='none';
}

const start = () => {
  form.style.display='grid';
  btnStartElement.style.opacity='0.5';
  isRunning = true;
  interval = setInterval(incrementTimer, 1000)
}

const stop = () => {
    form.style.display='none';
    btnStartElement.style.opacity='1';

  isRunning = false;
  clearInterval(interval);
  btnStartElement.style.pointerEvents ='auto';

}

const reset = () => {
  minutes.innerText = '00';
  seconds.innerText = '00';
}

const pad = (number) => {
  return (number < 10) ? '0' + number : number;
}

const incrementTimer = () => {
  timerTime++;
  
  const numberMinutes = Math.floor(timerTime / 60);
  const numberSeconds = timerTime % 60;
  
  minutes.innerText = pad(numberMinutes);
  seconds.innerText = pad(numberSeconds);
}

btnStartElement.addEventListener('click', startTimer = () => {
  start();
});

btnStopElement.addEventListener('click', stopTimer = () => {
  stop();
});

btnResetElement.addEventListener('click', stopTimer = () => {
  reset();
});


