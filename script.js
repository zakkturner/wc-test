const header = document.querySelector(".header");

const tabs = document.querySelectorAll(".features-accordion-tab");

let activeTab = null;
const totalTime = 10000;
const step = 50;
let timerId;
let currentProgress = 0;
let progressBar;

function updateProgressBar() {
  progressBar.style.width = `${(currentProgress / totalTime) * 100}%`;
}

function startTimer() {
  clearInterval(timerId);
  currentProgress = 0;
  updateProgressBar();
  timerId = setInterval(() => {
    currentProgress += step;
    if (currentProgress >= totalTime) {
      clearInterval(timerId);
      currentProgress = totalTime;
      switchToNextTab();
    }
    updateProgressBar();
  }, step);
}

function switchToNextTab() {
  const currentIndex = Array.from(tabs).indexOf(activeTab);
  const nextIndex = (currentIndex + 1) % tabs.length;
  const nextTab = tabs[nextIndex];

  const featureImages = document.querySelectorAll(".features-image");
  featureImages.forEach((image) => {
    image.classList.remove("active");
  });

  const selectedImage = document.querySelector(
    `.features-image:nth-child(${nextIndex + 1})`
  );
  selectedImage.classList.add("active");
  activeTab.classList.remove("opened");
  // Reset the progress bar and start the timer for the next tab
  progressBar = nextTab.querySelector(".features-complete");
  progressBar.style.width = "0";
  activeTab = nextTab;
  activeTab.classList.add("opened");
  startTimer();
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    if (activeTab === tab) {
      return;
    }

    if (activeTab) {
      activeTab.classList.remove("opened");
    }

    tab.classList.add("opened");
    activeTab = tab;

    const featureImages = document.querySelectorAll(".features-image");
    featureImages.forEach((image) => {
      image.classList.remove("active");
    });

    const selectedImage = document.querySelector(
      `.features-image:nth-child(${index + 1})`
    );
    selectedImage.classList.add("active");

    progressBar = tab.querySelector(".features-complete");
    startTimer();
  });
});

function makeFirstTabActiveOnScroll() {
  const firstTab = tabs[0];
  const featuresSection = document.querySelector(".feature-section");
  const featuresSectionTop = featuresSection.offsetTop;
  const featureImage = document.querySelector(".features-image");
  function handleScroll() {
    const scrollPos = window.scrollY;

    if (scrollPos >= featuresSectionTop && !activeTab) {
      firstTab.classList.add("opened");
      featureImage.classList.add("active");
      activeTab = firstTab;
      progressBar = firstTab.querySelector(".features-complete");
      startTimer();
      window.removeEventListener("scroll", handleScroll);
    }
  }

  window.addEventListener("scroll", handleScroll);
}

makeFirstTabActiveOnScroll();

// Scroll Animation
window.addEventListener("scroll", () => {
  let scrollPos = window.scrollY;

  if (scrollPos > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Benefits sticky image functionality
const stickyImages = document.querySelectorAll(".sticky-image");
const benefitContainers = document.querySelectorAll(".benefit-container");
const imageStates = Array.from({ length: stickyImages.length }).fill(false);

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  benefitContainers.forEach((container, index) => {
    const rect = container.getBoundingClientRect();
    const containerTop = rect.top + scrollTop;
    const containerBottom = rect.bottom + scrollTop;
    const offset = window.innerHeight * 0.5; // Adjust the offset as needed

    if (
      containerTop <= scrollTop + offset &&
      containerBottom >= scrollTop + offset
    ) {
      if (!imageStates[index]) {
        stickyImages.forEach((image) => {
          image.classList.remove("show-image");
        });

        stickyImages[index].classList.add("show-image");
        imageStates.fill(false);
        imageStates[index] = true;
      }
    }
  });
});

window.dispatchEvent(new Event("scroll"));
