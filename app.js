const vm = new Vue({
  el: "#app",
  data: {
    products: []
  },
  methods: {
    fetchProducts() {
      fetch("./api/products.json")
        .then(r => r.json())
        .then(r => this.products = r)
    }
  },
  created() {
    this.fetchProducts();
  },
  filters: {
    numberToPrice(value) {
      return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    }
  }
})