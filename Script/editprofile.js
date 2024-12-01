document.getElementById('closeBtnofeditprofile').addEventListener('click', function () {
    document.getElementById('fatherofeditprofile').style.display = 'none';
});
// functoinality to open form
function openereditprofile() {
    document.getElementById('fatherofeditprofile').style.display = 'block';
}


document.getElementById('editForm').addEventListener('click', () => {
    document.getElementById('fatherofeditprofile').style.display = 'none';
});

document.getElementById('saveBtn').addEventListener('click', function () {
    const userData = {
        name: document.getElementById('name').value,
        role: document.getElementById('role').value,
        rollno: document.getElementById('rollno').value,
        contact: document.getElementById('contact').value,
        oldPassword: document.getElementById('oldPassword').value,
        newPassword: document.getElementById('newPassword').value,
        confirmPassword: document.getElementById('confirmPassword').value,
    };

    if (userData.newPassword !== userData.confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    console.log('User Data Saved:', userData);
    alert('Data Saved Successfully!');
    document.getElementById('fatherofeditprofile').style.display = 'none';
});