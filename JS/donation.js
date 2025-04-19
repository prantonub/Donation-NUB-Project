const donationTab = document.getElementById("donationTab");
const historyTab = document.getElementById("historyTab");
const donationSection = document.getElementById("section-1");
const historySection = document.getElementById("donationCards");

donationTab?.addEventListener("click", () => {
  donationSection.style.display = "flex";
  historySection.style.display = "none";
});

historyTab?.addEventListener("click", () => {
  donationSection.style.display = "none";
  historySection.style.display = "block";
});
