

$( document ).ready(function() {
    // console.log( "ready!" );

    drawb();

    drawa();
    draw0();
    draw1();
    draw11();
    draw2();
    draw21();
	draw25();    
    draw3();
    draw4();
    draw5();
    draw6();
});

function drawb() {
	s=document.getElementById("svgb");
	s.grid(100,20);

	sp=8;

	r1=240;
	r2=160;

	r3=220;
	r4=130;


	ap1=s.makeMandalaPoints(r1,sp);
	ap2=s.makeMandalaPoints(r2,sp,.5);
	
	s.mLineTo(ap1,ap2);
	s.mLineTo(ap2, ap1, 1);





}
function drawa() {
	s=document.getElementById("svga");
	s.grid(100,20);


	sp=10;
	r1=100;
	r2=80;
	r3=120;

	ap1=s.makeMandalaPoints(r1,sp);
	ap2=s.makeMandalaPoints(r2,sp,.4);
	ap3=s.makeMandalaPoints(r3,sp,1);


	// s.mCurveTo(ap1,ap2,ap3);
	s.mCurveTo(ap1,ap2,ap3,1,2);

}
function draw0() {


	s=document.getElementById("svg0");
	s.grid(100,20);
    
    sp=11;
	r1=100;
	r2=80;
	r3=120;
	r35=160;
	r4=180;
	r5=140;


    ap1=s.makeMandalaPoints(r1,sp);
	ap2=s.makeMandalaPoints(r2,sp,.4);
	ap3=s.makeMandalaPoints(r3,sp,1.75);
	ap35=s.makeMandalaPoints(r35,sp,.9);
	ap4=s.makeMandalaPoints(r4,sp,.4);
	ap5=s.makeMandalaPoints(r5,sp,-.2);

	var g=s.makeGroup();
	

	// ap6=findIntersection(ap4,ap5,ap3,ap35,-1,"red");
	// // console.log(ap6);
	// g.mLineTo(ap6,ap1);
	// ap7=findIntersection(ap6,ap1,ap2,ap3,-1,"blue");

	g.mLineTo(ap1,ap2);
	g.mLineTo(ap2,ap3);
	g.mLineTo(ap3,ap35);
	g.mLineTo(ap35,ap4);
	g.mLineTo(ap4,ap1);

	$(g).fill();

	// f=$(g).copy();
	// f.scale(.5,.5);
	// g.mLineTo(ap4,ap6);
	// g.mLineTo(ap6,ap3,-1);
	// g.mLineTo(ap3,ap7,1);
	//$(g).find("path").clip(1);
	$(g).find("path").mask(1);
	// $(f).find("path").mask(1);
	// g.mLineTo(ap1,ap7);

	return;
    g=s.makeGroup();
    g.circle(0,100,5,"thin_grey");
    g.circle(0,100,20,"thin_grey");
    p=g.path();
    p.setPath("M 0 100 Q 10 10 100 0");
    
    g.mandala(6);

    g=s.makeGroup();
    g.circle(0,150,5,"thin_grey");
    g.circle(0,150,20,"thin_grey");
    
    g.mandala(6,.3);

	

}
function draw6() {
	s=document.getElementById("svg6");
	s.grid(100,20,"black");
	sp=10;
	r1=100;
	r2=80;
	r3=120;
	r35=160;
	r4=180;
	r5=140;

	ap1=s.makeMandalaPoints(r1,sp);
	ap2=s.makeMandalaPoints(r2,sp,.4);
	ap3=s.makeMandalaPoints(r3,sp,1);
	ap35=s.makeMandalaPoints(r35,sp,.9);
	ap4=s.makeMandalaPoints(r4,sp,.4);
	ap5=s.makeMandalaPoints(r5,sp,-.2);

	var g=s.makeGroup();
	
	// console.log(ap1);
	// console.log(ap2);
	// console.log("3:");
	// console.log(ap3);
	// console.log(ap35);
	
	// console.log("4");
	// console.log(ap4);
	// console.log(ap5);

	ap6=findIntersection(ap4,ap5,ap3,ap35,-1,"red");
	// console.log(ap6);
	// g.mLineTo(ap6,ap1);
	ap7=findIntersection(ap6,ap1,ap2,ap3,-1,"blue");

	g.mLineTo(ap1,ap2);
	g.mLineTo(ap2,ap3);
	g.mLineTo(ap3,ap35);
	g.mLineTo(ap35,ap4);
	g.mLineTo(ap4,ap6);
	// g.mLineTo(ap6,ap3,-1);
	// g.mLineTo(ap3,ap7,1);
	g.mLineTo(ap1,ap7);



	//$(".green").fill();

}
function findIntersection(ar1,ar2,ar3,ar4, offset,css="red") {
	// console.log(ar1);
	// console.log(ar2);
	var ar=[];
	var l=ar1.length;
	for (var i=0;i<l;i++) {
		var in2=i+offset;
        if (in2>=l) in2=0;
        if (in2<0) in2+=l;

		// line(ar1[i][0], ar1[i][1], ar2[i][0], ar2[i][1], css);
		// line(ar3[in2][0], ar3[in2][1], ar4[in2][0], ar4[in2][1], css);

		var a=line_intersect(ar1[i][0], ar1[i][1], ar2[i][0], ar2[i][1],
		 ar3[in2][0], ar3[in2][1], ar4[in2][0], ar4[in2][1]);	
		ar.push([a.x, a.y]);
		circle(a.x, a.y, 2, "yellow");
	}
	return ar;
}
function line_intersect(x1, y1, x2, y2, x3, y3, x4, y4)
{
	// // console.log("==");
	// // console.log(x1, y1, x2, y2, x3, y3, x4, y4);
    var ua, ub, denom = (y4 - y3)*(x2 - x1) - (x4 - x3)*(y2 - y1);
    if (denom == 0) {
        return null;
    }
    ua = ((x4 - x3)*(y1 - y3) - (y4 - y3)*(x1 - x3))/denom;
    ub = ((x2 - x1)*(y1 - y3) - (y2 - y1)*(x1 - x3))/denom;
    return {
        x: x1 + ua * (x2 - x1),
        y: y1 + ua * (y2 - y1),
        seg1: ua >= 0 && ua <= 1,
        seg2: ub >= 0 && ub <= 1
    };
}

