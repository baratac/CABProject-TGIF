// ------------------------
// Main Variable definition

const gopTab = [];
const demTab = [];
const indTab = [];
const fullTab = [];

// ---------------------
// Utility Functions

function roundToTwo(num) { // Solution found on Stack Overflow
    return +(Math.round(num + "e+2") + "e-2");
}

// updateTabs 

let updateTabs = (fullData) => {

    // console.log(data.leng);
    for (let item of fullData) {
        if (item.party === 'R') {
            gopTab.push(item);
        } else if (item.party === 'D') {
            demTab.push(item);
        } else {
            indTab.push(item);
        }
        fullTab.push(item);
    }
}

//----------------------
// Sort Functions

let leastEngaged = (item1, item2) => {
    //console.log(item1.missed_votes_pct, item2.missed_votes_pct);
    if (item1.missed_votes_pct > item2.missed_votes_pct) {
        return -1;
    } else if (item1.missed_votes_pct < item2.missed_votes_pct) {
        return 1;
    } else {
        return 0;
    }
}

let mostEngaged = (item1, item2) => {
    if (item1.missed_votes_pct > item2.missed_votes_pct) {
        return 1;
    } else if (item1.missed_votes_pct < item2.missed_votes_pct) {
        return -1;
    } else {
        return 0;
    }
}

let leastLoyal = (item1, item2) => {
    if (item1.votes_with_party_pct > item2.votes_with_party_pct) {
        return 1;
    } else if (item1.votes_with_party_pct < item2.votes_with_party_pct) {
        return -1;
    } else {
        return 0;
    }
}

let mostLoyal = (item1, item2) => {
    if (item1.votes_with_party_pct > item2.votes_with_party_pct) {
        return -1;
    } else if (item1.votes_with_party_pct < item2.votes_with_party_pct) {
        return 1;
    } else {
        return 0;
    }
}

// ----------------------
// Stats Functions 

let getLoyaltyPct = (tab) => {

    if (tab.length === 0) {
        return 0;
    }
    let total = tab.reduce((acc, item) => {
        return acc + item.votes_with_party_pct;
    }, 0);
    return roundToTwo(total / tab.length);
}

let getLeastLoyalTen = (tab) => {
    let newTab = [];
    let tenPct = Math.round(tab.length / 10);
    let refValue = tab[tenPct - 1].votes_with_party_pct;

    // console.log(tenPct, tab.length);
    // console.log('REF LEAST:', refValue, tab[tenPct].votes_with_party_pct);
    newTab = tab.filter((item) => {
        return item.votes_with_party_pct <= refValue;
    });
    return newTab;
}

let getMostLoyalTen = (tab) => {
    let newTab = [];
    let tenPct = Math.round(tab.length / 10);
    let refValue = tab[tenPct - 1].votes_with_party_pct;

    //    console.log(tenPct, tab.length);
    //    console.log('REF MOST:', refValue, tab[tenPct - 1].votes_with_party_pct);
    newTab = tab.filter((item) => {
        return item.votes_with_party_pct >= refValue;
    });

    return newTab;
}

let getLeastEngagedTen = (tab) => {
    let newTab = [];
    let tenPct = Math.round(tab.length / 10);
    let refValue = tab[tenPct - 1].missed_votes_pct;

    // console.log(tenPct, tab.length);
    // console.log('REF LEAST:', refValue, tab[tenPct].missed_votes_pct);
    newTab = tab.filter((item) => {
        return item.missed_votes_pct >= refValue;
    });
    return newTab;
}

let getMostEngagedTen = (tab) => {
    let newTab = [];
    let tenPct = Math.round(tab.length / 10);
    let refValue = tab[tenPct - 1].missed_votes_pct;

    //    console.log(tenPct, tab.length);
    //    console.log('REF MOST:', refValue, tab[tenPct - 1].missed_votes_pct);
    newTab = tab.filter((item) => {
        return item.missed_votes_pct <= refValue;
    });

    return newTab;
}

// ---------------------
// Main Part
// ---------------------

updateTabs(data.results[0].members);

// console.log('GOP PARTY: ', getLoyaltyPct(gopTab));
// console.log('DEM PARTY: ', getLoyaltyPct(demTab));
// console.log('IND PARTY: ', getLoyaltyPct(indTab));

let pctInfo = {
    'R': getLoyaltyPct(gopTab),
    'D': getLoyaltyPct(demTab),
    'I': getLoyaltyPct(indTab)
};

console.log(pctInfo);

let loyaltyInfo = {
    most: getMostLoyalTen(fullTab.sort(mostLoyal)),
    least: getLeastLoyalTen(fullTab.sort(leastLoyal))
};

let engagedInfo = {
    most: getMostEngagedTen(fullTab.sort(mostEngaged)),
    least: getLeastEngagedTen(fullTab.sort(leastEngaged))
};

console.log(loyaltyInfo);
console.log(engagedInfo);