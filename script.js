
import * as getSlidingCode from './js/sliderCode.js';





// ==================Top Contents Start =============================

// Text Sliding Animation ----------------->

const textForSlide = document.querySelector('.sliding-info-container');
const textForSlidesBox = document.querySelector('.sliding-info');
const textLength = textForSlide.offsetWidth;
const textBoxLength = textForSlidesBox.offsetWidth;


slidingText();
setInterval(()=>{
    slidingText();
},21000);



function slidingText(){
    textForSlide.style.transform = `translatex(-${textLength+textBoxLength}px)`;

    setTimeout(()=>{
        textForSlide.style.display = "none";
        textForSlide.style.transition = `all 0s`;
        setTimeout(()=>{
            textForSlide.style.transform = `translatex(${textBoxLength}px)`;
            setTimeout(()=>{
                textForSlide.style.display = "flex";
                textForSlide.style.transition = `all 20s cubic-bezier(1,1,1,1)`;
            },100);
        },500);
    },20000);

}


// =================== Flashing content Animation ====================

const flashContent = document.querySelectorAll('.flash-info .flash-item');
const secondFlashContent = document.querySelectorAll('.top-middle-third-col .second-flash-info');

    flashContent.forEach(element =>{
        setInterval(()=>{
            element.style.opacity = 0;
            setTimeout(()=>{
                element.style.opacity = 1;
            },400);
        },1000);
    });
    secondFlashContent.forEach(element =>{
        setInterval(()=>{
            element.style.opacity = 0;
            setTimeout(()=>{
                element.style.opacity = 1;
            },500);
        },1000);
    });





// ======================================Top Contents End ===============================================



// Dropdown in Top Navabr -------------------->

const dropDownParentLi = document.querySelectorAll('.top-nav-dropdown-li');
const dropDownUl = document.querySelectorAll('.top-nav-dropdown-ul');
const topNavbarLi = document.querySelectorAll('.navbar-unorder-list ul li.parent-list');
const topNavbarA = document.querySelectorAll('.parent-list .parent-a');

dropDownParentLi.forEach((element,i) =>{
    element.addEventListener('mouseover',()=>{
        dropDownUl[i].style.display = "block";
        setTimeout(() => {
            dropDownUl[i].style.opacity = 1;
        }, 50);
    });
    element.addEventListener('mouseleave',()=>{
        dropDownUl[i].style.display = "none";
        dropDownUl[i].style.opacity = 0;
    });
});
topNavbarLi.forEach((element,i)=>{
    element.addEventListener('mouseover',()=>{
        element.style.backgroundColor = "#fff";
        topNavbarA[i].style.color = "#444";
    });
    element.addEventListener('mouseleave',()=>{
        element.style.backgroundColor = "#00984a";
        topNavbarA[i].style.color = "#fff";
    });
});




// <--------------------------------


// Carousel slider for home ------------------------>


const Cslider1Area = document.querySelector('.carousel-slider1');
const Cslider1LeftBtnBox = document.querySelector('.carousel-slider1 .left-btn');
const Cslider1RightBtnBox = document.querySelector('.carousel-slider1 .right-btn');
const Cslider1Slides = document.querySelectorAll('.carousel-slider1 .slide');
const Cslider1LeftBtn = document.querySelector('.carousel-slider1 .left-btn i');
const Cslider1RightBtn = document.querySelector('.carousel-slider1 .right-btn i');

let Cslider1SlidesNumber=0;
let btnSide = 1;
var slideLoadingInterval;







window.onload = ()=>{
    carouselSliding();
}

window.addEventListener('resize',()=>{
    Cslider1Slides.forEach(element=>{
        element.style.width = Cslider1Area.offsetWidth + "px";
    });
});

Cslider1Slides.forEach((element,i)=>{
    element.style.width = Cslider1Area.offsetWidth + "px";
    element.style.background = `url("/Project-Popular-Hospital/img/slide0${i+1}.jpg")`;
    element.style.backgroundPosition = "center";
    element.style.backgroundSize = "cover";
});


let slidingAutoAnimate = setInterval(() => {
    Cslider1SlidesNumber++;
    carouselSliding();
}, 5000);

function carouselSliding(){
    let number;
    if(Cslider1SlidesNumber <= -4){Cslider1SlidesNumber=0;}
    else if(Cslider1SlidesNumber >= 4){Cslider1SlidesNumber=0;}
    if(Cslider1SlidesNumber <0){number = Cslider1SlidesNumber*-1;}
    else{number = Cslider1SlidesNumber;}

    Cslider1Slides.forEach(element=>{
        element.style.opacity = 0;
        element.classList.remove("active-carousel-slide-h5");
        element.classList.remove("active-carousel-slide-h1");
        element.classList.remove("active-carousel-slide-button");
    });
    Cslider1Slides[number].style.opacity = 1;
    setTimeout(() => {
        Cslider1Slides[number].classList.add('active-carousel-slide-h5');
        setTimeout(() => {
            Cslider1Slides[number].classList.add('active-carousel-slide-h1');
            setTimeout(() => {
                Cslider1Slides[number].classList.add('active-carousel-slide-button');
            }, 500);
        }, 500);
    }, 1000);

}

