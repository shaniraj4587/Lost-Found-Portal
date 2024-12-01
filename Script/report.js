// functoinality to open form
function opener() {
    document.getElementById('fatherofoverlay').style.display = 'block';
}
// Close button functionality
document.getElementById('closeBtnoverlay').addEventListener('click', () => {
    document.getElementById('fatherofoverlay').style.display = 'none';
});
document.getElementById('overlay').addEventListener('click', () => {
    document.getElementById('fatherofoverlay').style.display = 'none';
});
// report submit button
document.getElementById('reportBtn').addEventListener('click', () => {
    alert('Report submitted successfully!');
    document.getElementById('fatherofoverlay').style.display = 'none';
});