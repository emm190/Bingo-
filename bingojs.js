
window.onload = firstScreen; //loads the basic outline of the card
var usedNums = new Array(76);
var calledNumbers = new Array();
var numberOfWins;
var numberOfLosses;

/*Loads the basic outline of the card & hides the win and lose buttons*/
function firstScreen() {
	loadCard();
	var x = document.getElementById("win");
	x.style.display = "none";
	var x = document.getElementById("lose");
	x.style.display = "none";
}

/* Gets the current sqaure and adds event listeners to each sqaure
so if it's clicked when its white it turns purple and vice versa
& checks for a bingo after everytime a box is clicked to see if
clicking that box created a bingo */
function getCurrentSquare(thisSquare) {
		var currSquare = "square" + thisSquare;
		document.getElementById(currSquare).addEventListener("click", function() {
		if (document.getElementById(currSquare).style.backgroundColor == "purple")
		{
			document.getElementById(currSquare).style.backgroundColor = "white"
		}
		else
		{
			document.getElementById(currSquare).style.backgroundColor = "purple";
		}
		if (checkForABingo()==true)
			alert("WooHoo! You have a bingo!");
		})
}

/* Loads the card based off of whether reload random or specific was pressed,
adds the event listener to every square & displays the number of wins
and losses from local storage */
function loadCard() {
     if (document.getElementById) {

        document.getElementById("reload"). onclick = anotherCard; //loads a random version
        document.getElementById("specific").onclick = getInputString; //loads your entered version

     }
		 for (var i=0; i<=24; i++) {
			if (i!=12)
	 			getCurrentSquare(i);
	 	}
	 numberOfWins = localStorage.getItem("numberWins");
	 console.log("Wins " + numberOfWins);
	 document.getElementById("wins").innerHTML = numberOfWins;
	 numberOfLosses = localStorage.getItem("numberLose");
 	 console.log("Losses " + numberOfLosses);
 	 document.getElementById("loses").innerHTML = numberOfLosses;
}

/*Loops through the card and sets sthe numbers for the random sqaures */
function newCard() {
     for (var i=0; i<=24; i++) {
			 if (i!=12)
        	setSquare(i);
     }
}

/* sets the random sqaures by multiplying the index of the array (1, 2, 3, or 4)
by 15 to get the appropriate numbers in each row, find a number that has not
been used yet & then creates adds the square number to the DOM and replaces
the " " in the beginning table with the new Number text DOM node */
function setSquare(thisSquare) {
     var currSquare = "square" + thisSquare;
     var colPlace = new Array(0,0,0,0,0,1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4);
     var colBasis = colPlace[thisSquare] * 15;
     var newNum;
     do {
        newNum = colBasis + getNewNum() + 1;
     }
     while (usedNums[newNum]);
     usedNums[newNum] = true;
		 var nodes = document.getElementById(currSquare);
		 var oldNode = nodes.childNodes[0];
	 	 var newNode = document.createTextNode(newNum);
	 	 nodes.replaceChild(newNode,oldNode);
}

/*Gets a random new number*/
function getNewNum() {
     return Math.floor(Math.random() * 15);
}

/* Generates a new random number card, hides specific elements and displays others,
sets what should happen when you click on when or lose and sets the usedNumbers
array to false so that numbers can be reused in different cards */
function anotherCard() { //generates a new random card
			var x = document.getElementById("reload");
			x.style.display = "none";
			var x = document.getElementById("specific");
			x.style.display = "none";
			var x = document.getElementById("win");
			x.style.display = "block";
			var x = document.getElementById("lose");
			x.style.display = "block";
			document.getElementById("win").onclick = checkGameOver;
			document.getElementById("lose").onclick = endGame;
     for (var i=1; i<usedNums.length; i++) {
        usedNums[i] = false;
     }
     newCard();
     return false;
}

