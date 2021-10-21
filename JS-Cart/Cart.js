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
        localStorage.removeItem("cart"); //revoves the cart items from local storage
        cart.LIST(); //set Cart.list to empty
      }
    },

    AUTOCLEAR : function () { //empties the cart (without confimation)
        cart.items = {}; //set cart.items to blank
        localStorage.removeItem("cart"); //revoves the cart items from local storage
        cart.LIST(); //set Cart.list to empty
    },
  

    INITIALISE : function () { //initalise the products
      cart.hPdt = document.getElementById("cart-products"); //retrieves products file
      cart.hItems = document.getElementById("cart-items"); //retrieves items in Cart
  

      cart.hPdt.innerHTML = ""; //sets the text of the cart to nothing
      let p, item, part; //creates let variables p, item and part
      for (let id in products) { //for each item in the file PetListing

        p = products[id]; //p is each id in PetListing
        item = document.createElement("div"); //creates div for all items
        item.className = "p-item"; //Names the div "p-item"
        cart.hPdt.appendChild(item); //add to the div for cart-products
  

        part = document.createElement("img"); //creates product image
        part.src = cart.iURL + p.Img; //set Img as p.Img of this id
        part.className = "p-Img"; //Names the Img "p-Img"
        item.appendChild(part); //add to the div for cart-products
  

        part = document.createElement("div"); //creates a div for product Name
        part.innerHTML = p.Name; //set text as p.Name of this id
        part.className = "p-Name"; //Names the div "p-Name"
        item.appendChild(part); //add to the div for cart-products

        part = document.createElement("div"); //creates a div for products breed (if applicable)
        part.innerHTML = p.Breed; //set text as p.Breed of this id
        part.className = "p-Breed"; //Names the div "p-Breed"
        item.appendChild(part); //add to the div for cart-products

        part = document.createElement("div"); //creates a div for the products description
        part.innerHTML = p.Desc; //set text as p.Desc of this id
        part.className = "p-Desc"; //Names the div "p-Desc"
        item.appendChild(part); //add to the div for cart-products
  

        part = document.createElement("div"); //creates a div for the products price
        part.innerHTML = "£" + p.Price; //set text as p.Price of this id
        part.className = "p-Price"; //Names the div "p-Price"
        item.appendChild(part); //add to the div for cart-products
  

        part = document.createElement("input"); //creates an input
        part.type = "button"; //sets input to be a button
        part.value = "Add to cart"; //sets buttons text as "add to Cart"
        part.className = "cart p-add"; //Names the button "p-add"
        part.onclick = cart.INCREMENT; //when clicked add related item to Cart
        part.dataset.id = id; //give button data id
        item.appendChild(part); //add to the div for cart-products
      }


      cart.LOAD(); //load Cart from previous sessions
      cart.LIST(); //lists items currently in the Cart
    },
  

    LIST : function () { //lists items in the Cart
      cart.hItems.innerHTML = ""; //reset for empty Cart
      let item, part, pdt; //creates let variables item, part and pdt
      let empty = true; //sets empty to true as Cart is empty
      for (let key in cart.items) { //for every apearance of key in Cart.items
        if(cart.items.hasOwnProperty(key)) { empty = false; break; } //if Cart has key set empty to false and break
      }
  

      if (empty) { //if empty - true
        item = document.createElement("div"); // create div element item
        item.innerHTML = "cart is empty"; // set text of div as "Cart is empty"
        cart.hItems.appendChild(item); //add to item
      } 
  

      else { //if empty - false
        let p, total = 0, subtotal = 0; //create variables total and subtotal, set as 0
        for (let id in cart.items) { //for each id in Cart.items

          p = products[id]; //p is each id in PetListing
          item = document.createElement("div"); //create div for each item
          item.className = "c-item"; //set div Name "c-item"
          cart.hItems.appendChild(item); //add to div for Cart area
  

          part = document.createElement("div"); //create div for item Name
          part.innerHTML = p.Name; //set inner text as Name
          part.className = "c-name"; //give div class Name "c-Name"
          item.appendChild(part); //add to div for Cart area


          part = document.createElement("input"); //create input to remove from Cart
          part.type = "button"; //set input as button
          part.value = "X"; //set button text as "X"
          part.dataset.id = id; //give button data id 
          part.className = "c-del cart"; //give button class Name "c-del Cart"
          part.addEventListener("click", cart.REMOVE); //when clicked remove item from Cart
          item.appendChild(part); //add to div for Cart area
  

          part = document.createElement("input"); //create input for quantity of item
          part.type = "number"; //set input as number value
          part.min = 0; //set min number as 0
          part.value = cart.items[id]; //set the value of this part as Cart.items[id]
          part.dataset.id = id; //give input data id
          part.className = "c-qty"; //give input class Name "c-qty"
          part.addEventListener("change", cart.CHANGE); //on click trigger Cart.change
          item.appendChild(part); //add to div for Cart area
  

          subtotal = cart.items[id] * p.Price; //create a subtotal from Cart.items[id]
          total += subtotal; //set total as current total added to subtotal
        }

        item = document.createElement("div"); //create div for total
        item.className = "c-total"; //set div class Name "c-total"
        item.id = "c-total"; //set id as "c-total"
        item.innerHTML ="TOTAL: £" + total; //set text of div as "TOTAL: £" + total
        cart.hItems.appendChild(item);  //add to div for Cart area

        item = document.createElement("input"); //create input for empty Cart button
        item.type = "button"; //set input type as button
        item.value = "Empty Cart";  //set text as "Empty Cart" 
        item.addEventListener("click", cart.CLEAR); //on click empty Cart
        item.className = "c-empty cart"; //give input class Name "c-empty Cart"
        cart.hItems.appendChild(item);  //add to div for Cart area

        item = document.createElement("input"); //create input for checkout button
        item.type = "button"; //set input type as button
        item.value = "Checkout"; //set text as "Checkout"
        item.addEventListener("click", cart.CHECKOUT); //on click goto checkout
        item.className = "c-checkout cart"; //give input class Name "c-checkout Cart" 
        cart.hItems.appendChild(item);  //add to div for Cart area
      }
    },
  

    INCREMENT : function () { //add to Cart
      if (cart.items[this.dataset.id] == undefined) { //IF this item isnt in Cart.items  
        cart.items[this.dataset.id] = 1; //add one of this Cart item
      } else { //if this item is in the Cart 
        cart.items[this.dataset.id]++; //increment this item by one
      }
      cart.SAVE(); //save current Cart
      cart.LIST(); //list items in the Cart section
    },
  

    CHANGE : function () { //change a quantity of an item

      if (this.value <= 0) { //of the value of this item in Cart is less than or equal to 0
        delete cart.items[this.dataset.id]; //delete this item from the Cart
        cart.SAVE(); //save current Cart
        cart.LIST(); //list items in the Cart section
      }
  

      else { //if the value of this item in Cart is greater than 0
        cart.items[this.dataset.id] = this.value; //increase the ammout of this item in Cart
        var total = 0; //set total to 0
        for (let id in cart.items) { //for each id in Cart.items
          total += cart.items[id] * products[id].price; //increase the size of total by each of this item in Cart times it's Price
          document.getElementById("c-total").innerHTML ="TOTAL: £" + total; //set the text total to the new total
        }
      }
    },
  

    REMOVE : function () { //remove an item from Cart
      delete cart.items[this.dataset.id]; //delete this item from the Cart
      cart.SAVE(); //save current Cart
      cart.LIST(); //list items in the Cart section
    },
  

    CHECKOUT : function () { //checksout user
      alert("Thank you for placing your Order! redirecting.."); //sends out alert letting user know they've successfully checkout out
      cart.AUTOCLEAR(); //clears cart
      window.location.href = '../Pages/Processing.html'; //redirects user to processing page
    }
  };
  window.addEventListener("DOMContentLoaded", cart.INITIALISE); //ititialises the cart page