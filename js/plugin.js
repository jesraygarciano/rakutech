let subtotalPrice = document.querySelector("#cart-section__subtotal"),
totalPrice = document.querySelector("#cart-section__total"),
total_items = document.querySelector(".header__top--cart-items");
cart_total_price = document.querySelector(".header__top--cart-price");

const togglePassword = document.querySelector('#togglePassword'),
    password = document.querySelector('#password'),
    signUpForm = document.querySelector('#signup-submit'),
    loginForm = document.querySelector('#login-submit');

//#region Header and Footer Functionalities
let window_width = window.innerWidth;

if(document.querySelector(".header__main-nav--toggle")){
    let toggleBtn = document.querySelector(".header__main-nav--toggle"),
        navBar    = document.querySelector(".header__nav-bar");

    toggleBtn.addEventListener("click", function(){
        navBar.classList.toggle('header__nav-bar--show')
    });
}

if(document.querySelector(".header__main-nav--carret")){
    let hasDropDown = document.querySelector(".header__main-nav--carret");
    hasDropDown.addEventListener("click", function(){
        this.nextElementSibling.classList.toggle('header__mega-menu--show')
        this.firstChild.classList.toggle('fa-caret-down');
        this.firstChild.classList.toggle('fa-caret-up');
    });
}

function removeMenuTabEvents(){
    if(document.querySelectorAll(".header__nav-bar ul li a")){
        menuTabs = document.querySelectorAll(".header__nav-bar ul li a");
        for (let index = 0; index < menuTabs.length; index++) {
            menuTabs[index].removeAttribute("onmouseover");
        }
    }
}

if(window_width <= 991){
    removeMenuTabEvents();
}

let counter = 1;

window.onresize = function(event){
    window_width = window.innerWidth; 
    if(window_width <= 991){
        removeMenuTabEvents();
    }
}

if(document.querySelector(".footer__middle--site-map")){
    let footerTab = document.getElementsByClassName("footer__middle--site-map");
    
    for (let index = 0; index < footerTab.length; index++) {
        footerTab[index].addEventListener("click", function(){
            this.classList.toggle('footer__arrow');
            this.lastElementChild.classList.toggle("footer__nav--show");
        });
    }
}
//#endregion

//#region Quantity Function
var cartObj = [],
    personSignedUp = [];

// Put the object into storage

if(JSON.parse(localStorage.getItem('cartObj'))){
    JSON.parse(localStorage.getItem('cartObj')).forEach(e => {
        cartObj.push(e);
    });   
    totalItems();
    cartTotalPrice();
}
if(JSON.parse(localStorage.getItem('personSignedUp'))){
    JSON.parse(localStorage.getItem('personSignedUp')).forEach(e => {
        personSignedUp.push(e)
    });
}

document.addEventListener('click', function(e){
    if(hasClass(e.target, 'bottom1__card__add-to-cart')){

        if(cartObj){
            var checkExist = cartObj.find(function(post, index){
                if(post.product_id === e.target.offsetParent.offsetParent.offsetParent.offsetParent.querySelector('.bottom1__card__image').getAttribute('src').replace('images/',''))
                    return true;
            });
        }

        if(checkExist){
            checkExist.product_quantity = parseInt(checkExist.product_quantity) + 1;
        }else{
            cartObj.push(
                {'product_id': e.target.offsetParent.offsetParent.offsetParent.offsetParent.querySelector('.bottom1__card__image').getAttribute('src').replace('images/',''),
                'product_image': e.target.offsetParent.offsetParent.offsetParent.offsetParent.querySelector('.bottom1__card__image').getAttribute('src').replace('images/',''), 
                'product_title': e.target.offsetParent.offsetParent.offsetParent.offsetParent.querySelector('.bottom1__card__title').textContent, 
                'product_price': e.target.offsetParent.offsetParent.offsetParent.offsetParent.querySelector('.bottom1__card__price').textContent.replace('$',''), 
                'product_quantity': 1}
            );
        }

        localStorage.setItem('cartObj', JSON.stringify(cartObj));
        totalItems();
        cartTotalPrice();
    }
});


