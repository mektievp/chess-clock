// Author: Phillip Mektiev
// mektievp@gmail.com

// These two variables are used to control the amount of time
// on both players clocks. For this example, each player is 
// given four minutes of playing time. These two variables 
// can be changed to allow for more or less time for each player. 
var whiteTime = 240;
var blackTime = 240;	

// These variables convert the whiteTime and blackTime
// variables to minutes and seconds so that they can be
// displayed during the countdown. 
var divisionWhiteTime = whiteTime / 60;
var modulusWhiteTime = whiteTime % 60;
var divisionBlackTime = whiteTime / 60;
var modulusBlackTime = whiteTime % 60;

var minutesW = Math.floor(divisionWhiteTime).toString();
var secondsW = modulusWhiteTime.toString();
var minutesB = Math.floor(divisionBlackTime).toString();
var secondsB = modulusBlackTime.toString();

// These conditional statements are in place so that
// when the seconds remaining for a given minute are between
// 0 and 9, an extra 0 is added in front of the number
// of seconds left. For example, instead of displaying 
// 4:9, the conditional will detect that the seconds variable
// is between 0 and 9 and add an extra 0 in front of it to 
// display 4:09 the way a clock would. 
if (modulusWhiteTime <= 9 && modulusWhiteTime >= 0) {
	var secondsW = "0" + modulusWhiteTime.toString();
} 
if (modulusBlackTime <= 9 && modulusBlackTime >= 0) {
	var secondsB = "0" + modulusBlackTime.toString();
} 

// These scripts output the seconds converted to minutes &
// seconds for both the white and black clocks.
document.getElementById("whiteDisplay").innerHTML = minutesW + ":" + secondsW;
document.getElementById("blackDisplay").innerHTML = minutesB + ":" + secondsB;

// The setInterval() methods are used every 1 second
// to countdown both white and blacks clocks. The 
// setInterval()'s are put in these two variables in 
// the functions below. 
// These two variables are declared here so that they can be
// referenced outside of the functions as well. 
var blackCount;
var whiteCount;

// This disables blacks button since white always moves first
document.getElementById("switchTwo").disabled = true;

// Function that is used to begin the game. 
function start() {

	// Changes the name of the button from 'Start' to 'Switch.'
	document.getElementById("switchOne").innerHTML = "Switch";
	document.getElementById("message").innerHTML = "Game is in progress!";

	// This changes the 'Start' button to a 'Switch' button for  white
	// After the first time the button is clicked, it uses a different
	// function for the rest of the match. It begins blacks clock using
	// the blackClock() function.
	document.getElementById("switchOne").onclick = blackClock;
	whiteClock(); 
}

// In this function, setInterval() is defined in the 
// whiteCount variable and a simple function is
// defined and executed every 1000 milliseconds.
// Every 1000 milliseconds, the whiteTime variable
// is decremented by 1, and then the amount of time
// remaining for the white player is displayed. There is
// also an alert in this function that is displayed when whites clock
// is decremented to zero. The alert informs the players that white 
// has lost the game due to loss of time.
function whiteClock() {

	whiteCount = setInterval(function() {

		whiteTime = --whiteTime;
		var divisionWhiteTime = whiteTime / 60;
		var modulusWhiteTime = whiteTime % 60;

		var minutesW = Math.floor(divisionWhiteTime).toString();
		var secondsW = modulusWhiteTime.toString();

		if (modulusWhiteTime <= 9 && modulusWhiteTime >= 0) {
			var secondsW = "0" + modulusWhiteTime.toString();
		} 
		if (whiteTime == 0) {
			alert("The Game is Over! Black has won!");
			resetClock();
			return
		}

		document.getElementById("whiteDisplay").innerHTML = minutesW + ":" + secondsW;	

	}, 1000);

// These two lines ensure that only one button can be pressed at a time.
// For example, if whites clock is ticking, only whites switch button
// may be pressed and vice versa. This also prevents setInterval from 
// being executed twice and accelerating the decrement of our time holding
// variables. 
document.getElementById("switchOne").disabled = false;
document.getElementById("switchTwo").disabled = true;
clearInterval(blackCount);
}

function blackClock() {

	blackCount = setInterval(function() {

		blackTime = --blackTime;
		var divisionBlackTime = blackTime / 60;
		var modulusBlackTime = blackTime % 60;

		var minutesB = Math.floor(divisionBlackTime).toString();
		var secondsB = modulusBlackTime.toString();

		if (modulusBlackTime <= 9 && modulusBlackTime >= 0) {
			var secondsB = "0" + modulusBlackTime.toString();
		} 
		if (blackTime == 0) {
			alert("The Game is Over! White has won!");
			resetClock();
			return
		}

		document.getElementById("blackDisplay").innerHTML = minutesB + ":" + secondsB;	

	}, 1000);

document.getElementById("switchTwo").disabled = false;
document.getElementById("switchOne").disabled = true;
clearInterval(whiteCount);
}

// This function resets both clocks back to 240 seconds
// and displays them. It makes sure to stop both of the
// setInterval() functions for each clock by using 
// clearInterval() as well so that the countdown stops. 
// White's switch button reverts back to being a start button and 
// will employ the start() function when pressed, while
// black's switch button is disabled.
function resetClock() {

	whiteTime = 240;
	blackTime = 240;
	var divisionWhiteTime = whiteTime / 60;
	var modulusWhiteTime = whiteTime % 60;
	var divisionBlackTime = whiteTime / 60;
	var modulusBlackTime = whiteTime % 60;
	var minutesW = Math.floor(divisionWhiteTime).toString();
	var secondsW = modulusWhiteTime.toString();
	var minutesB = Math.floor(divisionBlackTime).toString();
	var secondsB = modulusBlackTime.toString();

	if (modulusWhiteTime <= 9 && modulusWhiteTime >= 0) {
		var secondsW = "0" + modulusWhiteTime.toString();
	} 
	if (modulusBlackTime <= 9 && modulusBlackTime >= 0) {
		var secondsB = "0" + modulusBlackTime.toString();
	} 

	document.getElementById("whiteDisplay").innerHTML = minutesW + ":" + secondsW;
	document.getElementById("blackDisplay").innerHTML = minutesB + ":" + secondsB;

	clearInterval(blackCount);
	clearInterval(whiteCount);
	document.getElementById("switchOne").disabled = false;
	document.getElementById("switchTwo").disabled = true;
	document.getElementById("switchOne").innerHTML = "Start";
	document.getElementById("switchOne").onclick = start;
	document.getElementById("message").innerHTML = "White always moves first!";
}