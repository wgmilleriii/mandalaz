
$( document ).ready(function() {
    console.log( "ready!" );
    
    for (x=-4;x<4;x++) {
      for (y=-4;y<4;y++) {
          makeStarThing(100,200*x,200*y);
      }
    }

});

// range is -8 to 8
// opacity should be 0 to 1

function makeStarThing(size, x, y) {

  for (i=0;i<size;i=i+5) {

      var opacity=i/size;

      // step 1
      line (x+i, y+0, x, y+size-i,"thin_blue",opacity);  

      // step 2
      // mirror left of step 1
      line (x+-i, y+0, x, y+size-i,"thin_blue",opacity);  

      // step 3
      // mirror down of step 1
      line (x+i, y+0, x, y+i-size,"thin_blue",opacity);  

      // step 4
      // mirror left of step 3
      line (x+-i, y+0, x, y+i-size,"thin_blue",opacity);  

      // step 5
      // this is step 4 moved +size, +size
      line (x+size-i, y+size, x+size, y+i,"thin_blue",opacity);  

      // step 6
      // this is step 3 moved -size, +size
      line (x+i-size, y+size, x-size, y+i,"thin_blue",opacity);  

      // step 7
      // this is step 2 moved +size, -size
      line (x+size-i, y-size, x+size, y-i,"thin_blue",opacity);   

      // step 8
      // this is step 1 moved -size, -size
      line (x+i-size, y-size, x-size, y-i,"thin_blue",opacity);    

    }   
}