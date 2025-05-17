// DOM Elements
let nav_links = document.querySelector(".nav_links");
const cart = document.querySelector(".cart");
const cartItemsContainer = document.getElementById("cart_items");
const countCart = document.querySelector(".count_cart");
const countItem = document.querySelector(".count_item");
const subtotalElement = document.querySelector(".bottom_cart .price_cart");
const favorites = document.querySelector(".favorites");
const favoriteItemsContainer = document.getElementById("favorite_items");
const countFavorite = document.querySelectorAll(".count_favorite");
const checkout_items = document.getElementById("checkout_items");

// LocalStorage Data
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let favoriteItems = JSON.parse(localStorage.getItem('favoriteItems')) || [];

function open_men() {
    nav_links.classList.toggle("active");
}

function setupProductEventListeners(data) {
    const add_to_cart = document.querySelectorAll(".btn_add_cart");
    const add_to_favorite = document.querySelectorAll(".icon_product");

    add_to_cart.forEach(button => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute('data-id');
            const selectProduct = data.find(product => product.id == productId);
            if (selectProduct) addToCartProduct(selectProduct);
        });
    });

    add_to_favorite.forEach(button => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute('data-id');
            const selectProduct = data.find(product => product.id == productId);
            if (selectProduct) {
                addToFavorites(selectProduct, button);
            }
        });

        const productId = button.getAttribute('data-id');
        const isFavorite = favoriteItems.some(item => item.id == productId);
        if (isFavorite) {
            button.classList.add('active');
        }
    });

    add_to_cart.forEach(button => {
        const productId = button.getAttribute('data-id');
        updateButton(productId);
    });
}

fetch('products.json')
    .then(response => response.ok ? response.json() : Promise.reject("Fetch failed"))
    .then(data => setTimeout(() => setupProductEventListeners(data), 100))
    .catch(error => console.error('Error fetching products:', error));

function addToCartProduct(product) {
    const existingItem = cartItems.find(item => item.id == product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateButton(product.id);
    renderCart();
}

function addToFavorites(product, button) {
    const existingItem = favoriteItems.find(item => item.id == product.id);
    if (existingItem) {
        favoriteItems = favoriteItems.filter(item => item.id != product.id);
        button.classList.remove('active');
    } else {
        favoriteItems.push(product);
        button.classList.add('active');
    }
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
    renderFavorites();
}

function renderCart() {
    let input_items = document.getElementById("items");
    let input_count = document.getElementById("count");
    let total_Price = document.getElementById("total_Price");
    let price_item = document.getElementById("price_item");

    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = '';
    if (input_items) input_items.value = "";
    if (input_count) input_count.value = "";
    if (price_item) price_item.value = "";
    if (total_Price) total_Price.value = "";
    if (checkout_items) checkout_items.innerHTML = '';

    let subtotal = 0;
    const shipping = 25;

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Cart is empty</p>';
        if (checkout_items) checkout_items.innerHTML = '<p>Cart is empty</p>';
    } else {
        cartItems.forEach((item, index) => {
            const totalPriceItems = item.price * item.quantity;
            subtotal += totalPriceItems;

            if (input_items) {
                input_items.value += `${item.name}----price : $${item.price}----count : ${item.quantity}----total: $${totalPriceItems}\n`;
            }

            cartItemsContainer.innerHTML += `
                <div class="item_cart">
                <img src="${item.img}" />
                    <div class="content">
                        <h4>${item.name}</h4>
                        <p class="price_cart">$${totalPriceItems}</p>
                        <div class="quantity_control">
                            <button class="decras_qyantity" onclick="updateQuantity(${index}, -1)">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="incresa_qyantity" onclick="updateQuantity(${index}, 1)">+</button>
                        </div>
                    </div>
                    <button class="delet_item" onclick="deleteItem(${index})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>`;

            if (checkout_items) {
                checkout_items.innerHTML += `
                    <div class="item_card">
                        <div class="img_name">
                <img src="${item.img}" />
                            <div class="content">
                                <h4>${item.name}</h4>
                                <p class="price_card">$${totalPriceItems}</p>
                                <div class="quantity">
                                    <button class="decras_qyantity" onclick="updateQuantity(${index}, -1)">-</button>
                                    <span class="quantity_p">${item.quantity}</span>
                                    <button class="incresa_qyantity" onclick="updateQuantity(${index}, 1)">+</button>
                                </div>
                            </div>
                        </div>
                        <button class="delet_item" onclick="deleteItem(${index})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>`;
            }
        });

        const subtotalCheckout = document.querySelector(".subtotal");
        const totalCheckout = document.querySelector(".totla_check");

        if (subtotalCheckout && totalCheckout) {
            subtotalCheckout.textContent = `$${subtotal.toFixed(2)}`;
            totalCheckout.textContent = `$${(subtotal + shipping).toFixed(2)}`;
        }

        if (price_item) price_item.value = subtotal.toFixed(2);
        if (total_Price) total_Price.value = (subtotal + shipping).toFixed(2);
        if (input_count) input_count.value = cartItems.length;
    }

    if (countCart) countCart.textContent = cartItems.length;
    if (countItem) countItem.textContent = cartItems.length;
    if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;

    cartItems.forEach(item => updateButton(item.id));
}

