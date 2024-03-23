var score = 0;

function restart()
{
	window.location.reload();
}

function start()
{
	document.getElementById("score").value = "0";

	createMap(); // Creating the map with buttons used as a pixel where colors can be assigned
	hideMapUpperPart();
	startGame(); // Generates a shape and starts timer.
}

function controlsInfo()
{
	alert("press left and right arrow keys to move, down arrow to move down fast and up arrow to flip the shape!!");
}

/* ---------------------------Creating the map for the game [Design part]------------------------------------------------------------------- */

function createMap()
{
  for(var i = 1; i <= 25; i++)
  {
    for(var j = 1; j <= 10; j++)
	{
	  document.getElementById("pixelMap").innerHTML = document.getElementById("pixelMap").innerHTML + "<button style = \"background: lightgrey;\"  id = \"" + i.toString() + j.toString() + "\"></button>";     
	}
	document.getElementById("pixelMap").innerHTML = document.getElementById("pixelMap").innerHTML + "<br/>";
  }
  
}

function hideMapUpperPart()
{
  for(var i = 1; i <= 5; i++)
  {
    for(var j = 1; j <= 10; j++)
	{
	  document.getElementById(i.toString() + j.toString()).style.visibility = "hidden";
	}
  }
}

/* --------------Creating shapes [Design part]----------------------------------------------------------------------------------- */

function createShape()
{
  var pixelArray = new Array(); // For storing button id to draw pixel
  var randomNo;

  randomNo = Math.floor(Math.random() * 19 + 1);
  
  switch(randomNo)
  {
    case 1:
	shape1();
	break;
	
	case 2:
	shape2();
	break;
		
	case 3:
	shape3();
	break;
		
	case 4:
	shape4();
	break;
		
	case 5:
	shape5();
	break;
		
	case 6:
	shape6();
	break;
		
	case 7:
	shape7();
	break;
		
	case 8:
	shape8();
	break;
			
	case 9:
	shape9();
	break;
		
	case 10:
	shape10();
	break;
		
	case 11:
	shape11();
	break;
			
	case 12:
	shape12();
	break;
		
	case 13:
	shape13();
	break;
		
	case 14:
	shape14();
	break;
			
	case 15:
	shape15();
	break;
			
	case 16:
	shape16();
	break;
		
	case 17:
	shape17();
	break;
		
	case 18:
	shape18();
	break;
			
	case 19:
	shape19();
	break;
	
	default:
	break;
	
  }

  function shape1() // box
  {
    pixelArray.push("1", "5", "1", "6", "2", "5", "2", "6","black", 1);
  }
  
  function shape2() // Vertical line
  {
    pixelArray.push("1", "5", "2", "5", "3", "5", "4", "5", "orange", 2);
  }
  
  function shape3() // Horizontal line
  {
    pixelArray.push("4", "5", "4", "6", "4", "7", "4", "8", "orange", 3);
  }
  
  function shape4() // L shape
  {
    pixelArray.push("1", "4", "2", "4", "3", "4", "3", "5", "blue", 4);
  }
  
  function shape5() // L shape - 90 degrees right
  {
    pixelArray.push("2", "5", "2", "6", "2", "7", "3", "5", "blue", 5);
  }
  
  function shape6() // L shape - 180 degrees right
  {
    pixelArray.push("1", "4", "1", "5", "2", "5", "3", "5", "blue", 6);
  }
  
  function shape7() // L shape - 270 degrees right
  {
    pixelArray.push("2", "5", "3", "3", "3", "4", "3", "5", "blue", 7);
  }
  
  function shape8() // L shape invert
  {
    pixelArray.push("1", "5", "2", "5", "3", "4", "3", "5", "purple", 8);
  }
  
  function shape9() // L shape invert - 90 degrees right
  {
    pixelArray.push("2", "3", "3", "3", "3", "4", "3", "5", "purple", 9);
  }
  
  function shape10() // L shape invert - 180 degrees right 
  {
    pixelArray.push("1", "5", "1", "6", "2", "5", "3", "5", "purple", 10);
  }
  
  function shape11() // L shape invert - 270 degrees right
  {
    pixelArray.push("2", "3", "2", "4", "2", "5", "3", "5", "purple", 11); 
  }
  
  function shape12() // z shape 
  {
    pixelArray.push("2", "5", "2", "6", "3", "6", "3", "7", "green", 12);
  }
  
  function shape13() // z shape - 90 degrees right 
  {
    pixelArray.push("1", "8", "2", "7", "2", "8", "3", "7", "green", 13);
  }
  
  function shape14() // z shape invert
  {
    pixelArray.push("2", "7", "2", "8", "3", "6", "3", "7", "red", 14);
  }
  
  function shape15() // z shape invert - 90 degrees right 
  {
    pixelArray.push("1", "6", "2", "6", "2", "7", "3", "7", "red", 15);
  }
  
  function shape16() // triangle shape
  {
    pixelArray.push("2", "4", "3", "3", "3", "4", "3", "5", "brown", 16);
  }
  
  function shape17() // triangle shape - 90 degrees right 
  {
    pixelArray.push("1", "5", "2", "5", "2", "6", "3", "5", "brown", 17);
  }
  
  function shape18() // triangle shape - 180 degrees right 
  {
    pixelArray.push("2", "4", "2", "5", "2", "6", "3", "5", "brown", 18);
  }
  
  function shape19() // triangle shape - 270 degrees right
  {
    pixelArray.push("1", "5", "2", "4", "2", "5", "3", "5", "brown", 19);
  }
  
  return pixelArray;
}

