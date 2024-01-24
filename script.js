let click=0;
let fliped=0;
let img1,img2;
let qsmark1,qsmark2;
let images= document.getElementsByClassName('images');

let array=['img/img-1.png','img/img-2.png','img/img-3.png','img/img-4.png',
'img/img-5.png','img/img-6.png','img/img-7.png','img/img-8.png'];
randomsrc(array,images);//random src images  


function randomsrc(array,images) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];

    }
    for(let i=0,j=0;i<images.length;i+=2,j++){// all images that are not QS marks
             images[i].src = array[j]; 
             if(j==7)
                j=-1;       
    }
    return;
  }

function flip(img , qs){
    click++;
    if(click==1){
        let imgElmnt1 = document.getElementById(img);
        let qsElmnt1 = document.getElementById(qs);
        imgElmnt1.style.display='block';
        qsElmnt1.style.display='none';
        
        img1=imgElmnt1;
        qsmark1=qsElmnt1;
        
    
    }
    if(click==2){
        disclk();//function to disable more then 2 clickes

        let imgElmnt2 = document.getElementById(img);
        let qsElmnt2 = document.getElementById(qs);
        imgElmnt2.style.display='block';
        qsElmnt2.style.display='none';
        
        img2=imgElmnt2;
        qsmark2=qsElmnt2;

        checkEQ(img1,img2);
        
    }
    if(fliped==16){
        confetti({
            spread: 180,
            particleCount: 200,
            ticks:300,
            gravity:1.2

          });
        setTimeout(function(){
            location.reload();
        },4500);
    }
    return;
}


function checkEQ(img1,img2){
    let src1 = document.getElementById(img1.id).src;
    let src2 = document.getElementById(img2.id).src;

    if(src1==src2){
        click=0;
        fliped+=2;
    }

    else {
        click=0;
        unflip(img1,img2);
    }

    setTimeout(returnclick,370);
     
    return;
}

function returnclick(){
    let cards = document.getElementsByClassName('cards');
    for(i=0;i<16;i++){
        cards[i].style.pointerEvents = 'auto';
    }
    return;
}
function delay(){
    img1.style.display="none";
    img2.style.display="none";
    qsmark1.style.display="block";
    qsmark2.style.display="block";
}

function unflip(img1,img2){
    setTimeout(delay,500);
  
    return;
}




function disclk(){
    let cards = document.getElementsByClassName('cards');
    for(i=0;i<16;i++){
        cards[i].style.pointerEvents = 'none';
    }
    return;
}




if (window.innerHeight > window.innerWidth) {
    portrait = true;
} else {
    portrait = false;
}







