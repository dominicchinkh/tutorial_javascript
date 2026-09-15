//---------------------------------------------
// PART 1: Prototypal Chain with Object.create

// Base prototype object containing shared behavior
const animalPrototype = {
  makeSound() {
    console.log(`${this.name} makes a noise.`);
  }
};

// Create an instance linking directly to animalPrototype
const genericAnimal = Object.create(animalPrototype);
genericAnimal.name = 'Generic Animal';

// Delegates to animalPrototype.makeSound()
genericAnimal.makeSound(); // Output: Generic Animal makes a noise.

//--------------------------------------------------
// PART 2: Constructor Function & Prototype Linking

// Constructor function for specific Dog instances
function Dog(name, breed) {
  this.name = name;   // Own property
  this.breed = breed; // Own property
}

// Link Dog.prototype to inherit from animalPrototype
Dog.prototype = Object.create(animalPrototype);

// Set constructor reference back to Dog
Dog.prototype.constructor = Dog;

// Add a Dog-specific method to its prototype
Dog.prototype.bark = function() {
  console.log(`${this.name} the ${this.breed} barks: Woof!`);
};

//------------------------------------------------
// PART 3: Instantiation & Prototype Verification

const rex = new Dog('Rex', 'German Shepherd');
const bella = new Dog('Bella', 'Poodle');

// 1. Dog-specific prototype method
rex.bark(); // Output: Rex the German Shepherd barks: Woof!

// 2. Inherited animalPrototype method (2 levels up the chain)
rex.makeSound(); // Output: Rex makes a noise.

// 3. Shared memory check: both instances reference the exact same functions
console.log(rex.bark === bella.bark);           // true
console.log(rex.makeSound === bella.makeSound); // true

// 4. Inspection of own vs. inherited properties
console.log(rex.hasOwnProperty('name'));       // true (own)
console.log(rex.hasOwnProperty('bark'));       // false (inherited from Dog.prototype)
console.log(rex.hasOwnProperty('makeSound'));  // false (inherited from animalPrototype)
