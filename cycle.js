// cycle: return elements from iterable, save a copy of each locally, and repeat the sequence indefinitely.

// Functional style
function cycle(iterable) {
    let iter = iterable[@iterator]();
    let saved = [];
    let i = 0;

    return {
        next: function() {
            if (iter) {
                var v = iter.next();
                if (v) {
                    saved[saved.length] = v.value;
                    return v;
                }
                iter = null;
            }
            if (saved.length === 0)
                return { done: true };
            var v = saved[i++];
            if (i === saved.length)
                i = 0;
            return { done: false, value: v };
        }
    };
}

// D-style ranges
function cycle(collection) {
    let r = collection.range();
    let saved = [];
    let i = 0;

    return {
        get empty() {
            return r === null && saved.length === 0;
        },
        get front() {
            return r ? r.front : saved[i];
        },
        popFront: function () {
            if (r) {
                saved[i++] = r.front;
                r.popFront();
                if (r.empty) {
                    r = null;
                    i = 0;
                }
            } else {
                if (++i === saved.length)
                    i = 0;
            }
        }
    };
}
