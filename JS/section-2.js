const donateBtn2 = document.getElementById("donation-2");
const donationInput2 = document.getElementById("input-donation-2");
const accountBalance2 = document.getElementById("accountBalance-2");
const mainBalance2 = document.getElementById("mainBalance"); // Shared main balance
const modal2 = document.getElementById("my_modal_2");
const historyContent2 = document.getElementById("historyContent");
const regionFilter2 = document.getElementById("regionFilter");

// Only allow numbers in input
donationInput2.addEventListener("input", () => {
  donationInput2.value = donationInput2.value.replace(/[^0-9]/g, "");
});

donateBtn2?.addEventListener("click", () => {
  const amount = parseInt(donationInput2.value);
  const currentMain = parseInt(mainBalance2.innerText);

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid donation amount.");
    return;
  }

  if (amount > currentMain) {
    alert("❌ Insufficient balance. Please enter a lower amount.");
    return;
  }

  // Update balances
  let currentBalance = parseInt(accountBalance2.innerText);
  accountBalance2.innerText = `${currentBalance + amount} BDT`;
  mainBalance2.innerText = `${currentMain - amount} BDT`;

  // Show success modal
  modal2.showModal();

  // Format message
  const time = new Date().toString();

  // Create Tailwind-styled history card with region tag
  const historyEntry2 = document.createElement("div");
  historyEntry2.className =
    "bg-gray-50 border-2 border-blue-500 rounded-xl shadow p-5 text-gray-800 my-4 hover:shadow-lg transition-shadow duration-300";
  historyEntry2.setAttribute("data-region", "feni"); // 👈 Important for filtering
  historyEntry2.innerHTML = `
    <h3 class="text-lg font-semibold text-blue-600">${amount} Taka Donated</h3>
    <p class="text-base mt-2 text-gray-800">For Flood at <span class="font-medium text-blue-500">Feni, Bangladesh</span></p>
    <p class="text-sm text-gray-500 mt-2">Date: ${time}</p>
  `;

  // Add to history
  historyContent2.prepend(historyEntry2);

  // Clear input
  donationInput2.value = "";
});

// Region filter logic
regionFilter2.addEventListener("change", () => {
  const selectedRegion = regionFilter2.value;
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
