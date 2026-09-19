/* =====================================================
   NAVBAR SCROLL EFFECT
===================================================== */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

<<<<<<< HEAD

/* Close mobile menu */

=======
>>>>>>> e70ebe92645b8bbb71f989a79d1c8a8cba332035
document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("show");
    });
});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
<<<<<<< HEAD

            currentSection = section.getAttribute("id");

=======
            current = section.getAttribute("id");
>>>>>>> e70ebe92645b8bbb71f989a79d1c8a8cba332035
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

<<<<<<< HEAD
        if (
            link.getAttribute("href") === "#" + currentSection
        ) {

=======
        if (link.getAttribute("href") === "#" + current) {
>>>>>>> e70ebe92645b8bbb71f989a79d1c8a8cba332035
            link.classList.add("active");
        }

    });

});


/* =====================================================
   BACK TO TOP
===================================================== */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =====================================================
   CONTACT FORM
   FRONTEND ONLY
===================================================== */

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async function(event) {

    event.preventDefault();

<<<<<<< HEAD

    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const interest =
        document.getElementById("interest").value;

=======
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const interest = document.getElementById("interest").value;
    const message = document.getElementById("message").value.trim();
>>>>>>> e70ebe92645b8bbb71f989a79d1c8a8cba332035

    if (!name || !phone) {
        alert("Please enter your name and phone number.");
        return;
    }

    try {

<<<<<<< HEAD
    let selectedInterest = "your enquiry";

    if (interest) {

        selectedInterest = interest;

    }


    /*
        FRONTEND ONLY FOR NOW.

        Your friend's backend can later replace
        this alert with an API request.

        Example:

        fetch("/api/enquiry", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                phone: phone,
                interest: interest
            })
        });
    */
=======
        const response = await fetch(
            "http://localhost:5000/api/enquiries",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },
>>>>>>> e70ebe92645b8bbb71f989a79d1c8a8cba332035

                body: JSON.stringify({
                    name: name,
                    phone: phone,
                    email: email,
                    interest: interest,
                    message: message
                })
            }
        );

<<<<<<< HEAD
    alert(
        "Thank you, " +
        name +
        "!\n\n" +
        "Your enquiry about " +
        selectedInterest +
        " has been received.\n\n" +
        "The MS Fitness team can contact you soon."
    );
=======
        const result = await response.json();
>>>>>>> e70ebe92645b8bbb71f989a79d1c8a8cba332035

        if (result.success) {

            alert(result.message);

            contactForm.reset();

        } else {

            alert("Something went wrong.");

        }

    } catch (error) {

        console.error("Error:", error);

        alert("Could not connect to the gym server.");

    }

});


/* =====================================================
   PREVENT EMPTY LINKS
===================================================== */

document.querySelectorAll('a[href="#"]').forEach(link => {

    link.addEventListener("click", function(event) {

        event.preventDefault();

    });

});