
// Rendering never happens while the engine executes a task. Changes to the DOM 
// are painted only after the task is complete

// If a task takes too long, the browser can’t do other tasks, such as processing 
// user events. So after some time, it raises an alert like “Page Unresponsive”, 
// suggesting killing the task with the whole page

let i = 0;

let start = Date.now();

function count() {

    // Move the scheduling to the beginning. The earlier we schedule it – the faster 
    // it runs

    if (i < 1e9 - 1e6) {
        
        // Schedule the new call
        //   setTimeout(count); 

        // Schedule a new microtask
        queueMicrotask(count);
    }

    // Do a piece of the heavy job
    do {
        i++;
    } while (i % 1e6 != 0);

    if (i == 1e9) {
        console.log("Done in " + (Date.now() - start) + 'ms');
    }
}

count();
