
$( document ).ready(function() {

    var width=200;
	var spacing=30;
	var height=20;
	var direction=1;
	var ar2=[];
	var ar=[];
	var oldColor;
	var c;
	for (y=0;y<80;y++) {
		var yoffset=svgHeight/2 - y*height +100;
		ar2=Array.from(ar);
		oldColor=c;
		ar=[-svgWidth/2, -svgHeight/2 ];

		var p=path(ar2,"none");
		p.setAttribute("style",oldColor);  
		p.setAttribute("fill-opacity","1");
		p.setAttribute("transform","translate(30,-25)");

		// for (var x=-svgWidth;x<=svgWidth;x+=random_between(15,76)) {
		for (var x=-svgWidth;x<=svgWidth;x+=spacing) {

			
			var x0=x + y*4;
			ar.push(x0);
			// ar.push(x+Math.random()*10);
			//ar.push(height*direction+yoffset + Math.random()*70 );
			var y0=height*direction+yoffset ;
			ar.push(y0 );



			direction*=-1;

			// yoffset+=15;
		}
		ar.push(svgWidth/2);
		ar.push(-svgHeight/2);

		c=randColor();

		var p=path(ar);
		p.setAttribute("style",c);  
		p.setAttribute("fill-opacity","1");

		if (y>0) {
			// for (var )
			
			for (var i=2;i<ar.length;i+=4) {
				// line(ar[i],ar[i+1],ar2[i],ar2[i+1]);
			var ar3=[];
				ar3.push(ar[i],ar[i+1],ar2[i],ar2[i+1]);
				ar3.push(ar2[i+2],ar2[i+3],ar[i+2],ar[i+3]);
				
			 path(ar3,"shadow");	
			}
		}
	}
 });


function randColor() {
 
    var r=random_between(80,200);
    var g=random_between(140,185);
    var b=random_between(220,255);

    var s="fill:rgb(" + r + "," + g + "," + b + ")";
    return s;  
}

function random_between(min, max) {
    return Math.floor(Math.random()*(max-min))+min;
}