function draw5() {
	
	var r1, r2, r3, r4, r5, r6, r7, r8, 
		ap1, ap2, ap3, ap4, ap5, ap6, ap7, ap8;
	var sp;
	sp=9;
	s=document.getElementById("svg5");
	s.grid(100,25);
	r1=100;
	r2=80;
	r3=50;
	r4=30;
	r5=70;
	r6=60;
	r7=40;
	r8=20;

	// ap1=s.makeMandalaPoints(r1,sp);
	// ap2=s.makeMandalaPoints(r2,sp);
	// ap3=s.makeMandalaPoints(r3,sp);
	// ap4=s.makeMandalaPoints(r4,sp);

	// ap5=s.makeMandalaPoints(r5,sp,.5);
	// ap6=s.makeMandalaPoints(r6,sp,.5);
	// ap7=s.makeMandalaPoints(r7,sp,.5);
	// ap8=s.makeMandalaPoints(r8,sp,.5);


	 apc=s.makeMandalaPoints(350,270/2.5,.5);
	apa=s.makeMandalaPoints(300,10);
	apb=s.makeMandalaPoints(300,540/2.5,.5);
	// s.mLineTo(apa,apb,7);
	// s.mLineTo(apb,apa,27);
	s.mLineTo(apb,apc,100/2.5);


	// s.mLineTo(apc,apa,39);

	// s.mLineTo(ap1,ap2);
	// s.mLineTo(ap1,ap2,1);
	// s.mLineTo(ap1,ap2,-1);
	// s.mLineTo(ap3,ap4);

	// s.mLineTo(ap1,ap3,1);
	// s.mLineTo(ap4,ap4,2);
	// s.mLineTo(ap1,ap1,-2);
	// s.mLineTo(ap5,ap1,-1);
	// s.mLineTo(ap2,ap3,1);
	// s.mLineTo(ap2,ap3,-1);

	// s.curveTo(ap1,ap5,ap1,1);
	// s.curveTo(ap2,ap6,ap2,1);
	// s.curveTo(ap3,ap7,ap3,1);
	// s.curveTo(ap4,ap8,ap4,1);
}

