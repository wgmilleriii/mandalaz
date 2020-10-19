
var svg, svgNS;
var svgHeight=600;
var svgWidth=800;
var mode="";
var c;
var arObjs=[];
var arPoints=[];
var nextRadiusRatio=1;

var pressed=false;

$( document ).ready(function() {
	svg=$("#svgb");
	svgNS="http://www.w3.org/2000/svg";
	hideMenus();

});

function setMode(s) {
	mode=s;
	$("#mode").html(s);
}

$(document).on('click', "#menuOptionsList div", function () {
	
	var o=$(this);
	var a=o.attr("link");
	console.log(a);
	console.log(o);
	showMenu(a);

});

$(document).on('click', "g[groupindex]", function (event) {
	
	var o=$(this);
	console.log(o);

});


$(document).on('click', svg, function (e) {
    switch (mode) {
    	case "circle" :
    		setMode("circle2");
    		showMenu("makeCircle2");
    		break;
    	case "circle2":
    		setMode("");
    		hideMenus();
    		break;
    	case "pointResize":
    		setMode("");
    		activeGroup.attr("radius",groupRadius);
    		// console.log(arPoints);

    		var i=parseInt(activeGroup.attr("pointindex"));
    		// console.log(i);
    		activeGroup.find(".grouped").each(function(index) {
    			var ii=parseInt($(this).attr("index"));
    			// console.log(index, ii);
				arPoints[i][ii]=[parseFloat($(this).attr("cx")), parseFloat($(this).attr("cy"))];
    		});
    		console.log(arPoints);
    		console.log("!");
    		break;
    }
    console.log("SVG ", mode);
});
var activeGroup;
var selectedOne;
var ox, oy, groupRadius;
$(document).on('click', ".grouped", function (event) {
	
	if (mode=="pointResize") {
		return;
	} else {
		activeGroup=$(this).parent();
		selectedOne=$(this);
		ox=$(this).attr("cx");
		oy=$(this).attr("cy");
		setMode("pointResize");
		console.log("DEFAULT " , mode , ox,oy);
		event.stopPropagation();
	}
	

});

$(document).on('mouseenter', "g[pointindex]", function (evt) {
    var p=$(this);
    setStatus("Group " + p.attr("pointindex"));
    $(this).addAttr({p:"class",v:"highlighted"});
});
$(document).on('mouseleave', "g[groupindex]", function (evt) {
	setStatus("");
    $(this).removeAttr({p:"class",v:"highlighted"});
    setStatus("");

});

$(document).on('mousemove', svg, function (evt) {
    
    var x = evt.pageX - svg.offset().left;
    var y = evt.pageY - svg.offset().top;    
    // console.log(x,y);
    
    x-=svgWidth/2;
    y=(y-svgHeight/2)*-1;

    if (mode=="circle") {
        c.setAttribute("cx",x);
        c.setAttribute("cy",y);
    }

    if (mode=="circle2") {
        var g=Math.abs(x-c.getAttribute("cx")*1);
        
        c.setAttribute("r",g);
    }

    if (mode=="pointResize") {



    	var dx=x-ox;
    	var dy=y-oy;
    	var d=Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
    	if (!pressed) {
    		if (x<ox) d*=-1;
    	}
    	var angle;
    	
    	activeGroup.find(".grouped").each(function() {
		angle=parseFloat($(this).attr("angle"));
    	if (pressed) {
    		d=Math.floor(d/15)*15;
    		
    		angle+=d;
    		setStatus("Degree: " + d);
    		activeGroup.find(".compass").attr("transform","rotate(" + d + ")");

    	} else {

			groupRadius=parseFloat($(this).parent().attr("radius")) + d;
			// console.log(angle, groupRadius);
		}
    	
		$(this).attr("cx",Math.cos(angle)*groupRadius);
		$(this).attr("cy",Math.sin(angle)*groupRadius);

    	
    	});
    }

});