/* Gets an input string from the user, checks it against the regular expression
to make sure that it's in the right format, splits the string & filters out extra
characters in the string that aren't numbers and checks that string for duplicates.
Then adds the numbers enter to the DOM & displays the DOM bingo board with these
new nodes. Keeps trying strings until one is found that is in the correct format.
Displays the appropriate buttons */
function getInputString(){
	var inputString = window.prompt("Please Enter Your Bingo Board",
	 "B(15,9,8,7,14)I(25,21,20,22,29)N(38,41,f,34,31)G(60,57,48,56,49)O(69,70,72,64,71)");
	var regex = /(B|b)((\()(((|[0-9]|(1[0-5])))\,){4}([0-9]|(1[0-5])|[0-9]|(1[0-5]))(\)))(I|i)((\()(((|1[6-9]|(2[0-9]|30)))\,){4}(|1[6-9]|(2[0-9]|30))(\)))(N|n)((\()(((3[1-9]|(4[0-5])))\,){2}(F|f)\,(3[1-9]|(4[0-5]))(\,)(3[1-9]|(4[0-5]))(\)))(G|g)((\()(((4[6-9]|(5[0-9]|60)))\,){4}(4[6-9]|(5[0-9]|60))(\)))(O|o)((\()(((6[1-9]|(7[0-5])))\,){4}(6[1-9]|(7[0-5]))(\)))/;
	var found = regex.test(inputString);

	var splitString = inputString.split(/[B,b,I,i,N,n,G,g,O,o(,)]/);
	splitString=splitString.filter(item => item);


	if (found == true && checkDuplicates(splitString)=="") {
		console.log(checkDuplicates(splitString));

		for (var i = 0; i<25; i+=1){
			var currSquare = "square";
			var currSquare = currSquare.concat(i.toString());
			if (splitString[i]=='f' || splitString[i]=='F')
				splitString[i] = "Free Space :-)";
			var nodes = document.getElementById(currSquare);
			var oldNode = nodes.childNodes[0];
			var newNode = document.createTextNode(splitString[i]);
			nodes.replaceChild(newNode,oldNode);
		}
 	}
	else {
		console.log("Found: " + found + " , duplicates: " + checkDuplicates(splitString));
		while (found!=true || (checkDuplicates(splitString)!=""))
			{
				console.log("In the while loop");
				var inputString = window.prompt("Incorrect format: Please Enter Your Bingo Board",
				 "B(15,9,8,7,14)I(25,21,20,22,29)N(38,41,f,34,31)G(60,57,48,56,49)O(69,70,72,64,71)");
				 var found = regex.test(inputString);
				 var splitString = inputString.split(/[B,b,I,i,N,n,G,g,O,o(,)]/);
				 splitString=splitString.filter(item => item);
				 checkDuplicates(splitString);
				 console.log("Now the duplicate is " + checkDuplicates(splitString));
			}
			var splitString = inputString.split(/[B,b,I,i,N,n,G,g,O,o(,)]/);
			splitString=splitString.filter(item => item);
			console.log("2nd found!=true");

			for (var i = 0; i<25; i+=1){
				var currSquare = "square";
				var currSquare = currSquare.concat(i.toString());
				if (splitString[i]=='f' || splitString[i]=='F')
					splitString[i] = "Free Space :-)";
			 var nodes = document.getElementById(currSquare);
	 		 var oldNode = nodes.childNodes[0];
	 	 	 var newNode = document.createTextNode(splitString[i]);
	 	 	 nodes.replaceChild(newNode,oldNode);
			}
		}
		var x = document.getElementById("reload");
		x.style.display = "none";
		var x = document.getElementById("specific");
		x.style.display = "none";
		var x = document.getElementById("win");
		x.style.display = "block";
		var x = document.getElementById("lose");
		x.style.display = "block";
		document.getElementById("win").onclick = checkGameOver;
		document.getElementById("lose").onclick = endGame;
}


function checkDuplicates(checkThisString){
	seen = checkThisString.filter((s => v => s.has(v) || !s.add(v))(new Set));
	console.log(seen);
	return seen;
}


