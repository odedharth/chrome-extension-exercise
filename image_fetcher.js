function fetch_images() {
	$("img").each(function() {
		var image = new Image();
		image.src = $(this).attr("src");	
		width = image.naturalWidth
		height = image.naturalHeight
		if (width > 150 && height > 150) {
			chrome.runtime.sendMessage({image_src: image.src}, function(response) {
			});
		}
	});
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (sender.tab != true) {
			fetch_images();
		} 
	});

