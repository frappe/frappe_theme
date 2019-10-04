frappe.ready(() => {
	// Select all links with hashes
	$('a[href*="#"]')
		// Remove links that don't actually link to anything
		.not('[href="#"]')
		.click(function (event) {
			// On-page links
			if (
				location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
				&& location.hostname == this.hostname
			) {
				// Figure out element to scroll to
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				// Does a scroll target exist?
				if (target.length) {
					// Only prevent default if animation is actually gonna happen
					event.preventDefault();
					scroll_to_el(target, () => {
						// Callback after animation
						// Must change focus!
						var $target = $(target);
						$target.focus();
						if ($target.is(":focus")) { // Checking if the target was focused
							return false;
						} else {
							$target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
							$target.focus(); // Set focus again
						};
						// set window hash
						window.history.pushState({}, '', this.hash);
					});
				}
			}
		});

	$(document).on('click', '.from-markdown h1, .from-markdown h2, .from-markdown h3', (e) => {
		let $target = $(e.currentTarget);
		if (e.pageX - $target.offset().left <= 20) {
			scroll_to_el($target, () => {
				window.history.pushState({}, '', '#' + $target.prop('id'));
			})
		}
	});

	$(window).on('load', () => {
		let hash = window.location.hash;
		if (hash) {
			let el = document.querySelector(hash);
			scroll_to_el(el);
		}
	});

	function scroll_to_el(el, callback) {
		let subnav_height = $('.subnav').outerHeight() || 0;
		let offset_top = $(el).offset().top;
		let position = offset_top - subnav_height;
		$('html, body').animate({ scrollTop: position }, 500, callback);
	}

	// show screenshot preview
	$(document).on('click', 'img.screenshot', (e) => {
		let $img = $(e.target);
		show_screenshot_preview($img);
	});

	$(document).on('click', '.screenshot-preview', e => {
		if ($(e.target).is(':not(img)')) {
			hide_screenshot_preview();
		}
	});

	$(document.body).on('keydown', e => {
		if (e.key === 'Escape') {
			hide_screenshot_preview();
		}
	});

	function show_screenshot_preview($img) {
		let x_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
		let $preview = $(`<div class="screenshot-preview">
			<button class="btn">${x_icon}</button></div>
		`).appendTo(document.body);
		$preview.append($img.clone().removeClass('screenshot'));
		$('html, body').addClass('disable-scroll');
	}

	function hide_screenshot_preview() {
		$('html, body').removeClass('disable-scroll');
		$(document.body).find('.screenshot-preview').remove();
	}
});
