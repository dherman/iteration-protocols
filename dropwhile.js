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
