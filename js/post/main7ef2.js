/* ==========================================================================

    Project: TrainerRX
    Author: XHTMLized
    Last updated: Fri Apr 24 2015 15:22:07

   ========================================================================== */

(function($) {

  'use strict';

  var TrainerRx = {

    /**
     * Init Function
     */
    init: function() {
      TrainerRx.videoShow();
      TrainerRx.elementsShow();
      if (!$("html").hasClass("ie8") && !$("html").hasClass("jsie8")) {
        TrainerRx.smoothScroll();
      }
      $(window).on('load resize', function() {
        TrainerRx.equalizeBoxes();
        TrainerRx.valignFix();
      });
      window.addEventListener("orientationchange", function() {
        TrainerRx.equalizeBoxes();
        TrainerRx.valignFix();
      }, false);
      $(window).on('load scroll', function() {
        TrainerRx.headerFixed();
        TrainerRx.linesAnimation();
      });
      TrainerRx.sliderCircle();
      TrainerRx.mobileMenu();
      TrainerRx.overlays();
      TrainerRx.postExpand();
      TrainerRx.teamPageSlider();
    },

    videoShow: function() {
      if ( $('.faq-hero').length != 0 ) {
        var BV = new $.BigVideo({
          useFlashForFirefox: false,
          container: $('.faq-hero')
        });
        BV.init();
        if (Modernizr.touch) {
          BV.show('wp-content/themes/trainerrx/media/bg-faq.jpg');
        } else {
          BV.show([{
            type: "video/mp4",
            src: "wp-content/themes/trainerrx/media/bg-faq-hero.mp4"
          }, {
            type: "video/webm",
            src: "wp-content/themes/trainerrx/media/bg-faq-hero.webm"
          }, {
            type: "video/ogg",
            src: "wp-content/themes/trainerrx/media/bg-faq-hero.ogv"
          }]);
        }
      } else if ( $('.pressrelease-hero').length != 0 ) {
        var BV = new $.BigVideo({
          useFlashForFirefox: false,
          container: $('.pressrelease-hero')
        });
        BV.init();
        if (Modernizr.touch) {
          BV.show('wp-content/themes/trainerrx/media/bg-pressrelease.jpg');
        } else {
          BV.show([{
            type: "video/mp4",
            src: "wp-content/themes/trainerrx/media/bg-pressrelease-hero.mp4"
          }, {
            type: "video/webm",
            src: "wp-content/themes/trainerrx/media/bg-pressrelease-hero.webm"
          }, {
            type: "video/ogg",
            src: "wp-content/themes/trainerrx/media/bg-pressreleasepressrelease-hero.ogv"
          }]);
        }
      } else if ( $('.main-hero').length != 0 ) {
        var BV = new $.BigVideo({
          useFlashForFirefox: false,
          container: $('.main-hero')
        });
        BV.init();
        if (Modernizr.touch) {
          BV.show('wp-content/themes/trainerrx/media/bg-section1.jpg');
        } else {
          BV.show([{
            type: "video/mp4",
            src: "wp-content/themes/trainerrx/media/bg-main-hero.mp4"
          }, {
            type: "video/webm",
            src: "wp-content/themes/trainerrx/media/bg-main-hero.webm"
          }, {
            type: "video/ogg",
            src: "wp-content/themes/trainerrx/media/bg-main-hero.ogv"
          }]);
        }
      }
    },

    /**
     * About Section Animation Coming Soon
     */
    elementsShow: function() {
      if ( $('.about-section').length != 0 ) {
        $('.about-item, .who-we-help-item').addClass('hidden');
        $(window).on('scroll resize load', function() {
          var aboutTop = $('.about-section').offset().top,
            aboutFromTop = aboutTop - $(window).scrollTop(),
            whohelpFromTop = $('.who-we-help').offset().top - $(window).scrollTop(),
            offsetFire = 400;

          if (aboutFromTop < offsetFire) {
            $('.about-item').each(function(i) {
              var $this = $(this);
              setTimeout(function() {
                $this.removeClass('hidden').addClass('visible');
              }, i * 250);
            });
          }

          if (whohelpFromTop < offsetFire) {
            $('.who-we-help-item').each(function(i) {
              var $this = $(this);
              setTimeout(function() {
                $this.removeClass('hidden').addClass('visible');
              }, i * 250);
            });
          }
        });
      }
    },

    /**
     * Smooth Scroll
     */
    smoothScroll: function() {
      $("html").niceScroll({
        cursorwidth: 8,
        mousescrollstep: 22,
        cursorcolor: "#1e2529",
        zindex: '99999'
      });

      $('.btn-scrolldown').on('click', function(e) {
        e.preventDefault();
        var target = $('.content'),
          elementoffset = target.offset().top - 60;
        $('html, body').stop().animate({
          scrollTop: elementoffset
        }, 800);
      });
    },

    equalizeBoxes: function() {
      var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        $aboutItem = $('.about-item'),
        startHeight;
      if (windowWidth > 960) {
        startHeight = 0;
        $aboutItem.removeAttr('style');
        $aboutItem.each(function() {
          var $this = $(this),
            aboutBoxHeight = $this.outerHeight();
          if (startHeight < aboutBoxHeight) {
            startHeight = aboutBoxHeight;
          }
        });
        $aboutItem.css('min-height', startHeight);
      } else {
        startHeight = 0;
        $aboutItem.removeAttr('style');
      }
    },

    valignFix: function() {
      setTimeout(function() {
        var csContentH = $('.coming-soon-content').outerHeight();
        $('.coming-soon-hero').css('min-height', csContentH + 180);
      }, 150);
    },

    headerFixed: function() {
      var st = $(window).scrollTop();
      if (st > 30) {
        if (!$('.header').hasClass('fixed')) {
          $('.header').addClass('fixed');
        }
      } else {
        $('.header').removeClass('fixed');
      }

      if (st < 1 && $('.header').hasClass('open')) {

      }
    },

    sliderCircle: function() {
      var pctValue = $('.slider-circle').attr('data-pct');

      function changeCircle(percent) {
        var $circle = $('.slider-circle-svg .main-circle'),
          r = $circle.attr('r'),
          c = Math.PI * (r * 2),
          val = percent,
          $sliderCircle = $('.slider-circle');

        if (val < 0) {
          val = 0;
        }

        if (val > 100) {
          val = 100;
        }

        if (val > 0) {
          $sliderCircle.css({
            visibility: 'visible',
            opacity: '1'
          });
        } else {
          $sliderCircle.css({
            visibility: 'hidden',
            opacity: '0'
          });
        }

        var pct = ((100 - val) / 100) * c;
        $circle.css({
          strokeDashoffset: pct
        });
      }

      function changeCircleMobile(percent) {
        var $circle = $('.slider-circle-mobile .slider-circle-svg .main-circle'),
          r = $circle.attr('r'),
          c = Math.PI * (r * 2),
          val = percent,
          $sliderCircle = $('.slider-circle-mobile');

        if (val < 0) {
          val = 0;
        }

        if (val > 100) {
          val = 100;
        }

        if (val > 0) {
          $sliderCircle.css({
            visibility: 'visible',
            opacity: '1'
          });
        } else {
          $sliderCircle.css({
            visibility: 'hidden',
            opacity: '0'
          });
        }

        var pct = ((100 - val) / 100) * c;
        $circle.css({
          strokeDashoffset: pct
        });
      }

      changeCircle(pctValue);
      changeCircleMobile(pctValue);

      var slider = $('.bxslider');

      slider.bxSlider({
        pager: false,
        controls: false,
        adaptiveHeight: true,
        onSlideBefore: function($slideElement, oldIndex, newIndex) {
          if (newIndex == 0) {
            $('.slider-circle').css({
              visibility: 'hidden',
              opacity: '0'
            });
          }
        },
        onSlideAfter: function($slideElement, oldIndex, newIndex) {
          var slideQty = slider.getSlideCount() - 1,
            newPercent = newIndex * (100 / slideQty);
          changeCircle(newPercent);
          changeCircleMobile(newPercent);
        }
      });

      $('.btn-startslideshow, .btn-nextslide').on('click', function(e) {
        e.preventDefault();
        slider.goToNextSlide();
        var sliderOffset = $('.slideshow-section').offset().top;
        $('html, body').stop().animate({
          scrollTop: sliderOffset
        }, 500);
      });
    },

    // employee slider
    teamPageSlider: function() {
      $('.btn-meet-the-team').on('click', function(e){
        e.preventDefault();
        $( ".who-we-are-hero" ).fadeOut( "fast", function() {
          $('.meet-the-team-content').show();
        });
      })
      $('.btn-hideteampage').on('click', function(e) {
        e.preventDefault();
        $( ".meet-the-team-content" ).fadeOut( "fast", function() {
          $('.who-we-are-hero').show();
        });
      });
    },

    /**
     * Mobile Menu
     */
    mobileMenu: function() {
      $('.btn-menu').on('click', function(e) {
        var $this = $(this);
        e.preventDefault();
        $this.toggleClass('open').next().toggleClass('open').parents('.header').toggleClass('open');
      });

      $('.navigation a[href^="#"], .additional-nav a[href^="#"]').not('.btn-trialaction, .btn-contactaction').on('click', function(e) {
        e.preventDefault();
        if ($('header').hasClass('open')) {
          $('.btn-menu').click();
        }
        var target = $(this).attr('title'),
          elementoffset = $('.' + target + ':visible:first').offset().top - 60;
        $('html, body').stop().animate({
          scrollTop: elementoffset
        }, 1000);
      });
    },

    linesAnimation: function() {
      $('.line-top').parent().addClass('is-visible');
      $('.unvisible').each(function() {
        var $this = $(this),
          thisFromTop = $this.offset().top - $(window).scrollTop(),
          offsetTrigger = 500;
        if (thisFromTop < offsetTrigger || thisFromTop <= 0) {
          $this.removeClass('unvisible').addClass('is-visible');
        }
      });
    },

    overlays: function() {
      window.rebindWistiaFancyBoxes();

      $('.btn-requesttrial, .btn-trialaction').on('click', function(e) {
        e.preventDefault();
        $('.request-trial-overlay').addClass('open');
      });
      $('.btn-contactus, .btn-contactaction').on('click', function(e) {
        e.preventDefault();
        $('.contactus-overlay').addClass('open');
      });
      $('.btn-closeoverlay').on('click', function(e) {
        e.preventDefault();
        $(this).parent().removeClass('open');
      });

      $(".btn-video").colorbox({
        iframe: true,
        innerWidth: '40%',
        innerHeight: '30%'
      });

      $.colorbox.settings.onLoad = function() {
        colorboxResize();
      }

      var colorboxResize = function(resize) {
        var width = "90%",
          height = "90%";

        if ($(window).width() > 960) {
          width = "860"
        }
        if ($(window).height() > 700) {
          height = "630"
        }

        $.colorbox.settings.height = height;
        $.colorbox.settings.width = width;

        if (resize) {
          $.colorbox.resize({
            'height': height,
            'width': width
          });
        }
      }

      //In case of window being resized
      $(window).resize(function() {
        colorboxResize(true);
      });
    },

    postExpand: function() {
      $('.pressrelease-title').on('click', function(e) {
        e.preventDefault();
        $('.pressrelease-title').not(this).next().hide(400);
        $(this).next().toggle(400);
      });
    }
  };

  $(function() {
    TrainerRx.init();
  });

})(jQuery);
