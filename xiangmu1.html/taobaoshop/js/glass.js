function offset(dom) {
   
    var obj = {
        left: dom.offsetLeft,
        top: dom.offsetTop
    }
    
    var result = window.navigator.userAgent.indexOf("MS IE8");
    
    dom = dom.offsetParent;
   
    while (dom != document.body) {
        console.log(dom.offsetLeft);
        if (result != -1) { // 判定是否是IE 如果是 就不要加边框 
            obj.left += dom.offsetLeft;
            obj.top += dom.offsetTop;
        } else { // 如果不是IE8 就加上边框
            obj.left += dom.offsetLeft + dom.clientLeft;
            obj.top += dom.offsetTop + dom.clientTop;
        }
        dom = dom.offsetParent;
    }
    return obj;
}