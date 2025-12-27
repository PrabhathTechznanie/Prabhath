const bookingTable = document.getElementById("bookingTable");
const followupTable = document.getElementById("followupTable");
const bookingForm = document.getElementById("bookingForm");
const followupForm = document.getElementById("followupForm");
const statBookings = document.getElementById("statBookings");
const statFollowups = document.getElementById("statFollowups");
const resetDemo = document.getElementById("resetDemo");
const demoModal = document.getElementById("demoModal");

const demoState = {
  bookings: [
    {
      patient: "Aarav Menon",
      doctor: "Dr. Mehta (Cardiology)",
      slot: "10:00 AM",
      status: "Confirmed",
    },
    {
      patient: "Divya Singh",
      doctor: "Dr. Rao (Dermatology)",
      slot: "12:30 PM",
      status: "Pending",
    },
  ],
  followups: [
    {
      patient: "Riya Patel",
      condition: "Post-surgery review",
      date: "2024-06-18",
      status: "Pending",
    },
  ],
};

const createRow = (cells) => {
  const row = document.createElement("div");
  row.className = "table__row";
  cells.forEach((cell) => {
    const span = document.createElement("span");
    span.textContent = cell;
    row.appendChild(span);
  });
  return row;
};

const renderTables = () => {
  bookingTable.querySelectorAll(".table__row:not(.table__head)").forEach((row) => row.remove());
  followupTable.querySelectorAll(".table__row:not(.table__head)").forEach((row) => row.remove());

  demoState.bookings.forEach((booking) => {
    bookingTable.appendChild(
      createRow([booking.patient, booking.doctor, booking.slot, booking.status])
    );
  });

  demoState.followups.forEach((followup) => {
    followupTable.appendChild(
      createRow([followup.patient, followup.condition, followup.date, followup.status])
    );
  });

  statBookings.textContent = demoState.bookings.length;
  statFollowups.textContent = demoState.followups.length;
};

const addBooking = (data) => {
  demoState.bookings.unshift({
    patient: data.patientName,
    doctor: data.doctor,
    slot: data.slot,
    status: "New",
  });
  renderTables();
};

const addFollowup = (data) => {
  demoState.followups.unshift({
    patient: data.followupName,
    condition: data.condition,
    date: data.reminderDate,
    status: "Scheduled",
  });
  renderTables();
};

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(bookingForm);
    const data = Object.fromEntries(formData.entries());

    if (!data.patientName || !data.patientPhone || !data.doctor || !data.slot) {
      return;
    }

    addBooking(data);
    bookingForm.reset();
  });
}

if (followupForm) {
  followupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(followupForm);
    const data = Object.fromEntries(formData.entries());

    if (!data.followupName || !data.condition || !data.reminderDate) {
      return;
    }

    addFollowup(data);
    followupForm.reset();
  });
}

if (resetDemo) {
  resetDemo.addEventListener("click", () => {
    demoState.bookings = [...demoState.bookings.slice(0, 2)];
    demoState.followups = [...demoState.followups.slice(0, 1)];
    renderTables();
  });
}

const toggleButtons = document.querySelectorAll(".toggle__btn");
const packageGrid = document.getElementById("packageGrid");

const updatePackageView = (view) => {
  if (!packageGrid) return;

  const cards = packageGrid.querySelectorAll(".card");
  cards.forEach((card) => {
    const isRecommended = card.dataset.package === "smart";
    if (view === "recommended") {
      card.style.display = isRecommended ? "flex" : "none";
    } else {
      card.style.display = "flex";
    }
  });

  toggleButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === view);
  });
};

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    updatePackageView(button.dataset.view);
  });
});

const scrollToSection = (id) => {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
};

document.getElementById("ctaTop")?.addEventListener("click", () => scrollToSection("packages"));
document
  .getElementById("ctaPrimary")
  ?.addEventListener("click", () => updatePackageView("recommended"));
document
  .getElementById("ctaSecondary")
  ?.addEventListener("click", () => updatePackageView("all"));
document
  .getElementById("ctaBooking")
  ?.addEventListener("click", () => scrollToSection("demo"));
document
  .getElementById("ctaWebsite")
  ?.addEventListener("click", () => scrollToSection("packages"));

document.querySelectorAll(".select-package").forEach((btn) => {
  btn.addEventListener("click", () => {
    const packageType = btn.dataset.package;
    if (packageType === "smart") {
      scrollToSection("demo");
    } else if (packageType === "pro") {
      scrollToSection("crm");
    } else {
      scrollToSection("closing");
    }
  });
});

const demoToggle = document.getElementById("demoToggle");
const closeModal = document.getElementById("closeModal");
const modalCta = document.getElementById("modalCta");

const openModal = () => {
  demoModal?.classList.add("active");
  demoModal?.setAttribute("aria-hidden", "false");
};

const closeDemoModal = () => {
  demoModal?.classList.remove("active");
  demoModal?.setAttribute("aria-hidden", "true");
};

demoToggle?.addEventListener("click", openModal);
closeModal?.addEventListener("click", closeDemoModal);
modalCta?.addEventListener("click", () => {
  closeDemoModal();
  scrollToSection("packages");
});

demoModal?.addEventListener("click", (event) => {
  if (event.target === demoModal) {
    closeDemoModal();
  }
});

renderTables();
