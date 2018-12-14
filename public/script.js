new Vue({
	el: "#app",
	data: {
		total: 0,
		products: [],
		cart: [],
		search: "",
	},
	methods: {
		addToCart: function(product) {
			this.total += product.price;
			var found = false;
			for (var i = 0; i < this.cart.length; i++) {
				if (this.cart[i].id === product.id) {
					this.cart[i].qty++;
					found = true;
				}
			}
			if (!found) {
				this.cart.push({
					id: product.id,
					title: product.title,
					price: product.price,
					qty: 1,
				});
			}
		},
		inc: function(item) {
			item.qty++;
			this.total += item.price;
		},
		des: function(item) {
			item.qty--;
			this.total -= item.price;
			if (item.qty <= 0) {
				var i = this.cart.indexOf(item);
				this.cart.splice(i, 1);
			}
		},
		onSubmit: function() {
			var path = "/search?q=".concat(this.search);
			this.$http.get(path).then(function(res) {
				this.products = res.body;
			});
		},
	},
	filters: {
		currency: function(price) {
			return price.toFixed(2).concat(" €");
		},
	},
});
