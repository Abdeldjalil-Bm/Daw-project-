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
