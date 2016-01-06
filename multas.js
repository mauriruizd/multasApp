// VAR
var placas = null;
var lang = tabris.device.get("language").replace(/-.*/, "");
var texts = require("./texts/" + lang + ".json") || require("./texts/es.json");

var page = tabris.create("Page", {
	topLevel : true,
	id : "main"
}).on("appear", function(){
	console.log(tabris.device.get("language").replace(/-.*/, ""));
	getPlacas();
	WebView.set("html", createWebViewHTML());
});

var settingsPage = require('./settings');

var drawer = tabris.create("Drawer");

tabris.create("PageSelector", {
	layoutData : {
		top : 0,
		left : 0,
		bottom : 0,
		right : 0
	}
}).appendTo(drawer);

var refresh = tabris.create("Button", {
	id : "refreshBtn",
	layoutData : {
		top : 10,
		left : 5,
		right : 5
	},
	font : '30px',
	textColor : '#FFF',
	background : "#3399FF"
})
.on("select", function() {
	WebView.set("html", createWebViewHTML());
})
.appendTo(page);

var WebView = tabris.create("WebView", {
	layoutData : {
		top : [refresh, 10],
		left : 0,
		bottom : 0,
		right : 0
	}
}).appendTo(page);

page.apply(texts.tabris.main).open();

function createWebViewHTML(){
	var btnDissabled = !placasDisponiveis() ? 'disabled="true"' : '';
	var html = '<form action="http://celepar7.pr.gov.br/mtm/servicos/deb_veiculo.asp" method="post" id="form">';
	if(placasDisponiveis()) {
		//html += '<input type="text" name="placa" placeholder="Placa" style="width:100%; font-size:2em"><br>';
		html += '<select name="placa" style="width: 100%; font-size: 2em">';
		for(var i=0; i < placas.length; i++) {
			html += '<option value="' + placas[i] + '">' + placas[i] + '</option>';
		}
		html += '</select>';
		html += '<img src="http://celepar7.pr.gov.br/mtm/Scripts/viewImageMagicMTM.asp"><br>';
		html += '<input type="text" name="eNumImage" autocomplete="off" placeholder="Captcha" style="width:100%; font-size:2em; border: "><br>';
	} else {
		html += '<p style="color: red; font-weight : bold;">' + getWebText('addLabel') + '</p>';
	}
		html += '<button type="submit" id="submit" style="font-size:2em; border:0; width : 100%; background-color: ' + (!placasDisponiveis() ? '#AAA' : '#3399FF') + '; color : #FFF; border-radius: 0.1em; box-shadow : 3px 0 5px #AAA;" ' + btnDissabled + '>' + getWebText('submitBtn') + '</button>';
		html += '</form>';
	return html;
}

function placasDisponiveis(){
	return placas.length !== 0;
}

function getPlacas(){
	placas = (localStorage.getItem("placas") == null) ?  [] : JSON.parse(localStorage.getItem("placas"));
}

function getWebText(selector) {
	return (texts) !== null ? texts.web[selector] : '';
}