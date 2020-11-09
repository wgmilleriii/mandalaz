

$( document ).ready(function() {
    console.log( "ready!" );
    
	makePattern(200, 20);	    
});


function makePattern(radius,density) {

    for (var i=0;i<=Math.PI*2;i+=Math.PI*2 / density) {
        var x1=Math.cos(i)*radius;
        var y1=Math.sin(i)*radius;


	    for (var j=0;j<=Math.PI*2;j+=Math.PI*2 / density) {
	        var x2=Math.cos(j)*radius;
	        var y2=Math.sin(j)*radius;

	        var ll=getLineLength(x1,y1,x2,y2);
	        console.log(x1,y1,x2,y2,ll);
	        line(x1,y1,x2,y2, "thin_blue",(radius*2-ll)/radius*2 /5);
	    }


    }

}

// https://www.mathsisfun.com/algebra/distance-2-points.html

function getLineLength(x1,y1,x2,y2) {
	return Math.sqrt( Math.pow(x1-x2,2) + Math.pow(y1-y2,2)  );
}