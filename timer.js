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
}