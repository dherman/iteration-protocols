// zipExtend: a compound iterator that checks for end of iteration

function zipExtend(i1, i2, extendWith) {
    function next(i, ifDone) {
        try {
            return i.next();
        } catch (e) {
            if (isStopIteration(e)) {
                ifDone();
                return extendWith;
            }
            throw e;
        }
    }

    return {
        next: function() {
            let x1 = done1 ? extendWith : next(i1, function() {
                done1 = true;
            });
            let x2 = done2 ? extendWith : next(i2, function() {
                done2 = true;
            });
            if (done1 && done2)
                throw StopIteration;
            return [x1, x2];
        }
    };
}

// Python style
function zipExtend(i1, i2, extendWith) {
    function next(i, ifDone) {
        try {
            return i.next();
        } catch (e) {
            if (isStopIteration(e)) {
                ifDone();
                return extendWith;
            }
            throw e;
        }
    }
 
    return {
        next: function() {
            let x1 = done1 ? extendWith : next(i1, function() {
                done1 = true;
            });
            let x2 = done2 ? extendWith : next(i2, function() {
                done2 = true;
            });
            if (done1 && done2)
                throw StopIteration;
            return [x1, x2];
        }
    };
}

// Java style
function zipExtend(i1, i2, extendWith) {
    return {
        hasNext: function() {
            return i1.hasNext || i2.hasNext();
        },
        next: function() {
            if (!i1.hasNext && !i2.hasNext())
                throw new Error("end of iterator");
            return [i1.hasNext() ? i1.next() : extendWith,
                    i2.hasNext() ? i2.next() : extendWith];
        }
    };
}

// C# style
function zipExtend(i1, i2, extendWith) {
    // TODO
}

// Functional style
function zipExtend(i1, i2, extendWith) {
    return {
        next: function() {
            var x1 = i1.next(), x2 = i2.next();
            return (x1.done && x2.done) ? { done: true } : {
                done: false,
                value: [x1.done ? x1.value : extendWith,
                        x2.done ? x2.value : extendWith]
            };
        }
    };
}

// Sentinel style
function zipExtend(i1, i2, extendWith) {
    return {
        next: function(done, isDone) {
            var x1 = i1.next(done, isDone),
                x2 = i2.next(done, isDone);
            return (isDone(x1) && isDone(x2))
                 ? done()
                 : [x1, x2];
        }
    }
}

// Two-callback style
function zipExtend(i1, i2, extendWith) {
    return {
        next: function(next, done) {
            return i1.next(function(x1) {
                return i2.next(function(x2) {
                    return next([x1, x2]);
                }, function() {
                    return next([x1, extendWith]);
                });
            }, function() {
                return i2.next(function(x2) {
                    return next([extendWith, x2]);
                }, done);
            });
        }
    };
}

// Node-callback style
function zipExtend(i1, i2, extendWith) {
    return {
        next: function(cb) {
            return i1.next(function(done, x1) {
                return done
                     ? i2.next(function(done, x2) {
                         return done ? cb(true) : cb(false, [extendWith, x2]);
                     })
                     : i2.next(function(done, x2) {
                         return cb(false, [x1, done ? extendWith : x2]);
                     });
            });
        }
    };
}

// D-style ranges
function zipExtend(r1, r2, extendWith) {
    return {
        get empty() { return r1.empty && r2.empty; },
        get front() {
            return [r1.empty ? extendWith : r1.front,
                    r2.empty ? extendWith : r2.front];
        },
        popFront: function () {
            if (!r1.empty)
                r1.popFront();
            if (!r2.empty)
                r2.popFront();
        }
    };
}
