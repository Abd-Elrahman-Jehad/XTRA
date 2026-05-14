const products = {
  "hero": { id: "hero", name: "XTRA Regular Bicycle", brand: "XTRA", category: "exclusive", price: 1749, image: "assets/bike-1.png" },
  "step-thru": { id: "step-thru", name: "Discover 2 Step-Thru", brand: "Premium Sets", category: "premium", price: 768, oldPrice: 980, image: "assets/bike-pr10-600x392.png", sale: "22%" },
  "folding": { id: "folding", name: "Folding Electric Bike", brand: "Exclusive", category: "exclusive", price: 1270, image: "assets/bike-pr11-600x392.png" },
  "parkwood": { id: "parkwood", name: "Parkwood Electric Bike", brand: "Cannondale", category: "cannondale", price: 980, image: "assets/bike-pr3-600x392.png" },
  "roar": { id: "roar", name: "Special Roar Bike CE", brand: "Cannondale", category: "cannondale", price: 675, image: "assets/bike-pr6-600x392.png" },
  "vega": { id: "vega", name: "Vega CE Low-Step", brand: "Cannondale", category: "cannondale", price: 805, image: "assets/bike-pr7-600x392.png" },
  "hybrid": { id: "hybrid", name: "Hybrid Electric Bike", brand: "Bianchi", category: "limited", price: 999, image: "assets/bike-pr8-600x392.png" },
  "high-timber": { id: "high-timber", name: "High Timber 24in", brand: "Cannondale", category: "cannondale", price: 790, image: "assets/bike-pr7-600x392.png" },
  "pro-vortex": { id: "pro-vortex", name: "Pro Bike Vortex", brand: "Cannondale", category: "cannondale", price: 768, image: "assets/bike-pr10-600x392.png" },
  "urban-rider": { id: "urban-rider", name: "Urban Rider Sport", brand: "Orbea", category: "orbea", price: 890, image: "assets/bike-pr11-600x392.png" },
  "mountain-x": { id: "mountain-x", name: "Mountain X Trail", brand: "Orbea", category: "orbea", price: 1120, image: "assets/bike-pr6-600x392.png" },
  "city-glide": { id: "city-glide", name: "City Glide Pro", brand: "Premium Sets", category: "premium", price: 930, image: "assets/bike-pr3-600x392.png" },
  "volt-cargo": { id: "volt-cargo", name: "Volt Cargo Bike", brand: "Limited Edition", category: "limited", price: 1450, image: "assets/bike-pr8-600x392.png" },
  "road-sprint": { id: "road-sprint", name: "Road Sprint Aero", brand: "Orbea", category: "orbea", price: 1195, image: "assets/bike-pr10-600x392.png" },
  "kids-wave": { id: "kids-wave", name: "Kids Wave 20in", brand: "Exclusive", category: "exclusive", price: 520, image: "assets/bike-pr11-600x392.png" },
  "gravel-core": { id: "gravel-core", name: "Gravel Core SE", brand: "Premium Sets", category: "premium", price: 1010, image: "assets/bike-pr6-600x392.png" }
};

const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const toastBox = document.querySelector("[data-toast-box]");
let toastTimer;
let lastScrollY = window.scrollY;

function readStore(key) {
  try { return JSON.parse(localStorage.getItem(key)) || {}; }
  catch (_) { return {}; }
}

function writeStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  updateCounters();
}

function cartTotalCount() {
  return Object.values(readStore("xtraCart")).reduce((sum, count) => sum + count, 0);
}

function updateCounters() {
  document.querySelectorAll("[data-cart-count]").forEach((el) => { el.textContent = cartTotalCount(); });
  document.querySelectorAll("[data-wishlist-count]").forEach((el) => { el.textContent = Object.keys(readStore("xtraWishlist")).length; });
}

function showToast(message) {
  if (!toastBox) return;
  toastBox.textContent = message;
  toastBox.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastBox.classList.remove("show"), 2400);
}

function addToCart(id) {
  const cart = readStore("xtraCart");
  cart[id] = (cart[id] || 0) + 1;
  writeStore("xtraCart", cart);
  showToast("Product has been added to your cart.");
}

function addToWishlist(id) {
  const wishlist = readStore("xtraWishlist");
  wishlist[id] = true;
  writeStore("xtraWishlist", wishlist);
  showToast("Product has been added to your wishlist.");
}

window.addEventListener("scroll", () => {
  if (!header) return;
  const currentY = window.scrollY;
  header.classList.toggle("scrolled", currentY > 18);
  header.classList.toggle("nav-hidden", currentY > lastScrollY && currentY > 180);
  lastScrollY = Math.max(currentY, 0);
});

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuToggle.classList.toggle("open", nav.classList.contains("open"));
  });
  nav.addEventListener("click", (event) => {
    const aboutTrigger = event.target.closest(".about-trigger");
    if (aboutTrigger && window.matchMedia("(max-width: 1180px)").matches) {
      event.preventDefault();
      aboutTrigger.closest(".nav-item").classList.toggle("open");
      return;
    }
    if (event.target.matches("a")) {
      nav.classList.remove("open");
      menuToggle.classList.remove("open");
    }
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

function attachMouseCards(root = document) {
  root.querySelectorAll("[data-mouse-card]").forEach((card) => {
    if (card.dataset.mouseReady) return;
    card.dataset.mouseReady = "true";
    const layer = card.querySelector("[data-mouse-layer]") || card.querySelector("img");
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) - 0.5;
      const y = ((event.clientY - rect.top) / rect.height) - 0.5;
      layer.style.transform = `rotateX(${y * -9}deg) rotateY(${x * 12}deg) translate3d(${x * 22}px, ${y * 18}px, 28px)`;
    });
    card.addEventListener("mouseleave", () => {
      layer.style.transform = "";
    });
  });
}

attachMouseCards();

document.querySelectorAll("[data-tilt]").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) - 0.5;
    const y = ((event.clientY - rect.top) / rect.height) - 0.5;
    card.style.transform = `perspective(900px) rotateX(${y * -4}deg) rotateY(${x * 5}deg) translateY(-8px)`;
  });
  card.addEventListener("mouseleave", () => { card.style.transform = ""; });
});

document.addEventListener("click", (event) => {
  const cartButton = event.target.closest("[data-cart]");
  const wishlistButton = event.target.closest("[data-wishlist]");
  const removeCart = event.target.closest("[data-remove-cart]");
  const removeWishlist = event.target.closest("[data-remove-wishlist]");

  if (cartButton) addToCart(cartButton.dataset.cart);
  if (wishlistButton) addToWishlist(wishlistButton.dataset.wishlist);
  if (removeCart) {
    const cart = readStore("xtraCart");
    delete cart[removeCart.dataset.removeCart];
    writeStore("xtraCart", cart);
    renderCart();
  }
  if (removeWishlist) {
    const wishlist = readStore("xtraWishlist");
    delete wishlist[removeWishlist.dataset.removeWishlist];
    writeStore("xtraWishlist", wishlist);
    renderWishlist();
  }
});

const slides = Array.from(document.querySelectorAll(".testimonial"));
let slideIndex = 0;
function setSlide(nextIndex) {
  if (!slides.length) return;
  slides[slideIndex].classList.remove("active");
  slideIndex = (nextIndex + slides.length) % slides.length;
  slides[slideIndex].classList.add("active");
}
document.querySelector("[data-next]")?.addEventListener("click", () => setSlide(slideIndex + 1));
document.querySelector("[data-prev]")?.addEventListener("click", () => setSlide(slideIndex - 1));
if (slides.length) setInterval(() => setSlide(slideIndex + 1), 5200);

