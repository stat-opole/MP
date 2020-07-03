 const puzzle_level = 4;
 var canvas, ctx;
 
 var ctx, startX, startY;

 var pieces, dragHoldX, dragHoldY;
 var puzzleWidth;
 var puzzleHeight;
 var pieceWidth;
 var pieceHeight;

 var piecePuzzle;

 var drag=false;
 var mouseX;
 var mouseY;
 var currentPiece;
 var currentDropPiece;

 
 var dd,mm,yyyy;
 
 var mx, my;
 var start, seconds, minutes, hours, t;
 	
start = document.getElementById('txt3'),
   
 seconds = 0, minutes = 0, hours = 0, t;
    start.textContent = "00:00:00";

 
 var touchSupported=false;
 

 
 function init()
 {
	 
	 canvas = document.getElementById("myCanvas"),
	 ctx = canvas.getContext("2d");
	 mouse = {x:0,y:0};
	 img = new Image();
	 img.addEventListener('load',onImage,false);
	 img.src = "images/Puzzle4.JPG";
	 
	 //start_game = document.getElementById('start'),
	 // img2=new Image();
	  // img2.addEventListener('load',onImage,false);
	 // img2.src="images/start.jpg";

 }
 
  // if (Modernizr.touch) {

        // touchSupported = true;

        // eventsMap  = {

            // select: "touchstart",

            // down: "touchstart",

            // up: "touchend",

            // move: "touchmove"

        // };

    // }
 
 function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('txt').innerHTML =
  h + ":" + m + ":" + s;
  var t = setTimeout(startTime, 500);
  dateTime();
}
function checkTime(i) {
  if (i < 10) {i = "0" + i}; 
  return i;
}

function dateTime() {
		var today = new Date();
dd = String(today.getDate()).padStart(2, '0');
mm = String(today.getMonth() + 1).padStart(2, '0');
yyyy = today.getFullYear();

today = dd + '.' + mm + '.' + yyyy;

document.getElementById('txt2').innerHTML =
  today;
  

 
}


    

function add() {
	
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    start.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}
function timer() {
	
	
    t = setTimeout(add, 1000);
}


 function onImage()
 {
	 
	pieceWidth = Math.floor(img.width / puzzle_level);
    pieceHeight = Math.floor(img.height / puzzle_level);
    
	puzzleWidth = pieceWidth * puzzle_level;
    puzzleHeight = pieceHeight * puzzle_level;
    startTime();
//timer();
	setCanvas();
    //initPuzzle();
}

function setCanvas()
{
    canvas.width = puzzleWidth;
    canvas.height = puzzleHeight;
    canvas.style.border = "1px solid black";
}

function initPuzzle()
{
	currentPiece = null;
    currentDropPiece = null
	timer();
	document.getElementById("start").style.display = "none"; 
	
	if (Modernizr.touch) {

        touchSupported = true;

        // eventsMap  = {

            // select: "touchstart",

            // down: "touchstart",

            // up: "touchend",

            // move: "touchmove"

        // };

    }
	
    buildPieces();
}



	
function buildPieces()
{
	pieces=[];
	var piece;
	var wx=0;
	var wy=0;
	
	for(var i=0; i<puzzle_level*puzzle_level;i++)
	{
		piece={};
		piece.x=wx;
		piece.y=wy;
		piece.w=pieceWidth;
		piece.h=pieceHeight;
		piece.xx=0;
		piece.yy=0;
		
		pieces.push(piece);
		
		wx+=pieceWidth;
		
		
		if(wx>=puzzleWidth)
		{
			wx=0;
			wy+=pieceHeight;
		}
		
		
		
		
	}
	
	shufflePuzzle();

	
}

function shufflePuzzle(){
    pieces = shuffleArray(pieces);
    var i;
    var piece;
    var wx = 0;
    var wy = 0;
    for(i = 0;i < pieces.length;i++){
        piece = pieces[i];
        piece.xx = wx;
        piece.yy = wy;
		piece.width=pieceWidth;
		piece.height=pieceHeight;
        ctx.drawImage(img, piece.x, piece.y, pieceWidth, pieceHeight, wx, wy, pieceWidth, pieceHeight);
        ctx.strokeRect(wx, wy, pieceWidth,pieceHeight);
        wx += pieceWidth;
        if(wx >= puzzleWidth){
            wx = 0;
            wy += pieceHeight;
        }
    }
	
	if(!touchSupported)
	{
		 document.onmousedown = mouseDown;
	}
	else
	{
		
		//img.addEventListener('load',onImage,false);
		document.ontouchstart = mouseDown;
			
			//mouseDown();
		//};
	}
    //document.onmousedown = mouseDown;
}

	
function shuffleArray(o)
{
	for(var i = 0; i<o.length;i++)
	{
		const j = Math.floor(Math.random()*i);
		const temp = o[i];
		o[i]=pieces[j];
		o[j]=temp;
	
	}
    return o;
}

function inPiece()
{
	var piece;
	
	for(var i=0; i<pieces.length;i++)
	{
		
		piece=pieces[i];
		if(mouseX<piece.xx || mouseX>(piece.xx+pieceWidth)||mouseY<piece.yy || mouseY>(piece.yy+pieceHeight))
		{
		
		}
		else
		{
			return piece;
		}
		
	}

	return null
}

