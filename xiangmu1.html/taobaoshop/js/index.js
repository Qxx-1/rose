var left = document.getElementsByClassName("leftButton")[0];
var right = document.getElementsByClassName("rightButton")[0];
var ulObj = document.querySelector(".bannerImg");
var showObj = document.querySelector(".show-l");
var box = showObj.getElementsByClassName("box")[0];
console.log(left);
var width = box.clientWidth;
console.log(width);
var count = 0;
//复制一个第一张图片解决缝隙对接
var liObj = ulObj.children[0];
ulObj.append(liObj.cloneNode(true));
//设置流氓锁，防止多次连续多次点击
var lock = true;
function f1() {
   
    if (lock === false) {
        return;
    }

    count++;
    //上锁
    lock = false;

    run(ulObj, { left: -(width * count) }, 800, function () {
        if (count === (ulObj.children.length - 1)) {
            count = 0;
            ulObj.style.left = 0;

        }
        getColor();
        //执行完毕解锁
        lock = true;

    })

}

//给右按虐设置事件
right.onclick = f1;


//给左按钮设置事件
left.onclick = function () {
    if (lock === false) {
        return;
    }
    count--;
    lock = false;
    if (count < 0) {
        count = (ulObj.children.length) - 1;
        ulObj.style.left = -width * count + "px";
        count--;
    }
    run(ulObj, { left: -(width * count) }, 800, function () {
        //解锁
        lock = true;
        getColor();
    });


}
//获取dl,为每一个添加点击事件
var dlObj = document.getElementsByTagName("dl")[0];
var ddObj = dlObj.children;
for (let i = 0; i < ddObj.length; i++) {
    ddObj[i].onclick = function () {
        if (lock === false) {
            return;
        }
        count = i;
        lock = false;
        run(ulObj, { left: -(width * count) }, 800, function () {
            getColor();
            lock = true;
        });

    }
}
 clearInterval(time);
 var time = setInterval(f1, 2000); 
    box.onmouseover=function(){
         clearInterval(time);
     }
     box.onmouseout=function(){
         time=setInterval(f1,2000);
     };

function getColor() {
    for (var j = 0; j < ddObj.length; j++) {
        ddObj[j].className = "";
    }
    ddObj[count].className = "ddBg";
   
}
//渲染用户名和退出用户名
var user =document.getElementsByClassName("user")[0];
var carCount=document.getElementsByClassName("carCount")[0];
var headImg=document.getElementsByClassName("show-r-t")[0];
//var logout =document.getElementsByClassName("logout")[0]
console.log(user);
var cookie= decodeURIComponent(getCookie("groble"));
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
    headImg.innerHTML=`
                <img src="../images/headImg.jpg" alt="">
                    <h4><i>Hi!</i><span>${cookie+",您好!"}</span></h4>
                    <p><i>领淘金币抵钱</i><span>或去</span><i>会员俱乐部</i></p>
                    <ul>
                        <li><a href="">会员</a></li>
                        <li><a href="shopcar.html">购物车</a></li>
                        <li><a href="">物流信息</a></li>
                    </ul>`;
    
}else{
    console.log("没有东西阿");
    user.innerHTML="亲，请登录";
    carCount.innerHTML=0;
    headImg.innerHTML=`
    <img src="../images/bg10.png" alt="">
        <h4><i>Hi!</i><span>你好</span></h4>
        <p><i>还没登陆</i><span>快去</span><i>登陆吧享受更多权益</i></p>
        <ul>
            <li><a href="regist.html">注册</a></li>
            <li><a href="login.html">登陆</a></li>
            <li><a href="">开启</a></li>
        </ul>`;
}

//给输入框添加提示事件
function my$(id){
    return document.getElementById(id);
}
var arr=["小米手机","衣服潮流","衣服韩版修身","衣服短裙公主裙","手机壳","手机苹果","手机壳苹果X","手机iPhone X","手机iPhone 6s","小米","衣服超短裙","衣服外套韩版休闲","衣服风衣潮流耐克休闲装"];
console.log(my$("tet"));
my$('tet').onkeyup =function(){
    var tempArr=[];
    for(var i=0;i<arr.length;i++){
        if(arr[i].indexOf(this.value)==0){
            tempArr.push(arr[i]);
        }
    }

    if(this.value.length==0||tempArr.length==0){
        if(my$("dv")){
        my$("inpt").removeChild(my$("dv"));
    /* var oP =document.createElement("p");
        oP.innerHTML="最近搜过";
        oDiv.appendChild(oP);
        oP.margin="0";
        oP.padding="0";
        oP.paddingTop="10px";
        oP.style.cursor="pointer";*/
         }
         return;
    }
    var oDiv =document.createElement("div");
    my$("inpt").appendChild(oDiv);
    oDiv.style.width="520px";
    oDiv.id="dv";
    oDiv.style.backgroundColor="#fff";
    oDiv.style.position="absolute";
    oDiv.style.top="40px";
    oDiv.style.zIndex="11";
    oDiv.style.border="1px solid gray";
    for(var j=0;j<tempArr.length;j++){
        var oP =document.createElement("p");
        oP.innerHTML=tempArr[j];
        oDiv.appendChild(oP);
        open.width="50px";
        oP.margin="0";
        oP.padding="0";
        oP.paddingTop="10px";
        oP.style.cursor="pointer";
        oP.onmouseover= function (){
            this.style.backgroundColor="gray";
        }
        oP.onmouseout=function(){
            this.style.backgroundColor="";
        }
        oP.onclick=function(){
            window.location.href="list.html";
        }
    }

 }
    //选项卡
    var listDd = document.querySelectorAll(".listNews dd");
    var listCont = document.querySelectorAll(".goodList");
    console.log(listDd);
    console.log(listCont);
    //为每一个添加鼠标进入事件
    for (let i = 0; i < listDd.length; i++) {
        listDd[i].ind = i;
        listDd[i].onmouseover = function () {
            this.style.backgroundColor="pink";
            
            for (var i = 0; i < listCont.length; i++) {
                if (i === this.ind) {
                    listCont[i].className = "goodList active";
                } else {
                    listCont[i].className = "goodList";
                }
            }
        }
        //鼠标进入离开事件
        listDd[i].onmouseout = function () {
            console.log(3333333333);
            this.style.backgroundColor="";
          
           listCont[i].className="goodList";
        }
    }
    //
    for(var i=0;listCont.length;i++){
        listCont[i].onmouseover=function(){
           this.className= "goodList active";
           console.log("wofjlajl");
        }
        listCont[i].onmouseout=function(){
           this.className="goodList";
        }
    }

