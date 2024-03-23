createMap(); 

var player1PositionArray = [[27, 28, 28, 28],[10, 9, 10, 11]];
var player1FiringPoint = [27, 10];
var player1Color = "purple";

var player2PositionArray = [[2, 1, 1, 1], [10, 9, 10,11]];
var player2FiringPoint = [2, 10];
var player2Color = "red";

player1 = new player(player1PositionArray, player1FiringPoint, player1Color); // creating player 1
player2 = new player(player2PositionArray, player2FiringPoint, player2Color); // creating player 2

player1.name = prompt("Please Enter the name of player 1"); // Taking name from the player 1.
player2.name = prompt("Please Enter the name of player 2"); // Taking namer from the player 2.

document.getElementById("player1").value = player1.name + "'s life:(purple) " + player1.life;
document.getElementById("player2").value = player2.name + "'s life:(red) " + player2.life;

player1.draw(); // drawing player 1
player2.draw(); // drawing player 2

var counter = 0;
bulletsCreated = new Array();
var movingBullets; // Array of all bullets objects.

function restart() {
	window.location.reload();
}

function instructions() {
	alert("For player first press left and right arrows for movement and up arrow for shooting \n For player second press 1 and 2 numeric keys above alpha numeric keys for movement and press space for shooting");
}

/* ---------------------------Creating the map for the game [Design part]------------------------------------------------------------------- */

function createMap() {
  for(var i = 0; i < 30; i++) {
    for(var j = 0; j < 20; j++)
	  document.getElementById("pixelMap").innerHTML = document.getElementById("pixelMap").innerHTML + "<button style = \"background: white;\"  id = \"" + i.toString() + "_" + j.toString() + "\"></button>";     

	document.getElementById("pixelMap").innerHTML = document.getElementById("pixelMap").innerHTML + "<br/>";
  }
  
  for(var i = 0; i < 30; i++) {
    for(var j = 0; j < 20; j++) {
	  if(i == 0 || j == 0 || i == 29 || j == 19)
	    document.getElementById(i.toString() + "_" + j.toString()).style.background = "black";
	}
  }
}

/* ----------------Player's Class---------------------------------------------------------------------------------------- */

function player(positionArray, firingPoint, clr) {

  this.clr = clr,
  this.name = name,
  this.positionArray = positionArray,
  this.firingPoint = firingPoint,
  this.life = 50,
  
  this.draw = function() {
    for(var key in this.positionArray[0])
	  document.getElementById(this.positionArray[0][key].toString() + "_" + this.positionArray[1][key].toString()).style.background = this.clr;
  },
  
  this.erase = function(){
    for(var key in this.positionArray[0])
	  document.getElementById(this.positionArray[0][key].toString() + "_" + this.positionArray[1][key].toString()).style.background = "white";
  },
  
  this.collisionBorderLeft = function() {
    return (this.positionArray[1][1] == 1);
  },  
  
  this.collisionBorderRight = function() {
    return (this.positionArray[1][3] == 18);
  },
  
  this.moveLeft = function() {

    this.erase();
    
    for(var key in this.positionArray[1])
	  this.positionArray[1][key]--;

	this.draw();
  },
  
  this.moveRight = function() {

    this.erase();
    
    for(var key in this.positionArray[1])
	  this.positionArray[1][key]++;

	this.draw();
  },
  
  this.updateFiringPoint = function() {

    this.firingPoint[0] = this.positionArray[0][0];
    this.firingPoint[1] = this.positionArray[1][0];
  }
}
	
/* ----------------Player1 bullet's class---------------------------------------------------------------------------------------- */
	
function bullets() {

  this.speed = 100,
  this.clr = "purple",
  this.positionArray = [player1.firingPoint[0] - 1, player1.firingPoint[1]],

  this.move = function() {
  	if(this.collisionBorder() != true)
		this.positionArray[0]--;
	else
		this.clr = "black";
  },
  
  this.collisionBorder = function() {
    return (this.positionArray[0] == 0);
  },
  
  this.updatePositionArray = function() {

    this.positionArray[0] = player1.firingPoint[0] - 1;
	this.positionArray[1] = player1.firingPoint[1];
  },
  
  this.draw = function() {
     this.collisionBullets();
     document.getElementById(this.positionArray[0].toString() + "_" + this.positionArray[1].toString()).style.background = this.clr;
  },
  
  this.erase = function() {
    this.collisionPlayer();
    document.getElementById(this.positionArray[0].toString() + "_" + this.positionArray[1].toString()).style.background = "white";
  },

  this.collisionPlayer = function() {

  	var collisionPoints = new Array();
	var value = this.positionArray[0].toString() + "_" + this.positionArray[1].toString();

	for(var key in player2.positionArray[0])
			collisionPoints.push(player2.positionArray[0][key].toString() + "_" + player2.positionArray[1][key].toString());

	for(var key in collisionPoints) {
			if(value == collisionPoints[key]) {

			this.speed = 0;
			this.clr = "red";
			this.draw();

			player2.life--;

			document.getElementById("player2").value = player2.name + "'s life:(red) " + player2.life;
			checkWin();
			}
	}
  },

  this.collisionBullets = function() {

  	if(document.getElementById(this.positionArray[0].toString() + "_" + this.positionArray[1].toString()).style.background == "red")
  		this.speed = 0;
  }
}

