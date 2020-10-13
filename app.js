const vm = new Vue({
  el: "#app",
  data: {
    products: [],
    product: false,
    cart: [],
    alertMessage: "Item adicionado",
    activeAlert: false,
    activeCart: false,
  },
  computed: {
    cartTotal() {
      let total = 0;
      if (this.cart.length) {
        this.cart.forEach(item => {
          total += item.price;
        });
      }
      return total
    }
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
      });
    },
    addItem() {
      this.product.stock--;
      const { id, name, price } = this.product;
      this.cart.push({ id, name, price });
      this.alert(`${name} adicionado ao carrinho`)
    },
    removeItem(index) {
      this.cart.splice(index, 1);
    },
    compareStock() {
      const items = this.cart.filter(item => item.id === this.product.id);
      this.product.stock -= items.length;
    },
    checkLocalStorage() {
      if (window.localStorage.cart) {
        this.cart = JSON.parse(window.localStorage.cart);
      }
    },
    alert(message) {
      this.alertMessage = message;
      this.activeAlert = true;
      setTimeout(() => {
        this.activeAlert = false;
      }, 1500);
    },
    router() {
      const hash = document.location.hash;
      if (hash) {
        this.fetchProduct(hash.replace("#", ""));
      }
    },
    cartOutClick({ target, currentTarget }) {
      if (target === currentTarget) {
        this.activeCart = false;
      }
    },
  },
  created() {
    this.fetchProducts();
    this.router();
    this.checkLocalStorage();
  },
  filters: {
    numberToPrice(value) {
      return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    }
  },
  watch: {
    cart() {
      window.localStorage.cart = JSON.stringify(this.cart);
    },
    product() {
      document.title = this.product.name || "Techno";
      history.pushState(null, null, `#${this.product.id || ""}`)

      if (this.product) {
        this.compareStock();
      }
    }
  }
})