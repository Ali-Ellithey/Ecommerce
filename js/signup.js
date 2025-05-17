document.getElementById("signup-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password === confirmPassword) {
        alert("تم إنشاء الحساب بنجاح!");
        // هنا يمكنك إضافة الكود الذي يقوم بتخزين بيانات التسجيل
        // مثل إرسال البيانات إلى الخادم أو قاعدة بيانات
    } else {
        alert("كلمة المرور غير متطابقة.");
    }
});
