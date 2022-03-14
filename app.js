const ad=document.getElementById('ad');
const soyad=document.getElementById('soyad');
const mail=document.getElementById('mail');
const kisiListesi=document.querySelector('.kisi-listesi')
const form=document.getElementById('form-rehber');
const silBtn=document.querySelector('.btn--delete');

let tumKisilerDizisi=[];

form.addEventListener("submit",tabloyaKaydet);
silBtn.addEventListener("click",tablodanSil);

function tablodanSil(e) {
    console.log("burdasın");
    e.preventDefault();

    const silinecekSatir=(e.target).classList.contains('btn--delete');
    console.log(e.target);
    
    
}

function tabloyaKaydet(e){
    e.preventDefault();
    const eklenecekKisi={
        ad:ad.value,
        soyad:soyad.value,
        mail:mail.value,
    };
    const sonuc=verileriKontrolEt(eklenecekKisi);
    console.log(sonuc);
   if (sonuc.durum) {

    
    temizle();
       kisiyiEkle(eklenecekKisi);
   }
   else
   {
    bilgiOlustur(sonuc.mesaj);
    console.log(sonuc.mesaj);
   }
   

}
function kisiyiEkle(eklenecekKisi){
  
    const yeniKisi=document.createElement('tr');
    yeniKisi.innerHTML=`
    <td>${eklenecekKisi.ad}</td>
    <td>${eklenecekKisi.soyad}</td>
    <td>${eklenecekKisi.mail}</td>
    <td>
        <button class="btn btn--edit"><i class="far fa-edit"></i></button>
        <button class="btn btn--delete"><i class="fa-regular fa-trash-can"></i></button>
    </td>    
    `;
    kisiListesi.appendChild(yeniKisi);
    tumKisilerDizisi.push(yeniKisi);
    bilgiOlustur("Kisi rehbere kaydedildi",true);
    

}
function verileriKontrolEt(kisi){
    
   for(const deger in kisi){
       if (!kisi[deger]) {
           return {
               durum:false,
               mesaj:"Tüm alanları doldurunuz",
           };
       }
   } 
   return {
       durum:true,
       mesaj:"Kaydetme işlemi başarılı",
   };

}
function bilgiOlustur(mesaj,durum){

    const olusturulanBilgi=document.createElement('div');
    olusturulanBilgi.textContent=mesaj;
    olusturulanBilgi.className="bilgi"
    if (durum) {
        olusturulanBilgi.classList.add('bilgi--success')
    }
    else{
    olusturulanBilgi.classList.add('bilgi--error')
    }
    document.querySelector('.container').insertBefore(olusturulanBilgi,form);
    setTimeout(function(){
        const silinecekDiv=document.querySelector('.bilgi');
        if (silinecekDiv) {
            silinecekDiv.remove();
        }
    },2000);
}
function temizle(){
    ad.value="";
    soyad.value="";
    mail.value="";
   
}

