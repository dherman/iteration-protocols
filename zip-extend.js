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
    let done1 = false, done2 = false;
    return {
        next: function() {
            let x1, x2;
            if (done1) {
                x1 = extendWith;
            } else {
                try {
                    x1 = i1.next();
                } catch (e) {
                    if (isStopIteration(e)) {
                        done1 = true;
                        x1 = extendWith;
                    } else {
                        throw e;
                    }
                }
            }
            if (done2) {
                x2 = extendWith;
            } else {
                try {
                    x2 = i2.next();
                } catch (e) {
                    if (isStopIteration(e)) {
                        done2 = true;
                        x2 = extendWith;
                    } else {
                        throw e;
                    }
                }
            }
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
            return (!x1 && !x2) ? null : {
                value: [x1 ? x1.value : extendWith,
                        x2 ? x2.value : extendWith]
            };
        }
    };
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
