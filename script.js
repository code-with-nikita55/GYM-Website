/* =====================================================
   PAGE LOADER
===================================================== */

window.addEventListener("load", () => {

    const loader =
        document.getElementById("pageLoader");

    setTimeout(() => {

        loader.classList.add("hidden");

    }, 500);

});


/* =====================================================
   NAVBAR
===================================================== */

const navbar =
    document.getElementById("navbar");


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

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");


menuToggle.addEventListener(
    "click",
    () => {

        navMenu.classList.toggle("show");

    }
);


document
    .querySelectorAll(".nav-menu a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navMenu.classList.remove("show");

            }
        );

    });


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-menu a"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "";

        sections.forEach(section => {

            const top =
                section.offsetTop - 180;

            const height =
                section.offsetHeight;


            if (
                window.scrollY >= top &&
                window.scrollY <
                top + height
            ) {

                current =
                    section.getAttribute(
                        "id"
                    );

            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );


            if (
                link.getAttribute("href") ===
                "#" + current
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }
);


/* =====================================================
   CUSTOM CURSOR
===================================================== */

const cursorDot =
    document.querySelector(".cursor-dot");

const cursorRing =
    document.querySelector(".cursor-ring");


let cursorX = 0;
let cursorY = 0;

let ringX = 0;
let ringY = 0;


window.addEventListener(
    "mousemove",
    event => {

        cursorX =
            event.clientX;

        cursorY =
            event.clientY;


        cursorDot.style.left =
            cursorX + "px";

        cursorDot.style.top =
            cursorY + "px";

    }
);


function animateCursor() {

    ringX +=
        (cursorX - ringX) * .12;

    ringY +=
        (cursorY - ringY) * .12;


    cursorRing.style.left =
        ringX + "px";

    cursorRing.style.top =
        ringY + "px";


    requestAnimationFrame(
        animateCursor
    );

}


animateCursor();


document
    .querySelectorAll("a, button, .tilt-card")
    .forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                cursorRing.style.width =
                    "55px";

                cursorRing.style.height =
                    "55px";

                cursorRing.style.borderColor =
                    "rgba(182,156,255,.75)";

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                cursorRing.style.width =
                    "35px";

                cursorRing.style.height =
                    "35px";

                cursorRing.style.borderColor =
                    "rgba(182,156,255,.45)";

            }
        );

    });


/* =====================================================
   THREE.JS 3D HERO
===================================================== */

const canvas =
    document.getElementById(
        "heroCanvas"
    );


