$(function(){
	var input = $('input'),
		button = $('button'),
		form = $('form'),
		timeoutID;		

	/*Fallback for placeholder text in input field for browser that don't support this attribute*/
	function elementSupportsAttribute(element, attribute) {
		var test = document.createElement(element);
		if (attribute in test) {
			return true;
		} else {
			return false;
		}
	};

	if( !elementSupportsAttribute('input', 'placeholder') ) {	
		var	that;
		
		input.val('Input your Email for Beta');
		input.on('focus', function(){
			that = $(this);
		})
			.on('focusout', function(){
				if( !that.val() ) {
					that.val('Input your Email for Beta');
				}
			});
	}

	/*Select text in input field on focus*/
	input.on('focus', function(){
		$(this).select();		
	})
		.on('focusout', function(){
			if( !$(this).val() ) {
				$(this).removeClass('error');
			}
	});

	/*Validate email function*/
	function validateEmail(mail, origin){
		
		function isEmailValid(email){
			var mail = email;

			if((/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(email))){
				return true;
			} else {
				return false;
			}
		}

		function validate(mail, origin){
			if( isEmailValid(mail) ) {			
				origin.removeClass('error')
				return true;
			} else {	
				origin.addClass('error');
				return false;
			}
		}

		return validate(mail, origin);
	}

	input.on('keyup', function(){
		var $this = $(this);			

		if( $this.val().length > 3 ){
			clearTimeout(timeoutID);
			timeoutID = setTimeout(function(){
				validateEmail($this.val(), $this)
			}, 1000);
		} else {
			$this.removeClass('error');
		}
	});
	
	/*Send email*/	
	form.on('submit', function(e){
		var emailInput = $(this).children('input'),
			email = emailInput.val(),
			$this = $(this),
			appendElem = '<div class="share"><a class="button facebook" href="http://www.facebook.com">Share on Facebook</a>'
				+ '<a class="button twitter" href="http://www.twitter.com">Share on Twitter</a>'
				+ '<p class="form-info">You\'ve signed up, we love you for that! Tell your friends about it.</p></div>';
		
		if( !email ) {
			emailInput.val('Please enter your email');			
		}

		if( validateEmail(email, emailInput) ) {
			/*$.post('#', emailInput.serialize(), function(){	
				$('.form-info').remove();*/
				$this.after(appendElem);			
				$this.hide();
			/*});*/
		}		
		
		e.preventDefault();	
	});

	/*Inform about Ajax errors*/
	$( document ).ajaxError(function() {
		var errMessage = $('.form-info').length > 0;
		if ( !errMessage ){
			form.after( '<p class="form-info">Failed to sent the email.</p>' );
			errMessage = true;
		}
	});
	
	/*Smooth scrolling from menu to section*/
	$(function() {
		$('a[href*=#]:not([href=#])').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top
					}, 700);
					return false;
				}
			}
		});
	});

	/*Fixed menu functionality*/
	function fixedMenu(){
		var menuOffset = $('#about').offset().top,
			nav = $('nav');
			

		if( $(this).scrollTop() >= menuOffset) {
			nav.addClass('fixed');
		} else {
			nav.removeClass('fixed');
		}
	}
	
	$(window).on('scroll', fixedMenu);

});