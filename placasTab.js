module.exports = function(items, fn, type) {
	var tab = tabris.create("Tab", {
		id : type + 'Tab'
	});

	var placaTxt = tabris.create("TextInput", {
		id : 'input' + type,
		layoutData : {
			top : 20,
			left : 30,
			right : 30
		},
		alignment : "center",
		autoCapitalize : true
	}).appendTo(tab);

	var addPlacaBtn = tabris.create("Button", {
		id : 'add' + type,
		class : 'actionBtn',
		layoutData : {
			top : "prev() 10",
			left : 30,
			right : 30
		}
	}).on("select", function(){
		items = fn.save(type + 's', items, placaTxt.get("text"));
		placaTxt.set("text", "");
		loadItems();
	}).appendTo(tab);

	var list = tabris.create("CollectionView", {
		layoutData : {
			top : "prev() 10",
			left : 0,
			right : 0,
			bottom : 0
		},
		items : items,
		itemHeight : 80,
		initializeCell : function(cell) {
			var text = tabris.create("TextView", {
				layoutData : {
					left : 30,
					centerY : 0
				},
				font : "20px"
			}).appendTo(cell);

			var removeBtn = tabris.create("Button", {
				class : 'removeItemBtn',
				layoutData : {
					right : 30,
					centerY : 0,
					width : 50
				},
				text : "×",
				textColor : "#FFF",
				background : "#CC3333"
			}).on("select", function(widget) {
				var item = widget.parent().children()[0].get("text");
				var index = items.indexOf(item);
				items.splice(index, 1);
				fn.save(type + 's', items);
				loadItems();
			}).appendTo(cell);

			cell.on("change:item", function(widget, item) {
				text.set("text", item);
			});
		}
	}).on("select", function(widget, item) {
		fn.create(item, type);
	})
	.appendTo(tab);

	function loadItems() {
		list.set("items", items);
	}

	return tab;
}