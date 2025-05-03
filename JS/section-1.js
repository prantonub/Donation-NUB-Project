const donateBtn = document.getElementById("donation-1");
const donationInput = document.getElementById("input-donation-1");
const accountBalance = document.getElementById("accountBalance");
const mainBalance = document.getElementById("mainBalance");
const modal = document.getElementById("my_modal_1");
const historyContent = document.getElementById("historyContent");
const regionFilter = document.getElementById("regionFilter");

// Only allow numbers in input
donationInput.addEventListener("input", () => {
  donationInput.value = donationInput.value.replace(/[^0-9]/g, "");
});

donateBtn?.addEventListener("click", () => {
  const amount = parseInt(donationInput.value);
  const currentMain = parseInt(mainBalance.innerText);

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid donation amount.");
    return;
  }

  if (amount > currentMain) {
    alert("❌ Insufficient balance. Please enter a lower amount.");
    return;
  }

  // Update balances
  let currentBalance = parseInt(accountBalance.innerText);
  accountBalance.innerText = `${currentBalance + amount} BDT`;
  mainBalance.innerText = `${currentMain - amount} BDT`;

  // Show success modal
  modal.showModal();

  // Format message
  const time = new Date().toString();

  // Create Tailwind-styled history card with region tag
  const historyEntry = document.createElement("div");
  historyEntry.className =
    "bg-green-50 border-2 border-lime-500 rounded-xl shadow p-5 text-gray-800 my-4 hover:shadow-lg transition-shadow duration-300";
  historyEntry.setAttribute("data-region", "noakhali"); // 👈 Important for filtering
  historyEntry.innerHTML = `
    <h3 class="text-lg font-semibold text-lime-600">${amount} Taka Donated</h3>
    <p class="text-base mt-2 text-gray-800">For Flood at <span class="font-medium text-lime-500">Noakhali, Bangladesh</span></p>
    <p class="text-sm text-gray-500 mt-2">Date: ${time}</p>
  `;

  // Add to history
  historyContent.prepend(historyEntry);

  // Clear input
  donationInput.value = "";
});

// Region filter logic
regionFilter.addEventListener("change", () => {
  const selectedRegion = regionFilter.value;
  const historyEntries = document.querySelectorAll("#historyContent > div");

  historyEntries.forEach(entry => {
    const region = entry.getAttribute("data-region");

    if (selectedRegion === "all" || region === selectedRegion) {
      entry.style.display = "block";
    } else {
      entry.style.display = "none";
    }
  });
});
