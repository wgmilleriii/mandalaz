/* global variables */


var svg, svgNS;
var svgHeight = 600;
var svgWidth = 800;
var mode = "";

// movable circle
var c;
var arObjs = [];
var arPoints = [];

// to determine shift key
var pressed = false;

// which group is active
var activeGroup;
// which object is selected
var selectedOne;

// original object coordinates, radius for point resize
var ox, oy, groupRadius;

// selected class (coloring)
var class_stroke = "";
var class_fill = "";

/*
temporarily disabled
var nextRadiusRatio=1;

*/
var arHistory=[];

// fires when document first loads
$(document).ready(function() {

    // references to the drawing canvas and 
    //   to the W3 namespace to create new objects
    svg = $("#svgb");
    svgNS = "http://www.w3.org/2000/svg";

    // menu displays
    hideMenus();

    // make pretty reverse buttons
    //  replace each reverse class with a big svg string (see svgs.js)
    $(".reverse").parent().each(function() {
        var d = document.createElement('div'); //Create a path in SVG's namespace
        d = $(d);
        d.html(svg_reverse);
        d.attr("class", "svgCont reverse");
        $(this).replaceWith(d);
    });

    // bring the keyboard focus to the document window
    $(document).focus();

    makeTri();
});



function makeTri() {

var g=svg.makeGroup();	
g.attr("transform","translate(-250,-300)");
drawSierpinski(g);
}

// ctx.fillStyle = '#00FF00';
// ctx.fill();
// ctx.strokeStyle = 'black';
// ctx.lineWidth = 2;
// ctx.stroke();



var width = 600;
var height = 600;
var size = 500;
 
function sierpinski(Ax,Ay,Bx,By,Cx,Cy,d,g) {
    if(d>0) {
        var pointAx = (Bx + Cx) / 2;
        var pointAy = (By + Cy) / 2;
 
        var pointBx = (Ax + Cx) / 2;
        var pointBy = (Ay + Cy) / 2;
 
        var pointCx = (Ax + Bx) / 2;
        var pointCy = (Ay + By) / 2;
 
        var d2 = d-1;
        sierpinski(Ax,Ay,pointBx,pointBy,pointCx,pointCy,d2,g);
        sierpinski(pointCx,pointCy,pointAx,pointAy,Bx,By,d2,g);
        sierpinski(pointBx,pointBy,pointAx,pointAy,Cx,Cy,d2,g);
    }
    else {
    	
        // g.line({x1:Ax, y1:Ay, x2:Bx, y2:By});
        // g.line({x1:Bx, y1:By, x2:Cx, y2:Cy});
        // g.line({x1:Ax, y1:Ay, x2:Cx, y2:Cy});

        var pat=g.path();
        var params="M {0} {1} L {2} {3} L {4} {5} z".format(Ax, Ay, Bx, By, Cx, Cy);
        console.log(params);
        pat.setPath(params);
    }
}
 
 
function drawSierpinski(g) {
    var midPointX = width/2;
    var midPointY = height/2;
 
    var deep = 4;
 
    var ri = (size/6) * Math.sqrt(3);
    var ru = (size/3) * Math.sqrt(3);
 
    var pointAx = midPointX-(size/2);
    var pointAy = midPointY+ri;
 
    var pointBx = midPointX+(size/2);
    var pointBy = midPointY+ri;
 
    var pointCx = midPointX;
    var pointCy = midPointY-ru;
 	console.log(pointAx,pointAy,pointBx,pointBy,pointCx,pointCy);
    sierpinski(pointAx,pointAy,pointBx,pointBy,pointCx,pointCy,deep,g);
}
 



// menu controllers
function hideMenus() {
    $(".submenu").hide();
}

function showMenu(menu) {
    hideMenus();
    $("#" + menu).show();
}

// just a shortcut to combine two classes (stroke and fill)
function getClass() {
    return class_stroke + " " + class_fill;
}

