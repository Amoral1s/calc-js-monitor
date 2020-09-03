$(document).ready(function () {
  //Всплывающее меню
  jQuery('.header-wrap-menu ul li.menu-item-has-children').hover(function(){
    jQuery(this).children('ul').slideDown(100);
  }, function(){
    jQuery(this).children('ul').slideUp(100);
  });
});