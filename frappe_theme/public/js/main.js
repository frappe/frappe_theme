frappe.ready(function(){
	var d = new Date();
	var currentYear = d.getFullYear();
	$("#year").text(currentYear);

	// footer-link
	$(".footer-link.active").removeClass("active");
	$(".footer-link[href='"+ location.pathname+"']").addClass("active");

	$(".toggle-sidebar").click(function(){
		$(".navbar-nav").parent().toggleClass('show');
	});

});

