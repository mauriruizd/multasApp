Promise = require('promise');
require('whatwg-fetch');
var placas = null;
var renavams = null;
loadItems();
var lang = tabris.device.get("language").replace(/-.*/, "");
var texts = require("./texts/" + lang + ".json") || require("./texts/es.json");

fns = {
	create : createWebView,
	save : saveItem
}

var page = tabris.create("Page", {
	id : 'main',
	topLevel : true
});

(function(){
	AdMob.createBanner({
		adId: "ca-app-pub-4262153315408338/5433110001",
		position: AdMob.AD_POSITION.BOTTOM_CENTER,
		autoShow: true
	});
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
onLoaded();

function createWebView(item, type) {
	// type === "placa" | "renavam"

	var page = tabris.create("Page", {
		topLevel : false
	});

	var webView = tabris.create("WebView", {
		layoutData : {
			top : 0,
			left : 10,
			bottom : 0,
			right : 10
		},
		html : genHtml(item, type)
	}).on("load", function() {
		page.set("title", type.toUpperCase() + ' ' + item);
	}).appendTo(page);

/*	var txt = tabris.create("TextInput", {
		layoutData : {
			top : 10,
			left : 20,
			right : 20
		},
		message : type
	}).appendTo(page);

	var img = tabris.create("ImageView", {
		layoutData : {
			top : "prev() 10",
			left : 40,
			right : 40
		}
	}).appendTo(page);

	fetch("http://celepar7.pr.gov.br/mtm/Scripts/viewImageMagicMTM.asp")
	.then(function(r) {
		console.log(r);
	});

	var captcha = tabris.create("TextInput", {
		layoutData : {
			top : "prev() 10",
			left : 20,
			right : 20
		},
		message : "Captcha"
	}).appendTo(page);

	var btn = tabris.create("Button", {
		layoutData : {
			top : "prev() 10",
			left : 20,
			right : 20
		},
		text : "Enviar"
	}).on("select", function() {
		console.log("Enviar clicado");
		var url = 'http://celepar7.pr.gov.br/mtm/servicos/deb_veiculo.asp?';//placa=bad888&eNumImage' + captcha.get("text");
		fetch(url, {
			method : 'post',
			credentials: 'include',
			body : JSON.stringify({
				placa : 'bad888',
				eNumImage : captcha.get("text")
			})
		}).then(function(response) {
			console.log(response);
		});
	}).appendTo(page);*/
	page.open();
}

function genHtml(item, type) {
	var html  = '<form action="http://celepar7.pr.gov.br/mtm/servicos/deb_veiculo.asp" method="post" id="form">';
		html += '<input type="hidden" name="' + type + '" value="' + item + '"><br>';
		html += '<img src="http://celepar7.pr.gov.br/mtm/Scripts/viewImageMagicMTM.asp" style="width : 100%"><br>';
		html += '<input type="text" name="eNumImage" autocomplete="off" placeholder="Captcha" style="width:100%; font-size: 2em; border: 0; border-bottom : solid 1px rgba(0,0,0,0.85)" autofocus="true"><br>';
		html += '<button type="submit" id="submit" style="font-size:1.2em; border:0; width : 100%; background-color: #29323D; display : block; padding: 10px 0; color : #FFF;">' + getWebText('submitBtn') + '</button>';
	return html;
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
	placas = localStorage.getItem("placas") === null ? [] : JSON.parse(localStorage.getItem("placas"));
	renavams = localStorage.getItem("renavams") === null ? [] : JSON.parse(localStorage.getItem("renavams"));
}

function onLoaded() {
	require('./placasTab')(placas, fns, 'placa').appendTo(tabs);
	require('./placasTab')(renavams, fns, 'renavam').appendTo(tabs);
	page.apply(texts.tabris.main)
}

function getWebText(selector) {
	return (texts) !== null ? texts.web[selector] : '';
}