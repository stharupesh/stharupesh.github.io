var a = new Array(9, 5, 7, 1, 2, 8, 3, 4, 6, "&nbsp;");
var b = new Array(9, 1, 2, 3, 4, 5, 6, 7, 8, "&nbsp;");
var i;
var input;

function check(input) {
  for(i = 1; i <= 9; i++) {
    if(document.getElementById(input).innerHTML == a[i]) {
	
	  if(a[i-1] == "&nbsp;" && i != 4 && i != 7) {
	  
	    a[i-1] = a[i];
		a[i] = "&nbsp;";
	  }

	  if(a[i+1] == "&nbsp;" && i!= 3 && i != 6) {

	    a[i+1] = a[i];
		a[i] = "&nbsp;";
	  }
	  
	  if(a[i-3] == "&nbsp;") {

	    a[i-3] = a[i];
		a[i] = "&nbsp;";
	  }
	  
	  if(a[i+3] == "&nbsp;") {

	    a[i+3] = a[i];
		a[i] = "&nbsp;";
	  }
	  
	  display();
	  wincheck();
	}
  }
}

function display() {
	for(i = 1; i <= 9; i++) {
	    document.getElementById(i).innerHTML = a[i];
		document.getElementById(i).style.background = "url(img/" + a[i] + ".jpg)";
 	}  
}

function wincheck() {

 var count = 0;
 
  for(i = 1; i <= 9; i++) {
    if(a[i] == b[i])
	  count++;
  }

  if(count == 9) {
    a[9] = 9;
	display();
    alert("You are good at puzzle solving!!");
  }
}
