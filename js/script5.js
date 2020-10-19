

$( document ).ready(function() {
    console.log( "ready!" );
    
    makePattern(200,30);
    



});


function makePattern(radius,density) {
    for (i=0;i<=Math.PI*2;i+=Math.PI*2 / density) {
        var x=Math.cos(i)*radius;
        var y=Math.sin(i)*radius;

        circle(x+20,y,4);
    }

}