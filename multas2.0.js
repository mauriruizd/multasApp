Promise = require('promise');
require('whatwg-fetch');
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

(function(){
	if(2===1){
		AdMob.createBanner({
			adId: "ca-app-pub-4262153315408338/5433110001",
			position: AdMob.AD_POSITION.BOTTOM_CENTER,
			autoShow: true
		});
	}
})()

var tabs = tabris.create("TabFolder", {
	layoutData : {
		top : 0,
		left : 0,
		bottom : 0,
		right : 0
	},
	paging : true
}).appendTo(page);

page.open();
loadItems();

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
		url : "./iframe.html?" + type + "=" + item + "&submit=" + texts.web.submitBtn
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
	require('./placasTab')(placas, fns, 'placa').appendTo(tabs);
	require('./placasTab')(renavams, fns, 'renavam').appendTo(tabs);
	page.apply(texts.tabris.main)
}

function getWebText(selector) {
	return (texts) !== null ? texts.web[selector] : '';
}

function getTabrisText(selector) {
	return (texts) !== null ? texts.tabris.main[selector] : '';
}