function mouseDown(e)
{

	var bRect = canvas.getBoundingClientRect();
	if(!Modernizr.touch)
	{
		mouseX = (e.clientX - bRect.left);
	mouseY = (e.clientY - bRect.top);
	}
	else
	{
	
		mouseX = (e.touches[0].clientX - bRect.left);
	mouseY = (e.touches[0].clientY - bRect.top);
	}
	


	
	
	
	
	currentPiece=inPiece();
	
	if(currentPiece!=null)
	{
		ctx.clearRect(currentPiece.xx,currentPiece.yy,pieceWidth,pieceHeight);
        ctx.save();
        ctx.globalAlpha = .9;
        ctx.drawImage(img, currentPiece.x, currentPiece.y, pieceWidth, pieceHeight, mouseX - (pieceWidth / 2), mouseY - (pieceHeight / 2), pieceWidth, pieceHeight);
        ctx.restore();
	
		if(!touchSupported)
		{
			
			document.onmousemove = mouseMove;
        document.onmouseup = mouseUp;
		}
		else
		{
			
			canvas.addEventListener('touchmove', mouseMove, {passive: false});
			
			//document.ontouchmove =mouseMove;
			//document.ontouchend = mouseUp;
			document.addEventListener('ontouchend', mouseUp, {passive: true});
			
		}
        
	}
	
}




function mouseMove(e)
{
	
	currentDropPiece = null;
e.preventDefault();
	e.stopPropagation();

	var bRect = canvas.getBoundingClientRect();
	
	if(!Modernizr.touch)
	{
		mouseX = (e.clientX - bRect.left);
	mouseY = (e.clientY - bRect.top);
	}
	else
	{
	
		mouseX = (e.touches[0].clientX - bRect.left);
	mouseY = (e.touches[0].clientY - bRect.top);
	}
	
	
	ctx.clearRect(0,0,puzzleWidth,puzzleHeight);
	
	var piece;
	for(var i=0; i<pieces.length;i++)
	{
		
		piece=pieces[i];
		if(piece==currentPiece)
		{
			continue;
		}
		
		ctx.drawImage(img, piece.x, piece.y, pieceWidth, pieceHeight, piece.xx, piece.yy, pieceWidth, pieceHeight);
		
		ctx.strokeRect(piece.xx, piece.yy, pieceWidth,pieceHeight);
		if(currentDropPiece == null){
            if(mouseX < piece.xx || mouseX > (piece.xx + pieceWidth) || mouseY < piece.yy || mouseY > (piece.yy + pieceHeight)){
            }
            else{
				currentDropPiece = piece;
				ctx.save();
                ctx.globalAlpha = .4;
                ctx.fillRect(currentDropPiece.xx,currentDropPiece.yy,pieceWidth, pieceHeight);
                ctx.restore();
            }
        }
			
	}
	ctx.save();
    ctx.globalAlpha = .6;
    ctx.drawImage(img, currentPiece.x, currentPiece.y, pieceWidth, pieceHeight, mouseX - (pieceWidth / 2), mouseY - (pieceHeight / 2), pieceWidth, pieceHeight);
    ctx.restore();
    ctx.strokeRect( mouseX - (pieceWidth / 2), mouseY - (pieceHeight / 2), pieceWidth,pieceHeight);
	
}



function mouseUp(e)
{
	if(!touchSupported)
	{
			
	document.onmousemove = null;
    document.onmouseup = null;
	}
	else
	{
		
		//document.ontouchmove = null;
		
				
				//document.ontouchend = null;
		
		
		
		//canvas.unbind('touchend');
	}

    if(currentDropPiece != null){
        var tmp = {xx:currentPiece.xx,yy:currentPiece.yy};
        currentPiece.xx = currentDropPiece.xx;
        currentPiece.yy = currentDropPiece.yy;
        currentDropPiece.xx = tmp.xx;
        currentDropPiece.yy = tmp.yy;
    }

	resetPuzzleAndCheckWin();
}

function resetPuzzleAndCheckWin(){
    ctx.clearRect(0,0,puzzleWidth,puzzleHeight);
    var gameWin = true;
    var i;
    var piece;
    for(i = 0;i < pieces.length;i++){
        piece = pieces[i];
	
        ctx.drawImage(img, piece.x, piece.y, pieceWidth, pieceHeight, piece.xx, piece.yy, pieceWidth, pieceHeight);
        ctx.strokeRect(piece.xx, piece.yy, pieceWidth,pieceHeight);
       if(piece.xx != piece.x || piece.yy != piece.y){
            gameWin = false;
			
        }
		
    }
	
	if(gameWin)
	{
		
		setTimeout(gameOver,500);
	}
    
}

function myStopFunction() {
              clearInterval(t);
      }
 
 
function gameOver(){
    document.onmousedown = null;
    document.onmousemove = null;
    document.onmouseup = null;
	
	var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('txt').innerHTML =
  h + ":" + m + ":" + s;

	alert("Gratulacje! \nUkończyłaś/eś poziom łatwy w czasie: "+start.textContent +"\nPrzechodzisz do kolejnego poziomu");
   myStopFunction();

   window.location.href = "choose_level2.html";
}



  


