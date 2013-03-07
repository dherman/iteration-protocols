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
                return null;
            var v = saved[i++];
            if (i === saved.length)
                i = 0;
            return { value: v };
        }
    };
}
