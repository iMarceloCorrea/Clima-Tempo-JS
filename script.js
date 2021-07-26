//QUANDO ENVIAR OU FOR ENVIAR O FORMULARIO
// VAI EXECUTAR UMA FUNCAO QUE VAI RECEBER UM EVENTO
//PREVENIR QUE O FORMULARIO SEJA ENVIADO PQ SE FOR ENVIADO A PAGINA ATUALIZA
//EVENT.PREVENDEFAULT 

// ADDEVENTLISTENER FUNCIONA COMO UM OLHEIRO VAMOS APLICAR NO SUBMIT,
// PARA QUANDO ELE FOR ENVIAR O FORMULARIO, NISSO VAI EXECUTAR UMA
// FUNCAO E ESSA FUNCAO RECEBE UM EVENTO (EVENT)


// PRIMEIRO PASSO PREVENIR QUE O FORMULARIO SEJA ENVIADO, OU SEJA
// NAO POSSO DEIXAR Q ELE ENVIE, PQ SE FOR ENVIADO A PAGINA ATUALIZA
// E EU PERCO TUDO QUE ESTOU FAZENDO


//O FORMULARIO BUSCA TEM UMA CLASS  CHAMADA BUSCA, ESTOU CHAMANDO ELA
// NA FUNCAO DOCUMENT.QUERYSELECTOR E ADICIONANDO UM OLHEIRO NELE
// O ADD.EVENTLISTENER QUE ESTA DE OLHO NO SUBMIT DO MEU FORM
//SENDO ASSIM, QUANDO O USUARIO CLICAR NO BUSCAR (MEU SUBMIT)
// A FUNCAO QUE COLOQUEI NAO DEIXARA ENVIAR OS DADOS E ATUALIZAR A PAGINA
// UMA VEZ Q EU PREVNI QUE OS DADOS SEJAM ENVIADO AGORA EU SEI QUE O 
//USUARIO QUER ENVIAR ALGUMA COISA

