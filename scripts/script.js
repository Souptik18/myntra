let bagItem = JSON.parse(localStorage.getItem("bagItem")) || [];

onLoad();
function onLoad() {
  displayItemsOnHomePage();
  bagCounts();
}

function addToBag(itemID) {
  bagItem.push(itemID);
  localStorage.setItem("bagItem", JSON.stringify(bagItem));
  bagCounts();
}

function bagCounts() {
  document.querySelector(".bag-item-count").innerText = bagItem.length;
  if (bagItem.length > 0) {
    document.querySelector(".bag-item-count").innerText = bagItem.length;
    document.querySelector(".bag-item-count").style.visibility = "visible";
  } else {
    document.querySelector(".bag-item-count").style.visibility = "hidden";
  }
}

function displayItemsOnHomePage() {
  let itemsContainerElement = document.querySelector(".items-container");
  if (itemsContainerElement == null) {
    return;
  }
  let innerHTML = "";
  items.forEach((item) => {
    innerHTML += `<div class="item-container">
      <img class="item-image" src="${item.image}" alt="">
    <div class="rating">
      ${item.rating.stars} ⭐ | ${item.rating.count}
    </div>
    <div class="company-name">${item.company}</div>
    <div class="item-name">${item.item_name}</div>
    <div class="price">
      <span class="current-price">Rs ${item.current_price}</span>
      <span class="original-price">${item.original_price}</span>
      <span class="discount">[${item.discount_percentage}% OFF]</span>
    </div>
    <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
    </div>`;
  });

  itemsContainerElement.innerHTML = innerHTML;
}
