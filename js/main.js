
// const price = document.querySelector('#Price');
// const quantity = document.querySelector('#quantity');
// let quantityvalue=1, total_price;
// let total = document.querySelector('#total');

function calculateTotal() {
  var items = document.querySelectorAll('.item');
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    var price = items[i].querySelector('#Price').value;
    var quantity = items[i].querySelector('#quantity').value;
    total += price * quantity;
  }
  document.getElementById("total").innerHTML = total;
}
// var items = document.querySelectorAll('.item');
// for (var i = 0; i < items.length; i++) {
//   items[i].querySelector('#Price').addEventListener("input", calculateTotal);
//   items[i].querySelector('#quantity').addEventListener("input", calculateTotal);
// }
// document.getElementById("Price").addEventListener("input", calculateTotal);
// document.getElementById("quantity").addEventListener("input", calculateTotal);


// price.addEventListener('input', (e) => {
//   total_price=e.target.value
//   total.innerHTML=e.target.value;
//   // console.log(total_price);
//   });

//   quantity.addEventListener('input', (e) => {
//     quantityvalue=e.target.value;
//     total.innerHTML=e.target.value*total_price;
//   });

  // Add more Details 
  document.querySelector('.show_more').onclick=function(){
      document.querySelector('#more-details').style.display='block';
      document.querySelector('.hide_more').style.display='block';
      document.querySelector('.show_more').style.display="none";
  }
  document.querySelector('.hide_more').onclick=function(){
    document.querySelector('#more-details').style.display='none';
    document.querySelector('.hide_more').style.display='none';
    document.querySelector('.show_more').style.display="block";
  }
  document.querySelector('.show_more2').onclick=function(){
    document.querySelector('#more-details2').style.display='block';
    document.querySelector('.hide_more2').style.display='block';
    document.querySelector('.show_more2').style.display="none";
}
document.querySelector('.hide_more2').onclick=function(){
  document.querySelector('#more-details2').style.display='none';
  document.querySelector('.hide_more2').style.display='none';
  document.querySelector('.show_more2').style.display="block";
}

// ------After clicking Generate Invoice-----------
document.querySelector('#preview').onclick = function jsFunc() {
  let error=0;
  // First check required fields should not be empty 
  let check_fields=document.querySelectorAll('.required');
  for(var i = 0; i < check_fields.length; i++){
    if(check_fields[i].value.length===0){
      check_fields[i].style.border='1px solid red';
      window.scrollTo(0, 0);
      error++;
    }
    else{
      check_fields[i].style.border='1px solid #C9CEC9'; 
    }
  }
  
  
  if(error===0){
    document.getElementById('invoice-preview').style.display='block';
    document.getElementById('invoice-input').style.display='none';
    document.getElementById('top').style.display='none';
    document.getElementById('download_pdf').style.display='block';

    // --------Fetching data and putting it in invoice ---------
    document.getElementById('from-name').innerHTML=document.querySelector('.name-from').value;
    document.getElementById('invoice').innerHTML=document.querySelector('#invoiceID').value;

    document.getElementById('to-name').innerHTML=document.querySelector('.to-name').value;
    document.getElementById('to-mail').innerHTML=document.querySelector('.to-mail').value;
    document.getElementById('to_business').innerHTML=document.querySelector('.to_business').value;
    document.getElementById('to_phone').innerHTML=document.querySelector('.to_phone').value;

    document.getElementById('from').innerHTML=document.querySelector('.name-from').value;
    document.getElementById('from-mail').innerHTML=document.querySelector('.mail-from').value;

    let from_business= document.querySelector('.from_business').value;
    if(from_business.length>0){
      document.getElementById('from_business').innerHTML='<b>Business:</b> ' + from_business;
    }
    let from_phone=document.querySelector('.from_phone').value;
    if(from_phone.length>0){
      document.getElementById('from_phone').innerHTML='<b>Phone:</b> ' + from_phone; 
    }

    document.getElementById('item-description').innerHTML=document.querySelector('#Description').value;
    document.getElementById('item-price').innerHTML=document.querySelector('#total').textContent;

    document.getElementById('total-price').innerHTML=document.querySelector('#total').textContent;

    document.getElementById('note').innerHTML=document.querySelector('#Add_note').value;

    // Due date ---------
    let select=document.getElementById('due-date').value;
    var dt = new Date(Date.now() + (3600 * 1000 * select));
      let currentate = dt.toLocaleDateString();
      // console.log(currentate);
      document.getElementById('invoice-date').innerHTML=currentate;
      document.getElementById('date').innerHTML=currentate;


      // code for printing items in invoice
      var items = document.querySelectorAll('.item');
      var invoice_items=document.querySelector('.invoice-items');
      invoice_items.innerHTML='';

      if(items.length>0){
          for(var i=0;i < items.length; i++){
            var item_name=items[i].querySelector('#Description').value;
            var item_price= items[i].querySelector('#Price').value * items[i].querySelector('#quantity').value;
            invoice_items.innerHTML+=
            '<table>' +
            '<tr class="details">'+
                '<td id="item-description">' + item_name + '</td>' + 
                '<td>$<span id="item-price">' + item_price + '</span></td>'+
            '</tr>' + 
        '</table>'
          }
      }
      

    }
}


// PDF download Buttom#1
// var doc = new jsPDF();
// var specialElementHandlers = {
//   '#editor': function (element, renderer) {
//       return true;
//   }
// };

// $('#download_pdf').click(function () {
//   doc.fromHTML($('#invoice-preview').html(), 15, 15, {
//       'width': 700,
//       'elementHandlers': specialElementHandlers
//   });
//   doc.save('Invoice_file.pdf');
// });

// PDF download Buttom#2
const options = {
  margin: 0,
  padding:0,
  filename: 'invoice.pdf',
  image: { 
    type: 'jpeg', 
    quality: 500
  },
  html2canvas: { 
    scale: 8, 
    canvasHeight: 10000,
    scrollX: 0,
    scrollY: -window.scrollY
  },
  jsPDF: { 
    unit: 'in', 
    format: 'letter', 
    orientation: 'portrait' 
  }
}

let download_pdf=document.getElementById('btn-download')
download_pdf.addEventListener('click', (e) => {
  e.preventDefault();
  const element = document.getElementById('invoice-preview');
  html2pdf().from(element).set(options).save();
});

// -------New code -------
const addbtn=document.getElementById("addBtn");
const itemContainer = document.getElementById("itemContainer");

addbtn.addEventListener("click", function(){
  const newItem = document.createElement("div");
  newItem.classList.add("item");
  newItem.innerHTML = `
  <lable for="description">Description</lable>
  <input type="text" name="description" class="required" id="Description" placeholder="Item name, hourly rate, etc"><br>
  <table>
      <tr>
          <td>
              <lable for="Price">Price</lable>
              <input type="number" name="Price" onchange="calculateTotal()" class="required" id="Price" placeholder="$0,00" value="">
          </td>
          <td>
              <lable for="Quantity">Quantity</lable>
              <input type="number" name="Quantity" onchange="calculateTotal()" id="quantity" placeholder="1" value="1">
          </td>
      </tr>
  </table>
  <button class="deleteBtn">X</button>
  `;

  itemContainer.appendChild(newItem);
});

itemContainer.addEventListener("click", function(event) {
  if (event.target.classList.contains("deleteBtn")) {
    event.target.parentNode.remove();
  }
});

