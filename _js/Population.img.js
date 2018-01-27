var Population=function(target,size,mutation,kill){this.members=[];this.target=target;this.mutation=mutation;this.size=size;this.generationNumber=0;this.kill=kill;while(this.members.length<this.size){var entity=new DNA();entity.spark(this.target.length);this.members.push(entity)}};Population.prototype.display=function(){document.getElementById("count").innerHTML="gen "+this.generationNumber+" / mut: "+this.mutation.toFixed(3);var px_data=this.getTop();var px_div=document.getElementsByClassName("pixel");for(var i=0;i<px_data.length;i+=3){if(Math.floor(i/3)>=px_div.length)continue;var r=px_data[i];var g=px_data[i+1];var b=px_data[i+2];px_div[Math.floor(i/3)].setAttribute("style","background:rgb("+r+","+g+","+b+")")}};Population.prototype.complete=function(){var msg=this.generationNumber<this.kill?"Solved":"Failed to solve";msg+=" in "+this.generationNumber+" generations.";console.log(msg);document.getElementById("count").innerHTML=msg;setTimeout(function(){document.getElementById("count").innerHTML=""},5000)};Population.prototype.reSort=function(){for(var i=0;i<this.members.length;i++){this.members[i].calcFitness(this.target)}
this.members.sort(function(a,b){return a.fitness-b.fitness})};Population.prototype.fitRange=function(){var minFit=100000000000000000000;var maxFit=-100000000000000000000;for(var i=0;i<this.members.length;i++){var f=this.members[i].fitness
minFit=(f<minFit)?f:minFit;maxFit=(f>maxFit)?f:maxFit}
return{"max":maxFit,"min":minFit,"range":(maxFit-minFit)}}
Population.prototype.populationControl=function(){while(this.members.length>this.size){this.members.pop()}
while(this.members.length<this.size){var entity=new DNA();entity.spark(this.target.length);this.members.push(entity)}};Population.prototype.getTop=function(){return this.members[0].genome};Population.prototype.check=function(){var finished=!0;for(var i=0;i<this.target.length;i++){if(!finished){continue}
finished&=this.target[i]==this.members[0].genome[i]}
return finished}
Population.prototype.generation=function(){this.populationControl();this.reSort();this.display();var matingPool=[];var fitRange=this.fitRange();for(var i=0;i<this.members.length;i++){var n=Math.max(1,Math.round(((this.members[i].fitness-fitRange.min)/fitRange.range)*100));for(var j=0;j<n;j++){matingPool.push(i)}}
for(var i=0;i<matingPool.length;i++){var a=Math.floor(Math.random()*matingPool.length);var b=Math.floor(Math.random()*matingPool.length);if(matingPool[a]>=this.members.length||matingPool[b]>=this.members.length)continue;var child=this.members[matingPool[a]].mate(this.members[matingPool[b]],this.mutation);this.members.push(child)}
this.reSort();this.populationControl();if(this.check()){this.display();this.complete();return!0}
if(this.generationNumber>this.kill){this.complete();return!0}
this.generationNumber++;var scope=this;setTimeout(function(){scope.generation()},10)}