function draw4() {
	var r1, ap1, ap2;
	s=document.getElementById("svg4");
	s.grid(100,25);


	r1=100;
	r2=70;
	ap1=s.makeMandalaPoints(r1,12,1);
	ap2=s.makeMandalaPoints(r2,12,1.5);
	s.mLineTo(ap1,ap2);
	s.mLineTo(ap1,ap2,-1);
}

function draw3(){
    var s,p,d,g,p2;

	s=document.getElementById("svg3");
	s.grid(100,25);
    
    g=s.makeGroup();
	p=g.path();
	p.setPath("M -10 50 Q 0 30 10 50");
	p.move(0,20);
	g.mandala(24);
}

function draw2(){
    var s,p,d,g,p2;

	s=document.getElementById("svg2");
	s.grid(100,50);


	g=s.makeGroup();
	p=g.path();
	p.setPath("M -10 0 L -10 40 Q 0 50 10 40 L 10 0");
	p.move(0,30);
	p.scale(2);

	g.line(180,20,121,55,"thin_grey");
	g.line(180,-20,121,-55,"thin_grey");
	g.circle(0,180,20, "thin_grey");
	g.circle(0,180,10, "thin_grey");
	g.circle(0,130,10, "thin_grey");
	g.circle(0,130,5, "thin_grey");


	g=g.mandala(12);


	// console.log("MAN");
	// console.log(g);

	g.addAttr("mask","url(#mask1)");

	defs=$(s).find("defs");

    var m=defs[0].makeMask();
    m.addAttr("id","mask1");
    c=m.circle(0,0,1000);
    c.addAttr("fill","white");
	c=m.circle(0,0,100);
	c.addAttr("fill","black");

    c=m.circle(0,0,60);
    c.addAttr("fill","white");

	c=m.circle(0,0,40);
	c.addAttr("fill","black");

	g.circle(0,0,100, "thin_grey");
	g.circle(0,0,60, "thin_grey");
	g.circle(0,0,30, "thin_grey");

	g=s.makeGroup();
	g.circle(200,50,20,"thin_grey");
	g.circle(200,50,5,"thin_grey");
	g.line(148,39,179,44,"thin_grey");
	// p=g.path();
	// p.setPath("M 193 66 Q 227 128 158 122");

	g.mandala(12);


	g=s.makeGroup();
	p=g.path();
	p.setPath("M 300 50 L 250 50 Q 200 0 250 -50 L 300 -50 Q 300 -300 50 -300");
	p=g.path();
	p.setPath("M 250 -50 Q 300 -300 50 -250");
	g.mandala(4);


	g=s.makeGroup();
	p=g.path();
	p.setPath("M 250 -50 Q 300 -300 50 -250");
	g=g.mandala(24);
	g.addAttr("mask","url(#mask2)");


    var m=defs[0].makeMask();
    m.addAttr("id","mask2");
    c=m.circle(0,0,1000);
    c.addAttr("fill","white");
	c=m.circle(0,0,262);
	c.addAttr("fill","black");




}

function draw21(){
    var s,p,d,g,p2;

	s=document.getElementById("svg21");
	s.grid(100,50);
    
    g=s.makeGroup();
	p=g.path();
	p.setPath("M -10 100 L 0 0 L 10 100 Q 0 70 -10 100");

	p.move(0,30);


	p2=p.copy();
	p2.scale(2);


	g.mandala(12);

	g=s.makeGroup();
	g.circle(0,80,30, "thin_grey");
	g.mandala(6);


	g=s.makeGroup();
	g.circle(0,80,20, "thin_grey");
	g.mandala(6,.5);


	g=s.makeGroup();
	g.setClass("red");
	g.circle(0,180,20);
	g.circle(0,180,10);
	g.circle(0,130,10);
	g.circle(0,130,5);
	g.circle(-135 ,242, 4);
	g.mandala(12,.5);
}
function draw25(){
    var s,p,d,g,p2;

	s=document.getElementById("svg25");
	s.grid(100,20);
    
    g=s.makeGroup();
	p=g.path();
	p.setClass("thin_grey");
	p.setPath("M 0 0 L -20 20 L -15 40 L 10 70 L 30 30 L 0 0");
	p.move(200,40);

	p2=p.copy();
	p2[0].move(110,36);
	p2.scale(1.2);
	
	g.mandala(12);

	// $("#svg25 g.par").clip(-1);


}

