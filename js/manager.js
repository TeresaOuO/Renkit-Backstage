function login() {
    var username = document.getElementById("Login_User");
    var pass = document.getElementById("Login_Pass");
    //console.log(username.value, pass.value)
    if (username.value == "") {
       alert("請輸入使用者名稱");
    } else if (pass.value == "") {
       alert("請輸入密碼");
    } else if (username.value == "admin" && pass.value == "123456") {
       alert("登入成功");
       self.location='../member.html?';
       //window.location = '../index.html'; 
       //無法換頁
    } else {
       alert("請輸入正確的使用者名稱和密碼！")
    }
}