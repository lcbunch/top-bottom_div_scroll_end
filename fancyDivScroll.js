
  var items = $(".box");
  var animating = false;
  var previousScroll = 0;
  var page = $("html, body");

  $(window).scroll(function() {
       clearTimeout($.data(this, 'scrollTimer'));
       if (!animating) {
           $.data(this, 'scrollTimer', setTimeout(function() {
               var currentScroll = $(window).scrollTop(); //used to stop animation at top
               var closest_ele=null;
               var closest_count=99999999;

               items.each(function(key, value) {
                   var cur_count = Math.abs($(value).position().top - $(window).scrollTop());
                   if(cur_count < closest_count) //this statement used for finding top of divs
                   {
                       closest_ele = $(value);
                       closest_count = cur_count;
                   }
                   //following statement run animation
                     if ($(value).position().top > $(window).scrollTop() && currentScroll > 0) {
                         animating = true;
                         var scroller = closest_ele.position().top;
                         $(page).animate( { scrollTop: scroller + 'px' }, 300);
                         setTimeout(function() { animating = false; }, 400);
                         return false;
                     }
                     //stops animation when bottom of page is reached
                     if ((window.innerHeight + $(window).scrollTop()) >= document.body.offsetHeight) {
                         setTimeout(function() { animating = false; }, 400);
                         return false;
                     }
                     //keeps page from animating while scrolling to remove jumpy effect when animations are interrupted
                     $(page).bind('scroll mousedown wheel DOMMouseScroll mousewheel keyup', function(e){
                           if ( e.which > 0 || e.type == "mousedown" || e.type == "mousewheel") {
                                $(page).stop().animate;
                           }
                       });
                     previousScroll = currentScroll;
               });

           }, 100));
       }
   });
