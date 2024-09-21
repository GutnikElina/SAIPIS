function saveData(event) {
  event.preventDefault();

  var gender = document.querySelector('input[name="pol"]:checked').value;
  var fullName = document.getElementById("fullName").value;
  var birthday = document.getElementById("birthday").value;
  var city = document.getElementById("town").value;

  var furniture = [];
  var furnitureCheckboxes = document.getElementsByName("furniture");
  furnitureCheckboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      furniture.push(checkbox.value);
    }
  });

  var color = document.getElementById("color").value;

  var formData = {
    gender: gender,
    fullName: fullName,
    birthday: birthday,
    city: city,
    furniture: furniture,
    color: color,
  };

  var savedForms = JSON.parse(localStorage.getItem("savedForms")) || [];
  savedForms.push(formData);
  localStorage.setItem("savedForms", JSON.stringify(savedForms));
  window.location.href = "results.html";
}

function displayData() {
  var savedForms = JSON.parse(localStorage.getItem("savedForms"));

  if (savedForms) {
    var tableBody = document.querySelector("table tbody");

    savedForms.forEach(function (formData) {
      var row = document.createElement("tr");

      var genderCell = document.createElement("td");
      genderCell.textContent = formData.gender;
      row.appendChild(genderCell);

      var fullNameCell = document.createElement("td");
      fullNameCell.textContent = formData.fullName;
      row.appendChild(fullNameCell);

      var dateCell = document.createElement("td");
      dateCell.textContent = formData.birthday;
      row.appendChild(dateCell);

      var cityCell = document.createElement("td");
      cityCell.textContent = formData.city;
      row.appendChild(cityCell);

      var furnitureCell = document.createElement("td");
      furnitureCell.textContent = formData.furniture.join(", ");
      row.appendChild(furnitureCell);

      var colorCell = document.createElement("td");
      colorCell.textContent = formData.color;
      colorCell.style.backgroundColor = formData.color;
      row.appendChild(colorCell);

      tableBody.appendChild(row);
    });
  }
}
displayData();
