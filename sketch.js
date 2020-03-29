//initiate the time-element variables
var seconds = 00, minutes = 00, hours = 00, tSec = 00;
var finSeconds,finMinutes,finHours;
var breaks = 0;

//initiate the break countDown variables
var cdSec = 0, cdMin = 3, tCdSec = 177;

//initiate the sound variables
var startSound, intSound, endSound;

//initiate the canvas variable
var canvas;

//initiate the timerState
var timerState = "off";

//create the name variable required in the form class
var name;

// initialize the userCount
var userCount = 0;

// initialize the database variable
var database;

// initialize the userIndex variable
var userIndex;

function preload(){
  //load the sounds
  startSound = loadSound("sounds/startSound.mp3");
  intSound = loadSound("sounds/intSound.mp3");
  endSound = loadSound("sounds/endSound.mp3");
}

function setup(){
  //create the canvas and pu it in a division
  canvas = createCanvas(300,100);
  canvas.parent('canvascontainer');

  //activate the startButton
  var startButton = select('#startButton');
  startButton.mousePressed(startCounting);

  // activate the stopButton
  var stopButton = select('#stopButton');
  stopButton.mousePressed(stopCounting);

  // activate the reset button
  var resetButton = select('#resetButton');
  resetButton.mousePressed(resetTimer);

  // activate the breakButton
  var breakButton = select('#breakButton');
  breakButton.mousePressed(takeBreak);
  
  //create the form
  form = new Form();

  // link the database to the firebase
  database = firebase.database();

  // create the user
  user = new User();
}

function draw(){
  //set the background colour
  background(0);

  //show the form
  form.display();
  
  //show the display of the timer
  // when the timer is off
  if(timerState === "off"){
  fill(255);
  textSize(32);
  text("Time : 0 : 0 : 0",10,50); 
  }
  // when the timer is stopped
  if(timerState === "stop"){
    fill(255);
    textSize(32);
    text("Time : " + hours + " : " + minutes + " : " + seconds,10,50);  
    }

  //start the timer
  //start counting
  if(timerState === "start"){
    fill(255);
    textSize(32);
    text("Time : " + hours + " : " + minutes + " : " + seconds,10,50); 

    //increase the seconds
    if(frameCount%30 === 0){
      seconds+=1;
      tSec++;
    }

    //increase the minutes
    if(seconds === 60){
      seconds=00;
      minutes+=1;
    }

    //increase the hours
    if(minutes === 60){
      minutes=00;
      seconds = 00;
      hours+=1;
    }

    //remind the user at every 30 minutes
    if(minutes === 30){
      intSound.play();
      
    }
  }
  // start break countdown
  if(timerState === "break"){
    // show the countdown time
    fill(255);
    textSize(28);
    text("Break ends in : "+cdMin+" : "+cdSec,10,50);
    
    // decrease the minutes
    if(cdSec === 0){
      cdSec = 59;
      cdMin-=1;
      
    }

    // decrease the seconds
    if(frameCount%2 === 0){
      cdSec-=1;
      tCdSec-=1;
    }
    
    //resume the timer
    if(tCdSec === 0){
      timerState = "start";
    }
  }
 console.log(tCdSec);
  
  
  // if(timerState === 2){
    
  //   form.getTime();
  // }

  // update the userCount
  var userCountRef = database.ref("userCount");
  userCountRef.on("value",(data)=>{
    userCount = data.val();
  })
  
}
//start counting
startCounting = ()=>{  
  if(timerState === "off" || timerState === "break"){
    timerState = "start";
    startSound.play();
  }
  
}
//end counting
stopCounting = ()=>{
  if(timerState === "start" || timerState === "break"){
    timerState = "stop";
    endSound.play();  
    // show the result
    form.showResult();
    // set the worked seconds value
    user.secondsWorked = tSec;
    //set the number of breaks taken
    user.breaksTaken = breaks;
    
  }
}

//reset the timer
resetTimer = ()=>{
  if(timerState === "stop"){
    timerState = "off";
    seconds = 0;
    minutes = 0;
    hours = 0;
    cdSec = 0;
    cdMin = 3;
  }
}

//pause the timer for three-minutes-break
takeBreak = ()=>{
  if(timerState === "start"){
    timerState = "break";
    breaks+=1;
  }
}