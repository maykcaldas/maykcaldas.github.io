
/*Functions for the 'destaque' page*/
function mostraDestaque(index){
    var destaques = [   ["Death Note", '../img/DeathNoteA110.jpg', ["Série completa","Formato DVD - 5 discos","90.00","85.00"]],
                        ["Naruto Gold", '../img/NarutoGoldA110.jpg', ["Mangá em Protuguês", "55 volumes", "1100.00","1000.00"]],
                        ["Naruto Shippuden", '../img/NarutoFigA110.jpg', ["Action figure em PVC","","250.00","210.00"]]
                    ];
                 
    var janela=window.open("", "", "width=400,height=400");
    
    janela.document.write("<html><head><title>Nova Janela</title>");
    janela.document.write("<link rel=stylesheet type='text/css' href='../css/style.css'></head>");
    janela.document.write("<body>");
    janela.document.write("<h3 class='tituloDestaq'>"+destaques[index][0]+"</h3>");
    janela.document.write("<div><img class='imgDestaq' src="+destaques[index][1]+"></div>");
    janela.document.write("<ul class='itemDesProd' >");
    janela.document.write("<li>"+destaques[index][2][0]+"</li>");
    janela.document.write("<li>"+destaques[index][2][1]+"</li>");
    janela.document.write("<li>Preço: de R$<span class='precoVelho'>"+destaques[index][2][2]+"</span> </li>");
    janela.document.write("<li>por R$<span class='preco'>"+destaques[index][2][3]+"</span></li>");
    janela.document.write("</ul>");
    janela.document.write("<div><input id='destaqFecha' type='button' value='FECHAR' onClick='window.close();'></div>");
    janela.document.write("</body></html>");
}

/*Functions for the 'catalogo' page*/
function mostraCatalogo(index){

    // O PDF sugere que o container da imagem tenha altura e largura de 180px.
    // Mas as imagens fornecidas são de 300x300. Então formatei pra 300x300px.

    var catalogoProds=[['../img/NarShipB1T01A300.jpg',"R$ 60,00"],
                    ['../img/NarShipB2T01A300.jpg',"R$ 60,00"],
                    ['../img/AOT1-4A300.jpg',"R$ 130,00"],
                    ['../img/AOT5-8A300.jpg',"R$ 130,00"],
                    ['../img/NarutoBoxPart1A300.jpg',"R$ 600,00"],
                    ['../img/RyukFigA300.jpg',"R$ 250,00"]
                      ];

    document.getElementById("fotoCatalogo").innerHTML="<img src="+catalogoProds[index][0]+">";
    document.getElementById("precoCatalogo").innerHTML="Preço: <span>"+catalogoProds[index][1]+"</span>";
}

/*Functions for the 'compras' page*/
function calculaDV(num){
    var resto = 0, soma = 0;
    for (i = 2; i < 11; i++){
        soma = soma + ((num % 10) * i);
        num = parseInt(num / 10);
    }
    resto = (soma % 11);
    return (resto > 1) ? (11 - resto) : 0;
}

function checaCPF(cpf){
    // Checar se a entrada tem 11 caracteres
    if(cpf.value.length != 11){
        alert("CPF tem de ter 11 dígitos");
        return;
    }
    else if(cpf.value.length == 11){
        // Checar se todos os caracteres são dígitos (estão entre 0 e 9). 
        // Comparando pela tabela de string
        for (c=0; c<cpf.value.length; c++){
            if (!(cpf.value[c]>='0' && cpf.value[c]<='9')){
                alert('CPF só pode ter dígitos. Caracter "' + cpf.value[c] + '" inválido');
                return;
            }
        }

        // Checar os dígitos verificadores
        var digitosVer = cpf.value.slice(-2, cpf.value.length);
        var identCPF = cpf.value.slice(0, 9);
        primeiro_digito = calculaDV(identCPF);
        segundo_digito = calculaDV(identCPF * 10 + primeiro_digito);
        if (digitosVer[0] != primeiro_digito || digitosVer[1] != segundo_digito){
            alert("Digitos verificadores inválidos!");
            return;
        }
    }
}

function addCompra(){
    // Selecionando toda a seleção pra ter informação da string contida na opção escolhida
    var lista = document.getElementById("prod");
    var produto = lista.value;

    var db = {  'Death Note - DVD - Completo'   :'85.00',
                'Naruto Shippuden T01 Box 01'   :'60.00',
                'Naruto Shippuden T01 Box 02'   :'60.00',
                'Naruto Gold - 55 Vol.'         :'1000.00',
                'Attack on Titan - Vol 1-4'     :'130.00',
                'Attack on Titan - Vol 5-8'     :'130.00',
                'Naruto Box P01 Vol 1-27'       :'600.00',
                'Naruto Shippuden - PVC'        :'210.00',
                'Ryuk - Death Note - PVC'       :'250.00',
    }

    // Se a seleção for o primeiro elemento do array de opções, ele é o '--------'
    if(produto == "0"){
        alert("Nenhum produto selecionado");
    }
    else{
        compras = document.getElementById("listaCompras");
        valor   = document.getElementById("precoCompras");
 
        compras.innerHTML += lista.options[produto].innerHTML+"\n";
        if (valor.value==""){
            valor.value = parseFloat(db[lista.options[produto].innerHTML]).toFixed(2);
        }
        else{
            valor.value = (parseFloat(valor.value) + parseFloat(db[lista.options[produto].innerHTML])).toFixed(2);
        }
    }
}

function clean(form){
    // var form = document.getElementById("compraForm");

    for (entry=0; entry<form.elements.length; entry++){
        if(form.elements[entry].type=="text" || form.elements[entry].type=="number" || form.elements[entry].type=="tel"){
            form.elements[entry].value="";
            // console.log(form.elements[entry].type);
        }
        else if(form.elements[entry].type=="select-one"){
            form.elements[entry].value="0";
        }
        console.log(form.elements[entry].type);
        
    }
    
    // document.getElementById("precoCompras").value="";
    // alert("LIMPOUS");
}