let buttonColor = ["red", "blue", "green", "yellow"];
let gamePattern = []
let userClickedPattern = [];
let started = false;
let level = 0;
$(document).keydown(function () {
    if (started === false) {
        $("#level-title").text("level " + level);
        nxtSequence();
        started = true;
    }
});
$(".btn").on("click", function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length - 1);
})
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nxtSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");

        },100);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function nxtSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("level " + level);
    let randomNumber = Math.round(Math.random() * 3);
    let randomChoosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#" + randomChoosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor)
}
function startOver(){
level=0;
gamePattern=[];
started=false;
}
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3")
    audio.play();

}
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100)
}