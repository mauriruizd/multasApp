tabris.ui.set("toolbarVisible", false);
var placas = [];
var renavams = [];
var texts = (function(){
	var lang = tabris.device.get("language").replace(/-.*/, "");
	try {
		return require("./texts/" + lang + ".json");
	} catch(e) {
		return require("./texts/en.json");
	}
}());
var fns = {
	create : createWebView,
	save : saveItem
}

var page = tabris.create("Page", {
	id : 'main',
	topLevel : true
});

var introImage = tabris.create("ImageView", {
	layoutData : {
		top : 0,
		left : 0,
		right : 0,
		bottom : 0
	},
	opacity : 0,
	scaleMode : "fit",
	image : {
		src : "./img/roadstar.png"
	}
}).appendTo(page);

page.open();

introImage.animate({ opacity : 1 }, { duration : 1500 });
setTimeout(function(){
	introImage.animate({ opacity : 0 }, { duration : 500, delay : 1500 });
	setTimeout(function() {
		tabris.ui.set("toolbarVisible", true);
		introImage.dispose();
		tabs.appendTo(page).animate({ opacity : 1 }, { duration : 500 });
		loadItems();
	}, 2000);
}, 3000);

(function(){
	if(2===2){
		AdMob.createBanner({
			adId: "ca-app-pub-8937553752827350/3346296426",
			position: AdMob.AD_POSITION.BOTTOM_CENTER,
			autoShow: true
		});
	}
})();

var tabs = tabris.create("TabFolder", {
	layoutData : {
		top : 0,
		left : 0,
		bottom : 0,
		right : 0
	},
	paging : true,
	opacity : 0
});

function createWebView(item, type) {
	// type === "placa" | "renavam"

	var page = tabris.create("Page", {
		topLevel : false,
		title : getTabrisText('#webView')
	});

	var webView = tabris.create("WebView", {
		id : 'webView',
		layoutData : {
			top : 0,
			left : 10,
			right : 10
		},
		enabled : false,
		url : "./iframe.html?" + type + "=" + item + "&submit=" + texts.web.submitBtn + "&recaptcha=" + texts.web.recaptcha
		//html : genHtml(item, type)
	}).on("load", function() {
		page.set("title", getWebText(type) + ' ' + item);
	}).appendTo(page);

	page.open();
}

function saveItem(type, items, item) {
	if (typeof item !== "undefined") {
		var nItem = item.toUpperCase().replace(/[^A-Z0-9]/g, '');
		items.push(nItem);
	}
	localStorage.setItem(type, JSON.stringify(items));
	return items;
}

function loadItems() {
	placas = getFromStorage("placas");
	renavams = getFromStorage("renavams");
	onLoaded();
}

function getFromStorage(index) {
	return (function(){
		var getted = localStorage.getItem(index);
		if (getted == null) {
			return [];
		} else {
			return JSON.parse(getted);
		}
	}());
}

function onLoaded() {
	require('./placasTab.js')(placas, fns, 'placa').appendTo(tabs);
	require('./placasTab.js')(renavams, fns, 'renavam').appendTo(tabs);
	page.apply(texts.tabris.main)
}

function getWebText(selector) {
	return (texts) !== null ? texts.web[selector] : '';
}

function getTabrisText(selector) {
	return (texts) !== null ? texts.tabris.main[selector] : '';
}