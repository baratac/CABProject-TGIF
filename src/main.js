// ----------- Functions ------------

let createSenateCell = (content) => {
    let cell = document.createElement("td");
    cell.innerHTML = content;
    return cell;
}

let createSenateRow = (item) => {
        let tRow = document.createElement("tr");
        let newCell = Object;
        let fullName = item.first_name + " ";
        fullName += item.middle_name === null ? "" : item.middle_name + " ";
        fullName += item.last_name;
        newCell = createSenateCell(fullName, tRow);
        tRow.append(newCell);
        newCell = createSenateCell(item.party, tRow); // Party
        tRow.append(newCell);
        newCell = createSenateCell(item.state, tRow); // State
        tRow.append(newCell);
        newCell = createSenateCell(item.seniority, tRow); // Seniority
        tRow.append(newCell);
        newCell = createSenateCell(item.votes_with_party_pct + '%', tRow); // Votes with Party (percentage)
        tRow.append(newCell);
        return tRow;
    }
    // ----------- Main Part ------------

console.dir(document.body);
// console.log(document.body);

const elem = document.getElementById("chamber-data");

if (document.querySelector("body").baseURI.indexOf('index.html') !== -1) {
    elem.innerHTML = JSON.stringify(data, null, 2);
} else {
    const tBody = elem.querySelector("tbody");
    for (item of data.results[0].members) {
        tBody.append(createSenateRow(item));
    };
}