function draw11() {


	s=document.getElementById("svg11");
	s.grid(100,20);
    
    g=s.makeGroup();
    g.circle(0,100,50,"dark_blue");
    g.circle(0,80,50,"light_blue");
	g.mandala(6);

	g=s.makeGroup();
	p=g.path();
	p.setPath("M 150 0 Q 130 0 80 80 L 20 0 L 80 -80 Q 130 0 150 0");
	p.setClass("dark_blue");

	p=g.path();
	p.setPath("M 130 0 Q 110 0 50 50 L 20 0 L 50 -50 Q 110 0 130 0");
	p.setClass("light_blue");
	 g.mandala(6,.5);

    g=s.makeGroup();
    g.circle(0,70,30,"dark_blue");
    g.circle(0,50,40,"light_blue");
	g.mandala(6);

}
function draw1() {
    var s,p,d,g;
	s=document.getElementById("svg1");
	
	s.grid(100,20);
    
 //    g=s.makeGroup();
	// p=g.path();
	// d="M 10 80 Q 95 10 180 80" ;    
	// p.setPath(d);
	// g.move(0,-200);
	// p.showPath();
	g=s.makeGroup();
	g.circle(201,-37,20, "thin_grey");
	g.circle(246,-11,5,  "thin_grey");
	g.circle(229,-21,10, "thin_grey");
	g.line(-65,236,-62,191,"thin_grey");
	g.line(-65,236,-34,245,"thin_grey");
	g.mandala(10);


	g=s.makeGroup();

    p=g.path();
    d="M 35 46 Q 103 15 112 85";
    p.setPath(d);

    p=g.path();
    d="M 56 28 Q 103 -32 104 68";
    p.setPath(d);


	g.mandala(89);


	g=s.makeGroup();
    p=g.path();
    d="M 10 10 h 100 v 100 Z";
    d="m238.5,280.45313c0,0 -42,2 -43,50c-1,48 -37,63 -37.5,62.54688c0.5,0.45313 -53.5,-7.54688 -51.5,-59.54688c2,-52 -60,-55 -59,-52";
    p.setPath(d);
    p.scale(.5,1);
    p.move(-200,-200);

    p=p.copy();
    p.scale(1,.96);
    

    p=g.path();
    d="M 0 0 Q 20 40 40 0";
    p.setPath(d);
    // p.showPath();
    // p.move(140,0);


	g.mandala(17);

	s.circle(0,0,140,"thin_grey");
 //    p=g.path();
 //    d="M 50 50 h 100 v 100 Z";
 //    p.setPath(d);
 //    g.move(-200,0);

	// g=s.makeGroup();
	// p=g.path();
	// d="M 10 10 C 20 20, 40 20, 50 10" ;
	// p.setPath(d);
	// p.showPath();
	
	// p=g.path();
	// d="M 70 10 C 70 20, 110 20, 110 10" ;
	// p.setPath(d);
	// p.showPath();

	// p=g.path();
	// d="M 130 10 C 120 20, 180 20, 170 10" ;
	// p.setPath(d);
	// p.showPath();

	// p=g.path();
	// d="M 10 60 C 20 80, 40 80, 50 60" ;
	// p.setPath(d);
	// p.showPath();

	// p=g.path();
	// d="M 70 60 C 70 80, 110 80, 110 60" ;
	// p.setPath(d);
	// p.showPath();

	// p=g.path();
	// d="M 130 60 C 120 80, 180 80, 170 60" ;
	// p.setPath(d);
	// p.showPath();

	// p=g.path();
	// d="M 10 110 C 20 140, 40 140, 50 110" ;
	// p.setPath(d);
	// p.showPath();

	// p=g.path();
	// d="M 70 110 C 70 140, 110 140, 110 110" ;
	// p.setPath(d);
	// p.showPath();

	// p=g.path();
	// d="M 130 110 C 120 140, 180 140, 170 110" ;    
	// p.setPath(d);
	// p.showPath();

}