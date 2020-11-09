<?
$r=rand()*100000;
?>

<!DOCTYPE html>
<html>
  <head>
    <title>artsie</title>
    <link rel="stylesheet" href="css/stylesb.css?r=<? echo $r ?>" />
    <link rel="stylesheet" href="css/svg.css?r=<? echo $r ?>" />
    <script src="js/jquery-2.1.4.min.js"></script>
    <script src="js/svgs.js?r=<? echo $r ?>"></script>
    <script src="js/drawlib2.js?r=<? echo $r ?>"></script>
    <script src="js/scriptb.js?r=<? echo $r ?>"></script>
  </head>
  <body>
    <div id="menuOptions">
      <div id="mode">Welcome!
      </div>      
      <div id="history"></div>
      <div id="menuOptionsList">

      
          <div link="makeCircle" action="goHome" id="btnGoHome">Hom<span class=underline>e</span></div>

          <div link="makeCircle" action="beginCircle"><span class=underline>C</span>ircle</div>
          <div link="makeGrid"><span class=underline>G</span>rid</div>
          <div link="makeMPoints"><span class=underline>P</span>oints</div>
          <div link="makeMLines"><span class=underline>L</span>ines</div>
          <div link="makeMCurves">Cur<span class=underline>v</span>es</div>
          <div link="makeFractal" action="beginFractal"><span class=underline>F</span>ractals</div>
          <div link="makeClasses">Cl<span class=underline>a</span>sses</div>
          <div link="makeUndo" id="btnMakeUndo"><span class=underline>U</span>ndo</div>
          <div action="toggleHelpers">Helper<span class=underline>s</span></div>
          <div action="viewHistory"><span class=underline>H</span>istory</div>  
          <div action="clearMe">Clear<span class=underline>!</span></div>          
          <div id="btnPublish" action="publish">Publish<span class=underline>.</span></div>                    
        </div>
      </div>
    <div id="monitor">
      <div id="status">
      </div>
      <div id="menu">
        <div id="makeClasses" class="submenu">

          <label class="stroke">Stroke: 
            <input type="button" value="None" class="stroke_none" />
            <input type="button" value="Red" class="stroke_red" />
            <input type="button" value="Blue" class="stroke_blue" />
            <input type="button" value="Yellow" class="stroke_yellow" />
          </label>
          <label class="fill">Fill: 
            <input type="button" value="None" class="fill_none" />
            <input type="button" value="Red" class="fill_red" />
            <input type="button" value="Blue" class="fill_blue" />
            <input type="button" value="Yellow" class="fill_yellow" />
          </label>

          <div class="sample">Sample</div>
        </div>
        

        <div id="makeMLines" class="submenu hasSels">
          <select class="selLine"></select>
          <select class="selLine"></select>
          <label>Offset: <input type="number" id="lineOffset" value="0"></label>
          <label><input type="checkbox" class=reverse>Reverse</label>
          <input type="button" value="Lines" class="defaultAction" id="btnDrawMLines" />
          <input type="button" value="Circles" id="btnDrawMCircles" />
          <input type="button" value="Circle Row" id="btnDrawMCircleRow" />
        </div>
        <div id="makeMCurves" class="submenu hasSels">
          <select class="selLine"></select>
          <select class="selLine"></select>
          <select class="selLine"></select>
          <label>Offset 1: <input type="number" id="lineOffset1" value="1"></label>
          <label><input type="checkbox" class=reverse>Reverse</label>
          <label>Offset 2: <input type="number" id="lineOffset2" value="2"></label>
          <label><input type="checkbox" class=reverse>Reverse</label>
          <input type="button" value="Curves" class="defaultAction" id="btnDrawMCurves" />
          
          
        </div>

        <div id="makeMPoints" class="submenu">
          <label>Points:<input type="text" id="mPoints" value="12" /></label>
          <label>Offset:<input type="number" id="mOffset" value="0" /></label>
          <label><input type="checkbox" class=reverse>Reverse</label>
          
          <label>Radius:<input type="number" id="mRadius" value="200" /></label>
          <input type="button" value="Make Points" class="defaultAction" id="btnMakePoints" />
        </div>
        <div id="makeGrid" class="submenu">
          <label>Big:<input type="text" id="mGridBig" value="100" /></label>
          <label>Small:<input type="text" id="mGridSmall" value="20" /></label>
          <input type="button" value="Make Grid" class="defaultAction" id="btnMakeGrid" />
        </div>
        <div id="makeCircle" class="submenu">
          Click to place the circle.
        </div>
        <div id="makeCircle2" class="submenu">
          Click again to set the circle radius.
        </div>

        <div id="makeFractal" class="submenu">
          Click to place the first point.
        </div>
        <div id="makeFractal2" class="submenu">
          Click to place the control point.
        </div>
        <div id="makeFractal3" class="submenu">
          Click to place the end point.
        </div>
        <div id="makeFractal4" class="submenu">
          <label>Points:<input type="number" id="mFracPoints" value="4" /></label>
          <input type="button" value="Make Fractal" class="defaultAction" id="btnMakeFractal" />

        </div>

      </div>
    </div>
    <div id="svgContainer">
      <svg transform="scale(1, -1)"  width=800 height=600 id="svgb" viewBox="-400 -300 800 600"  >
        <defs id="defs0">
        </defs>
      </svg>
    </div>
    <div id="scriptResults">
    </div>
  </body>
  
</html>