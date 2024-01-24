
function flip(img , qs){
    let imgElmnt = document.getElementById(img);
    let qsElmnt = document.getElementById(qs);
    imgElmnt.style.display='block';
    qsElmnt.style.display='none';

    console.log(imgElmnt);
    console.log(qsElmnt);

    return;
}


if (window.innerHeight > window.innerWidth) {
    portrait = true;
} else {
    portrait = false;
}