// display the status on upper right
function setStatus(s) {
    $("#status").html(s);
}


// set the global variable mode ,
//    and display the mode on the upper right corner of the screen
function setMode(s) {
    mode = s;
    $("#mode").html(s);
}

// circle step 1
function beginCircle() {

    showMenu("makeCircle");
    var g = svg.makeGroup();
    c = g.circle({
        cx: 0,
        cy: 0,
        r: 10
    });
    setMode("circle");
    setStatus("Set circle center");
}


function updateSels(e) {

    var arV = [];
    // all the groups that are visible and have a pointindex: 
    //.  add those to the select groups
    $("g[points='1']:visible").each(function() {
        arV.push($(this).attr("pointindex"));
    })

    // any menu that has select groups
    $(".hasSels").each(function() {
        e = $(this);
        e.find(".selLine").each(function() {
            $(this).html("");
            for (var i = 0; i < arV.length; i++) {
                var o = arV[i];
                $(this).append(`<option value="${o}"> 
	                                       ${o} 
	                                  </option>`);
            }
        });

        e.find(".selLine:eq(1)").prop('selectedIndex', 1);
        e.find(".selLine:eq(2)").prop('selectedIndex', 2);
    });
}



// when reverse buttons are clicked, 
//  locate the input box next to it and change the sign from negative to positive
//  (or positive to negative)
$(document).on('click', ".reverse", function() {

    var o = $(this);
    var p = o.prev().find("input[type=number]");
    var v = p.val();
    if (!$.isNumeric(v)) v = 0;
    if (v == 0) {
        v = -1;
    } else {
        v *= -1;
    }
    p.val(v);

});

// click the menu boxes to jump to that function.
// e.g.,
/* 

<div link="makeCircle" action="beginCircle">
		<span class="underline">C</span>ircle
</div>

this will call showMenu("makeCircle"),
  and call the function beginCircle()
*/
$(document).on('click', "#menuOptionsList div", function(event) {

    var o = $(this);
    var l = o.attr("link");
    var a = o.attr("action");
    showMenu(l);
    if (a !== undefined) {
        var fn = window[a];
        // is object a function?
        if (typeof fn === "function") {
            fn.apply();
            event.stopPropagation();
        }
    }
});


// displays which group was clicked on
$(document).on('click', "g[groupindex]", function(event) {
    var o = $(this);
    console.log(o);
});

function viewHistory() {
	$("#history").toggle();
}
function createHistory(s) {
	arHistory.push(s);
	$("#history").html("<p>" + arHistory.join("</p><p>") + "</p>");
}
/*
	Clicking on the drawing area:
	when mode was.. -> change it to..     
	 circle -> circle2 			
     circle2 -> nothing
     pointResize -> nothing
*/

$(document).on('click', svg, function(e) {
    switch (mode) {
        case "circle":
            setMode("circle2");
            showMenu("makeCircle2");
            break;
        case "circle2":
            setMode("");
            hideMenus();
            var s="drawCircle({0},{1},{2});".format(c.getAttribute("cx"),c.getAttribute("cy"),c.getAttribute("r"));
            createHistory(s);
            break;
        case "pointResize":
            setMode("");
            setStatus("");
            activeGroup.attr("radius", groupRadius);
            var i = parseInt(activeGroup.attr("pointindex"));
            activeGroup.find(".grouped").each(function(index) {
                var ii = parseInt($(this).parent().attr("index"));
                // console.log(index, ii);
                arPoints[i][ii] = [parseFloat($(this).attr("cx")), parseFloat($(this).attr("cy"))];
            });
            break;
    }
});


// for point resize
$(document).on('click', ".grouped", function(event) {

    if (mode == "pointResize") {
        return;
    } else {
        activeGroup = $(this).parent().parent();
        selectedOne = $(this);
        ox = $(this).attr("cx");
        oy = $(this).attr("cy");
        setMode("pointResize");
        console.log("DEFAULT ", mode, ox, oy);
        event.stopPropagation();
    }


});

