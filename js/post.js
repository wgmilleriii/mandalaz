var urlPrefix = "http://localhost:8888/mandalaz/php/";
var lm;
var com;

$(document).ready(function() {
    lm = $("#listMandalas");
    com = $("#community");    
    showMenus();
    remember();

    makeSVGs();

});

var loggedin = false;

function makeSVGpart(cl) {
    $("." + cl).parent().each(function() {
        var d = document.createElement('div'); //Create a path in SVG's namespace
        d = $(d);
        d.html(eval("svg_" + cl));
        d.attr("class", "svgCont " + cl);
        $(this).replaceWith(d);
    });

}
function makeSVGs() {
    makeSVGpart("trash");
    makeSVGpart("launch");
    makeSVGpart("heart");  

    var t=$("div.heart").eq(0).closest(".mandala").find(".mname");
    console.log(t);
    if (t.hasClass("hearted")) {
        $("div.heart").addClass("hearted");
        console.log("!!");
    }
}
function showMenus() {

    var hide = "";
    if (!loggedin) {
        hide = ".mymenu";
        show = ".logins";

    } else {
        hide = ".logins";
        show = ".mymenu";
    }

    $(hide).hide();
    $(show).show();

    $(hide).each(function() {
        var t = $(this).attr("nav");
        // console.log("T ", t);
        $("#" + t).hide();
    });

    $(".inactive").each(function() {
        var t = $(this).attr("nav");
        // console.log("T ", t);
        $("#" + t).hide();
    });

    $(show + ".active").each(function() {

        var t = $(this).attr("nav");
        // console.log("S ", t);
        $("#" + t).show();
    });

    // $(show + ".menu.inactive").each(function() {
    //   var t=$(this).attr("nav");
    //   $("#" + t).hide();
    // });
    // $(show + ".menu.active").each(function() {
    //   var t=$(this).attr("nav");
    //   $("#" + t).show();
    // });


    $("input:visible").eq(0).focus();
}

$(document).on('click', '.inactive', function() {
    $(".active").toggleClass("inactive");
    $(".active").toggleClass("active");

    $(this).toggleClass("inactive");
    $(this).toggleClass("active");

    showMenus();
});

var mandalaid=0;
$(document).on('click', '.mandala', function() {
    mandalaid = $(this).find(".mname").attr("mandalaid");
    $(".msubmenu").remove();

    var s='<div class=msubmenu><label><input type="checkbox" class=launch>Launch</label><label><input type="checkbox" class=heart>Heart</label><label><input type="checkbox" class=trash>Reverse</label></div>';

    if ($(this).hasClass("community")) {
        s='<div class=msubmenu><label><input type="checkbox" class=heart>Heart</label></div>';
    }
    $(this).append(s);
    makeSVGs();
    // var url = "post.php?action=load&mandalaid={0}".format(id);
    // url = cs(url);
    // $.post(url)
    //     .done(function(data) {
    //         $("#scriptResults").html(data);
    //     });
});

function remember() {

    var url = "post.php?action=remember";
    url = cs(url);
    $.post(url)
        .done(function(data) {
            $("#scriptResults").html(data);
        });

}
function loginn() {
    var username = $("#username").val();
    var password = $("#password").val();

    var url = "post.php?action=login";
    url = cs(url);
    $.post(url, {
        username:username,
        password:password
    })
        .done(function(data) {
            $("#scriptResults").html(data);
        });

}
$(document).on('click', '#btnLogin', function() {
    loginn();
});

function checkPasswords() {
    m2 = $("#message2");
    m2.html("");
    var u2 = $("#username2").val();
    var p2 = $("#password2").val();
    var p3 = $("#password3").val();
    var f = $("#fullname").val();


    if (u2.length < 5) {
        m2.html("Enter a username with at least five characters.")
        $("#username2").focus();
        return false;
    }

    if (p2.length < 5) {
        m2.html("Enter a password with at least five characters.")
        $("#password2").focus();
        return false;
    }
    if (p2 != p3) {
        $("#password2").focus();
        m2.html("These passwords do not match.")
        return false;
    }


    if (f.length < 5) {
        m2.html("Enter a screen name with at least five characters.")
        $("#fullname").focus();
        return false;
    }

    return true;
}


function mandalaCreated(mn) {
    m2 = $("#message4");
    m2.html("Mandala <i> " + mn + "</i> created. <a href=viewer.php class=launch>Launch &gt;&gt;</a>");
    listMyMandalas();
}



