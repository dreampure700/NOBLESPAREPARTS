// SHOP OWNER: Put your WhatsApp number here with country code, digits only.
// For India, start with 91 followed by your 10-digit phone number.
// Leave this empty until you are ready. No message is sent automatically.
const WHATSAPP_NUMBER = "";

// Catalogue records and enquiry choices are loaded from products.js.

// Simple line illustrations stand in for product photographs.
const drawings = {
  headlight: '<circle cx="40" cy="40" r="26"/><path d="M22 25h36M17 35h46M17 45h46M22 55h36"/>',
  brake: '<path d="M29 12a27 27 0 0 0 0 56l6-12a14 14 0 0 1 0-31zM51 12a27 27 0 0 1 0 56l-6-12a14 14 0 0 0 0-31z"/><path d="M22 24l-3 5m2 22l3 5m34-32l3 5m-2 22l-3 5"/>',
  clutch: '<circle cx="40" cy="40" r="28" stroke-dasharray="10 3"/><circle cx="40" cy="40" r="20"/><circle cx="40" cy="40" r="11"/><path d="M35 30v20m10-20v20"/>',
  filter: '<path d="M14 19h52v42H14zM19 25h42v30H19z"/><path d="M24 26v28m6-28v28m7-28v28m7-28v28m7-28v28m6-28v28"/>',
  cable: '<path d="M16 15v16c0 28 48 28 48 0V15M21 15v16c0 21 38 21 38 0V15M12 10h13v9H12zM55 10h13v9H55zM35 55v15h10V55"/>',
  plug: '<path d="M35 7h10v13H35zM32 20h16v22H32zM28 42h24v10H28zM33 52h14v16H33zM38 68v6h12"/><path d="M32 26h16m-16 6h16m-16 6h16m-15 19h14m-14 5h14"/>',
  mirror: '<path d="M11 18q0-6 7-6h18q6 0 6 6v9q0 6-6 6H18q-7 0-7-6zM68 18q0-6-7-6H50q-6 0-6 6v9q0 6 6 6h11q7 0 7-6zM27 33l10 24v11m19-35L46 57v11M31 68h12m-3 0h12"/>'
};
const $ = (selector) => document.querySelector(selector);
const brandSelect = $("#brand");
const modelSelect = $("#model");
const yearSelect = $("#year");
const categorySelect = $("#category");
const searchInput = $("#search");

function addOption(select, value, label = value) {
  const option = document.createElement("option");
  option.value = value; option.textContent = label; select.append(option);
}
Object.keys(brandModels).forEach((brand) => {
  addOption(brandSelect, brand);
  const button = document.createElement("button");
  button.type = "button"; button.className = "brand-button";
  button.textContent = brand; button.dataset.brand = brand;
  button.setAttribute("aria-pressed", "false");
  button.addEventListener("click", () => {
    brandSelect.value = brandSelect.value === brand ? "" : brand;
    updateModels(); renderProducts();
    $("#catalogue").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  });
  $("#brand-buttons").append(button);
});
[...new Set(products.map((product) => product.category))].forEach((category) => addOption(categorySelect, category));

catalogueYears.forEach((year) => addOption(yearSelect, String(year)));

function updateModels() {
  modelSelect.replaceChildren(); addOption(modelSelect, "", "All models");
  modelSelect.disabled = !brandSelect.value;
  modelSelect.children[0].textContent = brandSelect.value ? "Select model (optional)" : "Choose manufacturer first";
  const entries = brandSelect.value ? [[brandSelect.value, brandModels[brandSelect.value]]] : [];
  entries.forEach(([brand, models]) => models.forEach((model) => addOption(modelSelect, `${brand} ${model}`)));
}

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = products.filter((product) =>
    (!brandSelect.value || product.brands.includes(brandSelect.value)) &&
    (!categorySelect.value || product.category === categorySelect.value) &&
    `${product.name} ${product.id}`.toLowerCase().includes(query)
  );
  updateVehicleContext();
  $("#products").replaceChildren();
  filtered.forEach((product) => {
    const card = document.createElement("article"); card.className = "product";
    // All markup here uses the fixed sample data above; no search input is inserted.
    card.innerHTML = `<div class="product-image"><small class="product-index">${product.id}</small><svg viewBox="0 0 80 80" aria-hidden="true">${drawings[product.icon]}</svg><span>IMAGE PLACEHOLDER</span></div><div class="product-body"><p class="demo-badge">${product.status}</p><p class="product-category">${product.category}</p><h3>${product.name}</h3><p class="product-description">${product.description}</p><p class="product-meta"><strong>Product code:</strong> ${product.id}<span><strong>Manufacturer:</strong> unverified</span><span>Vehicle manufacturer tags (demo): ${product.brands.join(", ")}</span><span><strong>Model compatibility:</strong> UNVERIFIED for all models / years</span></p><button type="button">View Details ↗</button></div>`;
    card.querySelector("button").addEventListener("click", () => showDetails(product));
    $("#products").append(card);
  });
  $("#result-count").textContent = `${filtered.length} DEMO / UNVERIFIED ${filtered.length === 1 ? "part" : "parts"} found`;
  $("#empty").hidden = filtered.length !== 0;
  document.querySelectorAll(".brand-button").forEach((button) => {
    const active = button.dataset.brand === brandSelect.value;
    button.classList.toggle("active", active); button.setAttribute("aria-pressed", String(active));
  });
}

