// HTML structure to add
const htmlContentofaboutpage = `<div id="fatherofabout">
        <div id="bodyofabout" onclick="removeaboutFromBody()">
            <div class="about-container" id="aboutUs" onclick="(event => event.stopPropagation())(event)">
                <div class="about-header">
                    <h1>About Us</h1>
                    <button class="close-btn" onclick="removeaboutFromBody()">✖</button>
                </div>
                <div class="about-content">
                    <div class="design-section">
                        <h2>Design and Develop By:</h2>
                        <div class="person">
                            <div class="person-detail">
                                <img src="Contents/shanipic.png" alt="Shani Raj" class="profile-pic">
                                <div>
                                    <p><strong>Shani Raj</strong></p>
                                    <p>Student of BCA: 2023-26</p>
                                </div>
                            </div>
                            <button class="contact-btn" onclick="contactme()">Contact</button>
                        </div>
                    </div>
                    <div class="guidance-section">
                        <h2>In the Guidance of:</h2>
                        <div class="person">
                            <div class="person-detail">
                                <img src="Contents/preetima'am.png" alt="Preeti Sharma" class="profile-pic">
                                <div>
                                    <p><strong>Preeti Sharma</strong></p>
                                    <p style="text-align: center;">Assistant Professor <br> (MMICT & BM)</p>
                                </div>
                            </div>
                            <button class="contact-btn" onclick="contactPreeti()">Contact</button>
                        </div>
                    </div>
                    <div class="description">
                        <p>Welcome to the MMDU Lost and Found Portal!</p>
                        <p>This platform has been designed and developed with the aim of making it easier for students,
                            faculty,
                            and staff to report and recover lost items within the college premises. Under the guidance
                            of
                            our
                            esteemed mentor, Preeti Sharma, this initiative strives to enhance community interaction and
                            accountability by bridging the gap between finding and returning lost belongings.</p>
                        <p>Whether you’ve misplaced something or found an unclaimed item, this portal is here to ensure
                            quick,
                            efficient, and secure resolutions. Our mission is to foster a responsible and connected
                            campus
                            community where every effort is made to reunite people with their belongings.</p>
                        <p>We’re committed to continuous improvement, and your feedback is valuable in making this
                            portal
                            better. Together, let’s make our college a more caring and organized space!</p>
                    </div>
                    <div class="references">
                        <h3>For Your References:</h3>
                        <p>Here is the design file:</p>
                        <iframe style="border: 5px solid rgba(102, 213, 100, 0.1);" width="100%" height="300px"
                            src="https://embed.figma.com/design/O1BJJ4sfBqY8qfJmeItujX/Lost-%24-Found-Portal?node-id=0-1&m=dev&embed-host=share"
                            allowfullscreen></iframe>
                        <p>Here is the all code:</p>
                        <iframe style="border: 5px solid rgba(102, 213, 100, 0.1);" width="100%" height="300px"
                            src="https://github.com/shaniraj4587/Lost-Found-Portal"
                            allowfullscreen></iframe>
                    </div>
                </div>
                <button class="close-btn-footer" onclick="closeModal('fatherofabout')">Close</button>

                
            </div>
        </div>
    </div>
`;

// Function to add the HTML to the body
function addaboutToBody() {

    // Check if the element already exists
    if (!document.getElementById('fatherofabout')) {
        document.body.insertAdjacentHTML('beforeend', htmlContentofaboutpage);
        console.log('HTML added to the body');
    } else {
        console.log('HTML already exists in the body');
    }
    openerofAbout();
}

function openerofAbout() {
    document.getElementById('fatherofabout').style.display = 'block';
    scrollToTop();
}
// Function to remove the HTML from the body
function removeaboutFromBody() {
    closeModal('fatherofabout');
    setTimeout(() => {
        const elementToRemove = document.getElementById('fatherofabout');
        if (elementToRemove) {
            elementToRemove.remove();
            console.log('HTML removed from the body');
        } else {
            console.log('HTML does not exist in the body');
        }
    }, 2000);
}



function openModal(modalId) {
    document.getElementById(modalId).style.display = "flex";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}


function scrollToTop() {
    // Scroll to top logic
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}





function contactme() {
    const email = "shaniraj4587@gmail.com";
    const subject = "Inquiry about Lost and Found Portal";
    const body = `Hey Shani, 
I recently saw your website and want to talk to you about this project and other things.`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}


function contactPreeti() {
    const email = "preeti.sharma@mmumullana.org";
    const subject = "Inquiry about Lost and Found Portal";
    const body = `Hey ma'am,
I recently saw your website and want to talk to you about this project and other things.`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}