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
var activeGroupIndex;
var dist2 = 0;
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
var arHistory = [];

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

    // makeTri();

    loaddata();
});


function loaddata() {
    var url = "post.php?action=loaddetails";
    url = cs(url);
    $.post(url)
    .done(function(data) {
        // console.log(data);
        $("#scriptResults").html(data);
    });

}

function makeTri() {

    var g = svg.makeGroup();
    g.attr("transform", "translate(-250,-300)");
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

function sierpinski(Ax, Ay, Bx, By, Cx, Cy, d, g) {
    if (d > 0) {
        var pointAx = (Bx + Cx) / 2;
        var pointAy = (By + Cy) / 2;

        var pointBx = (Ax + Cx) / 2;
        var pointBy = (Ay + Cy) / 2;

        var pointCx = (Ax + Bx) / 2;
        var pointCy = (Ay + By) / 2;

        var d2 = d - 1;
        sierpinski(Ax, Ay, pointBx, pointBy, pointCx, pointCy, d2, g);
        sierpinski(pointCx, pointCy, pointAx, pointAy, Bx, By, d2, g);
        sierpinski(pointBx, pointBy, pointAx, pointAy, Cx, Cy, d2, g);
    } else {

        // g.line({x1:Ax, y1:Ay, x2:Bx, y2:By});
        // g.line({x1:Bx, y1:By, x2:Cx, y2:Cy});
        // g.line({x1:Ax, y1:Ay, x2:Cx, y2:Cy});

        var pat = g.path();
        var params = "M {0} {1} L {2} {3} L {4} {5} z".format(Ax, Ay, Bx, By, Cx, Cy);
        // console.log(params);
        pat.setPath(params);
    }
}


function drawSierpinski(g) {
    var midPointX = width / 2;
    var midPointY = height / 2;

    var deep = 4;

    var ri = (size / 6) * Math.sqrt(3);
    var ru = (size / 3) * Math.sqrt(3);

    var pointAx = midPointX - (size / 2);
    var pointAy = midPointY + ri;

    var pointBx = midPointX + (size / 2);
    var pointBy = midPointY + ri;

    var pointCx = midPointX;
    var pointCy = midPointY - ru;
    console.log(pointAx, pointAy, pointBx, pointBy, pointCx, pointCy);
    sierpinski(pointAx, pointAy, pointBx, pointBy, pointCx, pointCy, deep, g);
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


function setActiveGroup(i) {
    activeGroupIndex = i;
    activeGroup = $("svg").find("g[groupindex=" + i + "]").eq(0);
}

function toggleHelpers() {
    $(".ishelper").toggle();
}

function clearMe() {
    makeHistory("clearSVG();");
}

function clearSVG() {
    svg.empty();
}

function tryeval(s) {
    try {
        eval(s);
        return true;
    } catch (ex) {
        console.log("-- WHOOPS --");
        console.log(s);
        console.log(ex);
        return false;
    }
}

function makeHistory(s) {
    createHistory(s);
    tryeval(s);
}

function drawCircle(x, y, r) {
    var g = svg.makeGroup();
    g.circle({
        cx: x,
        cy: y,
        r: r
    });

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

function addCircle(g) {
    return g.circle({
        cx: 0,
        cy: 0,
        r: 0
    });
}
var fracGroup;
var fracPoints = [];

function beginFractal() {

    showMenu("makeFractal");
    fracPoints = [];
    fracGroup = svg.makeGroup();
    var c1 = addCircle(fracGroup);
    fracPoints.push(c1);
    console.log(c1);
    c = addCircle(fracGroup);
    fracPoints.push(c);
    console.log(c);
    setMode("frac1");
    setStatus("Set first point.");
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
$(document).on('click', '.reverse', function() {

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
    scrollHistory();
}

function scrollHistory() {
    $("#history").animate({
        scrollTop: $('#history')[0].scrollHeight - $('#history')[0].clientHeight
    }, 500);

}

function addHistory(s) {
    arHistory.push(s);
    tryeval(s);
    $("#history").html("<p>" + arHistory.join("</p><p>") + "</p>");
}

function createHistory(s) {

    var url = "post.php?action=saveStep&detail=" + s;
    url = cs(url);
    $.post(url)
        .done(function(data) {
            $("#scriptResults").html(data);

            arHistory.push(s);

            $("#history").html("<p>" + arHistory.join("</p><p>") + "</p>");

        });
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
        case "frac1":
            showMenu("makeFractal2");
            c = addCircle(fracGroup);
            fracPoints.push(c);
            setMode("frac2");
            break;
        case "frac2":
            showMenu("makeFractal3");
            c = addCircle(fracGroup);
            fracPoints.push(c);
            setMode("frac3");
            break;
        case "frac3":
            showMenu("makeFractal4");
            var pat = fracGroup.path();
            var Ax = fracPoints[1].getAttribute("cx");
            var Ay = fracPoints[1].getAttribute("cy");
            var Bx = fracPoints[2].getAttribute("cx");
            var By = fracPoints[2].getAttribute("cy");
            var Cx = fracPoints[3].getAttribute("cx");
            var Cy = fracPoints[3].getAttribute("cy");
            var params = "M {0} {1} Q {2} {3}  {4} {5} z".format(Ax, Ay, Bx, By, Cx, Cy);
            // console.log(params);
            pat.setPath(params);

            setMode("frac4");
            break;

        case "circle":
            setMode("circle2");
            showMenu("makeCircle2");
            break;
        case "circle2":
            setMode("");
            hideMenus();
            var s = "drawCircle({0},{1},{2});".format(c.getAttribute("cx"), c.getAttribute("cy"), c.getAttribute("r"));
            makeHistory(s);
            break;
        case "pointResize":
            setMode("");
            setStatus("");
            setRadius(groupRadius);
            break;
    }
});

function setRadius(groupRadius) {
    activeGroupIndex = activeGroup.attr("groupindex");
    makeHistory("setGroupRadius(" + groupRadius + ", " + dist2 + ")");
    $(activeGroup).find("g").attr("radius",groupRadius);
}

function setGroupRadius(groupRadius, dist2 = 0) {
    activeGroup.attr("radius", groupRadius);
    activeGroup.find(".grouped").each(function() {
        var gp = $(this).parent();
        var angle = parseFloat(gp.attr("angle"));
        var angleDegrees = parseFloat(gp.attr("angleDegrees"));

        var index = gp.attr("index");
        var cx, cy;
        if (dist2 > 0) {
            angleDegrees += dist2;
            angle = angleDegrees / 360 * Math.PI * 2;
        }
        cx = Math.cos(angle) * groupRadius;
        cy = Math.sin(angle) * groupRadius;

        $(this).attr("radius", groupRadius);
        $(this).attr("cx", cx);
        $(this).attr("cy", cy);
        var t = gp.find("text");
        // console.log(i);
        // console.log(t);
        t.attr("x", cx);
        t.attr("y", -cy);
        t.html(index + ": " + Math.floor(angleDegrees));


    });
    activeGroup.find(".compass").attr("transform", "rotate(" + dist2 + ")");
    var i = parseInt(activeGroup.attr("pointindex"));
    activeGroup.find(".grouped").each(function(index) {
        var ii = parseInt($(this).parent().attr("index"));
        // console.log(index, ii);
        arPoints[i][ii] = [parseFloat($(this).attr("cx")), parseFloat($(this).attr("cy"))];
    });

}
// for point resize

$(document).on('click', ".grouped", function(event) {

    if (mode == "pointResize") {
        return;
    } else {
        dist2 = 0;
        activeGroup = $(this).parent().parent();
        activeGroupIndex = activeGroup.attr("groupindex");
        makeHistory("setActiveGroup(" + activeGroupIndex + ");");
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
    setStatus("Group " + p.attr("pointindex") + ". Click to move group.");
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
    if (mode == "circle" || mode == "frac1" || mode == "frac2" || mode == "frac3") {
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
        if (pressed) dist2 = parseFloat(dist * .3);
        activeGroup.find(".grouped").each(function() {
            var gp = $(this).parent();
            var angle = parseFloat(gp.attr("angle"));
            var angleDegrees = parseFloat(gp.attr("angleDegrees"));
            groupRadius = parseFloat(gp.attr("radius"));
            var index = gp.attr("index");
            var cx, cy;
            if (pressed) {
                // dist = Math.floor(dist / 15) * 15;

                angleDegrees += dist2;
                // ox=x;
                // oy=y;
                angle = angleDegrees / 360 * Math.PI * 2;

            } else {
                groupRadius += dist;

            }
            cx = Math.cos(angle) * groupRadius;
            cy = Math.sin(angle) * groupRadius;

            $(this).attr("cx", cx);
            
            $(this).attr("cy", cy);
            var t = gp.find("text");
            // console.log(i);
            // console.log(t);
            t.attr("x", cx);
            t.attr("y", -cy);
            t.html(index + ": " + Math.floor(angleDegrees));


        });
        activeGroup.attr("groupRadius", groupRadius);
        activeGroup.find(".compass").attr("transform", "rotate(" + dist2 + ")");
        console.log(dist2);
    }

});

$(document).on('click', '#btnMakeFractal', function() {
    var p = $("#mFracPoints").val();
    svg.makeFractal({
        ar: fracPoints,
        level: 4,
        p: p

    });

});


$(document).on('click', '#btnMakePoints', function() {
    var p = $("#mPoints").val();
    var o = $("#mOffset").val();
    var rad = $("#mRadius").val();

    makeHistory(`svg.makeMPoints({
            num: {0},
            offset: {1},
            rad: {2}
        });`.format(p, o, rad));


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
    // <div action="toggleHelpers">Hel<span class=underline>p</span>ers</div>
    try {
        var t = $("span.underline:contains('" + e.key + "')");
        if (t.length == 0) {
            t = $("span.underline:contains('" + e.key.toUpperCase() + "')");
        }
        t = t.parent();
        var a = t.attr("action");
        console.log(t);
        console.log(a);
        if (tryeval(a + "()"))
            return;
    } catch (ex) {
        console.log(ex);
    }

    console.log("continuing");
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
            // case "c":
            //     beginCircle();
            //     break;
            // case "f":
            //     beginFractal();
            //     break;
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
            // case "h":
            //     viewHistory();
            //     break;
            // case "e":
            //     goHome();
            //     break;
        case "u":
            makeHistory("undo();");
            break;

    }
});

function goHome() {
    location.href = "index.php";
}

function undo() {
    if (arObjs.length > 0) {
        var o = arObjs.pop();
        o.remove();
        var e = $("#makeMLines");
        updateSels(e);

    }

}

$(document).on('click', '#makeClasses input', function() {
    console.log($(this));
    var s = $(".sample");
    var c = $(this).parent().attr("class");
    var a = $(this).attr("class");
    if (c == "stroke") {

        makeHistory("setStroke(\"" + a + "\")");
    } else {

        makeHistory("setFill(\"" + a + "\")");
    }

    s.attr("class", "sample " + getClass());
});

function setStroke(a) {
    class_stroke = a;
}

function setFill(a) {
    class_fill = a;
}
$(document).on('click', '#btnMakeGrid', function() {
    var b = parseInt($("#mGridBig").val());
    var s = parseInt($("#mGridSmall").val());
    makeHistory(`svg.grid({
        big: {0},
        small: {1}
    });`.format(b, s));

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
    var s = "drawMCircleRow({0},{1},{2})".format(o["g1"], o["g2"], o["offset"]);
    makeHistory(s);


});

function drawMCircleRow(g1, g2, offset) {
    var g = svg.makeGroup();
    g.mCircleRow({
        ar1: arPoints[g1],
        ar2: arPoints[g2],
        offset: offset
    });
}

$(document).on('click', '#btnDrawMCircles', function() {
    o = getOptions($(this));
    var s = "drawMCircles({0},{1},{2})".format(o["g1"], o["g2"], o["offset"]);
    makeHistory(s);

});

var o;
$(document).on('click', '#btnDrawMLines', function() {
    o = getOptions($(this));
    var s = "drawMLines({0},{1},{2});".format(o["g1"], o["g2"], o["offset"]);
    makeHistory(s);

});

function drawMCircles(g1, g2, offset) {
    var g = svg.makeGroup();


    g.mCircles({
        ar1: arPoints[g1],
        ar2: arPoints[g2],
        offset: offset
    });

}

function drawMLines(g1, g2, offset) {
    var g = svg.makeGroup();
    g.mLines({
        ar1: arPoints[g1],
        ar2: arPoints[g2],
        offset: offset
    });

}

function drawMCurves(g1, g2, g3, offset1, offset2) {
    var g = svg.makeGroup();

    g.mCurves({
        ar1: arPoints[g1],
        ar2: arPoints[g2],
        ar3: arPoints[g3],
        offset1: offset1,
        offset2: offset2
    });

}
$(document).on('click', '#btnDrawMCurves', function() {
    o = getOptions($(this));
    var s = "drawMCurves({0},{1},{2},{3},{4})".format(o["g1"], o["g2"], o["g3"], o["offset1"], o["offset2"]);
    makeHistory(s);
});



(function($) {
    $.fn.removeAttr = function(options) {
        var p = options.p;
        var v = options.v;

        try {
            var f = this.attr(p);

            // console.log("Existing1 : " + f);
            if (f === undefined) f = "";
            f = f.replace(v, "").trim();
            this.attr(p, f.trim());

        } catch (ex) {
            var f = this.getAttribute(p);
            // console.log("Existing2 : " + f);
            if (f === null) f = "";
            f = f.replace(v, "").trim();

            this.attr(p, f.trim());
        }
    }
    $.fn.addAttr = function(options) {
        var p = options.p;
        var v = options.v;
        //
        // console.log("add attr");
        // console.log(this);
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
                // console.log(d);

                var p = g.path();
                p.attr("pointer-events", "none");
                // console.log(p);
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
        // console.log(options);
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
                    // console.log(ii);
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
        // console.log($(this));
        // console.log("PATHIN");
        // console.log(settings);
        var ar = options.ar;
        var path = document.createElementNS(svgNS, 'path'); //Create a path in SVG's namespace
        path.setAttribute("class", settings.css);
        // console.log("oathing2");
        if (ar !== undefined && ar.length > 0) {
            var s = "M";
            for (var i = 0; i < ar.length; i += 2) {
                s += ar[i] + " " + ar[i + 1] + " L ";
            }
            s += ar[0] + " " + ar[1];
            path.setAttribute("d", s);
        }
        path = $(path);
        // console.log(path);
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

    $.fn.makeFractal2 = function(options) {}
    $.fn.makeFractal = function(options) {
        var ar = options.ar;
        var level = options.level;
        var n = options.p;

        console.log(level);
        if (level <= 2) return;

        var X0 = parseFloat(ar[0].getAttribute("cx"));
        var Y0 = parseFloat(ar[0].getAttribute("cy"));
        var X1 = parseFloat(ar[1].getAttribute("cx"));
        var Y1 = parseFloat(ar[1].getAttribute("cy"));
        var X2 = parseFloat(ar[2].getAttribute("cx"));
        var Y2 = parseFloat(ar[2].getAttribute("cy"));
        var X3 = parseFloat(ar[3].getAttribute("cx"));
        var Y3 = parseFloat(ar[3].getAttribute("cy"));

        // console.log("COORS");
        // console.log(Math.floor(X0), Math.floor(Y0), 
        //     Math.floor(X1), Math.floor(Y1),
        //     Math.floor(X2), Math.floor(Y2),
        //     Math.floor(X3), Math.floor(Y3));
        var rad1 = distancebetween(X0, Y0, X1, Y1);
        var rad2 = distancebetween(X0, Y0, X2, Y2);
        var rad3 = distancebetween(X0, Y0, X3, Y3);

        var angr1 = Math.atan2(Y1, X1);
        var angr2 = Math.atan2(Y2, X2);
        var angr3 = Math.atan2(Y3, X3);

        var ang1 = Math.atan2(Y1, X1) * 180 / Math.PI;
        var ang2 = Math.atan2(Y2, X2) * 180 / Math.PI;
        var ang3 = Math.atan2(Y3, X3) * 180 / Math.PI;

        createHistory(`svg.makeFractal({
           {0} {1} {2}
        });`.format(ang1, ang2, ang3));



        var p, p2, ar, d;
        p2 = Math.PI * 2;

        var g = this.makeGroup();


        // console.log("((((");
        // for (var i=0;i<=p2*1.05;i+=p2/n) {
        var d0 = distancebetween(X0, Y0, X1, Y1);
        var d1 = distancebetween(X1, Y1, X3, Y3);
        var d2 = distancebetween(X0, Y0, X2, Y2);
        var d3 = distancebetween(X0, Y0, X3, Y3);

        var ra = d1 / d0;
        var r1 = d1;
        var r2 = d2;
        var r3 = d3;


        for (var i = 0; i < n; i++) {
            console.log("I" + i);
            //d=i+p2/offset/n;
            d = (i / n) * p2;

            var x1, y1, x2, y2, x3, y3;
            x1 = Math.cos(angr1 + d) * rad1 + X0;
            y1 = Math.sin(angr1 + d) * rad1 + Y0;
            x2 = Math.cos(angr2 + d) * rad2 + X0;
            y2 = Math.sin(angr2 + d) * rad2 + Y0;
            x3 = Math.cos(angr3 + d) * rad3 + X0;
            y3 = Math.sin(angr3 + d) * rad3 + Y0;

            var pa = g.path();
            var params = "M {0} {1} Q {2} {3} {4} {5} z".format(x1, y1, x2, y2, x3, y3);
            // console.log(params);
            pa.setPath(params);



            // var d1=distancebetween(X1, Y1, X2, Y2);
            // var d2=distancebetween(X3, Y3, X1, Y1);
            // var d3=distancebetween(X3, Y3, X1, Y1);

            var mx1 = Math.cos(angr1) * r1 + x1;
            var my1 = Math.sin(angr1) * r1 + y1;
            var mx2 = Math.cos(angr2) * ra * r2 + x2;
            var my2 = Math.sin(angr2) * ra * r2 + y2;
            var mx3 = Math.cos(angr3) * ra * r3 + x3;
            var my3 = Math.sin(angr3) * ra * r3 + y3;

            // g.text({x:100,y:100,txt:"10",css:"texthelper2"});
            // g.text({x:mx1+10,y:my1+10,txt:"t1",css:"texthelper2"});
            // g.text({x:mx2+10,y:my2+10,txt:"t2",css:"texthelper2"});
            // g.text({x:mx3+10,y:my3+10,txt:"t3",css:"texthelper2"});

            // console.log("%%");
            // console.log(ra.toFixed(10), r1.toFixed(3), r2.toFixed(3), r3.toFixed(3));
            // console.log(d0.toFixed(3), d1.toFixed(3), d2.toFixed(3), d3.toFixed(3));
            // console.log(angr1.toFixed(3));
            // console.log(mx1.toFixed(3), 
            //     my1.toFixed(3), 
            //     mx2.toFixed(3), 
            //     my2.toFixed(3), 
            //     mx3.toFixed(3), 
            //     my3.toFixed(3));

            var ar2 = [];
            var c = g.circle({
                cx: x3,
                cy: y3,
                r: 0,
                css: "helper2"
            });
            ar2.push(c);

            var c = g.circle({
                cx: mx1,
                cy: my1,
                r: 0,
                css: "helper2"
            });
            ar2.push(c);
            var c = g.circle({
                cx: mx2,
                cy: my2,
                r: 0,
                css: "helper2"
            });

            ar2.push(c);
            var c = g.circle({
                cx: mx3,
                cy: my3,
                r: 0,
                css: "helper2"
            });

            ar2.push(c);

            var l2 = level - 1;
            console.log("Level ", level, " L2 ", l2);
            svg.makeFractal({
                ar: ar2,
                level: l2,
                p: n

            });


        }
        g.attr("pointindex", arPoints.length);
        arPoints.push(ar);



        // // // console.log(x,y);

        // create the next group
        // console.log("%%%%%%")
        // console.log(ar2);



        // line(x1,y1,x2,y2,css,opacity);
        return this;

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
        var rad = settings.rad;


        // var rad=settings.rad*nextRadiusRatio;
        // nextRadiusRatio*=.8;
        // if (nextRadiusRatio<.3) nextRadiusRatio=1;






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
            var angleDegrees = i / n * 360;
            var x = Math.cos(r) * rad;
            var y = Math.sin(r) * rad;
            ar.push([x, y]);

            // these are coordinates... use laters?
            // var t = Math.round(x, 2) + ", " + Math.round(y, 2);
            var t = i;

            var g2 = g.makeGroup();
            g2.attr("radius", rad);
            g2.attr("angle", r);
            g2.attr("angleDegrees", angleDegrees);
            g2.attr("index", i);
            g2.text({
                x: x + 10,
                y: y + 10,
                txt: t,
                css: "texthelper ishelper"
            });

            var o = {
                cx: x,
                cy: y,
                r: 10,
                css: "helper grouped "
            };
            var cir = g2.circle(o);

            var o = {
                cx: x,
                cy: y,
                r: 2,
                css: "grouped ishelper"
            };
            var cir = g2.circle(o);
            cir.setAttribute("pointer-events", "none");
            // // // console.log(x,y);
        }
        g.attr("pointindex", arPoints.length);
        arPoints.push(ar);

        var g2 = g.makeGroup();
        g2.attr("class", "compass ishelper");
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
        x = options.x;
        y = options.y * -1;
        css = options.css;
        txt = options.txt;
        var t = document.createElementNS(svgNS, 'text'); //Create a path in SVG's namespace
        t.setAttribute("x", x);
        t.setAttribute("y", y);
        t.setAttribute("class", css);
        t.setAttribute("transform-origin", "50% 50%;");
        t.setAttribute("transform", "scale(1,-1)");
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
//  return this.each(function() {
//      console.log($(this));
//      return;
//     var line = document.createElementNS(svgNS, 'line'); //Create a line in SVG's namespace line.setAttribute("class",css);
//     line.setAttribute("x1",x1); 
//     line.setAttribute("y1",y1); 
//     line.setAttribute("x2",x2); 
//     line.setAttribute("y2",y2); 
//     line.setAttribute("style","opacity:" + opacity); 

//     $(this).append(line);
//  });
// },



//  makeGroup: function() {
//     return this.each(function() {

//      var g = document.createElementNS(svgNS, 'g'); //Create a line in SVG's namespace
//      $(this).append(g);
//      g=$(g);
//      console.log(g);
// g="FF";
//      return g;

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
//      var w=e.attr("width")/2;
//      var h=e.attr("height")/2;



//      var g2=e.makeGroup();
//      console.log("G@");
//      console.log(g2);
//      return;
//      g.line(0,0,1,1);
//      return;
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
//      svg=e;
//      return g;
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

function calcAngleDegrees(x, y) {
    return Math.atan2(y, x) * 180 / Math.PI;
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

var urlPrefix = "http://localhost:8888/mandalaz/php/";

function cs(s) {
    console.log("-= Posting: =- ");
    console.log(urlPrefix + s);
    return urlPrefix + s;
}

function publish() {
     var url = "post.php?action=publish";
    url = cs(url);
    $.post(url, {
        svg:$("#svgb").html()
    })

        .done(function(data) {
             console.log(data);
            $("#scriptResults").html(data);
        });
   
}

function isPublished() {
    $("#btnPublish").addClass("published");
}
function isNotPublished() {

}