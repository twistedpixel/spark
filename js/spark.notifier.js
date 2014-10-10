/*
 * Plugin: Spark Notifier
 * Copyright: Pixelbend Studios LTD.
 * License: MIT
 * 
 * Usage:  Initilize Spark Notifier on a container element that has the class “notifications”.
 * 
 * Options:
 *   “notificationClasses” : classes to be applied to each notification.
 *   “hoverPreventsFade” : boolean value to prevent automatic removal of a notification on hover.
 * 
 * Functions: Your Spark Notifier object (if you assigned it to a variable) has some functions
 * which you can call. This allows you to manipulate the notifications within it.
 * 
 *    add(title, imgSrc, text, autoRemoveMs, href)
 *    remove(notification)
 * 
 * See http://www.codewithspark.com for full documentation.
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
		
		// Closures (user available functions)
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
				
				if(typeof nopts.href != 'undefined') {
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
				
				if(typeof nopts.autoRemoveMs != 'undefined' && !isNaN(parseFloat(nopts.autoRemoveMs)) && isFinite(nopts.autoRemoveMs)) {
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