// hover over a group to highlight it and view the index number
$(document).on('mouseenter', "g[pointindex]", function(evt) {
    var p = $(this);
    setStatus("Group " + p.attr("pointindex") + ". Click again to move group.");
    $(this).addAttr({
        p: "class",
        v: "highlighted"
    });
});

// unhover a group 
$(document).on('mouseleave', "g[groupindex]", function(evt) {
    setStatus("");
    $(this).removeAttr({
        p: "class",
        v: "highlighted"
    });
    setStatus("");
});

// on mousemove
$(document).on('mousemove', svg, function(evt) {

	// get usable x and y values
    var x = evt.pageX - svg.offset().left;
    var y = evt.pageY - svg.offset().top;
    x -= svgWidth / 2;
    y = (y - svgHeight / 2) * -1;

    // set the coordinates of the global circle
    if (mode == "circle") {
        c.setAttribute("cx", x);
        c.setAttribute("cy", y);
    }

    // set the radius of the global circle
    if (mode == "circle2") {
        var g = Math.abs(x - c.getAttribute("cx") * 1);
        c.setAttribute("r", g);
    }

    // resizing or rotating a group
    if (mode == "pointResize") {

    	// calculate the distance from the mouse cursor to the original coordinates
    	// difference variables: current coordinates - original coordinates
        var dx = x - ox;
        var dy = y - oy;
        // algebraic distance formula
        var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dx, 2));

		if (x < ox) dist *= -1;
        var angle;
        var dist2=0;
        activeGroup.find(".grouped").each(function() {
        	var gp=$(this).parent();
            var angle = parseFloat(gp.attr("angle"));
            var angleDegrees = parseFloat(gp.attr("angleDegrees"));
            var groupRadius = parseFloat(gp.attr("radius")) ;
            var index=gp.attr("index");
            var cx, cy;
            if (pressed) {
                // dist = Math.floor(dist / 15) * 15;
                dist2=Math.floor(parseFloat(dist*.3));
                angleDegrees += dist2;
                // ox=x;
                // oy=y;
                angle=angleDegrees/360*Math.PI*2;

            } else {
            	groupRadius+= dist;

            }
        	cx=Math.cos(angle) * groupRadius;
        	cy=Math.sin(angle) * groupRadius;

            $(this).attr("cx", cx);
            $(this).attr("cy", cy);
            var t=gp.find("text");
            // console.log(i);
            // console.log(t);
            t.attr("x",cx);
            t.attr("y",-cy);
            t.html(index + ": " + angleDegrees);


        });
        activeGroup.find(".compass").attr("transform", "rotate(" + dist2 + ")");
    }

});

$(document).on('click', '#btnMakePoints', function() {
    var p = $("#mPoints").val();
    var o = $("#mOffset").val();
    svg.makeMPoints({
        num: p,
        offset: o
    });

});

$(document).on('keyup keydown', function(e) {
    pressed = e.shiftKey;
});

function doReverse(i) {
    r = $(".reverse:visible:eq(" + i + ")");
    r.click();
}
$(document).on('keypress', '', function(e) {
    console.log(e.key);

    switch (e.key) {
        case "r":
            doReverse(0);
            return;
        case "R":
            doReverse(1);
            return;
        case "Enter":
            console.log("!!!");
            $(".defaultAction:visible").click();
            return;
        case "c":
            beginCircle();
            break;
        case "g":
            showMenu("makeGrid");
            break;
        case "p":
            showMenu("makeMPoints");
            break;
        case "l":
            showMenu("makeMLines");
            break;
        case "v":
            showMenu("makeMCurves");
            break;
        case "a":
            showMenu("makeClasses");
            break;
        case "h":
            viewHistory();
            break;


        case "u":
            if (arObjs.length > 0) {
                var o = arObjs.pop();
                o.remove();
                var e = $("#makeMLines");
                updateSels(e);

            }
            break;

    }
});