function listMyMandalas() {
    var url = "post.php?action=listmandalas";
    lm.html("");
    url = cs(url);
    $.post(url)
        .done(function(data) {
            $("#scriptResults").html(data);
            // console.log(data);
        });
}
// ($s,$row["mname"],$row["createddt"],$row["fullname"],$row["mandalaid"],$row["favid"],$row["ranking"]);
function addComMandala(mn, cdt, fn, id, is_favorite, ranking) {

    // var m2 = document.createElement( "div" ), 
    // m2.setAttribute("class","mname");

    var css="";
    if (is_favorite>0) {
        css=" hearted";
    }

    var s = "<div mandalaid={1} class='mname {2}'>{0}</div><div class=createdby>By {3} - {4}</div>";
    s = s.format(mn, id, css, fn, cdt);
    // console.log(s);

    var m = document.createElement("div");
    m.setAttribute("class", "mandala community");
    m.setAttribute("mandalaid", id);
    m = $(m);
    m.html(s);

    com.append(m);

    var t=$("div[mandalaid=" + id + "]");
    m.append(t);

}
function addMandala(mn, id, is_favorite) {


    // var m2 = document.createElement( "div" ), 
    // m2.setAttribute("class","mname");

    var css="";
    if (is_favorite==1) {
        css=" hearted";
    }

    var s = "<div mandalaid={1} class='mname {2}'>{0}</div>";
    s = s.format(mn, id, css);
    // console.log(s);

    var m = document.createElement("div");
    m.setAttribute("class", "mandala");
    m.setAttribute("mandalaid", id);
    m = $(m);
    m.html(s);

    lm.append(m);

    var t=$("div[mandalaid=" + id + "]");
    m.append(t);

}

function checkMandalaName() {
    m2 = $("#message4");
    m2.html("");
    var mn = $("#mandalaname").val();



    if (mn.length < 5) {
        m2.html("Enter a name with at least five characters.")
        $("#mandalaname").focus();
        return false;
    }


    return true;
}


$(document).on('click', '#btnNewMandala', function() {


    var username2 = $("#username2").val();
    var password2 = $("#password2").val();
    var password3 = $("#password3").val();
    var fullname = $("#fullname").val();

    if (!checkMandalaName()) return;

    var mn = $("#mandalaname").val();

    var url = "post.php?action=newmandala&name={0}".format(mn);
    url = cs(url);
    $.post(url)
        .done(function(data) {
            $("#scriptResults").html(data);
        });
});

$(document).on('click', '.logout', function() {


    var url = "post.php?action=logout";
    url = cs(url);
    $.post(url)
        .done(function(data) {
            $("#scriptResults").html(data);
        });
});

$(document).on('click', '#btnCreate', function() {
    var username2 = $("#username2").val();
    var password2 = $("#password2").val();
    var password3 = $("#password3").val();
    var fullname = $("#fullname").val();

    if (!checkPasswords()) return;


    var url = "post.php?action=create";
    url = cs(url);
    $.post(url, 
    {
        username:username2,
        password:password2,
        fullname:fullname
    })
        .done(function(data) {
            $("#scriptResults").html(data);
        });
});


function cs(s) {
    console.log("-= Posting: =- ");
    console.log(urlPrefix + s);
    return urlPrefix + s;
}

function badLogin() {
    $("#message").html("Incorrect login - please try again.");
}

function accountExists() {
    $("#message2").html("That username has been taken.");
}

function activate(m) {
    var el = $("div[nav=" + m + "]");
    // console.log(el);
    el.addClass("active").removeClass("inactive");
    $("#" + m).show();

}

function welcome(fullname) {

    $("#message3").html("Welcome, " + fullname + ". <a href=# class=logout>Logout</a>");

    loggedin = true;
    showMenus();
    activate("myAccount");

    listMyMandalas();
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

function logout() {
    $("#message3").html("");
    loggedin = false;
    showMenus();

    activate("loginUser");


}

function launch() {
    window.location.href="viewer.php";
}

$(document).on('click', '.launch', function(e) {
    var url = "post.php?action=load&mandalaid={0}".format(mandalaid);
    url = cs(url);
    $.post(url)
        .done(function(data) {
            $("#scriptResults").html(data);
        });
});

$(document).on('click', '.trash', function(e) {

    var o = $(this);
    if (confirm("Delete this drawing?")) {
    var url = "post.php?action=delete&mandalaid={0}".format(mandalaid);
    url = cs(url);
    $.post(url)
        .done(function(data) {
            $("#scriptResults").html(data);
        });

    }

    e.stopPropagation();
});



$(document).on('click', '#btnCommunity', function(e) {
 var url = "post.php?action=community";
    com.html("Loading...");
    com.hide();
    url = cs(url);
    $.post(url)
        .done(function(data) {
            com.html("");
            com.fadeIn();
            $("#scriptResults").html(data);
            // console.log(data);
        });

});

$(document).on('click', '.heart', function(e) {

    var o = $(this);

    var hearted=1;
    if (o.hasClass("hearted")) {
        hearted=0;
    }
    var url = "post.php?action=heart&mandalaid={0}&hearted={1}".format(mandalaid,hearted);
    url = cs(url);
    $.post(url)
        .done(function(data) {
            console.log(data);
            $("#scriptResults").html(data);
        });
    e.stopPropagation();
});

function makeHeart(mn, hearted) {
    var e=$("div.mandala[mandalaid=" + mn + "]").find("div.heart");
    if (e.length==1) {
        if (hearted==1) {
            e.addClass("hearted");
        } else {
            e.removeClass("hearted");
        }
    }
}