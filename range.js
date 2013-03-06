// range: a leaf iterator

// Python style
function range(low, high) {
    let i = low;
    return {
        next: function() {
            if (i >= high)
                throw StopIteration;
            return i++;
        }
    };
}

// Java style
function range(low, high) {
    let i = low;
    return {
        hasNext: function() {
            return i < high;
        },
        next: function() {
            if (i >= high)
                throw new Error("no next");
            return i++;
        }
    };
}

// C# style
function range(low, high) {
    let i = low - 1;
    return {
        get current() {
            if (i < low)
                throw new Error("not started");
            if (i >= high)
                throw new Error("finished");
            return i;
        },
        moveNext: function() {
            i++;
            return i < high;
        }
    };
}

// Functional style
function range(low, high) {
    let i = low;
    return {
        next: function() {
            return i >= high ? null : { value: i++ };
        }
    };
}

// Two-callback style
function range(low, high) {
    let i = low;
    return {
        next: function(next, done) {
            return i >= high ? done() : next(i++);
        }
    };
}

// Node-callback style
function range(low, high) {
    let i = low;
    return {
        next: function(cb) {
            return i >= high ? cb(true) : cb(false, i++);
        }
    };
}
