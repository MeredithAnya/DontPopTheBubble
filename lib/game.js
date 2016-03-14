(function () {
  if (typeof Bubbles === "undefined") {
    window.Bubbles = {};
  }

  var Game = Bubbles.Game = function (ctx) {
       
       this.context = ctx;
       this.bubble = new Bubbles.Bubble({
                         ctx: ctx,
                         pos: [300,300],
                         vel: [4.5,-5],
                         radius: 20,
                         game: this
       });
       this.jewel = this.addJewels();
       this.walls = this.addWalls();
       this.bottomSpikes = this.addBottomSpikes();
       this.topSpikes = this.addTopSpikes();
       this.leftSpikes = this.addLeftSpikes();
       this.rightSpikes = this.addRightSpikes();
       this.displayedLeftSpikes = this.randoLeftSpikes(1);
       this.displayedRightSpikes = this.randoRightSpikes(1);
       this.left = false;
       this.jewelLeft = true;
       this.over = false;
       this.level = 1;
       this.gemScore = 0;
       this.playerReady = false;
       
  };

   var animate = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(callback) { window.setTimeout(callback, 1000/60) };

  Game.prototype.bindKeyHandlers = function () {
    var bubble = this.bubble;
    var game = this;
   
    
    key("space", function () { bubble.up(); });
    key("enter", function() { game.reset(); });
  };

  Game.prototype.reset = function() {

      if (this.over){
        this.displayedLeftSpikes = this.randoLeftSpikes(1);
        this.displayedRightSpikes = this.randoRightSpikes(1);
        this.left = false;
        this.jewelLeft = true;
        this.over = false;
        this.level = 1;
        this.gemScore = 0;
        this.bubble.pos = [300,300];
        this.bubble.vel = [4.5, -5];
        this.spot = [[[0, 0], 0], [[0, 0], 0], [[0, 0], 0]];
        this.playerReady = true;
        window.cancelAnimationFrame(this.requestId);
        this.step();
      } else if (this.playerReady === false){
        this.playerReady = true;
        this.start();
      }
      
      
  };


   
  

  Game.prototype.addWalls = function() {
    var walls = [];

    var rightWall = new Bubbles.Wall({
      pos: [0,0],
      width: 20,
      height: 600,
      game: this
    });

    var leftWall = new Bubbles.Wall({
      pos: [580,0],
      width: 20,
      height: 600,
      game: this
    });
    
    var topWall = new Bubbles.Wall({
      pos: [0,0],
      width: 600,
      height: 20,
      game: this
    });

    var bottomWall = new Bubbles.Wall({
      pos: [0, 580],
      width: 600,
      height: 20,
      game: this
    });


    walls.push(rightWall);
    walls.push(leftWall);
    walls.push(topWall);
    walls.push(bottomWall);

    return walls;
  };

  Game.prototype.addJewels = function() {
    var y = this.randoYPosition();
    if (!this.jewelLeft){

       var jewel = new Bubbles.Jewel({
                         ctx: this.context,
                         origin: [70, y],
                         currentPos: [70, y],
                         vel: [0,0.5],
                         radius: 10,
                         game: this
       });
    } else {

       var jewel = new Bubbles.Jewel({
                         ctx: this.context,
                         origin: [530, y],
                         currentPos: [530, y],
                         vel: [0,0.5],
                         radius: 10,
                         game: this
       });
    }

    
    

    return jewel;
  };

  Game.BG_COLOR = "#000000";

  Game.prototype.addBottomSpikes = function() {
    var bottomSpikes = [];
    var dimensions = [40, 70, 55];
    for (var i = 0; i < 500; i+=35){
      
      var d1 = dimensions[0] + i,
          d2 = dimensions[1] + i,
          d3 = dimensions[2] + i;

      
      var spike = new Bubbles.Spike({
                             game: this,
                             ctx: this.context,
                             dimensions: [d1, d2, d3, 580, 580, 554]
                            });
      bottomSpikes.push(spike);
      
    }
    

    return bottomSpikes;
  };

  Game.prototype.addTopSpikes = function() {
    var topSpikes = [];
    var dimensions = [40, 70, 55];
    for (var i = 0; i < 500; i+=35){
      
      var d1 = dimensions[0] + i,
          d2 = dimensions[1] + i,
          d3 = dimensions[2] + i;

      
      var spike = new Bubbles.Spike({
                             game: this,
                             ctx: this.context,
                             dimensions: [d1, d2, d3, 20, 20, 46]

                            });
      topSpikes.push(spike);
      
    }
    

    return topSpikes;
  };

  Game.prototype.addLeftSpikes = function() {
    var leftSpikes = [];
    var dimensions = [40, 70, 50];
    for (var i = 0; i < 500; i+=35){
      
      var d1 = dimensions[0] + i,
          d2 = dimensions[1] + i,
          d3 = dimensions[2] + i;

      
      var spike = new Bubbles.Spike({
                             game: this,
                             ctx: this.context,
                             dimensions: [20, 20, 46, d1, d2, d3]

                            });
      leftSpikes.push(spike);
      
    }
    

    return leftSpikes;
  };

  Game.prototype.addRightSpikes = function() {
    var rightSpikes = [];
    var dimensions = [40, 70, 50];
    for (var i = 0; i < 500; i+=35){
      
      var d1 = dimensions[0] + i,
          d2 = dimensions[1] + i,
          d3 = dimensions[2] + i;

      
      var spike = new Bubbles.Spike({
                             game: this,
                             ctx: this.context,
                             dimensions: [580, 580, 554, d1, d2, d3]

                            });
      rightSpikes.push(spike);
      
    }
    

    return rightSpikes;
  };
 

  Game.prototype.draw = function () {
    var ctx = this.context;
  
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
    ctx.fillStyle = '#3f3f3f';

    ctx.beginPath();
    ctx.arc(
      300, 300, 100, 0, 2 * Math.PI, true
    );

    ctx.fill();

    ctx.fillStyle = '#6f6f6f';
    ctx.textAlign = 'center';
    ctx.font = "100px Sans Serif";
    ctx.fillText(this.level, 300, 335);
    
    
    
    this.bubble.draw();
    this.walls.forEach(function(wall){
      wall.draw(ctx);
    });

    this.jewel.draw();

    this.bottomSpikes.forEach(function(spike){
      spike.draw();
    });
    this.topSpikes.forEach(function(spike){
      spike.draw();
    });
    

    if (this.left){
      
      this.displayedLeftSpikes.forEach(function(spike){
        spike.draw();
      });
    } else {

      this.displayedRightSpikes.forEach(function(spike){
        spike.draw();
      });
    }
   
    
  };


  Game.prototype.randoLeftSpikes = function(level) {
    
    var spikeNum = Bubbles.Util.spikeNum(level);
    var shuffled = this.leftSpikes.slice(0), i = this.leftSpikes.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, spikeNum);
  };

  Game.prototype.randoRightSpikes = function(level) {
    
    var spikeNum = Bubbles.Util.spikeNum(level);
    var shuffled = this.rightSpikes.slice(0), i = this.rightSpikes.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, spikeNum);
  };

  Game.prototype.randoYPosition = function(first_argument) {
    return (Math.random() * 460) + 70;

  };

  Game.prototype.update = function() {
    
    this.bubble.move();
    this.jewel.move();
  };

  Game.prototype.step = function () {
    
    this.update();
    this.draw();
    if (this.over){
      var total = (3*this.gemScore) + this.level;
      this.draw();
      this.context.font = '50px San Serif';
      this.context.fillStyle = 'white';
      this.context.fillText("You popped the bubble", 300, 100);
      this.context.font = '30px San Serif';
      this.context.fillText("Level: " + this.level, 300, 170);
      this.context.fillText("Gems: " + this.gemScore, 300, 200);
      this.context.fillText("Score: " + total, 300, 250);

      this.context.font = '30px San Serif';
      this.context.fillText("Hit ENTER to play again!",300, 450);

    } else {
      animate(this.step.bind(this));
    }


    
    
  };

  Game.prototype.drawEntry = function() {
    var ctx = this.context;
  
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  

    var image = new Image();
    image.src = './assets/blue-bubble.png';
    image.onload = function(){
      ctx.drawImage(image, 280, 280, 40, 40);
    }

    
    this.walls.forEach(function(wall){
      wall.draw(ctx);
    });


    this.bottomSpikes.forEach(function(spike){
      spike.draw();
    });
    this.topSpikes.forEach(function(spike){
      spike.draw();
    });
    this.context.font = '30px San Serif';
    this.context.fillStyle = 'white';
    this.context.fillText("THIS IS YOUR BUBBLE", 150, 250);
    this.context.fillText("Use the space bar to keep it alive!", 100, 400);
    this.context.font = '30px San Serif';
    this.context.fillText("Hit ENTER to play!",200, 450);
    

    this.bindKeyHandlers();

  };

  Game.prototype.start = function() {
      this.requestId = animate(this.step.bind(this));
  };


  Game.prototype.renderStart = function() { 
    var that = this;
    this.drawEntry()
    
  };


 

 

  
})();