/* ----------------Player2's bullets---------------------------------------------------------------------------------------- */

function player2Bullets() {

	this.speed = 100,
	this.clr = "red",
	this.positionArray = [player2.firingPoint[0] + 1, player2.firingPoint[1]],

	this.move = function() {
		if(this.collisionBorder() != true)
			this.positionArray[0]++;
		else
			this.clr = "black";
	},

	this.collisionBorder = function() {
		return (this.positionArray[0] == 29);
		},

		this.updatePositionArray = function() {
		this.positionArray[0] = player2.firingPoint[0] + 1;
		this.positionArray[1] = player2.firingPoint[1];
	},

	this.draw = function() {
		this.collisionBullets();
	    document.getElementById(this.positionArray[0].toString() + "_" + this.positionArray[1].toString()).style.background = this.clr;
	},

	this.erase = function(){
		document.getElementById(this.positionArray[0].toString() + "_" + this.positionArray[1].toString()).style.background = "white";
	},

	this.collisionPlayer = function() {

		var collisionPoints = new Array();
		var value = this.positionArray[0].toString() + "_" + this.positionArray[1].toString();

		for(var key in player1.positionArray[0])
			collisionPoints.push(player1.positionArray[0][key].toString() + "_" + player1.positionArray[1][key].toString());

		for(var key in collisionPoints) {
			if(value == collisionPoints[key]) {
			this.speed = 0;
			this.clr = "purple";
			this.draw();
			
			player1.life--;
			
			document.getElementById("player1").value = player1.name + "'s life:(purple) " + player1.life;
			checkWin();
			}
		}
	},

	this.collisionBullets = function() {
		if(document.getElementById(this.positionArray[0].toString() + "_" + this.positionArray[1].toString()).style.background == "purple")
		this.speed = 0;
	}
}

/* ----------------Moving bullets---------------------------------------------------------------------------------------- */

function moveAllBullets(id) {
	setInterval(
		function() {
			if(bulletsCreated[id].speed != 0) {
		        bulletsCreated[id].erase();
		        bulletsCreated[id].move();
		        bulletsCreated[id].draw();
		        bulletsCreated[id].collisionPlayer();
			}
        }, bulletsCreated[id].speed);
}

document.onkeydown = function(e) { // keyboard input

	switch (e.keyCode)	{
			case 37: { // For left arrow button
    		
			 if(!player1.collisionBorderLeft())
	    		player1.moveLeft();
	    } break;
		   
  		case 38: { // For up arrow button
       
	    	bulletsCreated[counter] = new bullets();
		 	moveAllBullets(counter);
		 	counter++;
   		} break;
		   
  		case 39: { // For right arrow button

	 		if(!player1.collisionBorderRight())
	    		player1.moveRight();
   		} break;
			
  		case 40: { // For down arrow button
	 	
	 	} break;      
   
   		case 49: { // For numeric button 1
   
	 		if(!player2.collisionBorderLeft())
	    		player2.moveLeft();
   		} break;
   
   		case 50: { // For numeric button 2
   		
	 		if(!player2.collisionBorderRight())
	    		player2.moveRight();
   		} break;	
   
   		case 32: { // For space button
   
	 		bulletsCreated[counter] = new player2Bullets();
	 		moveAllBullets(counter);
	 		counter++;
   		} break;

   		default:
   		break;
	}

	player1.updateFiringPoint();
	player2.updateFiringPoint();
};	

/* ----------------Checking Winning condition---------------------------------------------------------------------------------------- */

function checkWin() {
  	if(player1.life <= 0) {
		alert(player2.name + " wins!!");
  		window.location.reload();
  	}
	
	if(player2.life <= 0) {
		alert(player1.name + " wins!!");
		window.location.reload();
	}
}