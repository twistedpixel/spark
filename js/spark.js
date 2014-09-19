$(document).ready(function () {
	
	// Toggle menu on mobile devices
	$(document).on('click', 'a.nav-link', function() {
		
		nav = $(this).parents('nav')
		selector = $(this).siblings('ul')
				
		if(nav.hasClass('open')) {
			selector.removeAttr('style')
			nav.removeClass('open')
		}
		else {
			selector.css({"height": selector[0].scrollHeight})
			nav.addClass('open')
		}
	})
	
	
	// Accessibility functionality for navigation menu dropdowns
	$("nav.bar li.drop ul.inner li").on('focus', 'a', function() {
		
		$(this).parents('li.drop').addClass('dropped')
		$(this).parent().addClass('hover')
		
	}).on('blur', 'a', function() {
		
		$(this).parents('li.drop').removeClass('dropped')
		$(this).parent().removeClass('hover')
		
	})
	
	
	// Automatically compensate spacing for sticky nav
	$("nav.bar.sticky").wrap(function() {
		return $('<div>', {'class':'stickybump', 'height':$(this).outerHeight()})
	})
	
	
	// Close button for alerts
	$('.alert .alert-close').on('click', function() {
		$(this).parent().remove();
		return false;
	})
	
	
	// Modal open trigger
	$('.modal-trigger:not(.modal-static)').on('click', function() {
		modal = $('#' + $(this).data('modal-trigger'));
		modal.css({'display':'inherit'});
		$('#blackout').css({'display':'block'});
		setTimeout(function() {
			modal.addClass('modal-show'); $('#blackout').addClass('show');
		}, 100);
		return false;
	});
	
	
	// Modal close trigger
	$('.modal-close-trigger').on('click', function() {
		modal = $('#' + $(this).data('modal-trigger'));
		modal.removeClass('modal-show');
		$('#blackout').removeClass('show');
		setTimeout(function() {
			$('#blackout').css({'display':'none'});
			modal.css({'display':'none'})
		}, 400);
		return false;
	});

});