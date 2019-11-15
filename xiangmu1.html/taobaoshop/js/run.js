function run(ele,target,time,callback){
    //获取该元素的属性
    //获取该运动对象的起点
    //获取初始值 储存到json中
    var JSON={};
    for(var i in target){
      if(window.getComputedStyle){
          JSON[i]=parseInt(getComputedStyle(ele)[i]);
      }
    }
    var instanceJSON={};
    for(var i in target){
        instanceJSON[i]=target[i]-JSON[i];
       
    }
   /* var start=0;
    if(window.getComputedStyle){
        start= parseInt(getComputedStyle(ele)[attr]);
    }else{
       start= parseInt(currentStyle(ele)[attr]);
    }
    console.log(start);*/
    var interval =20;
   
    var allCount =time/interval;
    //定义步长
  
    var count=0;
   clearInterval(timeId);
   var timeId =  setInterval(function(){
        count++;
       // ele.style[attr]=start + temp*count+ "px";
       //遍历每一个对象属性改变属性的值,加上每次变化的的
    for(var i in target){
        if(i.toLocaleLowerCase()==="opacity"){
            ele.style[i]=JSON[i]+count*instanceJSON[i]/allCount
        }
        ele.style[i]=JSON[i]+count*instanceJSON[i]/allCount+"px";
       
    }
        if(count>=allCount){
            clearInterval(timeId);
           for(var i in target){
               ele.style[i]=target[i]+"px";
             
           }
            callback &&callback();
        }
    },interval)

}