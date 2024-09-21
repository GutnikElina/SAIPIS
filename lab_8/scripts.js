function fetchArrayData() {
  return fetch("originalArray.json")
    .then((response) => response.json())
    .then((data) => data);
}

function fetchSortedArray(order) {
  const filename =
    order === "asc" ? "sortedArrayAsc.json" : "sortedArrayDesc.json";
  return fetch(filename)
    .then((response) => response.json())
    .then((data) => data);
}

function toggleDecimalFormat() {
  const checkbox = document.getElementById("formatCheckbox");
  const cells = document.querySelectorAll("td");
  cells.forEach((cell) => {
    const value = parseFloat(cell.textContent);
    if (checkbox.checked) {
      cell.textContent = value.toFixed(2);
    } else {
      cell.textContent = value;
    }
  });
}

function renderTable(array) {
  const table = document.getElementById("arrayTable");
  table.innerHTML = "";
  const rows = 8;
  const columns = 10;
  for (let i = 0; i < rows; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < columns; j++) {
      const cell = document.createElement("td");
      cell.textContent = array[i * columns + j];
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

async function sortArray(order) {
  const array = await fetchSortedArray(order);
  renderTable(array);
}

window.onload = async function () {
  const array = await fetchArrayData();
  renderTable(array);
};
