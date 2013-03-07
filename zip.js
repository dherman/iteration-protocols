// zip: a compound iterator

// Python style
function zip(i1, i2) {
    return {
        next: function() {
            return [x1.next(), x2.next()];
        }
    };
}

// Java style
function zip(i1, i2) {
    return {
        hasNext: function() {
            return x1.hasNext() && x2.hasNext();
        },
        next: function() {
            return [x1.next(), x2.next()];
        }
    };
}

// C# style
function zip(i1, i2) {
    return {
        get current() {
            return [i1.current, i2.current];
        },
        moveNext: function() {
            return i1.moveNext() && i2.moveNext();
        }
    };
}

// Functional style
function zip(i1, i2) {
    return {
        next: function() {
            let x1 = i1.next();
            if (x1.done)
                return x1;
            let x2 = i2.next();
            if (x2.done)
                return x2;
            return { done: false, value: [x1, x2] };
        }
    }
}

// Two-callback style
function zip(i1, i2) {
    return {
        next: function(next, done) {
            return i1.next(function(x1) {
                return i2.next(function(x2) {
                    return [x1, x2];
                }, done);
            }, done);
        }
    };
}

// Node-callback style
function zip(i1, i2) {
    return {
        next: function(cb) {
            return i1.next(function(done, x1) {
                if (done) {
                    return cb(true);
                }
                return i2.next(function(done, x2) {
                    if (done) {
                        return cb(true);
                    }
                    return cb(false, [x1, x2]);
                });
            });
        }
    };
}
