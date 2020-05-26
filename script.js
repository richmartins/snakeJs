window.onresize=function(){
        responsive();
    }

    window.onload=function(){
        responsive();

        pg = document.getElementById("playground");
        pg.height = pg.width

        ctx = pg.getContext('2d');
        document.addEventListener('touchmove', function (event) {
            event = event.originalEvent || event;
            if (event.scale > 1) {
                event.preventDefault();
            }
        }, false);
        document.addEventListener("keydown", keyPush);
        document.getElementById('up').addEventListener("touchend", mobileControls);
        document.getElementById('down').addEventListener("touchend", mobileControls);
        document.getElementById('left').addEventListener("touchend", mobileControls);
        document.getElementById('right').addEventListener("touchend", mobileControls);
        scoreCont = document.getElementById("score");

        // setting the frame rate of the game
        // because snake like game goes on low frame rate. We call the game function 15 times a second
        setInterval(game, 1000/speed);
    }
    score = 1;
    speed = 15;
    unit=gs=20;
	tc=document.getElementById('playground').width / unit;
	
    // init the snake's tail that increase each time we step in an apple
    trail=[];
    tail=5;
    
    px=py=Math.floor(tc / 2);

    //init apple position
    ax=ay=Math.floor(Math.random() * tc)

    // init x's axe volecity and the y's velocity
    xv=yv=0;

    function mobileControls(event){
        var keyCode;
        switch(event.srcElement.id){
            case 'left':
                keyCode = 37;
                break;
            case 'up':
                keyCode = 38;
                break;
            case 'right':
                keyCode = 39;
                break;
            case 'down':
                keyCode = 40;
                break;
        }
        var evt = new KeyboardEvent('keydown', { 'keyCode': keyCode, 'which': keyCode });
        document.dispatchEvent(evt);
    }

    function keyPush(){
        // handling key controls in this case the arrows
        switch(event.keyCode){
            case 37:			// 37 and the others cases is the keycode when we press it
                if (xv != 1) {
					xv=-1;yv=0;
				}
				 // changing the direction of the velocity will obviously change the direction where the snake goes
                break;
             case 38:
				if (yv != 1) {
					xv=0;yv=-1;
				}
                break;
            case 39:
				if (xv != -1) {
					xv=1;yv=0;
				}
                break;
            case 40:
				if (yv != -1) {
					xv=0;yv=1;
				}
                break;
        }
    }

    function game(event){
        // player x and player y position depends on the x's and y's velocity
        px+=xv;
        py+=yv;
        // if the player's position is less than 0 it means that the player is out of the canvas
        // so we set the player's position at this and of the canvas so the he appears on the other side
        if (px<0){
            px=tc-1;
        }
        if(px>tc-1){
            px=0;
        }
        if(py<0){
            py=tc-1;
        }
        if(py>tc-1){
            py=0;
        }

        // draw the grid
        for(var i = 0; i<pg.width;i+=unit){
            for(var j=0;j<pg.height;j+=unit){
                ctx.fillStyle="black"
                ctx.fillRect(i,j,unit-2,unit-2);
            }
        }

        ctx.fillStyle="lime";
        for(var i=0; i<trail.length; i++){
            ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);
            
            // it's game over when the snake touches a part of him self
            //  so if there's a trail's value that is the same as the player position it means game over
            if(trail[i].x==px && trail[i].y==py){
                score=0;
                scoreCont.innerHTML = "Score: " + score
                tail=5;
            }
        }

        // push an js object into trail and then idk what the while does
        trail.push({x:px, y:py});
        while(trail.length>tail){
            trail.shift();
        }

        // when the player steps into an apple we increase the snake tail
        // and make a new apple in a random position
        if(ax==px && ay==py){
            setInterval(game, 1000/(speed += 1))
            tail++;
            score++;
            scoreCont.innerHTML="Score: " + score;
            ax=Math.floor(Math.random()*tc);
            ay=Math.floor(Math.random()*tc);
        }
        
        
        ctx.fillStyle="red";
        ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2);
    }

    function responsive(){
        keys = document.getElementsByClassName("keys");

        for (let index = 0; index < keys.length; index++) {
            if (window.innerWidth<800){
                keys[index].style.display = "block"
            } else {
                keys[index].style.display = "none"
            }
        }
    }