/* ---------------------------Acts as a start button for the game------------------------------------------------------------------- */

function startGame()
{
  var pixelArray = new Array();
  
  pixelArray = createShape();
  drawGraphics(pixelArray);
  timer(pixelArray);
}

/* ---------------------------Draws shapes on the map after different logical processes------------------------------------------------------------------- */

function drawGraphics(pixelArray)
{
  for(var i = 0; i <= 6; i = i + 2)
  {
    document.getElementById(pixelArray[i] + pixelArray[i + 1]).style.background = pixelArray[8];
  }
}

 function timer(pixelArray)
{
  var first;
  var third;
  var fifth;
  var seventh;
  var clr;
  var time = document.getElementById("speed").value;
  var move = true;
  

  var movingPixels = setInterval(function(){

           document.onkeydown = function(e) {
            switch (e.keyCode) {
            case 37: // For left arrow button
			   {
				 if(checkCollisionLeft(pixelArray) != true && moveShape(pixelArray, "left") != false && move == true)
			     {
			       pixelArray[8] = "lightgrey";
			       drawGraphics(pixelArray);
			       pixelArray[8] = clr;
                   pixelArray = moveShape(pixelArray, "left");
				   drawGraphics(pixelArray);
			     }
			   }
               break;
			   
            case 38: // For up arrow button
			    {
				  var storedArray = new Array();
				  for(var key in pixelArray)
				  {
				    storedArray.push(pixelArray[key]);
				  }
				  
				  if(rotateShape(storedArray) != false)
				  {
				    clr = pixelArray[8];
			        pixelArray[8] = "lightgrey";
			        drawGraphics(pixelArray);
				  
			        pixelArray = rotateShape(pixelArray);
			        pixelArray[8] = clr;
			        drawGraphics(pixelArray);
				  }
			   }
               break;
			   
            case 39: // For right arrow button
			    {
			     if(checkCollisionRight(pixelArray) != true && moveShape(pixelArray, "right") != false && move == true)
			       {
			        pixelArray[8] = "lightgrey";
			        drawGraphics(pixelArray);
			        pixelArray[8] = clr;
                    pixelArray = moveShape(pixelArray, "right");
				    drawGraphics(pixelArray);
			      }
				}
				break;
            case 40: // For down arrow button
			    {
		         if(pixelArray[6] == "25" || checkCollisionDown(pixelArray) == true) // Check collision and regenerate shape
			      {
			        
			       }
			      else 
			      {
			        first = parseInt(pixelArray[0]) + 1;
                    third = parseInt(pixelArray[2]) + 1;
                    fifth = parseInt(pixelArray[4]) + 1;
                    seventh = parseInt(pixelArray[6]) + 1;			
                    clr = pixelArray[8];
			        pixelArray[8] = "lightgrey";
			        drawGraphics(pixelArray);
		 	
	  		        pixelArray[0] = first.toString();
			        pixelArray[2] = third.toString();
			        pixelArray[4] = fifth.toString();
			        pixelArray[6] = seventh.toString();
			        pixelArray[8] = clr;
			        drawGraphics(pixelArray); 
			      }	     		  
				}
               break;
			   
            }};

		    if(parseInt(pixelArray[6]) < 8 && checkCollisionDown(pixelArray) == false)
			{
			  alert("You lose");
			  clearInterval(movingPixels);
			}
			else if(pixelArray[6] == "25" || checkCollisionDown(pixelArray) == true)// Check collision and regenerate shape
			{
			  clearInterval(movingPixels);
			  move = false;
			  checkLine();
              startGame();
			}
			else
			{
			  first = parseInt(pixelArray[0]) + 1;
              third = parseInt(pixelArray[2]) + 1;
              fifth = parseInt(pixelArray[4]) + 1;
              seventh = parseInt(pixelArray[6]) + 1;			
              clr = pixelArray[8];
			  pixelArray[8] = "lightgrey";
			  drawGraphics(pixelArray);
		 	
	  		  pixelArray[0] = first.toString();
			  pixelArray[2] = third.toString();
			  pixelArray[4] = fifth.toString();
			  pixelArray[6] = seventh.toString();
			  pixelArray[8] = clr;
			  drawGraphics(pixelArray); 
			}	     		  
		}, time); 
}

