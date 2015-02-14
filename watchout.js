// start slingin' some d3 here.

d3.select('body').selectAll('svg')
  .data(['board']).enter().append('svg')
  .attr('height', 600).attr('width', 600);

var enemies = d3.select('svg').selectAll('circle')
  .data([1,2,3,4,5,6,7,8,9,10]).enter().append('circle')
  .attr('r', 20);
  //.attr('fill', 'url(asteroid.png)');
var collisions = d3.select(".collisions").selectAll('span').data([0]);
var current = d3.select(".current").selectAll('span').data([0]);
var high = d3.select(".high").selectAll('span').data([0]);

enemies.each(function(enemy) {
  d3.select(this).attr('cx', Math.floor(Math.random() * 560) + 20)
  .attr('cy', Math.floor(Math.random() * 560) + 20);
});


var drag = d3.behavior.drag().on("drag", function(d){
  var x = d3.event.x;
  var y = d3.event.y;
  //d3.select(this).attr("transform", 'translate('+ x +','+ y +')');
  if (x > 20 && x < 580 && y > 20 && y < 580){
  d3.select(this).attr('cx', x).attr('cy',y);
  }
})

var player = d3.select('svg').selectAll('player')
  .data(['player']).enter().append('circle')
  .attr('r', 20).attr('cx', 300).attr('cy', 300)
  .attr('fill', 'transparent').attr('stroke-width', 5)
  .attr('stroke', 'green').call(drag);


setInterval(function(){
  enemies.each(function(enemy) {
    d3.select(this).transition().duration(1000)
    .attr('cx', Math.floor(Math.random() * 560) + 20)
    .attr('cy', Math.floor(Math.random() * 560) + 20);
  });
},1700);

setInterval(function(){
  enemies.each(function(d,i){
    var enemyX = d3.select(this).attr("cx");
    var enemyY = d3.select(this).attr("cy");
    var playerX = player.attr('cx');
    var playerY = player.attr('cy');
    var l = Math.sqrt(Math.pow((playerX - enemyX), 2) + Math.pow((playerY - enemyY), 2));
    if (l <= 40 && current.data()[0] > 0){
      collisions.data([collisions.data()[0] + 1]);
      collisions.text(function(d){ return d;});
      if (current.data()[0] > high.data()[0])
      high.data(current.data());
      high.text(function(d){return d;});
      current.data([0]);
      current.text(function(d){ return d;});
    }
  })
}, 10);

setInterval(function(){
  current.data([current.data()[0] + 1]);
  current.text(function(d){ return d;});
}, 1000);
