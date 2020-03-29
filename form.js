class Form{
    constructor(){
        this.input = createInput("Enter your name");
        this.greeting = createElement('h2');
        this.button = createButton("Submit");
        this.instruct = createElement('h3');
        this.result = createElement('h2');
        this.time = createElement('h3');
        this.breaks = createElement('h3');
    }
    display(){
        this.input.position(10,50);
        this.button.position(200,50);
        // if(timerState === "off"){
            this.button.mousePressed(()=>{
                // timerState === "submitted";
                
                this.input.hide();
                this.button.hide();
                user.name = this.input.value();
                user.getUserCount();
                userCount+=1;
                user.index = userCount;
                user.updateCount(userCount);
                
                this.greeting.html("Hello "+ user.name);
                this.instruct.html("Please click on 'start' button to start counting");
            })  
        // }
    }
    // getTime(){
    //     finSeconds = seconds;
    //     finMinutes = minutes;
    //     finHours = hours;
    // }
    showResult(){
        this.result.html("Result:");
        this.time.html("Time worked : "+hours+" : "+minutes+" : "+seconds);
        this.breaks.html("Breaks taken : "+breaks);
        this.saveButton = createButton("Save Result");
        this.saveButton.mousePressed(()=>{
            user.update();
        })
    }
    // saveResult(){

    // }
}