var DNA=function(genome){if(genome){this.genome=genome}
this.fitness=0};DNA.prototype.genome=[];DNA.prototype.spark=function(length){this.genome=[];for(var i=0;i<length;i+=3){var c=Math.floor(Math.random()*255)
this.genome.push(c);this.genome.push(c);this.genome.push(c)}};DNA.prototype.calcFitness=function(compare){var fit=0
for(var i=0;i<this.genome.length;i++){var d=Math.abs(this.genome[i]-compare[i]);fit+=d}
this.fitness=fit/this.genome.length};DNA.prototype.mutate=function(rate){for(var i=0;i<this.genome.length;i++){if(Math.random()<rate){var shift=Math.random()<0.5?1:-1;shift*=Math.floor(Math.random()*25);this.genome[i]=Math.min(255,Math.max(0,this.genome[i]+shift))}}};DNA.prototype.mate=function(partner,mut){var child=[];for(var i=0;i<this.genome.length;i++){var roll=Math.random();if(roll<0.2){child.push(this.genome[i])}else if(roll>=0.4){child.push(partner.genome[i])}else{child.push(Math.floor((this.genome[i]+partner.genome[i])/(2)))}}
child=new DNA(child);var mut_=(this.genome==partner.genome)?mut*4:mut;child.mutate(mut_);return child}
