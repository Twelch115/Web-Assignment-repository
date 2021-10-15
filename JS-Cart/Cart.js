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
        let p, item, part; //creates let variables p, item and part
        for (let id in PetListing) {

            p = PetListing[id]; 
            item = document.createElement("div"); //creates div for all items
            item.class.Name = "p-item"; //names the div "p-item"
            cart.hPdt.appendChild(item); 

            part = document.createElement("img"); //creates product image
            part.src = cart.iURL + p.img;
            part.class.Name = "p-img"; //names the img "p-img"
            item.appendChild(part);
            
            part = document.createElement("div"); //creates a div for product name
            part.innerHTML = p.name;
            part.className = "p-name"; //names the div "p-name"
            item.appendChild(part);

            part = document.createElement("div"); //creates a div for product description
            part.innerHTML = p.desc;
            part.className = "p-desc"; //names the div "p-desc"
            item.appendChild(part);

            part = document.createElement("div"); //creates a div for product price
            part.innerHTML = "£" + p.price;
            part.className = "p-price"; ///names the div "p-price"
            item.appendChild(part);

            part = document.createElement("input"); //creates a input
            part.type = "button"; //sets input to be a button
            part.value = "Add to Cart"; //sets buttons text as "add to cart"
            part.className = "cart p-add"; //names the button "p-add"
            part.onclick = cart.add; //when clicked add related item to cart
            part.dataset.id = id;
            item.appendChild(part);

        }
        cart.LOAD(); //load cart from previous sessions
        cart.list(); //lists items currently in the cart
    }
}