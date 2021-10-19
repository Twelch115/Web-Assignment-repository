var cart = {
    
    hPdt : null, //list of products for the HTML file
    hItems : null, //items to show in the Cart on the HTML file
    items : {}, //items currently in the Cart
    iURL : "../images/Pet-Images/", //file path for images of the items in the Cart
  

    SAVE : function () { //saves the current Cart to server from HTML
      localStorage.setItem("cart", JSON.stringify(cart.items)); //stores the vale of Cart.items
    },
  

    LOAD : function () { //loads Cart from server to HTML
      cart.items = localStorage.getItem("cart"); //loads the value of Cart.items
      if (cart.items == null) { cart.items = {}; } //IF cart.items is empty do nothing
      else { cart.items = JSON.parse(cart.items); } //ELSE add items in cart.items to Cart
    },
  

    CLEAR : function () { //empties the cart
      if (confirm("Empty cart? (Cannot be undone)")) { //IF user confirms
        cart.items = {}; //set cart.items to blank
        localStorage.removeItem("cart");
        cart.LIST();
      }
    },

    AUTOCLEAR : function () {
        cart.items = {};
        localStorage.removeItem("cart");
        cart.LIST();
    },
  

    INITIALISE : function () {
      cart.hPdt = document.getElementById("cart-products");
      cart.hItems = document.getElementById("cart-items");
  

      cart.hPdt.innerHTML = "";
      let p, item, part;

      for (let id in products) {

        p = products[id];
        item = document.createElement("div");
        item.className = "p-item";
        cart.hPdt.appendChild(item);
  

        part = document.createElement("img");
        part.src = cart.iURL + p.Img;
        part.className = "p-Img";
        item.appendChild(part);
  

        part = document.createElement("div");
        part.innerHTML = p.Name;
        part.className = "p-Name";
        item.appendChild(part);

        part = document.createElement("div");
        part.innerHTML = p.Breed;
        part.className = "p-Breed";
        item.appendChild(part);

        part = document.createElement("div");
        part.innerHTML = p.Desc;
        part.className = "p-Desc";
        item.appendChild(part);
  

        part = document.createElement("div");
        part.innerHTML = "£" + p.Price;
        part.className = "p-Price";
        item.appendChild(part);
  

        part = document.createElement("input");
        part.type = "button";
        part.value = "Add to cart";
        part.className = "cart p-add";
        part.onclick = cart.INCREMENT;
        part.dataset.id = id;
        item.appendChild(part);
      }


      cart.LOAD();
  

      cart.LIST();
    },
  

    LIST : function () {

      cart.hItems.innerHTML = "";
      let item, part, pdt;
      let empty = true;
      for (let key in cart.items) {
        if(cart.items.hasOwnProperty(key)) { empty = false; break; }
      }
  

      if (empty) {
        item = document.createElement("div");
        item.innerHTML = "cart is empty";
        cart.hItems.appendChild(item);
      }
  

      else {
        let p, total = 0, subtotal = 0;
        for (let id in cart.items) {

          p = products[id];
          item = document.createElement("div");
          item.className = "c-item";
          cart.hItems.appendChild(item);
  

          part = document.createElement("div");
          part.innerHTML = p.Name;
          part.className = "c-name";
          item.appendChild(part);


          part = document.createElement("input");
          part.type = "button";
          part.value = "X";
          part.dataset.id = id;
          part.className = "c-del cart";
          part.addEventListener("click", cart.REMOVE);
          item.appendChild(part);
  

          part = document.createElement("input");
          part.type = "number";
          part.min = 0;
          part.value = cart.items[id];
          part.dataset.id = id;
          part.className = "c-qty";
          part.addEventListener("change", cart.CHANGE);
          item.appendChild(part);
  

          subtotal = cart.items[id] * p.Price;
          total += subtotal;
        }
  

        item = document.createElement("div");
        item.className = "c-total";
        item.id = "c-total";
        item.innerHTML ="TOTAL: £" + total;
        cart.hItems.appendChild(item);


        item = document.createElement("input");
        item.type = "button";
        item.value = "Empty";
        item.addEventListener("click", cart.CLEAR);
        item.className = "c-empty cart";
        cart.hItems.appendChild(item);
  

        item = document.createElement("input");
        item.type = "button";
        item.value = "Checkout";
        item.addEventListener("click", cart.CHECKOUT);
        item.className = "c-checkout cart";
        cart.hItems.appendChild(item);
      }
    },
  

    INCREMENT : function () {
      if (cart.items[this.dataset.id] == undefined) {
        cart.items[this.dataset.id] = 1;
      } else {
        cart.items[this.dataset.id]++;
      }
      cart.SAVE();
      cart.LIST();
    },
  

    CHANGE : function () {

      if (this.value <= 0) {
        delete cart.items[this.dataset.id];
        cart.SAVE();
        cart.LIST();
      }
  

      else {
        cart.items[this.dataset.id] = this.value;
        var total = 0;
        for (let id in cart.items) {
          total += cart.items[id] * products[id].price;
          document.getElementById("c-total").innerHTML ="TOTAL: £" + total;
        }
      }
    },
  

    REMOVE : function () {
      delete cart.items[this.dataset.id];
      cart.SAVE();
      cart.LIST();
    },
  

    CHECKOUT : function () {
      alert("Thank you for placing your Order! redirecting..");
      cart.AUTOCLEAR();
      window.location.href = '../Pages/Processing.html';  
    }
  };
  window.addEventListener("DOMContentLoaded", cart.INITIALISE);