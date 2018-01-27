var Population=function(target,size,mutation){this.members=[];this.target=target;this.mutation=mutation;this.size=size;this.generationNumber=0;this.checkPop=function(){var sum=0;for(var i=0;i<this.members.length;i++){this.members[i].calcFitness(this.target);sum+=this.members[i].fitness}
if(sum<0.5)return!0;return!1}
while(this.members.length<this.size){var entity=new DNA();entity.spark(this.target.length);this.members.push(entity)}
while(this.checkPop()){var entity=new DNA();entity.spark(this.target.length);this.members.push(entity)}};Population.prototype.display=function(){document.getElementById("count").innerHTML="gen "+this.generationNumber+" / mut: "+this.mutation.toFixed(3);for(var i=0;i<this.getTop().length;i++){document.getElementsByClassName("char")[i].getElementsByTagName("span")[0].innerHTML=this.getTop()[i]}}
Population.prototype.complete=function(){var msg=this.generationNumber<1000?"Solved":"Failed to solve";msg+=" in "+this.generationNumber+" generations.";console.log(msg);document.getElementById("count").innerHTML=msg;setTimeout(function(){document.getElementById("count").innerHTML=""},5000)};Population.prototype.reSort=function(){for(var i=0;i<this.members.length;i++){this.members[i].calcFitness(this.target)}
this.members.sort(function(a,b){return b.fitness-a.fitness})};Population.prototype.populationControl=function(){while(this.members.length>this.size){this.members.pop()}
while(this.members.length<this.size){var entity=new DNA();entity.spark(this.target.length);this.members.push(entity)}};Population.prototype.getTop=function(){return this.members[0].genome};Population.prototype.tally=function(){var counts={};for(var i=0;i<this.members.length;i++){var g=this.members[i].genome;if(g in counts){counts[g]++}else{counts[g]=1}}
return counts}
Population.prototype.generation=function(){this.populationControl();this.reSort();this.display();var matingPool=[];for(var i=0;i<this.members.length;i++){var n=Math.round((this.members[i].fitness/this.members.length)*100);for(var j=0;j<n;j++){matingPool.push(i)}}
for(var i=0;i<this.size;i++){var a=Math.floor(Math.random()*matingPool.length);var b=Math.floor(Math.random()*matingPool.length);var child=this.members[matingPool[a]].mate(this.members[matingPool[b]],this.mutation);this.members.push(child)}
this.reSort();this.populationControl();if(this.getTop()==this.target){this.display();this.complete();return!0}
var t=this.tally();if((t[this.getTop()]/parseFloat(this.members.length))>0.2){this.mutation+=0.0002};if(this.generationNumber>1000){this.complete();return!0}
this.generationNumber++;var scope=this;setTimeout(function(){scope.generation()},50)}
