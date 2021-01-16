var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;
//if we click on start/reset button
document.getElementById("startreset").onclick = 
function(){
    //if we are playing
    if(playing == true){
        location.reload(); //reload page
    }
    else{//if we are not playing
        
        //change mode to playing
        playing = true;

        //set score to 0

        score = 0;
        document.getElementById("scorevalue").innerHTML = score;

        //show countdown
        // document.getElementById("timeremaining").style.display = "block";
        show("timeremaining");
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        
        //hide gameover
        hide("gameover");
        //change button to reset
        document.getElementById("startreset").innerHTML = "Reset Game";

        //start countdown
        startCountdown();

        //generate new Q&A

        generateQA();
    }
}

//clicking answer box
for(i=1;i<5;i++){
    document.getElementById("box"+i).onclick = function(){
    
        //check if we are playing
        if(playing == true){
            if(this.innerHTML == correctAnswer){
                //correct answer
                score++;
                document.getElementById("scorevalue").innerHTML = score;
    
                //hide wrong box and show correct box
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                }, 1000);
    
                //generate new Q&A
                generateQA();
            }else{
                //wrong answer
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                }, 1000);
            }
        }
    }
}

//reload page



//reduce time by 1sec in loops
//timeleft
//yes=>continue
//no=>game over

//generate new q&a

//if we click on ans box
//if we are playing
//correct?
//yes->increase score
//show correct box for 1sec
//generate new Q&A
//wrong->try agrin for 1 sec


//functions

//start counter
function startCountdown() {
    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining == 0){
            //game over
            stopCountdown();

            // document.getElementById("gameover").style.display = "block";
            show("gameover");

            document.getElementById("gameover").innerHTML = "<p>Game Over!</p> <p>Your Score is " + score + ".</p>";

            // document.getElementById("timeremaining").style.display = "none";
            hide("timeremaining");

            hide("correct");
            hide("wrong");
            playing = false;
            //make reset button to start game after game over message
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);
}

//stop counter
function stopCountdown() {
    clearInterval(action);
}


//hide an element
function hide(Id) {
    document.getElementById(Id).style.display = "none";
}


//show counter box
function show(Id) {
    document.getElementById(Id).style.display = "block";
}

//generate Q&A
function generateQA() {
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "X" + y;

    var correctPostion = 1 + Math.round(3*Math.random());
    document.getElementById("box"+correctPostion).innerHTML = correctAnswer;//fill one box with correct answer

    var answers = [correctAnswer];

    //fill with wrong ans.
    for(i=1;i<5;i++){
        if(i != correctPostion){
            var wrongAnswer;
            do{
                wrongAnswer = (1 + Math.round(9*Math.random()))+(1 + Math.round(9*Math.random())); //wrong answer
            }while(answers.indexOf(wrongAnswer)>-1)

            
            document.getElementById("box"+i).innerHTML = wrongAnswer;

            answers.push(wrongAnswer);
        }
    }
}