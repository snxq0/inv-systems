const menuButton = document.querySelector(".menu-button");
const menuOverlay = document.querySelector(".menu-overlay");
const menuClose = document.querySelector(".menu-close");
const menuLinks = document.querySelectorAll(".menu-nav a");
const projects = [
    {
        image: "./assets/images/wib.png",
        title: "Academy",
        description: "A simple website for russian speaking academy.",
        link: "https://wisdom-is-building.vercel.app/"
    },

    {
        image: "./assets/images/inv_crm.png",
        title: "INV CRM",
        description: "A simple system for managing clients, sessions and payments.",
        link: "./projects/inv_crm_web_application.html"
    },

    {
        image: "./assets/images/jack_alexander_valden.png",
        title: "INV Landing",
        description: "Simple landing for independent author",
        link: "./projects/jack_alexander_valden_official_site.html"
    }
];
const animatedElements = document.querySelectorAll(
    "#philosophy, #work, #systems, #inv, #contact"
);

let currentProject = 0;

const workImage = document.querySelector("#work-image");
const workTitle = document.querySelector("#work-title");
const workDescription = document.querySelector("#work-description");
const workCounter = document.querySelector("#work-counter");

const workLink = document.querySelector("#work-link");
const workPrev = document.querySelector("#work-prev");
const workNext = document.querySelector("#work-next");


// Open menu
menuButton.addEventListener("click", () => {
    menuOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
});


// Close menu
menuClose.addEventListener("click", () => {
    menuOverlay.classList.remove("active");
    document.body.style.overflow = "";
});


// Close menu + scroll to section
menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        menuOverlay.classList.remove("active");
        document.body.style.overflow = "";
    });
});

function showProject(index) {
    const project = projects[index];

    workImage.src = project.image;
    workTitle.textContent = project.title;
    workDescription.textContent = project.description;

    workCounter.textContent =
        `${String(index + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;

    workLink.href = project.link;
}


workNext.addEventListener("click", () => {

    currentProject++;

    if (currentProject >= projects.length) {
        currentProject = 0;
    }

    showProject(currentProject);
});


workPrev.addEventListener("click", () => {

    currentProject--;

    if (currentProject < 0) {
        currentProject = projects.length - 1;
    }

    showProject(currentProject);
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

animatedElements.forEach((element) => {
    element.classList.add("animate-section");
    observer.observe(element);
});