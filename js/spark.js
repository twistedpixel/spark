$(document).ready(function () {
	
	// Toggle menu on mobile devices
	$(document).on('click', 'a.nav-link', function(e) {
		e.preventDefault()
		link = $(this)
		nav = link.parents('nav')
		selector = link.siblings('ul')
		
		if(nav.hasClass('open')) {
			selector.removeAttr('style')
			nav.removeClass('open')
			link.removeClass('active')
		}
		else {
			selector.css({"height": selector[0].scrollHeight})
			link.addClass('active')
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
	$("nav.bar.sticky:not(.transparent)").wrap(function() {
		return $('<div>', {'class':'stickybump', 'height':$(this).outerHeight()})
	})
	
	
	// A sticky nav needs one extra wrapper if 'limit' is used
	$("nav.bar.sticky, nav.bar.limit").wrap(function() {
		// We also need to move a little CSS up the chain to keep color consistency
		extra = '';
		if($(this).hasClass('dark')) {
			extra += ' dark';
		}
		if($(this).hasClass('transparent')) {
			extra += ' transparent';
		}
		if($(this).hasClass('sticky')) {
			extra += ' sticky';
		}
		if($(this).hasClass('overhang')) {
			extra += ' overhang';
		}
		return $('<div>', {'class':'stickyglue' + extra})
	})
	
	
	// Close button for alerts
	$('.alert').on('click', 'a.alert-close', function(e) {
		e.preventDefault()
		$(this).parent().remove()
	})

})