const preventDefaultFunction = function(callback: Function) {
    const callbackFunc = callback;
    return (event: Event) => {
        event.preventDefault();
        callbackFunc();
    };
};

export default preventDefaultFunction;
