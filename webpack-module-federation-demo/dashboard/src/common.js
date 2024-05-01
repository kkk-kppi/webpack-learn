function component() {
    const element = document.createElement('div');
    element.innerHTML = 'this is common modules'

    return element;
}
document.getElementById('app').appendChild(component())