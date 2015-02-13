// start slingin' some d3 here.

d3.select('body').selectAll('svg')
  .data(['board']).enter().append('svg')
  .attr('height', 600).attr('width', 600);


var enemies = d3.select('svg').selectAll('circle')
  .data([1,2,3,4,5,6,7,8,9,10]).enter().append('circle')
  .attr('r', 20);
  //.attr('fill', 'url(asteroid.png)');

enemies.each(function(enemy) {
  d3.select(this).attr('cx', Math.floor(Math.random() * 560) + 20)
  .attr('cy', Math.floor(Math.random() * 560) + 20);
});

var player = d3.select('svg').selectAll('player')
  .data(['player']).enter().append('circle')
  .attr('r', 20).attr('cx', 300).attr('cy', 300)
  .attr('fill', 'transparent').attr('stroke-width', 5)
  .attr('stroke', 'green');


setInterval(function(){
  enemies.each(function(enemy) {
    d3.select(this).transition().duration(1000).attr('cx', Math.floor(Math.random() * 560) + 20)
    .attr('cy', Math.floor(Math.random() * 560) + 20);
  });
},1700)
