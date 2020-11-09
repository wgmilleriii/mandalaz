$( document ).ready(function() {
    console.log( "ready!" );
    
    var css="weaver";

    var loom_width=300;
    var loom_height=200;

    var num_wafts=4;
    var pattern_count=2;
    
    var pattern_height=loom_height/pattern_count;
    var thread_height=pattern_height/num_wafts;

    var num_weaves=num_wafts*num_wafts;
    
    var thread_spacing=loom_width/num_weaves;
    var thread_width=thread_spacing ;
    // var thread_width=width/weave/4;
    // var x_spacing=width/weave;
    // var css1,css2;
    

    // var spacing=loom_height/pattern_count;

    // var ar=[0,0,10,10,40,-40];
    // path(ar);

    // rect(-100,-100,100,200);

    


    // number of x gradients to create is number of wafts (hor) 
    for (var i=0;i<num_wafts;i++) {


        var id="ReflectGradientX" + i;
        var color1="#ffa472";
        var color2="#301f15";
        var x1=0;
        var x2=1/num_wafts;
        var y1=0;
        var y2=0;
        var tr_x=i/(num_wafts*num_wafts);
        var tr_y=0;
        makeGradient(id, color1, color2, x1, x2, y1, y2, tr_x, tr_y) ;

    }



    // for (var y=0;y<=num_wafts*2;y++) {
    //     rect(y/2*thread_width-thread_width/4,-80,thread_width/2,loom_height,"weaver w",1);
    // }
        var i=0;
        var id="ReflectGradientYY" + i;
        var color1="#ebd5b3";
        var color2="#333";
        var x1=0;
        var x2=0;
        var y1=0;
        var y2=1/3;
        var tr_x=0;
        var tr_y=1/6/2;
        makeGradient(id, color1, color2, x1, x2, y1, y2, tr_x, tr_y) ;        
        // var r=rect(-10,0,10,loom_height,css);
        // r.setAttribute("fill","url(#" + id + ")");



    


        for (var i=0;i<pattern_count;i++) {
            

            for (var y=0;y<num_wafts;y++) {
                var id="ReflectGradientX" + y;
        
                var sy=i*pattern_height+y*thread_height;
                var r= rect(0,sy,loom_width,thread_height, css);    
                var r2= rect(0,sy,loom_width,thread_height, css); 
                var r3= rect(0,sy,loom_width,thread_height, css);    
                var r4= rect(0,sy,loom_width,thread_height, css);    

                r.setAttribute("fill","url(#" + id + ")");
                r2.setAttribute("fill","url(#" + id + ")");
                r3.setAttribute("fill","url(#" + id + ")");
                r4.setAttribute("fill","url(#" + id + ")");

                r2.setAttribute("transform","scale(-1,1)");
                r3.setAttribute("transform","scale(-1,-1)");
                r4.setAttribute("transform","scale(1,-1)");

                // text(-20,sy,sy);

            }
            var finish_y=num_wafts*(i+1)*thread_height;
            // line(-10, )

            
        }

        for (var i=0;i<num_weaves;i++) {
                
            var id="ReflectGradientY" + i;
            var color1="#ebd5b3";
            var color2="#333";
            var x1=0;
            var x2=0;
            var y1=0;
            var y2=1/2;
            var tr_x=0;
            var tr_y=(i+3)/8;
            makeGradient(id, color1, color2, x1, x2, y1, y2, tr_x, tr_y) ;    
            

            var r=rect(i*thread_width,0,thread_width,loom_height,css);
            // var r2=rect(-i*thread_width-thread_width,0*-loom_height,thread_width,loom_height,css);            
            var r2=rect(i*thread_width,0,thread_width,loom_height,css);
            var r3=rect(i*thread_width,0,thread_width,loom_height,css);
            var r4=rect(i*thread_width,0,thread_width,loom_height,css);
            r.setAttribute("fill","url(#" + id + ")");
            r2.setAttribute("fill","url(#" + id + ")");
            r3.setAttribute("fill","url(#" + id + ")");
            r4.setAttribute("fill","url(#" + id + ")");


            r2.setAttribute("transform","scale(-1,1)");
            r3.setAttribute("transform","scale(-1,-1)");
            r4.setAttribute("transform","scale(1,-1)");
        }


    


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