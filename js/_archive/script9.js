


function drawLeaf(width=10, height=20) {
		var ar=[];

    // first copy paste

    

    	var g=makeGroup();
    	var def="m 0 0 q -" + width + " " + width + " 0 " + height;

	    var p=path(ar, "hollow");

	    p.setAttribute("d",def);
	    g.append(p);
	    

	    // manual change
	    var p=path(ar,"hollow");
	    p.setAttribute("d",def);
	    p.setAttribute("transform","scale(-1,1)");
	    g.append(p);
	    
	    g.setAttribute("transform","translate(0,-10)");
	    return g;
}
$( document ).ready(function() {
    console.log( "ready!" );

    var ar=[
    0,0, 
    0,150, 
    50,150,
    50,100,
    100,100
    ];
    // path(ar);

    for (var i=0;i<10;i++) {
    	var l=drawLeaf(6,20);	
    	var d= (i/10) * 360;
    	l.setAttribute("transform","rotate(" + d + ")");
    }
    



    return;
    var ampl=50;
    var freq=30;
    for (i=0;i<=Math.PI*2;i+=Math.PI*2 / 12) {
        var x=i*freq;
        var y=Math.sin(i)*ampl;

        circle(x+20,y,10);
    }


});


