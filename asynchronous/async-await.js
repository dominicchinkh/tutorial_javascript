
//-----------------
// Async functions

// async function always returns a promise
async function f() {
    // return 1; // Promise { 1 }
    return Promise.resolve(1); // Promise { <pending> }
}

f().then(console.log);

//-------
// Await

async function g() {

    let promise = new Promise((resolve, reject) => {
        setTimeout(
            () => resolve("done!"), 
            1000
        )
    });

    // The keyword await makes JavaScript wait until that promise resolves and returns
    // its result

    // Note: await literally suspends the function execution until the promise settles,
    // and then resumes it with the promise result

    // Note: await only works inside an async function

    let result = await promise;

    console.log(result);
}

let value = await g();

// Multiple await
async function getAvatarUrl() {

    // Read Github user
    let githubResponse = await fetch(`https://api.github.com/users/dominicchinkh`);
    let githubUser = await githubResponse.json();

    // Wait 1 seconds
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));

    return githubUser.avatar_url;
}

getAvatarUrl().then(console.log);

// To declare an async class method, just prepend it with async
class Waiter {
    async wait() {
        return await Promise.resolve(1);
    }
}

new Waiter()
    .wait()
    .then(console.log);

// When we need to wait for multiple promises, we can wrap them in Promise.all and 
// then await

let results = await Promise.all([
    fetch('https://www.google.com'),
    fetch('https://javascript.info/async-await')
]);

//----------------
// Error handling

async function h() {
    // It is the same as `throw new Error("Whoops!");`
    await Promise.reject(new Error("Whoops!"));
}

async function a() {

    // We can catch that error using try..catch
    try {
        let response = await fetch('http://no-such-url');
    } catch(err) {
        console.log(err);
    }
}

a();

async function b() {
    let response = await fetch('http://no-such-url');
}

// b() becomes a rejected promise
b().catch(console.log);

// If we forget to add .catch there, then we get an unhandled promise error
