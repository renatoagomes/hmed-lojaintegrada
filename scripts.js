$('.menu.superior').prepend("<div id='novo-menu'></div>");
var body = $('body');
let novoMenu = $('#novo-menu');
let linksMenu = $('.menu.superior ul.nivel-dois li.com-filho > a');
let coresCategorias = {
      "Ácido Poliglicólico / PGA / Vicryl" :"#FF0000",
      "Catgut Cromado"                     :"#FF0000",
      "Catgut Simples"                     :"#FF0000",
      "Nylon"                              :"#FF0000",
      "Nylon Incolor"                      :"#FFFF00",
      "PGC 25 / Monocryl"                  :"#FFFF00",
      "Polidioxanona / PDS / PDO"          :"#00FF00",
      "Poliéster / Mersilene"              :"#00FFFF",
      "Polipropileno / Prolene"            :"#0000FF",
      "Seda"                               :"#0000FF",
      'corPadrao'                          :"#cccccc" 
};

/** Constante para determinar se é mobile antes de aplicar alterações de layout/comportamento **/
var isMobile = window.innerWidth < 900;

/** Constante para determinar se é a homepage **/
var isHomepage = body.hasClass('pagina-inicial');
var isCategoria = body.hasClass('pagina-categoria');
var isProduto = body.hasClass('pagina-produto');

function ajustaCabecalho() {
  let novoBemVindo = "<strong>Bem-vindo, <span class=\"cor-principal\">identifique-se</span> </strong> <br> para fazer pedidos";
  $('#cabecalho a.bem-vindo').html(novoBemVindo);
  $('.botao.botao-busca').removeClass('fundo-secundario').addClass('fundo-principal');

  $('.acoes-conta i.fundo-principal').each( function (_, iconeAcaoConta) {
    $(iconeAcaoConta).removeClass('fundo-principal').addClass('cor-principal');
  });
}

function getCorCategoria(text) {
  for (let categoria in coresCategorias) {
    if (text.match(categoria)) {
      return coresCategorias[categoria];
    }
  }
  return coresCategorias.corPadrao;
}

function ajustaNovoMenu() {
  linksMenu.each(function (idx, el) {
    let corCategoria = getCorCategoria(el.innerText);
    $(el).find('i').replaceWith('<div class="pontinho-menu" style="background-color:'+corCategoria+'"></div>');
    novoMenu.append(el);
  });

  let itemTodosProdutos = $("a[title='Todos os materiais']");
  itemTodosProdutos.find('i').replaceWith('');
  novoMenu.prepend(itemTodosProdutos);
  $('.menu.superior .nivel-um').remove()

  let btnMobile = '<a href="#" id="novo-btn-menu-mobile" class="atalho-menu botao principal">&nbsp;<i class="fa fa-bars"></i></a>';
  $('#cabecalho > div.conteiner > div.conteudo-topo.visible-phone > div > a').replaceWith(btnMobile);

  $('#novo-btn-menu-mobile').on('click', function() {
    $('.menu.superior').toggle();
  })

  $('.atalhos-mobile').removeClass('fundo-secundario').addClass('fundo-principal');
}

function insereSecaoVantagens(){
let secaoVantagems = '<ul id="secao-vantagens"> <li> <img src="https://via.placeholder.com/80" alt="3 vezes sem juros ou até 12 vezes."> <div> <strong class="cor-principal"> 3x sem juros </strong> <br> ou até 12x </div> </li> <li> <img src="https://via.placeholder.com/80" alt="boleto ou pix com 3% de desconto"> <div> <span class="uppercase"> boleto ou pix </span> <br> <strong class="cor-principal"> 3% de desconto </strong> </div> </li> <li> <img src="https://via.placeholder.com/80" alt="envio para todo o brasil"> <div> envio para <br> <strong class="cor-principal">todo o brasil</strong> <br> </div> </li> <li> <img src="https://via.placeholder.com/80" alt=""> <div> <strong class="cor-principal">frente grátis</strong> <br> acima de R$750,00 </div> </li> </ul>';
  $('#corpo').prepend(secaoVantagems);
}

