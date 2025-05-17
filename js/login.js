

// login.js
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // مثال بسيط - هنا تفترض تحقق صحيح
    if (email && password) {
        // نحفظ حالة تسجيل الدخول
        localStorage.setItem("loggedIn", "true");
        alert("✅ تم تسجيل الدخول بنجاح");
        window.location.href = "../index.html"; // تروح للموقع
    } else {
        alert("❌ يرجى ملء جميع الحقول.");
    }
});


const signupButton = document.querySelector("#signupButton");
console.log(signupButton);  // تحقق من العنصر في الكونسول
if (signupButton) {
    signupButton.addEventListener("click", function () {
        window.location.href = "../html/signUp.html";
    });
}