if (
    canvas &&
    typeof THREE !== "undefined"
) {


    const scene =
        new THREE.Scene();


    const camera =
        new THREE.PerspectiveCamera(
            38,
            window.innerWidth /
                window.innerHeight,
            .1,
            100
        );


    camera.position.set(
        0,
        .2,
        8
    );


    const renderer =
        new THREE.WebGLRenderer({

            canvas: canvas,

            alpha: true,

            antialias: true,

            powerPreference:
                "high-performance"

        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            1.8
        )
    );


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


    /* -------------------------------------------------
       GROUP
    ------------------------------------------------- */

    const gymObject =
        new THREE.Group();


    gymObject.position.x =
        2.35;

    gymObject.position.y =
        .1;


    scene.add(
        gymObject
    );


    /* -------------------------------------------------
       DUMBBELL BAR
    ------------------------------------------------- */

    const barGeometry =
        new THREE.CylinderGeometry(
            .055,
            .055,
            3.6,
            32
        );


    const metalMaterial =
        new THREE.MeshPhysicalMaterial({

            color: 0xc8c5cc,

            metalness: .92,

            roughness: .18,

            clearcoat: 1

        });


    const bar =
        new THREE.Mesh(
            barGeometry,
            metalMaterial
        );


    bar.rotation.z =
        Math.PI / 2;


    gymObject.add(
        bar
    );


    /* -------------------------------------------------
       DUMBBELL PLATES
    ------------------------------------------------- */

    const plateMaterial =
        new THREE.MeshPhysicalMaterial({

            color: 0x17141f,

            metalness: .80,

            roughness: .22,

            clearcoat: 1,

            clearcoatRoughness: .15

        });


    const glowMaterial =
        new THREE.MeshPhysicalMaterial({

            color: 0x8b5cf6,

            emissive: 0x5b21b6,

            emissiveIntensity: 1.4,

            metalness: .35,

            roughness: .20

        });


    function createPlate(
        radius,
        thickness,
        y
    ) {

        const geometry =
            new THREE.CylinderGeometry(
                radius,
                radius,
                thickness,
                64
            );


        const plate =
            new THREE.Mesh(
                geometry,
                plateMaterial
            );


        plate.rotation.z =
            Math.PI / 2;


        plate.position.x =
            y;


        gymObject.add(
            plate
        );


        return plate;

    }


    function createGlowPlate(
        radius,
        thickness,
        x
    ) {

        const geometry =
            new THREE.CylinderGeometry(
                radius,
                radius,
                thickness,
                64
            );


        const plate =
            new THREE.Mesh(
                geometry,
                glowMaterial
            );


        plate.rotation.z =
            Math.PI / 2;


        plate.position.x =
            x;


        gymObject.add(
            plate
        );

    }


    createPlate(
        .58,
        .20,
        -1.58
    );

    createPlate(
        .45,
        .22,
        -1.28
    );

    createGlowPlate(
        .22,
        .25,
        -1.03
    );


    createPlate(
        .58,
        .20,
        1.58
    );

    createPlate(
        .45,
        .22,
        1.28
    );

    createGlowPlate(
        .22,
        .25,
        1.03
    );


    /* -------------------------------------------------
       HANDLE RINGS
    ------------------------------------------------- */

    const torusGeometry =
        new THREE.TorusGeometry(
            .23,
            .035,
            16,
            64
        );


    const torusMaterial =
        new THREE.MeshBasicMaterial({

            color: 0xb69cff,

            transparent: true,

            opacity: .85

        });


    const torusLeft =
        new THREE.Mesh(
            torusGeometry,
            torusMaterial
        );


    torusLeft.rotation.y =
        Math.PI / 2;

    torusLeft.position.x =
        -1.04;


    gymObject.add(
        torusLeft
    );


    const torusRight =
        torusLeft.clone();


    torusRight.position.x =
        1.04;


    gymObject.add(
        torusRight
    );


    /* -------------------------------------------------
       ORBIT RINGS
    ------------------------------------------------- */

    function createOrbit(
        radiusX,
        radiusY,
        rotation
    ) {

        const curve =
            new THREE.EllipseCurve(
                0,
                0,
                radiusX,
                radiusY,
                0,
                Math.PI * 2,
                false,
                0
            );


        const points =
            curve.getPoints(
                120
            );


        const geometry =
            new THREE.BufferGeometry()
                .setFromPoints(
                    points
                );


        const material =
            new THREE.LineBasicMaterial({

                color: 0x9f7cff,

                transparent: true,

                opacity: .26

            });


        const line =
            new THREE.Line(
                geometry,
                material
            );


        line.rotation.set(
            rotation.x,
            rotation.y,
            rotation.z
        );


        scene.add(
            line
        );


        return line;

    }


    const orbitA =
        createOrbit(
            2.6,
            1.0,
            {
                x: .95,
                y: .35,
                z: .25
            }
        );


    orbitA.position.copy(
        gymObject.position
    );


    const orbitB =
        createOrbit(
            2.2,
            .75,
            {
                x: 1.1,
                y: -.5,
                z: -.4
            }
        );


    orbitB.position.copy(
        gymObject.position
    );


    /* -------------------------------------------------
       PARTICLES
    ------------------------------------------------- */

    const particleCount =
        window.innerWidth < 700
            ? 180
            : 500;


    const particlePositions =
        new Float32Array(
            particleCount * 3
        );


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        particlePositions[
            i * 3
        ] =
            (Math.random() - .5) *
            13;

        particlePositions[
            i * 3 + 1
        ] =
            (Math.random() - .5) *
            9;

        particlePositions[
            i * 3 + 2
        ] =
            (Math.random() - .5) *
            7;

    }


    const particlesGeometry =
        new THREE.BufferGeometry();


    particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            particlePositions,
            3
        )
    );


    const particlesMaterial =
        new THREE.PointsMaterial({

            color: 0xb8a4ff,

            size:
                window.innerWidth < 700
                    ? .025
                    : .018,

            transparent: true,

            opacity: .55

        });


    const particles =
        new THREE.Points(
            particlesGeometry,
            particlesMaterial
        );


    scene.add(
        particles
    );


    /* -------------------------------------------------
       LIGHTING
    ------------------------------------------------- */

    const ambientLight =
        new THREE.AmbientLight(
            0xffffff,
            1.7
        );


    scene.add(
        ambientLight
    );


    const purpleLight =
        new THREE.PointLight(
            0x8b5cf6,
            22,
            17
        );


    purpleLight.position.set(
        2,
        2,
        5
    );


    scene.add(
        purpleLight
    );


    const pinkLight =
        new THREE.PointLight(
            0xe879f9,
            11,
            12
        );


    pinkLight.position.set(
        4,
        -2,
        1
    );


    scene.add(
        pinkLight
    );


    const whiteLight =
        new THREE.PointLight(
            0xffffff,
            8,
            10
        );


    whiteLight.position.set(
        -3,
        2,
        3
    );


    scene.add(
        whiteLight
    );


    /* -------------------------------------------------
       MOUSE PARALLAX
    ------------------------------------------------- */

    let mouseX = 0;
    let mouseY = 0;

    let smoothMouseX = 0;
    let smoothMouseY = 0;


    window.addEventListener(
        "mousemove",
        event => {

            mouseX =
                (event.clientX /
                    window.innerWidth) -
                .5;

            mouseY =
                (event.clientY /
                    window.innerHeight) -
                .5;

        }
    );


    /* -------------------------------------------------
       SCROLL
    ------------------------------------------------- */

    let scrollY = 0;


    window.addEventListener(
        "scroll",
        () => {

            scrollY =
                window.scrollY;

        },
        {
            passive: true
        }
    );


    /* -------------------------------------------------
       ANIMATION
    ------------------------------------------------- */

    const clock =
        new THREE.Clock();


    function animate() {

        requestAnimationFrame(
            animate
        );


        const time =
            clock.getElapsedTime();


        smoothMouseX +=
            (mouseX - smoothMouseX) *
            .04;


        smoothMouseY +=
            (mouseY - smoothMouseY) *
            .04;


        /* Dumbbell rotation */

        gymObject.rotation.x +=
            .0024;


        gymObject.rotation.y +=
            .0045;


        gymObject.rotation.z =
            smoothMouseX * .18;


        /* Floating motion */

        gymObject.position.y =
            .1 +
            Math.sin(time * .8) *
            .14;


        gymObject.position.x =
            2.35 +
            smoothMouseX *
            .40;


        gymObject.rotation.x +=
            smoothMouseY * .0008;


        /* Orbit motion */

        orbitA.rotation.z =
            time * .09;

        orbitB.rotation.z =
            -time * .07;


        orbitA.position.x =
            gymObject.position.x;

        orbitA.position.y =
            gymObject.position.y;


        orbitB.position.x =
            gymObject.position.x;

        orbitB.position.y =
            gymObject.position.y;


        /* Particles */

        particles.rotation.y =
            time * .012;

        particles.rotation.x =
            time * .004;


        /* Scroll depth */

        camera.position.y =
            -scrollY *
            .00015;


        renderer.render(
            scene,
            camera
        );

    }


    animate();


    /* -------------------------------------------------
       RESIZE
    ------------------------------------------------- */

    window.addEventListener(
        "resize",
        () => {

            camera.aspect =
                window.innerWidth /
                window.innerHeight;


            camera.updateProjectionMatrix();


            renderer.setPixelRatio(
                Math.min(
                    window.devicePixelRatio,
                    1.8
                )
            );


            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );

        }
    );

}


