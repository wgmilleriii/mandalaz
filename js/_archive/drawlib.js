var svgNS;
var svg;
var svg0;
var svgHeight=600;
var svgWidth=800;


var c;
var mode="";
var objs=[];


$(document)

// console.log(x,y);

Object.prototype.circle = function(cx, cy, radius, css="thin_blue") {
    svg=this;
    var s=svg;
    var p=circle(cx, cy, radius, css);
    svg=s;
    return p;

};


Object.prototype.curveTo = function(ar1, ar2, ar3, offset=0) {
    svg=this;
    var i1, i2, d , p;
    for (var i=0;i<ar1.length;i++) {
        i1=i;
        i2=i+offset;
        if (i2<0) i2+=ar1.length;
        if (i2>=ar1.length) i2-=(ar1.length);
        n=i+offset;
        try {
        d="M " + ar1[i1][0] + " " + ar1[i1][1] 
            + " Q " + ar2[i1][0] + " " + ar2[i1][1] 
            + " " + ar3[i2][0] + " " + ar3[i2][1];
        p=svg.path();
        // // // console.log(d);
        p.setPath(d);

        }
        catch (err) {
            // // console.log("ERRR " , i2, offset);
        }

        // svg.line(ar1[i1][0], ar1[i1][1], ar2[i2][0],ar2[i2][1]);
    }
};

Object.prototype.mLineTo = function(ar1, ar2, offset=0) {
    svg=this;
    var i1, i2;
    var s=$(this);
    var par=s.find(".par");
    if (par.length==0) {
        var ng=svg.makeGroup();
        $(ng).addAttr("class","par");
        svg=ng;
    } else {
        svg=par[0];
    }

    for (var i=0;i<ar1.length;i++) {
        var ch=$(svg).find(".ch" + i);
        var g=svg;
        if (ch.length==0) {
            ch=g.makeGroup();
            $(ch).attr("class","default ch" + i);
        } else {
            ch=ch[0];
        }
        
        
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
        n=i+offset;
        try {
            ch.line(ar1[i1][0], ar1[i1][1], ar2[i2][0],ar2[i2][1]);
        }
        catch (ex) {
            // // console.log("ERR ", i2, offset);
        }

        svg=g;
    }
};



Object.prototype.mCurveTo = function(ar1, ar2, ar3, offset1=0, offset2=0) {
    svg=this;
    var i1, i2;
    var s=$(this);
    var par=s.find(".par");
    if (par.length==0) {
        var ng=svg.makeGroup();
        $(ng).addAttr("class","par");
        svg=ng;
    } else {
        svg=par[0];
    }

    for (var i=0;i<ar1.length;i++) {
        var ch=$(svg).find(".ch" + i);
        var g=svg;
        if (ch.length==0) {
            ch=g.makeGroup();
            $(ch).attr("class","thin_grey ch" + i);
        } else {
            ch=ch[0];
        }
        
        
        i1=i;
        i2=i+offset1;
        i3=i+offset1+offset2;
        while (i2<0) {
            i2+=ar1.length;
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
            p=svg.path();
            // // // console.log(d);
            p.setPath(d);

        }
        catch (ex) {
            // // console.log("ERR ", i2, offset);
        }

        svg=g;
    }
};

Object.prototype.makeMandalaPoints = function(rad,n, offset=0) {
    svg=this;
    // // // console.log("==");
    var p, p2, ar, d;
    p2=Math.PI*2 ;
    ar=[];
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
        text(x,y,t);
        // // // console.log(x,y);
    }
    // line(x1,y1,x2,y2,css,opacity);
    return ar;
};


Object.prototype.fill = function() {
    // // // console.log(this);

    el=this;
    try {
        var i=this.length;
    } catch (ex) {
        el=$(this);
    }
     el.find(".thin_grey").each(function( index ) {
        $(this).attr("itt",index);
       var l=$(this).find("line");
       var d="M ";
        l.each(function( index ) {
            d+=$(this).attr("x1") + " " + $(this).attr("y1") + " L " + 
            $(this).attr("x2") + " " + $(this).attr("y2") + " ";
        });
 
        var g=this.parentElement.makeGroup();
        var p=g.path();
        p.setPath(d);
        p.setClass("red_solid");
     });

};


Object.prototype.line = function(x1,y1,x2,y2,css="", opacity=1) {
    svg=this;
    line(x1,y1,x2,y2,css,opacity);
};

Object.prototype.path = function(ar) {
    svg=this;
    var s=svg;
    var p=path(ar);
    svg=s;
    return p;
};
Object.prototype.copy=function() {
    var c=$(this).clone();
    $(this).parent().append(c);
    return c;
};

Object.prototype.scale=function(x,y=false) {
    if (!y) y=x;
    this.addAttr("transform","scale(" + x + "," + y + ")");
};

