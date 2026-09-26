/* =========================================================
   ELVYRA FRONTEND JAVASCRIPT
   Backend connection:
   http://localhost:5000/api/enquiries
========================================================= */


/* =========================================================
   CONFIGURATION
========================================================= */

// IMPORTANT:
// This is your friend's current backend address.
//
// Local development:
// http://localhost:5000
//
// Later, when your friend deploys the backend,
// change this to the real backend URL.
const API_BASE_URL = "http://localhost:5000";


/* =========================================================
   PAGE LOADER
========================================================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("pageLoader");

    setTimeout(() => {
        if (loader) {
            loader.classList.add("hidden");
        }
    }, 500);

});


/* =========================================================
   NAVBAR
========================================================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("mobile-open");

        document.body.classList.toggle("menu-open");

    });


    const mobileLinks = navLinks.querySelectorAll(".nav-link");

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("mobile-open");

            document.body.classList.remove("menu-open");

        });

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const navItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");

function updateActiveNav() {

    let currentSection = "home";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 160;
        const sectionBottom =
            sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {
            currentSection = section.id;
        }

    });

    navItems.forEach(item => {

        item.classList.remove("active");

        const target = item.getAttribute("href");

        if (target === `#${currentSection}`) {
            item.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNav);

updateActiveNav();


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursorDot = document.getElementById("cursorDot");
const cursorRing = document.getElementById("cursorRing");

if (
    cursorDot &&
    cursorRing &&
    window.matchMedia("(pointer: fine)").matches
) {

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;


    window.addEventListener("mousemove", event => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;

    });


    function animateCursor() {

        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;

        requestAnimationFrame(animateCursor);

    }

    animateCursor();


    const interactiveElements =
        document.querySelectorAll(
            "a, button, input, textarea, select, .tilt-card"
        );


    interactiveElements.forEach(element => {

        element.addEventListener("mouseenter", () => {
            document.body.classList.add("cursor-hover");
        });

        element.addEventListener("mouseleave", () => {
            document.body.classList.remove("cursor-hover");
        });

    });

}


/* =========================================================
   THREE.JS 3D HERO
========================================================= */

