$( document ).ready(function() {

    console.log( "ready!" );
    var radius=100;
    var twopi=Math.PI*2;
    var divisions=12;
    var circleSize=10;


    for (var i=0;i<10;i++) {
    	makeClock(radius + i*i*3, twopi, divisions+i, circleSize + i*3);	
    }
    



});


function makeClock(radius, twopi, divisions, circleSize) {
    for (var i=0;i<=twopi;i+=twopi / divisions) {
        var x=Math.cos(i)*radius;
        var y=Math.sin(i)*radius;

        circle(x,y,circleSize);
    }

}