if(localStorage.getItem('cartObj')){
    JSON.parse(localStorage.getItem('cartObj')).forEach(element => {
        if(document.querySelector('.cart-section__product-list')){
            let cartList = document.querySelector('.cart-section__product-list'),
            div = document.createElement('div');
    
            div.classList.add('cart-section__table-row');
            div.setAttribute('id', element.product_id);
            div.innerHTML = 
            `<div class="cart-section__table-row--product">
                <button class="cart-section__table-row--product--cancel-item-btn"><i class="fas fa-times"></i></button>
                <img src="images/${element.product_image}">${element.product_title}
            </div>
            <div class="cart-section__table-row--unit-price">
                <span class="cart-section__table-row--unit-price--label">Unit Price</span>${element.product_price}
            </div>
            <div class="cart-section__table-row--qty">
                <button class="cart-section__table-row--qty--minus-btn" id="qty-minus-btn">-</button>
                <div class="cart-section__table-row--qty--number">${element.product_quantity}</div>
                <button class="cart-section__table-row--qty--plus-btn" id="qty-plus-btn">+</button>
            </div>
            <div class="cart-section__table-row--price">
                <span class="cart-section__table-row--price--label">Price</span>
                <span class="cart-section__table-row--price--label-price">$${element.product_quantity * element.product_price}</span>
            </div>`;
    
            cartList.appendChild(div);
    
            subtotalPrice.textContent = `$ ${subtotal().subtotal}`;
            totalPrice.textContent = `$ ${subtotal().totalPrice}`;
        }
    });
}

// Retrieve the object from storage

const remainQuantity = 20;
document.addEventListener("click", function(e){
    if(cartObj){
        var checkExist = cartObj.find(function(post, index){
            if(post.product_id === e.target.parentElement.parentElement.getAttribute('id'))
                return true;
        });
    }

    if(e.target.id.split(' ').indexOf("qty-plus-btn") >- 1){
        let prod_quantity = e.target.previousElementSibling,
            prod_price = e.target.parentElement.nextElementSibling.lastElementChild;

        if(parseInt(prod_quantity.textContent, 10) !== remainQuantity && checkExist){
            prod_quantity.textContent = parseInt(prod_quantity.textContent, 10) + 1;
            checkExist.product_quantity = parseInt(checkExist.product_quantity) + 1;
        }
        if(document.querySelectorAll(".cart-section__table-row--price--label-price"))
            prod_price.textContent = `$${parseInt(prod_quantity.textContent, 10) * parseFloat(e.target.parentElement.parentElement.querySelector(".cart-section__table-row--unit-price").textContent.replace('Unit Price', ''))}`

        subtotalPrice.textContent = `$ ${subtotal().subtotal}`;
        totalPrice.textContent = `$ ${subtotal().totalPrice}`;
        cart_total_price.textContent = `$ ${subtotal().totalPrice}`;

        localStorage.setItem('cartObj', JSON.stringify(cartObj));

    }else if(e.target.id.split(' ').indexOf("qty-minus-btn") >- 1){
        let prod_quantity = e.target.nextElementSibling,
            prod_price = e.target.parentElement.nextElementSibling.lastElementChild;

        if(parseInt(prod_quantity.textContent, 10) > 1 && checkExist){
            prod_quantity.textContent = parseInt(prod_quantity.textContent, 10) - 1
            checkExist.product_quantity = parseInt(checkExist.product_quantity) - 1;

            if(document.querySelectorAll(".cart-section__table-row--price--label-price"))
                prod_price.textContent = `$${parseInt(prod_quantity.textContent, 10) * parseFloat(e.target.parentElement.parentElement.querySelector(".cart-section__table-row--unit-price").textContent.replace('Unit Price', ''))}`
        }
        subtotalPrice.textContent = `$ ${subtotal().subtotal}`;
        totalPrice.textContent = `$ ${subtotal().totalPrice}`;
        cart_total_price.textContent = `$ ${subtotal().totalPrice}`;

        localStorage.setItem('cartObj', JSON.stringify(cartObj));

    }else if(hasClass(e.target, "cart-section__table-row--product--cancel-item-btn")){
        e.target.parentElement.parentElement.remove();
        subtotalPrice.textContent = `$ ${subtotal().subtotal}`;
        totalPrice.textContent = `$ ${subtotal().totalPrice}`;
        cart_total_price.textContent = `$ ${subtotal().totalPrice}`;

        cartObj = cartObj.filter(item => item.product_id != e.target.parentElement.parentElement.getAttribute('id'));
        localStorage.setItem('cartObj', JSON.stringify(cartObj));

        total_items.textContent =  `${cartObj.length} Items`
    }

});

