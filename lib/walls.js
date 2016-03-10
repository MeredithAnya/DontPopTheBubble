(function () {
  if (typeof Bubbles === "undefined") {
    window.Bubbles = {};
  }


	var Wall = Bubbles.Wall = function(options){
	   this.pos = options.pos;
	   this.width = options.width;
	   this.height = options.height;
	   this.color = "#d3d3d3";
	   this.game = options.game;

	};

	Wall.prototype.draw = function(ctx) {
		
       ctx.fillStyle = this.color;
       ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);
    
	};
    
    var NORMAL_FRAME_TIME_DELTA = 1000/60;

	Wall.prototype.move = function() {
	 //
       
	};

	
})();	