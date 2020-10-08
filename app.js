const vm = new Vue({
  el: "#app",
  data: {
    products: [],
    product: false,
  },
  methods: {
    fetchProducts() {
      fetch("./api/products.json")
        .then(r => r.json())
        .then(r => this.products = r);
    },
    fetchProduct(id) {
      fetch(`./api/products/${id}/data.json`)
        .then(r => r.json())
        .then(r => this.product = r);
    },
    closeModal({ target, currentTarget }) {
      if (target === currentTarget) {
        this.product = false;
      }
    },
    openModal(id) {
      this.fetchProduct(id);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
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