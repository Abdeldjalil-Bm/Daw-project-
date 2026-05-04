const PLANS = {
  bronze: { name: "Bronze Plan",   price: "2 000 DA / month"   },
  silver: { name: "Silver Plan",   price: "5 000 DA / quarter"  },
  gold:   { name: "Gold Plan",     price: "15 000 DA / year"    },
};

const CART_KEY = "selectedPlan";

function injectSelectButtons() {
  const planCards = document.querySelectorAll(".plan");

  planCards.forEach((card) => {
    const heading = card.querySelector("h3").textContent.toLowerCase();
    let planKey = "";
    if (heading.includes("bronze"))      planKey = "bronze";
    else if (heading.includes("silver")) planKey = "silver";
    else if (heading.includes("gold"))   planKey = "gold";
    if (!planKey) return;

    card.dataset.plan = planKey;

    const btn = document.createElement("button");
    btn.type         = "button";
    btn.className    = "select-plan-btn";
    btn.dataset.plan = planKey;
    btn.textContent  = "Select Plan";

    btn.addEventListener("click", () => selectPlan(planKey, card));
    card.appendChild(btn);
  });
}

function buildMiniCart() {
  if (document.getElementById("mini-cart")) return;

  const cart = document.createElement("div");
  cart.id = "mini-cart";
  cart.innerHTML = `
    <div id="mini-cart-inner">
      <span id="cart-icon">🛒</span>
      <span id="cart-label">No plan selected</span>
      <span id="cart-price"></span>
      <button id="proceed-btn" type="button" style="display:none;">Proceed to Register ➜</button>
      <button id="clear-cart-btn" type="button" style="display:none;" title="Remove plan">✕</button>
    </div>
  `;
  document.body.appendChild(cart);

  const style = document.createElement("style");
  style.textContent = `
    #mini-cart {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 9999;
      background: #191919;
      color: #fff;
      padding: 0 20px;
      height: 0;
      overflow: hidden;
      transition: height 0.35s cubic-bezier(.4,0,.2,1), box-shadow 0.35s;
      box-shadow: none;
    }
    #mini-cart.visible {
      height: 60px;
      box-shadow: 0 -4px 20px rgba(0,0,0,0.45);
    }
    #mini-cart-inner {
      display: flex;
      align-items: center;
      gap: 14px;
      height: 100%;
      max-width: 900px;
      margin: 0 auto;
    }
    #cart-icon { font-size: 22px; }
    #cart-label {
      font-weight: bold;
      font-size: 16px;
      color: #FF8F03;
      flex: 1;
    }
    #cart-price {
      font-size: 15px;
      color: #ccc;
    }
    #proceed-btn {
      background: #FF8F03;
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 8px 18px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.25s;
      white-space: nowrap;
    }
    #proceed-btn:hover { background: #E56950; }
    #clear-cart-btn {
      background: transparent;
      color: #aaa;
      border: none;
      font-size: 18px;
      cursor: pointer;
      line-height: 1;
      padding: 4px 6px;
      border-radius: 6px;
      transition: color 0.2s;
    }
    #clear-cart-btn:hover { color: #F04A4A; }
    .select-plan-btn {
      display: block;
      width: calc(100% - 40px);
      margin: 16px auto 20px;
      padding: 10px 0;
      background: #FF8F03;
      color: #fff;
      border: none;
      border-radius: 10px;
      font-size: 15px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.25s, transform 0.15s;
    }
    .select-plan-btn:hover {
      background: #E56950;
      transform: translateY(-2px);
    }
    .select-plan-btn.active {
      background: #28a745;
      pointer-events: none;
    }
    .select-plan-btn.active::before { content: "✔ "; }
    .plan.selected {
      border: 2px solid #FF8F03;
      box-shadow: 0 0 0 4px rgba(255,143,3,0.18);
    }
    body.cart-open { padding-bottom: 70px; }
  `;
  document.head.appendChild(style);

  document.getElementById("proceed-btn").addEventListener("click", proceedToRegister);
  document.getElementById("clear-cart-btn").addEventListener("click", clearCart);
}

function selectPlan(planKey, cardEl) {
  sessionStorage.setItem(CART_KEY, planKey);
  updateCartUI(planKey);

  document.querySelectorAll(".plan").forEach((c) => {
    c.classList.remove("selected");
    const btn = c.querySelector(".select-plan-btn");
    if (btn) {
      btn.classList.remove("active");
      btn.textContent = "Select Plan";
    }
  });

  cardEl.classList.add("selected");
  const activeBtn = cardEl.querySelector(".select-plan-btn");
  if (activeBtn) {
    activeBtn.classList.add("active");
    activeBtn.textContent = "Selected";
  }

  document.getElementById("mini-cart").scrollIntoView({ behavior: "smooth", block: "end" });
}

