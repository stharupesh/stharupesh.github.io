var timer;
var foodTimer;
var score = 0;
var snake = new Snake(); // Creating snake object
var food = new Food(); // Creating food object

createMap(); 
snake.draw(); // drawing snake
food.draw(); // drawing food
startGame();



/* ---------------------------Creating the map for the game [Design part]------------------------------------------------------------------- */

function createMap()
{
  for(var i = 0; i < 30; i++)
  {
    for(var j = 0; j < 30; j++)
	{
	  document.getElementById("pixelMap").innerHTML = document.getElementById("pixelMap").innerHTML + "<button style = \"background: white;\"  id = \"" + i.toString() + "_" + j.toString() + "\"></button>";     
	}
	document.getElementById("pixelMap").innerHTML = document.getElementById("pixelMap").innerHTML + "<br/>";
  }
  
  for(var i = 0; i < 30; i++)
  {
    for(var j = 0; j < 30; j++)
	{
	  if(i == 0 || j == 0 || i == 29 || j == 29)
	  {
	    document.getElementById(i.toString() + "_" + j.toString()).style.background = "black";
	  }
	}
  }
}

/* ---------------------------Snake class------------------------------------------------------------------- */

function Snake()
{
    this.clr = "purple",
	this.headDirection = "left",
	this.tailDirection = "right",
	this.life = 3,
	this.speed = 100,
	this.positionArray = [[12, 12, 12], [15, 16, 17]],

	this.increaseSize = function() {
	  switch(this.tailDirection)
      {
	    case "left":
		{
		  this.positionArray[0].push(this.positionArray[0][this.positionArray[0].length - 1]);
		  this.positionArray[1].push(parseInt(this.positionArray[1][this.positionArray[1].length - 1]) - 1);
		}
		break;
		
		case "right":
		{
		  this.positionArray[0].push(this.positionArray[0][this.positionArray[0].length - 1]);
		  this.positionArray[1].push(parseInt(this.positionArray[1][this.positionArray[1].length - 1]) + 1);
		}
		break;
		
		case "up":
		{
		  this.positionArray[0].push(parseInt(this.positionArray[0][this.positionArray[0].length - 1]) - 1);
		  this.positionArray[1].push(this.positionArray[1][this.positionArray[1].length - 1]);
		}
		break;
		
		case "down":
		{
		  this.positionArray[0].push(parseInt(this.positionArray[0][this.positionArray[0].length - 1]) + 1);
		  this.positionArray[1].push(this.positionArray[1][this.positionArray[1].length - 1]);
		}
		break;
		
		default:
		break;
	  }	  
	},
	
	this.moveLeft = function() {
	  for(var key in this.positionArray)
	  {
	    this.positionArray[key].pop();
	  }
	  
	  this.positionArray[0].unshift(this.positionArray[0][0]);
	  this.positionArray[1].unshift(this.positionArray[1][0] - 1);
	},
	
	this.moveRight = function() {
	  for(var key in this.positionArray)
	  {
	    this.positionArray[key].pop();
	  }
	  
	  this.positionArray[0].unshift(this.positionArray[0][0]);
	  this.positionArray[1].unshift(this.positionArray[1][0] + 1);
	},
    
	this.moveUp = function() {
	  for(var key in this.positionArray)
	  {
	    this.positionArray[key].pop();
	  }

      this.positionArray[0].unshift(this.positionArray[0][0] - 1);	  
      this.positionArray[1].unshift(this.positionArray[1][0]);
	},
	
	this.moveDown = function() {
	  for(var key in this.positionArray)
	  {
	    this.positionArray[key].pop();
	  }
	  
      this.positionArray[0].unshift(this.positionArray[0][0] + 1);	  
      this.positionArray[1].unshift(this.positionArray[1][0]);
	}
	
	this.decreaseLife = function() {
	    this.life = this.life - 1;
	},
	
	this.collisionBorder = function() {
	  var headCoordX = this.positionArray[0][0].toString();
	  var headCoordY = this.positionArray[1][0].toString();
	  
	  if(headCoordX == 0 || headCoordX == 29 || headCoordY == 0 || headCoordY == 29)
	  {
	    document.getElementById(headCoordX.toString() + "_" + headCoordY.toString()).style.background = "black";
	    return true;
	  }

	  return false;
	},
	
	this.collisionBody = function() {
	  var headCoord = this.positionArray[0][0].toString() + "_" + this.positionArray[1][0].toString();
	  
	  var coordsBody = new Array();
	  
	  for(var key = 1; key < this.positionArray[0].length; key++)
	  {
	    coordsBody.push(this.positionArray[0][key].toString() + "_" + this.positionArray[1][key].toString());
	  }
	  
	  for(var key in coordsBody)
	  {
	    if(headCoord == coordsBody[key])
		  return true;
	  }
	},
	
	this.draw = function() {

	  var value;

      for(var key in this.positionArray[0])
      {
        value = this.positionArray[0][key].toString() + "_" + this.positionArray[1][key].toString();
	    document.getElementById(value).style.background = this.clr;
      }
	},
	
	this.erase = function() {

	  var value;
      
      for(var key in this.positionArray[0])
      {
        value = this.positionArray[0][key].toString() + "_" + this.positionArray[1][key].toString();
	    document.getElementById(value).style.background = "white";
      }
	},

	this.changeHeadDirection = function(direction) {

	  switch(direction)
	  {
	    case "left":
		{
		  if(this.headDirection != "left" && this.headDirection != "right")
			this.headDirection = "left";
		}
		break;
		
		case "right":
		{
		  if(this.headDirection != "left" && this.headDirection != "right")
			this.headDirection = "right";
		}
		break;
		
		case "up":
		{
		  if(this.headDirection != "up" && this.headDirection != "down")
			this.headDirection = "up";
		}
		break;
		
		case "down":
		{
		  if(this.headDirection != "up" && this.headDirection != "down")
			this.headDirection = "down";
		}
		break;
		
		default:
		break;
	  
	  }
	},
	
	this.changeTailDirection = function() { // Detect tail direction on the map and save it to the object property.
	  
	  var coordX1 = this.positionArray[0][this.positionArray[0].length - 2];
	  var coordX2 = this.positionArray[0][this.positionArray[0].length - 1];
	  var coordY1 = this.positionArray[1][this.positionArray[1].length - 2];
	  var coordY2 = this.positionArray[1][this.positionArray[1].length - 1];
	  var direction;
	
	  if(coordY1 < coordY2)
	  {
	    direction = "right";
	  }
	  else if(coordY1 > coordY2)
	  {
	    direction = "left";
	  }
	  else if(coordX1 < coordX2)
	  {
	    direction = "down";
	  }
	  else if(coordX1 > coordX2)
	  {
	    direction = "top";
	  }
	  
	  this.tailDirection = direction;  
	}
	
}

