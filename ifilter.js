// ifilter: analog of Array.prototype.filter for iterators

// Functional style
function ifilter(predicate = a => a, iterable) {
    var iter = iterable[@iterator]();
    return {
        next: function() {
            if (!iter)
                return null;
            var v;
            while ((v = iter.next()) && !predicate(v.value))
                v = iter.next();
            if (!v)
                iter = null;
            return v;
        }
    };
}