document.querySelector("[data-subscribe]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  showToast("Thanks, your email was added.");
  event.currentTarget.reset();
});

document.querySelectorAll("[data-accordion] .faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const group = button.closest("[data-accordion]");
    group.querySelectorAll(".faq-item").forEach((faq) => faq.classList.remove("active"));
    item.classList.add("active");
  });
});

const shopGrid = document.querySelector("[data-shop-grid]");
const resultsText = document.querySelector("[data-results]");
document.querySelectorAll("[data-filter]").forEach((tab) => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((otherTab) => otherTab.classList.remove("active"));
    tab.classList.add("active");
    let visibleCount = 0;
    document.querySelectorAll("[data-shop-card]").forEach((card) => {
      const show = filter === "all" || card.dataset.category.split(" ").includes(filter);
      card.hidden = !show;
      if (show) visibleCount += 1;
    });
    if (resultsText) resultsText.textContent = `Showing all ${visibleCount} results`;
  });
});

document.querySelector("[data-cols-toggle]")?.addEventListener("click", () => {
  if (!shopGrid) return;
  const next = shopGrid.dataset.cols === "4" ? "3" : "4";
  shopGrid.dataset.cols = next;
  document.querySelector("[data-cols-toggle]").firstChild.textContent = `${next === "4" ? "4" : "3"} Products `;
});

function money(value) {
  return `$${value.toLocaleString("en-US")}`;
}

function rowMarkup(product, extra = "") {
  return `<article class="shop-row">
    <img src="${product.image}" alt="${product.name}">
    <div><h3>${product.name}</h3><p>${product.brand}</p><strong>${money(product.price)}</strong></div>
    <div>${extra}</div>
  </article>`;
}

function renderCart() {
  const target = document.querySelector("[data-cart-list]");
  if (!target) return;
  const cart = readStore("xtraCart");
  const ids = Object.keys(cart).filter((id) => products[id]);
  if (!ids.length) {
    target.innerHTML = `<div class="empty-state">Your cart is empty.</div>`;
  } else {
    target.innerHTML = ids.map((id) => {
      const product = products[id];
      const qty = cart[id];
      return rowMarkup(product, `<p>Qty: ${qty}</p><button class="button orange" type="button" data-remove-cart="${id}">Remove</button>`);
    }).join("");
  }
  const total = ids.reduce((sum, id) => sum + products[id].price * cart[id], 0);
  document.querySelector("[data-cart-total]")?.replaceChildren(document.createTextNode(money(total)));
}

function renderWishlist() {
  const target = document.querySelector("[data-wishlist-list]");
  if (!target) return;
  const wishlist = readStore("xtraWishlist");
  const ids = Object.keys(wishlist).filter((id) => products[id]);
  target.innerHTML = ids.length ? ids.map((id) => {
    const product = products[id];
    return rowMarkup(product, `<button class="button orange" type="button" data-cart="${id}">Add to cart</button><button class="button white small" type="button" data-remove-wishlist="${id}">Remove</button>`);
  }).join("") : `<div class="empty-state">Your wishlist is empty.</div>`;
}

function renderProduct() {
  const target = document.querySelector("[data-product-detail]");
  if (!target) return;
  document.body.classList.add("product-page");
  const id = new URLSearchParams(window.location.search).get("id") || "step-thru";
  const product = products[id] || products["step-thru"];
  target.classList.add("xtra-product-detail");
  target.insertAdjacentHTML(
  "beforebegin",

  `
  <div class="floating-breadcrumb">

    <a href="index.html">
      <i class="fas fa-house"></i>
    </a>

    <i class="fas fa-bicycle"></i>

    <a href="shop.html">
      Products
    </a>

    <i class="fas fa-bicycle"></i>

    <span>
      ${product.brand}
    </span>

  </div>
  `
);
target.innerHTML = 

`

<div class="xtra-product-copy">

  <div class="product-head-top">

    <h1>${product.name}</h1>

    <div class="product-top-tools">

      <a href="#" class="product-prev">
        <i class="fas fa-chevron-left"></i>
      </a>

      <a href="shop.html">
        <i class="fas fa-border-all"></i>
      </a>

      <a href="#" class="product-next">
        <i class="fas fa-chevron-right"></i>
      </a>

    </div>

  </div>

  <div class="rating-row">
    <b>4.7</b>

    <span>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
    </span>

    <small>(3 Rating)</small>
  </div>

      <div class="single-price">${money(product.price)}</div>
      <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
   <div class="buy-row">

  <div class="qty-control">

    <button type="button" data-qty-minus>
      -
    </button>

    <strong data-qty-value>
      1
    </strong>

    <button type="button" data-qty-plus>
      +
    </button>

  </div>

  <button
    class="button orange add-cart-btn"
    type="button"
    data-cart="${product.id}"
  >
    <i class="fas fa-cart-shopping"></i>

    Add to cart
  </button>

  <button
    class="round-buy"
    type="button"
    data-title="ADD TO WISHLIST"
    data-wishlist="${product.id}"
  >
    <i class="far fa-heart"></i>
  </button>

  <button
    class="round-buy"
    type="button"
    data-title="ADD TO COMPARE"
    data-compare="${product.id}"
  >
    <i class="fas fa-shuffle"></i>
  </button>

</div>
      <a class="themeforest-btn" href="https://themeforest.net/item/xtra-responsive-multipurpose-wordpress-theme/20715590?irgwc=1&afsrc=1&clickid=y4uV0U10VxycWNiywYRpJ0YsUkuUlrx%3A4WyQ1g0&iradid=275988&irpid=1287861&iradtype=ONLINE_TRACKING_LINK&irmptype=mediapartner&mp_value1=&utm_campaign=af_impact_radius_1287861&utm_medium=affiliate&utm_source=impact_radius"><i class="fas fa-link"></i> Purchase from ThemeForest</a>
      <div class="specialist-card"><span><i class="fas fa-phone"></i></span><div><small>Need help choosing the right product?</small><strong>Speak to product specialist at <u><a href="tel:13128000000">1-312-800-0000</a></u></strong></div></div>
      <div class="product-facts"><dl><dt>Brand</dt><dd>${product.brand}</dd><dt>SKU</dt><dd>SKU_22</dd><dt>Status</dt><dd>90 in stock <span>✓</span></dd><dt>Tags</dt><dd>Bike, Road, Timber</dd><dt>Categories</dt><dd>
  <a
    class="product-category-link"
href="shop.html?category=${product.category}"
  >
    ${product.category}
  </a>
</dd></dl><div class="brand-badge">XTRA</div></div>
      <div class="secure-payments"><p>Secure payments:</p><img src="assets/payment.png" alt="Secure payment methods"></div>
<div class="share-box">

  <h3>Share it</h3>

  <div>

    <i class="fab fa-facebook-f"></i>

    <i class="fab fa-x-twitter"></i>

    <i class="fab fa-pinterest-p"></i>

    <i class="fab fa-whatsapp"></i>

    <i class="fas fa-envelope"></i>

  </div>

</div>    </div>
    <div class="xtra-product-visual" data-mouse-card><img src="${product.image}" alt="${product.name}" data-mouse-layer></div>`;
  document.querySelector(".product-tabs-shell")?.remove();
  document.querySelector(".product-recommendations")?.remove();
  document.querySelector(".sticky-product-bar")?.remove();
  document.querySelector(".page-hero").insertAdjacentHTML("afterend", productTabsMarkup(product));
  document.querySelector(".product-tabs-shell").insertAdjacentHTML("afterend", productRecommendationsMarkup(product));
  document.body.insertAdjacentHTML("beforeend", stickyProductMarkup(product));
  attachMouseCards(target);
  bindProductTabs();
  bindRecommendationSliders();
  bindQtyControls();
}

