/* =====================================================
   PAGE SWITCH
===================================================== */


function switchPage(pageId) {
    document.querySelectorAll(".page").forEach(function(page) {
        page.classList.remove("active");
    });

    const target = document.getElementById(pageId);

    if (target) {
        target.classList.add("active");
    }

    document.getElementById("navMenu")?.classList.remove("open");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}




/* =====================================================
   MENU FILTER
===================================================== */

function filterMenu(category, clickedButton) {

    const items =
        document.querySelectorAll(".menu-item-card");

    const buttons =
        document.querySelectorAll(".tab-btn");

    buttons.forEach(function(button) {
        button.classList.remove("active");
    });

    if (clickedButton) {
        clickedButton.classList.add("active");
    }

    items.forEach(function(item) {

        const itemCategory =
            item.getAttribute("data-category");

        if (
            category === "all" ||
            itemCategory === category
        ) {

            item.style.display = "block";

            setTimeout(function() {

                item.style.opacity = "1";

                item.style.transform =
                    "translateY(0)";

            }, 50);

        } else {

            item.style.display = "none";

        }

    });

}



/* =====================================================
   COFFEE PRICE
===================================================== */

let blendBasePrice = 650;


function updatePrice(itemKey, price) {

    if (itemKey === "blend") {

        blendBasePrice =
            parseInt(price);

        calculateTotalPrice("blend");

    }

}


function toggleTsukemono(itemKey) {

    calculateTotalPrice(itemKey);

}


function calculateTotalPrice(itemKey) {

    if (itemKey === "blend") {

        let total =
            blendBasePrice;

        const checkbox =
            document.getElementById(
                "blend-tsukemono"
            );

        if (
            checkbox &&
            checkbox.checked
        ) {

            total += 200;

        }

        const priceElement =
            document.getElementById(
                "blend-price"
            );

        if (priceElement) {

            priceElement.textContent =
                total;

        }

    }

}



/* =====================================================
   SCROLL REVEAL
===================================================== */

function revealOnScroll() {

    const reveals =
        document.querySelectorAll(".reveal");

    reveals.forEach(function(element) {

        const windowHeight =
            window.innerHeight;

        const elementTop =
            element.getBoundingClientRect().top;

        if (
            elementTop <
            windowHeight - 100
        ) {

            element.classList.add("show");

        }

    });

}


window.addEventListener(
    "scroll",
    revealOnScroll
);


window.addEventListener(
    "load",
    revealOnScroll
);



/* =====================================================
   THREE.JS 3D COFFEE
===================================================== */

const container =
    document.getElementById(
        "three-container"
    );


