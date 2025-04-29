async function showResults() {
    const results = await fetch('/leaderBoard');
    const positions = await results.json();

    const table = document.querySelector(`#lists`);

    createHeader(positions, table);
    tableRows(positions, table)

}

function createHeader(positions, table) {
    const headers = Object.keys(positions[0]);
    const tr = document.createElement('tr');
    for (const hs of headers) {
        const th = document.createElement('th');
        th.textContent = hs;
        tr.appendChild(th);
    }
    table.appendChild(tr);
} 

function tableRows(positions, table) {
    const values = Object.values(positions);
    for (const runnerAttr of values) {
        const tr = document.createElement('tr');
       Object.values(runnerAttr).forEach((value) => {
        const td = document.createElement('td');
        td.textContent = value;
        tr.appendChild(td);
       });
       table.appendChild(tr);
    }
}

document.addEventListener('DOMContentLoaded', showResults);