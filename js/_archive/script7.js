

$( document ).ready(function() {
    console.log( "ready!" );
    
	makePattern(200, 20);	    
});


function makePattern(radius,density) {

    for (var i=0;i<=Math.PI*2;i+=Math.PI*2 / density) {
        var x1=Math.cos(i)*radius;
        var y1=Math.sin(i)*radius;
       // circle(x1,y1,20);

	    for (var j=0;j<=Math.PI*2;j+=Math.PI*2 / density) {
	        var x2=Math.cos(j)*radius;
	        var y2=Math.sin(j)*radius;

	        var d=distancebetween(x1,y1,x2,y2);
	        var color="c0";

	        switch (true) {
	        	case (d<130) :
	        		color="c1";
					break;
	        	case (d<240) :
	        		color="c2";
	        		break;
	        	case (d<325) :
	        		color="c3";
	        		break;
	        	case (d<390) :
	        		color="c4";
	        		break;
	        	case (d<410) :
	        		color="c5";
	        		break;
	        }

	        console.log(color);
	        console.log(x1,y1,x2,y2,":",d);
	        line(x1,y1,x2,y2,color);
	    }


    }

}

function distancebetween(x1, y1, x2, y2) {

	var a = x1 - x2;
	var b = y1 - y2;

	var c = Math.sqrt( a*a + b*b );

	// c is the distance
	return c;

}

/*

https://www.colourlovers.com/palette/373610/Melon_Ball_Surprise

#D1F2A5
#EFFAB4
#FFC48C
#FF9F80
#F56991

*/


