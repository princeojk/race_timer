async function showResults() {
    const results = await fetch('/leaderBoard');
    const positions = await results.json();

    const table = document.querySelector(`table`);

    populateTableHeaders(positions, table);
    populateTableRows(positions, table);
}

function populateTableHeaders(data, table) {
    const thead = table.createTHead()
    const headers = Object.keys(data[0]);
    const tr = document.createElement('tr');
    for (const title of headers) {
        const th = document.createElement('th');
        th.textContent = title;
        tr.appendChild(th);
    }
    thead.appendChild(tr);
} 

// displays results of race as well as IDs of each runner 
function populateTableRows(data, table) {
    const tBody = table.createTBody()
    const values = Object.values(data);
    for (const runnerAttr of values) {
        const tr = document.createElement('tr');
       Object.values(runnerAttr).forEach((value) => {
        const td = document.createElement('td');
        td.textContent = value;
        tr.appendChild(td);
       });
       tBody.appendChild(tr);
    }
}

document.addEventListener('DOMContentLoaded', showResults);