/* ---------------------------Check each line and decrease line and increase score------------------------------------------------------------------- */

function checkLine()
{
  var storeCheck = true;
  var tempId;
  
  for(var i = 5; i <= 25; i++)
  {
    storeCheck = true;
    for(var j = 1; j <= 10; j++)
	{
	  if(storeCheck == true && document.getElementById(i.toString() + j.toString()).style.background != "lightgrey")
       {
		 storeCheck = true;
	   }	  
	   else
	   {
	     storeCheck = false;
	   }
	}

	if(storeCheck == true)
	{
	   score++;
	  for(var k = i; k >= 5; k--)
	  {
	    for(var l = 1; l <= 10; l++)
		{
		  tempId = (k - 1).toString() + l.toString();
		  document.getElementById(k.toString() + l.toString()).style.backgroundColor = document.getElementById(tempId).style.backgroundColor;
		}
	  }
	}
  }
  document.getElementById("score").value = score * 10;
}

/* ------------------------Check left collision------------------------------------------------------------------- */

function checkCollisionLeft(pixelArray)
{
  var collisionPoints = new Array();
  var shape = parseInt(pixelArray[9]);
  var left;
  var coordX1;
  var coordX2;

  switch(shape)
  {
    case 1: // box
	{
	  collisionPoints.push(1, 5);
	}
	break;
	
	case 2: // vertical line
	{
	  collisionPoints.push(1, 3, 5, 7);
	}
	break;
	
	case 3: // horizontal line
	{
	  collisionPoints.push(1);
	}
	break;
	
	case 4: // L shape
	{
	  collisionPoints.push(1, 3, 5);
	}
	break;
	
	case 5: // L shape - 90 degrees right
	{
	  collisionPoints.push(1, 7);
	}
	break;
	
	case 6: // Z shape - 180 degrees right
	{
	  collisionPoints.push(1, 5, 7);
	}
	break;
	
	case 7: // Z shape - 270 degrees right
	{
	  collisionPoints.push(1, 3);
	}
	break;
	
	case 8: // L shape invert
	{
	  collisionPoints.push(1, 3, 5);
	}
	break;
	
				
	case 9: // L shape invert - 90 degrees right
	{
	  collisionPoints.push(1, 3);
	}
	break;
		
	case 10: // L shape invert - 180 degrees right
	{
	  collisionPoints.push(1, 5, 7);
	}
	break;
		
	case 11: // L shape invert - 270 degrees right
	{
	  collisionPoints.push(1, 7);
	}
	break;
			
	case 12: // z shape
	{
	  collisionPoints.push(1, 5);
	}
	break;
		
	case 13: // z shape - 90 degrees right
	{
	  collisionPoints.push(1, 3, 7);
	}
	break;
		
	case 14: // z shape invert
	{
	  collisionPoints.push(1, 5);
	}
	break;
			
	case 15: // z shape invert - 90 degrees right
	{
	  collisionPoints.push(1, 3, 7);
	}
	break;
			
	case 16: // Triangle shape
	{
	  collisionPoints.push(1, 3);
	}
	break;
		
	case 17: // Triangle shape - 90 degrees right
	{
	  collisionPoints.push(1, 3, 7);
	}
	break;
		
	case 18: // Triangle shape - 180 degrees right
	{
	  collisionPoints.push(1, 7);
	}
	break;
			
	case 19: // Triangle shape - 270 degrees right
	{
	  collisionPoints.push(1, 3, 7);
	}
	break;
	
	default:
	break;
  }
  
  for(var key in collisionPoints)
  {
    coordX1 = parseInt(collisionPoints[key]) - 1;
	coordX1 = pixelArray[coordX1];
	
	coordX2 = pixelArray[collisionPoints[key]];
	coordX2 = parseInt(coordX2) - 1;
	
	left = coordX1.toString() + coordX2.toString();
    
	if(document.getElementById(left).style.background != "lightgrey")
	{
	  return true;
	}
  }
}

