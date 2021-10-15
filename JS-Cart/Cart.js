var cart = {
    hPdt : null, //list of products for the HTML file
    hItelms : null, //items to show in the cart on the HTML file
    items : {}, //items currently in the cart
    iURL : "../images/ProductImages", //file path for images of the items in the cart

    SAVE : function () { //saves the current cart to server from HTML
        localStorage.setItem("Cart", JSON.stringify(Cart.items)); //stores the vale of Cart.items
    },

    LOAD : function () { //loads cart from server to HTML
        Cart.items = localStorage.getItem("Cart"); //loads the value of Cart.items
        if (Cart.items == null) { Cart.items = {}; } //IF Cart.items is empty do nothing
        else { Cart.items = JSON.parse(Cart.items); } //ELSE add items in Cart.items to cart
    },

    CLEAR : function () { //empties the cart
        if (confirm("Empty Your Cart? (cannot be undone)")) { //IF user confirms
          Cart.items = {}; //set Cart.items to blank
          localStorage.removeItem("Cart"); //remove Cart from storage
          Cart.list(); //set Cart.list to empty
        }
    },

    INITIALISE :  function (){
        cart.hPdt.document.getElementById("cart-products"); //retrieves products file
        cart.hItems = document.getElementById("cart-items"); //retrieves items in cart

        cart.hPdt.innerHTML = "";
        let p, item, part;
        for (let id in products) {

            p = products[id];
            item = document.createElement("div");
            item.class.Name = "p-item";
            cart.hPdt.appendChild(item); 

            part = document.createElement("img"); //creates product image
            part.src = cart.iURL + p.img;
            part.className = "p-img";
            item.appendChild(part);

        }
    }
}