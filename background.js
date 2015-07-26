function icon_clicked() {
	chrome.bookmarks.search("Great Pics", function(results) {
		// folder not existing
		if (results.length == 0) {
				// creates new folder
				chrome.bookmarks.create({'parentId': chrome.bookmarks.id,
					'title': 'Great Pics'},
					function(newFolder) {
						console.log("added folder: " + newFolder.title);
						// creates sub folder
						sub_folder(newFolder.id);
					});

			} 
		// main folder already existing
		else {
			// creates sub folder
			chrome.bookmarks.search("Great Pics", function(results) {
				folder_id = results[0].id;
				sub_folder(folder_id);
			});
		}
	})

}

function sub_folder(main_folder_id) {
	chrome.tabs.getSelected(null,function(tab) {
		url = tab.url;

    	//checking if folder existing 
    	chrome.bookmarks.search(url, function(results) {
		// folder not existing
		if (results.length == 0) {
				// creates new folder
				chrome.bookmarks.create({'parentId': main_folder_id,
					'title': url},
					function(newFolder) {
						console.log("added folder: " + newFolder.title);
					});
			} 
		})
    });
}

chrome.browserAction.onClicked.addListener(function(tab) { 
			// sends message to start image fetching proccess
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
				});
			});
			icon_clicked();
		});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		chrome.bookmarks.search(sender.tab.url, function(results) {
			folder_id = results[0].id; 

			chrome.bookmarks.create({'parentId': folder_id,
				'title': request.image_src,
				'url': request.image_src});
		});

	});