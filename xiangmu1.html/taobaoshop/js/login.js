var username=document.getElementById("loginBtn");
var password=document.getElementById("passwordBtn");
var submitBtn=document.getElementById("submitBtn");
var registBtn=document.getElementById("registBtn");
registBtn.onclick=function(){
    location.href="regist.html";
    }
submitBtn.onclick=function(){
AJAX.post("../sever/login.php",{username:username.value,password:password.value},function(data){
    if(data.error){
        var search =window.location.search;
        console.log(search);
        var target=search.split("=")[1];
        console.log(target);
        if(target){
        location.href=decodeURIComponent(target); 
        }else{
            location.href="index.html";
        } 
    
    }else{
       //用户密码不存在，请去注册
       
    }
    
});
}