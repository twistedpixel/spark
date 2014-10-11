/*
 * Plugin: Spark Modal
 * Copyright: Pixelbend Studios LTD.
 * License: MIT
 * Internal Version: 1.0
 * 
 *
 * See http://www.codewithspark.com for documentation.
 * 
 */

(function($) {
 
	$.fn.sparkmodal = function(options) {
		
		var modal = this
		
        var settings = $.extend({
			trigger			: null,
			close			: null,
			escapeToClose	: true,
			clickToClose	: true
        }, options);
		
        var trigger = $(settings.trigger)
		var close = $(settings.close)
		var curtain = $('#blackout');
		
		if(!curtain.length) {
			curtain = $('<div>', {'id':'blackout'})
			$('body').append(curtain)
		}
		
		trigger.on('click', function(e) {
			e.preventDefault()
			
			if(!modal.hasClass('static')) {
				toggleCurtain(curtain)
				toggleModal(modal)
			}
		})
		
		close.on('click', function(e) {
			e.preventDefault()
			
			if(!modal.hasClass('static')) {
				toggleCurtain(curtain)
				toggleModal(modal)
			}
		})
		
		if(settings.escapeToClose) {
			$(window).keyup(function(e) {
				if(modal.hasClass('show') && e.which == 27) {
					e.preventDefault();
					toggleCurtain(curtain)
					toggleModal(modal)
				}
			})
		}
		
		if(settings.clickToClose) {
			curtain.on('click', function(e) {
				if(modal.hasClass('show')) {
					e.preventDefault();
					toggleCurtain(curtain)
					toggleModal(modal)
				}
			})
		}
		
		function toggleModal(theModal) {
			if(theModal.hasClass('show')) {
				hideModal(theModal)
			}
			else {
				showModal(theModal)
			}
		}
		
		function toggleCurtain(theCurtain) {
			if(theCurtain.hasClass('show')) {
				hideCurtain(theCurtain)
			}
			else {
				showCurtain(theCurtain)
			}
		}
		
		function showCurtain(theCurtain) {
			theCurtain.css({'display':'block'});
			setTimeout(function() {
				theCurtain.addClass('show');
			}, 100);
		}
		
		function hideCurtain(theCurtain) {
			theCurtain.removeClass('show');
			setTimeout(function() {
				theCurtain.css('display', '');
			}, 500);
		}
		
		function showModal(theModal) {
			theModal.css({'display':'inherit'});
			setTimeout(function() {
				theModal.addClass('show');
			}, 100);
		}
		
		function hideModal(theModal) {
			theModal.removeClass('show');
			setTimeout(function() {
				theModal.css('display', '');
			}, 500);
		}
		
		// Closures
		return {
			open: function() {
				showModal(modal)
				showCurtain(curtain)
			},
			
			close: function() {
				hideModal(modal)
				hideCurtain(curtain)
			},
			
			toggle: function() {
				toggleModal(modal)
				toggleCurtain(curtain)
			}
		} 
		
    };
}( jQuery ));