function updateCartUI(planKey) {
  const plan = PLANS[planKey];
  if (!plan) return;

  document.getElementById("cart-label").textContent       = plan.name;
  document.getElementById("cart-price").textContent       = plan.price;
  document.getElementById("proceed-btn").style.display    = "inline-block";
  document.getElementById("clear-cart-btn").style.display = "inline-block";
  document.getElementById("mini-cart").classList.add("visible");
  document.body.classList.add("cart-open");
}

function clearCart() {
  sessionStorage.removeItem(CART_KEY);

  document.getElementById("mini-cart").classList.remove("visible");
  document.body.classList.remove("cart-open");
  document.getElementById("cart-label").textContent       = "No plan selected";
  document.getElementById("cart-price").textContent       = "";
  document.getElementById("proceed-btn").style.display    = "none";
  document.getElementById("clear-cart-btn").style.display = "none";

  document.querySelectorAll(".plan").forEach((c) => {
    c.classList.remove("selected");
    const btn = c.querySelector(".select-plan-btn");
    if (btn) {
      btn.classList.remove("active");
      btn.textContent = "Select Plan";
    }
  });
}

function proceedToRegister() {
  const planKey = sessionStorage.getItem(CART_KEY);
  if (!planKey) return;

  const regSection = document.getElementById("registration");
  if (regSection) regSection.scrollIntoView({ behavior: "smooth", block: "start" });

  const radio = document.querySelector(`input[name="plan"][value="${planKey}"]`);
  if (radio) {
    radio.checked = true;
    radio.dispatchEvent(new Event("change", { bubbles: true }));
    radio.style.outline = "3px solid #FF8F03";
    setTimeout(() => { radio.style.outline = ""; }, 1500);
  }
}

function watchFormSubmit() {
  const registerBtn = document.getElementById("register");
  if (!registerBtn) return;

  registerBtn.addEventListener("click", () => {
    setTimeout(() => {
      const successEl = document.getElementById("succ_register");
      if (successEl && successEl.textContent.trim().toLowerCase() === "successfull") {
        clearCart();
      }
    }, 50);
  });
}

