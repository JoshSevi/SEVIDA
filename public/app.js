// Your own Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA8M7Srd08oiO2TdQM1SOcJrNTTqFi6rvU",
    authDomain: "sevida-co.firebaseapp.com",
    databaseURL: "https://sevida-co-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sevida-co",
    storageBucket: "sevida-co.appspot.com",
    messagingSenderId: "103373890355",
    appId: "1:103373890355:web:4b030e8cf63bc4af681446",
    measurementId: "G-5FYKB8KW6G"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// User interaction functions
document.getElementById("createEmployeeBtn").addEventListener("click", function () {
    addEmployee();
});

document.getElementById("readEmployeeBtn").addEventListener("click", function () {
    let employeeIdField = document.getElementById("employeeId");
    let isReadOnly = employeeIdField.readOnly;

    if (!isReadOnly) {
        const employeeId = employeeIdField.value;

        if (!employeeId) {
            alert("Please provide the employee ID to read.");
            return;
        }

        readEmployee(employeeId);
        // Commented the line below to allow input after reading
        // employeeIdField.readOnly = true;
    } else {
        employeeIdField.readOnly = false;
    }
});

document.getElementById("updateEmployeeBtn").addEventListener("click", function () {
    const employeeId = document.getElementById("employeeId").value;
    const newName = document.getElementById("name").value;
    const newPosition = document.getElementById("position").value;
    const newDepartment = document.getElementById("department").value;
    const newContact = document.getElementById("contact").value;

    if (!employeeId) {
        alert("Please provide the employee ID to update.");
        return;
    }

    const newData = {};
    if (newName) newData.name = newName;
    if (newPosition) newData.position = newPosition;
    if (newDepartment) newData.department = newDepartment;
    if (newContact) newData.contact = newContact;

    updateEmployee(employeeId, newData);
});

document.getElementById("deleteEmployeeBtn").addEventListener("click", function () {
    const employeeId = document.getElementById("employeeId").value;

    if (!employeeId) {
        alert("Please provide the employee ID to delete.");
        return;
    }

    deleteEmployee(employeeId);
});

// Function to add an employee to the directory
// Function to add an employee to the directory
function addEmployee() {
    const name = document.getElementById("name").value;
    const position = document.getElementById("position").value;
    const department = document.getElementById("department").value;
    const contact = document.getElementById("contact").value;

    if (!name || !position || !department || !contact) {
        alert("Please provide all information to create an employee.");
        return;
    }

    // Get the maximum employee ID from existing employees
    db.collection('employees').get()
        .then((querySnapshot) => {
            let maxEmployeeId = 100; // Set a default starting ID
            querySnapshot.forEach((doc) => {
                const employeeId = doc.data().id;
                if (employeeId > maxEmployeeId) {
                    maxEmployeeId = employeeId;
                }
            });

            // Calculate the next employee ID
            const newEmployeeId = maxEmployeeId + 1;

            const documentId = newEmployeeId.toString();

            db.collection('employees').doc(documentId).set({
                id: newEmployeeId,
                name: name,
                position: position,
                department: department,
                contact: contact
            })
                .then(() => {
                    console.log("Employee added with ID: ", documentId);
                    getAllEmployees();
                    resetInputFields();
                })
                .catch((error) => {
                    console.error("Error adding employee: ", error);
                });
        })
        .catch((error) => {
            console.error("Error getting document count: ", error);
        });
}


// Function to read an employee's information based on document ID
function readEmployee(employeeId) {
    const employeeRef = db.collection('employees').doc(employeeId);

    employeeRef.get()
        .then((doc) => {
            if (doc.exists) {
                console.log(doc.id, " => ", doc.data());
                displayEmployeeData(doc.data());
                // Removed resetting input fields to allow editing
                // resetInputFields();
            } else {
                alert("Employee with ID not found");
            }
        })
        .catch((error) => {
            console.error("Error getting employee data: ", error);
        });
}

// Function to update an employee's information
function updateEmployee(employeeId, newData) {
    const employeeRef = db.collection('employees').doc(employeeId);

    employeeRef.update(newData)
        .then(() => {
            console.log("Employee updated successfully");
            getAllEmployees();
            resetInputFields();
        })
        .catch((error) => {
            console.error("Error updating employee: ", error);
        });
}

// Function to delete an employee from the directory
function deleteEmployee(employeeId) {
    db.collection('employees').doc(employeeId).delete()
        .then(() => {
            console.log("Employee deleted successfully");
            getAllEmployees();
            resetInputFields();
        })
        .catch((error) => {
            console.error("Error deleting employee: ", error);
        });
}

// Function to retrieve all employees from the directory and display as a dashboard
function getAllEmployees() {
    const employeesDashboard = document.getElementById("employeesDashboard");

    db.collection('employees').get()
        .then((querySnapshot) => {
            let tableHTML = "<table><tr><th>ID</th><th>Name</th><th>Position</th><th>Department</th><th>Contact</th></tr>";
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                tableHTML += `<tr><td>${doc.id}</td><td>${data.name}</td><td>${data.position}</td><td>${data.department}</td><td>${data.contact}</td></tr>`;
            });
            tableHTML += "</table>";
            employeesDashboard.innerHTML = tableHTML;
        })
        .catch((error) => {
            console.error("Error getting employees: ", error);
        });
}

// Function to display employee data in input fields
function displayEmployeeData(data) {
    document.getElementById("employeeId").value = data.id;
    document.getElementById("name").value = data.name;
    document.getElementById("position").value = data.position;
    document.getElementById("department").value = data.department;
    document.getElementById("contact").value = data.contact;
}

// Function to reset input fields
function resetInputFields() {
    document.getElementById("employeeId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("position").value = "";
    document.getElementById("department").value = "";
    document.getElementById("contact").value = "";
}

// Initial load of employees on page load
getAllEmployees();