/* ----------------------Check right collision------------------------------------------------------------------- */

function checkCollisionRight(pixelArray)
{
  var collisionPoints = new Array();
  var shape = parseInt(pixelArray[9]);
  var right;
  var coordX1;
  var coordX2;

  switch(shape)
  {
    case 1: // box
	{
	  collisionPoints.push(3, 7);
	}
	break;
	
	case 2: // vertical line
	{
	  collisionPoints.push(1, 3, 5, 7);
	}
	break;
	
	case 3: // horizontal line
	{
	  collisionPoints.push(7);
	}
	break;
	
	case 4: // L shape
	{
	  collisionPoints.push(1, 3, 7);
	}
	break;
	
	case 5: // L shape - 90 degrees right
	{
	  collisionPoints.push(5, 7);
	}
	break;
	
	case 6: // Z shape - 180 degrees right
	{
	  collisionPoints.push(3, 5, 7);
	}
	break;
	
	case 7: // Z shape - 270 degrees right
	{
	  collisionPoints.push(1, 7);
	}
	break;
	
	case 8: // L shape invert
	{
	  collisionPoints.push(1, 3, 7);
	}
	break;
				
	case 9: // L shape invert - 90 degrees right
	{
	  collisionPoints.push(1, 7);
	}
	break;
		
	case 10: // L shape invert - 180 degrees right
	{
	  collisionPoints.push(3, 5, 7);
	}
	break;
		
	case 11: // L shape invert - 270 degrees right
	{
	  collisionPoints.push(5, 7);
	}
	break;
			
	case 12: // z shape
	{
	  collisionPoints.push(3, 7);
	}
	break;
		
	case 13: // z shape - 90 degrees right
	{
	  collisionPoints.push(1, 5, 7);
	}
	break;
		
	case 14: // z shape invert
	{
	  collisionPoints.push(3, 7);
	}
	break;
			
	case 15: // z shape invert - 90 degrees right
	{
	  collisionPoints.push(1, 5, 7);
	}
	break;
			
	case 16: // Triangle shape
	{
	  collisionPoints.push(1, 7);
	}
	break;
		
	case 17: // Triangle shape - 90 degrees right
	{
	  collisionPoints.push(1, 5, 7);
	}
	break;
		
	case 18: // Triangle shape - 180 degrees right
	{
	  collisionPoints.push(5, 7);
	}
	break;
			
	case 19: // Triangle shape - 270 degrees right
	{
	  collisionPoints.push(1, 5, 7);
	}
	break;
	
	default:
	break;
  }
 
  
  for(var key in collisionPoints)
  {
    coordX1 = parseInt(collisionPoints[key]) - 1;
	coordX1 = pixelArray[coordX1];
	
	coordX2 = pixelArray[collisionPoints[key]];
	coordX2 = parseInt(coordX2) + 1;
	
	right = coordX1.toString() + coordX2.toString();
    
	if(document.getElementById(right).style.background != "lightgrey")
	{
	  return true;
	}
  }
}

/* ----------------Check down collision------------------------------------------------------------------- */

