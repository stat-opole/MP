 const puzzle_level = 4;
 var canvas = document.getElementById("myCanvas"), ctx = canvas.getContext("2d");
 
 var ctx, startX, startY;
 var img;
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
 
 var mx, my;
 
 function init()
 {
	 
	 mouse = {x:0,y:0};
	 img = new Image();
	 img.addEventListener('load',onImage,false);
	 img.src = "images/zwierzaki.jpg";

 }

 function onImage()
 {
	pieceWidth = Math.floor(img.width / puzzle_level);
    pieceHeight = Math.floor(img.height / puzzle_level);
    
	puzzleWidth = pieceWidth * puzzle_level;
    puzzleHeight = pieceHeight * puzzle_level;
    
	setCanvas();
    initPuzzle();
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
    document.onmousedown = mouseDown;
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
	mouseX = (e.clientX - bRect.left);
	mouseY = (e.clientY - bRect.top);
	
	
	currentPiece=inPiece();
	
	if(currentPiece!=null)
	{
		ctx.clearRect(currentPiece.xx,currentPiece.yy,pieceWidth,pieceHeight);
        ctx.save();
        ctx.globalAlpha = .9;
        ctx.drawImage(img, currentPiece.xx, currentPiece.yy, pieceWidth, pieceHeight, mouseX - (pieceWidth / 2), mouseY - (pieceHeight / 2), pieceWidth, pieceHeight);
        ctx.restore();
        document.onmousemove = mouseMove;
        document.onmouseup = mouseUp;
	}
	
}




function mouseMove(e)
{
	currentDropPiece = null;

	var bRect = canvas.getBoundingClientRect();
	mouseX = (e.clientX - bRect.left);
	mouseY = (e.clientY - bRect.top);
	
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
		ctx.strokeRect(piece.x, piece.y, pieceWidth,pieceHeight);
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



function mouseUp()
{
	document.onmousemove = null;
    document.onmouseup = null;
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
       
    }
    
}
 
