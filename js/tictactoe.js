let activePlayer= "x"; // var keeps track of whos turn it is.
let selectedSquares= [];  // this array stores an array of moves. We use this to determine win conditions.

// this function is for placing an 'x' or an 'o' in a square
function placeXOrO(squareNumber) {
    // This condition ensures a square has not been selected already.
    // The .some() method is used to check each element of selectedSquare array to 
    //  see if it contains the square number clicked on.
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        //this var retrieves the html element id that was clicked.
        let select = document.getElementById(squareNumber);
        // This condition checks whos turn it is.
        if (activePlayer==="x") {
            //If activePlayer is equal to 'x', the x.png is placed in html.
            select.style.backgroundImage = "url('images/x.png')";
            // Active player may only be "x" or "o" so, if not "x" it must be "o"
        } else {
            // If activePlayer is equal to "o" the o.png is palced in html.
            select.style.backgroundImage = "url('images/o.png')";
        }
    // squareNumber and activePlayer are concatenated together and added to array
        selectedSquares.push(squareNumber + activePlayer);
        // this calls a function to check for any win conditions.
        checkWinConditions();
        // This condition is for changing the astive player.
        if (activePlayer ==="x") {
            // if active player is 'x' change to 'o'
            activePlayer = "o";
            // If active player is anything other than "x"
        } else {
            activePlayer = "x";
        }
//This function plays placement sound.
        audio("./media/place.wav");
    //This condition checks to see if it is computers turn.
        if (activePlayer ==="o") {  
            disableClick();  //disables click while its computer's turn.
//this function waits 1 sec before placing the image and enabling click.
            setTimeout(function () { computersTurn(); }, 1000);
            } 
// REturning true is needed for our computersTurn() function to work.
        return true;
        }

    //This function results in a random square being selected.
    function computersTurn() {
        let success = false; // this boolean is needed for our while loop.
        let pickASquare; // This variable stores a random number betwen 0-8.
//This condition allows our while loop to keep trying if a square is selected already.
        while(!success) {
    //A random number between 0 and 8 is selected
        pickASquare = String(Math.floor(Math.random() * 9));
    // If the random number evaluated returns true, the square has not been selected yet.
        if (placeXOrO(pickASquare)) {
    // This line calls the function.
           (placeXOrO(pickASquare));
    //This changes our boolean and ends the loop.
            success = true;
            };
        }
    }
}
// this function parses the selectedSquares array to search for win conditions.
// drawWinLine function is called to draw line if condition is met.
function checkWinConditions() {
    // 'x' 0, 1, 2 condition.
    if     (arrayIncludes('0x', '1x', '2x')) { drawWinLine(50, 100, 558, 100);}
    // 'x' 3, 4, 5 conditions and on down for every line cross possibility.
    else if(arrayIncludes('3x', '4x', '5x')) { drawWinLine(50, 304, 558, 304);}
    else if(arrayIncludes('6x', '7x', '8x')) { drawWinLine(50, 508, 558, 508);}
    else if(arrayIncludes('0x', '3x', '6x')) { drawWinLine(100, 50, 100, 558);}
    else if(arrayIncludes('1x', '4x', '7x')) { drawWinLine(304, 50, 304, 558);}
    else if(arrayIncludes('2x', '5x', '8x')) { drawWinLine(508, 50, 508, 558);}
    else if(arrayIncludes('6x', '4x', '2x')) { drawWinLine(100, 508, 510, 90);}
    else if(arrayIncludes('0x', '4x', '8x')) { drawWinLine(100, 100, 520, 520);}
    else if(arrayIncludes('0o', '1o', '2o')) { drawWinLine(50, 100, 558, 100);}
    else if(arrayIncludes('3o', '4o', '5o')) { drawWinLine(50, 304, 558, 304);}
    else if(arrayIncludes('6o', '7o', '8o')) { drawWinLine(50, 508, 558, 508);}
    else if(arrayIncludes('0o', '3o', '6o')) { drawWinLine(100, 50, 100, 558);}
    else if(arrayIncludes('1o',' 4o', '7o')) { drawWinLine(304, 50, 304, 558);}
    else if(arrayIncludes('2o', '5o', '8o')) { drawWinLine(508, 50, 508, 558);}
    else if(arrayIncludes('6o', '4o', '2o')) { drawWinLine(100, 508, 510, 90);}
    else if(arrayIncludes('0o', '4o', '8o')) { drawWinLine(100, 100, 520, 520);}
// This condition checks for ti. If none of the above conditions register
// and 9 squares are selected, the code executes.
    else if(selectedSquares.length >= 9) {
        audio('./media/tie.wav');  // This function plays the tie game sound.
// This function sets a .3 second timer before the resetGame is called.
        setTimeout(function () { resetGame(); }, 1000);
    }
    // This function checks if and array includes 3 strings.
    // It is used to check for each win condition.
    function arrayIncludes(squareA, squareB, squareC) {
        // The next three variables will be used to check for 3 in a row.
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
    // If the 3 variables we pass are all includes in our array, true is 
    // returned and our else if condition executes the drawWinLIne function.
        if (a === true && b === true && c === true) { return true; }
    }
}    
// This function makes our element temporarily unclickable.
function disableClick() {
    // this makes our body unclickable.
    body.style.pointerEvents = 'none';
    // this makes our body clickable again after 1 sec.
    setTimeout(function() {body.style.pointerEvents = 'auto';}, 1000);
}           
// This fuction takes a string parameter of the path you set earlier for 
// placement sound ('./media/place.mp3")
function audio(audioURL) {
    // We create a new audio object and we pass the path as a parameter.
    let audio = new Audio(audioURL);
    // Play method plays our audio sound
    audio.play();
}
// This function utilizes html canvas to draw win lines.
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    // this line accesses our html canvas element
    const canvas = document.getElementById('win-lines');
    // this line gives us aaccess to methods and properties to use on canvas.
    const c = canvas.getContext('2d');
    // this line indicates where the start of a lines x axis is.
    let x1 = coordX1, 
    // this line indicates where the start of a lines y axis is.
        y1 = coordY1, 
    // this line indicates where the end of a lines x axis is.
        x2 = coordX2, 
    // this line indicates where the end of a lines y axis is.
        y2 = coordY2,
    // This variable stores temporary x axis data we update in our animation loop.
        x = x1, 
    // This variable stores tempoary y axis data we update in our animation loop.
        y = y1;

