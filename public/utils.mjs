//addeventlisteners
export function setupButtons(elem, func) {
    elem.addEventListener("touchstart", () => {
        elem.classList.toggle('active');
    });
    elem.addEventListener("touchend", () => {
        elem.classList.toggle('active');
        func();
    });
}