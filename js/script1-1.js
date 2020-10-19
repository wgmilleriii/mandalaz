$( document ).ready(function() {
    console.log( "ready!" );
    
    width=300;
    height=200;
    spacing=20;
    radius=5;

    for (x=-width ; x<=width ; x=x+spacing) {
    	for (y=-height ; y<=height ; y=y+spacing) {

    		circle (x , y, radius);

    	}
    } 

    makeStar();

});


function makeStar() {

 	for (i=0 ; i<=10 ; i=i+1) {


		x1=i*10;
		y1=0;
		x2=0;
		y2=100-(i*10);

		// step 1: Q1
		line ( x1 , y1, x2, y2 );  

		// step 2: q4 
		line ( x1 , y1, x2, y2*-1 );  

		// step 3: q2
		line ( x1 * -1 , y1, x2 * -1, y2 );

		// step 4: q3
		line ( x1*-1 , y1*-1, x2*-1, y2 *-1 );  		
      
    }

}