// This function interacts with the canvas
function animateLineDrawing() {
    // this variable creats the loop for when the game ends it restarts.
    const animationLoop = requestAnimationFrame(animateLineDrawing);
    // this method clears content form the last loop iteration.
    c.clearRect(0, 0, 608, 608);
    // this method starts a new path
    c.beginPath();
    // this method moves us to a starting point in our line.
    c.moveTo(x1, y1);
    // this method indicates the end point in our line.
    c.lineTo(x, y);
    // set line width
    c.lineWidth = 10;
    // set line color
    c.strokeStyle = 'rgba(70, 255, 33, .8)';
    // this method draws everything we laid out above.
    c.stroke();
    // this condition checks if we have reached the line endpoint.
    if (x1 <= x2 && y1 <= y2) {
        // this condition adds 10 to the previous end x point.
        if (x < x2) { x += 10; }
        // this condition adds 10 to the previous end y point.
        if (y < y2) { y += 10; }
        // this condition cancels our animation loop if reach end point.
        if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop); }
    }
    // this condition is similar to the one above.
    // it was necessary for the 6, 4, 2 win condition.
    if (x1 <= x2 && y1 >= y2) {
        if (x < x2) { x += 10; }
        if (y > y2) { y -= 10; }
        if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop); }
    }
  }
// this function clears out clicking while the win sound is playing
function clear() {
    // this line starts our animation loop.
    const animationLoop = requestAnimationFrame(clear);
    // this line clears our canvas.
    c.clearRect(0, 0, 608, 608);
    // this line stops our animation loop
    cancelAnimationFrame(animationLoop);
    }
    // this line disallows clicking while the win  sound is playing
    disableClick();
    // this line plays the win sounds.
    audio('./media/winGame.wav');
    // this line calls our main animation loop.
    animateLineDrawing();
     // this line waits 1 second.
     // then, clears canvas, resets game and allows clicking again.
     setTimeout(function () { clear(); resetGame(); }, 1000);
}
// this function resets the game in a tie or a win.
function resetGame() { 
    // this for loop iterates through each html 'square' element
    for (let i = 0; i < 9; i++) {
        // this varialbe gets the html element of i.
        let square = document.getElementById(String(i));
        // this removes our elements backgroundImage.
        square.style.backgroundImage = '';
    }
    // this resets our array so it is empty and we can start over.
    selectedSquares = [];
}

