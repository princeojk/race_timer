import * as util from '../utils.mjs';

const em = {}

function prepareHandles() {
    em.table = document.querySelector(`table`);
    em.csv = document.querySelector('#download-csv');

}

async function showResults() {
    const results = await fetch('/leaderBoard');
    const positions = await results.json();

    populateTableHeaders(positions[0], em.table);
    populateTableRows(positions, em.table);
}

function populateTableHeaders(data, table) {
    if (data == null) return;

    const thead = table.createTHead()
    const headers = Object.keys(data);
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

// Function to download the table as CSV
function downloadCSVFromTable(table) {
    const rows = Array.from(table.querySelectorAll('tr')); // convert nodelist to array
    if (rows == 0) return; // stop function if results is empty

    let csvContent = ''
    for (const row of rows) {
        const cells = Array.from(row.querySelectorAll('th, td'));
        let rowContent = '';

        for (const cell of cells) {
            rowContent += cell.textContent + ','; 
        }

        csvContent += rowContent.slice(0, -1) + '\n'; // Remove the last comma and add a new line
    }


    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leaderboard.csv';
    
    document.body.appendChild(a);
    a.click();
}

prepareHandles();
showResults();

util.setupButtons(em.csv, () => {
    downloadCSVFromTable(em.table);
})