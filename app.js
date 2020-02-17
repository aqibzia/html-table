let employeeData = [];

const form = document.querySelector('.js-form');

const table = document.querySelector('.table-body');

// adding the employee data

function addEmployee(employee) {
    const {id, first_name, last_name, email, department} = employee;
    table.insertAdjacentHTML('beforeend', `
        <tr class="emp" data-key="${id}">
            <td>${first_name}</td>
            <td>${last_name}</td>
            <td>${email}</td>
            <td>${department}</td>
            <td class="emp-button">
                <button class="edit-employee js-edit-employee">
                    Edit
                </button>
            </td>
            <td>
                <button class="delete-employee js-delete-employee">
                    delete
                </button>
            </td>
        </tr>
    `);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let first_name = document.querySelector('.first-name-input');
    let last_name = document.querySelector('.last-name-input');
    let email = document.querySelector('.email-input');
    let department = document.querySelector('.department-input');

    const employee = {
        id: Date.now(),
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
        department: department.value
    };

    first_name.value = '';
    last_name.value = '';
    email.value = '';
    department.value = '';

    employeeData.push(employee);

    addEmployee(employee);
});

table.addEventListener('click', (e) => {
    if(e.target.classList.contains('js-edit-employee')) {
        const key = e.target.parentElement.parentElement.dataset.key;
        editEmployee(key);
    }

    if(e.target.classList.contains('js-delete-employee')) {
        const key = e.target.parentElement.parentElement.dataset.key;
        deleteEmployee(key);
    }

    if(e.target.classList.contains('js-update-employee')) {
        const key = e.target.parentElement.parentElement.dataset.key;
        updateEmployee(key);
    }
});

// editing the employee data

function editEmployee(key) {
    const index = employeeData.findIndex( item => item.id === Number(key));
    const row = document.querySelector(`[data-key="${key}"]`);
    row.innerHTML = `
        <td><input type="text" class="first-name-edit-${key}" value="${employeeData[index].first_name}" /></td>
        <td><input type="text" class="last-name-edit-${key}" value="${employeeData[index].last_name}" /></td>
        <td><input type="text" class="email-edit-${key}" value="${employeeData[index].email}" /></td>
        <td><input type="text" class="department-edit-${key}" value="${employeeData[index].department}" /></td>
        <td class="emp-button">
            <button class="update-employee js-update-employee">
                update
            </button>
        </td>
    `;
}

// updating the employee

function updateEmployee(key) {
    const index = employeeData.findIndex( item => item.id === Number(key));

    let first_name = document.querySelector(`.first-name-edit-${key}`).value;
    let last_name = document.querySelector(`.last-name-edit-${key}`).value;
    let email = document.querySelector(`.email-edit-${key}`).value;
    let department = document.querySelector(`.department-edit-${key}`).value;

    employeeData[index].first_name = first_name;
    employeeData[index].last_name = last_name;
    employeeData[index].email = email;
    employeeData[index].department = department;

    const row = document.querySelector(`[data-key="${key}"]`);
    row.innerHTML = `
        <td>${first_name}</td>
        <td>${last_name}</td>
        <td>${email}</td>
        <td>${department}</td>
        <td class="emp-button">
            <button class="edit-employee js-edit-employee">
                Edit
            </button>
        </td>
        <td>
            <button class="delete-employee js-delete-employee">
                delete
            </button>
        </td>
    `;
    console.log(employeeData);
}

// deleting the employee data

function deleteEmployee(key) {
    employeeData = employeeData.filter( item => item.id !== Number(key));
    const row = document.querySelector(`[data-key="${key}"`);
    row.remove();
}