// SEGNDO PASSO PEGAR O QUE ELE DIGITOU
// ------- ADICIONEI O ASYNC PARA DIZER AO JS ESSA FUNCAO DENTRO DELA VOU EXECUTAR CODIGO ASSINCRONO OU SEJA CODIGO QUE NAO EH ORDENADO ----------
document.querySelector('.busca').addEventListener('submit', async (event)=>{
 //PREVINE O COMPORTAMENTO PADRAO QUE ESTE FORM DEVERIA TER
 // OU SEJA NAO VAI DEIXAR ENVIAR OS DADOS E A PAGINA RECARREGAR
    event.preventDefault();

// SEGNDO PASSO PEGAR O QUE ELE DIGITOU
//AGORA PEGAREI O QUE O USUARIO DIGITOU  SELECIONANDO O INPUT DO FORM ATRIBUINDO ELE A UMA VARIAVEL
// NESTE CASO O #searchInput E COLOCANDO O .VALUE EU TENHO ACESSO A INFORMACAO QUE ELE DIGITOU
// NAO DEIXAR ELE MANDAR BUSCAR ALGO EM BRANCO OU SEJA SEM DIGITAR
    let input = document.querySelector('#searchInput').value;
// SE INPUT ESTA DIFERENTE (!== '') DE VAZIO ISSO SIGNIFICA Q TEM ALGO DIGITADO
//ENTAO PEÇO PARA MOSTRAR A MENSAGEM
    if(input !==''){
        clearinfo(); //LIMPAR A DELTA E DEPOIS MOSTRA O CARREGANDO
        showWarning('Carregando...');
//URL DA API QUE BUSCA AS INFORMACOES COLOQUEI O ${(ENCODEURI(INPUT)} PARA ENCODIFICAR OS ESPACOS DO CAMPO DA BUSCA PARA ENVIAR A PAGINA DEPOIS ACRESCENTEI A CHAVE Q ESTA APOS &APPID COLOQUEI A METRIC QUE É A UNIDADE DE MEDIDA DA TEMPERATURA PARA O BRASIL CONFORME DOCUMENTACAO DA KEY DA API E COLOQUEI PARA LINGUAGEM PT BRASIL LANG
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=c9abf0f520cfba517fca8222ce1a940c&units=metric&lang=pt_br`;
    
// UMA VARIAVEL PARA GUARDAR OS RESULTADOS DETRNO DA FUNCAO FETCH PASSO A MINHA URL
// AWAIT SIGNIFICA PARA ESPERAR UM POUCO O RESULTADO        
        let results = await fetch(url); // <- FIZ MINHA REQUISICAO COM AWAIT ESPEROU O RSULTADO, ESPEROU E QUANDO DEU RESULTADO ELE ARMAZENOU NO RESULTS Q ESTA NA LINHA ABAIXO
// UMA VEZ QUE PEGUEI MINHA URL VOU AGORA PEGAR ESSES RESULTADO E VOU TRANSFORMAR EM UM OBJETO DO JS PARA EU PODER LER OS RESULTADOS DELE
        let json = await results.json(); // AKI ELE DIZ PEGA O RESULTADO E TRANSFORMA EM JSON E GUARDA NA VARIAVEL Q DECLAREI COMO JSON

// AGORA FOU FAZER UMA VALIDACAO PARA SE CASO O USUARIO DIGITAR O NOME DE UMA CIDADE ERRADO OU INEXISTENTE ELE O AVISARA        
// PARA ISSO FUI NA ABA DE INSPECAO CONSOLE E NETWORKING E VERIFIQUEI QUAL O NOME E O CODIGO QUE APARECE E VI Q COD 404 É QUANDO NAO ENCONTRA A CIDADE E COD 200 QUANDO A CIDADE EXISTE
        
        if(json.cod === 200){// SE JSON.COD FOR IGUAL A 200
            showInfo({
//TODO ESSE OBJETO MONTADO ABAIXO ESTOU MANDANDO PARA SHOWINFO
                name: json.name,//QUERO O NOME DA CIDADE
                country: json.sys.country,// QUERO O PAÍS
                temp: json.main.temp,//QUERO A TEMPERATURA
                tempIcon: json.weather[0].icon, //ICONE DO TEMPO DENTRO DE UM ARRAY
                windSpeed: json.wind.speed, //VELOCIDADE DO VENTO
                windAngle: json.wind.deg //ANGULO DO VENTO
// AS INFOR. A CIMA CONSEGUI PROCURANDO NA API, INPSECIONAR ELEMENTO > CONSOLE > NETWORK
            });
        } else {// SE NAO FOR IGUAL A 200
            clearinfo(); //FUNCAO PARA LIMPAR A BUSCA ANTERIOR ANTES DE MOSTRAR A MSG ABAIXO CASO O CONTRARIO A BUSCA ANTERIOR FICA NA TELA COM A MSG ABAIXO
            showWarning('Não encontramos esta localização.');
        }

    
    } 

});

//FUNCAO ESPECIFICA PARA MOSTRAS AS INFORMACOES ELA RECEBE MEU JSON
function showInfo(json){
    showWarning(''); //ESTOU SUBSTITUINDO A MENSAGEM ANTIGA Q ERA CARREGANDO...  ASSIM ELE NAO MOSTRA QUANDO TIVER UM RESULTADO

// AGORA VAMOS PREENCHER CADA RESULTADO
//  COMECAR PELO TITULO QUERO MOSTRAR NO HTML O RESULTADO O NOME E O PAIS ENTAO USAR TEMPLATE STRING `` ASPAS PARA A ESUQERDA 
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
//MOSTRAR A TEMPERATURA 
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
//VELOCIDADE DO TEMPO
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
//PARA MANIPULAR O ICONE DA TEMPERATURA TENHO ENTRAR EM TEMP E DENTRO DELE PEGO A IMG Q TENHO
// O SET.ATTRIBUE SERVE PARA PEGAR UM ATRIBUTO, NO CASO PEGUEI A SRC Q ESTAVA NO MEU BODY E PEDI E TROCA PELO JSON TEMP ICON
    document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
// AGORA FAZER A POSICAO DO VENTO ENTRANDO EM TRANSFORM
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

document.querySelector('.resultado').style.display = 'block';
}

function clearinfo(){
    showWarning(''); //VAI LIMPAR O WARNING 
    document.querySelector('.resultado').style.display = 'none';// VAI OCULTAR O RESULTADO
}   

// FUNCAO PARA APARECER ALGUM AVISO PARA O USUARIO
//PEGA A CLASS AVISO E SELECIONA A DIV DELE ATRAVES DO INNETHTML PARA APARECER NO BODY
function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}






// A API VAI DEVOLVER UM JSON OU SEJA UM OBJETO COM INFORMACOES SOBRE AQUELA CIDADE


