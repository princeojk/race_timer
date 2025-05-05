function removeTransition(e) {
    if (e.propertyName !== 'background-color') return;
    this.classList.remove('active');
}

//addeventlisteners
export function setupButtons(elem, func) {
    elem.addEventListener("touchstart", () => {
        elem.classList.toggle('active');
        func();
    });
    elem.addEventListener('transitionend', removeTransition);
}