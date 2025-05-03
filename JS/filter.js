document.getElementById("regionFilter").addEventListener("change", function () {
  const selectedRegion = this.value.toLowerCase(); // Get selected region
  const donationItems = document.querySelectorAll(".donation-item"); // All donation blocks

  donationItems.forEach((item) => {
    const itemRegion = item.dataset.region.toLowerCase();
    
    if (selectedRegion === "all" || itemRegion === selectedRegion) {
      item.style.display = "block"; // Show matching or all
    } else {
      item.style.display = "none"; // Hide non-matching
    }
  });
});
