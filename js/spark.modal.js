/*
 * Plugin: Spark Modal
 * Copyright: Pixelbend Studios LTD.
 * License: MIT
 * 
 * Usage: Spark Modal needs to be initilized on a modal’s id.
 * 
 * Options:
 *   “trigger” : element which can trigger the modal to open.
 *   “close” : element which will close the modal.
 *   “escapeToClose” : boolean value for the Escape key triggering modal close.
 *   “clickToClose” : boolean value for clicking the blackout curtain triggering modal close.
 * 
 * Functions: Your Spark Modal object (if you assigned it to a variable) has some
 * functions which you can call. This is useful if you prefer to hook into the
 * modal yourself to trigger its functionality.
 * 
 *    openModal()
 *    closeModal()
 *    toggleModal()
 *
 * See http://www.codewithspark.com for full documentation.
 * 
 */

(function($) {
 
	$.fn.sparkmodal = function(options) {
		
		var modal = this
		
        var settings = $.extend({
            trigger					: this.data('open-trigger'),
            close					: this.data('close-trigger'),
            escapeToClose			: true,
            clickToClose			: true
        }, options);
		
        var trigger = $(settings.trigger)
		var close = $(settings.close)
		var curtain = $('#blackout');
		
		if(!curtain.length) {
			var curtain = $('<div>', {'id':'blackout'})
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
		
		// Closures (user available functions)
		return {
			showModal: function() {
				showModal(modal)
			},
			
			hideModal: function() {
				hideModal(modal)
			},
			
			toggleModal: function() {
				toggleModal(modal)
			}
		} 
		
    };
}( jQuery ));