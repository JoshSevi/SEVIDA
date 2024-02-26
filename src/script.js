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
const analytics = firebase.analytics();
const db = firebase.firestore();

// User interaction functions
document.getElementById("addEmployeeBtn").addEventListener("click", function () {
    const name = prompt("Enter employee name:");
    const position = prompt("Enter employee position:");
    const department = prompt("Enter employee department:");
    const contact = prompt("Enter employee contact:");

    addEmployee(name, position, department, contact);
});

document.getElementById("getAllEmployeesBtn").addEventListener("click", function () {
    getAllEmployees();
});

document.getElementById("updateEmployeeBtn").addEventListener("click", function () {
    const employeeId = prompt("Enter employee ID to update:");
    const newName = prompt("Enter new name:");
    const newDepartment = prompt("Enter new department:");
    const newContact = prompt("Enter new contact:");

    updateEmployee(employeeId, { name: newName, department: newDepartment, contact: newContact });
});

document.getElementById("deleteEmployeeBtn").addEventListener("click", function () {
    const employeeId = prompt("Enter employee ID to delete:");

    deleteEmployee(employeeId);
});

// Function to add an employee to the directory
function addEmployee(name, position, department, contact) {
    const employeeData = {
        name: name,
        position: position,
        department: department,
        contact: contact
    };

    // Add the employee data to the 'employees' collection
    db.collection('employees').add(employeeData)
        .then((docRef) => {
            console.log("Employee added with ID: ", docRef.id);
            getAllEmployees(); // Refresh the employee list after adding
        })
        .catch((error) => {
            console.error("Error adding employee: ", error);
        });
}

// Function to retrieve all employees from the directory
function getAllEmployees() {
    const employeeList = document.getElementById("employeeList");
    employeeList.innerHTML = ""; // Clear previous list

    // Wait for Firebase to initialize before accessing db
    setTimeout(() => {
        db.collection('employees').get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());

                    // Display employee in the list
                    const listItem = document.createElement("li");
                    listItem.textContent = `${doc.data().name} - ${doc.data().position} - ${doc.data().department} - ${doc.data().contact}`;
                    employeeList.appendChild(listItem);
                });
            })
            .catch((error) => {
                console.error("Error getting employees: ", error);
            });
    }, 1000); // Adjust the delay if needed
}

// Function to update an employee's information
function updateEmployee(employeeId, newData) {
    const employeeRef = db.collection('employees').doc(employeeId);

    employeeRef.update(newData)
        .then(() => {
            console.log("Employee updated successfully");
            getAllEmployees(); // Refresh the employee list after updating
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
            getAllEmployees(); // Refresh the employee list after deleting
        })
        .catch((error) => {
            console.error("Error deleting employee: ", error);
        });
}
