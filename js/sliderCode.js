

export {sliderCode}


function sliderCode(sliderArea,sliderContainer,slideBox,slides,leftBtn,rightBtn,dots,displaySlide){
    this.sliderArea = sliderArea;
    this.sliderContainer = sliderContainer;
    this.slideBox = slideBox;
    this.slides = slides;
    this.leftBtn = leftBtn;
    this.rightBtn = rightBtn;
    if(dots != null){this.dots = dots;}
    this.displaySlide = displaySlide;
    this.cloneSlideBox;




    this.leftWidthOfSlider = sliderArea.offsetLeft;
    this.clickedPositionXOfSlider;
    this.instantMovingPositionXOfSlider;
    this.dragedValueXOfSlider;
    this.translatedValueXOfSlider = 0;
    this.instantTranslatedValueXOfSlider;
    this.XForChangesInSlideBox = (this.slides[0].offsetWidth * (displaySlide+1));
    this.XForChangesInCloneSlideBox = this.XForChangesInSlideBox + this.slideBox.offsetWidth;
    this.cloneSliderPosition;
    this.SliderPosition;
    
    this.isdraging;
    this.isDragingLeft;
    this.isUp = true;
    this.isLeave = true;
    this.isStartPositioningSlideBox;
    this.isStartPositioningcloneSlideBox;
    
    this.doForSlideBoxRight;
    this.doForCloneSlideBoxRight;
    this.doForSlideBoxLeft;
    this.doForCloneSlideBoxLeft;
    this.slideNumberByButton = 0;
    
    this.autoAnimatingTimeInterval;


    this.leftBtnAction = function(){
 
        this.slideNumberByButton++;
        this.translatedValueXOfSlider = this.slides[0].offsetWidth * this.slideNumberByButton;
        this.instantTranslatedValueXOfSlider = this.translatedValueXOfSlider;
        this.AniOfSliding();
        this.animationOfDots();
    }


    this.rightBtnAction = function(){
 
        this.slideNumberByButton--;
        this.translatedValueXOfSlider = this.slides[0].offsetWidth * this.slideNumberByButton;
        this.instantTranslatedValueXOfSlider = this.translatedValueXOfSlider;
        this.AniOfSliding();
        this.animationOfDots();
    }






    this.mouseLeave = function(){
        this.isdraging = false;
        this.isLeave = true;
        if(this.isUp == false){
            this.upOrLeaveAction();
            this.isUp = true;
        }
        // autoAnimatingTimeInterval = setInterval(() => {rightBtnAction();},1500);
    }
 
    this.mouseOver = function(){
        //clearInterval(this.autoAnimatingTimeInterval);
    }
    this.mouseUp = function(){
        this.isdraging = false;
        if(this.isLeave == false){this.upOrLeaveAction(); this.isLeave = true;}
        this.isUp = true;
    }
    this.mouseDown = function(e){
 
        this.isdraging = true;
        this.clickedPositionXOfSlider = e.pageX - this.leftWidthOfSlider;
    }
    this.mouseMove = function(e){
        if(this.isdraging){
        
 
        
            this.dragedValueXOfSlider = (e.pageX-this.leftWidthOfSlider) - this.clickedPositionXOfSlider;
            this.instantMovingPositionXOfSlider = e.pageX - this.leftWidthOfSlider;
            this.instantTranslatedValueXOfSlider = this.translatedValueXOfSlider + this.dragedValueXOfSlider;
            if(this.dragedValueXOfSlider<0){this.isDragingLeft = true;}
            else if(this.dragedValueXOfSlider>0){this.isDragingLeft = false;}
            
            this.slideBox.style.transition = `all 0ms`;
            this.cloneSlideBox.style.transition = `all 0ms`;
            this.AniOfSliding();
            this.isUp = false;
            this.isLeave = false;
        }
    }




    this.WorkOfSliding = function(){

       this.cloneSlideBox = this.slideBox.cloneNode(true);
       this.cloneSlideBox.style.left = "-"+this.slideBox.offsetWidth + "px";
       this.cloneSlideBox.classList.add("cloned-slide-box");
       this.sliderContainer.appendChild(this.cloneSlideBox);


       this.slideBox.style.width = (this.slides[0].offsetWidth)*this.slides.length + "px";
       this.cloneSlideBox.style.width = (this.slides[0].offsetWidth)*this.slides.length + "px";
       
       
       //this.autoAnimatingTimeInterval = setInterval(() => {this.rightBtnAction();}, 1500)
       
       
       
       
    }






   
   this.animationOfDots = function(){
       
       if(dots != null){
        this.dots.forEach(element =>{
            element.style.backgroundColor = "#ddd";
            element.style.transform = `scale(0.8,0.8)`;
         });
         let x = this.slideNumberByButton, y = this.slideNumberByButton;
         if((this.slideNumberByButton<0) && ((this.slides.length * -2) < this.slideNumberByButton)){
             x = x * (-1);
             if(x>(this.slides.length-1)){x = x-this.slides.length;}
             if(x==(this.slides.length * 2)){x = 0;console.log("here");}
             
             this.dots[x].style.backgroundColor = "#222";
             this.dots[x].style.transform = `scale(1,1)`;
         }
         else if(this.slideNumberByButton>0){
             y = (this.slides.length*2) - this.slideNumberByButton;
             if(y>(this.slides.length-1)){ y=y-this.slides.length;}
             
             this.dots[y].style.backgroundColor = "#222";
             this.dots[y].style.transform = `scale(1,1)`;
         }else if(this.slideNumberByButton == 0){
             this.dots[0].style.backgroundColor = "#222";
             this.dots[0].style.transform = `scale(1,1)`;
         }
       }
        
   }  
   
   
   
   
   this.upOrLeaveAction = function(){

       this.translatedValueXOfSlider += this.dragedValueXOfSlider;

       let slideNumber;
       if(this.dragedValueXOfSlider<0){
           slideNumber = Math.floor(this.translatedValueXOfSlider/slides[0].offsetWidth);
       }else{
           slideNumber = Math.ceil(this.translatedValueXOfSlider/slides[0].offsetWidth);
       }

       console.log("real slide number: "+slideNumber);
       this.translatedValueXOfSlider = this.slides[0].offsetWidth * slideNumber;
       this.instantTranslatedValueXOfSlider = this.translatedValueXOfSlider;
       this.slideNumberByButton = slideNumber;
       setTimeout(() => {
           this.slideBox.style.transition = `all 300ms`;
           this.cloneSlideBox.style.transition = `all 300ms`;
           this.animationOfDots();
           this.AniOfSliding();
       }, 100);
   }
   
   
   
   
   
   
   
   
   // Changing Animation of slides -------------------------->
   
   
   
   this.AniOfSliding = function(){
       
       console.log("translated value : "+ this.instantTranslatedValueXOfSlider);

      // reset ->
      
      if(this.instantTranslatedValueXOfSlider >= (this.slideBox.offsetWidth*2)){
          this.translatedValueXOfSlider = 0;
          this.slideNumberByButton = 0;
          console.log("instant n: "+ this.slideNumberByButton);
   
      }
      if(this.instantTranslatedValueXOfSlider <= (this.slideBox.offsetWidth*(-2))){
          this.translatedValueXOfSlider = 0;
          this.slideNumberByButton = 0;
          
        }
   
      // <-
   
   
      // Right Slde Transition ->
   
      
      
      if(((this.XForChangesInSlideBox * (-1)) <= this.instantTranslatedValueXOfSlider) 
      && (0 >= this.instantTranslatedValueXOfSlider)){
          this.doForCloneSlideBoxRight = true;
          this.cloneSlideBox.style.transform = `translateX(${this.instantTranslatedValueXOfSlider}px)`;
      }
      else if((this.XForChangesInSlideBox * (-1)) > this.instantTranslatedValueXOfSlider){
   
          this.cloneSliderPosition = (this.slideBox.offsetWidth*2) + this.instantTranslatedValueXOfSlider;
          
          if(this.doForCloneSlideBoxRight){
              this.cloneSlideBox.style.zIndex = "-1";
              setTimeout(()=>{
                  this.cloneSlideBox.style.transform = `translateX(${this.cloneSliderPosition}px)`;
                  setTimeout(() => {
                      this.cloneSlideBox.style.zIndex = "1";
                  }, 300);
              },40);
              this.doForCloneSlideBoxRight = false;
          }else{
              this.cloneSlideBox.style.transform = `translateX(${this.cloneSliderPosition}px)`;
          }
      }
   
   
      if(((this.XForChangesInCloneSlideBox * (-1)) <= this.instantTranslatedValueXOfSlider)
      && (0 >= this.instantTranslatedValueXOfSlider)){
          this.slideBox.style.transform = `translateX(${this.instantTranslatedValueXOfSlider}px)`;
          this.doForSlideBoxRight = true;
      }
      else if((this.XForChangesInCloneSlideBox * (-1)) > this.instantTranslatedValueXOfSlider){
          this.SliderPosition = (this.cloneSlideBox.offsetWidth*2) + this.instantTranslatedValueXOfSlider;

          if(this.doForSlideBoxRight){
   
              this.slideBox.style.zIndex = "-1";
              setTimeout(()=>{
                  this.slideBox.style.transform = `translateX(${this.SliderPosition}px)`;
                  setTimeout(() => {
                      this.slideBox.style.zIndex = "1";
                  }, 300);
              },40);
   
   
              this.doForSlideBoxRight = false;
          }else{
              this.slideBox.style.transform = `translateX(${this.SliderPosition}px)`;
          }
      }
   
   
      // <-
   

   

      // Left Side Transition ->
      console.log("---------===========: "+(this.XForChangesInSlideBox * (1.2)));
   
      if(((this.XForChangesInSlideBox ) >= this.instantTranslatedValueXOfSlider)
      && (0 <= this.instantTranslatedValueXOfSlider)){
          this.slideBox.style.transform = `translateX(${this.instantTranslatedValueXOfSlider}px)`;
          this.doForSlideBoxLeft = true;
      }
      else if((this.XForChangesInSlideBox) < this.instantTranslatedValueXOfSlider){

              this.cloneSliderPosition = (this.slideBox.offsetWidth*(-2)) + this.instantTranslatedValueXOfSlider;
              //cloneSlideBox.style.left = `${cloneSlidePosition}px`;
      
              if(this.doForSlideBoxLeft){
                  this.slideBox.style.zIndex = "-1";
              setTimeout(()=>{
                  this.slideBox.style.transform = `translateX(${this.cloneSliderPosition}px)`;
                  setTimeout(() => {
                      this.slideBox.style.zIndex = "1";
                  }, 300);
              },40);
                  this.doForSlideBoxLeft = false;
              }else{
                  this.slideBox.style.transform = `translateX(${this.cloneSliderPosition}px)`;
              }
          }
   
   
   
      if(((this.XForChangesInCloneSlideBox) >= this.instantTranslatedValueXOfSlider) 
      && (0 <= this.instantTranslatedValueXOfSlider)){
          this.cloneSlideBox.style.transform = `translateX(${this.instantTranslatedValueXOfSlider}px)`;
          this.doForCloneSlideBoxLeft = true;
      }
      else if((this.XForChangesInCloneSlideBox) < this.instantTranslatedValueXOfSlider){
          this.SliderPosition = (this.slideBox.offsetWidth*(-2)) + this.instantTranslatedValueXOfSlider;
          
          if(this.doForCloneSlideBoxLeft){
              this.cloneSlideBox.style.zIndex = "-1";
              setTimeout(()=>{
                  this.cloneSlideBox.style.transform = `translateX(${this.SliderPosition}px)`;
                  setTimeout(() => {
                      this.cloneSlideBox.style.zIndex = "1";
                  }, 300);
              },40);
              this.doForCloneSlideBoxLeft = false;
          }else{
              this.cloneSlideBox.style.transform = `translateX(${this.SliderPosition}px)`;
          }
      }

      // <---
   
   
   
   
   }


}