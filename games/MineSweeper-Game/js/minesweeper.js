$(document).ready(function() {

	var game = new Game();
	
	game.start(); // Game with default grid and mines after reloading the page
	
	$('#minesLeft').html(game.minesNo.toString());
	
	$('#help').click(function() {
	    alert("Left click to open the box and Right click to flag or unflag the box!! To win this game, you have to open all the boxes which don't have mine.");
	});
	
    $('#newGame').click(function() {  // Play button
	    game = new Game();
	    var val;
		var msg = "empty";

		do{ // Take value from player allowing only 1 or 2 or 3
		    if(msg != "empty") {
			   alert(msg);
			}
			val = parseInt(prompt("Insert 1 for Beginners, 2 for Intermediate or 3 for Advanced"));
			msg = "Enter only 1 or 2 or 3!!";
		} while (isNaN(val) || val > 3 || val < 1);

	    switch(val) {
	      case 1: // Beginners
		  {
		    game.setGridNo(9);
		    game.setMinesNo(10);
		  } break;
		  
	      case 2: // Intermediate
		  {
		    game.setGridNo(16);
		    game.setMinesNo(40);			  
		  } break;
		  
	      case 3: // Advanced
		  {
		    game.setGridNo(25);
		    game.setMinesNo(100);
		  } break;
		  
		  default:
		  break;
	    }

	    $('#map').html('');
		
		game.start();
		
		$('#minesLeft').html(game.minesNo.toString());
	});
	
	$('#playCustom').click(function() { // customized play

		game = new Game();
		
        var gridNo;
		var minesNo;
		var msg = "empty";
		
		do { // Take grid number and mines number from player
			if(msg != "empty")
			   alert(msg);

			gridNo = parseInt(prompt("Insert grid number: "));
			minesNo = parseInt(prompt("Insert mines number: "));

			if(isNaN(gridNo) || isNaN(minesNo))
			   msg = "Only numerical values are allowed!!";
			else if(gridNo < 2 || minesNo < 0 || gridNo > 50 || minesNo >= (gridNo * gridNo))
			   msg = "Grid number should be in the range of 2 to 50, mines should be greater than 0 and minesNo should be less than the number of boxes!!";
			
		} while (isNaN(gridNo) || isNaN(minesNo) || gridNo < 2 || minesNo < 0 || gridNo > 50 || minesNo >= (gridNo * gridNo));
	    
	  	game.setGridNo(gridNo);
	  	game.setMinesNo(minesNo);

      	$('#map').html('');
	  
	  	game.start();
	  
	  	$('#minesLeft').html(game.minesLeft.toString());
	});
	
    $(document).on('mousedown', '.btn', function(event) { // Process after clicking any box
	    if(game.loose || game.win) // If player already lose or won the game, then do nothing
		    return false;

	    switch(event.which) {

		    case 1: // For left click
			{
				var id = $(this).attr("id");

			   	$(this).attr('value', "opened");
			   	$(this).css('background', 'url(img/0.png)no-repeat');
			  
			  	game.clickBox(id);
			   	game.getMinesLeft();
			} break;
			
		    case 3: // For right click or to flag the box
			{ 
				if($(this).attr('value') == 'opened') { // If box clicked, do nothing
			       break;
			   	} else if($(this).attr('value') == 'nFlag' && game.minesLeft != 0) { // If not opened, flag the box
			       
			       $(this).attr('value', "Flag");
			       $(this).css('background', 'url(img/1.png)no-repeat');
			   	}else{ // If flagged, remove flag from the box 
			       
			       $(this).attr('value', "nFlag");
				   $(this).css('background', 'url(img/2.png)no-repeat');
			   	}
			   game.getMinesLeft();
			} break;
			
			default:
			break;
		}});
});

