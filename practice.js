// Exercises
// In the exercises below we'll use the following wholes array of whole numbers (positive integers) to test our filtering, mapping, and reducing.

const wholes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Helper Functions
// The functions below let us work with JavaScript arrays using a functional API(e.g.length(array)), instead of the usual object - oriented method - calling API(e.g.array.length).

// Concatenate two arrays into a new single array
function concat(array1, array2) {
    return array1.concat(array2);
}

// Return the number of items in an array
// length(array) to return the number of elements in the array(e.g.length([1, 2, 3]) returns 3)
function length(array) {
    return array.length;
}

// Return the first item in an array
// head(array) to return the first element of an array(e.g.head([1, 2, 3]) -> 1)
function head(array) {
    return array[0];
}

// Return the rest of an array after the first item
// tail(array) to return the rest of the array after the first element(e.g.tail([1, 2, 3]) returns[2, 3])
function tail(array) {
    return array.slice(1);
}

// 1. Filter
// The filter function takes a "predicate" function (a function that takes in a value and returns a boolean) and an array, 
// applies the predicate function to each value in the array, and returns a new array with only those values for which the predicate function returns true.

// The filter function has been implemented for you below:

function filter(predicateFn, array) {
    if (length(array) === 0) return [];
    const firstItem = head(array);
    const filteredFirst = predicateFn(firstItem) ? [firstItem] : [];
    return concat(filteredFirst, filter(predicateFn, tail(array)));
}

function isEven(n) {
    return n % 2 === 0;
}

const evens = filter(isEven, wholes); // [0,2,4,6,8,10]

const odds = filter(n => { // [1,3,5,7,9]
    return !isEven(n);
}, wholes)

const greaterThanFour = filter(n => n > 4, wholes) // [5,6,7,8,9,10]

function isPrime(n) {
    if (n <= 1) return false;
    const wholes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const possibleFactors = filter(m => m > 1 && m < n, wholes);
    const factors = filter(m => n % m === 0, possibleFactors);
    return factors.length === 0 ? true : false;
}

function isPrimeV2(n) {
    for (let i = 2; i < n; i++) {
        if (n % i === 0) return false;
    }
    return n > 1
}

const primes = filter(isPrime, wholes) // [2,3,5,7]


// 2. Map
// The map function takes a one - argument function and an array, and applies the function to each element in the array, returning a new array of the resulting values.
// To move towards a functional mindset, use these helper functions instead of the equivalent object - oriented array methods:
// Hint: remember that recursion is a functional programmer's best friend!

function map(fn, array) {
    if (length(array) === 0) return [];
    return [fn(head(array))].concat(map(fn, tail(array)));
}

function mapV2(fn, array) {
    if (length(array) === 0) return [];
    const firsItem = head(array);
    const mappedFirst = fn(firsItem);
    const restItems = tail(array);
    return concat([mappedFirst], map(fn, restItems))
}

const doubled = map(n => n * 2, wholes) // [0,2,4,6,8,10,12,14,16,18,20]

const halved = map(n => n / 2, wholes) // [0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5]

// Challenge: Mapping Fizz Buzz
// Fizz Buzz is a whole - number counting game in which each number divisible by 3 is replaced which "fizz",
// each number divisible by 5 is replaced with "buzz", and each number divisible by both 3 and 5 is replaced with "fizzbuzz"

// Complete the code below to implement the Fizz Buzz game by mapping over the wholes array.

const fizzBuzz = map(n => {
    const fizzed = n % 3 === 0 ? 'fizz' : '';
    const buzzed = n % 5 === 0 ? 'buzz' : '';
    return fizzed || buzzed ? fizzed + buzzed : n;
}, wholes) // [fizzbuzz,1,2,fizz,4,buzz,fizz,7,8,fizz,buzz]

const fizzBuzzV2 = map(n => {
    switch (true) {
        case n % 15 === 0:
            return "fizzbuzz";
        case n % 5 === 0:
            return "buzz";
        case n % 3 === 0:
            return "fizz";
        default:
            return n;
    }
}, wholes)

// 3. Reduce
// The reduce function is the odd one of the bunch.Unlike filter and map, which each take an array and return another array, 
// reduce takes in an array and returns a single value - in other words, it "reduces" an array to a single value.

// reduce takes three arguments:

// - a "reducer" function, which takes two arguments - an accumulator and the next value from the array - and returns a single value.This function will be applied to each value in the array, with the accumulator storing the reduced value so far.
// - an initial value, passed to the first call of the reducer function
// - the array to reduce

// Take a moment to read the recursive implementation of reduce below:

function reduce(reducerFn, initialValue, array) {
    if (length(array) === 0) return initialValue;
    const newInitialValue = reducerFn(initialValue, head(array));
    return reduce(reducerFn, newInitialValue, tail(array));
}

const sum = reduce(
    (accumulator, value) => {
        return accumulator + value;
    },
    0,
    wholes
) // 55

const max = reduce(
    (acc, curr) => {
        return acc > curr ? acc : curr
    },
    0,
    [7, 1, 3, 5, 6, 2, 8, 10, 0, 4, 9]
) // 10
