 const puzzle_level = 6;
 var canvas = document.getElementById("myCanvas"), ctx = canvas.getContext("2d");
 var pages = document.getElementById("page")
 
 var img, img2;
 var pieces;
 var puzzleWidth;
 var puzzleHeight;
 var pieceWidth;
 var pieceHeight;
 var piecePuzzle;
 var mouseX;
 var mouseY;
 var currentPiece;
 var currentDropPiece;
 
 var dd,mm,yyyy;
 var x,y ;

 var touchSupported=false;
 
 var start, seconds, minutes, hours, t;
 	
 start = document.getElementById('txt3'),
   
 seconds = 0, minutes = 0, hours = 0, t;
 start.textContent = "00:00:00";

 function init(){	 
	mouse = {x:0,y:0};
	img = new Image();
	img.addEventListener('load',onImage,false);
	img.src = "images/Puzzle5.JPG";
	 
	img2=new Image();
	img2.addEventListener('load',onImage,false);
	img2.src="images/start.jpg"; 
 }
 
 function pokaz(){
	document.getElementById("page").style.textAlign = "left"; 
	document.getElementById("znikajacyobrazek").style.display = "block"; 
 
	setTimeout(function(){ document.getElementById("znikajacyobrazek").style.display = "none"; document.getElementById("page").style.textAlign = "center"; },5000);
 }

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

	document.getElementById('txt2').innerHTML = today;
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

 function onImage(){
	pieceWidth = Math.floor(img.width / puzzle_level);
    pieceHeight = Math.floor(img.height / puzzle_level);
    
	puzzleWidth = pieceWidth * puzzle_level;
    puzzleHeight = pieceHeight * puzzle_level;
    startTime();
	
	setCanvas();
    initPuzzle();
}

function setCanvas(){
    canvas.width = puzzleWidth;
    canvas.height = puzzleHeight+38;
    canvas.style.border = "1px solid black";		
}

function initPuzzle(){
	currentPiece = null;
    currentDropPiece = null
	ctx.drawImage(img, 0, 0, puzzleWidth, puzzleHeight, 0, 0, puzzleWidth, puzzleHeight);

	ctx.drawImage(img2, 200, 510);
	
	if (Modernizr.touch) {
        touchSupported = true;
    }
	buildPieces();
}
	
function buildPieces(){
	pieces=[];
	var piece;
	var wx=0;
	var wy=0;
	
	for(var i=0; i<puzzle_level*puzzle_level;i++){
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
	document.onmousedown=shufflePuzzle;
}

function shufflePuzzle(e){
    var piece;
    var wx = 0;
    var wy = 0;
	var bRect = canvas.getBoundingClientRect();
	mouseX = (e.clientX - bRect.left);
	mouseY = (e.clientY - bRect.top);
	
	if(mouseX>201 && mouseX<299 && mouseY>510 && mouseY<546)
	{
		timer();
		canvas.height=puzzleHeight;
		pieces = shuffleArray(pieces);

		for(var i = 0;i < pieces.length;i++){
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
		
		if(!touchSupported){
		 document.onmousedown = mouseDown;
		}
		else{
		document.ontouchstart = mouseDown;
		}
	}  
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
		{}
		else{
			return piece;
		}		
	}
	return null
}

function mouseDown(e){
	var bRect = canvas.getBoundingClientRect();
	if(!Modernizr.touch){
		mouseX = (e.clientX - bRect.left);
		mouseY = (e.clientY - bRect.top);
	}
	else{	
		mouseX = (e.touches[0].clientX - bRect.left);
		mouseY = (e.touches[0].clientY - bRect.top);
	}
	
	currentPiece=inPiece();
	
	if(currentPiece!=null){
		ctx.clearRect(currentPiece.xx,currentPiece.yy,pieceWidth,pieceHeight);
        ctx.save();
        ctx.globalAlpha = .9;
        ctx.drawImage(img, currentPiece.x, currentPiece.y, pieceWidth, pieceHeight, mouseX - (pieceWidth / 2), mouseY - (pieceHeight / 2), pieceWidth, pieceHeight);
        ctx.strokeRect(currentPiece.x, currentPiece.y, pieceWidth,pieceHeight);
		ctx.restore();
        if(!touchSupported){	
			document.onmousemove = mouseMove;
			document.onmouseup = mouseUp;
		}
		else{			
			canvas.addEventListener('touchmove', mouseMove, {passive: false});
			e.stopPropagation();
			document.ontouchend = mouseUp;
		}
	}	
}

function mouseMove(e){
	currentDropPiece = null;
	
	e.preventDefault();
	e.stopPropagation();

	var bRect = canvas.getBoundingClientRect();
	
	if(!Modernizr.touch){
		mouseX = (e.clientX - bRect.left);
		mouseY = (e.clientY - bRect.top);
	}
	else{	
		mouseX = (e.touches[0].clientX - bRect.left);
		mouseY = (e.touches[0].clientY - bRect.top);
	}
	
	ctx.clearRect(0,0,puzzleWidth,puzzleHeight);
	
	var piece;
	for(var i=0; i<pieces.length;i++){	
		piece=pieces[i];
		if(piece==currentPiece){
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
    ctx.strokeRect(currentPiece.x, currentPiece.y, pieceWidth,pieceHeight);
	ctx.restore();
    ctx.strokeRect( mouseX - (pieceWidth / 2), mouseY - (pieceHeight / 2), pieceWidth,pieceHeight);	
}

function mouseUp(){
	if(!touchSupported){			
		document.onmousemove = null;
		document.onmouseup = null;
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
	
	if(gameWin){
		setTimeout(gameOver,500);
	}  
}

function myStopFunction() {
    clearInterval(t);
}
 
function gameOver(){
	var psr = 'U2FsdGVkX1/e8CPkErFttVwJMNigXXJODwvlgStALvleDwJLBzo6j5beNAK7Db1L';
    var plain = CryptoJS.AES.decrypt(psr, 'CryptoJS.pad.Pkcs7', "{ mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }");
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

	canvas.id = "graph2";
	document.getElementById("footer").id = "footer1"
   document.getElementById("pokaz").style.display = "none"
document.getElementById("endGame").id = "endGame1"

   setTimeout(function(){document.getElementById("endGame1").style.display = "block";},2610)

setTimeout(function(){canvas.id = "graph10";document.getElementById("footer1").id = "footer"},2609)

//setTimeout(function(){document.getElementById("endGame").style.display = "block",canvas.id = "graph10";document.getElementById("footer1").id = "footer"},5100)



document.getElementById('endGame1').innerHTML = "Gratulacje!"+"<br>"+" Gra zakończona sukcesem."+"<br>"+ plain.toString(CryptoJS.enc.Utf8);
//plain.toString(CryptoJS.enc.Utf8)

//document.getElementById('pass_p').innerHTML = "Gratulacje!"+"<br>"+" Gra zakończona sukcesem."+"<br>"+"Twoje hasło: " + plain.toString(CryptoJS.enc.Utf8);
	myStopFunction();


}
