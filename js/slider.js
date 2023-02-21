//Variáveis

let fotos= ["balada-banner1.jpg","balada-banner2.jpg" , "balada-banner3.jpg"];
let FotoAtual = 0;

//Função das fotos-banner

function TrocarFoto(foto){
 document.querySelector(".imagem-banner") .src="img/" + fotos[foto];
}


TrocarFoto (FotoAtual);


setInterval(function(){
    FotoAtual++;
    if(FotoAtual > 2){
        FotoAtual = 0;
    }
        TrocarFoto(FotoAtual);
    
}, 6000);



//link caminho do botão

function gotolink(link){
    console.log(link.value);
    location.href =link.value;

}