$(document).on('click', '#btnMakePoints', function () {
    var p=$("#mPoints").val();
    var o=$("#mOffset").val();
    svg.makeMPoints({num:p, offset:o});
});

$(document).on('keyup keydown', function(e){
	pressed = e.shiftKey;
} );

$(document).on('keypress', '', function (e) {
    console.log(e.key);

      switch (e.key) {
    	case "Enter":
    		console.log("!!!");
    		$(".defaultAction:visible").click();
    		return;
    	case "c" : 
	    	showMenu("makeCircle");
	    	var g=svg.makeGroup();
	    	c=g.circle({cx:0 , cy:0, r:10});
	    	setMode("circle");
	    	break;
    	case "g" : 
	    	showMenu("makeGrid");
	    	break;
    	case "p" : 
	    	showMenu("makeMPoints");
	    	break;
    	case "l" : 
	    	showMenu("makeMLines");
	    	break;
    	case "v" : 
	    	showMenu("makeMCurves");
	    	break;
    	case "a" : 
	    	showMenu("makeClasses");
	    	break;


    	case "u" : 
    		if (arObjs.length>0) {
		    	var o=arObjs.pop();
		    	o.remove();
		    	var e=$("#makeMLines");
		    	updateSels(e);

    		}
	    	break;

    }
});
function hideMenus() {
	$(".submenu").hide();	
}

function showMenu(menu) {
	hideMenus();
	$("#" + menu).show();
}

var class_stroke="";
var class_fill="";
function getClass() {
	return class_stroke + " " + class_fill;
}
$(document).on('click', '#makeClasses input', function () {
	console.log($(this));
	var s=$(".sample");
	var c=$(this).parent().attr("class");
	var a=$(this).attr("class");
	if (c=="stroke") {
		class_stroke=a;
	}  else {
		class_fill=a;
	}

	s.attr("class","sample " + getClass());
});

$(document).on('click', '#btnMakeGrid', function () {
    var b=parseInt($("#mGridBig").val());
    var s=parseInt($("#mGridSmall").val());
    svg.grid({big:b, small:s});
});

function getOptions(el) {
    var p=el.parent();
    var g1=parseInt(p.find(".selLine:eq(0)").val());
    var g2=parseInt(p.find(".selLine:eq(1)").val());
    var g3=parseInt(p.find(".selLine:eq(2)").val());
    var o=parseInt($("#lineOffset").val());
    var o1=parseInt($("#lineOffset1").val());
    var o2=parseInt($("#lineOffset2").val());
    return {g1:g1, g2:g2, g3:g3, offset:o, offset1:o1, offset2:o2};
}
$(document).on('click', '#btnDrawMCircleRow', function () {

	o=getOptions($(this));
    var g=svg.makeGroup();
    g.mCircleRow({ar1:arPoints[o["g1"]], ar2:arPoints[o["g2"]], offset:o["offset"]});

});

$(document).on('click', '#btnDrawMCircles', function () {
	o=getOptions($(this));
    var g=svg.makeGroup();
    g.mCircles({ar1:arPoints[o["g1"]], ar2:arPoints[o["g2"]], offset:o["offset"]});
});

var o;
$(document).on('click', '#btnDrawMLines', function () {
	o=getOptions($(this));
	console.log(o);
    var g=svg.makeGroup();
	g.mLines({ar1:arPoints[o["g1"]], ar2:arPoints[o["g2"]], offset:o["offset"]});
});
$(document).on('click', '#btnDrawMCurves', function () {
	o=getOptions($(this));
    var g=svg.makeGroup();

	g.mCurves({
		ar1:arPoints[o["g1"]], 
		ar2:arPoints[o["g2"]], 
		ar3:arPoints[o["g3"]], 
		offset1:o["offset1"],
		offset2:o["offset2"]
	});
});


