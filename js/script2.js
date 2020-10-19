
$( document ).ready(function() {
    console.log( "ready!" );
    
    for (x=-4;x<4;x++) {
      for (y=-4;y<4;y++) {
          makeStarThing(100,200*x,200*y);
      }
    }

});


function makeStarThing(size, x, y) {

  for (i=0;i<=size;i=i+5) {

      // step 1
      line (x+i, y+0, x, y+size-i);  

      // step 2
      // mirror left of step 1
      line (x+-i, y+0, x, y+size-i);  

      // step 3
      // mirror down of step 1
      line (x+i, y+0, x, y+i-size);  

      // step 4
      // mirror left of step 3
      line (x+-i, y+0, x, y+i-size);  

      // step 5
      // this is step 4 moved +size, +size
      line (x+size-i, y+size, x+size, y+i);  

      // step 6
      // this is step 3 moved -size, +size
      line (x+i-size, y+size, x-size, y+i);  

      // step 7
      // this is step 2 moved +size, -size
      line (x+size-i, y-size, x+size, y-i);   

      // step 8
      // this is step 1 moved -size, -size
      line (x+i-size, y-size, x-size, y-i);    

    }   
}