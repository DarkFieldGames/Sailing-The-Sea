
function calcmag(vec) {
    var out = 0;
    for (var i=0; i<vec.len; i++) {
	out += vec.vals[i]*vec.vals[i];
    }
    return out;
}

function calcunit(vec) {
    var out = [];
    for (var i=0; i<vec.len; i++) {
	out.append(vec.vals[i]/vec.mag);
    }
    return new vector(out);
}

function vector(vals) {
    this.vals = vals;
    this.len = vals.length;
    if (this.len <= 3) {
	this.x = vals[0];
	this.y = vals[1];
    }
    if (this.len == 3) {
	this.z = vals[2];
    }
    this.mag2 = calcmag(this);
    this.mag = Math.sqrt(this.mag2);
}

vector.prototype = {
    check:function(b) {
	if (this.len != b.len) return true;
	return false;
    },

    comp:function(b) {
	if ((this.sub(b)).mag == 0) return true;
	return false;
    },
    
    mul:function(b) {
	if (b instanceof vector) return NaN;
	var out = [];
	for (var i=0; i<this.len; i++) {
	    out.push(this.vals[i] * b);
	}
	return new vector(out);
    },

    add:function(b) {
	var out = []
	if (b instanceof vector) {
	    if (this.check(b)) return NaN
	    for (var i=0; i<this.len; i++) {
		out.push(this.vals[i] + b.vals[i])
	    }
	} else {
	    for (var i=0; i<this.len; i++) {
		out.push(this.vals[i] + b)
	    }
	}
	return new vector(out);
    },

    div:function(b) {
	if (b instanceof vector) return NaN;
	var out = []
	for (var i=0; i<this.len; i++) {
	    out.push(this.vals[i] / b)
	}
	return new vector(out);
    },

    sub:function(b) {
	var out = []
	if (b instanceof vector) {
	    if (this.check(b)) return NaN
	    for (var i=0; i<this.len; i++) {
		out.push(this.vals[i] - b.vals[i])
	    }
	} else {
	    for (var i=0; i<this.len; i++) {
		out.push(this.vals[i] - b)
	    }
	}
	return new vector(out);
    },

    neg:function() {
	out = this.vals.map(function(e){return -e;});
	return new vector(out);
    },

    dot:function(b) {
	if (this.check(b)) return NaN;
	var out = 0;
	for (var i=0; i<this.len; i++) {
	    out += this.vals[i]*b.vals[i];
	}
	return out;
    },

    cross:function(b) {
	if (this.check(b) && this.len != 3) return NaN;
	var out = [];
	out.push(this.vals[2] * b.vals[3] - this.vals[3] * b.vals[2]);
	out.push(this.vals[3] * b.vals[1] - this.vals[1] * b.vals[3]);
	out.push(this.vals[1] * b.vals[2] - this.vals[2] * b.vals[1]);
	return new vector(out);
    },
    toArray:function() {
	return this.vals;
    }
}

Array.prototype.containsVec = Array.prototype.containsVec || function(vec)
{
  for (var i = 0; i < this.length; i++) {
      if (this[i].comp(vec)) return true;
  }
  return false;
}    
