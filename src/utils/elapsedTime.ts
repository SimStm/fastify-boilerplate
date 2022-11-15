// Returns current time
// (and, if provided, prints the event's name)
export const timeNowInMs = (eventName = null) => {
    if (eventName) {
      console.log(`Started ${eventName}..`);
    }
    return new Date().getTime();
}

// Returns time elapsed since `beginning`
// (and, optionally, prints the duration in seconds)
export const timeElapsedInMs = (beginning: number, log = false) => {
    const duration = new Date().getTime() - beginning;
    if (log) {
        console.log(`${duration/1000}s`);
    }
    return duration;
}