Object.prototype.rotate=function(deg) {
    this.addAttr("transform","rotate(" + deg + ")");
};

Object.prototype.transform=function(v) {
    this.addAttr("transform",v);
};
Object.prototype.removeAttr=function(p) {
      try {
        var f=this.attr(p);
        // // console.log("Existing1 : " + f);
        if (f===undefined) f="";
        //this.attr(p,(f + " " + v).trim());
        //var f=this.attr(p);
        // // console.log("Existing11 : " + f);

    } 
    catch (ex) {
        var f=this.getAttribute(p);
        // // console.log("Existing2 : " + f);
        if (f===null) f="";
        this.removeAttribute(p);

    }
};
Object.prototype.addAttr=function(p,v) {
    try {
        var f=this.attr(p);
        // // console.log("Existing1 : " + f);
        if (f===undefined) f="";
        this.attr(p,(f + " " + v).trim());
        var f=this.attr(p);
        // // console.log("Existing11 : " + f);

    } 
    catch (ex) {
        var f=this.getAttribute(p);
        // // console.log("Existing2 : " + f);
        if (f===null) f="";
        this.setAttribute(p,(f + " " + v).trim());

    }
};
Object.prototype.clip = function(n) {
    // console.log(this);
    // console.log("CLIP");
    
    len=this.length;
    
    var defs=$(this).closest("svg").find("defs");

    this.each(function( index=1 ) {
        // // console.log(index);
        
        var g=defs[0].makeClipPath();
        // // console.log("^^^");
        
        g.addAttr("id","clip" + index);
        // g.addAttr("clipPathUnits","userSpaceOnUse");
        // var c=circle(0,0,1000,"white");
        // c.addAttr("fill","white");
        // $(g).append(c);
        var e=$(this).clone();
        $(g).append(e);
        e.addAttr("fill","black");
        
        var in2=index*1+n*1;
        if (in2>=len) in2-=len;
        if (in2<0) in2+=len;
        // console.log(index, in2);
         $(this).attr("clip-path","url(#clip" + in2 + ")");
    });

};


Object.prototype.mask = function(n) {
    // console.log(this);
    // console.log("MASK");
    
    len=this.length-1;
    
    var defs=$(this).closest("svg").find("defs");

    this.each(function( index=1 ) {
        // // console.log(index);
        
        var g=defs[0].makeMask();
        // // console.log("^^^");
        
        g.addAttr("id","mask" + index);
        // g.addAttr("clipPathUnits","userSpaceOnUse");
        var c=circle(0,0,1000,"white");
        c.addAttr("fill","white");
        $(g).append(c);
        var e=$(this).clone();
        e.removeAttr("class");
        $(g).append(e);
        e.addAttr("fill","black");
        
        var in2=index*1+n*1;
        if (in2>len) in2-=len+1;
        if (in2<0) in2+=len;
        // console.log(index, in2);
         $(this).attr("mask","url(#mask" + in2 + ")");
    });

};
Object.prototype.mandala = function(n, offset=0) {
    var el=$(this).parent();
    var par=el.find(".par");
    // // // console.log(par);
    // // // console.log("%%");
    if (par.length==0) {
        // // console.log("Making initial group");
        var ng=el[0].makeGroup();
        // // console.log(ng);
        $(ng).addAttr("class","par");
        svg=ng;
    } else {
        svg=par[0];
    }
    var g=svg.makeGroup();
    for (var i=0;i<n;i++) {
        var c=$(this).clone();
        var r=i/n * 360 + 360/n*offset;
        c.rotate(r);
        $(g).append(c);
    }
   $(this).remove();
   return g;
};

Object.prototype.setClass = function(d) {
    this.setAttribute("class",d);
};

