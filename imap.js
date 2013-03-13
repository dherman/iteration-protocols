// imap: n-ary map for iterators

// Functional style
function imap(fn = Array.of, ...iterables) {
    let iters = [for (c of iterables) c[@iterator]()];

    return {
        next: function() {
            if (!iters)
                return { done: true };
            var args = [];
            for (let it of iters) {
                let v = it.next();
                if (v.done) {
                    iters = null;
                    return v;
                }
                args[args.length] = v.value;
            }
            return { done: false, value: fn(...args) };
        }
    };
}

// Sentinel style
function imap(fn = Array.of, ...iterables) {
    let iters = [for (c of iterables) c[@iterator]()];

    return {
        next: function(done, isDone) {
            if (!iters)
                return done();
            var args = [];
            for (let it of iters) {
                let v = it.next(done, isDone);
                if (isDone(v)) {
                    iters = null;
                    return v;
                }
                args[args.length] = v;
            }
            return fn(...args);
        }
    };
}

// D-style ranges
function imap(fn = Array.of, ...collections) {
    let ranges = [for (c of collections) c.range()];
    let frontReady = false;
    let front;
    return {
        get empty() {
            for (let r of ranges) {
                if (r.empty)
                    return true;
            }
            return false;
        },
        get front() {
            if (!frontReady) {
                let args = [for (let r of range) r.front];
                front = fn(...args);
                frontReady = true;
            }
            return front;
        },
        popFront: function () {
            for (let r of ranges)
                r.popFront();
            frontReady = false;
        }
    };
}
