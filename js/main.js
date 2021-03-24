var Cookie = {
	setCookie: function (key, value, expiry) {
	    var expires = new Date();
	    expires.setTime(expires.getTime() + (expiry * 24 * 60 * 60 * 1000));
	    document.cookie = key + '=' + value + ';path=/' + ';expires=' + expires.toUTCString();
	}, 
	getCookie: function (key) {
	    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
	    return keyValue ? keyValue[2] : null;
	},
	eraseCookie: function (key) {
	    var keyValue = Cookie.getCookie(key);
	    Cookie.setCookie(key, keyValue, '-1');
	}
}

$('.banner').owlCarousel({
	loop:true,
	nav:true,		
	autoplay:false,
	dots:false,
	margin:30,
	navText: ["<i class='flaticon-left-arrow'></i>","<i class='flaticon-right-arrow-angle'></i>"],
	items:1
});

$("body").on("click", ".wishlit", function() {
	var texts = ["Add to wishlist", "Remove from wishlist"];
	var icons = ["<i class='flaticon-like'></i>", "<i class='flaticon-close'></i>", "<i class='flaticon-loading-circle'></i>"];

	var element = $(this);
	var pid = element.closest('a').attr("p-id");
	
	element.html(icons[2]);
	element.find("i").addClass("added-wishlist");

	if(Cookie.getCookie(pid)){
		Cookie.eraseCookie(pid);
		setTimeout(function () {
			element.html(icons[0]);
			element.attr("aria-label", texts[0]);
			element.find("i").removeClass("added-wishlist");
		},1500);
	} else {
		Cookie.setCookie(pid, pid, 30);
		setTimeout(function () {
			element.html(icons[1]);
			element.attr("aria-label", texts[1]);
			element.find("i").removeClass("added-wishlist");
		},1500);
	}
});

function quantityVal(elem){
	var input_value = parseInt(elem.val());
	var input_min = parseInt(elem.attr("min"));
	var input_max = parseInt(elem.attr("max"));
	return {"element": elem, "value": input_value, "min": input_min, "max": input_max};
}

$(".quantity-dec").click(function() {
	var qty = quantityVal($(this).siblings(".quanity-val"));
	if(qty['value'] - 1 >= qty['min']) 
		qty['element'].val(qty['value'] - 1);
});
$(".quantity-inc").click(function() {
	var qty = quantityVal($(this).siblings(".quanity-val"));
	if(qty['value'] + 1 <= qty['max']) 
		qty['element'].val(qty['value'] + 1);
});

$(".hamburger-menu").click(function() {
	$('.mobile-menu-overlay, .mobile-menu-container').toggleClass('show');
	$(this).toggleClass('opened').attr('aria-expanded', $(this).hasClass('opened'));
});

$(".description-reviews .tablist .tabs").click(function (){
	var index = $(this).index();
	$(".description-reviews .tablist .tabs").removeClass("active").eq(index).addClass("active");
	$(".description-reviews .contents > div").fadeOut(300).eq(index).delay(300).fadeIn();
});

$(".indicator-container").click(function (){
	$("#shopping-container").toggleClass("show");
	$("#shopping-overlay").toggleClass("show");
});

$(".remove-product").click(function (){
	var toDelete = $(this).closest("a");
	$(this).find("i").attr("class", "flaticon-loading-circle").addClass("shopping-cart-remove");
	setTimeout(function(){
		toDelete.remove();
		if($(".shopping-products > a").length < 1) {
			$("#shopping-cart-prices").fadeOut(300);
			$("#shopping-cart-empty").delay(300).fadeIn();
		}
	}, 1500);
});

$(".remove-product-cart").click(function() {
	var toDelete = $(this).closest("tr");
	$(this).find("i").attr("class", "flaticon-loading-circle").addClass("shopping-cart-remove");
	setTimeout(function(){
		if($(".view-cart-container table tbody tr").length <= 1) {
			$(".view-cart-container table tfoot th button").addClass("disabled");
			$("#shopping-total-price").html("0.00");
			toDelete.html("<td class='align-center' colspan='6'>Your shopping cart is empty.</td>");
		}else {
			toDelete.remove();
		}
	}, 1500);
});

$(".close-open").click(function() {
	$(this).parent("li.menu-has-children").siblings("li.menu-has-children").find("ul.sub-menu").slideUp();
	$(this).parent("li.menu-has-children").siblings("li.menu-has-children").find(".close-open").attr("class", "flaticon-plus close-open");
	if($(this).siblings("ul.sub-menu").is(":hidden")){
		$(this).siblings("ul.sub-menu").slideDown();
		$(this).attr("class", "flaticon-remove close-open");
	}else {
		$(this).siblings("ul.sub-menu").slideUp();
		$(this).attr("class", "flaticon-plus close-open");
	}
});

$("#open-filters").click(function() {
	$(".search-divider > div.search").slideToggle();
});

$(".checkout-mobile-orders").click(function() {
	var txt = ["Show order summary", "Hide order summary", "flaticon-down-arrow", "flaticon-up-arrow-angle"];
	if($(".cart-container").is(":hidden")){
		$(".cart-container").slideDown();
		$(this).find("span#checkout-desc-label").html(txt[1]);
		$(this).find("i#checkout-up-down-icon").attr("class", txt[2]);
	}else {
		$(".cart-container").slideUp();
		$(this).find("span#checkout-desc-label").html(txt[0]);
		$(this).find("i#checkout-up-down-icon").attr("class", txt[3]);
	}
});

$(function () {
	$('.slider-image').slick({
	  	slidesToShow: 1,
	  	slidesToScroll: 1,
	  	arrows: true,
	  	fade: true,
	  	dots: true,
	  	asNavFor: '.slider-nav',
	  	prevArrow:"<button type='button' class='slick-arrow slick-prev'><i class='flaticon-left-arrow'></i></button>",
        nextArrow:"<button type='button' class='slick-arrow slick-next'><i class='flaticon-right-arrow-angle'></i></button>"
	});
	$('.slider-nav').slick({
	  	slidesToShow: 3,
	  	slidesToScroll: 1,
	  	asNavFor: '.slider-image',
	  	dots: false,
	  	centerMode: true,
	  	focusOnSelect: true,
	  	arrows: false,
	  	vertical: true,
	  	verticalSwiping: true,
	});
});