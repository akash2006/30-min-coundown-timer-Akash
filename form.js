class Form{
    constructor(){       
        this.input = createInput("Enter your name");
        this.button = createButton("Submit"); 
        // this.button.addImage(submit);   
        // this.button.scale = 0.25;                
        // this.input.html(setAttribute("placeholder","Enter your name"));    
        this.greeting = createElement('h2');        
        // this.button.parent("#submit");
        this.instruct = createElement('h3');
        this.result = createElement('h2');
        this.time = createElement('h3');
        this.breaks = createElement('h3');
    }
    // hide(){
    //     if(timerState === "off"){
    //         this.input.hide();
    //         this.button.hide();
    //     }
    // }

    clear(){
        this.input.value("Enter your name");
        this.input.show();
        this.button.show();
    }

    display(){
        // if(timerState === "on"){
            this.input.position(200,50);
            this.button.position(390,50);
            
            // this.button.addImage(submit);
            if(timerState === "on"){
                this.button.mousePressed(()=>{
                    timer.updateState("submitted");
                    // getElementByName(this.input);
                    console.log(this.input.value());
                    this.input.hide();
                    this.button.hide();
                    user.name = this.input.value();
                    // user.getUserCount();
                    // userCount+=1;
                    // user.index = userCount;
                    // user.updateCount(userCount);
                    user.updateName();
                    this.greeting.html("Hello "+ user.name);
                    this.instruct.html("Please click on 'start' button to start counting");
                })  
            }
        // }    
    }
    // getTime(){
    //     finSeconds = seconds;
    //     finMinutes = minutes;
    //     finHours = hours;
    // }
    showResult(){
        if(timerState === "stop"){
            this.result.html("Result:");
            this.time.html("Time worked : "+hours+" : "+minutes+" : "+seconds);
            this.breaks.html("Breaks taken : "+breaks);
            // this.saveButton = createButton("Save Result");
            // this.saveButton.mousePressed(()=>{
            //     user.updateDetails();
            // })  
        }
    }
    // saveResult(){

    // }

    // setAttribute(type,value){

    // }
}
