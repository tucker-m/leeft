const preventDefaultFunction = function(callback: Function) {
    const callbackFunc = callback;
    return function(event: Event) {
        event.preventDefault();
        callbackFunc();
    }.bind(this);
};

export default preventDefaultFunction;
