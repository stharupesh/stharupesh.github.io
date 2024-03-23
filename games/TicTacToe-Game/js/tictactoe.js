var turn = 1;

function process(r) {
  if(document.getElementById(r).innerHTML == "&nbsp;") {
    if(parseInt(turn) == 1) {
      document.getElementById(r).innerHTML = "X";
	     turn = 2;
    } else {
      document.getElementById(r).innerHTML = "O";
	   turn = 1;
    }
  }
  
  var a1 = document.getElementById("1").innerHTML;
  var a2 = document.getElementById("2").innerHTML;
  var a3 = document.getElementById("3").innerHTML;
  var a4 = document.getElementById("4").innerHTML;
  var a5 = document.getElementById("5").innerHTML;
  var a6 = document.getElementById("6").innerHTML;
  var a7 = document.getElementById("7").innerHTML;
  var a8 = document.getElementById("8").innerHTML;
  var a9 = document.getElementById("9").innerHTML;
  
  if(a1 == a2 && a2 == a3 && a1 != "&nbsp;" || a4 == a5 && a5 == a6 && a4 != "&nbsp;" || a7 == a8 && a8 == a9 && a7 != "&nbsp;" || a1 == a4 && a4 == a7 && a1 != "&nbsp;" || a2 == a5 && a5 == a8 && a2 != "&nbsp;" || a3 == a6 && a6 == a9 && a3 != "&nbsp;" || a1 == a5 && a5 == a9 && a1 != "&nbsp;" || a3 == a5 && a5 == a7 && a3 != "&nbsp;") {
    if(parseInt(turn) == 2) {
      alert("X wins!!");
    } else {
      alert("O wins!!");
    }
  }
}