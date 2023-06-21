$(window).on("load", function () {
	/*_____ Toggle _____*/
	$(document).on("click", ".toggle", function () {
		$(".toggle").toggleClass("active");
		// $("html").toggleClass("flow");
		$("body").toggleClass("move");
	});
	$(document).on("click", ".toggle.active", function () {
		$(".toggle").removeClass("active");
		// $("html").removeClass("flow");
		$("body").removeClass("move");
	});

	/*_____ Upload Blk _____*/
	$(document).on("click", ".upload_blk > button", function () {
		$(this).parent().children("input[type='file']").trigger("click");
	});
	$(document).on("change", "input[type='file']", function () {
		let file = $(this).val();
		if (this.files.length > 0) {
			$(this).parent(".upload_blk").children("button").text(file);
		} else {
			$(this).parent(".upload_blk").children("button").text("Choose File");
		}
	});

	/*_____ Popup _____*/
	$(document).on("click", ".popup", function (e) {
		if ($(e.target).closest(".popup ._inner, .popup .inside").length === 0) {
			$(".popup").fadeOut("3000");
			$("html").removeClass("flow");
			$("#vid_blk > iframe, #vid_blk > video").attr("src", "");
		}
	});
	$(document).on("click", ".popup .x_btn", function () {
		$(".popup").fadeOut();
		$("html").removeClass("flow");
		$("#vid_blk > iframe, #vid_blk > video").attr("src", "");
	});
	$(document).keydown(function (e) {
		if (e.keyCode == 27) $(".popup .x_btn").click();
	});
	$(document).on("click", ".pop_btn", function (e) {
		e.target;
		e.relatedTarget;
		var popUp = $(this).attr("data-popup");
		$("html").addClass("flow");
		$(".popup[data-popup= " + popUp + "]").fadeIn();
		$("#slick-restock").slick("setPosition");
	});
	$(document).on("click", ".pop_btn[data-src]", function () {
		var src = $(this).attr("data-src");
		$("#vid_blk > iframe, #vid_blk > video").attr("src", src);
	});

	/*_____ Form Block _____*/
	$(document).on("click", ".form_blk.pass_blk > i", function () {
		if ($(this).hasClass("icon-eye")) {
			$(this).addClass("icon-eye-slash");
			$(this).removeClass("icon-eye");
			$(this).parent().find(".input").attr("type", "text");
		} else {
			$(this).addClass("icon-eye");
			$(this).removeClass("icon-eye-slash");
			$(this).parent().find(".input").attr("type", "password");
		}
	});

	/*_____ FAQ's _____*/
	$(document).on("click", ".faq_blk > h5", function () {
		$(this).parents(".faq_lst").find(".faq_blk").not($(this).parent().toggleClass("active")).removeClass("active");
		$(this).parents(".faq_lst").find(".faq_blk > .txt").not($(this).parent().children(".txt").slideToggle()).slideUp();
	});
	// $(".faq_lst > .faq_blk:nth-child(1)").addClass("active");

	/*_____ Run Button _____*/
	$(document).on("click", ".run_btn", function (event) {
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			// header = $("header").height();
			$("html, body").animate(
				{
					// scrollTop: $(hash).offset().top - header,
					scrollTop: $(hash).offset().top,
				},
				10
			);
		}
	});

	/*
	|----------------------------------------------------------------------
	|       OTHER JAVASCRIPT
	|----------------------------------------------------------------------
	*/
});
