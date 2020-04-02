class Timer{
    constructor(){}
    getState1(){
        var stateRef = database.ref("timerState");
        stateRef.on("value",(data)=>{
            timerState = data.val();
        })
    }

    getState2(){
        var stateRef = database.ref("users/user"+user.index+"/timerState");
        stateRef.on("value",(data)=>{
            timerState = data.val();
        })
    }

    updateState(state){
        database.ref('users/user'+user.index+'/').update({
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
            breaks= 0;
            // remove(form.showResult());
        }
    }
}