function productTabsMarkup(product) {
  return `<section class="product-tabs-shell">
    <div class="product-tabs" role="tablist">
      <button class="active" type="button" data-product-tab="description">Description</button>
      <button type="button" data-product-tab="information">Information</button>
      <button type="button" data-product-tab="reviews">Reviews <span>3</span></button>
      <button type="button" data-product-tab="size">Size Guide</button>
      <button type="button" data-product-tab="faq">FAQ</button>
      <button type="button" data-product-tab="shipping">Shipping & Returns</button>
    </div>
    <div class="product-tab-panel active" data-product-panel="description"><h2>Your Personal Assistant</h2><p>Welcome to the next generation of assistance with our Future Helper Robot. Engineered with cutting-edge artificial intelligence, this robotic companion serves as your personal assistant, seamlessly integrating into your daily routine to enhance productivity and convenience. Whether you need help with scheduling, organization, or simply a friendly chat, our Future Helper Robot is always at your service, learning from your preferences and adapting to your needs over time.</p><h2>Effortless Household Management</h2><p>Say goodbye to mundane chores and hello to newfound freedom with our Future Helper Robot. Equipped with nimble mobility and dexterous manipulators, it effortlessly navigates your home, tackling household tasks with efficiency and precision. From cleaning and tidying to managing smart home devices and even assisting with meal preparation, this robot revolutionizes the way you maintain your living space, leaving you with more time to focus on what truly matters.</p><h2>Entertainment Hub of Tomorrow</h2><p>But our Future Helper Robot is more than just a practical assistant—it’s also a gateway to endless entertainment and enrichment. With its intuitive interface and seamless connectivity, it transforms into your personal entertainment hub, streaming music, news, and immersive virtual reality experiences at your command. Whether you’re unwinding after a long day or seeking inspiration for your next adventure, this robot brings entertainment to life in ways you never thought possible.</p> <p>Experience the future today with our Future Helper Robot. Embrace a world where technology works for you, empowering you to achieve more, live better, and unlock the full potential of tomorrow.</p></div>
    <div class="product-tab-panel" data-product-panel="information"><h2>Additional information</h2><table><tbody><tr><th>Weight</th><td>32 lbs</td></tr><tr><th>Dimensions</th><td>69 × 30 × 53 in</td></tr><tr><th>Product year</th><td>2024</td></tr><tr><th>Product manual</th><td>Included in the package</td></tr><tr><th>Refundable</th><td>Up to 14 days</td></tr></tbody></table></div>
<!-- REVIEWS TAB -->
<div class="product-tab-panel reviews-panel" data-product-panel="reviews">

  <!-- LEFT -->
  <div class="review-score">

    <form class="review-form">

      <!-- SUMMARY -->
      <div class="review-summary">

        <div>
          <strong>4.67</strong>

          <div class="review-stars">
            ★★★★★
          </div>

          <small>(3 Rating)</small>
        </div>

        <div class="rating-bars">

          <div class="rating-row-r">
            <span>5 ★</span>

            <div class="rating-track">
              <div class="rating-fill" style="width:67%"></div>
            </div>

            <span>67%</span>
          </div>

          <div class="rating-row-r">
            <span>4 ★</span>

            <div class="rating-track">
              <div class="rating-fill" style="width:33%"></div>
            </div>

            <span>33%</span>
          </div>

          <div class="rating-row-r">
            <span>3 ★</span>

            <div class="rating-track">
              <div class="rating-fill" style="width:0%"></div>
            </div>

            <span>0%</span>
          </div>

          <div class="rating-row-r">
            <span>2 ★</span>

            <div class="rating-track">
              <div class="rating-fill" style="width:0%"></div>
            </div>

            <span>0%</span>
          </div>

          <div class="rating-row-r">
            <span>1 ★</span>

            <div class="rating-track">
              <div class="rating-fill" style="width:0%"></div>
            </div>

            <span>0%</span>
          </div>

        </div>

      </div>

      <!-- TITLE -->
      <h3>Add a review</h3>

      <p>
        Your email address will not be published.
        Required fields are marked *
      </p>

      <!-- STARS -->
      <div class="rating-select">
        <i>☆</i>
        <i>☆</i>
        <i>☆</i>
        <i>☆</i>
        <i>☆</i>
      </div>

      <!-- TEXTAREA -->
      <textarea
        placeholder="Your review *"
        required
      ></textarea>

      <!-- FIELDS -->
      <div class="review-fields">

        <div class="field">
          <label>Name *</label>
          <input type="text" required>
        </div>

        <div class="field">
          <label>Email *</label>
          <input type="email" required>
        </div>

        <div class="field">
          <label>2 + 2 = ?</label>
          <input type="text" required>
        </div>

      </div>

      <!-- SAVE -->
      <div class="review-save">

        <input type="checkbox" id="save">

        <label for="save">
          Save my name, email, and website in this browser
          for the next time I comment.
        </label>

      </div>

      <!-- BUTTON -->
      <button type="submit">
        Submit
      </button>

    </form>

  </div>

  <!-- RIGHT -->
  <div class="review-list">

    <h2>
      3 reviews for ${product.name}
    </h2>

    ${
      ["Emily","Laura","Sophie"]
      .map((name, index) => `
      
      <article>

        <img
          src="assets/per${index + 1}.png"
          alt="${name}"
        >

        <div>

          <h3>${name}</h3>

          <small>
            29 November 2025
          </small>

          <p>
            ${
              index === 0
              ? "This product exceeded my expectations. The packaging was professional and delivery was fast. I will buy again for sure."
              : index === 1
              ? "Beautiful design and solid build quality. Could be slightly more premium but still great. Very satisfied overall."
              : "Amazing quality and very reliable. Used daily with zero issues. Highly recommended for anyone."
            }
          </p>

        </div>

        <span>★★★★★</span>

      </article>

      `).join("")
    }

  </div>

</div>

<!-- SIZE TAB -->
<div class="product-tab-panel" data-product-panel="size">

  <table class="size-table">

    <thead>
      <tr>
        <th>Size</th>
        <th>USA</th>
        <th>Europe</th>
        <th>Others</th>
      </tr>
    </thead>

    <tbody>

      <tr>
        <th>XS</th>
        <td>28-30</td>
        <td>27-29</td>
        <td>34-36</td>
      </tr>

      <tr>
        <th>S</th>
        <td>30-32</td>
        <td>29-31</td>
        <td>36-38</td>
      </tr>

      <tr>
        <th>M</th>
        <td>32-33</td>
        <td>31-33</td>
        <td>38-40</td>
      </tr>

      <tr>
        <th>L</th>
        <td>33-34</td>
        <td>33-36</td>
        <td>40-44</td>
      </tr>

      <tr>
        <th>XL</th>
        <td>34-38</td>
        <td>36-40</td>
        <td>44-48</td>
      </tr>

      <tr>
        <th>XXL</th>
        <td>38-48</td>
        <td>40-44</td>
        <td>48-50</td>
      </tr>

    </tbody>

  </table>

</div>

<!-- FAQ TAB -->
<div class="product-tab-panel" data-product-panel="faq">
  <div class="faq-tab-panel">
    <h2>FAQ</h2>

  <img
    src="assets/faqq.png"
    alt="FAQ"
  >

  <ul>

    <li>
      <b>What payment methods do you accept?</b>

      <p>
     We accept various payment methods, including credit/debit cards, PayPal, and bank transfers for your convenience.
      </p>
    </li>

    <li>
      <b>Do you offer international shipping?</b>

      <p>
       Yes, we offer international shipping to many countries. Please check our shipping information page for details on available destinations and shipping rates.
      </p>
    </li>

    <li>
      <b>How can I track my order?</b>

      <p>
       Once your order is shipped, you will receive a tracking number via email. You can use this number to track your package's delivery status on our website or through the courier's tracking portal.
      </p>
    </li>

    <li>
      <b>What is your return policy?</b>

      <p>
       We offer a hassle-free return policy. If you're not satisfied with your purchase for any reason, you can return it within 30 days for a full refund or exchange. Please refer to our returns page for detailed instructions.
      </p>
    </li>

    <li>
      <b>Are your products covered by a warranty?</b>

      <p>
       Yes, most of our products come with a manufacturer's warranty against defects in materials and workmanship. The duration and terms of the warranty vary by product, so please check the product description or contact our customer support team for specific details.
      </p>
    </li>

  </ul>

</div>
</div>

<div class="product-tab-panel shipping-panel" data-product-panel="shipping">

  <h2>Shipping & Delivery</h2>

  <p>
   All estimated shipping times are in addition to fulfillment times, We offer a next working day delivery for orders placed before 6:30 p.m. Monday to Friday. Orders placed after this will be delivered within two working days. This excludes Saturday, Sunday and holidays. Appointed is not responsible for any customs/duties related to international orders. We are unable to calculate charges prior to your order being delivered, and recommend checking with your local customs office for more information. Shipping fees will not be refunded if you refuse these charges.
  </p>

  <div class="shipping-wrap">

    <!-- LEFT -->
    <div class="shipping-left">

      <ul>
        <li>Free destination delivery above $100</li>
        <li>Europe 1 – 3 days Free</li>
        <li>United States 4 – 6 days Free</li>
        <li>Asia 3 – 6 days Free</li>
        <li>Africa 5 – 7 days Free</li>
        <li>Australia 3 – 5 days Free</li>
      </ul>

    </div>

    <!-- RIGHT -->
    <div class="shipping-images">

      <img src="assets/shipping.png" alt="">


    </div>

  </div>

  <h2 class="returns-title">Returns & Refunds</h2>

  <p>
  We have a 14-day return policy, which means you have 14 days after receiving your item to request a return, To be eligible for a return, your item must be in the same condition that you received it, unused, and in its original packaging. You’ll also need the order confirmation, order number, or proof of purchase. We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method. Please remember it can take some time for your bank or credit card company to process and post the refund too.
  </p>

</div>  </section>`;
}

