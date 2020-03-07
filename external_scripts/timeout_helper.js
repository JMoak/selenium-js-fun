// Set up container to hold timeout and interval state
window.testing = {
  timeouts: {},
  intervals: []
};

// Make a copy of the original setTimeout function
window._setTimeout = window.setTimeout;
window.setTimeout = function(callback, timeout) {
  // We need a handle to store our timeout under, we can't just use the
  // timeout ID because we don't know it until after we create the timeout
  var handle = _.uniqueId();

  // Call the old setTimeout function
  var timeoutId = window._setTimeout(
    function() {
      // The callback is the function we were originally deferring
      callback();

      // Once a timeout completes, we need to remove our reference to it
      delete window.testing.timeouts[handle];
    },
    timeout
  );

  // Store the id of the timeout we just created so it can be queried
  window.testing.timeouts[handle] = timeoutId;
  return timeoutId;
};

// Make a copy of the original clearTimeout function
window._clearTimeout = window.clearTimeout;
window.clearTimeout = function(timeoutId) {
  // Call the original clearTimeout function to actually clear the timeout
  var returnValue = window._clearTimeout(timeoutId);

  var timeoutToClear;
  // Look over all the timeouts we have stored and find the one with
  // the timeoutID we just passed in
  _.each(window.testing.timeouts, function(storedTimeoutID, handle) {
    if(storedTimeoutID === timeoutId) {
      timeoutToClear = handle;
    }
  });

  // Delete our stored reference to the timeout
  delete window.testing.timeouts[timeoutToClear];

  return returnValue;
};

// Make a copy of the original setInterval function
window._setInterval = window.setInterval;
window.setInterval = function(cb, interval) {
  // Use the original setInterval function to schedule our interval
  var intervalId = window._setInterval(cb, interval);
  // Store the ID returned by the setInterval call
  window.testing.intervals.push(intervalId);
  return intervalId;
};

// Make a copy of the original clearInterval function
window._clearInterval = window.clearInterval;
window.clearInterval = function(intervalId) {
  // Use the original clearInterval function to clear our interval
  var returnValue = window._clearInterval(intervalId);
  // remove the passed interval ID from our list of IDs
  window.testing.intervals = _.without(window.testing.intervals, intervalId);
  return returnValue;
};
