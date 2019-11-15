var search=window.location.search;
var id=search.split("=")[1];
var protect=null;
//渲染用户名
var user =document.getElementsByClassName("user")[0];
var carCount=document.getElementsByClassName("carCount")[0];
console.log(user);
var cookie=decodeURIComponent(getCookie("groble"));
console.log(cookie);
if(cookie!="undefined"){
    user.innerHTML=cookie+",您好!";
    user.style.fontSize="15px";
    var listCar = JSON.parse(localStorage.getItem("listCar"));
    var len =listCar.length;
    carCount.innerHTML=len;
    user.onclick=function(e){
        e.preventDefault();
        }
}else{
    user.innerHTML="亲，请登录";
    carCount.innerHTML=0;
}
//发送ajax像后台获取该数据
AJAX.get("../sever/detail.php",{id:id},function(data){
     protect=data.data;
    if(data.error){
        var row =document.getElementById("detail");
        row.innerHTML="";
        row.innerHTML=`
     <div class="media">
        <div class="media-left">
            <a href="#" class="aObj">
                <img class="media-object"
                    src="${data.data.goods_small_logo}"
                    alt="...">
            </a>
            <div class="moveBox"></div>
            <div class="mask"></div>
        </div>
        
        <div class="media-body">
            <h4 class="media-heading">${data.data.goods_name}</h4>
            <div class="prise">
                <i class="glyphicon glyphicon-jpy"></i>
                <span class="">${data.data.goods_price}</span>
            </div>
            <div class="btn-group" role="group" aria-label="...">
                <button type="button" class="btn btn-default">L</button>
                <button type="button" class="btn btn-default">XL</button>
                <button type="button" class="btn btn-default">XXL</button>
                <button type="button" class="btn btn-default">XXXL</button>
            </div>
            <div class="btn-btn">
                <button class="btn btn-danger" name="addcar">加入购物车</button>
                <button class="btn btn-warning" name="nowbuy" >立即购买</button>
            </div>
        </div>
        <div id="bigBox" class="bigBox"></div>
    </div>`;
    var box = document.querySelector(".media-left");
        var movable = document.querySelector(".moveBox");
        var bigBox = document.getElementById("bigBox");
        var aObj=document.getElementsByClassName("aObj")[0];
        
        console.log(box.clientWidth, movable.clientWidth)
        // 定义比例
        // 获取box到页面左边的距离
        var boxPageLeft = offset(box).left;
        // 获取box到页面顶部的距离
        var boxPageTop = offset(box).top;
        // 给box添加鼠标进入事件
        box.onmouseenter = function() {
            // 出现镜片 
            movable.style.display = "block";
            
            // 出现右侧的放大镜
            bigBox.style.display = "block";
            bigBox.style.backgroundImage="url("+data.data.goods_big_logo+")"
            var r =  movable.clientWidth / aObj.clientWidth;
            console.log(movable.clientWidth);
        
            // 添加鼠标移动事件
            box.onmousemove = function(e) {
                var clientX = e.pageX - boxPageLeft;
                var clientY = e.pageY - boxPageTop;
              
                // 将镜片设置left top值
                var left = clientX - movable.clientWidth / 2;
                var top = clientY - movable.clientHeight / 2;
                if (left < 0) {
                    left = 0;
                } else if (left > box.clientWidth - movable.clientWidth) {
                    left = box.clientWidth - movable.clientWidth;
                } 
                if (top < 0) {
                    top = 0;
                } else if (top > box.clientHeight - movable.clientHeight) {
                    top = box.clientHeight - movable.clientHeight;
                }
                movable.style.left = left + "px";
                movable.style.top = top + "px";

                bigBox.style.backgroundPositionX = - left / r + "px";
                bigBox.style.backgroundPositionY = - top / r + "px";
            }


        }
        box.onmouseleave = function() {
            // 出现镜片 
            movable.style.display = "none";
            // 出现右侧的放大镜
            bigBox.style.display = "none";
        }
    var content=document.querySelector(".tab-content");
    content.innerHTML="";
    content.innerHTML=` <div role="tabpanel" class="tab-pane active" id="">${data.data.goods_introduce}</div>
    <div role="tabpanel" class="tab-pane" id="">参数</div>
    <div role="tabpanel" class="tab-pane" id="">...</div>`;
    //因为按钮i是渲染出来的，所以使用委托模式给加入购物车，立即购买添加事件
    row.onclick=function(e){
        var e = e||window.event;
        var target =e.target;
        if(target.name==="addcar"){
            //获取cookie验证，
            console.log("我被点了");
            var cookie =getCookie("groble");
            if(cookie){
                console.log("登陆过来");
                //添加入购物车，不跳转到购物车
               var listCar =JSON.parse(localStorage.getItem("listCar"))||[];
               //判断listcar里里面有没有内容
               if(!listCar.length){
                   protect.cart_number=1;
                  listCar.push(protect);
                  localStorage.setItem("listCar",JSON.stringify(listCar));
               }else{
                   //判断是不是当前产品
                   var good =listCar.find(function(item){
                       return item.goods_id===protect.goods_id;
                   })
                   if(good){
                       console.log("加了");
                       console.log(protect.cart_number);
                       good.cart_number++;
                   }else{
                       protect.cart_number=1;
                       listCar.push(protect);
                   }
                   //将修改的localStorage重新放回本地
                   console.log(protect);
                   console.log(good);
                   localStorage.setItem("listCar",JSON.stringify(listCar));
                   //重新渲染购物车数量在页面显示
                   var listCar = JSON.parse(localStorage.getItem("listCar"));
                   var len =listCar.length;
                   carCount.innerHTML=len;
                  // console.log(JSON.stringify(listCar));
               }
                
            }else{
                console.log("没有登陆");
                 //跳转到登陆页面
                 location.href="./login.html?target="+encodeURIComponent(location.href);
                 //location.href="login.html";
            }
        }
        if(target.name==="nowbuy"){
            var cookie =getCookie("groble");
            if(cookie){
                location.href="shopcar.html";
            }else{
                console.log("没有登陆");
                location.href="./login.html?target="+encodeURIComponent("./shopcar.html");
            }
        }
    }
    }
});
