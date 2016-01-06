var placas = null;
var lang = tabris.device.get("language").replace(/-.*/, "");
var texts = require("./texts/" + lang + ".json") || require("./texts/es.json");

var page = tabris.create("Page", {
	id : 'settingsPage',
	topLevel : true
}).on("appear", function(){
	getPlacas();
	updateView();
});

var placasTxt = tabris.create("TextInput", {
	id : 'inputPlacas',
	layoutData : {
		top : "prev() 10",
		centerX : 0,
		width : 250
	}
}).appendTo(page);

var addBtn = tabris.create("Button", {
	id : 'addPlacaBtn',
	layoutData : {
		top : "prev() 10",
		centerX : 0,
		width : 300
	}
}).on("select", loadPlacas).appendTo(page);

var selectPlacas = tabris.create("CollectionView", {
	layoutData : {
		top : "prev() 10",
		left : 0,
		bottom : 0,
		right : 0
	},
	itemHeight : 40,
	initializeCell : function(cell) {
		var placaLabel = tabris.create("TextView", {
			layoutData : {
				centerY : 0,
				left : 20
			},
			markupEnabled : true
		}).appendTo(cell);

		var deleteBtn = tabris.create("Button", {
			layoutData : {
				centerY : 0,
				right : 20
			},
			text : texts.tabris.settingsPage['.removeItemBtn'].text,
			background : '#CC3333',
			textColor : '#FFF'
		}).on("select", function(widget) {
			var placa = widget.parent().children()[0].get("text").replace(/<big>|<\/big>/g, '');
			removeItemAt(placas.indexOf(placa));
		}).appendTo(cell);

		cell.on("change:item", function(widget, item) {
			placaLabel.set("text", '<big>' + item + '</big>');
		});
	}
}).appendTo(page);

page.apply(texts.tabris.settingsPage);

function updateView(){
	selectPlacas.set("items", placas);
}

function savePlacas(){
	localStorage.setItem("placas", JSON.stringify(placas));
}

function loadPlacas() {
	if (placasTxt.get("text") !== '') {
		var nuevaPlaca = placasTxt.get("text").toUpperCase().replace(/[^A-Z0-9]/g, '');
		console.log(placasTxt.get("text"));
		placas.push(nuevaPlaca);
		placasTxt.set("text", '');
		savePlacas();
	}
	updateView();
}

function getPlacas(){
	placas = (localStorage.getItem("placas") == null) ?  [] : JSON.parse(localStorage.getItem("placas"));
}

function removeItemAt(index) {
	placas.splice(index, 1);
	updateView();
	savePlacas();
}

module.exports = page;