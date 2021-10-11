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

    CLEAR : function () {
        if (confirm("Empty Your Cart? (cannot be undone)")) {
          Cart.items = {};
          localStorage.removeItem("Cart");
          Cart.list();
        }
    },
}