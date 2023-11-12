//console.log(['Baglantı Kontrol'])

//inputlar
//Ekle Butonu
//Listeleyen Eleman

const harcamaInput = document.querySelector("#harcama");
//console.log(harcamaInput)
const fiyatInput = document.querySelector("#fiyat");
//console.log(fiyatInput)
const formBtn = document.querySelector(".ekle-btn");
//console.log(formBtn)
const list = document.querySelector(".list");
//console.log(list)
const totalInfo = document.querySelector("#total-info");
//console.log(totalInfo);
const nameInput = document.getElementById("name-input");
//console.log(nameInput)
const statusCheck = document.getElementById("status-input");
//console.log(statusCheck)
const selectFilter = document.getElementById("filter-select");
//console.log(selectFilter)

const userName = localStorage.getItem("name");

nameInput.value = userName;

nameInput.addEventListener("change", (e) => {
  //console.log(e.target.value)
  localStorage.setItem("name", e.target.value);
});

//Form butona tıklama olayını yakalamak için olay izleyicisi ekledik
formBtn.addEventListener("click", addExpense);

//harcama kartlarının bulunduuğu listeye tıklama elamanı eklendi
list.addEventListener("click", handleClick);

//select box her değiştiğinde dinlemek için
selectFilter.addEventListener("change", handleFilter);

//Toplam blgisini tutmak için bir değişken tanıma
let toplam = 0;

//Her eklenen ürünle birlikte toplam fiyatın güncellemesi toplam fonlsiyon
function updateToplam(fiyatBilgisi) {
  //Dışardan parametre olarak fiyat bilgisi alınıyor
  //console.log(fiyatBilgisi);
  //İnputtan gelen veri string olduğu için number hale çevriliyor
  toplam += Number(fiyatBilgisi);
  //Elde edilen toplam rakam html tarafına gönderiliyor
  totalInfo.innerText = toplam;
}
//Yeni ürün ekleme fonksiyonu
function addExpense(e) {
  e.preventDefault();

  if (!harcamaInput.value || !fiyatInput.value) {
    alert("Tüm boş alanları doldurun");
  } else {
    const harcamaDiv = document.createElement("div");
    harcamaDiv.classList.add("expense");

    //eğer ödendi checkbox işaretlenmişse bu koşula gir
    if (statusCheck.checked) {
      console.log(statusCheck.checked);
      //kartın classlarına payed ekle
      harcamaDiv.classList.add("payed");
    }
    //console.log(statusCheck.checked)

    //oluşturan divin İÇERİĞİNE ilgili html elemanları veriliyor
    //tek tırnak ile sadece tek satır yazabildiğimiz ve içerisin dinamik
    //veri ekleyemdiğimiz için backtick (``) kullanılır
    harcamaDiv.innerHTML = `
      <h2>${harcamaInput.value}</h2>
      <h2 id="value">${fiyatInput.value}</h2>
      <div class="buttons">
          <img id='payment' src="images/pay.png" alt="">
          <img id='remove' src="images/remove.png" alt="">
      </div>
    `;

    list.appendChild(harcamaDiv);
    updateToplam(fiyatInput.value);
  }

  harcamaInput.value = "";
  fiyatInput.value = "";
}

//silme işlemi için elemanı tespit etme
function handleClick(e) {
  // console.log(e,target)

  //tıklanan eleman genel e parametresinin target özelliğindendir
  //tıklanan elemanı değişkene atama
  let tiklanilanEleman = e.target;
  //tıklanan elemanı silme resmi olduğu tespiti
  if (tiklanilanEleman.id === "remove") {
    //bir elemanın bir üst kapsayıcısını almak için parentElement kullanılır

    //ilk parentte fiyat bilgisine verdiğimiz id özelliği ile ulaşıyoruz
    const kapsayiciElement = tiklanilanEleman.parentElement.parentElement;
    //div içerisinde fiyat bilgisne verdiğimiz id özellği ile ulaşıyoruz.
    const deletedPrice = kapsayiciElement.querySelector("#value").innerText;
    updateToplam(-Number(deletedPrice));
    kapsayiciElement.remove();
  }
}
// const dizi=[1,2,3,4,5,6,7]
// console.log(dizi)

//  dizi.map((diziElemani,elemannIndexi,dizi)=>{
//    console.log(diziElemani,elemannIndexi,dizi)

//  })

// dizi.forEach((diziElemani)=>{
//   console.log(diziElemani)
// })

//Selectbox her değiştiğinde çalışacak fonskiyon
function handleFilter(e) {
  //console.log('filtre fonksiyon')

  const harcamaKartlari = list.childNodes;
  //console.log(items)
  //addEventlistenrdan gelen event yani olay bilgisinin hedefteki değerini
  //filterValue değişkenine atıyoruz
  const filterValue = e.target.value;
  console.log(filterValue);

  //forEach,map,for,

  //Harcama kartlarının hepsini forEach ile dön
  harcamaKartlari.forEach((harcamaKarti) => {
    //foreach dönüsüngden gelen herbir harcama kartı için select boxın
    //değerine göre işleme tabi tutma
    console.log(harcamaKarti);
    //switch ile selectboxın değerini ele aldık
    switch (filterValue) {
      //filitre heğeri all ise yani Hepsi seçili ise
      case "all":
        //bütün harcama kartlarının görünüm özelliğini aktif ettik
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
