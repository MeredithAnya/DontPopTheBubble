(function () {
  if (typeof Bubbles === "undefined") {
    window.Bubbles = {};
  }

  var Spike = Bubbles.Spike = function(options){
	   this.dimensions = options.dimensions;
	   this.context = options.ctx;
	   this.game = options.game;

	};

  Spike.prototype.draw = function() {
   
  	var ctx = this.context;

		ctx.fillStyle = "#11d1f1";
	    ctx.beginPath();
	    ctx.moveTo(this.dimensions[0],this.dimensions[3]);
	    ctx.lineTo(this.dimensions[1],this.dimensions[4]);
	    ctx.lineTo(this.dimensions[2],this.dimensions[5]);
	    ctx.fill();
	
  };

  Spike.prototype.isCollidedWithBubble = function(bubble) {
  	var bubblePosition = bubble.pos;

  	var spikeTip = [this.dimensions[2],this.dimensions[5]];
  	if (Bubbles.Util.dist(bubblePosition, spikeTip) < 20){
  		console.log(bubblePosition);
  		console.log(spikeTip);
  		console.log(bubble.radius);
  		return true;
  	}
  };




})();