let bagItemObjects = [];
let Convenience_fees = 99;
onLoad();
function onLoad() {
  loadBagItemObjects();
  displayBagItems();
  bagSummary();
}

function loadBagItemObjects() {
  bagItemObjects = bagItem.map((itemId) => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });
}

function bagSummary() {
  totalItemCost = 0;
  discount = 0;
  totalPrice = 0;
  if (bagItem.length != 0) {
    bagItemObjects.forEach((item) => {
      totalItemCost += item.original_price;
      discount += item.original_price - item.current_price;
    });
    totalPrice = totalItemCost - discount + Convenience_fees;
  } else {
    Convenience_fees = 0;
  }

  let bagSummary = document.querySelector(".bag-summary");
  let bagSummaryHtml = `
    <div class="bag-details-container">
          <div class="price-header">PRICE DETAILS (${bagItem.length} Items) </div>
          <div class="price-item">
            <span class="price-item-tag">Total MRP</span>
            <span class="price-item-value">Rs ${totalItemCost}</span>
          </div>
          <div class="price-item">
            <span class="price-item-tag">Discount on MRP</span>
            <span class="price-item-value priceDetail-base-discount">-Rs ${discount}</span>
          </div>
          <div class="price-item">
            <span class="price-item-tag">Convenience Fee</span>
            <span class="price-item-value">Rs ${Convenience_fees}</span>
          </div>
          <hr>
          <div class="price-footer">
            <span class="price-item-tag">Total Amount</span>
            <span class="price-item-value">Rs ${totalPrice}</span>
          </div>
        </div>
        <button class="btn-place-order">
          <div class="css-usecase">PLACE ORDER</div>
        </button>`;
  bagSummary.innerHTML = bagSummaryHtml;
}

function removeItem(itemId) {
  bagItem = bagItem.filter((bagItemId) => bagItemId != itemId);
  localStorage.setItem("bagItem", JSON.stringify(bagItem));
  loadBagItemObjects();
  bagCounts();
  displayBagItems();
  bagSummary();
}

function displayBagItems() {
  let bagItemDisplay = document.querySelector(".bag-items-container");
  let innerHTML = "";
  bagItemObjects.forEach((bagItem) => {
    innerHTML += generateHtml(bagItem);
  });
  bagItemDisplay.innerHTML = innerHTML;
}

function generateHtml(item) {
  return `
 <div class="bag-item-container">
        <div class="item-left-part">
            <img class="bag-item-img" src="../${item.image}">
        </div>
        <div class="item-right-part">
            <div class="company">${item.company}</div>
            <div class="item-name">${item.item_name}</div>
            <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
            </div>
            <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
            </div>
            <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
            </div>
        </div>
        <div class="remove-from-cart" onclick="removeItem(${item.id})" >X</div>
    </div>`;
}