/*Checks for a vertical, horizontal, and diagonal bingo, returns true if there is a bingo*/
function checkForABingo(){
	console.log("checking for a bingo");
	var currSquare = "square";
	for (var i = 0; i<5; i++)
	{
		if (document.getElementById("square"+i).style.backgroundColor == "purple"
		&& document.getElementById("square"+(i+5)).style.backgroundColor == "purple"
		&& document.getElementById("square"+(i+10)).style.backgroundColor == "purple"
		&& document.getElementById("square"+(i+15)).style.backgroundColor == "purple"
		&& document.getElementById("square"+(i+20)).style.backgroundColor == "purple")
		{
		return true;
		}
	}
	for (var i = 0; i<25; i+=5)
	{
		if (document.getElementById("square"+i).style.backgroundColor == "purple"
		&& document.getElementById("square"+(i+1)).style.backgroundColor == "purple"
		&& document.getElementById("square"+(i+2)).style.backgroundColor == "purple"
		&& document.getElementById("square"+(i+3)).style.backgroundColor == "purple"
		&& document.getElementById("square"+(i+4)).style.backgroundColor == "purple")
		{
		return true;
		}
	}
	for (var i = 0; i<1; i+=6)
	{
		if (document.getElementById("square"+i).style.backgroundColor == "purple"
		&& document.getElementById("square"+(i+6)).style.backgroundColor == "purple"
		&& document.getElementById("square"+(i+18)).style.backgroundColor == "purple"
		&& document.getElementById("square"+(i+24)).style.backgroundColor == "purple")
		{
		return true;
		}
	}
	for (var i = 4; i<5; i+=4)
	{
		if (document.getElementById("square"+i).style.backgroundColor == "purple"
		&& document.getElementById("square"+(i+4)).style.backgroundColor == "purple"
		&& document.getElementById("square"+(i+12)).style.backgroundColor == "purple"
		&& document.getElementById("square"+(i+16)).style.backgroundColor == "purple")
		{
		return true;
		}
	}
	if (
		document.getElementById("square10").style.backgroundColor=="purple"
		&& document.getElementById("square11").style.backgroundColor=="purple"
		&& document.getElementById("square13").style.backgroundColor=="purple"
		&& document.getElementById("square14").style.backgroundColor=="purple"
	)
	{
	return true;
	}
	if (
		document.getElementById("square2").style.backgroundColor=="purple"
		&& document.getElementById("square7").style.backgroundColor=="purple"
		&& document.getElementById("square17").style.backgroundColor=="purple"
		&& document.getElementById("square22").style.backgroundColor=="purple"
	)
	{
	return true;
	}
	return false;
}

/* Checks to see if the game is over by checking to see if there is a bingo,
	adds to the number of wins if wins is pressed and there is a bigno & saves
	that number & pulls that number from local storage */
function checkGameOver(){
	if (isNaN(numberOfWins)==true)
	{
		numberOfWins=0;
	}
	if (checkForABingo()==true) {
			numberOfWins++;
			console.log(numberOfWins);
			localStorage.setItem("numberWins", numberOfWins);
			document.getElementById("wins").innerHTML = localStorage.getItem("numberWins");
			var x = document.getElementById("win");
			x.style.display = "none";
			var x = document.getElementById("lose");
			x.style.display = "none";
			clearAllBlockColors();
			var x = document.getElementById("reload");
			x.style.display = "block";
			var x = document.getElementById("specific");
			x.style.display = "block";
		}
	else
		alert("Sorry, you haven't won yet. Keep playing to get a bingo and win!");
}

/*Ends the game, adds a new loss to local storage and sets the HTML to be that */
function endGame(){
	console.log("numberOfLosses is " + numberOfLosses);
	if (isNaN(numberOfLosses)==true)
	{
		numberOfLosses=0;
	}
	numberOfLosses++;
	localStorage.setItem("numberLose", numberOfLosses);
	document.getElementById("loses").innerHTML = localStorage.getItem("numberLose");
	console.log(numberOfLosses);
	var x = document.getElementById("win");
	x.style.display = "none";
	var x = document.getElementById("lose");
	x.style.display = "none";
	clearAllBlockColors();
	var x = document.getElementById("reload");
	x.style.display = "block";
	var x = document.getElementById("specific");
	x.style.display = "block";
}

/*Clears out all of the purple blocks if there are any & removes elements from
	the dom*/
function clearAllBlockColors() {
	var currSquare;
	console.log("Clearing the blocks");
	for (var i = 0; i<25; i++) {
		if (i==12)
			i++;
		currSquare = "square" + i;
		document.getElementById(currSquare).style.backgroundColor = "white";
		var blankSpace = " ";
		var nodes = document.getElementById(currSquare);
		var oldNode = nodes.childNodes[0];
		var newNode = document.createTextNode(blankSpace);
		nodes.replaceChild(newNode,oldNode);
		console.log("replaced child");
	}
}
