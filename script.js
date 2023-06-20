const header = document.querySelector(".header");

const tabs = document.querySelectorAll(".features-accordion-tab");
const tabPercentage = 100 / tabs.length;
const featureImage = document.querySelector(".features-image");
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

  // Update the image source to the next tab
  const imageSrc = nextTab.getAttribute("data-image");
  featureImage.src = imageSrc;

  activeTab.classList.remove("opened");
  // Reset the progress bar and start the timer for the next tab
  progressBar = nextTab.querySelector(".features-complete");
  progressBar.style.width = "0";
  activeTab = nextTab;
  activeTab.classList.add("opened");
  startTimer();
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    if (activeTab === tab) {
      return;
    }

    if (activeTab) {
      activeTab.classList.remove("opened");
    }

    tab.classList.add("opened");
    activeTab = tab;

    // Update image
    const imageSrc = tab.getAttribute("data-image");
    featureImage.src = imageSrc;

    progressBar = tab.querySelector(".features-complete");
    startTimer();
  });
});
// Scroll Animation
window.addEventListener("scroll", () => {
  let scrollPos = window.scrollY;

  if (scrollPos > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
