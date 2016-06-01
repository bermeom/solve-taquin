var $pwidth=500;
var $pheight=500;
var $delta=5;
var $width;
var $height;
var $boardPlayOpponent;
var $stageOpponent;
var $boardOpponent;
var $textMsnOpponent;
var $boardPlay;
var $stage ;
var $board;
var $textMsn;

function init() {
  console.log("INI");
  $stage = new createjs.Stage("myTaquin");
  $board = new createjs.Container();
  $textMsn = new createjs.Text("", "bold 40px sans-serif", "#FFFFFF");
  $textMsnOpponent = new createjs.Text("", "bold 40px sans-serif", "#FFFFFF");
  $stageOpponent = new createjs.Stage("taquinOpponent");
  $boardOpponent = new createjs.Container();
  generateBoard(10,$pwidth,$pheight);
  generateBoardOpponent(10,$pwidth,$pheight);
  $textMsn.alpha=0;
  $textMsnOpponent.alpha=0;
  $stage.addChild($textMsn);
  $stageOpponent.addChild($textMsnOpponent);
  messagePlusOne($textMsn,"+1",$pwidth,$pheight,30);
  //messageResult($textMsnOpponent,"LOSE !!",$pwidth,$pheight,0);
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", $stage);
  createjs.Ticker.addEventListener("tick", $stageOpponent);
  console.log("end INI");
  swapFileBoard(0,1,0,0);
  swapFileBoard(1,1,0,1);
  swapFileBoard(1,0,1,1);
  //swapFileBoard(0,0,1,0);
  swapFileBoardOpponent(1,0,0,0);


}



function messagePlusOne(textMsn,text,pwidth,pheight,delta){
  textMsn.text=text

  textMsn.x=pwidth/2-delta;
  textMsn.y=pheight/2-50;
  textMsn.alpha=0;
  createjs.Tween.get(textMsn, { loop: false })
  //.to({ alpha: 1, y: 225 ,font:"bold 40px sans-serif"}, 500, createjs.Ease.getPowInOut(2))
  .to({ alpha: 0, y: textMsn.y+25 }, 400, createjs.Ease.getPowInOut(2))
  .to({ alpha: 1, y: textMsn.y+50 ,font:"bold 40px sans-serif"}, 400, createjs.Ease.getPowInOut(2))
  .to({ alpha: 0}, textMsn.y+75, createjs.Ease.getPowInOut(2));
}

function messageResult(textMsn,text,pwidth,pheight,delta){
  textMsn.text=text
  textMsn.x=pwidth/2-delta;
  textMsn.y=pheight/2-50;
  textMsn.alpha=0;
  createjs.Tween.get(textMsn, { loop: false })
  //.to({ alpha: 1, y: 225 ,font:"bold 40px sans-serif"}, 500, createjs.Ease.getPowInOut(2))
  .to({ alpha: 0, y: textMsn.y+25 }, 400, createjs.Ease.getPowInOut(2))
  .to({ alpha: 1, y: textMsn.y+50 ,font:"bold 40px sans-serif"}, 400, createjs.Ease.getPowInOut(2))
  //.to({ alpha: 0}, textMsn.y+75, createjs.Ease.getPowInOut(2));
}


function generateBoardOpponent(n,pwidth,pheight){
    var offsetX=$delta;
    var offsetY=$delta;
    $width=(pwidth-(n)*$delta)/n;
    $height=$width;
    $boardPlayOpponent=new Array(n);
    $boardOpponent.removeAllChildren();
    $stageOpponent.removeAllChildren();
    $board = new createjs.Container();
    for (var i=0;i<n;i++){
        $boardPlayOpponent[i]=new Array(n);
        for (var j=0;j<n;j++){
            var text="";
            if(i*n+j!=0){
              text=""+(i*n+j);
              //console.log(i+" "+j+" "+offsetY+" "+text);
              $boardPlayOpponent[i][j]=creatContainerRect($width,$height,text,"Crimson");
              $boardPlayOpponent[i][j].x=offsetX;
              $boardPlayOpponent[i][j].y=offsetY;
              $boardOpponent.addChild($boardPlayOpponent[i][j]);
            }else{
            }
            offsetX+=$width+$delta;
        }
        offsetY+=$height+$delta;
        offsetX=$delta;
    }
    $stageOpponent.addChild($boardOpponent);
}

function generateBoard(n,pwidth,pheight){
    var offsetX=$delta;
    var offsetY=$delta;
    $width=(pwidth-(n)*$delta)/n;
    $height=$width;
    $boardPlay=new Array(n);
    $board.removeAllChildren();
    $stage.removeAllChildren();
    $board = new createjs.Container();
    for (var i=0;i<n;i++){
        $boardPlay[i]=new Array(n);
        for (var j=0;j<n;j++){
            var text="";
            if(i*n+j!=0){
              text=""+(i*n+j);
              //console.log(i+" "+j+" "+offsetY+" "+text);
              $boardPlay[i][j]=creatContainerRect($width,$height,text,"Crimson");
              $boardPlay[i][j].x=offsetX;
              $boardPlay[i][j].y=offsetY;
              $board.addChild($boardPlay[i][j]);

            }
            offsetX+=$width+$delta;
        }
        offsetY+=$height+$delta;
        offsetX=$delta;
    }
    $stage.addChild($board);
}

function swapFileBoardOpponent(i,j,newi,newj){
  if((newi-i)!=0){
    moveContainerY($boardPlayOpponent[i][j],((newi-i)*($width+$delta)));
    var temp=$boardPlayOpponent[i][j];
    $boardPlayOpponent[i][j]=$boardPlayOpponent[newi][j];
    $boardPlay[newi][j]=temp;
  }else{
    moveContainerX($boardPlayOpponent[i][j],((newj-j)*($height+$delta)));
    var temp=$boardPlayOpponent[i][j];
    $boardPlayOpponent[i][j]=$boardPlayOpponent[i][newj];
    $boardPlayOpponent[i][newj]=temp;
  }
  //createjs.tween.get($boardPlay).wait(500);
}

function creatContainerRect(width,height,text_,color){
  var container = new createjs.Container();
  var rect = new createjs.Shape();
  var text = new createjs.Text(text_, "bold 20px sans-serif", "#FFFFFF");
  text.x = width/2-5;
  text.y = height/2+5;
  if(text_.length>1){
    text.x -= 5;
  }
  text.textBaseline = "alphabetic";
  rect.graphics.beginFill(color).drawRoundRect(0, 0, width,height,3);
  container.addChild(rect,text);
  return container;
}
function moveContainerX(container,x_){
  createjs.Tween.get(container, {loop: false})//.wait(500)
    .to({x:container.x+x_}, 1000, createjs.Ease.getPowInOut(4));

}
function moveContainerY(container,y_){
  console.log(y_)
  createjs.Tween.get(container, {loop: false})//.wait(500)
    .to({y:container.y+y_}, 1000, createjs.Ease.getPowInOut(4));
}

function swapFileBoard(i,j,newi,newj){
  if((newi-i)!=0){
    moveContainerY($boardPlay[i][j],((newi-i)*($width+$delta)));
    var temp=$boardPlay[i][j];
    $boardPlay[i][j]=$boardPlay[newi][j];
    $boardPlay[newi][j]=temp;
  }else{
    moveContainerX($boardPlay[i][j],((newj-j)*($height+$delta)));
    var temp=$boardPlay[i][j];
    $boardPlay[i][j]=$boardPlay[i][newj];
    $boardPlay[i][newj]=temp;
  }
  //createjs.tween.get($boardPlay).wait(500);
}
