let click=0,fliped=0; //Counter for match cards & clicks
let img1,img2,qsmark1,qsmark2; // Variables for 2 diff cards (front&back sides)
let images= document.getElementsByClassName('images');//Catch all images

let array=['img/img-1.png','img/img-2.png','img/img-3.png','img/img-4.png',
'img/img-5.png','img/img-6.png','img/img-7.png','img/img-8.png'];

randomsrc(array,images);//Random all src of all 8 images  

function randomsrc(array,images) {//This function return array after mix ID's of img
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];

    }
    for(let i=0,j=0;i<images.length;i+=2,j++){//Over all images that are not a QS mark
             images[i].src = array[j]; // Set src after mixing
             if(j==7)//Reset j 
                j=-1;       
    }
    return;
  }

function flip(img , qs){//This function "flip" cards, display image and hide qs mark
    click++;//count clicks
    if(click==1){
        let imgElmnt1 = document.getElementById(img);
        let qsElmnt1 = document.getElementById(qs);
        imgElmnt1.style.display='block';//display image
        qsElmnt1.style.display='none';//hide QS mark
        img1=imgElmnt1;//Set updated object with new display
        qsmark1=qsElmnt1;//Set updated object with new display
    }
    if(click==2){
        disclk();//function to disable user click more then 2 times
        let imgElmnt2 = document.getElementById(img);
        let qsElmnt2 = document.getElementById(qs);
        imgElmnt2.style.display='block';//display image
        qsElmnt2.style.display='none';//hide QS mark
        img2=imgElmnt2;//Set updated object with new display
        qsmark2=qsElmnt2;//Set updated object with new display

        checkEQ(img1,img2);//Check if there is a match
        
    }
    if(fliped==16){//Winning game after 16 flip cards
        confetti({//start confetti
            spread: 180,
            particleCount: 200,
            ticks:300,
            gravity:1.2

          });
        setTimeout(function(){//reload page after 4.5 sec
            location.reload();
        },4500);
    }
    return;
}


function checkEQ(img1,img2){//Function to check equal of 2 ID's
    let src1 = document.getElementById(img1.id).src;//Save src of img1
    let src2 = document.getElementById(img2.id).src;//Save src of img2

    if(src1==src2){//if there is a match reset click and count 2 flip cards
        click=0;
        fliped+=2;
    }

    else {//if there is no match reset click and call unflip function
        click=0;
        unflip(img1,img2);
    }

    setTimeout(returnclick,370);//disable user to click other cards before unfliping
    return;
}

function returnclick(){//Function to return the click event
    let cards = document.getElementsByClassName('cards');
    for(i=0;i<16;i++){//return all click events to the cards
        cards[i].style.pointerEvents = 'auto';
    }
    return;
}
function unflipdelay(){//return images to hide and show qs marks
    img1.style.display="none";
    img2.style.display="none";
    qsmark1.style.display="block";
    qsmark2.style.display="block";
}

function unflip(img1,img2){//Call unflip function with delay 
    setTimeout(unflipdelay,420);
  
    return;
}

function disclk(){//Function to remove click event from cards to avoid 3 click and more
    let cards = document.getElementsByClassName('cards');
    for(i=0;i<16;i++){
        cards[i].style.pointerEvents = 'none';
    }
    return;
}