function initThreeScene() {

    const canvas = document.getElementById("threeCanvas");

    if (!canvas || typeof THREE === "undefined") {
        return;
    }


    const container = canvas.parentElement;


    const scene = new THREE.Scene();

    scene.fog = new THREE.FogExp2(
        0x070708,
        0.035
    );


    const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        100
    );

    camera.position.set(
        0,
        0,
        9
    );


    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    renderer.outputColorSpace = THREE.SRGBColorSpace;


    /* =========================
       LIGHTS
    ========================== */

    const ambientLight = new THREE.AmbientLight(
        0xffffff,
        0.65
    );

    scene.add(ambientLight);


    const purpleLight = new THREE.PointLight(
        0x8b5cf6,
        25,
        20
    );

    purpleLight.position.set(
        4,
        2,
        5
    );

    scene.add(purpleLight);


    const pinkLight = new THREE.PointLight(
        0xec4899,
        16,
        15
    );

    pinkLight.position.set(
        -4,
        -2,
        3
    );

    scene.add(pinkLight);


    /* =========================
       DUMBBELL GROUP
    ========================== */

    const dumbbell = new THREE.Group();

    scene.add(dumbbell);


    /* =========================
       MATERIALS
    ========================== */

    const metalMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x19191e,
            metalness: 0.9,
            roughness: 0.2
        });


    const darkMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x08080b,
            metalness: 0.75,
            roughness: 0.28
        });


    const purpleMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x8b5cf6,
            metalness: 0.65,
            roughness: 0.22,
            emissive: 0x2b0c5f,
            emissiveIntensity: 0.3
        });


    const pinkMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xec4899,
            metalness: 0.65,
            roughness: 0.22,
            emissive: 0x4a0a28,
            emissiveIntensity: 0.3
        });


    /* =========================
       HANDLE
    ========================== */

    const handleGeometry =
        new THREE.CylinderGeometry(
            0.18,
            0.18,
            3.7,
            32
        );

    const handle =
        new THREE.Mesh(
            handleGeometry,
            metalMaterial
        );

    handle.rotation.z = Math.PI / 2;

    dumbbell.add(handle);


    /* =========================
       PLATE FUNCTION
    ========================== */

    function createPlate(
        x,
        radius,
        depth,
        material
    ) {

        const geometry =
            new THREE.CylinderGeometry(
                radius,
                radius,
                depth,
                64
            );

        const plate =
            new THREE.Mesh(
                geometry,
                material
            );

        plate.rotation.z =
            Math.PI / 2;

        plate.position.x = x;

        dumbbell.add(plate);


        const ringGeometry =
            new THREE.TorusGeometry(
                radius * 0.73,
                0.045,
                18,
                64
            );

        const ring =
            new THREE.Mesh(
                ringGeometry,
                pinkMaterial
            );

        ring.rotation.y =
            Math.PI / 2;

        ring.position.x = x;

        dumbbell.add(ring);


        const centreGeometry =
            new THREE.CylinderGeometry(
                radius * 0.28,
                radius * 0.28,
                depth + 0.04,
                32
            );

        const centre =
            new THREE.Mesh(
                centreGeometry,
                darkMaterial
            );

        centre.rotation.z =
            Math.PI / 2;

        centre.position.x = x;

        dumbbell.add(centre);


        return plate;

    }


    /* LEFT SIDE */
    createPlate(
        -2.05,
        0.85,
        0.26,
        purpleMaterial
    );

    createPlate(
        -1.62,
        0.58,
        0.23,
        darkMaterial
    );


    /* RIGHT SIDE */
    createPlate(
        2.05,
        0.85,
        0.26,
        pinkMaterial
    );

    createPlate(
        1.62,
        0.58,
        0.23,
        darkMaterial
    );


    /* =========================
       COLLARS
    ========================== */

    function createCollar(x) {

        const geometry =
            new THREE.CylinderGeometry(
                0.29,
                0.29,
                0.18,
                32
            );

        const collar =
            new THREE.Mesh(
                geometry,
                metalMaterial
            );

        collar.rotation.z =
            Math.PI / 2;

        collar.position.x = x;

        dumbbell.add(collar);

    }

    createCollar(-1.25);
    createCollar(1.25);


    /* =========================
       LOGO RINGS
    ========================== */

    const ringGroup = new THREE.Group();

    scene.add(ringGroup);


    for (let i = 0; i < 4; i++) {

        const geometry =
            new THREE.TorusGeometry(
                2.7 + i * 0.5,
                0.012,
                10,
                120
            );

        const material =
            new THREE.MeshBasicMaterial({
                color:
                    i % 2 === 0
                        ? 0x8b5cf6
                        : 0xec4899,
                transparent: true,
                opacity: 0.28
            });

        const ring =
            new THREE.Mesh(
                geometry,
                material
            );

        ring.rotation.x =
            Math.PI / 2.7;

        ring.rotation.z =
            i * 0.55;

        ringGroup.add(ring);

    }


    /* =========================
       PARTICLES
    ========================== */

    const particleCount = 700;

    const particlePositions =
        new Float32Array(
            particleCount * 3
        );

    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const radius =
            3.5 + Math.random() * 7;

        const angle =
            Math.random() * Math.PI * 2;

        const y =
            (Math.random() - 0.5) * 10;

        particlePositions[i * 3] =
            Math.cos(angle) * radius;

        particlePositions[i * 3 + 1] =
            y;

        particlePositions[i * 3 + 2] =
            Math.sin(angle) * radius;

    }


    const particleGeometry =
        new THREE.BufferGeometry();

    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            particlePositions,
            3
        )
    );


    const particleMaterial =
        new THREE.PointsMaterial({
            color: 0xb98cff,
            size: 0.025,
            transparent: true,
            opacity: 0.65
        });


    const particles =
        new THREE.Points(
            particleGeometry,
            particleMaterial
        );

    scene.add(particles);


    /* =========================
       MOUSE PARALLAX
    ========================== */

    let targetRotationX = 0;
    let targetRotationY = 0;

    window.addEventListener(
        "mousemove",
        event => {

            const normalizedX =
                event.clientX /
                window.innerWidth *
                2 -
                1;

            const normalizedY =
                event.clientY /
                window.innerHeight *
                2 -
                1;


            targetRotationY =
                normalizedX * 0.35;

            targetRotationX =
                normalizedY * 0.18;

        }
    );


    /* =========================
       ANIMATION
    ========================== */

    const clock = new THREE.Clock();

    function animate() {

        requestAnimationFrame(animate);

        const elapsed =
            clock.getElapsedTime();


        dumbbell.rotation.y +=
            (targetRotationY -
                dumbbell.rotation.y) * 0.03;

        dumbbell.rotation.x +=
            (targetRotationX -
                dumbbell.rotation.x) * 0.03;


        dumbbell.rotation.z =
            Math.sin(elapsed * 0.55) * 0.09;


        dumbbell.position.y =
            Math.sin(elapsed * 0.9) * 0.15;


        ringGroup.rotation.z =
            elapsed * 0.08;

        ringGroup.rotation.x =
            Math.sin(elapsed * 0.25) * 0.1;


        particles.rotation.y =
            elapsed * 0.015;

        particles.rotation.x =
            elapsed * 0.006;


        renderer.render(
            scene,
            camera
        );

    }

    animate();


    /* =========================
       RESIZE
    ========================== */

    function resizeRenderer() {

        const width =
            container.clientWidth;

        const height =
            container.clientHeight;


        camera.aspect =
            width / height;

        camera.updateProjectionMatrix();


        renderer.setSize(
            width,
            height
        );

        renderer.setPixelRatio(
            Math.min(window.devicePixelRatio, 2)
        );

    }

    window.addEventListener(
        "resize",
        resizeRenderer
    );

    resizeRenderer();

}


