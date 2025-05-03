const donateBtn5 = document.getElementById("donation-5");
const donationInput5 = document.getElementById("input-donation-5");
const accountBalance5 = document.getElementById("accountBalance-5");
const mainBalance5 = document.getElementById("mainBalance");
const modal5 = document.getElementById("my_modal_5");
const historyContent5 = document.getElementById("historyContent");
const regionFilter5 = document.getElementById("regionFilter");

// Only allow numbers in input
donationInput5.addEventListener("input", () => {
  donationInput5.value = donationInput5.value.replace(/[^0-9]/g, "");
});

donateBtn5?.addEventListener("click", () => {
  const amount = parseInt(donationInput5.value);
  const currentMain = parseInt(mainBalance5.innerText);

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid donation amount.");
    return;
  }

  if (amount > currentMain) {
    alert("❌ Insufficient balance. Please enter a lower amount.");
    return;
  }

  // Update balances
  const currentBalance = parseInt(accountBalance5.innerText);
  accountBalance5.innerText = `${currentBalance + amount} BDT`;
  mainBalance5.innerText = `${currentMain - amount} BDT`;

  // Show success modal
  modal5.showModal();

  // Format date/time
  const time = new Date().toString();

  // Create a history card with a data-region attribute for filtering
  const historyEntry = document.createElement("div");
  historyEntry.className =
    "bg-gray-100 border-2 border-gray-400 rounded-xl shadow p-5 text-gray-800 my-4 hover:shadow-lg transition-shadow duration-300";
  historyEntry.setAttribute("data-region", "winter"); // Set the region for filtering
  historyEntry.innerHTML = `
    <h3 class="text-lg font-semibold text-green-500">${amount} Taka Donated</h3>
    <p class="text-base mt-2 text-gray-800">For <span class="font-medium text-green-500">Winter Relief: Wrap a Family in Kindness</span></p>
    <p class="text-sm text-gray-500 mt-2">Date: ${time}</p>
  `;

  // Add to history section
  historyContent5.prepend(historyEntry);

  // Clear input field
  donationInput5.value = "";
});

// Region filter logic
regionFilter5.addEventListener("change", () => {
  const selectedRegion = regionFilter5.value;
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
