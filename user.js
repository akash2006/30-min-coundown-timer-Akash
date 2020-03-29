class User{
    constructor(){
        this.index = null;
        this.secondsWorked = 0;
        this.breaksTaken = 0;
        this.name = null;
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
            name:this.name,
            secondsWorked:this.secondsWorked,
            breaksTaken:this.breaksTaken            
        });
    }

    // updateResult(){
    //     database.ref(userIndex).set({
            
    //     })
    // }
}