function stickyProductMarkup(product) {
  return `<div class="sticky-product-bar"><div><img src="${product.image}" alt="${product.name}"><span><strong>${product.name}</strong><small>${money(product.price)}</small></span></div><div class="buy-row"><div class="qty-control"><button type="button" data-qty-minus>-</button><strong data-qty-value>1</strong><button type="button" data-qty-plus>+</button></div><button class="button orange" type="button" data-cart="${product.id}"><i class="fas fa-cart-shopping"></i> Add to cart</button><button class="round-buy" type="button" data-wishlist="${product.id}"><i class="far fa-heart"></i></button><button class="round-buy" type="button"><i class="fas fa-shuffle"></i></button></div></div>`;
}

function compactProductCard(product) {
  const oldPrice = product.oldPrice ? `<del>${money(product.oldPrice)}</del>` : "";
  return `<article class="product-card related-product-card" data-product="${product.id}">
<div class="product-image">

  <img src="${product.image}" alt="${product.name}">

<div class="image-icons">

  <!-- wishlist -->
<!-- wishlist -->
<button
  type="button"
  class="icon wishlist-btn"
  data-label="Wishlist"
  data-wishlist="${product.id}"
>

  <svg viewBox="0 0 24 24">
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
      2 5.42 4.42 3 7.5 3
      c1.74 0 3.41.81 4.5 2.09
      C13.09 3.81 14.76 3 16.5 3
      19.58 3 22 5.42 22 8.5
      c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    />
  </svg>

</button>

  <!-- compare -->
  <button
    type="button"
    class="icon compare-btn"
    onclick="location.href='product.html?id=${product.id}'"
    data-label="Compare"
  >
    <svg viewBox="0 0 24 24">
      <path d="M7 7h10l-3-3m3 3l-3 3M17 17H7l3 3m-3-3l3-3"/>
    </svg>
  </button>

  <!-- quick -->
  <button
    type="button"
    class="icon quick-btn"
    onclick="location.href='product.html?id=${product.id}'"
    data-label="Quick View"
  >
    <svg viewBox="0 0 24 24">
      <path d="M12 5C6 5 2 12 2 12s4 7 10 7 10-7 10-7-4-7-10-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
    </svg>
  </button>

</div>

</div>
    <div class="product-meta"><h4><a href="product.html?id=${product.id}">${product.name}</a></h4><p>${product.brand}</p><div class="price-row">${oldPrice}<strong>${money(product.price)}</strong><div class="product-actions"><button type="button" data-cart="${product.id}"><i class="fas fa-cart-shopping"></i> Add to cart</button></div></div></div>
  </article>`;
}

function recommendationSection(title, items, key) {
  return `<section class="product-reco-block" data-reco-block>
    <div class="reco-heading"><h2>${title}</h2><div class="reco-arrows"><button type="button" data-reco-prev="${key}" aria-label="Previous products"><i class="fas fa-chevron-left"></i></button><button type="button" data-reco-next="${key}" aria-label="Next products"><i class="fas fa-chevron-right"></i></button></div></div>
    <div class="reco-viewport"><div class="reco-track" data-reco-track="${key}">${items.map(compactProductCard).join("")}</div></div>
  </section>`;
}

function productRecommendationsMarkup(product) {
  const allProducts = Object.values(products).filter((item) => item.id !== "hero" && item.id !== product.id);
  const sameCategory = allProducts.filter((item) => item.category === product.category);
  const related = [...sameCategory, ...allProducts.filter((item) => item.category !== product.category)].slice(0, 6);
  const alsoLike = allProducts.slice(2, 8);
  const viewed = [products["step-thru"], products["folding"], products["high-timber"], products["parkwood"], products["vega"]].filter((item) => item && item.id !== product.id);
  return `<section class="product-recommendations">
   
    ${recommendationSection("Related products", related, "related")}
    ${recommendationSection("Recently viewed products", viewed, "viewed")}
  </section>`;
}
function bindRecommendationSliders(){

  const sliders =
  document.querySelectorAll("[data-reco-track]");

  sliders.forEach(track => {

    const originalCards =
    [...track.querySelectorAll(".related-product-card")];

    if(!originalCards.length) return;

    // نسخ أول 3 كروت
    originalCards.slice(0,3).forEach(card => {

      const clone =
      card.cloneNode(true);

      track.appendChild(clone);

    });

    const cards =
    track.querySelectorAll(".related-product-card");

    const key =
    track.dataset.recoTrack;

    const prevBtn =
    document.querySelector(
     ` [data-reco-prev="${key}"]`
    );

    const nextBtn =
    document.querySelector(
     `[data-reco-next="${key}"]` 
    );

    let index = 0;

    const gap = 18;

    const moveSlider = () => {

      const card =
      cards[0];

      const move =
      card.offsetWidth + gap;

      track.style.transform =
      `translateX(-${index * move}px)`;

    };

    // NEXT
    nextBtn?.addEventListener("click", () => {

      index++;

      moveSlider();

      // لما يوصل النسخ
      if(index >= originalCards.length){

        setTimeout(() => {

          track.style.transition =
          "none";

          index = 0;

          moveSlider();

          // رجع الانيميشن
          setTimeout(() => {

            track.style.transition =
            "transform .9s cubic-bezier(.22,.61,.36,1)";

          },20);

        },900);

      }

    });

    // PREV
    prevBtn?.addEventListener("click", () => {

      if(index <= 0){

        track.style.transition =
        "none";

        index =
        originalCards.length;

        moveSlider();

        setTimeout(() => {

          track.style.transition =
          "transform .9s cubic-bezier(.22,.61,.36,1)";

          index--;

          moveSlider();

        },20);

      }else{

        index--;

        moveSlider();

      }

    });

  });

}

