$(function(){

	//Слайдер клиенты
	$("#sn-clients-carousel").owlCarousel({
		pagination : false,
		navigation : true,
		navigationText : ["", ""]
	});

	//Видео проигрыватель
	var video = {
		initialize : function () {			
			this.setUpListeners();
		},
 
		setUpListeners: function () {
			$('.video').on('click', video.videoPlay);
		},

		videoPlay : function () {
			var video = $(this),
				videoWidth = video.find("img").width(),
				videoHeight = video.find("img").height(),
				videoContent = video.find("img").attr("title");

			video.html('<iframe width="' + videoWidth + '" height="' + videoHeight + '" src="' + videoContent + 
				'" autoplay="1" frameborder="0" allowfullscreen></iframe>');
		}
	}
	video.initialize();

	//Плавная прокрутка
	var slowScroll = {
		initialize : function () {			
			this.setUpListeners();
		},
 
		setUpListeners: function () {
			$('a.button').on('click', slowScroll.scroll);
			$('a.back-to-top').on('click', slowScroll.scroll);
		},

		scroll: function (e) {
			event.preventDefault();
      var id  = $(this).attr('href'),
      top = $(id).offset().top;
      $('body,html').animate({scrollTop: top}, 1000);
		}
	}
	slowScroll.initialize();

	$(".toggle-mnu").click(function() {
 		$(this).toggleClass("on");
 		$(".mobile-nav").slideToggle();
  	return false;
	});

	$('.image-popup').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		}
	});

	//Меню второго уровня
	var leftMenu = {
		initialize : function () {			
			this.setUpListeners();
		},
 
		setUpListeners: function () {
			var id = $('#content section.content').attr("id");
			$(".left-menu ul > li > a").filter("." + id).parent("li").addClass("active");
			$("ul.nav ul.sub-menu > li > a").filter("." + id).parent("li").addClass("active");
		}

	}
	leftMenu.initialize();

});

//Яндекс Метрика
<!-- Yandex.Metrika counter --> <script type="text/javascript"> (function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter24122596 = new Ya.Metrika({ id:24122596, clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = "https://mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks"); </script> <noscript><div><img src="https://mc.yandex.ru/watch/24122596" style="position:absolute; left:-9999px;" alt="" /></div></noscript> <!-- /Yandex.Metrika counter -->