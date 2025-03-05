function w3_open() {
    document.getElementById("mySidebar").classList.add("active");
}

function w3_close() {
    document.getElementById("mySidebar").classList.remove("active");
}

function toggleSubMenu() {
    document.getElementById("submenu").classList.toggle("active");
}

function addToCart(name, image, price = 10) { // Prix fictif 10€
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Vérifier si l'article existe déjà
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, image, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${name} a été ajouté au panier !`);
}

// Mettre à jour le nombre d'articles dans l'icône panier
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cart-count").textContent = count;
}

// Charger le nombre d'articles au chargement de la page
document.addEventListener("DOMContentLoaded", updateCartCount);

function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartList = document.getElementById("cart-list");
    let totalPrice = document.getElementById("total-price");

    if (!cartList || !totalPrice) return; // Évite une erreur sur une autre page

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <span>${item.name} - ${item.price}€</span>
            <div class="quantity">
                <button onclick="changeQuantity(${index}, -1)">➖</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)">➕</button>
            </div>
            <button onclick="removeFromCart(${index})">❌</button>
        `;
        cartList.appendChild(li);
        total += item.price * item.quantity;
    });

    totalPrice.textContent = `Total : ${total}€`;
    updateCartCount();
}

// Modifier la quantité d'un article
function changeQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Supprimer un article
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Vider le panier
document.getElementById("clear-cart")?.addEventListener("click", () => {
    localStorage.removeItem("cart");
    displayCart();
});
