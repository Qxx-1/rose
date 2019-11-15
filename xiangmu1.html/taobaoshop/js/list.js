
const getDate = function () {
    return new Promise(function (resolve, reject) {
        AJAX.get("../sever/list.php", {}, function (data) {
            if (!data.error) {
                resolve(data);
                console.log(data);
            } else {
                reject("报错了");

            }
        });
    })
}
async function fun() {
    let data = await getDate();

    var container = document.querySelector(".container");
    let p = new Pagination(container, {
        pageInfo: {
            currentPage: 1,
            totalSize: data.data.length,
            pageSize: 16,
            totalPage: Math.ceil(data.data.length / 16)
        },
        data: data.data
    });
    //获取addcar按钮
    
}
let p = fun();
p.then(function () {
    console.log('执行完毕');
})
    .catch(function (error) {
        console.log(error);
        console.log("报错了");
    })
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