function checkCollisionDown(pixelArray)
{
  var collisionPoints = new Array();
  var shape = parseInt(pixelArray[9]);
  var down;
  var coordX1;
  var coordX2;
  
  switch(shape)
  {
    case 1: // box
	{
	  collisionPoints.push(4, 6);
	}
	break;
	
	case 2: // vertical line
	{
	  collisionPoints.push(6);
	}
	break;
	
	case 3: // horizontal line
	{
	  collisionPoints.push(0, 2, 4, 6);
	}
	break;
	
	case 4: // L shape
	{
	  collisionPoints.push(4, 6);
	}
	break;
	
	case 5: // L shape - 90 degrees right
	{
	  collisionPoints.push(2, 4, 6);
	}
	break;
	
	case 6: // Z shape - 180 degrees right
	{
	  collisionPoints.push(0, 6);
	}
	break;
	
	case 7: // Z shape - 270 degrees right
	{
	  collisionPoints.push(2, 4, 6);
	}
	break;
	
	case 8: // L shape invert
	{
	  collisionPoints.push(4, 6);
	}
	break;
	
				
	case 9: // L shape invert - 90 degrees right
	{
	  collisionPoints.push(2, 4, 6);
	}
	break;
		
	case 10: // L shape invert - 180 degrees right
	{
	  collisionPoints.push(2, 6);
	}
	break;
		
	case 11: // L shape invert - 270 degrees right
	{
	  collisionPoints.push(0, 2, 6);
	}
	break;
			
	case 12: // z shape
	{
	  collisionPoints.push(0, 4, 6);
	}
	break;
		
	case 13: // z shape - 90 degrees right
	{
	  collisionPoints.push(4, 6);
	}
	break;
		
	case 14: // z shape invert
	{
	  collisionPoints.push(2, 4, 6);
	}
	break;
			
	case 15: // z shape invert - 90 degrees right
	{
	  collisionPoints.push(2, 6);
	}
	break;
			
	case 16: // Triangle shape
	{
	  collisionPoints.push(2, 4, 6);
	}
	break;
		
	case 17: // Triangle shape - 90 degrees right
	{
	  collisionPoints.push(4, 6);
	}
	break;
		
	case 18: // Triangle shape - 180 degrees right
	{
	  collisionPoints.push(0, 4, 6);
	}
	break;
			
	case 19: // Triangle shape - 270 degrees right
	{
	  collisionPoints.push(2, 6);
	}
	break;
	
	default:
	break;
  }
  
  for(var key in collisionPoints)
  {
    coordX1 = pixelArray[collisionPoints[key]];
	coordX1 = parseInt(coordX1) + 1;
	coordX2 = parseInt(collisionPoints[key] + 1);
	coordX2 = pixelArray[coordX2];
	down = coordX1.toString() + coordX2.toString();
	console.log(document.getElementById(down).style.background);
	if(document.getElementById(down).style.background != "lightgrey")
	{
	  return true;
	  break;
	}
  }
  
}

/* ---------------Checks whether shape is outside the map(If yes, returns false. If no, returns values for moving shape) ------------------------------------------------------------------- */

function moveShape(pixelArray, direction)
{
  var storedArray = new Array();
  for(var key in pixelArray)
  {
    storedArray.push(pixelArray[key]);
  }
  
  switch(direction)
  {
    case "left":
	{
	  for(var i = 1; i <= 7; i = i + 2)
	  {
	    storedArray[i] = parseInt(storedArray[i]) - 1;
		storedArray[i] = storedArray[i].toString();
		if(parseInt(storedArray[i]) == 0)
		{
		  return false;
		  break;
		}
	  }
	}
	break;
	
	case "right":
	{
	  for(var i = 1; i <= 7; i = i + 2)
	  {
	    storedArray[i] = parseInt(storedArray[i]) + 1;
		storedArray[i] = storedArray[i].toString();
		if(parseInt(storedArray[i]) == 11)
		{
		  return false;
		  break;
		}
	  }
	}
	break;
	
	default:
	break;
  }
  
  return storedArray;
}

/* ---------------For rotating shape--------------------------------------------------------------------------------------------- */