function Game() { // Object

	this.gridNo = 9, // variable for storing grid number
	this.minesNo = 10, // variable for storing mines number
	this.minesLeft = 10, // variable for storing mines left
	this.data = new Array(),
	this.loose = false,
	this.win = false,

	this.start = function() {
		   
		this.setMapSize(); // set the div size which contains all the boxes
		this.initializeData(); // initialize values on variable called data
		this.generateRandomMine(); // generate random number
		this.createMap(); // create the boxes in html page
  	},

	this.setGridNo = function(val) { // update the grid number in the variable called gridNo received from the user.

		this.gridNo = val;
	},

  	this.setMinesNo = function(val) { // set the mines number in the variable called minesNo received from the user.
    
    	this.minesNo = val;
		this.minesLeft = val
  	},

  	this.setMapSize = function() { // set the size of div containing all boxes according to the number of boxes(gridNo).
    
    	document.getElementById("map").style.height = this.gridNo * 25 + "px";
    	document.getElementById("map").style.width = this.gridNo * 25 + "px";
  	},

  	this.getMinesLeft = function() {

  		var val = 0;

		for(var i = 0; i < this.gridNo; i++) {
			for(var j = 0; j < this.gridNo; j++) {
				if(this.element(i,j).getAttribute("value") == "Flag")
					val += 1;
			}
		}

		this.minesLeft = this.minesNo - val;
		$('#minesLeft').html(this.minesLeft.toString());
  	},

  	this.initializeData = function() {

	    for(var i = 0; i < this.gridNo; i++) { // creating space in the array for storing the data of all boxes(data like the box contains mines or is flagged...)
			  
			this.data[i] = new Array();
			  
			for(j = 0; j < this.gridNo; j++)
				this.data[i].push([0]);
		}
	},

  	this.generateRandomMine = function() { // Generating random mine according to random grid coordinate

		var rndA; // x coordinate for grid
		var rndB; // y coordinate for grid

	    for(var i = 0; i < this.minesNo; i++) {

	    	do {
	    		rndA = Math.floor(Math.random() * (this.gridNo)); // randomly taking x coordinate
			    rndB = Math.floor(Math.random() * (this.gridNo)); // randomly taking y coordinate
		    } while (this.data[rndA][rndB] == -1); // if the box already contains mine do again

	    	this.data[rndA][rndB] = -1; // Insert mine in the random box
		  
		  	if(rndB != 0 && this.data[rndA][rndB-1] != -1) // for left (Plus 1 value in the mine's left box)
		  		this.data[rndA][rndB-1] = parseInt(this.data[rndA][rndB-1]) + 1;

		  	if(rndB != this.gridNo-1 && this.data[rndA][rndB+1] != -1) // for right (Plus 1 value in the mine's right box)
		      	this.data[rndA][rndB+1] = parseInt(this.data[rndA][rndB+1]) + 1;
		  
		  	if(rndA != 0 && this.data[rndA-1][rndB] != -1) // for up
		      	this.data[rndA-1][rndB] = parseInt(this.data[rndA-1][rndB]) + 1;
		  
		  	if(rndA != this.gridNo-1 && this.data[rndA+1][rndB] != -1) // for down
		      	this.data[rndA+1][rndB] = parseInt(this.data[rndA+1][rndB]) + 1;
		  
		  	if(rndA != 0 && rndB != 0 && this.data[rndA-1][rndB-1] != -1) // for top left
		      	this.data[rndA-1][rndB-1] = parseInt(this.data[rndA-1][rndB-1]) + 1;
		  
		  	if(rndA != 0 && rndB != this.gridNo-1 && this.data[rndA-1][rndB+1] != -1) // for top right
		      	this.data[rndA-1][rndB+1] = parseInt(this.data[rndA-1][rndB+1]) + 1;
		  
		  	if(rndA != this.gridNo-1 && rndB != 0 && this.data[rndA+1][rndB-1] != -1) // for down left
		      	this.data[rndA+1][rndB-1] = parseInt(this.data[rndA+1][rndB-1]) + 1;
		  
		  	if(rndA != this.gridNo-1 && rndB != this.gridNo-1 && this.data[rndA+1][rndB+1] != -1) // for down right
		      	this.data[rndA+1][rndB+1] = parseInt(this.data[rndA+1][rndB+1]) + 1;
		}
  	},

  	this.createMap = function() { // Creating the map containing boxes keeping value nFlag(not flagged) and id according to the grid coordinates
        
        for(var i = 0; i < this.gridNo; i++) {
		  for(var j = 0; j < this.gridNo; j++)
		     $('#map').append('<div class=\"btn\" style=\"\" value =\"nFlag\" id=\"' + i.toString() + "_" + j.toString() + '\">&nbsp;</div>');

		  $('#map').append('<br/><div style=\"clear:both;\"></div>');
		}
  	},

  	this.clickBox = function(id) { // function that executes after box is clicked

	    id = id.split('_'); //Separating x and y coordinate which are stored in the box's id

	    var i = parseInt(id[0]);
		var j = parseInt(id[1]);
		var clr = "";
		
		if(this.element(i,j).innerHTML == 0) { 
		   // if already clicked, do nothing
		} else if(this.data[i][j] == -1) { // if the clicked box contains mine, put mine image and execute game over function
		  
		  this.element(i,j).style.background = "url(img/3.png)";
		  this.gameOver();
		  this.loose = true;
		} else if(this.data[i][j] != -1) { // if doesn't contain mine

		    this.element(i,j).innerHTML = this.data[i][j];

		    clr = this.getColor(parseInt(this.data[i][j]));

			this.element(i,j).style.color = clr;
		    this.openSurroundingBtn(i,j); // Check boxes connected to it and open it

			if(this.checkWin()) // Checking winning condition
		        alert("You win!!");
		}
  	},

  	this.getColor = function(value) {

		switch (value) {

			// If value is 0, set text color to transparent(empty box)

			case 0: return "transparent";
			case 1: return "blue";
			case 2: return "green";
			default: return "red";
		}
  	},

  	this.element = function(x,y) { // getting element
      	return document.getElementById(x.toString() + "_" + y.toString());
  	},

  	this.openSurroundingBtn = function(i,j) {

	    var i = i;
		var j = j;
		var clr = "";

		var btnArray = new Array(); // for storing the box connected to the clicked box (including mine containing box)
		  
		if(j != 0 && this.element(i,j-1).getAttribute("value") != "opened") // check left (if there is no left box or if it is already opened then don't store it)
			btnArray.push([i,(j-1)]);
		  
		if(j != this.gridNo-1 && this.element(i,j+1).getAttribute("value") != "opened") // check right
		    btnArray.push([i,(j+1)]);
		  
		if(i != 0 && this.element(i-1,j).getAttribute("value") != "opened") //check up
		    btnArray.push([(i-1),j]);
		  
		if(i != this.gridNo-1 && this.element(i+1,j).getAttribute("value") != "opened") //check down
		    btnArray.push([(i+1),j]);
		  
		if(i != 0 && j != 0 && this.element(i-1,j-1).getAttribute("value") != "opened") // check top left
		    btnArray.push([(i-1),(j-1)]);
		  
		if(i != 0 && j != this.gridNo-1 && this.element(i-1,j+1).getAttribute("value") != "opened") // check top right
		    btnArray.push([(i-1),(j+1)]);
		   
		if(i != this.gridNo-1 && j != 0 && this.element(i+1,j-1).getAttribute("value") != "opened") // check down left
		    btnArray.push([(i+1),(j-1)]);
		  
		if(i != this.gridNo-1 && j != this.gridNo-1 && this.element(i+1,j+1).getAttribute("value") != "opened") // check down right
		    btnArray.push([(i+1),(j+1)]);
		  
	      
		for(var key in btnArray) { // If any of the boxes connected to the clicked box contains mine then, end the function
			if(this.data[btnArray[key][0]][btnArray[key][1]] == -1)
		    	return false;
		}

		for(var key in btnArray) { // If any of the boxes connected to the clicked box does not contains mine then, open all the boxes connected to it.
			
			this.element(btnArray[key][0],btnArray[key][1]).style.background = "url(img/0.png)";
			this.element(btnArray[key][0],btnArray[key][1]).setAttribute("value", "opened")
		    this.element(btnArray[key][0],btnArray[key][1]).innerHTML = this.data[btnArray[key][0]][btnArray[key][1]];

			clr = this.getColor(parseInt(this.data[btnArray[key][0]][btnArray[key][1]]));

			this.element(btnArray[key][0],btnArray[key][1]).style.color = clr;
		}
			  
		for(var key in btnArray) { // After opening the boxes, recursively process the box through this function.
			this.openSurroundingBtn(btnArray[key][0],btnArray[key][1]);
		}  
  	},

  	this.gameOver = function() { // Explode all mines after loosing

	  	alert("You Loose");

	  	for(var i = 0; i < this.gridNo; i++) {
	  		for(var j = 0; j < this.gridNo; j++) {
	  			if(this.data[i][j] == -1) // Putting mine image in the box after checking the box coordinate in data variable(coordinate containing mines are stored in data).
					this.element(i,j).style.background = "url(img/3.png)";
			}
		}
  	},

	this.checkWin = function() {

	    var noBox = 0;
	    
	    for(var i = 0; i < this.gridNo; i++) { // If number of unopened boxes is equal to number of mines then, return true
			for(var j = 0; j < this.gridNo; j++) {
				if(this.element(i,j).getAttribute("value") != "opened")
					noBox += 1;
		   }
		}

		if(noBox == this.minesNo) {
			this.win = true;
		    return true;
		}
		
		return false;
	}
}