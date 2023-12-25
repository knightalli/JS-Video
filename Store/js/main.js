const swiper = new Swiper(".swiper-container", {
    loop: true,
    navigation: {
        nextEl: ".slider-button-next",
        prevEl: ".slider-button-prev",
    },
});

const cart = {
    cartGoods: [],
    addCardId(id) {},
    cartRender() {

    }
};

const buttonCart = document.querySelector(".button-cart");
const modalCart = document.querySelector('#modal-cart');

function scrollTop() {
    const scrollLinks = document.querySelectorAll(".scroll-link");
    for (const scrollLink of scrollLinks) {
        scrollLink.addEventListener("click", (e) => {
            e.preventDefault();
            const id = scrollLink.getAttribute("href");
            document.querySelector(id).scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
    }
}

scrollTop();


buttonCart.addEventListener('click', () => {
    //cart.renderCart();
    modalCart.classList.add('show');
})

document.addEventListener('mouseup', (e) => {
    if (!e.target.closest('.modal')) {
        if (modalCart.classList.contains('show')) {
            modalCart.classList.remove('show');
        }
    }
})

document.body.addEventListener('click', (e) => {
    const target = e.target.closest(('.add-to-cart'))
    if (target) {
        cart.addCardId(target.dataset.id)
    }
})