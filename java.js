const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const totalAmountElement = document.querySelector('.total-amount');
let cart = [];

function addToCart(event) {
    const productCard = event.target.closest('.product-card');
    const productName = productCard.querySelector('h3').innerText;
    const productPrice = parseFloat(productCard.querySelector('.price').innerText.replace('$', '').replace(',', ''));
    
    const existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    
    updateCartUI();
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartUI();
}

function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        
        const precioFormateado = item.price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        
        cartItem.innerHTML = `
            <p>${item.name} - ${precioFormateado} x ${item.quantity}</p>
            <button class="remove-item" data-name="${item.name}">Eliminar</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    const totalFormateado = total.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    
    totalAmountElement.innerText = `${totalFormateado}`;
    
    const removeItemButtons = document.querySelectorAll('.remove-item');
    removeItemButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productName = event.target.getAttribute('data-name');
            removeFromCart(productName);
        });
    });
}

addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

document.getElementById('checkoutBtn').addEventListener('click', function() {
    const checkoutMessage = document.getElementById('checkoutMessage');
    checkoutMessage.style.display = 'block';

    cart = [];
    updateCartUI();
});


document.addEventListener('DOMContentLoaded', function() {
    var scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) { scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    });
});
