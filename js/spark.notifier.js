/*
 * Plugin: Spark Notifier
 * Copyright: Pixelbend Studios LTD.
 * License: MIT
 * Internal Version: 1.0
 * 
 * 
 * See http://www.codewithspark.com for documentation.
 * 
 */

(function($) {
 
	$.fn.sparknotifier = function(options) {
		
		var container = this
		
        var settings = $.extend({
			notificationClasses		: 'notification',
			hoverPreventsFade		: true
        }, options)
        
        function removeNotification($notification) {
        	
	        $notification.removeClass('show')
	        
	        setTimeout(function() {
		        $notification.css({'height': 0, 'padding-top': 0, 'padding-bottom': 0, 'margin': 0}).delay(1000).queue(function() {
			        $(this).remove().dequeue()
		        })
	        }, 1)
			
        }
		
		// Closures
		return {
			add: function(opts) {
				
				var nopts = $.extend({
					title			: '',
					imgSrc			: '',
					text			: '',
					autoRemoveMs	: 8000,
					href			: null
		        }, opts)
				
				var allowAutoRemove = true
				
				if(nopts.href != null) {
					$notification = $('<a>', {'class':settings.notificationClasses, 'href':nopts.href})
				}
				else {
					$notification = $('<div>', {'class':settings.notificationClasses})
				}		
				
				$imgContainer = $('<div>', {'class':'thumb'})
				$img = $('<img>', {'src':nopts.imgSrc})
				
				$title = $('<div>', {'class':'title', 'html':nopts.title})
				$summary = $('<div>', {'class':'summary', 'html':nopts.text})
				
				$close = $('<a>', {'class':'close', 'href':'#'})
				$timesIcon = $('<i>', {'class':'fa fa-times'})
				
				$close.append($timesIcon)
				$imgContainer.append($img)
				
				$notification.append($close).append($imgContainer).append($title).append($summary)
				
				container.prepend($notification)
				
				$notification.delay(1).queue(function() {
					$(this).addClass('show').dequeue()
				})
				
				if(!isNaN(parseFloat(nopts.autoRemoveMs)) && isFinite(nopts.autoRemoveMs)) {
					$notification.delay(nopts.autoRemoveMs).queue(function() {
						if(allowAutoRemove) {
							removeNotification($(this))
						}
						$(this).dequeue()
					})
				}
				
				$close.on('click', function(e) {
					e.preventDefault()
					removeNotification($(this).parent('.notification'))
				})
				
				if(settings.hoverPreventsFade) {
					$notification.on('mouseenter', function() {
						allowAutoRemove = false
					})
				}
				
				return $notification
			},
			
			remove: function($notification) {
				removeNotification($notification)
			}
		} 
		
    }
}( jQuery ))