Object.prototype.setPath = function(d) {
   this.setAttribute("d",d);
}
Object.prototype.showPath = function() {

    var d=this.getAttribute("d");
    var ar=d.split(" C ");
    if (ar.length>0) {

        
        var n = ar.map(function mapper(v,i,a){
            if(typeof v == "string"){
                return v.split(",");
            } else {
                return v.map(mapper);
            }
        });
        if (n.length>0 && typeof n[1] !== 'undefined') {
            var par=this.parentElement;
            var p=par.path();
            p.setPath(ar[0] + " L " + n[1][0]);
            p.setClass("red");

            
            var car=ar[0].replace("M ","").split(" ");
            var c=par.circle(car[0],car[1],1);
            c.setClass("red");        

            var car=n[1][0].replace("M ","").split(" ");
            var c=par.circle(car[0],car[1],1);
            c.setClass("red");        

            var p=par.path();
            p.setPath("M " + n[1][1] + " L " + n[1][2]);
            p.setClass("red");

            // // console.log(n[1][1]);
            
            var car=n[1][1].split(" ");
            // // console.log(car);
            var c=par.circle(car[1],car[2],1);
            c.setClass("red");        

            var car=n[1][2].split(" ");
            // // console.log(car);
            var c=par.circle(car[1],car[2],1);
            c.setClass("red");        


        }
    }

    var ar=d.split(" Q ");
    if (ar.length>1) {

        
          
        var par=this.parentElement;
        var m1=ar[0].replace("M ","").split(" ");
        var m2=ar[1].split(" ");

        var p=par.path();
        p.setPath("M " + m1[0] + " " + m1[1] + " L " + m2[0] + " " + m2[1] + " L " + m2[2] + " " + m2[3]);
        p.setClass("red");


        var c=par.circle(m1[0],m1[1],1);
        c.setClass("red");        
        var c=par.circle(m2[0],m2[1],1);
        c.setClass("red");        
        var c=par.circle(m2[2],m2[3],1);
        c.setClass("red");        

        


    
    }
};

Object.prototype.move = function(x,y) {
    this.addAttr("transform","translate(" + x + "," + y + ")");
};
    

Object.prototype.makeGroup = function() {
    // // console.log("MG");
    // // console.log(typeof(this));
    svg=this;
    var s=svg;
    var p=makeGroup();
    svg=s;
    return p;
};

Object.prototype.makeClipPath = function() {
    // // console.log("MG");
    // // console.log(typeof(this));
    svg=this;
    var s=svg;
    var p=makeClipPath();
    svg=s;
    return p;
};

Object.prototype.makeMask = function() {
    // // // console.log("MG");
    // // // console.log(typeof(this));
    svg=this;
    var s=svg;
    var p=makeMask();
    svg=s;
    return p;
};


Object.prototype.grid = function(big, small, css="thin_grey") {



    var e=this;
    var w=e.getAttribute("width")/2;
    var h=e.getAttribute("height")/2;

    var g=e.makeGroup();

    for (var x=-w;x<=w;x+=small) {
        g.line(x,-h,x,h,css,.1);
     
    }
    for (var y=-h;y<=h;y+=small) {
        g.line(-w,y,w,y,css,.1);   
    }


    for (var x=-w;x<=w;x+=big) {
        g.line(x,-h,x,h,css,.2);
    }

    for (var y=-h;y<=h;y+=big) {
        g.line(-w,y,w,y,css,.2);   
    }
    svg=e;
    return g;
};


$( document ).ready(function() {
    svgNS="http://www.w3.org/2000/svg";
    svg=document.getElementById("svg1");
    defs0=document.getElementById("defs0");


    document.addEventListener('keypress', function (e) {
        console.log(e);
        switch (e.key) {
            case "c": 
                c=svg.circle(100,100,100);
                mode="circle";
                break;
            case "u": 
                c=objs.pop();
                c.remove();
        }
    });


    document.addEventListener('click', function (e) {
    // $(document).on('onclick', 'svg', function (e) {
        // console.log(e);
        console.log(e.target);
        console.log(e.offsetX-400,e.offsetY-300);
        if (mode=="circle2") {
            mode="";
            objs.push(c);
        }

        if (mode=="circle") {
            mode="circle2";
        }
    });

    document.addEventListener('mousemove', function (evt) {
        // console.log(e);

    var x = evt.pageX - $('#svgb').offset().left;
    var y = evt.pageY - $('#svgb').offset().top;    
    console.log(x,y);

    x-=svgWidth/2;
    y=(y-svgHeight/2)*-1;

    if (mode=="circle") {
        c.setAttribute("cx",x);
        c.setAttribute("cy",y);
    }

    if (mode=="circle2") {
        var g=Math.abs(x-c.getAttribute("cx"));
        console.log(g);
        c.setAttribute("r",g);
        
    }

    });

});



function rectline(x, y, w, h) {

    // line (x1, y1, x2,  y2);
    line (x, y, x+w , y);
    line (x+w, y, x+w, y-h);
    line (x+w, y-h, x, y-h);
    line (x, y-h, x, y);

}


function flipY(y) {
    return y;
    return svgHeight-y;
}

/*

<linearGradient id="ReflectGradientY1" spreadMethod="reflect" x1="0" x2="0" y1="0" y2="0.0625" >
      <stop offset="0%"  stop-color="#ffa472"/>
      <stop offset="100%" stop-color="#301f15" stop-opacity="0"/>
</linearGradient>

*/