function setStatus(s) {
	$("#status").html(s);
}
function beginCircle() {
	setStatus("Set circle center");
}
function updateSels(e) {
	
	var arV=[];
	$("g[points='1']:visible").each(function() {
		arV.push($(this).attr("pointindex"));
	})
	
	$(".hasSels").each(function() {
		e=$(this);
		e.find(".selLine").each(function() {
			$(this).html("");
			for (var i=0;i<arV.length;i++) {
			var o=arV[i];
	            $(this).append(`<option value="${o}"> 
	                                       ${o} 
	                                  </option>`); 			
			}
		});

		e.find(".selLine:eq(1)").prop('selectedIndex', 1);
		e.find(".selLine:eq(2)").prop('selectedIndex', 2);
	});


}


(function( $ ) {
 $.fn.removeAttr = function(options) {
	var p=options.p;
	var v=options.v;

      try {
        var f=this.attr(p);

        console.log("Existing1 : " + f);
        if (f===undefined) f="";
        f=f.replace(v,"").trim();
        this.attr(p,f.trim());

    } 
    catch (ex) {
        var f=this.getAttribute(p);
        console.log("Existing2 : " + f);
        if (f===null) f="";
        f=f.replace(v,"").trim();

this.attr(p,f.trim());
    }
}
$.fn.addAttr = function(options) {
 	var p=options.p;
 	var v=options.v;
//
	console.log("add attr");
	console.log(this);
    try {
        var f=$(this).attr(p);
        // // console.log("Existing1 : " + f);
        if (f===undefined) f="";
        f=f.replace(v,"");
        $(this).attr(p,(f + " " + v).trim());
        var f=$(this).attr(p);
        // // console.log("Existing11 : " + f);

    } 

    catch (ex) {
    	console.log(ex);
        var f=this.getAttribute(p);
        f=f.replace(v,"");
        // // console.log("Existing2 : " + f);
        if (f===null) f="";
        this.setAttribute(p,(f + " " + v).trim());

    }
}

	
	$.fn.mCurves = function(options) {


	    var g=$(this);
	    var ar1=options.ar1;
	    var ar2=options.ar2;
	    var ar3=options.ar3;
	    var offset1=options.offset1;
	    var offset2=options.offset2;

	    if (ar1===undefined || ar2===undefined || ar 3===undefined ) return;
		
	    for (var i=0;i<ar1.length;i++) {
	        
	        i1=i;
	        i2=i+offset1;
	        i3=i+offset2;
	        while (i2<0) {
	            i2+=ar1.length;
	        }
	        while (i3<0) {
	            i3+=ar1.length;
	        }
	        while (i2>=ar1.length) {
	            i2-=(ar1.length);
	        } 
	        while (i2>=ar2.length) {
	            i2-=(ar2.length);
	        } 
	        while (i2>=ar3.length) {
	            i2-=(ar3.length);
	        } 


	        while (i3>=ar1.length) {
	            i3-=(ar1.length);
	        } 
	        while (i3>=ar2.length) {
	            i3-=(ar2.length);
	        } 
	        while (i3>=ar3.length) {
	            i3-=(ar3.length);
	        } 

	        try {
	            d="M " + ar1[i1][0] + " " + ar1[i1][1] 
	            + " Q " + ar2[i2][0] + " " + ar2[i2][1] 
	            + " " + ar3[i3][0] + " " + ar3[i3][1];
	            console.log(d);

	            var p=g.path();
	            p.attr("pointer-events","none");
	            console.log(p);
	            p.setPath(d);

	        }
	        catch (ex) {
	           console.log("ERR ");
	           console.log(ex);
	        }

	        
	    }
	}

	$.fn.setPath = function(d) {
		$(this).attr("d",d);
	}

	

	$.fn.mLines = function(options) {
		console.log(options);
		if (options.ar1===undefined || options.ar2===undefined) return;
	    var g=$(this);
	    var ar1=options.ar1;
	    var ar2=options.ar2;
	    var offset=options.offset;

	    for (var i=0;i<ar1.length;i++) {
	        
	        
	        i1=i;
	        i2=i+offset;
	        while (i2<0) {
	            i2+=ar1.length;
	        }
	        while (i2>=ar2.length) {
	            i2-=(ar2.length);
	        } 
	        n=i+offset;
	        try {
	            g.line({x1:ar1[i1][0], y1:ar1[i1][1], x2:ar2[i2][0], y2:ar2[i2][1]});
	        }
	        catch (ex) {
	            // // console.log("ERR ", i2, offset);
	        }

	        
	    }
	}


$.fn.mCircleRow = function(options) {
	    var g=$(this);
	    var ar1=options.ar1;
	    var ar2=options.ar2;
	    var offset=options.offset;

	    for (var i=0;i<ar1.length;i++) {
	        
	        
	        i1=i;
	        i2=i+offset;
	        while (i2<0) {
	            i2+=ar1.length;
	        }
	        while (i2>=ar1.length) {
	            i2-=(ar1.length);
	        } 
	        while (i2>=ar2.length) {
	            i2-=(ar2.length);
	        } 
	        var x1=ar1[i1][0];
	        var y1=ar1[i1][1];
	        var x2=ar2[i2][0];
	        var y2=ar2[i2][1];

	        var disX=Math.abs(x1-x2);
	        var disY=Math.abs(y1-y2);
	        var dirX=x1<x2 ? 1 : -1;
	        var dirY=y1<y2 ? 1 : -1;

	        var disM=Math.max(disX,disY);
	        var hm=disM/10;
	        if (disM>0) {
		        for (var ii=0;ii<hm;ii++) {
		        	console.log(ii);
			        try {
			            var cir=g.circle({cx:x1+ii*dirX*disX/hm, cy: y1+ii*dirY*disY/hm, r:4});
			            cir.setAttribute("pointer-events","none");
			        }
			        catch (ex) {
			            // // console.log("ERR ", i2, offset);
			        }

		        }
        	
	        }

	
	        
	    }
	}

	$.fn.mCircles = function(options) {
	    var g=$(this);
	    var ar1=options.ar1;
	    var ar2=options.ar2;
	    var offset=options.offset;

	    for (var i=0;i<ar1.length;i++) {
	        
	        
	        i1=i;
	        i2=i+offset;
	        while (i2<0) {
	            i2+=ar1.length;
	        }
	        while (i2>=ar1.length) {
	            i2-=(ar1.length);
	        } 
	        while (i2>=ar2.length) {
	            i2-=(ar2.length);
	        } 
	        var x1=ar1[i1][0];
	        var y1=ar1[i1][1];
	        var x2=ar2[i2][0];
	        var y2=ar2[i2][1];
	        var rad=distancebetween(x1,y1,x2,y2);
	        try {
	            var cir=g.circle({cx:x1, cy: y1, r:rad});
	            cir.setAttribute("pointer-events","none");
	        }
	        catch (ex) {
	            // // console.log("ERR ", i2, offset);
	        }

	        
	    }
	}


 	$.fn.circle = function(options) {

	 	var settings={
	       	css: "default"
	    }
	    
	    jQuery.extend(settings,options);
	 	//function circle(cx, cy, radius, css="thin_blue") {
	    
	    var cir = document.createElementNS(svgNS, 'circle'); //Create a path in SVG's namespace
	    if (settings.css == "rand") {
	        // do something great
	        var r=random_between(20,100);
	        var g=random_between(20,100);
	        var b=random_between(80,255);

	        r=Math.floor(r);
	        g=Math.floor(g);
	        b=Math.floor(b);
	                    //    fill:rgb( 100 , 100 , 100 )
	        var s="fill:rgb(" + r + "," + g + "," + b + ")";
	        // // // console.log("I created a string!");
	        // // // console.log(s);

	        
	        cir.setAttribute("style",s);

	    } else {
	        cir.setAttribute("class",settings.css); 
	    }

	    
	    cir.setAttribute("cx",settings.cx); 
	    cir.setAttribute("cy",settings.cy); 
	    cir.setAttribute("r",settings.r); 
	    cir.setAttribute("angle",settings.angle); 

	    cir.setAttribute("pointer-events","all"); 

		
	    $(this).append(cir);

	    return cir;
	}

	$.fn.path = function(options={}) {
       var settings={
       	css: "default",
       	ar: []
       };
    	
       jQuery.extend(settings,options);
		console.log($(this));
		console.log("PATHIN");
		console.log(settings);
		var ar=options.ar;
	    var path = document.createElementNS(svgNS, 'path'); //Create a path in SVG's namespace
	    path.setAttribute("class",settings.css); 
	    console.log("oathing2");
	    if (ar!== undefined && ar.length>0) {
		    var s="M";
		    for (var i=0;i<ar.length;i+=2) {
		        s+=ar[i] + " " + ar[i+1] + " L ";
		    }
		    s+=ar[0] + " " + ar[1];
		    path.setAttribute("d",s);
	    }
	    path=$(path);
	    console.log(path);
	    $(this).append(path);
	    return path;       
	}



	$.fn.line = function(options) {

       var settings={
       	css: "default"
       }
    
       jQuery.extend(settings,options);
	
 		var x1=settings.x1;
 		var x2=settings.x2;
 		var y1=settings.y1;
 		var y2=settings.y2;
 		var css=settings.css;
 		

 		var line = document.createElementNS(svgNS, 'line'); //Create a line in SVG's namespace line.setAttribute("class",css);
	    line.setAttribute("x1",x1); 
	    line.setAttribute("y1",y1); 
	    line.setAttribute("x2",x2); 
	    line.setAttribute("y2",y2); 
	    line.setAttribute("class",css); 


	    $(this).append(line);
	}


	$.fn.makeMPoints = function(options) {

       var settings={
       	css: "default",
       	offset:0,
       	rad:300
       }
    
       jQuery.extend(settings,options);
	
 		var n=settings.num;
 		var offset=settings.offset;
 		var rad=settings.rad*nextRadiusRatio;
 		nextRadiusRatio*=.8;
 		if (nextRadiusRatio<.3) nextRadiusRatio=1;
	    var p, p2, ar, d;
	    p2=Math.PI*2 ;
	    ar=[];
	    var g=this.makeGroup();

	    g.attr("radius",rad);

	    // console.log("((((");
	    // for (var i=0;i<=p2*1.05;i+=p2/n) {
	    for (var i=0;i<n;i++) {
	        //d=i+p2/offset/n;
	        d=(i/n)*p2 + p2/n*offset;

	        // d=i+p2/n *offset;
	        var r=d;
	        var x=Math.cos(r)*rad;
	        var y=Math.sin(r)*rad;
	        ar.push([x,y]);
	        // console.log(r);
	        var t=Math.round(x,2) + ", " + Math.round(y,2);
	        //text(x,y,t);

	        var o={cx:x, cy:y, r:10, index:i, angle:r, radius:rad, css:"helper grouped"};
	        var cir=g.circle(o);
	        cir.setAttribute("index",i); 

	        var o={cx:x, cy:y, r:2, index:i, angle:r, radius:rad, css:"grouped"};
	        var cir=g.circle(o);
	        cir.setAttribute("index",i); 
	        cir.setAttribute("pointer-events","none");
	        // // // console.log(x,y);
	    }
		g.attr("pointindex",arPoints.length);
	    arPoints.push(ar);

	    var g2=g.makeGroup();
	    g2.attr("class","compass");
		var o={x1:0,y1:0,x2:0,y2:50,css:""};
	    g2.line(o);
	    g.attr("points","1");
	    
		var e=$("#makeMLines");
		updateSels(e);
	    
	    // line(x1,y1,x2,y2,css,opacity);
	    return this; 		

	}


    $.fn.grid = function(options) {
 
        // this.filter( "a" ).each(function() {
        //     var link = $( this );
        //     link.append( " (" + link.attr( "href" ) + ")" );
        // });
 
        // return this;
        
        var g=this.makeGroup();

	    var w=$(this).attr("width")/2;
	    var h=$(this).attr("height")/2;

	    for (var x=-w;x<=w;x+=options.small) {
	    	var o={x1:x,y1:-h,x2:x,y2:h,css:"light1"};
	        g.line(o);
	    }
	    for (var y=-h;y<=h;y+=options.small) {
	    	var o={x1:-w,y1:y,x2:w,y2:y,css:"light1"};
	        g.line(o);
	    }

	    for (var x=-w;x<=w;x+=options.big) {
	    	var o={x1:x,y1:-h,x2:x,y2:h,css:"light2"};
	        g.line(o);

	    }

	    for (var y=-h;y<=h;y+=options.big) {
	        // g.line(-w,y,w,y,css,.2);   
	    	var o={x1:-w,y1:y,x2:w,y2:y,css:"light2"};
	        g.line(o);

	    }
	    return this;

    };

 	$.fn.makeGroup = function(options) {
 		var g = document.createElementNS(svgNS, 'g'); //Create a line in SVG's namespace
		$(this).append(g);
		g=$(g);
		g.attr("groupindex",arObjs.length);
		g.attr("class",getClass());
		arObjs.push(g);
 		return g;

    };

 
}( jQuery ));
 
