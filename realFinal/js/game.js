// JavaScript Document
var win = 0;
var kolOfStars = 3;
var attempt = 0;
var timer = 0;
var GoodWin = 20;
var GreatWin = 20;
var img = new Image();
var canvas = document.getElementById("myGame");
var ctx = canvas.getContext("2d");
$(document).ready(function () {
    var piecesArray = ["typescript", "typescript", "angular", "angular",
        "bootstrap", "bootstrap", "react", "react",
        "backbone", "backbone", "ember", "ember",
        "require", "require", "vue", "vue",
        "aurelia", "aurelia", "polymer", "polymer"];
    shuffleArray(piecesArray);
    populateSpans(piecesArray);
    setInterval(draw, 10);
    var $box1 = undefined;
    var $box2 = undefined;
    $("td").click(function () {
        //test to make sure the user clicked on a hidden piece
        if ($(this).attr("class") === "hidden") {
            //if it is hidden check to see if it is the first piece clicked
            if ($box1 !== undefined && $box2 !== undefined) {
                hidePiecs($box1);
                hidePiecs($box2);
                $box1 = undefined;
                $box2 = undefined;
            }
            if ($box1 === undefined) {
                //if yes put id in $box1
                $box1 = $(this);
                //remove hidden class and add show class
                showPiece($box1);

            } else {
                //else put id in $box2
                $box2 = $(this);
                //remove hidden class and add show class
                showPiece($box2);

                //check to see if $box1 text === $box2 text
                if ($($box1).data("value") === $($box2).data("value")) {
                    //clear contents of box variables
                    $box1 = undefined;
                    $box2 = undefined;
                    win++;
                    if (win == 10) {
                        var yes = confirm("you win, go play again?\n" + "your stats: time " + (parseInt(timer * 100)) / 100 + " move counter " + attempt + "\nstars " + kolOfStars);
                        kolOfStars = 3;
                        attempt = 0;
                        timer = 0;
                        win = 0;
                    }
                    if (yes) {
                        funcToPlayAgain();

                        function funcToPlayAgain() {
                            console.log("1 1");
                            $("td").removeClass("show").addClass("hidden");
                            console.log("2 2");
                            shuffleArray(piecesArray);
                            console.log("3 3");
                            populateSpans(piecesArray);
                            console.log("4 4");
                            var $box1 = undefined;
                            var $box2 = undefined;
                            console.log("5 5");
                        }
                    }
                } else {
                    //if no remove class show add class hidden

                    setTimeout(function () {
                        $box1 = hidePiecs($box1);
                    }, 2000);
                    setTimeout(function () {
                        $box2 = hidePiecs($box2);
                    }, 2000);

                }
            }
        } else {
            //if not hidden tell them to cick on a hidden piece
            alert("Please click on an empty box");
        }
        $("#reset").click(function () {
            //            var checkPopulateSpans=0;
            $("td").removeClass("show").addClass("hidden");
            shuffleArray(piecesArray);
            populateSpans(piecesArray);
            var $box1 = undefined;
            var $box2 = undefined;
            kolOfStars = 3;
            attempt = 0;
            timer = 0;
        });

    });

});

function shuffleArray(piecesArray) {
    //put the pieces in random order
    $(".hidden").empty();
    for (var j, x, i = piecesArray.length; i; j = parseInt(Math.random() * i), x = piecesArray[--i], piecesArray[i] = piecesArray[j], piecesArray[j] = x);
    return piecesArray;
}

function populateSpans(piecesArray) {
    //for each table detail element put in one of the pieces
    var index = 0;
    $("td").each(function () {
        $("<img>").attr("src", "img/" + piecesArray[index] + ".png").css({
            width: "50%",
            height: "50%"
        }).appendTo($(this).data("value", piecesArray[index]));
        index++;
    });

}

function showPiece($box) {
    //remove hidden class and add show class
    $($box)
        .removeClass("hidden")
        .addClass("show");
    attempt++;
    console.log(attempt);
}

function drawScore() {
    ctx.font = "26px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Score: " + attempt, 10, 20);
}

function drawTimer() {
    ctx.font = "26px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Time: " + ((parseInt(timer * 100)) / 100), 10, 50);
}

function drawStar() {
    var x = 10,
        y = 80;

    img.src = "img/star.png";
    if (attempt == 30) {
        GreatWin = 0;
        kolOfStars = 2
    };
    if (attempt == 40) {
        GoodWin = 0;
        kolOfStars = 1
    };
    ctx.drawImage(img, x, y, 20, 20);
    ctx.drawImage(img, x + 17, y, GoodWin, GoodWin);
    ctx.drawImage(img, x + 34, y, GreatWin, GreatWin);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    timer += 0.01;
    drawScore();
    drawTimer();
    drawStar();
}

function hidePiecs($box) {
    //remove hidden class and add show class
    $($box)
        .removeClass("show")
        .addClass("hidden");

    return undefined;

}