function subtotal(){
    let subtotalPrice = document.querySelectorAll('.cart-section__table-row--price--label-price'), 
        shipping = parseFloat(document.querySelector("#cart-section__shipping").textContent.replace('$', '')),
        obj = {},
        total = 0.00;
    subtotalPrice.forEach(element =>{
         total += parseFloat(element.textContent.replace('$',''));
    });

    obj.subtotal = total.toFixed(2);
    obj.totalPrice = (parseFloat(total) + shipping).toFixed(2);

    return obj;
}

function hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
}

function totalItems(){
    if(total_items && JSON.parse(localStorage.getItem('cartObj')))
        total_items.textContent = `${JSON.parse(localStorage.getItem('cartObj')).length} Items`; 
}

function cartTotalPrice(){
    let total = 0;
    if(cart_total_price && JSON.parse(localStorage.getItem('cartObj'))){
        JSON.parse(localStorage.getItem('cartObj')).forEach( e => {
            total = parseFloat(total) + (parseFloat(e.product_quantity) * parseFloat(e.product_price));
        })
    cart_total_price.textContent = `$ ${(total + 20).toFixed(2)}`;

    }
}
//#endregion


if(document.querySelectorAll(".main__product--select_color span")){
    let colors = document.querySelectorAll(".main__product--select_color span"),
        imageBg = document.querySelector(".main__product--image--big");
    for (let index = 0; index < colors.length; index++) {
        colors[index].addEventListener("click", function(){
            imageBg.src = `images/beats__${this.classList.toString().substring(15)}.png`;
        });    
    }
}

if(togglePassword){
    togglePassword.addEventListener('click', function (e) {
        // toggle the type attribute
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        // toggle the eye slash icon
        this.classList.toggle('fa-eye-slash');
    });
}

const email = document.querySelector('#email');
if(signUpForm){
    signUpForm.addEventListener('submit', function(e){
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target).entries()),
            emailInvalid = document.querySelector('.sign-up__invalid-feedback'),
            successPopUp = document.querySelector('.successful-registered'),
            divBackDrop = document.querySelector('.successful-registered__backdrop'),
            checkExist;

        if(personSignedUp){
            checkExist = personSignedUp.find(function(personData, index){
                if(personData.email === data.email)
                    return true;
            });
        }

        if(checkExist){
            email.classList.add('sign-up__input--error');
            emailInvalid.classList.add('sign-up__invalid-feedback--show');
        }else{
            personSignedUp.push(data);
            successPopUp.classList.toggle('successful-registered--show');
            divBackDrop.classList.toggle('successful-registered__backdrop--show')
            successPopUp.style.display = 'flex';
        }

        localStorage.setItem('personSignedUp', JSON.stringify(personSignedUp));

    });
}

if(loginForm){
    loginForm.addEventListener('submit', function(e){
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target).entries()),
            emailInvalid = document.querySelector('.sign-up__invalid-feedback');

        if(personSignedUp){
            checkExist = personSignedUp.find(function(personData, index){
                if(personData.email === data.email && personData.password === data.password)
                    return true;
            });
        }

        if(checkExist){
            window.location.replace('index.html')
        }else{
            email.classList.add('sign-up__input--error');
            emailInvalid.classList.add('sign-up__invalid-feedback--show');
        }

    });
}


function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

document.addEventListener('click', function(e){
    if(e.target.id.split(' ').indexOf("email") >- 1 && hasClass(e.target, 'sign-up__input--error'))
        e.target.classList.toggle('sign-up__input--error');
    else if(hasClass(e.target, 'successful-registered__success')){
        window.location.replace('login-in-page.html')
    }
})



