// dropwhile: drops elements from an iterable as long as predicate is true, then produces rest of the sequence

// Functional style.
function dropwhile(predicate, iterable) {
    let iter = iterable[@iterator]();
    let first = false;

    return {
        next: function() {
            if (!iter)
                return { done: true };
            var v = iter.next();
            if (first) {
                while (!v.done && predicate(v.value))
                    v = iter.next();
                first = false;
            }
            if (v.done)
                iter = null;
            return v;
        }
    };
}

// D-style ranges
function dropwhile(predicate, collection) {
    var r = collection.range();
    var first = true;
    return {
        get empty() {
            // The consumer must call this before the other methods.
            if (first) {
                while (!r.empty && predicate(r.front))
                    r.popFront();
                first = false;
            }
            return r.empty;
        },
        get front() { return r.front; },
        popFront: function () { r.popFront(); }
    };
}
