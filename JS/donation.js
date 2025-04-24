const donationTab = document.getElementById("donationTab");
const historyTab = document.getElementById("historyTab");

const section1 = document.getElementById("section-1");
const section2 = document.getElementById("section-2");
const section3 = document.getElementById("section-3");
const section4 = document.getElementById("section-4"); // Added section 4
const section5 = document.getElementById("section-5"); // Added section 5
const donationCards = document.getElementById("donationCards");

// Show donation sections
donationTab?.addEventListener("click", () => {
  section1.style.display = "flex";
  section2.style.display = "flex";
  section3.style.display = "flex";
  section4.style.display = "flex"; // Display section 4
  section5.style.display = "flex"; // Display section 5
  donationCards.style.display = "none";

  // Button styles
  donationTab.classList.add("bg-lime-400");
  donationTab.classList.remove("border-2", "border-gray-300");

  historyTab.classList.remove("bg-lime-400");
  historyTab.classList.add("border-2", "border-gray-300");
});

// Show history section
historyTab?.addEventListener("click", () => {
  section1.style.display = "none";
  section2.style.display = "none";
  section3.style.display = "none";
  section4.style.display = "none"; // Hide section 4
  section5.style.display = "none"; // Hide section 5
  donationCards.style.display = "block";

  // Button styles
  historyTab.classList.add("bg-lime-400");
  historyTab.classList.remove("border-2", "border-gray-300");

  donationTab.classList.remove("bg-lime-400");
  donationTab.classList.add("border-2", "border-gray-300");
});
