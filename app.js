let workoutTimer;
let workoutDuration = 0;

function showSection(section) {
    // Hide all sections
    document.querySelectorAll('section').forEach(sec => {
        sec.classList.remove('active');
    });

    // Show the selected section
    document.querySelector('.' + section).classList.add('active');
}

function startWorkout(workoutName, duration) {
    // Show the timer section and hide the workout section
    showSection('timer-section');
    document.getElementById('workout-name').innerText = workoutName;
    workoutDuration = duration * 60; // Convert minutes to seconds
    updateTimer();
    workoutTimer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const minutes = Math.floor(workoutDuration / 60);
    const seconds = workoutDuration % 60;
    document.getElementById('timer').innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    workoutDuration--;

    if (workoutDuration < 0) {
        stopWorkout();
    }
}


function stopWorkout() {
    clearInterval(workoutTimer);
    const workoutName = document.getElementById('workout-name').innerText;
    addToHistory(workoutName);
    showSection('history');
}
function addToHistory(workoutName) {
    const historyList = document.getElementById('history-list');
    const newHistoryItem = document.createElement('li');
    const currentDate = new Date().toLocaleString();
    newHistoryItem.innerText = `${workoutName} - ${currentDate}`;
    historyList.appendChild(newHistoryItem);
}
 // Function to handle profile picture upload
 function uploadProfilePicture() {
    const input = document.getElementById('profile-picture-input');
    const profilePicture = document.getElementById('profile-picture');
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        profilePicture.src = e.target.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}

// Function to show the edit form and hide the display elements
function editProfile() {
    document.querySelector('.profile-info').style.display = 'none';
    document.querySelector('.profile-edit-form').style.display = 'block';
    document.getElementById('edit-profile-btn').style.display = 'none';
}
 // Function to save the edited profile
 function saveProfile() {
    const newName = document.getElementById('name-input').value;
    const newEmail = document.getElementById('email-input').value;

    // Debugging output
    console.log("New Name:", newName);
    console.log("New Email:", newEmail);

    // Validate input before saving
    if (newName && newEmail) {
        document.getElementById('name-display').textContent = newName;
        document.getElementById('email-display').textContent = newEmail;

        // Hide the edit form and show the updated profile info
        document.querySelector('.profile-info').style.display = 'block';
        document.querySelector('.profile-edit-form').style.display = 'none';
        document.getElementById('edit-profile-btn').style.display = 'block';
    } else {
        alert('Please enter valid details.');
    }
}
// Function to cancel the edit and restore the display elements
function cancelEdit() {
    document.querySelector('.profile-info').style.display = 'block';
    document.querySelector('.profile-edit-form').style.display = 'none';
    document.getElementById('edit-profile-btn').style.display = 'block';
}
//Function to get the current date and time
function updateJoinedDate() {
    const joinedDateElement = document.getElementById('joined-date');
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    joinedDateElement.textContent = `Joined: ${now.toLocaleDateString('en-US', options)}`;
}

// Call the function to update the joined date on page load
window.onload = updateJoinedDate;