let CsliderLeftBtnEnable = true;
let CsliderRightBtnEnable = true;
Cslider1LeftBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    if(CsliderLeftBtnEnable){
        Cslider1SlidesNumber--;
        carouselSliding();
        btnSide = 0;
        slideLoadingInterval = setInterval(SlideLoading,25);
        CsliderLeftBtnEnable = false;
        CsliderRightBtnEnable = false;
        Cslider1LeftBtn.style.display = "none";
        setTimeout(() => {
            CsliderLeftBtnEnable = true; 
            CsliderRightBtnEnable = true; 
            Cslider1LeftBtn.style.display = "block";
        }, 3000);
    }
});
Cslider1RightBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    if(CsliderRightBtnEnable){
        Cslider1SlidesNumber++;
        carouselSliding();
        btnSide = 1;
        slideLoadingInterval = setInterval(SlideLoading,25);
        CsliderRightBtnEnable = false;
        CsliderLeftBtnEnable = false;
        Cslider1RightBtn.style.display = "none";
        setTimeout(() => {
            CsliderRightBtnEnable = true; 
            CsliderLeftBtnEnable = true; 
            Cslider1RightBtn.style.display = "block";
        }, 3000);
    }
    

});


// For touch in mobile ---->

Cslider1LeftBtnBox.addEventListener('touchstart',(e)=>{
    e.preventDefault();
    clearInterval(slidingAutoAnimate);
    if(CsliderLeftBtnEnable){
        Cslider1SlidesNumber--;
        carouselSliding();
        btnSide = 0;
        slideLoadingInterval = setInterval(SlideLoading,25);
        CsliderLeftBtnEnable = false;
        CsliderRightBtnEnable = false;
        Cslider1LeftBtn.style.display = "none";
        setTimeout(() => {
            CsliderLeftBtnEnable = true; 
            CsliderRightBtnEnable = true; 
            Cslider1LeftBtn.style.display = "block";
            slidingAutoAnimate = setInterval(() => {Cslider1SlidesNumber++; carouselSliding();}, 5000);
        }, 3000);
    }
});

Cslider1RightBtnBox.addEventListener('touchstart',(e)=>{
    e.preventDefault();
    clearInterval(slidingAutoAnimate);

    if(CsliderRightBtnEnable){
        Cslider1SlidesNumber++;
        carouselSliding();
        btnSide = 1;
        slideLoadingInterval = setInterval(SlideLoading,25);
        CsliderRightBtnEnable = false;
        CsliderLeftBtnEnable = false;
        Cslider1RightBtn.style.display = "none";
        setTimeout(() => {
            CsliderRightBtnEnable = true; 
            CsliderLeftBtnEnable = true; 
            Cslider1RightBtn.style.display = "block";
            slidingAutoAnimate = setInterval(() => {Cslider1SlidesNumber++; carouselSliding();}, 5000);
        }, 3000);
    }
});
// <----------------



Cslider1Area.addEventListener('mouseover',()=>{
    clearInterval(slidingAutoAnimate);
    Cslider1LeftBtnBox.style.display = "block";
    Cslider1RightBtnBox.style.display = "block";
    setTimeout(() => {
        Cslider1LeftBtnBox.style.opacity = "1";
        Cslider1RightBtnBox.style.opacity = "1";
    }, 20);
});
Cslider1Area.addEventListener('mouseleave',()=>{
    slidingAutoAnimate = setInterval(() => {carouselSliding();}, 7000);
    Cslider1LeftBtnBox.style.opacity = "0";
    Cslider1RightBtnBox.style.opacity = "0";
    setTimeout(() => {
        Cslider1LeftBtnBox.style.display = "none";
        Cslider1RightBtnBox.style.display = "none";
    }, 500);
});



const leftRightCanvas = document.querySelectorAll('.carousel-slider1-area canvas');

let startAngle = 0;
let ctx = leftRightCanvas[btnSide].getContext("2d");
let cntrl = 0;
let x = leftRightCanvas[btnSide].width/2;
let y = leftRightCanvas[btnSide].height/2;
let r = ((x+y)/2);
let endAngle = (2*Math.PI*cntrl)/100;

function SlideLoading(){
    ctx = leftRightCanvas[btnSide].getContext("2d");
    cntrl++;
    endAngle = (2*Math.PI*cntrl)/100;

    ctx.beginPath();
    ctx.arc(x,y,r,startAngle,endAngle);
    ctx.fillStyle = "#222";
    ctx.lineTo(x,y);
    ctx.fill();
    ctx.closePath();

    if(cntrl >= 100){
        cntrl = 0;
        ctx.clearRect(0,0,100,100);
        clearInterval(slideLoadingInterval);
    }

}
//30s




//  <-------------------------------------------------------