function rotateShape(pixelArray)
{
  var diff;
  var change = false;
  var value = false;
  var value1;
  var value2;
  var notSameValue = new Array();
  var shape = parseInt(pixelArray[9]);
  var storedArray = new Array();
  
  for(var key in pixelArray)
  {
    storedArray.push(pixelArray[key]);
  }
  
  switch(shape)
  {
    case 1: // box
	{
      return pixelArray;
	}
	break;
	
	case 2: // vertical line
	{
	  pixelArray[0] = parseInt(pixelArray[0]) + 3;
	  pixelArray[2] = parseInt(pixelArray[2]) + 2;
	  pixelArray[3] = parseInt(pixelArray[3]) + 1;
	  pixelArray[4] = parseInt(pixelArray[4]) + 1;
	  pixelArray[5] = parseInt(pixelArray[5]) + 2;
	  pixelArray[7] = parseInt(pixelArray[7]) + 3;
	  pixelArray[9] = 3;
	  
	  if(pixelArray[7] > 10)
	  {
	    diff = pixelArray[7] - 10;
        outsideMapRight(diff);
	  }
	}
	break;
	
	case 3:  //horizontal line
	{
	  pixelArray[0] = parseInt(pixelArray[0]) - 3;
	  pixelArray[2] = parseInt(pixelArray[2]) - 2;
	  pixelArray[3] = parseInt(pixelArray[3]) - 1;
	  pixelArray[4] = parseInt(pixelArray[4]) - 1;
	  pixelArray[5] = parseInt(pixelArray[5]) - 2;
	  pixelArray[7] = parseInt(pixelArray[7]) - 3;
	  pixelArray[9] = 2;
	  
	  if(pixelArray[7] > 10)
	  {
	    diff = pixelArray[7] - 10;
        outsideMapRight(diff);
	  }
	}
	break;
	
	case 4: // L shape
	{
	  pixelArray[0] = parseInt(pixelArray[0]) + 1;
	  pixelArray[1] = parseInt(pixelArray[1]) + 1;
	  pixelArray[3] = parseInt(pixelArray[3]) + 2;
	  pixelArray[4] = parseInt(pixelArray[4]) - 1;
	  pixelArray[5] = parseInt(pixelArray[5]) + 3;
	  pixelArray[9] = 5;
	  
	  if(pixelArray[5] > 10)
	  {
	  	diff = pixelArray[5] - 10;
        outsideMapRight(diff);
	  }
	}
	break;
	
	case 5: // L shape - 90 degrees right
	{
	  pixelArray[0] = parseInt(pixelArray[0]) - 1;
	  pixelArray[1] = parseInt(pixelArray[1]) - 1;
	  pixelArray[2] = parseInt(pixelArray[2]) - 1;
	  pixelArray[3] = parseInt(pixelArray[3]) - 1;
	  pixelArray[5] = parseInt(pixelArray[5]) - 2;
	  pixelArray[9] = 6;
	  
	  if(pixelArray[1] < 1)
	  {
	  	diff = 1 - pixelArray[1];
        outsideMapLeft(diff);
	  }
	}
	break;
	
	case 6: // L shape - 180 degrees right
	{
	  pixelArray[0] = parseInt(pixelArray[0]) + 1;
	  pixelArray[1] = parseInt(pixelArray[1]) + 1;
	  pixelArray[2] = parseInt(pixelArray[2]) + 2;
	  pixelArray[3] = parseInt(pixelArray[3]) - 2;
	  pixelArray[4] = parseInt(pixelArray[4]) + 1;
	  pixelArray[5] = parseInt(pixelArray[5]) - 1;
	  pixelArray[9] = 7;
	  
	  if(pixelArray[3] < 1)
	  {
	  	diff = 1 - pixelArray[3];
        outsideMapLeft(diff);
	  }
	}
	break;
	
	case 7: // L shape - 270 degrees right
	{
	  pixelArray[0] = parseInt(pixelArray[0]) - 1;
	  pixelArray[1] = parseInt(pixelArray[1]) - 1;
	  pixelArray[2] = parseInt(pixelArray[2]) - 1;
	  pixelArray[3] = parseInt(pixelArray[3]) + 1;
	  pixelArray[9] = 4;
	}
	break;
	
	case 8: // L shape invert
	{
	  pixelArray[0] = parseInt(pixelArray[0]) + 1;
	  pixelArray[1] = parseInt(pixelArray[1]) - 2;
	  pixelArray[2] = parseInt(pixelArray[2]) + 1;
	  pixelArray[3] = parseInt(pixelArray[3]) - 2;
	  pixelArray[9] = 9;
	  
	  if(pixelArray[1] < 1)
	  {
	  	diff = 1 - pixelArray[1];
        outsideMapLeft(diff);
	  }
	}
	break;
			
	case 9: // L shape invert - 90 degrees right
	{
	  pixelArray[0] = parseInt(pixelArray[0]) - 1;
	  pixelArray[1] = parseInt(pixelArray[1]) + 2;
	  pixelArray[2] = parseInt(pixelArray[2]) - 2;
	  pixelArray[3] = parseInt(pixelArray[3]) + 3;
	  pixelArray[4] = parseInt(pixelArray[4]) - 1;
	  pixelArray[5] = parseInt(pixelArray[5]) + 1;
	  pixelArray[9] = 10;
	  
	  if(pixelArray[3] > 10)
	  {
	  	diff = pixelArray[3] - 10;
        outsideMapRight(diff);
	  }
	}
	break;
		
	case 10: // L shape invert - 180 degrees right
	{
	  pixelArray[0] = parseInt(pixelArray[0]) + 1;
	  pixelArray[1] = parseInt(pixelArray[1]) - 2;
	  pixelArray[2] = parseInt(pixelArray[2]) + 1;
	  pixelArray[3] = parseInt(pixelArray[3]) - 2;
	  pixelArray[9] = 11;
	  
	  if(pixelArray[1] < 1)
	  {
	  	diff = 1 - pixelArray[1];
        outsideMapLeft(diff);
	  }
	}
	break;
		
	case 11: // L shape invert - 270 degrees right
	{
	  pixelArray[0] = parseInt(pixelArray[0]) - 1;
	  pixelArray[1] = parseInt(pixelArray[1]) + 2;
	  pixelArray[3] = parseInt(pixelArray[3]) + 1;
	  pixelArray[4] = parseInt(pixelArray[4]) + 1;
	  pixelArray[5] = parseInt(pixelArray[5]) - 1;
	  pixelArray[9] = 8;
	}
	break;
			
	case 12: // z shape
	{
	  pixelArray[0] = parseInt(pixelArray[0]) - 1;
	  pixelArray[1] = parseInt(pixelArray[1]) + 3;
	  pixelArray[3] = parseInt(pixelArray[3]) + 1;
	  pixelArray[4] = parseInt(pixelArray[4]) - 1;
	  pixelArray[5] = parseInt(pixelArray[5]) + 2;
	  pixelArray[9] = 13;
	  
	  if(pixelArray[5] > 10)
	  {
	  	diff = pixelArray[5] - 10;
        outsideMapRight(diff);
	  }
	}
	break;
		
	case 13: // z shape - 90 degrees right
	{
	  pixelArray[0] = parseInt(pixelArray[0]) + 1;
	  pixelArray[1] = parseInt(pixelArray[1]) - 3;
	  pixelArray[3] = parseInt(pixelArray[3]) - 1;
	  pixelArray[4] = parseInt(pixelArray[4]) + 1;
	  pixelArray[5] = parseInt(pixelArray[5]) - 2;
	  pixelArray[9] = 12;
	  
	  if(pixelArray[1] < 1)
	  {
	  	diff = 1 - pixelArray[1];
        outsideMapLeft(diff);
	  }
	}
	break;
		
	case 14: // z shape invert
	{
	  pixelArray[0] = parseInt(pixelArray[0]) - 1;
	  pixelArray[1] = parseInt(pixelArray[1]) - 1;
	  pixelArray[3] = parseInt(pixelArray[3]) - 2;
	  pixelArray[4] = parseInt(pixelArray[4]) - 1;
	  pixelArray[5] = parseInt(pixelArray[5]) + 1;
	  pixelArray[9] = 15;
	}
	break;
			
	case 15: // z shape invert - 90 degrees right
	{
	  pixelArray[0] = parseInt(pixelArray[0]) + 1;
	  pixelArray[1] = parseInt(pixelArray[1]) + 1;
	  pixelArray[3] = parseInt(pixelArray[3]) + 2;
	  pixelArray[4] = parseInt(pixelArray[4]) + 1;
	  pixelArray[5] = parseInt(pixelArray[5]) - 1;	  
	  pixelArray[9] = 14;
	  
	  if(pixelArray[3] > 10)
	  {
	  	diff = pixelArray[3] - 10;
        outsideMapRight(diff);
	  }
	}
	break;
			
	case 16: // Triangle shape
	{
	  pixelArray[0] = parseInt(pixelArray[0]) - 1;
	  pixelArray[1] = parseInt(pixelArray[1]) + 1;
	  pixelArray[2] = parseInt(pixelArray[2]) - 1;
	  pixelArray[3] = parseInt(pixelArray[3]) + 2;
	  pixelArray[4] = parseInt(pixelArray[4]) - 1;
	  pixelArray[5] = parseInt(pixelArray[5]) + 2;
	  pixelArray[9] = 17;
	  
	  if(pixelArray[5] > 10)
	  {
	  	diff = pixelArray[5] - 10;
        outsideMapRight(diff);
	  }
	}
	break;
		
	case 17: // Triangle shape - 90 degrees right
	{
	  pixelArray[0] = parseInt(pixelArray[0]) + 1;
	  pixelArray[1] = parseInt(pixelArray[1]) - 1;
	  pixelArray[9] = 18;
	  
	  if(pixelArray[1] < 1)
	  {
	  	diff = 1 - pixelArray[1];
        outsideMapLeft(diff);
	  }
	}
	break;
		
	case 18: // Triangle shape - 180 degrees right
	{
	  pixelArray[0] = parseInt(pixelArray[0]) - 1;
	  pixelArray[1] = parseInt(pixelArray[1]) + 1;
	  pixelArray[3] = parseInt(pixelArray[3]) - 1;
	  pixelArray[5] = parseInt(pixelArray[5]) - 1;
	  pixelArray[9] = 19;
	}
	break;
			
	case 19: // Triangle shape - 270 degrees right
	{
	  pixelArray[0] = parseInt(pixelArray[0]) + 1;
	  pixelArray[1] = parseInt(pixelArray[1]) - 1;
	  pixelArray[2] = parseInt(pixelArray[2]) + 1;
	  pixelArray[3] = parseInt(pixelArray[3]) - 1;
	  pixelArray[4] = parseInt(pixelArray[4]) + 1;
	  pixelArray[5] = parseInt(pixelArray[5]) - 1;
	  pixelArray[9] = 16;
	  
	  if(pixelArray[3] < 1)
	  {
	  	diff = 1 - pixelArray[3];
        outsideMapLeft(diff);
	  }
	}
	break;
	
	default:
	break;
  }
  
  function outsideMapRight(diff)
  {
	 pixelArray[1] = parseInt(pixelArray[1]) - diff;
	 pixelArray[3] = parseInt(pixelArray[3]) - diff;
	 pixelArray[5] = parseInt(pixelArray[5]) - diff;
	 pixelArray[7] = parseInt(pixelArray[7]) - diff;
  }  
  function outsideMapLeft(diff)
  {
	 pixelArray[1] = parseInt(pixelArray[1]) + diff;
	 pixelArray[3] = parseInt(pixelArray[3]) + diff;
	 pixelArray[5] = parseInt(pixelArray[5]) + diff;
	 pixelArray[7] = parseInt(pixelArray[7]) + diff;
  }
  
  for(var key in pixelArray)
  {
    pixelArray[key] = pixelArray[key].toString();
  }
  
  for(var i = 0; i <= 7; i = i + 2)
  {
    value1 = pixelArray[i] + pixelArray[i + 1];
	
    for(var j = 0; j <= 7; j = j + 2)
	{
	  value2 = storedArray[j] + storedArray[j + 1];
      if(value1 == value2)
        {
		 value = true;
		}		
	}
	if(value != true)
	{
	  notSameValue.push(value1);
	}
	else
	{
	  value = false;
	}
  }

  for(var key in notSameValue)
  {
    if(document.getElementById(notSameValue[key]).style.backgroundColor != "lightgrey")
	{
	  change = true;
	}
  }
  
  if(change == true)
  {
    return false;
  }
  else
  {
    return pixelArray;
  }
}