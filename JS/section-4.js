const donateBtn4 = document.getElementById("donation-4");
const donationInput4 = document.getElementById("input-donation-4");
const accountBalance4 = document.getElementById("accountBalance-4");
const mainBalance4 = document.getElementById("mainBalance");
const modal4 = document.getElementById("my_modal_4");
const historyContent4 = document.getElementById("historyContent");
const regionFilter4 = document.getElementById("regionFilter");

// Only allow numbers in input
donationInput4.addEventListener("input", () => {
  donationInput4.value = donationInput4.value.replace(/[^0-9]/g, "");
});

donateBtn4?.addEventListener("click", () => {
  const amount = parseInt(donationInput4.value);
  const currentMain = parseInt(mainBalance4.innerText);

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid donation amount.");
    return;
  }

  if (amount > currentMain) {
    alert("❌ Insufficient balance. Please enter a lower amount.");
    return;
  }

  // Update balances
  const currentBalance = parseInt(accountBalance4.innerText);
  accountBalance4.innerText = `${currentBalance + amount} BDT`;
  mainBalance4.innerText = `${currentMain - amount} BDT`;

  // Show success modal
  modal4.showModal();

  // Format date/time
  const time = new Date().toString();

  // Create a history card with a data-region attribute for filtering
  const historyEntry = document.createElement("div");
  historyEntry.className =
    "bg-green-50 border-2 border-orange-200 rounded-xl shadow p-5 text-gray-800 my-4 hover:shadow-lg transition-shadow duration-300";
  historyEntry.setAttribute("data-region", "food"); // Set the region for filtering
  historyEntry.innerHTML = `
    <h3 class="text-lg font-semibold text-green-500">${amount} Taka Donated</h3>
    <p class="text-base mt-2 text-gray-800">For <span class="font-medium text-green-500">Emergency Food Kits for Flood Victims</span></p>
    <p class="text-sm text-gray-500 mt-2">Date: ${time}</p>
  `;

  // Add to history section
  historyContent4.prepend(historyEntry);

  // Clear input field
  donationInput4.value = "";
});

// Region filter logic
regionFilter4.addEventListener("change", () => {
  const selectedRegion = regionFilter4.value;
  const historyEntries = document.querySelectorAll("#historyContent > div");

  historyEntries.forEach(entry => {
    const region = entry.getAttribute("data-region");

    // Show entry if the region matches or if "all" is selected
    if (selectedRegion === "all" || region === selectedRegion) {
      entry.style.display = "block";
    } else {
      entry.style.display = "none";
    }
  });
});