function resetFilters() {
  searchInput.value = ""; brandSelect.value = ""; categorySelect.value = ""; yearSelect.value = "";
  updateModels(); renderProducts();
}
function enquire(product) {
  const message = ["Hello My Spare Parts Shop!", product ? `I would like to enquire about ${product.name} (${product.id}, sample catalogue).` : "I am looking for a two-wheeler spare part.", `Vehicle: ${modelSelect.value || brandSelect.value || "I will share my brand and model"}`, `Manufacturing year (customer selection, unverified): ${yearSelect.value || "to be provided"}`, "Variant: to be provided", "DEMO / UNVERIFIED record. No confirmed fitment.", "Please confirm compatibility, price and availability."].join("\n");
  if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
    $("#enquiry-preview").textContent = `Your enquiry preview:\n${message}`;
    $("#setup-dialog").showModal(); return;
  }
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}
// Model/year deliberately provide enquiry context, never a fitment match.
function updateVehicleContext() {
  const vehicle = [modelSelect.value || brandSelect.value, yearSelect.value].filter(Boolean).join(" · ");
  $("#vehicle-context").textContent = `${vehicle ? "Your enquiry vehicle: " + vehicle + ". " : "Choose a manufacturer, model and year to describe your enquiry. "}DEMO / UNVERIFIED — model and year do not narrow results or confirm compatibility.`;
}
let activeProduct = null;
function showDetails(product) {
  activeProduct = product;
  $("#detail-title").textContent = product.name;
  $("#detail-description").textContent = product.description;
  const specs = $("#detail-specs");
  specs.replaceChildren();
  const rows = [
    ["Product code", product.id + " (demo identifier, not an OEM part number)"],
    ["Category", product.category],
    ["Product manufacturer", "DEMO / UNVERIFIED — not specified"],
    ["Vehicle manufacturer tags", product.brands.join(", ") + " (demo groupings only)"],
    ["Model compatibility", "DEMO / UNVERIFIED — no confirmed model or year fitment"],
    ["Your enquiry vehicle", [modelSelect.value || brandSelect.value, yearSelect.value].filter(Boolean).join(" · ") || "Not selected"],
    ["Price / availability", "Unverified — contact the shop"]
  ];
  rows.forEach(([label, value]) => {
    const term = document.createElement("dt"), description = document.createElement("dd");
    term.textContent = label; description.textContent = value; specs.append(term); specs.append(description);
  });
  $("#product-dialog").showModal();
}
$("#detail-close").addEventListener("click", () => $("#product-dialog").close());
$("#detail-enquiry").addEventListener("click", () => {
  $("#product-dialog").close();
  if (activeProduct) enquire(activeProduct);
});
searchInput.addEventListener("input", renderProducts);
$("#search-form").addEventListener("submit", (event) => { event.preventDefault(); renderProducts(); });
brandSelect.addEventListener("change", () => { updateModels(); renderProducts(); });
modelSelect.addEventListener("change", updateVehicleContext);
yearSelect.addEventListener("change", updateVehicleContext);
categorySelect.addEventListener("change", renderProducts);
$("#reset").addEventListener("click", resetFilters);
$("#empty-reset").addEventListener("click", resetFilters);
document.querySelectorAll("[data-enquiry]").forEach((button) => button.addEventListener("click", () => enquire()));
document.querySelectorAll("#setup-dialog .dialog-close,#setup-dialog .dialog-done").forEach((button) => button.addEventListener("click", () => $("#setup-dialog").close()));
$(".menu-toggle").addEventListener("click", () => {
  const open = $("#navigation").classList.toggle("open");
  $(".menu-toggle").setAttribute("aria-expanded", String(open));
});
document.querySelectorAll("#navigation a").forEach((link) => link.addEventListener("click", () => {
  $("#navigation").classList.remove("open"); $(".menu-toggle").setAttribute("aria-expanded", "false");
}));
updateModels(); renderProducts();

