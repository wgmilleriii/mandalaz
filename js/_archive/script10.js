

$( document ).ready(function() {
    console.log( "ready!" );
    var ampl=50;
    var freq=30;


    for (y1=-30;y1<10;y1+=.2) {

	    for (i=0;i<=Math.PI*20;i+=Math.PI*2 / Math.abs(y1*3.2)) {
	        var x=-500+i*freq;
	        var y=Math.sin(i)*ampl;

	        circle(x+20,y + y1 * ( i),1);
	    }

    }



});


