// To find all methods on an object in JavaScript, you must inspect both its own
// properties (methods attached directly to the instance) and its prototype chain 
// (inherited methods like .toString() or .slice()).

function getAllMethodNames(obj) {

  const methods = new Set();
  let currentObj = obj;

  // Traverse prototype chain up to Object.prototype
  while (currentObj && currentObj !== Object.prototype) {

    Object.getOwnPropertyNames(currentObj).forEach((prop) => {

      // Avoid triggering getter errors by checking property descriptors
      const descriptor = Object.getOwnPropertyDescriptor(currentObj, prop);
      if (descriptor && typeof descriptor.value === 'function') {
        methods.add(prop);
      }
    });

    currentObj = Object.getPrototypeOf(currentObj);
  }

  return Array.from(methods);
}

//----------------
// Built in array

const arr = [1, 2, 3];
console.log(getAllMethodNames(arr));
// Output: ['constructor', 'at', 'concat', 'copyWithin', 'fill', 'find', 'includes', 'indexOf', 'join', 'map', 'pop', 'push', 'slice', ...]

//----------------
// Class instance

class Car {
  drive() {}
  stop() {}
}

const myCar = new Car();
myCar.honk = function() {}; // Direct instance method

console.log(getAllMethodNames(myCar));
// Output: ['honk', 'constructor', 'drive', 'stop']
