$(function () {

  $('.menu.superior').prepend("<div id='novo-menu'></div>");
  var body = $('body');
  let novoMenu = $('#novo-menu');
  let linksMenu = $('#cabecalho .menu.superior ul.nivel-dois li.com-filho > a');
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

    $('.breadcrumbs ul li:last-child strong').removeClass('cor-secundaria').addClass('cor-principal');

    if (isMobile) {
      $('#cabecalho a.icon-home').addClass("logo-mobile").removeClass('icon-home').html('<img src="https://res.cloudinary.com/tesseract/image/upload/v1628812861/hmed/logo-hmed-branco.png"></img>');
      $('#cabecalho > div.conteiner > div.row-fluid').addClass('hidden-phone');
    }
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

    let itemTodosProdutos = $("#cabecalho a[title='Todos os materiais']");
    itemTodosProdutos.find('i').replaceWith('');
    novoMenu.prepend(itemTodosProdutos);
    $('#cabecalho .menu.superior .nivel-um').remove()

    let btnMobile = '<a href="#" id="novo-btn-menu-mobile" class="atalho-menu botao principal"></a>';
    $('#cabecalho > div.conteiner > div.conteudo-topo.visible-phone > div > a').replaceWith(btnMobile);

    $('#novo-btn-menu-mobile').on('click', function() {
      $('.menu.superior').toggle();
    })

    $('.atalhos-mobile').removeClass('fundo-secundario').addClass('fundo-principal');
  }

  function insereSecaoVantagens(){
    let secaoVantagems = ' <ul id="secao-vantagens"> <li> <img src="https://res.cloudinary.com/tesseract/image/upload/v1628805453/hmed/Cart%C3%A3o_de_cr%C3%A9dito.png" alt="3 vezes sem juros ou até 12 vezes."> <div class="cor-principal"> <strong> 3x sem juros </strong> <br> ou até 12x </div> </li> <li> <img src="https://res.cloudinary.com/tesseract/image/upload/v1628805454/hmed/Boleto_e_Pix.png" alt="boleto ou pix com 3% de desconto"> <div class="cor-principal"> <span class="uppercase"> boleto ou pix </span> <br> <strong> 3% de desconto </strong> </div> </li> <li> <img src="https://res.cloudinary.com/tesseract/image/upload/v1628805450/hmed/Mapa_do_Brasil.png" alt="envio para todo o brasil"> <div class="cor-principal"> envio para <br> <strong>todo o brasil</strong> <br> </div> </li> <li> <img src="https://res.cloudinary.com/tesseract/image/upload/v1628805451/hmed/Frete_gr%C3%A1tis.png" alt=""> <div class="cor-principal"> <strong>frente grátis</strong> <br> acima de R$750,00 </div> </li> </ul> ';
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

    if(isHomepage) {
      insereSecaoVantagens();
    }

    else {
      $('#corpo .menu.lateral div.filtro.lista').each(function(item) {
        $(item).addClass("fundo-principal");
      });
    }
  }

  function criaNovoRodape() {
    const htmlRodape = '<div id="novoRodape"> <div class="container-esquerda fundo-principal"> <div class="logo-container"> <img src="https://res.cloudinary.com/tesseract/image/upload/v1628812861/hmed/logo-hmed-branco.png" alt="logo HMED"> </div> <div class="sobre-container"></div> <div class="fale-conosco-container"></div> </div> <div class="container-direita fundo-secundario"> <div class="categorias-container"></div> <div class="conteudo-pagamento-selos-container"> <div class="conteudo-container"></div> <div class="pagamento-container"></div> <div class="selos-container"></div> </div> </div> </div>';
    $('#rodape').hide();
    $(htmlRodape).insertAfter('#rodape');

    let itemSobre = $('#rodape .sobre-loja-rodape');
    let itemCategorias = $('#rodape .links-rodape-categorias');
    let itemPaginas = $('#rodape .links-rodape-paginas');
    let itemPagamento = $('#rodape > div.pagamento-selos div.span4.pagamento');
    let itemSelos = $('#rodape > div.pagamento-selos div.span4.selos ul');

    $('#novoRodape .container-esquerda .sobre-container').append(itemSobre);
    $('#novoRodape .container-direita .categorias-container').append(itemCategorias);
    $('#novoRodape .container-direita .conteudo-container').append(itemPaginas);
    $('#novoRodape .container-direita .pagamento-container').append(itemPagamento);
    $('#novoRodape .container-direita .selos-container').append(itemSelos);


    let itemContato = $('#rodape > div.institucional.fundo-secundario > div > div > div > div > div');
    $('#novoRodape .container-esquerda .fale-conosco-container').append(itemContato);
  }



  function aplicaEstilos() {
    body.append("<style> .uppercase { text-transform: uppercase; } /** HOMEPAGE BUSCA **/ .busca.borda-alpha { background: #fff; border: none; } .busca input { width: 90%; } .busca .botao-busca { right: -21px; } /** HOMEPAGE CARRINHO **/ .carrinho.vazio>a span { line-height: 30px; font-weight: 100; text-transform: uppercase; } .carrinho>a i { width: 30px; height: 30px; line-height: 33px; font-size: 18px; } /** MENU **/ #novo-menu { display: grid; grid-template-columns: repeat(5, 1fr); text-align: center; align-items: center; row-gap: 0.4rem; margin: 2rem 0; } #novo-menu a { font-size: 1.4em; font-family: 'open sans' ,sans-serif; color: #5d616d; min-height:40px; align-self: baseline; } #novo-menu a:hover { color: #2b5263; font-weight: 500; } #novo-menu a:first-child { text-transform:uppercase; } #novo-menu a div.pontinho-menu { height: 7px; width: 7px; background-color: #bbb; border-radius: 50%; display: inline-block; margin-bottom: 2px; margin-right: 8px; } /** CORPO DA PAGINA && LISTAGEM DE PRODUTOS **/ body.pagina-inicial #corpo .coluna.esquerda { display: none; } .listagem .titulo-categoria { font-size: 2em; padding: 0; } .listagem .titulo-categoria:hover { background: transparent; } .listagem .produtos-carrossel .listagem-linha li .listagem-item:hover { border: 1px solid #cccc; box-shadow: 0px 0px 10px -3px rgb(0 0 0 / 40%); } .listagem .listagem-item:hover .acoes-produto { position: relative; } .listagem .listagem-item .nome-produto { font-weight:bold; } .listagem .produtos-carrossel .listagem-linha li .listagem-item { padding-bottom: 3rem; } .listagem-item:hover .botao.principal.botao-comprar { background-color: #2B5263; width: 80%; font-weight: bold; padding: 8px; font-size: 1.3em; } /** SECAO VANTAGENS **/ #secao-vantagens { display: flex; max-width: 90%; justify-content: space-around; font-size: 1.5em; margin: 0 auto 2rem; } #secao-vantagens li { display: flex; justify-content: center; align-items: center; } #secao-vantagens img { max-width: 80px; margin-right: 5px; } #secao-vantagens strong { text-transform: uppercase; } #corpo .breadcrumbs { border-style: solid; border-width: 1px 0; padding: 10px 0; margin: 0 0 20px; display: flex; justify-content: left; align-items: center; } #corpo .breadcrumbs ul { margin: 0; display: flex; align-items: center; } /** PAGINA DE CATEGORIA (MENU LATERAL) **/ #corpo .breadcrumbs ul li * { font-size: 1.3em; padding: 0 10px; } #corpo .menu.lateral .nivel-um>li.borda-principal>a { padding: 0 20px; background-color: #254756; } #corpo .menu.lateral li>a i { display: none!important; } #corpo .menu.lateral .nivel-um>li.borda-principal>a strong { color: #fff } #corpo .menu.lateral .filtro h4 { margin-top: 0; overflow: hidden; padding-bottom: 10px; border-bottom: 1px solid rgba(0,0,0,0.1); color: white; padding: 10px 10px; font-size: 1.4em; font-weight: bold; } #corpo .menu.lateral .filtro .borda-alpha { background: white; } /** NOVO RODAPE **/ #novoRodape { width: 100%; display: flex; } #novoRodape .container-esquerda { width: 35%; display: flex; flex-direction: column; justify-content: center; align-items: center; } #novoRodape .container-esquerda .logo-container img { max-width: 150px; } #novoRodape .container-direita { display:flex; width: 65%; } #novoRodape .container-direita .categorias-container, #novoRodape .container-direita .conteudo-pagamento-selos-container { display: flex; flex-direction: column; align-items: start; padding: 1.5rem; } #novoRodape .container-direita .selos-container { display: flex; } #novoRodape .container-direita .selos-container ul { display: flex; width: 100%; justify-content: center; align-items: center; } #novoRodape .container-direita .selos-container ul li { margin: 1rem; } /** RESPONSIVIDADE MOBILE < 900PX **/ @media all and (min-width:1240px) { .pagina-inicial div#listagemProdutos { max-width: 1240px; width: 120%; margin-left: -10%; } } /** RESPONSIVIDADE MOBILE < 900PX **/ @media all and (max-width:900px) { #novo-menu { display: block; text-align: left; margin: 2rem 1rem; } #novo-menu a { font-size: 1.2em; } #novo-menu a:first-child { border-top: 0; } #novo-menu a~a { border-top: 1px solid #888; padding-top: 10px; margin-top: 10px; margin: 4px 0px; display: flex; justify-content: left; align-items: center; } #cabecalho .menu.superior { background-color: transparent; border: 1px solid #888; border-radius: 10px; margin: 1rem 0rem; } .conteudo-topo .busca-mobile { background-color: #fff; margin-top: 10px; } .conteudo-topo .busca-mobile .atalho-menu { background: url(https://res.cloudinary.com/tesseract/image/upload/v1628805448/hmed/Menu_mobile.png) no-repeat; background-size: 80%; border: 0; height: 32px; width: 25px; } .busca .botao-busca { height: auto; top: 0; right: 36px; line-height: 25px; background-color: #2B5263; } .busca input { width: 70%; } .botao-busca.icon-search:before { font-size: 23px; } .conteiner .logo { display:none; } #cabecalho .atalhos-mobile { opacity: 1!important; } #cabecalho .atalhos-mobile li { float: right; height: 100%; margin-top: 0px; line-height: 68px; border-right: 1px solid rgba(0, 0, 0, 0.2); border-left: 1px solid rgba(255, 255, 255, 0.2); margin-bottom: -10px; } #cabecalho .atalhos-mobile li.vazia { display: none; } #cabecalho .atalhos-mobile li:first-child { border: none; float: left; } #cabecalho .atalhos-mobile li:first-child a { top: 0; } #cabecalho .atalhos-mobile a img { width:78px; } /** BANNER / SLIDES **/ .flexslider { border-radius:0; } .flexslider .slides img { height: 210px; width: auto; object-fit: cover; } #secao-vantagens { display: grid; grid-template-columns: 1fr 1fr; font-size: 0.9em; margin-bottom: 2rem; margin-left: 0px; } #secao-vantagens li { display: flex; justify-content: center; align-items: center; padding: 5px 0px; } #secao-vantagens img { max-width: 45px; margin-right: 5px; } .listagem .titulo-categoria { text-align:center; font-size:1.5em; display: flex; justify-content: center; } .listagem .titulo-categoria strong:after { content: '.'; display: block; height: 5px; width: 70%; margin: 0px auto; text-indent: -9999px; border-bottom: 0px solid #999; } .listagem .listagem-item .nome-produto { font-weight:bold; } .listagem-item .botao.principal.botao-comprar { background-color: #2B5263; padding: 8px 0px; width: 100%; text-align: center; border-radius: 10px; } .acoes-produto-responsiva.visible-phone { position: relative; margin-top: 1rem!important; width: 100%; text-align: center; } .acoes-produto-responsiva.visible-phone a { width: 90%; text-align: center; border-radius: 7px; padding: 10px; } .acoes-produto-responsiva.visible-phone a span.titulo { font-weight: bold; text-transform: uppercase; } .info-produto { text-align: center; font-size: 1.3em; } .bandeiras-produto span.fundo-principal.bandeira-promocao { font-size: 1.1em; padding: 3px 20px; border: none; } .listagem .listagem-linha:first-child { padding: 0; margin: 0; border: 0; } .listagem .listagem-linha li { margin-top: -10px; } .listagem .imagem-produto { min-height: 240px; } .listagem .imagem-produto img { max-width: 160%; max-height: 160%; zoom: 120%; top: -10%; left: 0%; margin: 10px auto; } #corpo .breadcrumbs { border: 0; } #corpo .breadcrumbs ul li * { font-weight: 700; font-size: 0.4em; font-weight: 400; } #corpo .breadcrumbs ul li { display:block!important; border-left: 1px solid rgba(0,0,0,0.1); } #corpo .breadcrumbs ul li:last-child * { font-weight: 600; } } </style");
      }

    ajustaCabecalho();
    ajustaNovoMenu();
    ajustaCorpo();
    aplicaEstilos();
    criaNovoRodape();

    if (isMobile) {
      $('.menu.superior').toggle();
    }

  });
