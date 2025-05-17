fetch('products.json')
  .then(response => response.json())
  .then(data => {
    const swiper_items_sale = document.getElementById('swiper_items_sale');
    const swiper_electronics_sale = document.getElementById('swiper_electronics_sale');
    const swiper_appliances_sale = document.getElementById('swiper_appliances_sale');
    const swiper_Mobiles_sale = document.getElementById('swiper_Mobiles_sale');

    let itemsSaleHTML = '';
    let electronicsHTML = '';
    let appliancesHTML = '';
    let mobilesHTML = '';

    data.forEach(product => {
      // منتجات بها خصم
      if (product.old_price) {
        const product_disc = Math.floor((product.old_price - product.price) / product.old_price * 100);

        itemsSaleHTML += `
          <div class="swiper-slide product">
            <span class="sale_presrent">${product_disc} %</span>
            <div class="img_product">
              <a href="#"><img src="${product.img}" /></a>
            </div>
            <div class="stars">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
            <p class="name_product"><a href="#">${product.name}</a></p>
            <div class="price">
              <p><span>$${product.price}</span></p>
              <p class="old_price">$${product.old_price}</p>
            </div>
            <div class="icon">
              <span class="btn_add_cart" data-id="${product.id}">
                <i class="fa-solid fa-cart-shopping"></i> add to cart
              </span>
              <span data-id="${product.id}" class="icon_product">
                <i class="fa-regular fa-heart"></i>
              </span>
            </div>
          </div>`;
      }

      // تصنيف المنتجات حسب الفئة
      if (product.category === "electronics") {
        const oldPriceHTML = product.old_price ? `<p class="old_price">$${product.old_price}</p>` : '';
        const discountHTML = product.old_price ? `<span class="sale_presrent">${Math.floor((product.old_price - product.price) / product.old_price * 100)} %</span>` : '';

        electronicsHTML += `
          <div class="swiper-slide product">
            ${discountHTML}
            <div class="img_product">
              <a href="#"><img src="${product.img}" /></a>
            </div>
            <div class="stars">
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
            </div>
            <p class="name_product"><a href="#">${product.name}</a></p>
            <div class="price">
              <p><span>$${product.price}</span></p>
              ${oldPriceHTML}
            </div>
            <div class="icon">
              <span class="btn_add_cart" data-id="${product.id}">
                <i class="fa-solid fa-cart-shopping"></i> add to cart
              </span>
              <span data-id="${product.id}" class="icon_product">
                <i class="fa-regular fa-heart"></i>
              </span>
            </div>
          </div>`;
      }

      if (product.category === "appliances") {
        const oldPriceHTML = product.old_price ? `<p class="old_price">$${product.old_price}</p>` : '';
        const discountHTML = product.old_price ? `<span class="sale_presrent">${Math.floor((product.old_price - product.price) / product.old_price * 100)} %</span>` : '';

        appliancesHTML += `
          <div class="swiper-slide product">
            ${discountHTML}
            <div class="img_product">
              <a href="#"><img src="${product.img}" /></a>
            </div>
            <div class="stars">
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
            </div>
            <p class="name_product"><a href="#">${product.name}</a></p>
            <div class="price">
              <p><span>$${product.price}</span></p>
              ${oldPriceHTML}
            </div>
            <div class="icon">
              <span class="btn_add_cart" data-id="${product.id}">
                <i class="fa-solid fa-cart-shopping"></i> add to cart
              </span>
              <span data-id="${product.id}" class="icon_product">
                <i class="fa-regular fa-heart"></i>
              </span>
            </div>
          </div>`;
      }

      if (product.category === "mobiles") {
        const oldPriceHTML = product.old_price ? `<p class="old_price">$${product.old_price}</p>` : '';
        const discountHTML = product.old_price ? `<span class="sale_presrent">${Math.floor((product.old_price - product.price) / product.old_price * 100)} %</span>` : '';

        mobilesHTML += `
          <div class="swiper-slide product">
            ${discountHTML}
            <div class="img_product">
              <a href="#"><img src="${product.img}" /></a>
            </div>
            <div class="stars">
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
            </div>
            <p class="name_product"><a href="#">${product.name}</a></p>
            <div class="price">
              <p><span>$${product.price}</span></p>
              ${oldPriceHTML}
            </div>
            <div class="icon">
              <span class="btn_add_cart" data-id="${product.id}">
                <i class="fa-solid fa-cart-shopping"></i> add to cart
              </span>
              <span data-id="${product.id}" class="icon_product">
                <i class="fa-regular fa-heart"></i>
              </span>
            </div>
          </div>`;
      }
    });

    if (swiper_items_sale) swiper_items_sale.innerHTML = itemsSaleHTML;
    if (swiper_electronics_sale) swiper_electronics_sale.innerHTML = electronicsHTML;
    if (swiper_appliances_sale) swiper_appliances_sale.innerHTML = appliancesHTML;
    if (swiper_Mobiles_sale) swiper_Mobiles_sale.innerHTML = mobilesHTML;
  })
  .catch(err => console.error('Error loading products:', err));
