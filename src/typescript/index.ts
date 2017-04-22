import person from './person'; 
function greeter(person) {
    return "Hello, " + person;
}

document.body.innerHTML = greeter(person);
console.log(person);

if (module.hot) {
    module.hot.accept();
}
