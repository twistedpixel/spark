$(document).ready(function () {

	// Toggle menu visibility (height) on mobile devices
	var nav = false
	var selector = 'nav#primary-nav .nav-list > li'
	
	$('.nav-link').click(function() {
		var height = 0
		$(selector).each(function(){
			height += parseInt($( this ).css('height'))
		})

		if(nav == false) {
			$('.nav-list').css({"height": height})
			nav = true
		}
		else {
			$('.nav-list').css({"height": "0"})
			nav = false
		}
		return false;
	})
	
	// Accessibility fix for navigation menu dropdowns
	$(".dd-container a").focus(function() {
		$(this).parent('li.dd-container').addClass('open')
	}).blur(function() {
		$(this).parent('li.dd.container').removeClass('open')
	})
	
	// Close button for alerts
	$('.alert .alert-close').click(function() {
		$(this).parent().remove();
		return false;
	})
	
	// Modal open trigger
	$('.modal-trigger:not(.modal-static)').click(function() {
		modal = $('#' + $(this).data('modal-trigger'));
		modal.css({'display':'inherit'});
		$('#blackout').css({'display':'block'});
		setTimeout(function() {
			modal.addClass('modal-show'); $('#blackout').addClass('show');
		}, 100);
		return false;
	});
	
	// Modal close trigger
	$('.modal-close-trigger').click(function() {
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