function renderFavorites() {
    if (!favoriteItemsContainer || !favorites) return;


    favoriteItemsContainer.innerHTML = '';

    if (favoriteItems.length === 0) {
        favorites.style.display = "none";
        favoriteItemsContainer.innerHTML = '<p>لا يوجد عناصر في المفضلة</p>';
    } else {
        favorites.style.display = "block";
        favoriteItems.forEach((item, index) => {
            favoriteItemsContainer.innerHTML += `
                <div class="item_favorite">
                <img src="../${item.img}" />
                    <div class="content">
                        <h4>${item.name}</h4>
                        <p class="price_cart">$${item.price}</p>
                    </div>
                    <button class="delete_favorite" onclick="deleteFavorite(${index})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>`;
        });
    }

    countFavorite.forEach(count => {
        count.textContent = favoriteItems.length;
    });
}

function updateQuantity(index, change) {
    cartItems[index].quantity += change;
    if (cartItems[index].quantity <= 0) cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart();
}

function deleteItem(index) {
    const deletedItem = cartItems.splice(index, 1)[0];
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart();
    updateButton(deletedItem.id);
}

function updateButton(productId) {
    const allMatching = document.querySelectorAll(`.btn_add_cart[data-id="${productId}"]`);
    const isInCart = cartItems.some(item => item.id == productId);

    allMatching.forEach(button => {
        button.classList.toggle("active", isInCart);
        button.innerHTML = isInCart
            ? `<i class="fa-solid fa-cart-shopping"></i> Item in Cart`
            : `<i class="fa-solid fa-cart-shopping"></i> Add to Cart`;
    });
}

function deleteFavorite(index) {
    favoriteItems.splice(index, 1);
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
    renderFavorites();

    const favoriteButtons = document.querySelectorAll(".icon_product");
    favoriteButtons.forEach(button => {
        const productId = button.getAttribute('data-id');
        const isFavorite = favoriteItems.some(item => item.id == productId);
        button.classList.toggle('active', isFavorite);
    });
}

function open_cart(event) {
    if (event) event.preventDefault();
    if (cart) cart.classList.toggle('active');
}

function open_favorites(event) {
    if (event) event.preventDefault();
    if (favorites) favorites.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    renderFavorites();
});

document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("loggedIn")) {
        window.location.href = "/login.html";
    } else {
        // لو مسجل دخول
        renderCart();
        renderFavorites();
        document.getElementById("loginBtn").style.display = "none";
        document.getElementById("signUpBtn").style.display = "none";
        document.getElementById("logoutBtn").style.display = "inline-block";
    }
});

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "/login.html";
}