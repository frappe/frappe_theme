frappe.get_modal = function(title, content) {
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