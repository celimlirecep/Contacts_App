


class Kisi{
    constructor(ad,soyad,mail)
    {
        this.ad=ad;
        this.soyad=soyad;
        this.mail=mail;
    }
}

class Ekran{

    constructor(){

        this.ad=document.getElementById("ad");
        this.soyad=document.getElementById("soyad");
        this.mail=document.getElementById("mail");
        this.ekleGuncelleButon=document.getElementById("kaydet");
        this.kisiListesi=document.querySelector(".kisi-listesi");
        this.kisiListesi.addEventListener("click",this.silGüncelle);
        this.form=document.getElementById("form-rehber").addEventListener("submit",this.kaydetGuncelle.bind(this));
        this.depo=new Depo();
        this.kisileriEkranaYazdır();
    }

    silGüncelle(e){
        
        if (e.target.clasList.contains("btn--edit")) {
            console.log("burda");
        }
    }

    kisileriEkranaYazdır(){

        this.depo.tumKisiler.forEach(kisi=>{
            this.kisiyiEkranaEkle(kisi);
        })

    }
    kisiyiEkranaEkle(kisi){
        const OlusturulanTrElementi=document.createElement("tr");
       
        OlusturulanTrElementi.innerHTML=`
        <td>${kisi.ad}</td>
        <td>${kisi.soyad}</td>
        <td>${kisi.mail}</td>
        <td>
            <button class="btn btn--edit"><i class="far fa-edit"></i></button>
            <button class="btn btn--delete"><i class="fa-regular fa-trash-can"></i></button>
        </td>    
        `;
    
        this.kisiListesi.appendChild(OlusturulanTrElementi);

    }
    kaydetGuncelle(e){
        e.preventDefault();
        const kisi=new Kisi(this.ad.value,this.soyad.value,this.mail.value);
        const sonuc= Util.bosALanKontrolEt(kisi.ad,kisi.soyad,kisi.mail);
      
        if (sonuc) {//tüm alanlar dolu ise
            // Kisiyi ekrana ekler
            this.kisiyiEkranaEkle(kisi);
            //Kisiyi local storage a ekler
            this.depo.kisiEkle(kisi);
        }
        else{
            alert("Tüm alanları doldurnuz");
        }
       

        
    }
}

class Depo{

    constructor(){
        this.tumKisiler=this.KisileriGetir();
    }
    KisileriGetir() {
        let tumKisilerLocal;
        if (localStorage.getItem("tumKisiler")===null) {
            tumKisilerLocal=[];
        }
        else
        {
            tumKisilerLocal=JSON.parse(localStorage.getItem("tumKisiler"))
        }
        this.tumKisiler=tumKisilerLocal;
        return tumKisilerLocal;
    }
    kisiEkle(kisi){
        
        this.tumKisiler.push(kisi);
         localStorage.setItem("tumKisiler",JSON.stringify(this.tumKisiler));
    
    }

    kisiSil(){

    }
}

document.addEventListener("DOMContentLoaded",function (e){
    const ekran=new Ekran();
})


class Util{//fayda aracı

    static bosALanKontrolEt(...alanlar){
        let sonuc=true;
        alanlar.forEach(alan=>{
           
            if (alan.length==0) {
                sonuc=false;
                return sonuc;
            }
          
        })
        return sonuc;
    }
    

}