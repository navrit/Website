function initMagnificPopup() {
	//Magnific popup code
	$('.image-link-1').magnificPopup({
		items: {
			src: '/images/Campolindo_visit_merged.jpg'
		},
		type:'image'
	});
	$('.image-link-2').magnificPopup({
		items: {
			src: '/images/Pinewood.jpg'
		},
		type:'image'
	});
	$('.image-link-3').magnificPopup({
		items: {
			src: '/images/NavDeveloping.jpg'
		},
		type:'image'
	});
	$('.image-link-4').magnificPopup({
		items: {
			src: '/images/JinneySoldering.jpg'
		},
		type:'image'
	});
	$('.image-link-5').magnificPopup({
		items: {
			src: '/images/equipment_plain.jpg'
		},
		type:'image'
	});
	$('.image-link-6').magnificPopup({
		items: {
			src: '/images/DoseNetDeviceOpen.jpg'
		},
		type:'image'
	});
}

$(document).ready(function(){
	initMagnificPopup();
});
