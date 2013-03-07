// ifilter: analog of Array.prototype.filter for iterators

// Functional style
function ifilter(predicate = a => a, iterable) {
    let iter = iterable[@iterator]();

    return {
        next: function() {
            if (!iter)
                return { done: true };
            let v;
            for (v = iter.next(); !v.done && !predicate(v.value); v = iter.next()) { }
            if (v.done)
                iter = null;
            return v;
        }
    };
}

// D-style ranges
function ifilter(predicate = a => a, collection) {
    let r = collection.range();
    var ready = false;
    return {
        get empty() {
            if (!ready) {
                while (!r.empty && !predicate(r.front))
                    r.popFront();
                ready = true;
            }
            return r.empty;
        },
        get front() {
            return r.front;
        },
        popFront: function () {
            r.popFront();
            ready = false;
        }
    };
}
