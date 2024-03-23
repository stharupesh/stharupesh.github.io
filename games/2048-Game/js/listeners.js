document.onkeydown = function(e) { // keyboard input
	switch (e.keyCode) 
	{
	  case 13: game.play(); break; // For new game - enter button

	  case 37: game.moveLeft(); break; // For left arrow button
			   
	  case 38: game.moveUp(); break; // For up arrow button
	   
	  case 39: game.moveRight(); break; // For right arrow button
				
	  case 40: game.moveDown(); break; // For down arrow button
			 
	  default:
	   break;
	}
};