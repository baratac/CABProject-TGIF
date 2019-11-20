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

let createSenateRow = (item) => {
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

let elem = document.getElementById("chamber-data");
while (elem === null) {
    elem = document.getElementById("chamber-data");
}

if (document.querySelector("body").baseURI.indexOf('index.html') !== -1) {
    elem.innerHTML = JSON.stringify(data, null, 2);
} else {
    const tBody = elem.querySelector("tbody");
    for (item of data.results[0].members) {
        tBody.append(createSenateRow(item));
    };
}