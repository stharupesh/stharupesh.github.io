function Game() {
  this.gridNo = 5, // Default grid number
  
  this.boxColor = "#CCC0B2", // Default box color
  
  this.color = "#776E65",  // Default font color
  
  this.upMove = true, // For checking moves
  
  this.downMove = true,
  
  this.leftMove = true,
  
  this.rightMove = true,
  
  this.score = 0, // Storing score
  
  this.randomBox = 0, // Storing randomBox number
  
  this.values = new Array(), // Array for storing values of all box
  
  this.addValues = function() { // Adding default values to the array

	for(var i = 0; i < 10; i++) {
	  this.values.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
	}
  },
  
  this.calcTotalBox = function() { // Calculating total number of boxes

	return this.gridNo * this.gridNo;
  },
  
  this.createMap = function() { // Creating the map with all boxes

	var boxSize = 390/this.gridNo; // Box size according to grid
	document.getElementById("pixelMap").innerHTML = ""; // Creating the map after each new game

	for(var i = 0; i < this.gridNo; i++) {
	  for(var j = 0; j < this.gridNo; j++) {

		document.getElementById("pixelMap").innerHTML = document.getElementById("pixelMap").innerHTML + "<div style = \"float: left; color: " + this.color + "; background-color: " + this.boxColor + "; border: " + 25/this.gridNo + "px solid rgb(160, 149, 139); height: " + boxSize + "px; width: " + boxSize + "px; font-size: " + 180/this.gridNo + "px; padding: " + 50/this.gridNo + "px\" class = \"box\" id = \"" + i.toString() + "_" + j.toString() + "\"></div>";     
		this.boxColor = "#CCC0B2";
	  }

	  document.getElementById("pixelMap").innerHTML = document.getElementById("pixelMap").innerHTML + "<br/><div style=\"clear: both;\">";
	}
  },
  
  this.getRandomBox = function() { // Getting random empty box for putting value (2 or 4)

	var boxes = this.calcTotalBox();
	var boxValue;
	var randomBox;
	var x = 0;
	var y = 0;

	do{
		this.randomBox = Math.floor(Math.random() * boxes + 1);
		data = this.getBoxValue();
		boxValue = data[0];
		x = data[1];
		y = data[2];

	} while(boxValue != 0);

	this.values[x][y] = this.getRandomValue();
  },
  
  this.getBoxValue = function() { // getting box value and its position

	var count = 0;
	var data = new Array();

	for(var i = 0; i < this.gridNo; i++) {
		for(var j= 0; j < this.gridNo; j++) {

		 count += 1;
		 if(count == this.randomBox) {
			 data[0] = this.values[i][j]; // value inside it
			 data[1] = i; // x position
			 data[2] = j; // y position
			 return data;		
			}
		}
	}
  },
  
  this.getRandomValue = function() {  // Randomly generating value (2 or 4)

	var randomValue;

	do {
	   randomValue = Math.floor(Math.random() * 3 + 2);
	} while (randomValue == 3);

	return randomValue;
  },
  
  this.applyValues = function() { // Applying values, font colour and background colour to the box

	for(var i = 0; i < this.gridNo; i++) {

	  	for(var j = 0; j < this.gridNo; j++) {

			switch(this.values[i][j]) {

			  case 0: this.boxColor = "#CCC0B2"; break;
			  case 2: this.boxColor = "#EEE4DA"; break;
			  case 4: this.boxColor = "#ECE0C8"; break;
			  case 8: this.boxColor = "#F2B179"; break;
			  case 16: this.boxColor = "#F59563"; break;
			  case 32: this.boxColor = "#F65D3B"; break;
			  case 64: this.boxColor = "#ECC850"; break;
			  case 128: this.boxColor = "#EBC53E"; break;
			  case 256: this.boxColor = "#F6561E"; break;
			  case 512: this.boxColor = "#F84202"; break;
			  case 1024: this.boxColor = "#B42BF4"; break;
			  case 2048: this.boxColor = "#9107D1"; break;
			  case 4096: this.boxColor = "#670794"; break;
			  
			  default:
			  break;
			}

			if(this.values[i][j] > 4096)
			  this.boxColor = "#670794";

			if(this.values[i][j] > 4)
				this.color = "#ffffff";
			else
				this.color = "#776E65";

			document.getElementById(i.toString() + "_" + j.toString()).style.background = this.boxColor;
			document.getElementById(i.toString() + "_" + j.toString()).style.color = this.color;
			document.getElementById(i.toString() + "_" + j.toString()).innerHTML = (this.values[i][j] == 0)? " " : this.values[i][j];
		}
	}

	document.getElementById("score").value = this.score;
  },
  
  this.start = function() { // Game starting function

	var gridValue = document.getElementById("gridValue").value;

	if(isNaN(gridValue)) {
	  alert("Only grid from 2 to 10 are allowed!!");
	  return false;
	}

	if(gridValue < 2 || gridValue > 10) {
	  alert("Only grid from 2 to 10 are allowed!!");
	  return false;
	}

	this.gridNo = gridValue;
	this.values = [];
	this.score = 0;
	this.addValues();
	this.getRandomBox();
	this.createMap();
	this.applyValues();
  },
  
  this.moveUp = function() { // Moving the boxes up

	this.upMove = false;

	for(var i = 0; i < this.gridNo; i++) {
	  for(var j = 0; j < this.gridNo-1; j++) {

		   if(this.values[j][i] == 0) {

			  for(var k = j; k < this.gridNo-1; k++) {

				  if(this.values[k+1][i] != 0) {

					this.values[j][i] = this.values[k+1][i];
					this.values[k+1][i] = 0;
					this.upMove = true;
					break;
				  }
				}
			}
		}
	}

	for(var i = 0; i < this.gridNo; i++) {
	  for(var j = 0; j < this.gridNo-1; j++) {

		 if(this.values[j][i] == this.values[j+1][i] && this.values[j][i] != 0) {

			 this.values[j][i] = 2 * this.values[j][i];
			 this.score += this.values[j][i];
			 this.values[j+1][i] = 0;
			 this.upMove = true;

			 for(var k = j+1; k < this.gridNo-1; k++) {

				 this.values[k][i] = this.values[k+1][i];
				 this.values[k+1][i] = 0;
				}
			}
		}
	}

	if(this.upMove == true) {

	  this.getRandomBox(); // generate and put a new value (2 or 4) in random empty places
	  this.applyValues();
	}

	this.checkGameOver(); // Checking whether the game is over or not
  },  
  
  this.moveDown = function() { // Moving the boxes down

	this.downMove = false;

	for(var i = 0; i < this.gridNo; i++) {
	  for(var j = this.gridNo-1; j > 0; j--) {

		   if(this.values[j][i] == 0) {

			  for(var k = j; k > 0; k--) {

				  if(this.values[k-1][i] != 0) {

					this.values[j][i] = this.values[k-1][i];
					this.values[k-1][i] = 0;
					this.downMove = true;
					break;
				  }
				}
			}
		}
	}

	for(var i = 0; i < this.gridNo; i++) {
	  for(var j = this.gridNo-1; j > 0; j--) {

		 if(this.values[j][i] == this.values[j-1][i] && this.values[j][i] != 0) {

			 this.values[j][i] = 2 * this.values[j][i];
			 this.score += this.values[j][i];
			 this.values[j-1][i] = 0;
			 this.downMove = true;

			 for(var k = j-1; k > 0; k--) {

				 this.values[k][i] = this.values[k-1][i];
				 this.values[k-1][i] = 0;
				}
			}
		}
	}

	if(this.downMove == true) {

	  this.getRandomBox();
	  this.applyValues();
	}

	this.checkGameOver();
  },
  
  this.moveLeft = function() { // Moving the boxes left

	this.leftMove = false;

	for(var i = 0; i < this.gridNo; i++) {
	  for(var j = 0; j < this.gridNo-1; j++) {

		   if(this.values[i][j] == 0) {

			  for(var k = j; k < this.gridNo-1; k++) {

				  if(this.values[i][k+1] != 0) {

					this.values[i][j] = this.values[i][k+1];
					this.values[i][k+1] = 0;
					this.leftMove = true;
					break;
				  }
				}
			}
		}
	}	

	for(var i = 0; i < this.gridNo; i++) {
	  for(var j = 0; j < this.gridNo-1; j++) {

		 if(this.values[i][j] == this.values[i][j+1] && this.values[i][j] != 0) {

			 this.values[i][j] = 2 * this.values[i][j];
			 this.score += this.values[i][j];
			 this.values[i][j+1] = 0;
			 this.leftMove = true;

			 for(var k = j+1; k < this.gridNo-1; k++) {

				 this.values[i][k] = this.values[i][k+1];
				 this.values[i][k+1] = 0;
				}
			}
		}
	}

	if(this.leftMove == true) {

	  this.getRandomBox();
	  this.applyValues();
	}

	this.checkGameOver();
  },
  
  this.moveRight = function() { // Moving the boxes right

	this.rightMove = false;

	for(var i = 0; i < this.gridNo; i++) {
	  for(var j = this.gridNo-1; j > 0; j--) {

		   if(this.values[i][j] == 0) {

			  for(var k = j; k > 0; k--) {

				  if(this.values[i][k-1] != 0) {

					this.values[i][j] = this.values[i][k-1];
					this.values[i][k-1] = 0;
					this.rightMove = true;
					break;
				  }
				}
			}
		}
	}

	for(var i = 0; i < this.gridNo; i++) {
	  for(var j = this.gridNo-1; j > 0; j--) {

		 if(this.values[i][j] == this.values[i][j-1] && this.values[i][j] != 0) {

			 this.values[i][j] = 2 * this.values[i][j];
			 this.score += this.values[i][j];
			 this.values[i][j-1] = 0;
			 this.rightMove = true;

			 for(var k = j-1; k > 0; k--) {

				 this.values[i][k] = this.values[i][k-1];
				 this.values[i][k-1] = 0;
				}
			}
		}
	}

	if(this.rightMove == true) {

	  this.getRandomBox();
	  this.applyValues();
	}

	this.checkGameOver();
  },
  
  this.checkGameOver = function() { // Checking the game over condition

	this.upMove = false;
	this.downMove = false;
	this.leftMove = false;
	this.rightMove = false;
	
	for(var i = 0; i < this.gridNo; i++) { // If any empty box then return false (game is not over yet)
	  for(var j = 0; j < this.gridNo; j++) {

		  if(this.values[i][j] == 0)
			  return false;
		}
	}
	
	for(var i = 0; i < this.gridNo; i++) {
	  for(var j = 0; j < this.gridNo-1; j++) {

		 if(this.values[j][i] == this.values[j+1][i])
			 this.upMove = true;
		}
	}

	for(var i = 0; i < this.gridNo; i++) {
	  for(var j = this.gridNo-1; j > 0; j--) {

		 if(this.values[j][i] == this.values[j-1][i])
			 this.downMove = true;
		}
	}

	for(var i = 0; i < this.gridNo; i++) {
	  for(var j = 0; j < this.gridNo-1; j++) {

		 if(this.values[i][j] == this.values[i][j+1])
			 this.leftMove = true;
		}
	}

	for(var i = 0; i < this.gridNo; i++) {
	  for(var j = this.gridNo-1; j > 0; j--) {

		 if(this.values[i][j] == this.values[i][j-1])
			 this.rightMove = true;
		}
	}

	if(this.upMove == false && this.downMove == false && this.leftMove == false && this.rightMove == false)
	 alert("Game over, You scored " + this.score + "!!");
  };
  
}
  