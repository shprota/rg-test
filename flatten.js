function flatten(arr) {
    if (!Array.isArray(arr)) {
        return [arr];
    }
    const result = [];
    for(const x of arr) {
        if (Array.isArray(x)) {
            result.push(...flatten(x));
        } else {
            result.push(x);
        }
    }
    return result;
}

function flatten2(arr) {
    if (!Array.isArray(arr)) {
        return [arr];
    }
    const result = [];
    const stack = [];
    let current = {arr, i: -1};

    do {
        current.i++;
        while(current.i < current.arr.length) {
            if (Array.isArray(current.arr[current.i])) {
                stack.push(current);
                current = {arr: current.arr[current.i], i: 0};
            } else {
                result.push(current.arr[current.i++]);
            }
        }
        current = stack.pop();
    } while(current);
    return result;
}

const a = [ 1, [ 2, [ 3, [8, 9, [11, 23, []], []] ] ], 4 ] ;
const b = [[[[[1]]], 2]];

console.log(flatten(a));
console.log(flatten2(a));
console.log(flatten(null));
console.log(flatten2(null));
console.log(flatten(22));
console.log(flatten2(22));
