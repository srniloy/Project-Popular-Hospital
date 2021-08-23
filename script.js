








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
    console.log("first: "+ (textLength+textBoxLength));

    setTimeout(()=>{
        textForSlide.style.display = "none";
        textForSlide.style.transition = `all 0s`;
        console.log("second: "+ textBoxLength);
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