/* =====================================================
   3D TILT CARDS
===================================================== */

const tiltCards =
    document.querySelectorAll(
        ".tilt-card"
    );


tiltCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

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


            const rotateX =
                ((y - centerY) /
                    centerY) *
                -4;


            const rotateY =
                ((x - centerX) /
                    centerX) *
                4;


            card.style.transform =
                `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-5px)
                scale(1.005)
                `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );


                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);


/* =====================================================
   CONTACT FORM
   FRONTEND ONLY
===================================================== */

const contactForm =
    document.getElementById(
        "contactForm"
    );


contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document.getElementById(
                "name"
            ).value.trim();


        const phone =
            document.getElementById(
                "phone"
            ).value.trim();


        const interest =
            document.getElementById(
                "interest"
            ).value;


        if (!name || !phone) {

            alert(
                "Please enter your name and phone number."
            );

            return;

        }


        const selectedInterest =
            interest ||
            "your enquiry";


        alert(
            `Thank you, ${name}!\n\n` +
            `Your enquiry about ${selectedInterest.toLowerCase()} has been received.\n\n` +
            `The ELVYRA team can contact you soon.`
        );


        contactForm.reset();

    }
);


/* =====================================================
   BACK TO TOP
===================================================== */

const backToTop =
    document.getElementById(
        "backToTop"
    );


window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 550
        ) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }
);


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);