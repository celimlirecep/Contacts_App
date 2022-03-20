let ad=document.getElementById('ad');
let soyad=document.getElementById('soyad');
let mail=document.getElementById('mail');
const kisiListesi=document.querySelector('.kisi-listesi')
const form=document.getElementById('form-rehber');
const buton=document.getElementById("kaydet");
let satir=null;


let tumKisilerDizisi=[];

form.addEventListener("submit",tabloyaKaydet);
kisiListesi.addEventListener("click",tablodanSilDüzenle)

function tablodanSilDüzenle(e) {
    e.preventDefault();
   
   
     satir=(e.target).parentElement.parentElement.parentElement;
    
    const silinecekMail=e.target.parentElement.parentElement.previousElementSibling.textContent;
    
    if (e.target.className==="fa-regular fa-trash-can") {
                    
        tumKisilerDizisi.forEach((element,index) => {//sil butonu
         
       
            
            if (element.mail===silinecekMail) {
                
                tumKisilerDizisi.splice(index,1);
                satir.remove();
            }
        });
    }
    if (e.target.className==="far fa-edit") {//güncelle butonu
        buton.value="GÜNCELLE";
        ad.value = satir.children[0].textContent;
        soyad.value = satir.children[1].textContent;
        mail.value = satir.children[2].textContent;
        
       
        

        
    }
    
}

function tabloyaKaydet(e){
    e.preventDefault();
    if (buton.value=="GÜNCELLE") {
        buton.value="KAYDET";
        satir.children[0].textContent=ad.value;
        satir.children[1].textContent=soyad.value;
        satir.children[2].textContent=mail.value;
        
        tumKisilerDizisi.forEach((element,index)=>{
            if (element.mail==satir.children[2].textContent) {
                element.ad=ad.value;
                element.soyad=soyad.value;
                element.mail=mail.value;
                
                
            }
            console.log("girdi");
         })
        
         temizle();
       
    }
   else{
    const eklenecekKisi={
        ad:ad.value,
        soyad:soyad.value,
        mail:mail.value,
    };
    const sonuc=verileriKontrolEt(eklenecekKisi);
    
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
    tumKisilerDizisi.push(eklenecekKisi);
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
    setTimeout(function(){//***************************************************************** */
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

