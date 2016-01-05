var page = tabris.create("Page", {
	title : 'Consultar Multas CELEPAR',
	topLevel : true
});

var refresh = tabris.create("Button", {
	layoutData : {
		top : 10,
		left : 5,
		right : 5
	},
	background : "#3399FF",
	text : "Recargar"
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
	},
	html : createWebViewHTML()
}).appendTo(page);

page.open();

function createWebViewHTML(){
	var html = '<form action="http://celepar7.pr.gov.br/mtm/servicos/deb_veiculo.asp" method="post" id="form">';
		html += '<input type="text" name="placa" placeholder="Placa" style="width:100%; font-size:2em"><br>';
		html += '<img src="http://celepar7.pr.gov.br/mtm/Scripts/viewImageMagicMTM.asp"><br>';
		html += '<input type="text" name="eNumImage" placeholder="Captcha..." style="width:100%; font-size:2em"><br>';
		html += '<button type="submit" id="submit" style="font-size:2em; border:0; width : 100%; background-color: #3399FF; color : #FFF; border-radius: 0.1em; box-shadow : 3px 0 5px #AAA">Enviar!</button>';
		html += '</form>';
	return html;
}