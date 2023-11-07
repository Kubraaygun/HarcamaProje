//console.log('Bağlantı Kontrol')

const harcamaInput = document.querySelector("#harcama");
//console.log(harcamaInput)
const fiyatInput = document.querySelector("#fiyat");
//console.log(fiyatInput)
const formBtn = document.querySelector(".ekle-btn");
//console.log(formBtn)
const list = document.querySelector(".list");
//console.log(list)
const totalInfo = document.querySelector("#total-info");
//console.log(totalInfo)
const nameInput = document.getElementById("name-input");
//console.log(nameInput)

const statusCheck = document.getElementById("status-input");
//console.log(statusCheck)

const selectFilter = document.getElementById("filter-select");
//console.log(selectFilter)

const userName = localStorage.getItem("name");

nameInput.value = userName;

nameInput.addEventListener("change", (e) => {
  // console.log(e.target.value)
  localStorage.setItem("name", e.target.value);
});

formBtn.addEventListener("click", addExpense);

list.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);

let toplam = 0;

function updateToplam(fiyatBilgisi) {

  toplam += Number(fiyatBilgisi);

  totalInfo.innerText = toplam;
}

function addExpense(e) {

  e.preventDefault();

  if (!harcamaInput.value || !fiyatInput.value) {
    alert("Tüm Boş alanları doldurun");
  }
 
  else {
    //Ekle butonuna basıldğında dıv olusuyor
    const harcamaDiv = document.createElement("div");

    harcamaDiv.classList.add("expense");

    if (statusCheck.checked) {
      console.log(statusCheck.checked);
  
      harcamaDiv.classList.add("payed");
    }

    harcamaDiv.innerHTML = `<h2>${harcamaInput.value}</h2>
     <h2 id='value'>${fiyatInput.value}</h2>
         <div class="buttons">
              <img id='payment' src="./images/pay.png" alt="">
              <img id='remove' src="./images/remove.png" alt="">
         </div>
  `;

    list.appendChild(harcamaDiv);
    //console.log(harcamaDiv);
    
    updateToplam(fiyatInput.value);
  }

  harcamaInput.value = "";
  fiyatInput.value = "";
}


function handleClick(e) {
  //console.log(e.target)


  let tiklanilanEleman = e.target;

  if (tiklanilanEleman.id === "remove") {

    const kapsayiciElement = tiklanilanEleman.parentElement.parentElement;
 
    const deletedPrice = kapsayiciElement.querySelector("#value").innerText;
  
    updateToplam(-Number(deletedPrice));
 
    kapsayiciElement.remove();
  }
}


function handleFilter(e) {


  const harcamaKartlari = list.childNodes;

  const filterValue = e.target.value;

  harcamaKartlari.forEach((harcamaKarti) => {
  
    console.log(harcamaKarti);

    switch (filterValue) {

 
      case "all":
    
        harcamaKarti.style.display = "flex";
        break;

      case "payed":
        if (!harcamaKarti.classList.contains("payed")) {
          harcamaKarti.style.display = "none";
        } else {
          harcamaKarti.style.display = "flex";
        }
        break;

      case "not-payed":
        if (harcamaKarti.classList.contains("payed")) {
          harcamaKarti.style.display = "none";
        } else {
          harcamaKarti.style.display = "flex";
        }

        break;
    }
  });
}