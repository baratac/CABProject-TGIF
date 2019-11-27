// ------- DOM utility functions ----

let keepOneOpen = (elem, ref) => {
    let elements = elem.querySelectorAll('[data-parent="#homeAccordion"]');
    let foundElem;
    let i = 0;

    for (let xElem of elements) {
        // console.log(i + ') ' + xElem.className);
        if (xElem.className.indexOf('show') !== -1) {
            foundElem = xElem;
            break;
        }
        if (xElem.className.indexOf('collapsing') !== -1) {
            foundElem = xElem;
            break;
        }
        i++;
    }
    if (foundElem == undefined) {
        //console.log('All sections all closed', elements);
        //elements[0].classList.add('show');
        ref.collapse('show');

    }
}


// For Home Page -----------------------
console.log('HOME PAGE');
elem = document.getElementById('homeAccordion');
if (elem != null) {

    $("#collapseOne").on("hidden.bs.collapse", () => keepOneOpen(elem, $("#collapseTwo")));
    $("#collapseTwo").on("hidden.bs.collapse", () => keepOneOpen(elem, $("#collapseOne")));
} else {
    console.log('--> content1 id not found...');
}