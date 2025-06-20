let mainPage = document.querySelector(".mainPage");
let blogContent = document.querySelector(".blogContent");
let cardMen = document.querySelector(".cardMen");
let cardgirl = document.querySelector(".cardgirl");
let aboutPage = document.querySelector(".about");
let contactus = document.querySelector(".contact");
let cart = [];

function home() {
    showSection("home");
}

function shop() {
    showSection("shop");
}

function blog() {
    showSection("blog");
}

function about() {
    showSection("about");
}

function contact() {
    showSection("contact");
}

function showSection(section) {
    mainPage.style.display = (section === "home") ? "flex" : "none";
    cardMen.style.display = (section === "home" || section === "shop") ? "block" : "none";
    cardgirl.style.display = (section === "home" || section === "shop") ? "block" : "none";
    blogContent.style.display = (section === "blog") ? "block" : "none";
    aboutPage.style.display = (section === "about") ? "block" : "none";
    contactus.style.display = (section === "contact") ? "block" : "none";
    document.querySelector(".addCart").style.display = "none";

    ["home", "shop", "blog", "about", "contact"].forEach(id => {
        document.getElementById(id).style.color = (id === section) ? "rgb(1, 190, 190)" : "black";
    });
}

function showCard(img) {
    document.getElementById("cartImg").src = img.src;
    document.querySelector(".fullPage").style.display = "flex";
    cardMen.style.display = "none";
    cardgirl.style.display = "none";
    mainPage.style.display = "none";
    blogContent.style.display = "none";
    contactus.style.display = "none";
    aboutPage.style.display = "none";
}

// Price map (realistic ₹ prices)
const productPrices = {
    "Cutton Trending Shirt's": 799,
    "Trending Girl Tops": 649,
    "Special Offer Shirt": 599
};

// Add to Cart from product grid
document.querySelectorAll(".crd").forEach(card => {
    const btn = card.querySelector("button");
    const img = card.querySelector("img");
    const name = card.querySelector("h3");

    btn.addEventListener("click", () => {
        const item = {
            name: name.innerText,
            img: img.src,
            price: productPrices[name.innerText] || 499,
            quantity: 1
        };

        const existing = cart.find(i => i.name === item.name);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push(item);
        }
        alert(`${item.name} added to cart`);
    });
});

// Modal "Add to Cart"
function addToCart() {
    const img = document.getElementById("cartImg").src;
    const itemName = "Special Offer Shirt";
    const existing = cart.find(i => i.name === itemName);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            name: itemName,
            img: img,
            price: productPrices[itemName],
            quantity: 1
        });
    }
    alert("Added to cart!");
    document.querySelector(".fullPage").style.display = "none";
}

// Buy Now
document.querySelector(".cartText .btn button").addEventListener("click", () => {
    alert("Redirecting to payment...");
    document.querySelector(".fullPage").style.display = "none";
});

// View Cart
function addItem() {
    showSection("");
    renderCart();
}

function renderCart() {
    const cartDiv = document.querySelector(".addCart");
    cartDiv.innerHTML = "<h2 style='margin-bottom: 20px;'>Your Cart</h2>";

    if (cart.length === 0) {
        cartDiv.innerHTML += "<p>Cart is empty.</p>";
    } else {
        cart.forEach((item, index) => {
            cartDiv.innerHTML += `
                <div class="cart-item">
                    <img src="${item.img}">
                    <div class="cart-details">
                        <h3>${item.name}</h3>
                        <p>Price: ₹${item.price}</p>
                        <p>Quantity: ${item.quantity}</p>
                    </div>
                    <div class="cart-controls">
                        <button onclick="increaseQty(${index})">+</button>
                        <button onclick="decreaseQty(${index})">-</button>
                        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
                    </div>
                </div>
            `;
        });

        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        cartDiv.innerHTML += `<h3 style="margin-top:20px;">Total: ₹${total}</h3>`;
    }

    cartDiv.style.display = "block";
}

// Cart Controls
function increaseQty(index) {
    cart[index].quantity++;
    renderCart();
}

function decreaseQty(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}