/* --------------------------Food class------------------------------------------------------------------- */

function Food() 
{
	var thisRef = this;

		this.clr = "green",

	this.scorePoints = 100,
	this.positionArray = [15, 15],

  	this.collisionWithSnakeHead = function() {

    	var snakeHeadCoord = snake.positionArray[0][0].toString() + "_" + snake.positionArray[1][0].toString();
		var foodCoord = this.positionArray[0].toString() + "_" + this.positionArray[1].toString();
		
		if(snakeHeadCoord == foodCoord)
			return true;
  	},

		this.generatePosition = function() {

	    var foodCoordX;
	    var foodCoordY;
		var foodAndSnakeCollision;
		var snakeArray = new Array();

		for(var key in snake.positionArray[0])
		  snakeArray.push(snake.positionArray[0][key].toString() + "_" + snake.positionArray[1][key].toString());

		do {
			foodCoordX = Math.floor(Math.random() * 28 + 1);
		 	foodCoordY = Math.floor(Math.random() * 28 + 1);
	     
		 	foodAndSnakeCollision = false; 
		 
		 	for(var key in snakeArray)
		 	{
		    	if(foodCoordX.toString() + "_" + foodCoordY.toString() == snakeArray[key])
			  	foodAndSnakeCollision = true;
		 	}
		} while(foodAndSnakeCollision);

		this.positionArray[0] = foodCoordX;
	    this.positionArray[1] = foodCoordY;
		},

		this.draw = function() {
		document.getElementById(this.positionArray[0].toString() + "_" + this.positionArray[1].toString()).style.background = this.clr;
		},

		this.erase = function() {
		document.getElementById(this.positionArray[0].toString() + "_" + this.positionArray[1].toString()).style.background = "white";
		}
}

document.onkeydown = function(e) { // keyboard input
    switch (e.keyCode) 
	{
      case 37: // For left arrow button
	   {
		snake.changeHeadDirection("left");

		if(snake.headDirection == "left")
		{
		  snake.erase();
		  snake.moveLeft();
		  snake.draw();
		}
	   } break;
			   
      case 38: // For up arrow button
       {
	    snake.changeHeadDirection("up");

		if(snake.headDirection == "up")
		{
		  snake.erase();
		  snake.moveUp();
		  snake.draw();
		}
	   } break;
			   
      case 39: // For right arrow button
	   {
		snake.changeHeadDirection("right");

		if(snake.headDirection == "right")
		{
		  snake.erase();
		  snake.moveRight();
		  snake.draw();
		}
	   } break;
				
      case 40: // For down arrow button
	   {
		snake.changeHeadDirection("down");

		if(snake.headDirection == "down")
		{
		  snake.erase();
		  snake.moveDown();
		  snake.draw();
		}
	   } break;
			 
	   default:
	   break;
	}

	snake.changeTailDirection();
	foodEaten();
	checkLose();
};		

function startGame() // Start game.
{
    timer = setInterval(
       function() {
	      snake.erase();

	      snake["move" + snake.headDirection.charAt(0).toUpperCase() + snake.headDirection.slice(1)](); // calls snake.moveLeft | snake.moveRight ... by snake["moveLeft"]();

		  snake.draw();
		  
		  snake.changeTailDirection();
          foodEaten();
		  checkLose();

    }, snake.speed)
}

function foodEaten() // Checking whether the food is eaten.
{
  	if(food.collisionWithSnakeHead() == true)
	{
	  score = score + food.scorePoints;
      document.getElementById("score").value = score;
	  food = new Food();
	  snake.increaseSize();
	  food.generatePosition();
	  food.draw();
	}
}

function checkLose() // Checking losing condition.
{
     if(snake.collisionBody() == true || snake.collisionBorder() == true)
	{
	   alert("You lose");
       clearInterval(timer);
	}
}