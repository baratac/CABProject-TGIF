// MAIN Variables

const chamberSelection = { state: 'ALL', party: [] };

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

// Update Table Functions 

let updateTable = () => {

    let contentTab = document.getElementById("chamber-info");
    for (let node of contentTab.childNodes) {
        if (node.nodeType === 1 && node.nodeName === 'TR') {
            if (chamberSelection.state === 'ALL') {
                if (chamberSelection.party.includes(node.children[1].innerHTML)) {
                    node.style.display = "";
                } else {
                    node.style.display = "none";
                }
            } else if (node.children[2].innerHTML === chamberSelection.state) {
                if (chamberSelection.party.includes(node.children[1].innerHTML)) {
                    node.style.display = "";
                } else {
                    node.style.display = "none";
                }
            } else {
                node.style.display = "none";
            }
        }
    };
}

let stateUpdateTable = (selState) => {

    chamberSelection.state = selState;
    updateTable();

};

let partyUpdateTable = (selList) => {
    const selTab = [];

    if (document.getElementById("gopSel").checked) {
        //console.log('GOP Checked');
        selTab.push('R');
    }
    if (document.getElementById("demSel").checked) {
        //console.log('DEM Checked');
        selTab.push('D');
    }
    if (document.getElementById("indSel").checked) {
        //console.log('IND Checked');
        selTab.push('I');
    }
    chamberSelection.party = selTab;
    updateTable();
}

let partyInitTable = (partyCount) => {
        const selTab = [];

        if (partyCount.R > 0) {
            document.getElementById("gopSel").checked = true;
            selTab.push('R');
        } else {
            document.getElementById("gopSel").checked = false;
            document.getElementById("gopSel").disabled = true;
        }
        if (partyCount.D > 0) {
            document.getElementById("demSel").checked = true;
            selTab.push('D');
        } else {
            document.getElementById("demSel").checked = false;
            document.getElementById("demSel").disabled = true;
        }
        if (partyCount.I > 0) {
            document.getElementById("indSel").checked = true;
            selTab.push('I');
        } else {
            document.getElementById("indSel").checked = false;
            document.getElementById("indSel").disabled = true;
        }
        chamberSelection.party = selTab;
        updateTable();
    }
    // ----------- Main Part ------------

$(document).ready(function() {
    // console.dir(document.body);
    // console.log(document.body);
    let statesList = [];
    let partyCounter = { R: 0, D: 0, I: 0 };

    if (typeof data !== 'undefined') { // Only When data is available
        let elem = document.getElementById("chamber-data");

        if (document.querySelector("body").baseURI.indexOf('index.html') !== -1) {
            elem.innerHTML = JSON.stringify(data, null, 2);
        } else {
            const tBody = elem.querySelector("tbody");
            for (item of data.results[0].members) { // Update Chamber Table
                if (!statesList.includes(item.state)) { // Update States List
                    statesList.push(item.state);
                }
                partyCounter[item.party] = partyCounter[item.party] + 1;
                tBody.append(createChamberRow(item));
            };
            //console.log(partyCounter);
            partyInitTable(partyCounter);
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
        statesList.sort().unshift('ALL');
        // console.log('SHOW STATES LIST', statesList);

        let menuElem = document.getElementById("selectState");
        let aElem = Object;
        for (let idx = 0; idx < statesList.length; idx++) {
            aElem = document.createElement("a");
            aElem.innerHTML = statesList[idx];
            aElem.href = "#";
            aElem.classList.add('dropdown-item');
            menuElem.append(aElem);
        };
        let menuBtn = document.querySelector(".ddbtn");
        //console.dir(menuBtn);
        menuBtn.value = statesList[0];
        menuBtn.innerHTML = statesList[0];;
        // Drop Down Click Selection Handler

        $('#selectState a').click(function(event) {
            // Prevents browser from treating like normal anchor tag
            event.preventDefault()
            console.dir($(this));
            // Retrieves data in anchor tag
            //let data = $(this).attr('data');
            let x = this.text;
            //console.log(x, this);
            let menuBtn = document.querySelector(".ddbtn");
            console.dir(menuBtn);
            menuBtn.value = x;
            menuBtn.innerHTML = x;
            //menuBtn.innerText = x;
            stateUpdateTable(x);
        });

        $('.form-check-input').click(function(event) {

            console.log('Party Selection activated');
            let selElem = document.querySelectorAll(".form-check-input");
            console.dir(selElem);
            // Retrieves data in anchor tag
            //let data = $(this).attr('data');
            //let x = this.text;
            //console.log(x, this);
            //menuBtn.innerText = x;
            partyUpdateTable(selElem);
        });
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

});