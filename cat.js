// cat: a compound iterator with sequencing

// Python style
function cat(...is) {
    return {
        next: {
            let length;
            while ((length = is.length) > 0) {
                try {
                    return is[length - 1].next();
                } catch (e) {
                    if (isStopIteration(e)) {
                        is.pop();
                        continue;
                    }
                    throw e;
                }
            }
            throw StopIteration;
        }
    };
}

// Java style
function cat(...is) {
    return {
        hasNext: function() {
            let length = is.length;
            return length > 0 && is[length - 1].hasNext();
        },
        next: function() {
            let length;
            while ((length = is.length) > 0) {
                let i = is[length - 1];
                if (!i.hasNext()) {
                    is.pop();
                    continue;
                }
                return i.next();
            }
        }
    };
}

// C# style
function cat(...is) {
    // TODO
}

// Functional style
function cat(...is) {
    return {
        next: function() {
            let length;
            while ((length = is.length) > 0) {
                let next = is[length - 1].next();
                if (next.done) {
                    is.pop();
                    continue;
                }
                return next;
            }
            return { done: true };
        }
    };
}

// Two-callback style
function cat(...is) {
    return {
        next: function(next, done) {
            let length;
            while ((length = is.length) > 0) {
                let next = is[length - 1].next(function(x) {
                    return { value: x };
                }, function() {
                    return null;
                });
                if (!next) {
                    is.pop();
                    continue;
                }
                return next.value;
            }
            return done();
        }
    };
}

// Node-callback style
function cat(...is) {
    return {
        next: function(cb) {
            let length;
            while ((length = is.length) > 0) {
                let next = is[length - 1].next(function(done, x) {
                    return done ? null : { value: x };
                });
                if (!next) {
                    is.pop();
                    continue;
                }
                return next.value;
            }
            return done();
        }
    };
}