if (
    container &&
    typeof THREE !== "undefined"
) {


    /* =========================
       SCENE
    ========================= */

    const scene =
        new THREE.Scene();



    /* =========================
       CAMERA
    ========================= */

    const camera =
        new THREE.PerspectiveCamera(
            45,
            window.innerWidth /
            window.innerHeight,
            0.1,
            100
        );

    camera.position.z = 6;



    /* =========================
       RENDERER
    ========================= */

    const renderer =
        new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });

    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    container.appendChild(
        renderer.domElement
    );



    /* =================================================
       ☕ CUP
    ================================================= */

    const cupGeometry =
        new THREE.CylinderGeometry(
            1.15,
            0.95,
            1.45,
            64
        );


    const cupMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xf4efe5,
            roughness: 0.35,
            metalness: 0.05
        });


    const cup =
        new THREE.Mesh(
            cupGeometry,
            cupMaterial
        );


    cup.position.set(
        2.0,
        -0.7,
        0
    );


    scene.add(cup);



    /* =================================================
       ☕ COFFEE INSIDE CUP
    ================================================= */

    const coffeeGeometry =
        new THREE.CylinderGeometry(
            0.95,
            0.95,
            0.08,
            64
        );


    const coffeeMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x4a2414,
            roughness: 0.2,
            metalness: 0
        });


    const coffee =
        new THREE.Mesh(
            coffeeGeometry,
            coffeeMaterial
        );


    coffee.position.set(
        2.0,
        0.03,
        0
    );


    scene.add(coffee);



    /* =================================================
       CUP HANDLE
    ================================================= */

    const handleGeometry =
        new THREE.TorusGeometry(
            0.48,
            0.12,
            20,
            50,
            Math.PI
        );


    const handle =
        new THREE.Mesh(
            handleGeometry,
            cupMaterial
        );


    handle.rotation.z =
        Math.PI / 2;


    handle.position.set(
        3.05,
        -0.7,
        0
    );


    scene.add(handle);



    /* =================================================
       🫗 COFFEE POURING STREAM
    ================================================= */

    const streamGeometry =
        new THREE.CylinderGeometry(
            0.07,
            0.11,
            2.2,
            32
        );


    const streamMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x5a2b18,
            roughness: 0.18,
            metalness: 0
        });


    const coffeeStream =
        new THREE.Mesh(
            streamGeometry,
            streamMaterial
        );


    /*
       Cup center = X 2.0
       Stream starts slightly to the left
    */

    coffeeStream.position.set(
        1.75,
        1.15,
        0
    );


    coffeeStream.rotation.z =
        -0.08;


    scene.add(
        coffeeStream
    );



    /* =================================================
       🫗 POURING COFFEE TOP
    ================================================= */

    const pourTopGeometry =
        new THREE.SphereGeometry(
            0.18,
            32,
            32
        );


    const pourTop =
        new THREE.Mesh(
            pourTopGeometry,
            streamMaterial
        );


    pourTop.position.set(
        1.75,
        2.25,
        0
    );


    scene.add(
        pourTop
    );



    /* =================================================
       💧 COFFEE DROP
    ================================================= */

    const dropGeometry =
        new THREE.SphereGeometry(
            0.12,
            24,
            24
        );


    const coffeeDrop =
        new THREE.Mesh(
            dropGeometry,
            streamMaterial
        );


    coffeeDrop.position.set(
        1.75,
        0.15,
        0
    );


    scene.add(
        coffeeDrop
    );



    /* =================================================
       ♨️ STEAM
    ================================================= */

    const steamMaterial =
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.25
        });


    const steam1 =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                0.15,
                0.025,
                12,
                32,
                Math.PI
            ),
            steamMaterial
        );


    steam1.position.set(
        1.75,
        0.35,
        0
    );


    steam1.rotation.x =
        Math.PI / 2;


    scene.add(
        steam1
    );


    const steam2 =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                0.12,
                0.025,
                12,
                32,
                Math.PI
            ),
            steamMaterial
        );


    steam2.position.set(
        2.15,
        0.45,
        0
    );


    steam2.rotation.x =
        Math.PI / 2;


    scene.add(
        steam2
    );



    /* =================================================
       LIGHT
    ================================================= */

    const ambientLight =
        new THREE.AmbientLight(
            0xffffff,
            2
        );


    scene.add(
        ambientLight
    );


    const directionalLight =
        new THREE.DirectionalLight(
            0xffffff,
            3
        );


    directionalLight.position.set(
        3,
        5,
        5
    );


    scene.add(
        directionalLight
    );



    /* =================================================
       MOUSE MOVEMENT
    ================================================= */

    let mouseX = 0;
    let mouseY = 0;


    window.addEventListener(
        "mousemove",
        function(event) {

            mouseX =
                (
                    event.clientX /
                    window.innerWidth -
                    0.5
                ) * 2;


            mouseY =
                (
                    event.clientY /
                    window.innerHeight -
                    0.5
                ) * 2;

        }
    );



    /* =================================================
       ☕ ANIMATION
    ================================================= */

    function animate() {

        requestAnimationFrame(
            animate
        );


        const time =
            Date.now() * 0.001;



        /* =========================
           CUP ROTATION
        ========================= */

        cup.rotation.y += 0.003;


        handle.rotation.y += 0.003;



        /* =========================
           CUP FLOATING
        ========================= */

        cup.position.y =
            -0.7 +
            Math.sin(time) * 0.08;



        /* =========================
           COFFEE FOLLOWS CUP
        ========================= */

        coffee.position.y =
            cup.position.y +
            0.73;



        /* =========================
           HANDLE FOLLOWS CUP
        ========================= */

        handle.position.y =
            cup.position.y;



        /* =========================
           COFFEE SURFACE MOVEMENT
        ========================= */

        coffee.scale.x =
            1 +
            Math.sin(time * 2) * 0.015;


        coffee.scale.z =
            1 +
            Math.cos(time * 2) * 0.015;



        /* =========================
           🫗 POURING ANIMATION
        ========================= */

        coffeeStream.scale.y =
            1 +
            Math.sin(time * 4) * 0.04;


        pourTop.scale.x =
            1 +
            Math.sin(time * 3) * 0.08;


        pourTop.scale.z =
            1 +
            Math.cos(time * 3) * 0.08;



        /* =========================
           💧 COFFEE DROP
        ========================= */

        coffeeDrop.position.y =
            0.15 +
            Math.sin(time * 5) * 0.12;



        /* =========================
           ♨️ STEAM
        ========================= */

        steam1.position.y =
            0.35 +
            Math.sin(time * 1.5) * 0.08;


        steam1.position.x =
            1.75 +
            Math.sin(time) * 0.08;


        steam2.position.y =
            0.45 +
            Math.cos(time * 1.3) * 0.08;


        steam2.position.x =
            2.15 +
            Math.cos(time) * 0.08;



        /* =========================
           MOUSE INTERACTION
        ========================= */

        cup.rotation.x +=
            (
                mouseY * 0.08 -
                cup.rotation.x
            ) * 0.03;


        cup.rotation.z +=
            (
                -mouseX * 0.08 -
                cup.rotation.z
            ) * 0.03;



        /* =========================
           CAMERA MOVEMENT
        ========================= */

        camera.position.x +=
            (
                mouseX * 0.15 -
                camera.position.x
            ) * 0.02;


        camera.position.y +=
            (
                -mouseY * 0.1 -
                camera.position.y
            ) * 0.02;



        /* =========================
           RENDER
        ========================= */

        renderer.render(
            scene,
            camera
        );

    }


    animate();



    /* =================================================
       RESIZE
    ================================================= */

    window.addEventListener(
        "resize",
        function() {

            camera.aspect =
                window.innerWidth /
                window.innerHeight;


            camera.updateProjectionMatrix();


            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );

        }
    );

}
// ===== VIDEO AND PHOTO LOOP =====

const cafeVideo = document.querySelector(".hero-video");
const cafeSlideshow = document.querySelector(".hero-slideshow");

if (cafeVideo && cafeSlideshow) {

    cafeVideo.addEventListener("ended", function () {

        cafeVideo.style.display = "none";
        cafeSlideshow.style.display = "block";

        setTimeout(function () {

            cafeSlideshow.style.display = "none";
            cafeVideo.style.display = "block";
            cafeVideo.currentTime = 0;

            cafeVideo.play().catch(error => {
                console.log("Video playback:", error);
            });

        }, 12000);

    });

}
 
document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".menu-tab");
    const cards = document.querySelectorAll(".menu-item-card");

    tabs.forEach(function (tab) {
        tab.onclick = function () {
            const category = tab.getAttribute("data-category");

            cards.forEach(function (card) {
                if (
                    category === "recommend" ||
                    card.getAttribute("data-category") === category
                ) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }
            });

            tabs.forEach(function (btn) {
                btn.classList.remove("active");
            });

            tab.classList.add("active");
        };
    });
});

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("open");
    });
}
