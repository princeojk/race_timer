//addeventlisteners
export function setupButtons(elem, func) {
    elem.addEventListener("touchstart", () => {
        elem.classList.toggle('active');
        func();
    });
    elem.addEventListener("touchend", () => {
        elem.classList.toggle('active');
    });
}