class Client {
  constructor(
    id,
    fio,
    address,
    phoneNumber,
    illness,
    newProperty,
    newPropertyValue
  ) {
    this.id = id;
    this.fio = fio;
    this.address = address;
    this.illness = illness;
    this.phoneNumber = phoneNumber;
    this.newProperty = newProperty;
    this.newPropertyValue = newPropertyValue;
  }
}

const dbName = "ClientsDB";
const dbVersion = 1;

// Открытие или создание базы данных IndexedDB
const request = indexedDB.open(dbName, dbVersion);

request.onerror = function (event) {
  console.error("-!!!- Database error: " + event.target.errorCode + " -!!!-");
};

request.onsuccess = () => {
  console.log("-- Database opened successfully --");
};

request.onupgradeneeded = function (event) {
  const db = event.target.result;
  const objectStore = db.createObjectStore("clients", {
    keyPath: "id",
    autoIncrement: true,
  });
  objectStore.createIndex("fio", "fio", { unique: false });
  objectStore.createIndex("address", "address", { unique: false });
  objectStore.createIndex("phoneNumber", "phoneNumber", { unique: false });
  objectStore.createIndex("illness", "illness", { unique: false });
  objectStore.createIndex("newProperty", "newProperty", { unique: false });
  objectStore.createIndex("newPropertyValue", "newPropertyValue", {
    unique: false,
  });
};

//Открытие базы данных IndexedDB
function getDatabase() {
  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open(dbName, dbVersion);
    openRequest.onerror = reject;
    openRequest.onsuccess = () => resolve(openRequest.result);
  });
}

// Функция для отображения всех пациентов в таблице
function showAllClientsInTable(clients) {
  const tableBody = document.querySelector("#clientTable tbody");
  tableBody.innerHTML = "";
  for (let i = 0; i < clients.length; i++) {
    const client = clients[i];
    const tr = document.createElement("tr");
    tr.innerHTML = `
          <td>${client.id}</td>
          <td>${client.fio}</td>
          <td>${client.address}</td>
          <td>${client.phoneNumber}</td>
          <td>${client.illness}</td>
          <td>${client.newProperty}</td>
          <td>${client.newPropertyValue}</td>
        `;
    tableBody.appendChild(tr);
  }
}

// Функция для того, чтобы спрятать таблицу
function hideTable() {
  const tableBody = document.querySelector("#clientTable tbody");
  tableBody.innerHTML = "";
}

// Функция для добавления ID пациентов
function addOptionsToIdSelect(clients) {
  const idSelect = document.querySelector("#clientId");
  idSelect.innerHTML = "";
  const newOption = document.createElement("option");
  newOption.value = "-1";
  newOption.textContent = "-- Новый пациент --";
  idSelect.appendChild(newOption);
  for (let i = 0; i < clients.length; i++) {
    const client = clients[i];
    const newOption = document.createElement("option");
    newOption.value = client.id;
    newOption.textContent = client.id;
    idSelect.appendChild(newOption);
  }
}

// Функция для обновления формы данными выбранного пациента
function updateFormWithSelectedClient(client) {
  if (client) {
    document.querySelector("#clientId").value = client.id;
    document.querySelector("#clientFIO").value = client.fio;
    document.querySelector("#clientAddress").value = client.address;
    document.querySelector("#clientPhone").value = client.phoneNumber;
    document.querySelector("#clientIllness").value = client.illness;
    document.querySelector("#clientProperty").value = client.newProperty;
    document.querySelector("#clientPropertyValue").value =
      client.newPropertyValue;
  }
}

// Функция для очистки формы
function clearForm() {
  document.querySelector("#clientId").value = "-1";
  document.querySelector("#clientFIO").value = "";
  document.querySelector("#clientAddress").value = "";
  document.querySelector("#clientPhone").value = "";
  document.querySelector("#clientIllness").value = "";
  document.querySelector("#clientProperty").value = "";
  document.querySelector("#clientPropertyValue").value = "";
}

// Функция для получения из базы данных всех пациентов
async function getAllClientsFromDB() {
  return new Promise(async function (resolve, reject) {
    const db = await getDatabase();
    const transaction = db.transaction(["clients"], "readonly");
    const objectStore = transaction.objectStore("clients");
    const request = objectStore.getAll();

    request.onerror = function (event) {
      console.error("-!!!- Error getting clients: ", event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = function (event) {
      resolve(event.target.result);
    };
  });
}

// Функция для добавления пациента в базу данных
async function addClientToDB(client) {
  const db = await getDatabase();
  const transaction = db.transaction(["clients"], "readwrite");
  const objectStore = transaction.objectStore("clients");
  const request = objectStore.add(client);

  request.oncomplete = function (event) {
    console.log(" Add successfully");
  };

  request.onerror = function (event) {
    console.error("-!!!- Add error:", event.target.error);
  };
}

// Функция для удаления пациента из базы данных
async function deleteClientFromDB(id) {
  const db = await getDatabase();
  const transaction = db.transaction(["clients"], "readwrite");
  const objectStore = transaction.objectStore("clients");
  const request = objectStore.delete(id);

  request.oncomplete = function (event) {
    console.log(" Delete successfully");
  };

  request.onerror = function (event) {
    console.error("-!!!- Deleting error:", event.target.error);
  };
}

// Обновленный обработчик события для изменения выбранного пациента
document
  .querySelector("#clientId")
  .addEventListener("change", async (event) => {
    event.preventDefault();
    const id = event.target.value;
    if (id === "-1") {
      clearForm();
    } else {
      const clients = await getAllClientsFromDB();
      const client = clients.find((c) => c.id === id);
      updateFormWithSelectedClient(client);
      hideTable();
    }
  });

// Функция для обработки нажатия на кнопку "Добавить"
document
  .querySelector("#addButton")
  .addEventListener("click", async (event) => {
    event.preventDefault();
    const id = uuidv4();
    const fio = document.querySelector("#clientFIO").value;
    const address = document.querySelector("#clientAddress").value;
    const phoneNumber = document.querySelector("#clientPhone").value;
    const illness = document.querySelector("#clientIllness").value;
    const property = document.querySelector("#clientProperty").value;
    const propertyValue = document.querySelector("#clientPropertyValue").value;
    const client = new Client(
      id,
      fio,
      address,
      phoneNumber,
      illness,
      property,
      propertyValue
    );
    if (fio && address && phoneNumber) {
      await addClientToDB(client);
      const clients = await getAllClientsFromDB();
      addOptionsToIdSelect(clients);
      hideTable();
      clearForm();
    } else {
      console.log("-!!!- Заполните форму -!!!-");
    }
  });

// Функция для обработки нажатия на кнопку "Очистить"
document.querySelector("#clearButton").addEventListener("click", (event) => {
  event.preventDefault();
  clearForm();
});

// Функция для обработки нажатия на кнопку "Удалить"
document
  .querySelector("#deleteButton")
  .addEventListener("click", async (event) => {
    event.preventDefault();
    const id = document.querySelector("#clientId").value;
    if (id !== "-1") {
      await deleteClientFromDB(id);
      const clients = await getAllClientsFromDB();
      addOptionsToIdSelect(clients);
      hideTable();
      clearForm();
    }
  });

// Функция для обработки нажатия на кнопку "Показать всех клиентов"
document
  .querySelector("#showAllButton")
  .addEventListener("click", async (event) => {
    event.preventDefault();
    const clients = await getAllClientsFromDB();
    showAllClientsInTable(clients);
  });