function bindProductTabs() {
  document.querySelectorAll("[data-product-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-product-tab]").forEach((tab) => tab.classList.toggle("active", tab === button));
      document.querySelectorAll("[data-product-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.productPanel === button.dataset.productTab));
    });
  });
}

function bindQtyControls() {
  document.querySelectorAll("[data-qty-minus], [data-qty-plus]").forEach((button) => {
    button.addEventListener("click", () => {
      const control = button.closest(".qty-control");
      const value = control.querySelector("[data-qty-value]");
      const next = Math.max(1, Number(value.textContent) + (button.matches("[data-qty-plus]") ? 1 : -1));
      document.querySelectorAll("[data-qty-value]").forEach((el) => { el.textContent = next; });
    });
  });
}

document.querySelector("[data-checkout-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  localStorage.removeItem("xtraCart");
  updateCounters();
  showToast("Order preview completed.");
  event.currentTarget.reset();
});

renderCart();
renderWishlist();
renderProduct();
updateCounters();

/* ========================= */
/* 🔥 TESTIMONIAL SLIDER SAFE */
/* ========================= */

(function () {
  const slides = document.querySelectorAll('.testimonial');
  const nextBtn = document.querySelector('[data-next]');
  const prevBtn = document.querySelector('[data-prev]');

  if (!slides.length || !nextBtn || !prevBtn) return;

  let current = 0;

  function updateSlider() {
    slides.forEach((slide, index) => {
      slide.classList.remove('active');
      if (index === current) {
        slide.classList.add('active');
      }
    });

    // arrows state
    if (current === 0) {
      prevBtn.classList.add('disabled');
    } else {
      prevBtn.classList.remove('disabled');
    }

    if (current === slides.length - 1) {
      nextBtn.classList.add('disabled');
    } else {
      nextBtn.classList.remove('disabled');
    }

    // active color
    prevBtn.classList.toggle('active', current > 0);
    nextBtn.classList.toggle('active', current < slides.length - 1);
  }

  nextBtn.addEventListener('click', () => {
    if (current < slides.length - 1) {
      current++;
      updateSlider();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (current > 0) {
      current--;
      updateSlider();
    }
  });

  updateSlider();
})();


/* ========================= */
/* 🔥 BIKE SCROLL EFFECT */
/* ========================= */

const bike = document.querySelector('.about-bike img');
const section = document.querySelector('.about-section');

if (bike && section) window.addEventListener('scroll', () => {
  const rect = section.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // نسبة ظهور السيكشن
  let progress = 1 - (rect.top / windowHeight);

  // ضبط القيم بين 0 و 1
  progress = Math.max(0, Math.min(1, progress));

  // الحركة
  const moveX = -220 + (220 * progress);

  bike.style.transform = `translateX(${moveX}px)`;
  bike.style.opacity = progress;
});


const backTop = document.getElementById("backTop");

if (backTop) window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backTop.classList.add("show");
  } else {
    backTop.classList.remove("show");
  }
});

if (backTop) backTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

window.addEventListener("load", () => {
  document.querySelector(".side-tools")?.classList.add("show");
});

function loadComponent(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
    });
}

if (document.getElementById("navbar")) loadComponent("navbar", "navbar.html");

const bike2 = document.querySelector('.about-feature .big-bike');
const section2 = document.querySelector('.about-feature');

