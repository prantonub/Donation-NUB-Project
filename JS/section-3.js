const donateBtn3 = document.getElementById("donation-3");
const donationInput3 = document.getElementById("input-donation-3");
const accountBalance3 = document.getElementById("accountBalance-3");
const mainBalance3 = document.getElementById("mainBalance");
const modal3 = document.getElementById("my_modal_3");
const historyContent3 = document.getElementById("historyContent");

// Allow only numeric input
donationInput3.addEventListener("input", () => {
  donationInput3.value = donationInput3.value.replace(/[^0-9]/g, "");
});

donateBtn3?.addEventListener("click", () => {
  const amount = parseInt(donationInput3.value);
  const currentMain = parseInt(mainBalance3.innerText);

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid donation amount.");
    return;
  }

  if (amount > currentMain) {
    alert("❌ Insufficient balance. Please enter a lower amount.");
    return;
  }

  // Update balances
  const currentBalance = parseInt(accountBalance3.innerText);
  accountBalance3.innerText = `${currentBalance + amount} BDT`;
  mainBalance3.innerText = `${currentMain - amount} BDT`;

  // Show success modal
  modal3.showModal();

  // Format date/time
  const time = new Date().toString();

  // Create a history card
  const historyEntry = document.createElement("div");
  historyEntry.className =
    "bg-lime-50 border-2 border-green-500 rounded-xl shadow p-5 text-gray-800 my-4 hover:shadow-lg transition-shadow duration-300";
  historyEntry.innerHTML = `
    <h3 class="text-lg font-semibold text-green-500">${amount} Taka Donated</h3>
    <p class="text-base mt-2 text-gray-800">For <span class="font-medium text-green-500">Quota Movement Support</span></p>
    <p class="text-sm text-gray-500 mt-2">Date: ${time}</p>
  `;

  // Add to history section
  historyContent3.prepend(historyEntry);

  // Clear input field
  donationInput3.value = "";
});
