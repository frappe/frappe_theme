frappe.get_modal = function (title, content) {
	return $(
		`<div class="modal" tabindex="-1" role="dialog">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">${title}</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<button type="button" class="btn btn-primary hide"></button>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body py-4">
						${content}
					</div>
					<div class="modal-footer hidden">
						<button type="button" class="btn btn-primary hidden"></button>
					</div>
				</div>
			</div>
		</div>`
	);
};

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
})