$(document).on('click', '#makeClasses input', function() {
    console.log($(this));
    var s = $(".sample");
    var c = $(this).parent().attr("class");
    var a = $(this).attr("class");
    if (c == "stroke") {
        class_stroke = a;
    } else {
        class_fill = a;
    }

    s.attr("class", "sample " + getClass());
});

$(document).on('click', '#btnMakeGrid', function() {
    var b = parseInt($("#mGridBig").val());
    var s = parseInt($("#mGridSmall").val());
    svg.grid({
        big: b,
        small: s
    });

    createHistory(`svg.grid({
        big: {0},
        small: {1}
    });`.format(b,s));

});

function getOptions(el) {
    var p = el.parent();
    var g1 = parseInt(p.find(".selLine:eq(0)").val());
    var g2 = parseInt(p.find(".selLine:eq(1)").val());
    var g3 = parseInt(p.find(".selLine:eq(2)").val());
    var o = parseInt($("#lineOffset").val());
    var o1 = parseInt($("#lineOffset1").val());
    var o2 = parseInt($("#lineOffset2").val());
    return {
        g1: g1,
        g2: g2,
        g3: g3,
        offset: o,
        offset1: o1,
        offset2: o2
    };
}
$(document).on('click', '#btnDrawMCircleRow', function() {

    o = getOptions($(this));
    var g = svg.makeGroup();
    g.mCircleRow({
        ar1: arPoints[o["g1"]],
        ar2: arPoints[o["g2"]],
        offset: o["offset"]
    });

});

$(document).on('click', '#btnDrawMCircles', function() {
    o = getOptions($(this));
    var g = svg.makeGroup();
    g.mCircles({
        ar1: arPoints[o["g1"]],
        ar2: arPoints[o["g2"]],
        offset: o["offset"]
    });
});

var o;
$(document).on('click', '#btnDrawMLines', function() {
    o = getOptions($(this));
    console.log(o);
    var g = svg.makeGroup();
    g.mLines({
        ar1: arPoints[o["g1"]],
        ar2: arPoints[o["g2"]],
        offset: o["offset"]
    });
});
$(document).on('click', '#btnDrawMCurves', function() {
    o = getOptions($(this));
    var g = svg.makeGroup();

    g.mCurves({
        ar1: arPoints[o["g1"]],
        ar2: arPoints[o["g2"]],
        ar3: arPoints[o["g3"]],
        offset1: o["offset1"],
        offset2: o["offset2"]
    });
});



