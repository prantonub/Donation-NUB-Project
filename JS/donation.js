const donationTab = document.getElementById("donationTab");
const historyTab = document.getElementById("historyTab");

const section1 = document.getElementById("section-1");
const section2 = document.getElementById("section-2");
const section3 = document.getElementById("section-3");
const section4 = document.getElementById("section-4");
const section5 = document.getElementById("section-5");

const donationCards1 = document.getElementById("donationCards-1");
const donationCards2 = document.getElementById("donationCards-2");
const donationCards3 = document.getElementById("donationCards-3");
const donationCards4 = document.getElementById("donationCards-4");
const donationCards5 = document.getElementById("donationCards-5");

// Show donation sections
donationTab?.addEventListener("click", () => {
  section1.style.display = "flex";
  section2.style.display = "flex";
  section3.style.display = "flex";
  section4.style.display = "flex";
  section5.style.display = "flex";

  // Hide all donation history sections
  donationCards1.style.display = "none";
  donationCards2.style.display = "none";
  donationCards3.style.display = "none";
  donationCards4.style.display = "none";
  donationCards5.style.display = "none";

  // Button styles
  donationTab.classList.add("bg-lime-400");
  donationTab.classList.remove("border-2", "border-gray-300");

  historyTab.classList.remove("bg-lime-400");
  historyTab.classList.add("border-2", "border-gray-300");
});

// Show history sections
historyTab?.addEventListener("click", () => {
  section1.style.display = "none";
  section2.style.display = "none";
  section3.style.display = "none";
  section4.style.display = "none";
  section5.style.display = "none";

  // Show all donation history sections
  donationCards1.style.display = "block";
  donationCards2.style.display = "block";
  donationCards3.style.display = "block";
  donationCards4.style.display = "block";
  donationCards5.style.display = "block";

  // Button styles
  historyTab.classList.add("bg-lime-400");
  historyTab.classList.remove("border-2", "border-gray-300");

  donationTab.classList.remove("bg-lime-400");
  donationTab.classList.add("border-2", "border-gray-300");
});