function makeGradient(id, color1, color2, x1, x2, y1, y2, tr_x, tr_y, mid=.5) {
    
    var lg = document.createElementNS(svgNS, 'linearGradient');
    lg.setAttribute("id",id); 
    lg.setAttribute("spreadMethod","reflect"); 
    lg.setAttribute("x1",x1); 
    lg.setAttribute("y1",y1); 
    lg.setAttribute("x2",x2); 
    lg.setAttribute("y2",y2); 
    gradientTransform="translate(" + tr_x + "," + tr_y + ")";
    lg.setAttribute("gradientTransform",gradientTransform); 


    var stop1=document.createElementNS(svgNS, 'stop');
    stop1.setAttribute("offset",0); 
    stop1.setAttribute("stop-color",color1); 
    lg.appendChild(stop1);


    // var stop2=document.createElementNS(svgNS, 'stop');
    // stop2.setAttribute("offset",mid*.8); 
    // stop2.setAttribute("stop-color",color1); 
    // lg.appendChild(stop2);

    var stop3=document.createElementNS(svgNS, 'stop');
    stop3.setAttribute("offset",mid); 
    stop3.setAttribute("stop-color",color2); 
    stop3.setAttribute("stop-opacity","0"); 
    lg.appendChild(stop3);

    // var stop4=document.createElementNS(svgNS, 'stop');
    // stop4.setAttribute("offset",mid*1.2); 
    // stop4.setAttribute("stop-color",color1); 
    // lg.appendChild(stop4);


    var stop5=document.createElementNS(svgNS, 'stop');
    stop5.setAttribute("offset",1); 
    stop5.setAttribute("stop-color",color1); 
     
    lg.appendChild(stop5);


    defs0.appendChild(lg);
}



function line(x1,y1,x2,y2,css="thin_blue", opacity=1) {

    var line = document.createElementNS(svgNS, 'line'); //Create a line in SVG's namespace
    line.setAttribute("class",css); 
    line.setAttribute("x1",x1); 
    line.setAttribute("y1",y1); 
    line.setAttribute("x2",x2); 
    line.setAttribute("y2",y2); 
    line.setAttribute("style","opacity:" + opacity); 

    svg.appendChild(line);
}

function makeGroup() {
    var g = document.createElementNS(svgNS, 'g'); //Create a line in SVG's namespace
    svg.appendChild(g);
    return g;
}

function makeClipPath() {
    var g = document.createElementNS(svgNS, 'clipPath'); //Create a line in SVG's namespace
    svg.appendChild(g);
    return g;
}

function makeMask() {
    var g = document.createElementNS(svgNS, 'mask'); //Create a line in SVG's namespace
    svg.appendChild(g);
    return g;
}

function path(ar, css="thin_grey") {


    var path = document.createElementNS(svgNS, 'path'); //Create a path in SVG's namespace
    path.setAttribute("class",css); 

    if (ar!== undefined && ar.length>0) {


    var s="M";
    for (var i=0;i<ar.length;i+=2) {
        s+=ar[i] + " " + ar[i+1] + " L ";
    }
    s+=ar[0] + " " + ar[1];
    path.setAttribute("d",s);
    }
    svg.appendChild(path);
    return path;
}

function randColor() {
 // do something great
    var r=random_between(80,200);
    var g=random_between(140,185);
    var b=random_between(220,255);

                //    fill:rgb( 100 , 100 , 100 )
    var s="fill:rgb(" + r + "," + g + "," + b + ")";
    // // // console.log("I created a string!");
    // // // console.log(s);

    
    return s;  
}

function random_between(min, max) {
    return Math.floor(Math.random()*(max-min))+min;
}

function circle(cx, cy, radius, css="thin_blue") {
    
    var cir = document.createElementNS(svgNS, 'circle'); //Create a path in SVG's namespace
    if (css == "rand") {
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
        cir.setAttribute("class",css); 
    }

    
    cir.setAttribute("cx",cx); 
    cir.setAttribute("cy",cy); 
    cir.setAttribute("r",radius); 
    svg.appendChild(cir);

    return cir;
}

function rect(x, y, width, height, css="thin_blue", append=0) {
    
    var sq = document.createElementNS(svgNS, 'rect'); //Create a path in SVG's namespace
    sq.setAttribute("class",css); 
    sq.setAttribute("x",x); 
    sq.setAttribute("y",y); 
    sq.setAttribute("width",width);  
    sq.setAttribute("height",height);
    sq.setAttribute("class",css); 
    
    if (append==0) {
        svg.appendChild(sq);
    } else {
        svg.insertBefore(sq,svg.firstChild);
    }
    return sq;

}
function text(x, y, txt, css="text") {
    return;
    var t = document.createElementNS(svgNS, 'text'); //Create a path in SVG's namespace
    t.setAttribute("x",x); 
    t.setAttribute("y",-y); 
    t.setAttribute("class",css); 
    $(t).html(txt);
    t.setAttribute("transform","scale(1, -1)" );
    svg.appendChild(t);
    return t;

}




