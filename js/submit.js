const form = document.getElementById("form_contact");
const scriptURL = "https://script.google.com/macros/s/AKfycbzFEX-wgiGlEElYbsM7YDLAOJNbqilB2wh5F8g7kFfQbFOSz7phs5ZnbSyhObfVsjLQ/exec";

form.addEventListener("submit", (e) => {
    e.preventDefault();

    // إرسال البيانات إلى Google Script
    fetch(scriptURL, {
        method: "POST",
        body: new FormData(form),
    })
        .then((res) => res.text())
        .then((text) => {
            console.log("Success:", text);
            alert("✅ تم إرسال البيانات بنجاح");

            // 🧹 امسح السلة نهائيًا من الذاكرة والتخزين المحلي
            cartItems = [];
            localStorage.removeItem("cartItems");
            renderCart();

            // 🧹 امسح بيانات الفورم
            form.reset();

            // التأكد من وجود العناصر قبل محاولة تعديل قيمتها
            const itemsInput = document.getElementById("items");
            const countInput = document.getElementById("count");
            const priceItemInput = document.getElementById("price_item");
            const totalPriceInput = document.getElementById("total_Price");

            if (itemsInput) itemsInput.value = "";
            if (countInput) countInput.value = "";
            if (priceItemInput) priceItemInput.value = "";
            if (totalPriceInput) totalPriceInput.value = ""; // مسح قيمة total

            // مسح قيمة الـ Subtotal
            const subtotalElement = document.querySelector(".subtotal");
            if (subtotalElement) subtotalElement.textContent = "$0.00"; // تعيين القيمة إلى صفر أو فارغة

            // إعادة تحميل الصفحة بعد إتمام العملية
            location.reload();  // إعادة تحميل الصفحة

        })
        .catch((error) => {
            console.error("Error:", error.message);
            alert("❌ حصل خطأ أثناء الإرسال");
        });
});


