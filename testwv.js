var page = tabris.create("Page", {
	title : "WebView Test",
	topLevel : true
});

var WebView = tabris.create("WebView", {
	layoutData : {
		top : 0,
		left : 0,
		right : 0,
		bottom : 0
	},
	html : '<body style="background:red">123</body>'
})
.appendTo(page);

page.open();