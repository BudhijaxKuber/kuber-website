document.querySelector('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.elements.name.value = '';
    e.target.elements.email.value = '';
    e.target.elements.message.value = '';
  });




if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
}

var span = document.querySelector(".typewriter span");
var textArr = span.getAttribute("data-text").split(", "); 
var maxTextIndex = textArr.length; 

var sPerChar = 0.09; 
var sBetweenWord = 0.5;
var textIndex = 0; 

typing(textIndex, textArr[textIndex]); 

function typing(textIndex, text) {
    var charIndex = 0; 
    var maxCharIndex = text.length - 1; 
    
    var typeInterval = setInterval(function () {
        span.innerHTML += text[charIndex]; 
        if (charIndex == maxCharIndex) {
            clearInterval(typeInterval);
            setTimeout(function() { deleting(textIndex, text) }, sBetweenWord * 1000); 
            
        } else {
            charIndex += 1; 
        }
    }, sPerChar * 1000); 
}

function deleting(textIndex, text) {
    var minCharIndex = 0; 
    var charIndex = text.length - 1; 

    var typeInterval = setInterval(function () {
        span.innerHTML = text.substr(0, charIndex); 
        if (charIndex == minCharIndex) {
            clearInterval(typeInterval);
            textIndex + 1 == maxTextIndex ? textIndex = 0 : textIndex += 1; 
            setTimeout(function() { typing(textIndex, textArr[textIndex]) }, sBetweenWord * 1000); 
        } else {
            charIndex -= 1; 
        }
    }, sPerChar * 1000); 
}

var canvasShape = function(block_id, params) {
    if (typeof params === "object") {
        if (typeof params.size === "number") {
            var radius_ball = params.size;
        } else {
            var radius_ball = '10';
        }
    if (typeof params.image === "string") {
            var image = params.image;
        } else {
            var image = 'http://kidschemistry.ru/wp-content/themes/fary-chemical/images/smile/icon_cool.png';
        }
        if (typeof params.speed === "number") {
            var speed_ball = params.speed;
        } else {
            var speed_ball = '10';
        }
        if (typeof params.number_of_item === "number") {
            if (params.number_of_item > 250) {
            var total_ball = 250; 
            } else {
                var total_ball = params.number_of_item;
            }
        } else {
            var total_ball = '150';
        }
        if (typeof params.shape === "string") {
            var ballShape = params.shape;
        } else {
            var ballShape = 'circle';
        }
    // Defaule 
    } else {
        var radius_ball = '10';
        var speed_ball = '10';
        var total_ball = '150';
        var ballShape = 'square';
    }

    var canvas_el = document.createElement('canvas');
    var canvas = document.getElementById(block_id).appendChild(canvas_el);
    var ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var particles = [];
    var color1 = params.color;
    document.getElementById(block_id).setAttribute("style", "position: absolute; left: 0; right: 0;");

    //Helper function to get a random color - but not too dark

    function GetRandomColor() {
        if (typeof params.color === "string") {
            var r = color1;
            return r;
        } else {
            var r = 0,
                g = 0,
                b = 0;
            while (r < 100 && g < 100 && b < 100) {
                r = Math.floor(Math.random() * 256);
                g = Math.floor(Math.random() * 256);
                b = Math.floor(Math.random() * 256);
            }
            return "rgb(" + r + "," + g + "," + b + ")";
        }
    }
    //Particle object with random starting position, velocity and color
    var Particle = function(x, y) {
        if (!x) {
            this.x = canvas.width * Math.random();
        } else {
            this.x = x;
        }
        if (!x) {
            this.y = canvas.height * Math.random();
        } else {
            this.y = y;
        }

        this.vx = speed_ball * Math.random() - 2;
        this.vy = speed_ball * Math.random() - 2;
        this.Color = GetRandomColor();

    }
    //Ading two methods
    Particle.prototype.Draw = function(ctx) {
        ctx.fillStyle = this.Color;
        if (ballShape == 'circle') {
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius_ball, 0, 2 * Math.PI, false);
            ctx.fill();
        } else if (ballShape == 'square') {
            ctx.fillRect(this.x, this.y, radius_ball, radius_ball);
        } else if (ballShape == "triangle") {
            var tri = [ctx.beginPath(), ctx.moveTo(this.x, this.y), ctx.lineTo(this.x + radius_ball, this.y + radius_ball), ctx.lineTo(this.x + radius_ball, this.y - radius_ball), ctx.closePath(), ctx.fill()]
        }else if (ballShape == "hexa"){
            var side = 0;
            var size = radius_ball;
            var x = this.x;
            var y = this.y;
            ctx.beginPath();
            ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));
            for (side; side < 7; side++) {
                ctx.lineTo(x + size * Math.cos(side * 2 * Math.PI / 6), y + size * Math.sin(side * 2 * Math.PI / 6));
            }
            ctx.fill();
        } else if(ballShape == "img"){
            var img = new Image();
            img.src = image;
            ctx.drawImage(img, this.x, this.y);
        }
    }
    Particle.prototype.Update = function() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width)
            this.vx = -this.vx;

        if (this.y < 0 || this.y > canvas.height)
            this.vy = -this.vy;
    }

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var my_gradient=ctx.createLinearGradient(0,0,0,0);
        my_gradient.addColorStop(0,"#0f0c29");
        my_gradient.addColorStop(0.5,"#302b63");
        my_gradient.addColorStop(1,"#24243e");
        ctx.fillStyle=my_gradient;
        ctx.fillRect(0,0,canvas.width,canvas.height);

        for (var i = 0; i < particles.length; i++) {
            particles[i].Update();
            particles[i].Draw(ctx);
        }
        requestAnimationFrame(loop);
    }
    //Create particles
    for (var i = 0; i < total_ball; i++)
        particles.push(new Particle());

    function drawCircle(event) {
        for (var i = 0; i < 2; i++) {
            cursorX = event.pageX;
            cursorY = event.pageY;
            particles.unshift(new Particle(cursorX, cursorY));
            if(particles.length > 500){
            particles.pop();
            }
        }
    }
    document.getElementById(block_id).style.overflow = 'hidden';
    document.getElementById(block_id).addEventListener('click', drawCircle);
    document.getElementById(block_id).addEventListener('mousemove', drawCircle);
    loop();
    window.onresize = function() {  
    canvas_Wth = window.innerWidth;
    canvas_hgt = window.innerHeight;
    canvas.width = canvas_Wth;
    canvas.height = canvas_hgt; 
    }

} 

// // Customization
canvasShape('canvas-shapes', {
size: 1.5,  
speed: 2.9, 
number_of_item:150, 
shape: "hexa", 

});