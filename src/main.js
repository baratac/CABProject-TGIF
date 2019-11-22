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




// ----------- Functions ------------

let createChamberCell = (content) => {
    let cell = document.createElement("td");
    cell.innerHTML = content;
    return cell;
}

let createNameCell = (name, url) => {
    let cell = document.createElement("td");
    let link = document.createElement("a");

    link.innerHTML = name;
    link.setAttribute('title', name);
    link.setAttribute('href', url);
    link.setAttribute('target', '_blank');
    cell.append(link);
    return cell;

}

let createChamberRow = (item) => {
        let tRow = document.createElement("tr");
        let newCell = Object;
        let fullName = item.first_name + " ";
        fullName += item.middle_name === null ? "" : item.middle_name + " ";
        fullName += item.last_name;
        if (item.url.length === 0 || item.url == null) {
            newCell = createChamberCell(fullName);
        } else {
            newCell = createNameCell(fullName, item.url);
            tRow.setAttribute('data-href', item.url);
        }
        tRow.append(newCell);
        newCell = createChamberCell(item.party); // Party
        tRow.append(newCell);
        newCell = createChamberCell(item.state); // State
        tRow.append(newCell);
        newCell = createChamberCell(item.seniority); // Seniority
        tRow.append(newCell);
        newCell = createChamberCell(item.votes_with_party_pct + '%'); // Votes with Party (percentage)
        tRow.append(newCell);
        return tRow;
    }
    // ----------- Main Part ------------

console.dir(document.body);
// console.log(document.body);


if (typeof data !== 'undefined') { // Only When data is available
    let elem = document.getElementById("chamber-data");
    while (elem === null) {
        elem = document.getElementById("chamber-data");
    }

    if (document.querySelector("body").baseURI.indexOf('index.html') !== -1) {
        elem.innerHTML = JSON.stringify(data, null, 2);
    } else {
        const tBody = elem.querySelector("tbody");
        for (item of data.results[0].members) {
            tBody.append(createChamberRow(item));
        };
    }

    // For Senate/House pages -------------

    elem = document.getElementById("content-title");
    if (elem != null) {
        elem.onclick = () => {
            const imgElem = document.getElementById("content-title-arrow");
            if (imgElem.currentSrc.indexOf('up.svg') === -1) {
                imgElem.setAttribute('src', '../resources/icon-arrow-up.svg');
                imgElem.setAttribute('srcset', '../resources/icon-arrow-up.svg');
            } else {
                imgElem.setAttribute('src', '../resources/icon-arrow-down.svg');
                imgElem.setAttribute('srcset', '../resources/icon-arrow-down.svg');
            }
        }
    } else {
        console.log('No Content Title found...');
    }
} else {
    // For Home Page -----------------------

    elem = document.getElementById('homeAccordion');
    if (elem != null) {
        // $("#collapseOne").on("show.bs.collapse", () => console.log('1) show.bs.collapse'));
        // $("#collapseOne").on("shown.bs.collapse", () => console.log('1) shown.bs.collapse'));
        // $("#collapseOne").on("hide.bs.collapse", () => console.log('1) hide.bs.collapse'));
        $("#collapseOne").on("hidden.bs.collapse", () => keepOneOpen(elem, $("#collapseTwo")));
        // $("#collapseTwo").on("show.bs.collapse", () => console.log('2) show.bs.collapse'));
        // $("#collapseTwo").on("shown.bs.collapse", () => console.log('2) shown.bs.collapse'));
        // $("#collapseTwo").on("hide.bs.collapse", () => console.log('2) hide.bs.collapse'));
        $("#collapseTwo").on("hidden.bs.collapse", () => keepOneOpen(elem, $("#collapseOne")));
    } else {
        console.log('--> content1 id not found...');
    }
}