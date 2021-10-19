var Cart = {
    hPdt : null, //list of products for the HTML file
    hItems : null, //items to show in the Cart on the HTML file
    items : {}, //items currently in the Cart
    iURL : "../images/Pet-Images", //file path for images of the items in the Cart

    SAVE : function () { //saves the current Cart to server from HTML
        localStorage.setItem("Cart", JSON.stringify(Cart.items)); //stores the vale of Cart.items
    },

    LOAD : function () { //loads Cart from server to HTML
        Cart.items = localStorage.getItem("Cart"); //loads the value of Cart.items
        if (Cart.items == null) { Cart.items = {}; } //IF Cart.items is empty do nothing
        else { Cart.items = JSON.parse(Cart.items); } //ELSE add items in Cart.items to Cart
    },

    CLEAR : function () { //empties the Cart
        if (confirm("Empty Your Cart? (cannot be undone)")) { //IF user confirms
          Cart.items = {}; //set Cart.items to blank
          localStorage.removeItem("Cart"); //remove Cart from storage
          Cart.LIST(); //set Cart.list to empty
        }
    },

    INITIALISE :  function (){ //initalise the products
        Cart.hPdt.document.getElementById("Cart-PetListings"); //retrieves products file
        Cart.hItems = document.getElementById("Cart-items"); //retrieves items in Cart

        Cart.hPdt.innerHTML = "";
        let p, item, part; //creates let variables p, item and part
        for (let id in PetListing) { //for each item in the file PetListing
            

            p = PetListing[id]; //p is each id in PetListing
            item = document.createElement("div"); //creates div for all items
            item.className = "p-item"; //Names the div "p-item"
            Cart.hPdt.appendChild(item);  //add to div

            part = document.createElement("Img"); //creates product image
            part.src = Cart.iURL + p.Img; //set Img as p.Img of this id
            part.className = "p-Img"; //Names the Img "p-Img"
            item.appendChild(part); //add to div
            
            part = document.createElement("div"); //creates a div for product Name
            part.innerHTML = p.Name; //set text as p.Name of this id
            part.className = "p-Name"; //Names the div "p-Name"
            item.appendChild(part); //add to div

            part = document.createElement("div"); //creates a div for product Description
            part.innerHTML = p.Desc; //set text as p.Desc of this id
            part.className = "p-Desc"; //Names the div "p-Desc"
            item.appendChild(part); //add to div

            part = document.createElement("div"); //creates a div for product Price
            part.innerHTML = "£" + p.Price; //set text as p.Price of this id, adds £ to the start
            part.className = "p-Price"; ///Names the div "p-Price"
            item.appendChild(part); //add to div

            part = document.createElement("input"); //creates a input
            part.type = "button"; //sets input to be a button
            part.value = "Add to Cart"; //sets buttons text as "add to Cart"
            part.className = "Cart p-add"; //Names the button "p-add"
            part.onclick = Cart.ADD; //when clicked add related item to Cart
            part.dataset.id = id; //give button data id
            item.appendChild(part); //add to div

        }
        Cart.LOAD(); //load Cart from previous sessions
        Cart.LIST(); //lists items currently in the Cart
    },

    LIST : function () { //lists items in the Cart
      Cart.hItems.innerHTML = ""; //reset for empty Cart
      let item, part, pdt; //creates let variables item, part and pdt
      let empty = true; //sets empty to true as Cart is empty
      for (let key in Cart.items) { //for every apearance of key in Cart.items
        if(Cart.items.hasOwnProperty(key)) { empty = false; break; } //if Cart has key and empty if false do nothing
      }

      if (empty) { //if empty - true
        item = document.createElement("div"); // create div element item
        item.innerHTML = "Cart is empty"; // set text of div as "Cart is empty"
        Cart.hItems.appendChild(item); //add to item
      }

      else { //if empty - false
        let p, total = 0, subtotal = 0; //create variables total and subtotal, set as 0
        for (let id in Cart.items) { //for each id in Cart.items

          p = PetListing[id]; //p is each id in PetListing
          item = document.createElement("div"); //create div for each item
          item.className = "c-item"; //set div Name "c-item"
          Cart.hItems.appendChild(item); //add to div for Cart area

          part = document.createElement("div"); //create div for item Name
          part.innerHTML = p.Name; //set inner text as Name
          part.className = "c-Name"; //give div class Name "c-Name"
          item.appendChild(part); //add to div for Cart area

          part = document.createElement("input"); //create input to remove from Cart
          part.type = "button"; //set input as button
          part.value = "X"; //set button text as "X"
          part.dataset.id = id; //give button data id 
          part.className = "c-del Cart"; //give button class Name "c-del Cart"
          part.addEventListener("click", Cart.REMOVE); //when clicked remove item from Cart
          item.appendChild(part); //add to div for Cart area

          part = document.createElement("input"); //create input for quantity of item
          part.type = "number"; //set input as number value
          part.min = 0; //set min number as 0
          part.value = Cart.items[id]; //set the value of this part as Cart.items[id]
          part.dataset.id = id; //give input data id
          part.className = "c-qty"; //give input class Name "c-qty"
          part.addEventListener("change", Cart.CHANGE); //on click trigger Cart.change
          item.appendChild(part); //add to div for Cart area

          subtotal = Cart.items[id] * p.Price; //create a subtotal from Cart.items[id]
          total += subtotal; //set total as current total added to subtotal
        }

        item = document.createElement("div"); //create div for total
        item.className = "c-total"; //set div class Name "c-total"
        item.id = "c-total"; //set id as "c-total"
        item.innerHTML ="TOTAL: £" + total; //set text of div as "TOTAL: £" + total
        Cart.hItems.appendChild(item); //add to div for Cart area

        item = document.createElement("input"); //create input for empty Cart button
        item.type = "button"; //set input type as button
        item.value = "Empty Cart"; //set text as "Empty Cart" 
        item.addEventListener("click", Cart.CLEAR); //on cluck empty Cart
        item.className = "c-empty Cart"; //give input class Name "c-empty Cart"  
        Cart.hItems.appendChild(item); //add to div for Cart area

        item = document.createElement("input"); //create input for checkout button
        item.type = "button"; //set input type as button
        item.value = "Checkout"; //set text as "Checkout"
        item.addEventListener("click", Cart.CHECKOUT); //on click goto checkout
        item.className = "c-checkout Cart"; //give input class Name "c-checkout Cart" 
        Cart.hItems.appendChild(item); //add to div for Cart area
      }
    },  

    ADD : function () { //add to Cart
        if (Cart.items[this.dataset.id] == undefined) { //if Cart.items is empty 
          Cart.items[this.dataset.id] = 1; //add this as the first Cart item
        } else { //if the Cart isn't empty
          Cart.items[this.dataset.id]++; //add this as the next incremented Cart item
        }
        Cart.SAVE(); //save current Cart
        Cart.LIST(); //list items in the Cart section
      },
    
    CHANGE : function () { //change a quantity of an item
    
      if (this.value <= 0) { //of the value of this item in Cart is less than or equal to 0
        delete Cart.items[this.dataset.id]; //delete this item from the Cart
        Cart.SAVE(); //save current Cart
        Cart.LIST(); //list items in the Cart section
      }

      else { //if the value of this item in Cart is greater than 0
        Cart.items[this.dataset.id] = this.value; //increase the ammout of this item in Cart
        var total = 0; //set total to 0
        for (let id in Cart.items) { //for each id in Cart.items
          total += Cart.items[id] * PetListing[id].Price; //increase the size of total by each of this item in Cart times it's Price
          document.getElementById("c-total").innerHTML ="TOTAL: £" + total; //set the text total to the new total
        }
      }
    },
    REMOVE : function () { //remove an item from Cart
        delete Cart.items[this.dataset.id]; //delete this item from the Cart
        Cart.SAVE(); //save current Cart
        Cart.LIST(); //list items in the Cart section
      },     
    CHECKOUT : function () {
        alert ("test");
    }   
};
window.addEventListener("DOMContentLoaded", Cart.INITIALISE);