// Usage example:




// jQuery.fn.extend({

	// line:function(x1,y1,x2,y2,css="thin_blue", opacity=1) {
	// 	return this.each(function() {
	// 		console.log($(this));
	// 		return;
	//     var line = document.createElementNS(svgNS, 'line'); //Create a line in SVG's namespace line.setAttribute("class",css);
	//     line.setAttribute("x1",x1); 
	//     line.setAttribute("y1",y1); 
	//     line.setAttribute("x2",x2); 
	//     line.setAttribute("y2",y2); 
	//     line.setAttribute("style","opacity:" + opacity); 

	//     $(this).append(line);
	// 	});
	// },



//  makeGroup: function() {
//     return this.each(function() {

// 		var g = document.createElementNS(svgNS, 'g'); //Create a line in SVG's namespace
// 		$(this).append(g);
// 		g=$(g);
// 		console.log(g);
// g="FF";
// 		return g;

//     });
//   },
//   grid: function(options) {
//     return this.each(function() {


//  var settings = $.extend({
//             // These are the defaults.
//             color: "#556b2f",
//             backgroundColor: "white"
//         }, options );

//         var e=$(this);
// 	    var w=e.attr("width")/2;
// 	    var h=e.attr("height")/2;
	    
	    

// 	    var g2=e.makeGroup();
// 	    console.log("G@");
// 	    console.log(g2);
// 	    return;
// 	    g.line(0,0,1,1);
// 	    return;
	    // for (var x=-w;x<=w;x+=small) {
	    //     g.line(x,-h,x,h,css,.1);
	    // }
	    
	    // for (var y=-h;y<=h;y+=small) {
	    //     g.line(-w,y,w,y,css,.1);   
	    // }


	    // for (var x=-w;x<=w;x+=big) {
	    //     g.line(x,-h,x,h,css,.2);
	    // }

	    // for (var y=-h;y<=h;y+=big) {
	    //     g.line(-w,y,w,y,css,.2);   
	    // }
// 	    svg=e;
// 	    return g;
//     });
//   },

//   check: function() {
//     return this.each(function() {
//       this.checked = true;
//     });
//   },
//   uncheck: function() {
//     return this.each(function() {
//       this.checked = false;
//     });
//   }
 

// });


function distancebetween(x1, y1, x2, y2) {

	var a = x1 - x2;
	var b = y1 - y2;

	var c = Math.sqrt( a*a + b*b );

	// c is the distance
	return c;

}

function slope(x1, y1, x2, y2) {
var y3 = y1-y2;
var x3 = x1-x2;
var slope = y3/x3	;
return slope;
}