(function($){

	$(window).on('load', function(){
		$('.fade-in').css({ position: 'relative', opacity: 0, top: -14 });
		setTimeout(function(){
			$('#preload-content').fadeOut(400, function(){
				$('#preload').fadeOut(800);
				setTimeout(function(){
					$('.fade-in').each(function(index) {
						$(this).delay(400*index).animate({ top : 0, opacity: 1 }, 800);
					});
				}, 800);
			});
		}, 400);
	});

	$(document).ready( function(){
		
		// Add background slideshow
		$.backstretch([
			'images/bg1.jpg',
			'images/bg2.jpg',
			'images/bg3.jpg'
		], {
			fade: 750,
			duration: 4000
		});

		// Invoke the Placeholder plugin
		$('input, textarea').placeholder();

		// Validate newsletter form
		$('<div class="loading"><span class="bounce1"></span><span class="bounce2"></span><span class="bounce3"></span></div>').hide().appendTo('.form-wrap');
		$('<div class="success"></div>').hide().appendTo('.form-wrap');
		$('#newsletter-form').validate({
			rules: {
				newsletter_email: { required: true, email: true }
			},
			messages: {
				newsletter_email: {
					required: 'E-Posta adresi gereklidir!',
					email: 'Geçersiz e-posta adresi!'
				}
			},
			errorElement: 'span',
			errorPlacement: function(error, element){
				error.appendTo(element.parent());
			},
			submitHandler: function(form){
				$(form).hide();
				$('#newsletter .loading').css({ opacity: 0 }).show().animate({ opacity: 1 });
				$.post($(form).attr('action'), $(form).serialize(), function(data){
					$('#newsletter .loading').animate({opacity: 0}, function(){
						$(this).hide();
						$('#newsletter .success').show().html('<p>Tekrar açıldığımızda size haber vereceğiz. Kaydolduğunuz için teşekkürler!</p>').animate({opacity: 1});
					});
				});
				return false;
			}
		});

		// Open modal window on click
		$('#modal-open').on('click', function(e) {
			var mainInner = $('#main .inner'),
				modal = $('#modal');

			mainInner.animate({ opacity: 0 }, 400, function(){
				$('html,body').scrollTop(0);
				modal.addClass('modal-active').fadeIn(400);
			});
			e.preventDefault();

			$('#modal-close').on('click', function(e) {
				modal.removeClass('modal-active').fadeOut(400, function(){
					mainInner.animate({ opacity: 1 }, 400);
				});
				e.preventDefault();
			});
		});

	});
	
})(jQuery);