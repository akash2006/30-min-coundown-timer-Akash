class Timer{
    constructor(){}
    getState(){
        var stateRef = database.ref("timerState");
        stateRef.on("value",(data)=>{
            timerState = data.val();
        })
    }

    updateState(state){
        database.ref('/').update({
            timerState:state
        })
    }

    //reset the timer
    reset(){
        if(timerState === "stop"){
            timer.updateState("submitted");
            seconds = 0;
            minutes = 0;
            hours = 0;
            tSec = 0;
            cdSec = 0;
            cdMin = 3;
            // remove(form.showResult());
        }
    }
}
