	var canvas = document.getElementById("gameContainer2");
var ctx = canvas.getContext("2d");
canvas.width=512;
canvas.height=480;

document.body.appendChild(canvas);


var bgReady = false;

var bgImage = new Image();
bgImage.onload = function(){
    bgReady=true;
};
bgImage.src = "html5-game-resize-example-bg.jpg";
	
	var render = function() {
		if(bgReady)
		{
			ctx.drawImage(bgImage,0,0);
		}
	};
	
	

	// var resizeGame = function () {
	
		 // var gameArea = document.getElementById('gameContainer');
    // var widthToHeight = 4 / 3;
    // var newWidth = window.innerWidth;
    // var newHeight = window.innerHeight;
    // var newWidthToHeight = newWidth / newHeight;
    
    // if (newWidthToHeight > widthToHeight) {
        // newWidth = newHeight * widthToHeight;
        // gameArea.style.height = newHeight + 'px';
        // gameArea.style.width = newWidth + 'px';
    // } else {
        // newHeight = newWidth / widthToHeight;
        // gameArea.style.width = newWidth + 'px';
        // gameArea.style.height = newHeight + 'px';
    // }
    
    // gameArea.style.marginTop = (-newHeight / 2) + 'px';
    // gameArea.style.marginLeft = (-newWidth / 2) + 'px';
	  
    
    // var gameCanvas = document.getElementById('gameContainer');
    // gameCanvas.width = newWidth;
    // gameCanvas.height = newHeight;
	
	// };





var main = function()
{
//window.addEventListener("resize", resizeGame);
//resizeGame();
render();
requestAnimationFrame(main);
}


main();