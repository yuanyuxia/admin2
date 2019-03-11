export default {
  delCookie: function (name) {    //删除一个cookie
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=this.getCookie(name);
    if(cval!=null){
      document.cookie= name + "="+cval+";expires="+exp.toUTCString();
    }
  },
  //获取cookie
  getCookie:function (cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
    }
    return "";
  }
}
