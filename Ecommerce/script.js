let print = console.log;
let flex_cards = document.querySelector(".flex_cards");
let myItems = document.querySelector(".myItems");
let payForm = document.querySelector(".payForm");
let closePay = document.getElementById("closePay");
let myMedia = window.matchMedia("(max-width:1000px)");
let SideBar = document.querySelector(".SideBar");
let findItem = document.querySelector(".findItem");
let footer = document.querySelector("footer");
let selectedArr = [];
let totalPrice = null;
let slidBtn1 = document.querySelector(".slideBtn1");
let slidBtn2 = document.querySelector(".slideBtn2");
let myItem = document.querySelector(".myItemName");
let carosel = document.querySelector(".carosel");
let i = 0;
let addMe = document.querySelector(".clickMe");
addMe.onclick = () => {
  window.location.href =
    "file:///C:/Users/LENOVO%20B480/Desktop/Video/software/chat.html";
};

let text = "Please key in your credit card number";

let all_Item = items.map((each_item) => {
  return `
      <div class="card" id=${each_item.id}>
			<div class="ItemImg">
				<img src=${each_item.img}>
			</div>
			<p id="itemName">${each_item.name}</p>
			<p id="itemPrice">$${each_item.price}</p>
			<button class="add_Item">Add</button>
		</div>

	`;
});
flex_cards.innerHTML = all_Item.sort().join("");

let add_Btn = document.querySelectorAll(".add_Item");
add_Btn.forEach((add_Btn) => {
  add_Btn.onclick = () => {
    let mycard = items.filter((mycard) => {
      let itemId = add_Btn.parentNode.id;
      return mycard.id === itemId;
    });

    selectedArr.push({
      id: mycard[0].id,
      price: mycard[0].price,
      name: mycard[0].name,
      image: mycard[0].img,
    });
    caroselName = selectedArr.map((caroselName) => {
      return caroselName.name;
    });
    caroselImage = selectedArr.map((caroselImage) => {
      return caroselImage.image;
    });
    print(caroselName);
    print(caroselImage);
    totalPrice = selectedArr.reduce((currentPrice, selectedArr) => {
      return selectedArr.price + currentPrice;
    }, 0);

    let selected_card = selectedArr.map((selectedArr) => {
      return `
        <div class="selected_item">
			<span class="selected_name">${selectedArr.name}</span>
			<span class="selected_price">$${selectedArr.price}</span>
            <span class="delete_selected" id=${selectedArr.id}>&times</span>
		</div>

	  	`;
    });
    myItems.innerHTML = `${selected_card.join("")} <div class="amount_total">
			<span>Total</span>
			<span>$${totalPrice}</span>
            <span id="pay">Pay</span>
		</div>
`;
    document.getElementById("pay").onclick = () => {
      payForm.style.display = "flex";
      add_Btn.disabled = true;
      setTimeout(talk(text), 3000);
      document.querySelector(".totalPrice").innerHTML = `$${totalPrice}`;
    };
    document.querySelectorAll(".delete_selected").forEach((delete_item) => {
      delete_item.onclick = () => {
        let x = selectedArr.filter((item) => {
          return item.id === delete_item.id;
        });
        let index = selectedArr.indexOf(x[0]);
        selectedArr.splice(1, index);
        delete_item.parentNode.parentNode.removeChild(delete_item.parentNode);
      };
    });

    slidBtn2.addEventListener("click", () => {
      if (i <= caroselImage.length - 1) {
        carosel.style.backgroundImage = `url(${caroselImage[i]})`;

        myItem.innerText = `${caroselName[i]}`;

        ++i;
      } else {
        i = 0;
        carosel.style.backgroundImage = `url(${caroselImage[i]})`;

        myItem.innerText = `${caroselName[i]}`;

        ++i;
      }
    });
    slidBtn1.addEventListener("click", () => {
      if (i < 0) {
        i = caroselImage.length - 1;
        carosel.style.backgroundImage = `url(${caroselImage[i]})`;

        myItem.innerText = `${caroselName[i]}`;

        --i;
      } else {
        carosel.style.backgroundImage = `url(${caroselImage[i]})`;

        myItem.innerText = `${caroselName[i]}`;

        --i;
      }
    });
  };
});

closePay.onclick = () => {
  payForm.style.display = "none";
};
let cardNumber = document.querySelector(".cardNumber").value;
let postalCode = document.querySelector(".postalCode").value;
let gmail = document.querySelector(".gmail").value;
let Cvv = document.querySelector(".Cvv").value;
let purchase = document.querySelector(".purchase");
purchase.onclick = () => {
  if (cardNumber || postalCode || gmail || Cvv === "") {
    talk("Invalid input credencials");
    payForm.style.display = "flex";
  } else {
    talk("Thanks for your patronage");
  }
};
document.querySelector(".removeSearch").onclick = () => {
  findItem.style.display = "none";
};
document.querySelector(".search").onclick = () => {
  findItem.style.display = "flex";
};

if (myMedia.matches) {
  document.querySelector(".slideIn").onclick = () => {
    SideBar.id = "clearSide";
    SideBar.classList.remove("drawerOut");
  };
  document.querySelector(".openMenu").onclick = () => {
    SideBar.classList.add("drawerOut");
    SideBar.id = "";
  };
}
footer.innerText = `Copyright @ ${new Date().getFullYear()}`;

document.querySelector(".searchBtn").onclick = () => {
  let searchItem = document.querySelector(".searchItem").value;
  document.querySelectorAll("#itemName").forEach((itemName) => {
    if (searchItem !== "") {
      let re = new RegExp(searchItem, "g"); // search for all instance
      let newText = itemName.textContent.replace(
        re,
        `<mark>${searchItem}</mark>`
      );
      itemName.innerHTML = newText;
    } else {
      alert("please enter an item name for highlight");
    }
  });
};

function talk(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 2;
  utterance.rate = 1;
  speechSynthesis.speak(utterance);
}
