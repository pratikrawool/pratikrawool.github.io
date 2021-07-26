(function($) {
  "use strict";

$(document).ready(function(){  

  $("html").niceScroll({styler:"fb",cursorcolor:"#000"});

  $('.side-menu-open').mouseenter(function(){
    $('.side-menu').animate({'left': '0px'}, 600, 'easeOutCubic');
  });

  $('#side-menu-close').click(function(){
    var sideWidth = $('.side-menu').outerWidth();
    var sideWidthClose = '-' + sideWidth + 'px';
    $('.side-menu').animate({'left': sideWidthClose}, 600, 'easeOutCubic');
    preventDefault();
  });

  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 700, 'easeInOutExpo');
        return false;
      }
    }
  });

  $('[data-spy="scroll"]').each(function () {
    var $spy = $(this).scrollspy('refresh');
  });  

  $('.portfolio-itens').bxSlider({
      slideWidth: 200,
      minSlides: 1,
      maxSlides: 4,
      moveSlides: 1,
      slideMargin: 5,
      auto: false,
      mode: 'horizontal',
      useCSS: false,
      speed: 900,
      infiniteLoop: false,
      hideControlOnEnd: true,
      easing: 'easeOutElastic',
      pager: false,
      prevText: '<i class="fa fa-chevron-left"></i>',
      nextText: '<i class="fa fa-chevron-right"></i>'
  });

  
  $('a.nivobox').nivoLightbox({ effect: 'fade' });

  $('.portfolio-item').hover(function(){
    $(this).find('.hover-bg-wrapper').fadeIn(200);
    $(this).find('.hover').show();  
    $(this).find('p').addClass('animated').addClass('fadeInUp');
  }, function(){
    $(this).find('.hover-bg-wrapper').fadeOut(200);
    $(this).find('.hover').fadeOut(200);
    $(this).find('p').removeClass('fadeInUp');
  });

  $("#contactForm").validate({
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "php/contact-form.php",
        data: {
          "name": $("#contactForm #name").val(),
          "email": $("#contactForm #email").val(),
          "subject": $("#contactForm #subject").val(),
          "message": $("#contactForm #message").val()
        },
        dataType: "json",
        success: function (data) {
          if (data.response == "success") {
            $("#contactSuccess").fadeIn(300);
            $("#contactError").addClass("hidden");

            $("#contactForm #name, #contactForm #email, #contactForm #subject, #contactForm #message")
              .val("")
              .blur()
              .closest(".control-group")
              .removeClass("success")
              .removeClass("error");              
            
          } else {
            $("#contactError").fadeIn(300);
            $("#contactSuccess").addClass("hidden");
          }
        }

      });
    }
  });

  $('.modal-wrap').click(function(){
    $('.modal-wrap').fadeOut(300);
  });      

  $( ".full-height" ).each(function() {
    var $stretch = $(this);
    $stretch.css({ height: $stretch.closest('.line').find('.content-wrap').height() });
  }); 

});

$(window).load(function(){
  $('#page-loader').fadeOut(200, function(){});

  if ($('html').hasClass('safari')) {
      $('#content-body').removeClass('animated');
  }

  $('#content-body').addClass('fadeInUp');

  setTimeout(function () {    
      $( ".full-height" ).each(function() {
        var $stretch = $(this);
        $stretch.css({ height: $stretch.closest('.line').find('.content-wrap').outerHeight() });
      });  
    }, 300
  );
  
  $(window).resize(function(){ 
     $( ".full-height" ).each(function() {
      var $stretch = $(this);
      $stretch.css({ height: $stretch.closest('.line').find('.content-wrap').outerHeight() });
    }); 
  });
});
})(jQuery);