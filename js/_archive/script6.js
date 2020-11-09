

$( document ).ready(function() {
    console.log( "ready!" );
    
	
    for (var i=50;i<200;i+=10) {
    	makePattern(i,i/2.5*2);	    	
    }
});


function makePattern(radius,density) {
    for (var i=0;i<Math.PI*1.999 ;i+=Math.PI*2 / density) {
        var x=Math.cos(i)*radius;
        var y=Math.sin(i)*radius;

        circle(x+20,y,4);
    }

}