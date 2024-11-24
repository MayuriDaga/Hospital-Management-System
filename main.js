// Helper functions for local storage and ID management
function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Generate sequential ID for patients and doctors
function getNextId(key) {
    const data = getData(key);
    return data.length ? data[data.length - 1].id + 1 : 1;
}

// Add patient
document.getElementById('addPatientForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('patientName').value;
    const age = document.getElementById('patientAge').value;
    const condition = document.getElementById('patientCondition').value;

    const patients = getData('patients');
    const newId = getNextId('patients');
    patients.push({ id: newId, name, age, condition });
    saveData('patients', patients);
    alert('Patient added successfully');
    event.target.reset();
});

// View patients
function loadPatients() {
    const patients = getData('patients');
    const list = document.getElementById('patientList');
    list.innerHTML = patients.length
        ? patients.map(p => `<p>ID: ${p.id}, Name: ${p.name}, Age: ${p.age}, Condition: ${p.condition}</p>`).join('')
        : '<p>No patients found.</p>';
}

document.getElementById('patientList') && loadPatients();

// Update patient
document.getElementById('updatePatientForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = Number(document.getElementById('updatePatientId').value);
    const name = document.getElementById('newPatientName').value;
    const age = document.getElementById('newPatientAge').value;
    const condition = document.getElementById('newPatientCondition').value;

    const patients = getData('patients');
    const index = patients.findIndex(p => p.id === id);
    if (index > -1) {
        patients[index] = { id, name, age, condition };
        saveData('patients', patients);
        alert('Patient updated successfully');
    } else {
        alert('Patient not found');
    }
});

// Delete single or all patients
document.getElementById('deletePatientForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = Number(document.getElementById('deletePatientId').value);
    const patients = getData('patients');
    const updatedPatients = patients.filter(p => p.id !== id);
    saveData('patients', updatedPatients);
    alert('Patient deleted successfully');
    loadPatients();
});

document.getElementById('deleteAllPatients')?.addEventListener('click', () => {
    localStorage.removeItem('patients');
    alert('All patient records deleted');
    loadPatients();
});

// Add doctor
document.getElementById('addDoctorForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('doctorName').value;
    const specialization = document.getElementById('doctorSpecialization').value;
    const experience = document.getElementById('doctorExperience').value;

    const doctors = getData('doctors');
    const newId = getNextId('doctors');
    doctors.push({ id: newId, name, specialization, experience });
    saveData('doctors', doctors);
    alert('Doctor added successfully');
    event.target.reset();
});

// View doctors
function loadDoctors() {
    const doctors = getData('doctors');
    const list = document.getElementById('doctorList');
    list.innerHTML = doctors.length
        ? doctors.map(d => `<p>ID: ${d.id}, Name: ${d.name}, Specialization: ${d.specialization}, Experience: ${d.experience} years</p>`).join('')
        : '<p>No doctors found.</p>';
}

document.getElementById('doctorList') && loadDoctors();

// Update doctor
document.getElementById('updateDoctorForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = Number(document.getElementById('updateDoctorId').value);
    const name = document.getElementById('newDoctorName').value;
    const specialization = document.getElementById('newDoctorSpecialization').value;
    const experience = document.getElementById('newDoctorExperience').value;

    const doctors = getData('doctors');
    const index = doctors.findIndex(d => d.id === id);
    if (index > -1) {
        doctors[index] = { id, name, specialization, experience };
        saveData('doctors', doctors);
        alert('Doctor updated successfully');
    } else {
        alert('Doctor not found');
    }
});

// Delete single or all doctors
document.getElementById('deleteDoctorForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = Number(document.getElementById('deleteDoctorId').value);
    const doctors = getData('doctors');
    const updatedDoctors = doctors.filter(d => d.id !== id);
    saveData('doctors', updatedDoctors);
    alert('Doctor deleted successfully');
    loadDoctors();
});

document.getElementById('deleteAllDoctors')?.addEventListener('click', () => {
    localStorage.removeItem('doctors');
    alert('All doctor records deleted');
    loadDoctors();
});