if (bike2 && section2) window.addEventListener('scroll', () => {
  const rect = section2.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  let progress = 1 - (rect.top / windowHeight);
  progress = Math.max(0, Math.min(1, progress));

  const moveX = -220 + (220 * progress);

  bike2.style.transform = `translateX(${moveX}px)`;
  bike2.style.opacity = progress;
});
///////////////
document.addEventListener("DOMContentLoaded", () => {

  const slider = document.querySelector(".slider");
  if (!slider) return;

  const track = slider.querySelector("#track");
  const originalSlides = Array.from(track.querySelectorAll("img"));
  const dotsContainer = document.getElementById("dots");

  /* ========================= */
  /* 🔥 نكرر الصور كتير */
  /* ========================= */

  track.innerHTML = "";

  const LOOP_COUNT = 20; // 🔥 السر هون

  let slidesBig = [];

  for (let i = 0; i < LOOP_COUNT; i++) {
    slidesBig.push(...originalSlides);
  }

  slidesBig.forEach(img => {
    track.appendChild(img.cloneNode(true));
  });

  const slides = track.querySelectorAll("img");

  let index = Math.floor(slides.length / 2); // نبدأ بالنص

  /* ========================= */
  /* 🔥 DOTS */
  /* ========================= */

  dotsContainer.innerHTML = "";

  originalSlides.forEach((_, i) => {
    const dot = document.createElement("span");

    dot.onclick = () => {
      index = Math.floor(slides.length / 2) + i;
      update();
    };

    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll("span");

  /* ========================= */
  /* 🔥 UPDATE */
  /* ========================= */

  function update() {

    slides.forEach((img, i) => {
      img.classList.remove("active", "near");

      if (i === index) img.classList.add("active");
      if (i === index - 1 || i === index + 1)
        img.classList.add("near");
    });

    const realIndex =
      ((index % originalSlides.length) + originalSlides.length) % originalSlides.length;

    dots.forEach(d => d.classList.remove("active"));
    dots[realIndex].classList.add("active");

    const slideWidth = slides[0].clientWidth + 60;
    const offset = index * slideWidth;

    track.style.transition = "0.6s ease";
    track.style.transform =
      `translateX(calc(50% - ${offset}px - ${slides[index].clientWidth / 2}px))`;
  }

  /* ========================= */
  /* 🔥 ARROWS */
  /* ========================= */

  const nextBtn = slider.querySelector(".next");
  const prevBtn = slider.querySelector(".prev");

  nextBtn.onclick = () => {
    index++;
    update();
  };

  prevBtn.onclick = () => {
    index--;
    update();
  };

  update();

});

/////////Navbar active state
document.addEventListener("DOMContentLoaded", function () {

  const current = window.location.pathname.split("/").pop() || "index.html";

  // 🔥 احذف أي active
  document.querySelectorAll(".main-nav a").forEach(link => {
    link.classList.remove("active");
  });

  // 🔥 LOOP عادي
  document.querySelectorAll(".main-nav a").forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;

    if (href === current) {
      link.classList.add("active");
    }
  });

  // 🔥 الحل المهم 🔥
  // إذا الصفحة about → فعّل About الرئيسي
  if (current === "about.html") {
    const about = document.querySelector(".about-trigger");
    if (about) about.classList.add("active");
  }

  // 🔥 Home fallback
  if (current === "index.html") {
    const home = document.querySelector('.main-nav a[href="index.html"]');
    if (home) home.classList.add("active");
  }

  if (current === "product.html") {
    const shop = document.querySelector('.main-nav a[href="shop.html"]');
    if (shop) shop.classList.add("active");
  }

});
////////////
document.addEventListener("DOMContentLoaded", () => {
  const current = window.location.pathname.split("/").pop() || "index.html";
  const params = new URLSearchParams(window.location.search);
  const activeMap = {
    "": "index.html",
    "index.html": "index.html",
    "about.html": "about.html",
    "services.html": "services.html",
    "blog.html": "blog.html",
    "shop.html": "shop.html",
    "faq.html": "faq.html",
    "contact.html": "contact.html",
    "product.html": "shop.html",
    "cart.html": "shop.html",
    "wishlist.html": "shop.html",
    "checkout.html": "shop.html",
    "post.html": "blog.html",
    "post1.html": "blog.html",
    "post2.html": "blog.html",
    "post3.html": "blog.html",
    "post4.html": "blog.html"
  };
  const activeHref = activeMap[current] || (params.has("id") ? "shop.html" : current);

  document.querySelectorAll(".main-nav a, .main-nav .nav-item").forEach((item) => {
    item.classList.remove("active");
  });

  const activeLink = document.querySelector(`.main-nav a[href="${activeHref}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
    activeLink.closest(".nav-item")?.classList.add("active");
  }
});

document.addEventListener("DOMContentLoaded", () => {

  const logos = document.querySelectorAll(".logo");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        logos.forEach(l => l.classList.add("show"));
      }
    });
  }, { threshold: 0.3 });

  const section = document.querySelector(".partners");
  if (section) observer.observe(section);

});
///////////////////

// 🔥 Reply buttons
const replyBtns = document.querySelectorAll(".comment-body a");
const cancelBtn = document.getElementById("cancel-reply");
const form = document.querySelector(".comment-form");

// 🔥 لما تضغط Reply
if (form && cancelBtn) replyBtns.forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();

    form.scrollIntoView({ behavior: "smooth" });

    cancelBtn.style.display = "block";
  });
});

// 🔥 Cancel reply
if (cancelBtn) cancelBtn.addEventListener("click", () => {
  document.querySelector(".comments-section")?.scrollIntoView({ behavior: "smooth" });

  cancelBtn.style.display = "none";
});

////////////////////////////////////////////////////

// 🔥 Submit button
const submitBtn = document.querySelector(".submit-btn");

if (submitBtn) submitBtn.addEventListener("click", function () {

  // 👇 نجيب قيمة الكابتشا فقط
  const captchaInput = document.getElementById("captcha");

  // 🔥 تأكد إنه موجود
  if (!captchaInput) {
    console.error("Captcha input missing!");
    return;
  }

  const captcha = captchaInput.value.trim();

  // 🔥 تحقق من الإجابة
  if (captcha !== "12") {
    // ❌ لو غلط → صفحة خطأ (اختياري)
    window.location.href = "error.html";
    return;
  }

  // ✅ لو صح → صفحة النجاح
  window.location.href = "comment-success.html";

});

if (submitBtn) submitBtn.addEventListener("click", function () {

  const captcha = document.getElementById("captcha").value;

  if (captcha !== "12") {
    window.location.href = "error.html";
    return;
  }

  // 🔥 مسح الحقول قبل الانتقال
  document.querySelectorAll("input, textarea").forEach(el => {
    el.value = "";
  });

  // 🔥 بعد هيك روح للصفحة
  window.location.href = "comment-success.html";

});

document.addEventListener("DOMContentLoaded", () => {
  if (!location.pathname.endsWith("faq.html") || document.querySelector(".breadcrumb-pilll")) return;

  console.log("breadcrumb running");

  const breadcrumb = document.createElement("div");
  breadcrumb.className = "breadcrumb-pilll";

  breadcrumb.innerHTML = `
    <a href="index.html" class="bc-home">
      <i class="ri-home-5-line"></i>
    </a>

    <i class="ri-bike-line bc-bike"></i>

    <span>FAQ</span>
  `;

  document.body.prepend(breadcrumb);

});
///////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const shopGrid = document.querySelector(".shop-shell .shop-grid");
  if (!shopGrid) return;

  const gridButtons = document.querySelectorAll(".shop-shell .grid-btn");
  const resultsBox = document.querySelector("[data-results]");
  const productSelect = document.querySelector(".products-select");
  const categoryTabs = document.querySelectorAll(".shop-shell [data-filter]");
  const shopProducts = Object.values(products).filter((product) => product.id !== "hero");
  let activeFilter = "all";
  let activeLimit = Number(productSelect?.value || 32);

  function productCardMarkup(product) {
    const saleMarkup = product.sale ? `<div class="sale-stack"><span>Sale!</span><span>${product.sale}</span></div>` : "";
    const oldPrice = product.oldPrice ? `<del>${money(product.oldPrice)}</del>` : "";
    return `<article class="product-card reveal" data-shop-card data-category="${product.category}" data-product="${product.id}" data-tilt>
      <a class="product-image" href="product.html?id=${product.id}">${saleMarkup}<img src="${product.image}" alt="${product.name}">
        <div class="image-icons"><button type="button" data-wishlist="${product.id}" aria-label="Add to wishlist"><i class="far fa-heart"></i></button><button type="button" aria-label="Compare"><i class="fas fa-shuffle"></i></button><button type="button" aria-label="Quick view"><i class="fas fa-magnifying-glass"></i></button></div>
      </a>
      <div class="product-meta"><h4><a href="product.html?id=${product.id}">${product.name}</a></h4><p>${product.brand}</p><div class="price-row">${oldPrice}<strong>${money(product.price)}</strong><div class="product-actions"><button type="button" data-cart="${product.id}"><i class="fas fa-cart-shopping"></i> Add to cart</button></div></div></div>
    </article>`;
  }

  function updateCategoryCounts() {
    categoryTabs.forEach((tab) => {
      const filter = tab.dataset.filter;
      const count = filter === "all" ? shopProducts.length : shopProducts.filter((product) => product.category === filter).length;
      const small = tab.querySelector("small");
      if (small) small.textContent = `${count} Items`;
    });
  }

  function applyShopState() {
    const filtered = shopProducts.filter((product) => activeFilter === "all" || product.category === activeFilter);
    const visibleIds = new Set(filtered.slice(0, activeLimit).map((product) => product.id));
    shopGrid.querySelectorAll("[data-shop-card]").forEach((card) => {
      card.hidden = !visibleIds.has(card.dataset.product);
    });
    const shown = Math.min(activeLimit, filtered.length);
    if (resultsBox) resultsBox.textContent = shown < filtered.length ? `Showing 1-${shown} of ${filtered.length} results` : `Showing all ${filtered.length} results`;
  }

  shopGrid.innerHTML = shopProducts.map(productCardMarkup).join("");
  shopGrid.dataset.enhanced = "true";
  shopGrid.classList.remove("cols-2", "cols-3", "cols-4");
  shopGrid.classList.add("cols-4");
  shopGrid.querySelectorAll(".reveal").forEach((card) => {
    card.classList.add("visible");
    observer.observe(card);
  });
  attachMouseCards(shopGrid);
  updateCategoryCounts();
  applyShopState();

  gridButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      gridButtons.forEach((button) => button.classList.remove("active"));
      btn.classList.add("active");
      shopGrid.classList.remove("cols-2", "cols-3", "cols-4");
      shopGrid.classList.add(`cols-${btn.dataset.grid}`);
    });
  });

  productSelect?.addEventListener("change", () => {
    activeLimit = Number(productSelect.value);
    applyShopState();
  });

  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      categoryTabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      activeFilter = tab.dataset.filter;
      applyShopState();
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".shop-shell .shop-grid")?.dataset.enhanced === "true") return;

  const shopGrid =
  document.querySelector(".shop-grid");

  const gridButtons =
  document.querySelectorAll(".grid-btn");

  const resultsBox =
  document.querySelector("[data-results]");

  const productSelect =
  document.querySelector(".products-select");

  if (!shopGrid || !productSelect || !resultsBox) return;


/* =========================
   GRID SWITCHER
========================= */

gridButtons.forEach(btn => {

  btn.addEventListener("click", () => {

    /* remove active */
    gridButtons.forEach(b => {
      b.classList.remove("active");
    });

    /* active */
    btn.classList.add("active");

    /* remove old */
    shopGrid.classList.remove(
      "cols-2",
      "cols-3",
      "cols-4"
    );

    /* add new */
    const cols = btn.dataset.grid;

    shopGrid.classList.add(`cols-${cols}`);

  });

});


/* =========================
   PRODUCTS SELECT
========================= */

productSelect.addEventListener("change", () => {

  const value =
  parseInt(productSelect.value);

  const products =
  document.querySelectorAll(".product-card");

  products.forEach((card,index) => {

    if(index < value){

      card.style.display = "block";

    }else{

      card.style.display = "none";

    }

  });

  if(value < products.length){

    resultsBox.textContent =
    `Showing 1–${value} of ${products.length} results`;

  }else{

    resultsBox.textContent =
    `Showing all ${products.length} results`;

  }

});


/* =========================
   DEFAULT
========================= */

shopGrid.classList.add("cols-4");


/////////////////////////
// =========================================
// PRODUCT NEXT / PREV
// =========================================

const productKeys =
Object.keys(products);

const currentId =
new URLSearchParams(window.location.search).get("id");

const currentIndex =
productKeys.indexOf(currentId);

const prevBtn =
document.querySelector(".product-prev");

const nextBtn =
document.querySelector(".product-next");

if(prevBtn){

  let prevIndex =
  currentIndex - 1;

  if(prevIndex < 0){
    prevIndex = productKeys.length - 1;
  }

  prevBtn.href =
  `product.html?id=${productKeys[prevIndex]}`;
}

if(nextBtn){

  let nextIndex =
  currentIndex + 1;

  if(nextIndex >= productKeys.length){
    nextIndex = 0;
  }

  nextBtn.href =
  `product.html?id=${productKeys[nextIndex]}`;
}

/* =====================================
   WISHLIST FINAL
===================================== */

function getWishlist(){

  return JSON.parse(
    localStorage.getItem("wishlist")
  ) || [];

}

function saveWishlist(data){

  localStorage.setItem(
    "wishlist",
    JSON.stringify(data)
  );

}


/* COUNT */
function updateWishlistCount(){

  const wishlist =
  getWishlist();

  document
  .querySelectorAll("[data-wishlist-count]")
  .forEach(count => {

    count.textContent =
    wishlist.length;

  });

}


/* ACTIVE */
function syncWishlistButtons(){

  const wishlist =
  getWishlist().map(String);

  document
  .querySelectorAll(".wishlist-btn")
  .forEach(btn => {

    const id =
    String(btn.dataset.wishlist);

    btn.classList.toggle(
      "active",
      wishlist.includes(id)
    );

  });

}
/* CLICK */
document.addEventListener("click", e => {

  const btn =
  e.target.closest(".wishlist-btn");

  if(!btn) return;

  e.preventDefault();
  e.stopPropagation();

  const id =
  String(btn.dataset.wishlist);

  let wishlist =
  JSON.parse(
    localStorage.getItem("wishlist")
  ) || [];

  /* حول الكل string */
  wishlist =
  wishlist.map(item => String(item));

  /* موجود؟ */
  const exists =
  wishlist.includes(id);

  /* REMOVE */
  if(exists){

    wishlist =
    wishlist.filter(item => item !== id);

    btn.classList.remove("active");

  }else{

    /* ADD */
    wishlist.push(id);

    btn.classList.add("active");
  }

  /* SAVE */
  localStorage.setItem(
    "wishlist",
    JSON.stringify(wishlist)
  );

  /* UPDATE */
  updateWishlistCount();

  syncWishlistButtons();

});

});

/* =========================================
   CLEAN ACTIVE NAV
========================================= */

const currentPage =
window.location.pathname.split("/").pop() || "index.html";

/* تنظيف الكل */

document
.querySelectorAll(".main-nav a, .about-trigger")
.forEach(link => {

  link.classList.remove("active");
});

/* تفعيل الصفحة الحالية فقط */

document
.querySelectorAll(".main-nav a")
.forEach(link => {

  const href = link.getAttribute("href");

  if(href === currentPage){

    link.classList.add("active");
  }
});

/* =========================================
   FINAL TOP-LEVEL NAV ACTIVE
========================================= */
document.addEventListener("DOMContentLoaded", () => {
  const current = window.location.pathname.split("/").pop() || "index.html";
  const activeMap = {
    "": "index.html",
    "index.html": "index.html",
    "about.html": "about.html",
    "services.html": "services.html",
    "blog.html": "blog.html",
    "shop.html": "shop.html",
    "faq.html": "faq.html",
    "contact.html": "contact.html",
    "product.html": "shop.html",
    "cart.html": "shop.html",
    "wishlist.html": "shop.html",
    "checkout.html": "shop.html",
    "post.html": "blog.html",
    "post1.html": "blog.html",
    "post2.html": "blog.html",
    "post3.html": "blog.html",
    "post4.html": "blog.html"
  };
  const activeHref = activeMap[current] || current;

  document.querySelectorAll(".main-nav > a, .main-nav > .nav-item > .about-trigger").forEach((link) => {
    link.classList.remove("active");
  });

  document.querySelectorAll(".main-nav > .nav-item").forEach((item) => {
    item.classList.remove("active");
  });

  const activeLink = activeHref === "about.html"
    ? document.querySelector(".main-nav > .nav-item > .about-trigger")
    : document.querySelector(`.main-nav > a[href="${activeHref}"]`);

  if (activeLink) {
    activeLink.classList.add("active");
    activeLink.closest(".nav-item")?.classList.add("active");
  }
});
/* =========================================
   ULTRA CINEMATIC INTRO
========================================= */

if (false) {
document.body.classList.add("loading");

const canvas =
document.getElementById("introCanvas");

/* =========================================
   THREE JS
========================================= */

const scene =
new THREE.Scene();

const camera =
new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

camera.position.z = 10;

const renderer =
new THREE.WebGLRenderer({
  canvas,
  antialias:true,
  alpha:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

renderer.setPixelRatio(
window.devicePixelRatio
);

/* =========================================
   LIGHTS
========================================= */

const ambient =
new THREE.AmbientLight(
0xffffff,
1.6
);

scene.add(ambient);

const orangeLight =
new THREE.PointLight(
0xff6a00,
18,
120
);

orangeLight.position.set(
0,
0,
12
);

scene.add(orangeLight);

/* =========================================
   WHEELS
========================================= */

function createWheel(x){

  const group =
  new THREE.Group();

  /* outer */

  const outerGeo =
  new THREE.TorusGeometry(
    1.8,
    .16,
    32,
    120
  );

  const outerMat =
  new THREE.MeshStandardMaterial({

    color:0xffffff,

    emissive:0xff6a00,

    emissiveIntensity:2.8,

    metalness:1,

    roughness:.15
  });

  const outer =
  new THREE.Mesh(
    outerGeo,
    outerMat
  );

  group.add(outer);

  /* inner glow */

  const innerGeo =
  new THREE.TorusGeometry(
    1.2,
    .05,
    20,
    100
  );

  const innerMat =
  new THREE.MeshBasicMaterial({
    color:0xff7a00
  });

  const inner =
  new THREE.Mesh(
    innerGeo,
    innerMat
  );

  group.add(inner);

  /* spokes */

  for(let i=0;i<12;i++){

    const spoke =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        .05,
        2.7,
        .05
      ),

      new THREE.MeshBasicMaterial({
        color:0xffffff
      })
    );

    spoke.rotation.z =
    (Math.PI/6)*i;

    group.add(spoke);
  }

  group.position.x = x;

  scene.add(group);

  return group;
}

const leftWheel =
createWheel(-3.2);

const rightWheel =
createWheel(3.2);

/* =========================================
   SPEED PARTICLES
========================================= */

const particlesGeometry =
new THREE.BufferGeometry();

const count = 2500;

const positions =
new Float32Array(count*3);

for(let i=0;i<count*3;i++){

  positions[i] =
  (Math.random()-.5)*60;
}

particlesGeometry.setAttribute(
"position",
new THREE.BufferAttribute(
positions,
3
));

const particlesMaterial =
new THREE.PointsMaterial({

  color:0xff7a00,

  size:.05,

  transparent:true,

  opacity:.8
});

const particles =
new THREE.Points(
particlesGeometry,
particlesMaterial
);

scene.add(particles);

/* =========================================
   CAMERA SHAKE
========================================= */

function shakeCamera(){

  camera.position.x =
  (Math.random()-.5)*.08;

  camera.position.y =
  (Math.random()-.5)*.04;
}

/* =========================================
   GSAP
========================================= */

/* دخول */

gsap.from(
[leftWheel.position,rightWheel.position],
{
  x:-18,
  duration:1.5,
  ease:"power4.out"
});

/* دوران */

gsap.to(
[leftWheel.rotation,rightWheel.rotation],
{
  z:-60,
  duration:2.5,
  ease:"none"
});

/* انطلاق */

gsap.to(
[leftWheel.position,rightWheel.position],
{
  x:28,
  delay:1.7,
  duration:.9,
  ease:"power4.in"
});

/* فلاش */

gsap.to(
".introFlash",
{
  opacity:.9,
  duration:.08,
  delay:2.2,
  yoyo:true,
  repeat:1
});

/* النص */

gsap.from(
".introText",
{
  opacity:0,
  y:60,
  duration:1,
  delay:.3
});

/* =========================================
   ANIMATE
========================================= */

function animate(){

  requestAnimationFrame(animate);

  shakeCamera();

  particles.rotation.z += .001;

  renderer.render(scene,camera);
}

animate();

/* =========================================
   EXIT
========================================= */
window.addEventListener("load",()=>{

  setTimeout(()=>{

    const intro =
    document.getElementById(
      "ultraIntro"
    );

    intro.classList.add("hide");

    document.body.classList.remove(
      "loading"
    );

  },3000);
});

/* =========================================
   RESIZE
========================================= */

window.addEventListener("resize",()=>{

  camera.aspect =
  window.innerWidth/window.innerHeight;

  camera.updateProjectionMatrix();

renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );
});
}

(() => {
  const loaderMarkup = `
    <div id="ultraIntro" aria-live="polite" aria-label="Loading XTRA Bike">
      <canvas id="introCanvas"></canvas>
      <div class="introGrid"></div>
      <div class="introOverlay"></div>
      <div class="introNoise"></div>
      <div class="introFlash"></div>
      <div class="introHud"><span>RIDE SYSTEM</span><strong data-loader-percent>00</strong></div>
      <div class="introBikeStage">
        <span class="introBeam beam-a"></span>
        <span class="introBeam beam-b"></span>
        <span class="introBeam beam-c"></span>
        <img class="introBikeImage" src="assets/ChatGPT Image May 14, 2026, 12_00_39 PM.png" alt="">
        <span class="introWheel wheel-left"></span>
        <span class="introWheel wheel-right"></span>
      </div>
      <div class="introText">
        <span class="introKicker">INITIALIZING ELECTRIC MOTION</span>
        <h1>XTRA <span>BIKE</span></h1>
        <p>LOADING A HIGH VOLTAGE RIDE EXPERIENCE</p>
        <div class="introProgress"><span data-loader-bar></span></div>
      </div>
    </div>`;

  if (!document.getElementById("ultraIntro")) {
    document.body.insertAdjacentHTML("afterbegin", loaderMarkup);
  }

  const intro = document.getElementById("ultraIntro");
  const canvas = document.getElementById("introCanvas");
  const percentText = intro?.querySelector("[data-loader-percent]");
  const progressBar = intro?.querySelector("[data-loader-bar]");

  if (!intro) return;

  document.body.classList.add("loading");

  let progress = 0;
  let pageLoaded = false;
  let finished = false;

  const setProgress = (value) => {
    progress = Math.max(progress, Math.min(100, value));
    if (percentText) percentText.textContent = String(Math.round(progress)).padStart(2, "0");
    if (progressBar) progressBar.style.width = `${progress}%`;
  };

  const finishIntro = () => {
    if (finished || progress < 100) return;
    finished = true;
    intro.classList.add("hide");
    setTimeout(() => {
      document.body.classList.remove("loading");
      intro.setAttribute("aria-hidden", "true");
    }, 900);
  };

  const tickProgress = () => {
    const target = pageLoaded ? 100 : 88;
    const pace = pageLoaded ? 7 : 1.8;
    setProgress(progress + Math.max(.7, (target - progress) / pace));
    if (progress >= 99.4 && pageLoaded) {
      setProgress(100);
      finishIntro();
      return;
    }
    requestAnimationFrame(tickProgress);
  };

  tickProgress();

  window.addEventListener("load", () => {
    pageLoaded = true;
    setTimeout(() => {
      setProgress(100);
      finishIntro();
    }, 1100);
  });

  setTimeout(() => {
    pageLoaded = true;
    setProgress(100);
    finishIntro();
  }, 5200);

  if (window.gsap) {
    gsap.from(".introKicker", { opacity:0, y:16, duration:.7, ease:"power3.out" });
    gsap.from(".introText h1", { opacity:0, y:52, scale:.92, duration:1, delay:.12, ease:"power4.out" });
    gsap.from(".introText p, .introProgress", { opacity:0, y:24, duration:.8, delay:.42, stagger:.08, ease:"power3.out" });
    gsap.from(".introBikeStage", { opacity:0, x:90, rotateY:-18, duration:1.15, delay:.25, ease:"power4.out" });
    gsap.to(".introFlash", { opacity:.75, duration:.08, delay:1.6, yoyo:true, repeat:1 });
  }

  if (!canvas || !window.THREE) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, .1, 1000);
  camera.position.z = 12;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));

  const tunnelGeometry = new THREE.BufferGeometry();
  const count = 1800;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const stride = i * 3;
    positions[stride] = (Math.random() - .5) * 54;
    positions[stride + 1] = (Math.random() - .5) * 26;
    positions[stride + 2] = -Math.random() * 42;
  }

  tunnelGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const particles = new THREE.Points(
    tunnelGeometry,
    new THREE.PointsMaterial({
      color:0xff6a00,
      size:.055,
      transparent:true,
      opacity:.82,
      blending:THREE.AdditiveBlending
    })
  );

  scene.add(particles);
  scene.add(new THREE.AmbientLight(0xfff2e7, 1.4));

  const glow = new THREE.PointLight(0xff6a00, 15, 90);
  glow.position.set(0, 2, 8);
  scene.add(glow);

  const animateIntro = () => {
    if (finished) return;
    requestAnimationFrame(animateIntro);
    const attrs = tunnelGeometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const z = i * 3 + 2;
      attrs.array[z] += .42;
      if (attrs.array[z] > 8) attrs.array[z] = -42;
    }
    attrs.needsUpdate = true;
    particles.rotation.z += .0018;
    camera.position.x = Math.sin(Date.now() * .003) * .08;
    camera.position.y = Math.cos(Date.now() * .002) * .05;
    renderer.render(scene, camera);
  };

  animateIntro();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();