(function($) {
    $.fn.removeAttr = function(options) {
        var p = options.p;
        var v = options.v;

        try {
            var f = this.attr(p);

            console.log("Existing1 : " + f);
            if (f === undefined) f = "";
            f = f.replace(v, "").trim();
            this.attr(p, f.trim());

        } catch (ex) {
            var f = this.getAttribute(p);
            console.log("Existing2 : " + f);
            if (f === null) f = "";
            f = f.replace(v, "").trim();

            this.attr(p, f.trim());
        }
    }
    $.fn.addAttr = function(options) {
        var p = options.p;
        var v = options.v;
        //
        console.log("add attr");
        console.log(this);
        try {
            var f = $(this).attr(p);
            // // console.log("Existing1 : " + f);
            if (f === undefined) f = "";
            f = f.replace(v, "");
            $(this).attr(p, (f + " " + v).trim());
            var f = $(this).attr(p);
            // // console.log("Existing11 : " + f);

        } catch (ex) {
            console.log(ex);
            var f = this.getAttribute(p);
            f = f.replace(v, "");
            // // console.log("Existing2 : " + f);
            if (f === null) f = "";
            this.setAttribute(p, (f + " " + v).trim());

        }
    }


    $.fn.mCurves = function(options) {


        var g = $(this);
        var ar1 = options.ar1;
        var ar2 = options.ar2;
        var ar3 = options.ar3;
        var offset1 = options.offset1;
        var offset2 = options.offset2;

        if (ar1 === undefined || ar2 === undefined || ar3 === undefined) return;

        for (var i = 0; i < ar1.length; i++) {

            i1 = i;
            i2 = i + offset1;
            i3 = i + offset2;
            while (i2 < 0) {
                i2 += ar1.length;
            }
            while (i3 < 0) {
                i3 += ar1.length;
            }
            while (i2 >= ar1.length) {
                i2 -= (ar1.length);
            }
            while (i2 >= ar2.length) {
                i2 -= (ar2.length);
            }
            while (i2 >= ar3.length) {
                i2 -= (ar3.length);
            }


            while (i3 >= ar1.length) {
                i3 -= (ar1.length);
            }
            while (i3 >= ar2.length) {
                i3 -= (ar2.length);
            }
            while (i3 >= ar3.length) {
                i3 -= (ar3.length);
            }

            try {
                d = "M " + ar1[i1][0] + " " + ar1[i1][1] +
                    " Q " + ar2[i2][0] + " " + ar2[i2][1] +
                    " " + ar3[i3][0] + " " + ar3[i3][1];
                console.log(d);

                var p = g.path();
                p.attr("pointer-events", "none");
                console.log(p);
                p.setPath(d);

            } catch (ex) {
                console.log("ERR ");
                console.log(ex);
            }


        }
    }

    $.fn.setPath = function(d) {
        $(this).attr("d", d);
    }



    $.fn.mLines = function(options) {
        console.log(options);
        if (options.ar1 === undefined || options.ar2 === undefined) return;
        var g = $(this);
        var ar1 = options.ar1;
        var ar2 = options.ar2;
        var offset = options.offset;

        for (var i = 0; i < ar1.length; i++) {


            i1 = i;
            i2 = i + offset;
            while (i2 < 0) {
                i2 += ar1.length;
            }
            while (i2 >= ar2.length) {
                i2 -= (ar2.length);
            }
            n = i + offset;
            try {
                g.line({
                    x1: ar1[i1][0],
                    y1: ar1[i1][1],
                    x2: ar2[i2][0],
                    y2: ar2[i2][1]
                });
            } catch (ex) {
                // // console.log("ERR ", i2, offset);
            }


        }
    }


    $.fn.mCircleRow = function(options) {
        var g = $(this);
        var ar1 = options.ar1;
        var ar2 = options.ar2;
        var offset = options.offset;

        for (var i = 0; i < ar1.length; i++) {


            i1 = i;
            i2 = i + offset;
            while (i2 < 0) {
                i2 += ar1.length;
            }
            while (i2 >= ar1.length) {
                i2 -= (ar1.length);
            }
            while (i2 >= ar2.length) {
                i2 -= (ar2.length);
            }
            var x1 = ar1[i1][0];
            var y1 = ar1[i1][1];
            var x2 = ar2[i2][0];
            var y2 = ar2[i2][1];

            var disX = Math.abs(x1 - x2);
            var disY = Math.abs(y1 - y2);
            var dirX = x1 < x2 ? 1 : -1;
            var dirY = y1 < y2 ? 1 : -1;

            var disM = Math.max(disX, disY);
            var hm = disM / 10;
            if (disM > 0) {
                for (var ii = 0; ii < hm; ii++) {
                    console.log(ii);
                    try {
                        var cir = g.circle({
                            cx: x1 + ii * dirX * disX / hm,
                            cy: y1 + ii * dirY * disY / hm,
                            r: 4
                        });
                        cir.setAttribute("pointer-events", "none");
                    } catch (ex) {
                        // // console.log("ERR ", i2, offset);
                    }

                }

            }



        }
    }

    $.fn.mCircles = function(options) {
        var g = $(this);
        var ar1 = options.ar1;
        var ar2 = options.ar2;
        var offset = options.offset;

        for (var i = 0; i < ar1.length; i++) {


            i1 = i;
            i2 = i + offset;
            while (i2 < 0) {
                i2 += ar1.length;
            }
            while (i2 >= ar1.length) {
                i2 -= (ar1.length);
            }
            while (i2 >= ar2.length) {
                i2 -= (ar2.length);
            }
            var x1 = ar1[i1][0];
            var y1 = ar1[i1][1];
            var x2 = ar2[i2][0];
            var y2 = ar2[i2][1];
            var rad = distancebetween(x1, y1, x2, y2);
            try {
                var cir = g.circle({
                    cx: x1,
                    cy: y1,
                    r: rad
                });
                cir.setAttribute("pointer-events", "none");
            } catch (ex) {
                // // console.log("ERR ", i2, offset);
            }


        }
    }


    $.fn.circle = function(options) {

        var settings = {
            css: "default"
        }

        jQuery.extend(settings, options);
        //function circle(cx, cy, radius, css="thin_blue") {

        var cir = document.createElementNS(svgNS, 'circle'); //Create a path in SVG's namespace
        if (settings.css == "rand") {
            // do something great
            var r = random_between(20, 100);
            var g = random_between(20, 100);
            var b = random_between(80, 255);

            r = Math.floor(r);
            g = Math.floor(g);
            b = Math.floor(b);
            //    fill:rgb( 100 , 100 , 100 )
            var s = "fill:rgb(" + r + "," + g + "," + b + ")";
            // // // console.log("I created a string!");
            // // // console.log(s);


            cir.setAttribute("style", s);

        } else {
            cir.setAttribute("class", settings.css);
        }


        cir.setAttribute("cx", settings.cx);
        cir.setAttribute("cy", settings.cy);
        cir.setAttribute("r", settings.r);

        cir.setAttribute("pointer-events", "all");


        $(this).append(cir);

        return cir;
    }

    $.fn.path = function(options = {}) {
        var settings = {
            css: "default",
            ar: []
        };

        jQuery.extend(settings, options);
        console.log($(this));
        console.log("PATHIN");
        console.log(settings);
        var ar = options.ar;
        var path = document.createElementNS(svgNS, 'path'); //Create a path in SVG's namespace
        path.setAttribute("class", settings.css);
        console.log("oathing2");
        if (ar !== undefined && ar.length > 0) {
            var s = "M";
            for (var i = 0; i < ar.length; i += 2) {
                s += ar[i] + " " + ar[i + 1] + " L ";
            }
            s += ar[0] + " " + ar[1];
            path.setAttribute("d", s);
        }
        path = $(path);
        console.log(path);
        $(this).append(path);
        return path;
    }



    $.fn.line = function(options) {

        var settings = {
            css: "default"
        }

        jQuery.extend(settings, options);

        var x1 = settings.x1;
        var x2 = settings.x2;
        var y1 = settings.y1;
        var y2 = settings.y2;
        var css = settings.css;


        var line = document.createElementNS(svgNS, 'line'); //Create a line in SVG's namespace line.setAttribute("class",css);
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("class", css);


        $(this).append(line);
    }


    $.fn.makeMPoints = function(options) {

        var settings = {
            css: "default",
            offset: 0,
            rad: 300
        }

        jQuery.extend(settings, options);

        var n = settings.num;
        var offset = settings.offset;


        // var rad=settings.rad*nextRadiusRatio;
        // nextRadiusRatio*=.8;
        // if (nextRadiusRatio<.3) nextRadiusRatio=1;

        var rad = $("#mRadius").val();

    createHistory(`svg.makeMPoints({
        num: {0},
        offset: {1},
        rad: {2}
    });`.format(n,offset,rad));


        var p, p2, ar, d;
        p2 = Math.PI * 2;
        ar = [];
        var g = this.makeGroup();

        g.attr("radius", rad);

        // console.log("((((");
        // for (var i=0;i<=p2*1.05;i+=p2/n) {
        for (var i = 0; i < n; i++) {
            //d=i+p2/offset/n;
            d = (i / n) * p2 + p2 / n * offset;

            // d=i+p2/n *offset;
            var r = d;
            var angleDegrees=i/n*360;
            var x = Math.cos(r) * rad;
            var y = Math.sin(r) * rad;
            ar.push([x, y]);
            
            // these are coordinates... use laters?
            // var t = Math.round(x, 2) + ", " + Math.round(y, 2);
            var t=i;
            
            var g2=g.makeGroup();
            g2.attr("radius",rad);
            g2.attr("angle",r);
            g2.attr("angleDegrees",angleDegrees);
            g2.attr("index",i);
            g2.text({x:x+10,y:y+10,txt:t,css:"texthelper"});

            var o = {
                cx: x,
                cy: y,
                r: 10,
                css: "helper grouped"
            };
            var cir = g2.circle(o);

            var o = {
                cx: x,
                cy: y,
                r: 2,
                css: "grouped"
            };
            var cir = g2.circle(o);
            cir.setAttribute("pointer-events", "none");
            // // // console.log(x,y);
        }
        g.attr("pointindex", arPoints.length);
        arPoints.push(ar);

        var g2 = g.makeGroup();
        g2.attr("class", "compass");
        var o = {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 50,
            css: ""
        };
        g2.line(o);
        g.attr("points", "1");

        var e = $("#makeMLines");
        updateSels(e);

        // line(x1,y1,x2,y2,css,opacity);
        return this;

    }


    $.fn.text = function(options) {
    
    

    x=options.x;
    y=options.y;
    css=options.css;
    txt=options.txt;
    var t = document.createElementNS(svgNS, 'text'); //Create a path in SVG's namespace
    t.setAttribute("x",x); 
    t.setAttribute("y",y); 
    t.setAttribute("class",css);
    t.setAttribute("transform-origin","50% 50%;") ;
    t.setAttribute("transform","scale(1,-1)");
    $(t).html(txt);
    // t.setAttribute("transform","scale(1, -1)" );
    this.append(t);
    return t;

    }

    $.fn.grid = function(options) {

        // this.filter( "a" ).each(function() {
        //     var link = $( this );
        //     link.append( " (" + link.attr( "href" ) + ")" );
        // });

        // return this;

        var g = this.makeGroup();

        var w = $(this).attr("width") / 2;
        var h = $(this).attr("height") / 2;

        for (var x = -w; x <= w; x += options.small) {
            var o = {
                x1: x,
                y1: -h,
                x2: x,
                y2: h,
                css: "light1"
            };
            g.line(o);
        }
        for (var y = -h; y <= h; y += options.small) {
            var o = {
                x1: -w,
                y1: y,
                x2: w,
                y2: y,
                css: "light1"
            };
            g.line(o);
        }

        for (var x = -w; x <= w; x += options.big) {
            var o = {
                x1: x,
                y1: -h,
                x2: x,
                y2: h,
                css: "light2"
            };
            g.line(o);

        }

        for (var y = -h; y <= h; y += options.big) {
            // g.line(-w,y,w,y,css,.2);   
            var o = {
                x1: -w,
                y1: y,
                x2: w,
                y2: y,
                css: "light2"
            };
            g.line(o);

        }
        return this;

    };

    $.fn.makeGroup = function(options) {
        var g = document.createElementNS(svgNS, 'g'); //Create a line in SVG's namespace
        $(this).append(g);
        g = $(g);
        g.attr("groupindex", arObjs.length);
        g.attr("class", getClass());
        arObjs.push(g);
        return g;

    };


}(jQuery));

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

    var c = Math.sqrt(a * a + b * b);

    // c is the distance
    return c;

}

function slope(x1, y1, x2, y2) {
    var y3 = y1 - y2;
    var x3 = x1 - x2;
    var slope = y3 / x3;
    return slope;
}
// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ?
                args[number] :
                match;
        });
    };
}