function restoreFromSession() {
  const saved = sessionStorage.getItem(CART_KEY);
  if (!saved || !PLANS[saved]) return;

  updateCartUI(saved);

  document.querySelectorAll(".plan").forEach((card) => {
    if (card.dataset.plan === saved) {
      card.classList.add("selected");
      const btn = card.querySelector(".select-plan-btn");
      if (btn) {
        btn.classList.add("active");
        btn.textContent = "Selected";
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  buildMiniCart();
  injectSelectButtons();
  restoreFromSession();
  watchFormSubmit();
});

/*partie t3 trainers*/


const TRAINERS = [
  {
    name: "Ahmed BenAli",
    photo: "photo1.jpg",
    specialty: "BodyBuilding",
    experience: "5 Years",
    bio: "Ahmed specializes in strength training and muscle building with personalized programs.",
    schedule: "Monday & Wednesday 10:00 - 12:00"
  },
  {
    name: "Sarah Mahmoud",
    photo: "photo_2.jpg",
    specialty: "Yoga",
    experience: "3 Years",
    bio: "Sarah guides members through mindful yoga sessions focused on flexibility and inner balance.",
    schedule: "Tuesday 14:00 - 16:00"
  },
  {
    name: "Oussama BenYahia",
    photo: "photo_3.jpg",
    specialty: "Cardio Training",
    experience: "4 Years",
    bio: "Oussama designs high-energy cardio programs to improve endurance and burn calories.",
    schedule: "Tuesday 18:30 - 20:30"
  },
  {
    name: "Karim BenYahia",
    photo: "photo_4.jpg",
    specialty: "CrossFit",
    experience: "6 Years",
    bio: "Karim leads intense CrossFit sessions for all levels, pushing members to their best.",
    schedule: "Monday 13:00 - 16:00"
  },
  {
    name: "Amira BenAli",
    photo: "photo_5.jpg",
    specialty: "Personal Training",
    experience: "7 Years",
    bio: "Amira crafts tailored personal training plans to help members reach their individual goals.",
    schedule: "Sunday & Thursday 09:00 - 11:00"
  },
  {
    name: "Yasmine BenAli",
    photo: "photo_6.jpg",
    specialty: "Pilates",
    experience: "2 Years",
    bio: "Yasmine focuses on core strength and posture improvement through Pilates techniques.",
    schedule: "Wednesday 10:00 - 12:00"
  }
];

function buildSearchBar() {
  const section = document.getElementById("trainers");
  if (!section) return;

  const wrapper = document.createElement("div");
  wrapper.id = "search-wrapper";
  wrapper.innerHTML = `<input type="text" id="trainer-search" placeholder="Search by name or specialty...">`;

  const h2 = section.querySelector("h2");
  h2.insertAdjacentElement("afterend", wrapper);

  document.getElementById("trainer-search").addEventListener("input", filterTrainers);
}

function filterTrainers() {
  const query = document.getElementById("trainer-search").value.toLowerCase().trim();
  const cards = document.querySelectorAll(".trainer-card");
  let found = 0;

  cards.forEach((card) => {
    const figcaption = card.querySelector("figcaption");
    const name = figcaption ? figcaption.textContent.toLowerCase() : "";
    const specialtyEl = card.querySelector("p");
    const specialty = specialtyEl ? specialtyEl.textContent.toLowerCase() : "";

    if (name.includes(query) || specialty.includes(query)) {
      card.style.display = "";
      found++;
    } else {
      card.style.display = "none";
    }
  });

  let noResult = document.getElementById("no-trainers-msg");
  if (found === 0) {
    if (!noResult) {
      noResult = document.createElement("p");
      noResult.id = "no-trainers-msg";
      noResult.textContent = "No trainers found.";
      document.querySelector(".trainer-grid").insertAdjacentElement("afterend", noResult);
    }
    noResult.style.display = "";
  } else {
    if (noResult) noResult.style.display = "none";
  }
}

function buildModal() {
  if (document.getElementById("trainer-modal")) return;

  const modal = document.createElement("div");
  modal.id = "trainer-modal";
  modal.innerHTML = `
    <div id="modal-overlay"></div>
    <div id="modal-box">
      <button id="modal-close">✕</button>
      <img id="modal-photo" src="" alt="">
      <h3 id="modal-name"></h3>
      <p id="modal-specialty"></p>
      <p id="modal-experience"></p>
      <p id="modal-bio"></p>
      <p id="modal-schedule"></p>
    </div>
  `;
  document.body.appendChild(modal);

  const style = document.createElement("style");
  style.textContent = `
    #trainer-modal {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 10000;
    }
    #trainer-modal.open { display: block; }
    #modal-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.6);
    }
    #modal-box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      border-radius: 15px;
      padding: 30px;
      width: 90%;
      max-width: 420px;
      text-align: center;
      box-shadow: 0 8px 30px rgba(0,0,0,0.3);
    }
    #modal-close {
      position: absolute;
      top: 12px;
      right: 15px;
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      color: #F04A4A;
    }
    #modal-close:hover { color: #BA3434; }
    #modal-photo {
      width: 120px;
      height: 120px;
      object-fit: cover;
      border-radius: 50%;
      margin-bottom: 15px;
      border: 3px solid #FF8F03;
    }
    #modal-box h3 {
      color: #FF8F03;
      font-size: 22px;
      margin-bottom: 10px;
    }
    #modal-box p {
      font-size: 15px;
      margin: 6px 0;
      color: #333;
    }
    #modal-schedule {
      margin-top: 10px;
      font-weight: bold;
      color: #E56950;
    }
    #search-wrapper {
      display: flex;
      justify-content: center;
      margin: 20px auto;
    }
    #trainer-search {
      width: 100%;
      max-width: 400px;
      padding: 10px 15px;
      border: 2px solid #FF8F03;
      border-radius: 10px;
      font-size: 16px;
      outline: none;
    }
    #trainer-search:focus {
      box-shadow: 0 4px 12px #E56950;
    }
    #no-trainers-msg {
      text-align: center;
      color: #F04A4A;
      font-size: 18px;
      font-weight: bold;
      margin: 20px 0;
    }
    .trainer-card { cursor: pointer; }
  `;
  document.head.appendChild(style);

  document.getElementById("modal-close").addEventListener("click", closeModal);
  document.getElementById("modal-overlay").addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
}

function openModal(trainer) {
  document.getElementById("modal-photo").src          = trainer.photo;
  document.getElementById("modal-photo").alt          = trainer.name;
  document.getElementById("modal-name").textContent   = trainer.name;
  document.getElementById("modal-specialty").textContent  = "Specialty: " + trainer.specialty;
  document.getElementById("modal-experience").textContent = "Experience: " + trainer.experience;
  document.getElementById("modal-bio").textContent    = trainer.bio;
  document.getElementById("modal-schedule").textContent   = "Schedule: " + trainer.schedule;
  document.getElementById("trainer-modal").classList.add("open");
}

function closeModal() {
  document.getElementById("trainer-modal").classList.remove("open");
}

function bindTrainerCards() {
  const cards = document.querySelectorAll(".trainer-card");
  cards.forEach((card, index) => {
    card.addEventListener("click", () => openModal(TRAINERS[index]));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("trainers")) {
    buildSearchBar();
    buildModal();
    bindTrainerCards();
  }
});