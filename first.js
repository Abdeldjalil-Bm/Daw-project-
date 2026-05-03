/*let user ;
document.getElementById("but").onclick = function (){
    user = document.getElementById("inp").value;
    document.getElementById("myh1").textContent = `hello ${user}` ; 
}

let a ;
a = 3 ;
console.log( `a = ${a}` ) ;



function validation(){
    const value = name.value.trim() ;
    const not = / ^[A-Za-z\s]+$ /;

        if( value === "" ){
            showError( "Please your name" ) ;
            return(false) ;
        }
        else if( !not.test(value) ){
            showError( "This symbols not allowed !" ) ;
            return(false) ;
        }
        else if( value.length < 3 ){
            showError( "Your name is so short" ) ;
            return (false) ;
        }
            else{
                showSuccess();
                return(true);
            }
}
function showError( message ) {
        nameInput.style.border = "2px solid red";
        nameError.textContent = message;
    }

    function showSuccess() {
        nameInput.style.border = "2px solid green";
        nameError.textContent = "";
    }

    // 1. الفحص عند الخروج من الحقل (Blur)
    nameInput.addEventListener('blur', validateName);

    // 2. الفحص عند الضغط على زر الإرسال
    form.addEventListener('submit', (e) => {
        if (!validateName()) {
            e.preventDefault(); // منع إرسال الفورم إذا كان الاسم خطأ
            alert("يرجى تصحيح الأخطاء قبل الإرسال");
        }*/















            // 1. تعريف العناصر (Selecting Elements)
const nameInput = document.getElementById("nameInput");
const nameError = document.getElementById("nameError");
const submitBtn = document.getElementById("submitBtn");

// 2. دالة التحقق (Validation Function)
function validateName() {
    const value = nameInput.value.trim();
    
    // تصحيح: الـ Regex يجب ألا يحتوي على مسافات حول العلامات ^ و $
    const nameRegex = /^[A-Za-z\s]+$/;

    if (value === "") {
        showError("Please enter your name");
        return false;
    } 
    else if (value.length < 3) {
        showError("Your name is too short (min 3 chars)");
        return false;
    } 
    else if (!nameRegex.test(value)) {
        showError("Symbols and numbers are not allowed!");
        return false;
    } 
    else {
        showSuccess();
        return true;
    }
}

// 3. دوال التنسيق (UI Functions)
function showError(message) {
    nameInput.style.border = "2px solid red";
    nameError.textContent = message;
}

function showSuccess() {
    nameInput.style.border = "2px solid green";
    nameError.textContent = "";
}

// 4. ربط الأحداث (Event Listeners)

// الفحص عند الخروج من الحقل
nameInput.addEventListener('blur', validateName);

// الفحص عند الضغط على الزر
submitBtn.onclick = function(e) {
    if (validateName()) {
        alert("Success! Form submitted.");
        // هنا يمكنك إرسال البيانات
    } else {
        console.log("Validation failed");
    }
};