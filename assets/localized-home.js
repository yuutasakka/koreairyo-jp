(function() {
  function initSlick() {
    if (!window.jQuery || !jQuery.fn.slick) {
      return;
    }

    jQuery('.top-banner-slick').slick({
      autoplay: true,
      dots: true,
      speed: 300,
      infinite: true,
      autoplaySpeed: 4000,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: false
    });

    jQuery('.hero-slick-items').slick({
      autoplay: true,
      dots: true,
      speed: 300,
      infinite: true,
      autoplaySpeed: 4000,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: false
    });
  }

  function initSwipers() {
    if (typeof Swiper === 'undefined') {
      return;
    }

    new Swiper('#main-media-review-real .swiper-container', {
      slidesPerView: 5,
      spaceBetween: 10,
      navigation: {
        nextEl: '#main-media-review-real .swiper-next-btn',
        prevEl: '#main-media-review-real .swiper-prev-btn'
      }
    });

    new Swiper('#media-operation-progress .swiper-container', {
      slidesPerView: 5,
      spaceBetween: 10,
      navigation: {
        nextEl: '#media-operation-progress .swiper-next-btn',
        prevEl: '#media-operation-progress .swiper-prev-btn'
      }
    });

    new Swiper('#main-media-review-model .swiper-container', {
      slidesPerView: 5,
      spaceBetween: 10,
      navigation: {
        nextEl: '#main-media-review-model .swiper-next-btn',
        prevEl: '#main-media-review-model .swiper-prev-btn'
      }
    });

    new Swiper('#main-sisuntv .swiper-container', {
      slidesPerView: 5,
      direction: 'vertical',
      navigation: {
        nextEl: '#main-sisuntv .swiper-next-btn',
        prevEl: '#main-sisuntv .swiper-prev-btn'
      }
    });
  }

  function popupLoginDisplay(show) {
    if (typeof show === 'undefined') {
      document.body.classList.toggle('popup-login-active');
      return;
    }

    if (show) {
      document.body.classList.add('popup-login-active');
    } else {
      document.body.classList.remove('popup-login-active');
    }
  }

  function openVideo(videoId) {
    var popup = document.querySelector('.video-popup');
    var frame = popup ? popup.querySelector('.video-popup__frame') : null;

    if (!popup || !frame || !videoId) {
      return;
    }

    frame.innerHTML = '<iframe src="https://www.youtube.com/embed/' + videoId + '?autoplay=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    popup.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeVideo() {
    var popup = document.querySelector('.video-popup');
    var frame = popup ? popup.querySelector('.video-popup__frame') : null;

    if (frame) {
      frame.innerHTML = '';
    }

    if (popup) {
      popup.classList.remove('is-open');
    }

    document.body.style.overflow = '';
  }

  function initVideoHandlers() {
    document.addEventListener('click', function(event) {
      var openTarget = event.target.closest('[data-video-id]');
      var thumbTarget = event.target.closest('.thumb');
      var previewTarget = event.target.closest('.video_img');
      var modalTarget = event.target.closest('[data-open-login]');
      var closeTarget = event.target.closest('[data-close-video]');
      var popup = event.target.classList.contains('video-popup') ? event.target : null;

      if (closeTarget || popup) {
        closeVideo();
        return;
      }

      if (modalTarget || previewTarget) {
        event.preventDefault();
        popupLoginDisplay(true);
        return;
      }

      if (openTarget && thumbTarget) {
        event.preventDefault();
        openVideo(openTarget.getAttribute('data-video-id'));
      }
    });
  }

  function initTVPreview() {
    document.addEventListener('click', function(event) {
      var item = event.target.closest('#main-sisuntv li[data-video-id]');
      if (!item) {
        return;
      }

      var player = document.querySelector('#main-sisuntv .video-player');
      var videoId = item.getAttribute('data-video-id');
      if (!player || !videoId) {
        return;
      }

      player.innerHTML = '<button class="video_img" type="button" aria-label="Open login modal"><img src="https://i.ytimg.com/vi/' + videoId + '/maxresdefault.jpg" alt="" width="832" height="468" style="object-fit: cover"></button>';
    });
  }

  function initPopupClose() {
    document.addEventListener('click', function(event) {
      if (event.target.closest('[data-close-login]')) {
        popupLoginDisplay(false);
      }

      if (event.target.id === 'popup-login') {
        popupLoginDisplay(false);
      }
    });
  }

  function initQuickMenu() {
    var menu = document.getElementById('quick-menu');
    var topBanner = document.getElementById('top');

    if (!menu || !topBanner) {
      return;
    }

    function sync() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
      var bannerHeight = topBanner.offsetHeight;

      if (scrollTop > bannerHeight) {
        menu.style.top = '0px';
        menu.classList.add('fixed');
      } else {
        menu.style.top = bannerHeight + 'px';
        menu.classList.remove('fixed');
      }
    }

    window.addEventListener('scroll', sync);
    window.addEventListener('load', sync);
    sync();
  }

  function initNavIconHover() {
    var navBarItems = document.querySelectorAll('.nav-bar-item');

    navBarItems.forEach(function(navBarItem) {
      navBarItem.addEventListener('mouseenter', function() {
        var image = navBarItem.querySelector('.nav-icon-img');
        if (!image || image.src.indexOf('.png') === -1 || image.src.indexOf('_hover.png') !== -1) {
          return;
        }

        image.src = image.src.replace('.png', '_hover.png');
      });

      navBarItem.addEventListener('mouseleave', function() {
        var image = navBarItem.querySelector('.nav-icon-img');
        if (!image || image.src.indexOf('_hover.png') === -1) {
          return;
        }

        image.src = image.src.replace('_hover.png', '.png');
      });
    });
  }

  function initConsultForm() {
    document.addEventListener('input', function(event) {
      var target = event.target;
      if (target.matches('input[numberOnly]')) {
        target.value = target.value.replace(/[^0-9]/g, '');
      }
    });

    var consultForm = document.getElementById('onlineconsult');
    if (!consultForm) {
      return;
    }

    consultForm.addEventListener('submit', function(event) {
      var name = consultForm.querySelector('[name="name"]');
      var phone = consultForm.querySelector('[name="phone"]');
      var category = consultForm.querySelector('[name="ca_name"]');
      var privacy = consultForm.querySelector('[name="privacy"]');
      var messages = document.body.dataset.validationMessages;
      var parsed = messages ? JSON.parse(messages) : {};

      if (!name.value.trim()) {
        event.preventDefault();
        alert(parsed.name || 'Please enter your name.');
        name.focus();
        return;
      }

      if (!phone.value.trim()) {
        event.preventDefault();
        alert(parsed.phone || 'Please enter your phone number.');
        phone.focus();
        return;
      }

      if (phone.value !== phone.value.replace(/([^\d])/g, '')) {
        event.preventDefault();
        alert(parsed.phoneFormat || 'Please enter numbers only.');
        phone.focus();
        return;
      }

      if (!category.value) {
        event.preventDefault();
        alert(parsed.category || 'Please select a treatment area.');
        category.focus();
        return;
      }

      if (!privacy.checked) {
        event.preventDefault();
        alert(parsed.privacy || 'Please agree to the privacy policy.');
        privacy.focus();
      }
    });
  }

  window.popupLoginDisplay = popupLoginDisplay;

  document.addEventListener('DOMContentLoaded', function() {
    initSlick();
    initSwipers();
    initVideoHandlers();
    initTVPreview();
    initPopupClose();
    initQuickMenu();
    initNavIconHover();
    initConsultForm();
  });
})();
