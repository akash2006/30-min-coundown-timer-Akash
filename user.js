class User{
    constructor(){
        this.index = null;
        this.secondsWorked = 0;
        this.breaksTaken = 0;
        this.name = null;
        this.timeState = null;
        this.sT = null;
        this.eT = null;
    }
    
    getUserCount(){
        var userCountRef = database.ref('userCount');
        userCountRef.on("value",(data)=>{
            userCount = data.val();
        })
    }

    updateCount(count){
        database.ref('/').update({
            userCount:count
        });
    }

    update(){
        userIndex = "users/user"+this.index;
        database.ref(userIndex).set({
            startTime:this.sT,
            timerState:this.timerState            
        });
    }

    updateDetails(){
        database.ref("users/user"+this.index+"/").update({
            endTime:this.eT,
            secondsWorked:this.secondsWorked,
            breaksTaken:this.breaksTaken
        });
        
    }

    updateName(){
        database.ref("users/user"+this.index+"/").update({
            name:this.name
        })
    }

    // updateResult(){
    //     database.ref(userIndex).set({
            
    //     })
    // }
}
