document.addEventListener("DOMContentLoaded", () => {
  const donateBtn      = document.getElementById("donation-3");
  const donationInput  = document.getElementById("input-donation-3");
  const accountBalance = document.getElementById("accountBalance-3");
  const mainBalance    = document.getElementById("mainBalance");
  const modal          = document.getElementById("my_modal_3");
  const historyContent = document.getElementById("historyContent-3");
  const viewHistoryBtn = document.getElementById("view-history-btn-3");

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
    const entry = document.createElement("div");
    entry.className =
      "bg-lime-50 border-2 border-green-500 rounded-xl shadow p-5 text-gray-800 my-4 hover:shadow-lg transition-shadow duration-300";
    entry.setAttribute("data-region", "rangpur");
    entry.innerHTML = `
      <h3 class="text-lg font-semibold text-green-500">${amount} BDT Donated</h3>
      <p class="text-base mt-2 text-gray-800">
        Aid for Injured  <span class="font-medium text-green-500">in the Quota Movement</span>
      </p>
      <p class="text-sm text-gray-500 mt-2">${time}</p>
    `;
    historyContent.prepend(entry);

    donationInput.value = "";
  });

  // View history logic (only for Section 3)
  viewHistoryBtn.addEventListener("click", () => {
    const historyModal = document.createElement("dialog");
    historyModal.className = "modal";
    historyModal.innerHTML = `
      <form method="dialog" class="modal-box bg-white p-6 rounded-2xl shadow-lg text-center">
        <h3 class="text-3xl font-bold mb-4 text-lime-600">Donation History</h3>
        <div id="historyList" class="space-y-3 max-h-80 overflow-y-auto text-left"></div>
        <div class="modal-action justify-center">
          <button class="btn bg-lime-400 hover:bg-lime-500 text-white px-6 py-2 rounded-xl">Close</button>
        </div>
      </form>`;
    document.body.appendChild(historyModal);

    const historyList = historyModal.querySelector("#historyList");

    const section3Entries = document.querySelectorAll("#historyContent-3 > div");

    section3Entries.forEach(e => {
      const amt  = e.querySelector("h3")?.textContent ?? "";
      const det  = e.querySelector("p.text-base")?.textContent ?? "";
      const date = e.querySelector("p.text-sm")?.textContent ?? "";

      const div = document.createElement("div");
      div.className =
        "bg-green-50 border-2 border-lime-500 rounded-xl shadow p-5 text-gray-800 my-4";
      div.innerHTML = `
        <h3 class="text-lg font-semibold text-lime-600">${amt}</h3>
        <p class="text-base mt-2 text-gray-800">${det}</p>
        <p class="text-sm text-gray-500 mt-2">${date}</p>
      `;
      historyList.appendChild(div);
    });

    historyModal.showModal();
  });
});
