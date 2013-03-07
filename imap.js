// imap: n-ary map for iterators

// Functional style
function imap(fn = Array.of, ...iterables) {
    let iters = [for (c of iterables) c[@iterator]()];

    return {
        next: function() {
            if (!iters)
                return null;
            var args = [];
            for (let it of iters) {
                let v = it.next();
                if (!v) {
                    iters = null;
                    return null;
                }
                args[args.length] = v.value;
            }
            return { value: fn(...args) };
        }
    };
}
