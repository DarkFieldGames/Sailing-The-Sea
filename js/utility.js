function randInt(min, max) {
    if (max === undefined) {max = min; min = 0;}
    min = Math.floor(min); max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

Array.prototype.collapse = function () {
    // Concatenate all subarrays
    return this.reduce(function(a,b) {return a.concat(b)});
}

Array.prototype.copy = function() {
    // Fast array copy
    b = new Array(this.length);
    var i = this.length;
    while(i--) { b[i] = this[i]; }
    return b;
}

Array.prototype.rand = function() {
    // Pull random element
    return randInt(0,this.length);
}

Array.prototype.rand_elem = function() {
    // Pull random element
    return this[randInt(0,this.length)];
}

Array.prototype.pop_rand_elem = function() {
    // Pull random element
    return this.pop(randInt(0,this.length));
}

Array.prototype.maxmin = function() {
    var tmp = this.collapse();
    return {
	max:Math.max.apply(null,tmp),
	min:Math.min.apply(null,tmp)
    };
}

Array.prototype.max = function() {
    return Math.max.apply(null,this.collapse());
}

Array.prototype.min = function() {
    return Math.min.apply(null,this.collapse());
}

Array.prototype.popIndex = function(ref) {
    var toPop = this.indexOf(ref)
    return this.pop(toPop);
}

Array.prototype.contains = Array.prototype.contains || function(obj)
{
  var i, l = this.length;
  for (i = 0; i < l; i++)
  {
    if (this[i] == obj) return true;
  }
  return false;
}    