function ajustaCorpo() {
  if (isHomepage) {
    $('#corpo .conteudo').removeClass('span9').addClass('span11');
  }

  $('#listagemProdutos .titulo-categoria').each(function(_, el) {
      $(el).removeClass('borda-principal');
  });
  $('#listagemProdutos .listagem-item .nome-produto').each(function(_, el) {
    $(el).removeClass('cor-secundaria').addClass('cor-principal');
  });

  $('#listagemProdutos .listagem-item .botao.principal.botao-comprar').each(function(_, el) {
    $(el).html('Ver detalhes');
  });
  
  insereSecaoVantagens();
}

function aplicaEstilos() {
  body.append("<style> .uppercase { text-transform: uppercase; } /** HOMEPAGE BUSCA **/ .busca.borda-alpha { background: #fff; border: none; } .busca input { width: 90%; } .busca .botao-busca { right: -21px; } /** HOMEPAGE CARRINHO **/ .carrinho.vazio>a span { line-height: 30px; font-weight: 100; text-transform: uppercase; } .carrinho>a i { width: 30px; height: 30px; line-height: 33px; font-size: 18px; } /** MENU **/ #novo-menu { display: grid; grid-template-columns: repeat(5, 1fr); text-align: center; align-items:center; row-gap: 1rem; margin: 2rem 0; } #novo-menu a { font-size: 1.4em; font-family: 'open sans' ,sans-serif; color: #5d616d; } #novo-menu a:hover { color: #2b5263; font-weight: 500; } #novo-menu a:last-child { text-transform:uppercase; } #novo-menu a div.pontinho-menu { height: 7px; width: 7px; background-color: #bbb; border-radius: 50%; display: inline-block; margin-bottom: 2px; margin-right: 3px; } /** CORPO DA PAGINA && LISTAGEM DE PRODUTOS **/ body.pagina-inicial #corpo .coluna.esquerda { display: none; } .listagem .titulo-categoria { font-size: 2em; padding: 0; } .listagem .titulo-categoria:hover { background: transparent; } .listagem .produtos-carrossel .listagem-linha li .listagem-item:hover { border: 1px solid #cccc; box-shadow: 0px 0px 10px -3px rgb(0 0 0 / 40%); } .listagem-item:hover .acoes-produto { bottom: 0%; } .listagem-item .nome-produto { font-weight:bold; } .listagem .produtos-carrossel .listagem-linha li .listagem-item { padding-bottom: 3rem; } .listagem-item:hover .botao.principal.botao-comprar { background-color: #2B5263; width: 80%; font-weight: bold; padding: 8px; font-size: 1.3em; } /** SECAO VANTAGENS **/ @media all and (min-width:900px) { #secao-vantagens { display: flex; width: 100%; justify-content: space-around; font-size: 1.5em; margin-bottom:2rem; } } #secao-vantagens li { display: flex; justify-content: center; align-items: center; } #secao-vantagens img { max-width: 80px; margin-right: 5px; } #secao-vantagens strong { text-transform: uppercase; } /** RESPONSIVIDADE MOBILE < 900PX **/ @media all and (max-width:900px) { #novo-menu { display: block; text-align: left; margin: 2rem 1rem; } #novo-menu a { font-size: 1.2em; } #novo-menu a~a { border-top: 1px solid #888; padding-top: 10px; margin-top: 10px; } #cabecalho .menu.superior { background-color: transparent; border: 1px solid #888; border-radius: 10px; margin: 1rem 0rem; } .conteudo-topo .busca-mobile { background-color: #fff; } .busca .botao-busca { height: auto; top: 0; right: 30px; line-height: 28px; background-color: #2B5263; } .busca input { width: 70%; } .conteiner .logo { display:none; } /** BANNER / SLIDES **/ .flexslider .slides img { height: 230px; width: auto; object-fit: cover; } #secao-vantagens { display: grid; grid-template-columns: 1fr 1fr; font-size: 1em; margin-bottom: 2rem; margin-left: 5px; } #secao-vantagens li { display: flex; justify-content: center; align-items: center; padding: 5px 0px; } } </style");
}

ajustaCabecalho();
ajustaNovoMenu();
ajustaCorpo();
aplicaEstilos();

if (isMobile) {
  $('.menu.superior').toggle();
}


