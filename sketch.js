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
var timerState;

//create the name variable required in the form class
var name;

// initialize the userCount
var userCount = 0;

// initialize the database variable
var database;

// initialize the userIndex variable
var userIndex;

// initialize the picture variables
var bg;
var submit;

// create the time getting variables
var hr, min, sec, dy, mon, yr;

function preload(){
  //load the sounds
  startSound = loadSound("sounds/startSound.mp3");
  intSound = loadSound("sounds/intSound.mp3");
  endSound = loadSound("sounds/endSound.mp3");

  // load the background picture
  bg = loadImage("pics/bg.jfif");

  // load the submit button
  // submit = loadImage("pics/submit.png");
}

function setup(){
  //create the canvas and pu it in a division
  canvas = createCanvas(600,400);
  canvas.parent('canvascontainer');

   
  //create the form
  form = new Form();

  // link the database to the firebase
  database = firebase.database();

  // create the user
  user = new User();

  // create the timer;
  timer = new Timer

  // get the state
  timer.getState1();

  //activate the startButton
  var startButton = select('#startButton');
  startButton.mousePressed(startCounting);

  // activate the stopButton
  var stopButton = select('#stopButton');
  stopButton.mousePressed(stopCounting);

  // activate the reset button
  var resetButton = select('#resetButton');
  resetButton.mousePressed(timer.reset);

  // activate the breakButton
  var breakButton = select('#breakButton');
  breakButton.mousePressed(takeBreak);

  // activate the power buttons
  var onButton = select('#onButton');
  onButton.mousePressed(powerOn);
  
  var offButton = select('#offButton');
  offButton.mousePressed(powerOff);
  
  
 
}

function draw(){
  //set the background colour
  background(bg);

  

  //show the form
  // if(timerState === "off"){
  //   form.hide();
  // }
  // else{
    form.display();
  // }
  
  
  //show the display of the timer
  // when the timer is off
  if(timerState === "on" || timerState === "submitted"){
  fill(255);
  textSize(74);
  text("Time : 0 : 0 : 0",50,200); 
  }
  // when the timer is stopped
  if(timerState === "stop"){
    fill(255);
    textSize(74);
    text("Time : " + hours + " : " + minutes + " : " + seconds,50,200);  
    }

  //start the timer
  //start counting
  if(timerState === "start"){
    fill(255);
    textSize(74);
    text("Time : " + hours + " : " + minutes + " : " + seconds,50,200); 

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
    if(minutes > 30 && minutes < 31){
      intSound.play();
      fill(255);
      textSize(74);
      text("It's break time",150,100);
      text("Click on 'Take a break' button to take break",10,200); 
    }
  }
  // start break countdown
  if(timerState === "break"){
    // show the countdown time
    fill(255);
    textSize(60);
    text("Break ends in : "+cdMin+" : "+cdSec,10,200);
    
    // decrease the minutes
    if(cdSec === 0){
      cdSec = 59;
      cdMin-=1;
      
    }

    // decrease the seconds
    if(frameCount%30 === 0){
      cdSec-=1;
      tCdSec-=1;
    }
    
    //resume the timer
    if(tCdSec === 0){
      timer.updateState("start");
      tCdSec = 177;
      cdMin = 3;
      cdSec = 0;
    }
  }
 console.log(tSec);
  
  
  // if(timerState === 2){
    
  //   form.getTime();
  // }

  // update the userCount
  var userCountRef = database.ref("userCount");
  userCountRef.on("value",(data)=>{
    userCount = data.val();
  })
  
  drawSprites();
}
//start counting
startCounting = ()=>{  
  if(timerState === "submitted"){
    timer.updateState("start");
    startSound.play();
  }
  
}
//end counting
stopCounting = ()=>{
  if(timerState === "start" || timerState === "break"){
    timer.updateState("stop");
    endSound.play();  
    // show the result
    form.showResult();
    // set the worked seconds value
    user.secondsWorked = tSec;
    //set the number of breaks taken
    user.breaksTaken = breaks;

    hr = hour();
    min = minute();
    sec = second();
    dy = day();
    mon = month();
    yr = year();
    var localtime = [];
    localtime.push(dy,mon,yr,hr,min,sec);
    user.eT = localtime;

    user.updateDetails();
    
  }
}



//pause the timer for three-minutes-break
takeBreak = ()=>{
  if(timerState === "start"){
    timer.updateState("break");
    breaks+=1;
    intSound.stop();
  }
}

// power functions
powerOn = ()=>{  
  // timer.getState1();
  if(timerState === "off"){
    // get the local time of the user
    hr = hour();
    min = minute();
    sec = second();
    dy = day();
    mon = month();
    yr = year();
    var localtime = [];
    localtime.push(dy,mon,yr,hr,min,sec);
    user.sT = localtime;
    user.getUserCount();
    userCount+=1;
    user.index= userCount;  
    user.updateCount(userCount);
    user.timerState = "on";
    user.update();
    timer.getState2();
  }
  // timer.updateState("on");
}
powerOff = ()=>{
  timer.reset();
  timer.updateState("off");
  form.clear();
  
}
