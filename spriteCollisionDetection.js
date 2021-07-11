function rectColliding(x1,y1,h1,w1,x2,y2,h2,w2){
    return x1-x2<(w1+h1)/2 && x2-x1<(w1+w2)/2 && y2-y1<(h1+h2)/2 && y1-y2<(h1+h2)/2
}
function cirColliding(x1,y1,r1,x2,y2,r2){
  var distanceX=x1-x2; var distanceY=y1-y2;
  var distance = Math.hypot(distanceX, distanceY);
  return distance <= r1+r2;

}
function rectCollides(obj1,obj2) {
    return obj1.x-obj2.x<(obj1.width+obj2.width)/2 && obj2.x-obj1.x<(obj1.width+obj2.width)/2 && obj1.y-obj2.y<(obj1.height+obj2.height)/2 && obj2.y-obj1.y<(obj1.height+obj2.height)/2
  }