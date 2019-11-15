//定义正则
var reg=/\u4e00-\u9fa5/g;
//获取第一个昵称input
var username=document.getElementById("input1");
var email=document.getElementById("input2");
var password_one=document.getElementById("input3");
var password_two=document.getElementById("input4");
var btn =document.querySelector("[type=button]");
console.log(btn);

btn.onclick=function(){
   AJAX.post("../sever/regist.php",{username:username.value,email:email.value,password:password_one.value},function(data){
       
     if(data.error){
         location.href="login.html";
     }
   })
}

