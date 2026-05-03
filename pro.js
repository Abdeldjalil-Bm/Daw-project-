// Java Script of : MemberShip (Member)

/*
    Note:
    css of js_error --> is for input
    css of error --> is for text to be displayed
*/

//Full Name
    let input = document.getElementById("name");
    const name_er = document.getElementById("name_error");
    const submit = document.getElementById("register");

    function name_validation(){
        const Name = document.getElementById("name").value ;
        let reg = /^[A-Za-z\s]+$/;        
        if(Name === ""){    
            showError("Please enter your name");
            return false ;
        }
        else 
            if(!reg.test(Name)){
                showError("This symbols is not allowed") ;
                return false;
            }else
                if(Name.length <= 3){
                    showError("Your name is short (minimum 4 characters)");
                    return false ;
                }
                else{
                    successful();
                    return true ;
                }
    }
    function showError(message){
        name_er.textContent = message ;
        name_er.className= "error";
        input.className = "js_error";
        shake(input);
    }
    function successful(){
        input.className = "js_success";
        name_er.textContent = "";
    }


    //Email
    let Email= document.getElementById("email");
    let email_er = document.getElementById("email_error");
    function email_validation(){
        const email = document.getElementById("email").value;
        const regx=/^[^\s@]+@[^\s@]+.[^\s@]+$/;
        if( !regx.test(email) ){
            Cout("It must be : Example@gmail.com");
            return false ;
        }else
        {
            success();
            return true ;
        }
    }
    function Cout(message){
        email_er.textContent = message;
        email_er.className ="error";
        Email.className="js_error";
        shake(Email);
    }
    function success(){
        Email.className="js_success" ;
        email_er.textContent = "";
    }


//Phone
    const phone_input = document.getElementById("phone") ;
    const phone_error_span = document.getElementById("phone_error") ;
    
    function phone_validation() {
        const phone = phone_input.value;
        let onlyNumbers = /^[0-9]+$/;
        if (!onlyNumbers.test(phone)) {
            phone_error("You must enter only numbers");
            return false;
        }
        if (phone.length < 8) {
            phone_error("Your Phone Number is less than 8");
            return false;
        } 
        if (phone.length > 15) {
            phone_error("Your Phone Number is bigger than 15");
            return false;
        }
        phone_succ();
        return true;
    }
    const phone_succ = () =>{
        phone_input.className = "js_success";
        phone_error_span.textContent = "";
    }
    const phone_error = (message) =>{
        phone_input.className = "js_error" ;
        phone_error_span.textContent = message;
        phone_error_span.className = "error";
        shake(phone_input);
    }


//Date Of Birth
    const birth_error = document.getElementById("dob");
    const birth_er = document.getElementById("dobirth_error");
    function DOB_validation(){
        const input_date = new Date(birth_error.value);
        const current_date = new Date();
        let age = current_date.getFullYear() - input_date.getFullYear() ;
        const age_month = current_date.getMonth() - input_date.getMonth() ;
        if(!birth_error.value){
            dob_error("Please enter your date of birth !");
            return false ;
        }
        if( age_month < 0 || ( age_month ===0 && current_date.getDate() < input_date.getDate() ) ){
            age--;
        }
        if(age<16){
            dob_error("Your Age < 16 years old");
            return false;
        }else
        {
            dob_succ();
            return true;
        }
    }
    const dob_error = message =>{
        birth_er.textContent = message ;
        birth_er.className = "error" ;
        birth_error.className = "js_error";
        shake(birth_error);
    }
    const dob_succ =() =>{
        birth_error.className = "js_success" ;
        birth_er.textContent = " ";
    }

    //Gender
    const radio_output = document.getElementById("radio_output");
    function gender_validation(){
        //Link of auerySelector : https://chatgpt.com/share/69f3c695-eab4-83ea-8179-b5960f7e0295
        /* قمنا باستخدام 
        document.querySelector
        لانه لدينا عدة Gender وليس واحد فقط
        */
        const gender = document.querySelector('input[name="gender"]:checked') ;
        if(!gender){
            gender_error("Please select are Male or female");
            return false
        }
        else
        {
            gender_succ();
            return true ;
        }
    }
    const gender_error = message =>{
        radio_output.textContent = message ;
        radio_output.className = "error";
    }
    const gender_succ = () =>{
        radio_output.textContent = " " ;
    }

    //Plan
    const plan_output = document.getElementById("plan_output");
    plan_validation = () =>{
        const plan = document.querySelector('input[name="plan"]:checked');
        if(!plan){
            plan_error("Please select a Plan");
            return false ;
        }else
        {
            plan_succ();
            return true ;
        }
    }
    const plan_error = message => {
        plan_output.textContent = message ;
        plan_output.className="error";
    }
    const plan_succ = () =>{
        plan_output.textContent = " " ;
    }

    //payment_terms
    const terms_error = document.getElementById("terms_output");
    const terms = document.getElementById("payment_terms");
    function payment_validation(){
        if(!terms.checked){
            payment_error("You must agree to the terms");
            return false ;
        }
        else{
            payment_succ();
            return true ;
        }
    }
    function payment_error(message){
        terms_error.textContent=message;
        terms_error.classList.add("error");
        terms.classList.add("error-checkbox");
    }
    function payment_succ(){

    }
//عملنا هاد الدالة عشان ما يعمل ريفريش للصفحة و استدعاء الدوال
    /*submit.onclick = function(e){//we can write : submit.onclick = e => {...}
    e.preventDefault(); //هاد سطر هو الي ميخلي الصفحة تعمل رفريش
    name_validation();
    email_validation();
    phone_validation();
    DOB_validation();
}*/



submit.onclick = function (e) {
    e.preventDefault();
    const register_submit = document.getElementById("succ_register");
    const isNameValid = name_validation();
    const isEmailValid = email_validation();
    const isPhoneValid = phone_validation();
    const isDOBValid = DOB_validation();
    const isgender = gender_validation();
    const isplan = plan_validation();
    const ispay = payment_validation();
    if ( ispay && isplan && isgender && isNameValid && isEmailValid && isPhoneValid && isDOBValid) {
        register_submit.textContent = "Successfull";
        register_submit.style.color = "rgb(0, 255, 60)"; 
        register_submit.style.marginTop = "20px";
        register_submit.style.fontSize = "20px";
    } else{
        register_submit.textContent = " ";
    }
};


/*function shake(element) {
    // 1. نحذف الكلاس فوراً في حال كان موجوداً من ضغطة سابقة
    element.classList.remove("shake"); 
    
    // 2. سطر سحري (Reflow) يجبر المتصفح على ملاحظة أننا حذفنا الكلاس
    void element.offsetWidth; 
    
    // 3. نعيد إضافة الكلاس لتشغيل الأنيميشن من جديد
    element.classList.add("js_error");
}*/