initThreeScene();


/* =========================================================
   TILT CARDS
========================================================= */

const tiltCards =
    document.querySelectorAll(".tilt-card");


tiltCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            if (
                !window.matchMedia(
                    "(pointer: fine)"
                ).matches
            ) {
                return;
            }


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateY =
                ((x - centerX) /
                    centerX) *
                5;


            const rotateX =
                ((centerY - y) /
                    centerY) *
                5;


            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";

        }
    );

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal, .reveal-right"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {
    observer.observe(element);
});


/* =========================================================
   CONTACT FORM -> BACKEND
========================================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );

const formStatus =
    document.getElementById(
        "formStatus"
    );

const submitBtn =
    document.getElementById(
        "submitBtn"
    );

const submitText =
    document.getElementById(
        "submitText"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            /* =========================
               GET FORM VALUES
            ========================== */

            const formData =
                new FormData(
                    contactForm
                );


            const enquiry = {

                name:
                    formData
                        .get("name")
                        ?.trim() || "",

                phone:
                    formData
                        .get("phone")
                        ?.trim() || "",

                email:
                    formData
                        .get("email")
                        ?.trim() || "",

                interest:
                    formData
                        .get("interest")
                        ?.trim() || "",

                message:
                    formData
                        .get("message")
                        ?.trim() || ""

            };


            /* =========================
               FRONTEND VALIDATION
            ========================== */

            if (
                !enquiry.name ||
                !enquiry.phone
            ) {

                showFormMessage(
                    "Please enter your name and phone number.",
                    "error"
                );

                return;
            }


            /* =========================
               LOADING STATE
            ========================== */

            setFormLoading(true);


            try {

                const response =
                    await fetch(
                        `${API_BASE_URL}/api/enquiries`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    enquiry
                                )
                        }
                    );


                /* =========================
                   RESPONSE
                ========================== */

                const result =
                    await response.json();


                if (
                    response.ok &&
                    result.success
                ) {

                    showFormMessage(
                        "Your enquiry has been sent successfully!",
                        "success"
                    );


                    contactForm.reset();

                } else {

                    showFormMessage(
                        result.message ||
                            "Could not send your enquiry.",
                        "error"
                    );

                }

            } catch (error) {

                console.error(
                    "Backend connection error:",
                    error
                );


                showFormMessage(
                    "Could not connect to the server. Please make sure the backend is running.",
                    "error"
                );

            } finally {

                setFormLoading(false);

            }

        }
    );

}


/* =========================================================
   FORM MESSAGE
========================================================= */

function showFormMessage(
    message,
    type
) {

    if (!formStatus) {
        return;
    }


    formStatus.textContent =
        message;

    formStatus.className =
        `form-status ${type}`;

}


/* =========================================================
   FORM LOADING
========================================================= */

function setFormLoading(
    loading
) {

    if (
        !submitBtn ||
        !submitText
    ) {
        return;
    }


    submitBtn.disabled =
        loading;


    if (loading) {

        submitText.textContent =
            "Sending...";

    } else {

        submitText.textContent =
            "Send Enquiry";

    }

}


/* =========================================================
   BACK TO TOP
========================================================= */

const backTop =
    document.getElementById(
        "backTop"
    );


window.addEventListener(
    "scroll",
    () => {

        if (!backTop) {
            return;
        }


        if (window.scrollY > 500) {

            backTop.classList.add(
                "show"
            );

        } else {

            backTop.classList.remove(
                "show"
            );

        }

    }
);


if (backTop) {

    backTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   SMOOTH LINK HANDLING
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link
                        .getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });