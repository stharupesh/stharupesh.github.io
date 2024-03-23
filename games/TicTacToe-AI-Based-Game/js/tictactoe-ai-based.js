var value;
var random;
var temp;
var storeId = "empty";
var storeWin = 0;
var buttonArray;

createMap();

function createMap() {
  for(var i = 1; i <= 3; i++) {
    for(var j = 1; j <= 3; j++) {
	  document.getElementById("buttonMap").innerHTML = document.getElementById("buttonMap").innerHTML + "<button id = \"" + i.toString() + j.toString() + "\" onclick = \"process(" + i.toString() + j.toString() + ")\">&nbsp;</button>";
	}
  }
}

function process(id) {
  var generatedWinId;
  var turn = 1;

  if(document.getElementById(id).innerHTML == "&nbsp;") {
      document.getElementById(id).innerHTML = "X";
	  turn = 1;
	  if(storeWin == 0)
	   checkWin(turn); 
	  
	  if(storeId != "empty" && checkCondition(storeId) != "1") {

	   	generatedWinId = checkCondition(storeId);
		document.getElementById(generatedWinId).innerHTML = "O";

		turn = 2;

		if(storeWin == 0)
		 checkWin(turn);

	  } else if(checkCondition(id) != "1") {

	    var generatedId = checkCondition(id);
	    document.getElementById(generatedId).innerHTML = "O";
		storeId = generatedId;

		turn = 2;
		
		if(storeWin == 0)
	     checkWin(turn);
	  } else {

	    if(checkMovesLeft()) {
		  do {
		    temp = randomGenerate().toString() + randomGenerate().toString();
		  } while(document.getElementById(temp).innerHTML != "&nbsp;");

		  document.getElementById(temp).innerHTML = "O";
		  storeId = temp;

		  turn = 2;
		  
		  if(storeWin == 0)
		   checkWin(turn);
		}
	  }
  }
}

function checkWin(turn) {

   var a1 = document.getElementById("11").innerHTML;
   var a2 = document.getElementById("12").innerHTML;
   var a3 = document.getElementById("13").innerHTML;
   var a4 = document.getElementById("21").innerHTML;
   var a5 = document.getElementById("22").innerHTML;
   var a6 = document.getElementById("23").innerHTML;
   var a7 = document.getElementById("31").innerHTML;
   var a8 = document.getElementById("32").innerHTML;
   var a9 = document.getElementById("33").innerHTML;
  
   if(a1 == a2 && a2 == a3 && a1 != "&nbsp;" || a4 == a5 && a5 == a6 && a4 != "&nbsp;" || a7 == a8 && a8 == a9 && a7 != "&nbsp;" || a1 == a4 && a4 == a7 && a1 != "&nbsp;" || a2 == a5 && a5 == a8 && a2 != "&nbsp;" || a3 == a6 && a6 == a9 && a3 != "&nbsp;" || a1 == a5 && a5 == a9 && a1 != "&nbsp;" || a3 == a5 && a5 == a7 && a3 != "&nbsp;") {
    	if(turn == 1)
	   		alert("X wins!!");
	 	else
	   		alert("O wins!!");
	 	storeWin = 1;
   	}
 }
  
function checkMovesLeft() {
 	var count = 0;
    
    for(var i = 1; i <= 3; i++) {
	  for(var j = 1; j <= 3; j++) {
	    if(document.getElementById(i.toString() + j.toString()).innerHTML == "&nbsp;")
		  count++;
	  }
	}

	return (count != 0)
}

function randomGenerate() {
    return Math.floor(Math.random() * 3 + 1);
}

function checkCondition(id) {

    value = document.getElementById(id).innerHTML;
    id = id.toString();
    var i = id.charAt(0);
	var j = id.charAt(1);
	buttonArray = new Array("1");
	
	checkRow(i);
	checkColumn(j);
	checkDiagonal1();
	checkDiagonal2();
	
	if(buttonArray.length == 1)
	  return buttonArray[0];
	 
	return buttonArray[1];
}
	
function checkRow(i) {

    i = i.toString();

    var blankId = 0;
    var count = 0;

	for(var b = 1; b <= 3; b++) {
      if(document.getElementById(i + b.toString()).innerHTML == value)
        count++;

	  if(document.getElementById(i + b.toString()).innerHTML == "&nbsp;")
	    blankId = i + b.toString();
    }

	if(count == 2 && blankId != 0)
	  buttonArray.push(blankId);
}
		
function checkColumn(j) {

    j = j.toString();

    var blankId = 0;
    var count = 0;

	for(var b = 1; b <= 3; b++) {
      if(document.getElementById(b.toString() + j).innerHTML == value)
        count++;

	  if(document.getElementById(b.toString() + j).innerHTML == "&nbsp;")
	    blankId = b.toString() + j;
    }

	if(count == 2 && blankId != 0)
	  buttonArray.push(blankId);
}
			
function checkDiagonal1() {

    var blankId = 0;
    var count = 0;

	for(var b = 1; b <= 3; b++) {
	  if(document.getElementById(b.toString() + b.toString()).innerHTML == value)
	    count++;

	  if(document.getElementById(b.toString() + b.toString()).innerHTML == "&nbsp;")
	    blankId = b.toString() + b.toString();
	}

	if(count == 2 && blankId != 0)
	  buttonArray.push(blankId);
}
				
function checkDiagonal2() {

    var blankId = 0;
    var count = 0;

	for(var b = 1; b <= 3; b++) {
	  if(document.getElementById(b.toString() + (4 - b).toString()).innerHTML == value)
	    count++;
	  
	  if(document.getElementById(b.toString() + (4 - b).toString()).innerHTML == "&nbsp;")
	    blankId = b.toString() + (4 - b).toString();
	}

	if(count == 2 && blankId != 0)
	  buttonArray.push(blankId);
}