document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.navegador .lista-links a');
    const conteudos = document.querySelectorAll('.conteudo');

    function mostrarConteudo(event) {
        event.preventDefault();

        links.forEach(function (link) {
            link.classList.remove('ativo');
        });

        this.classList.add('ativo');

        conteudos.forEach(function (conteudo) {
            conteudo.style.display = 'none';
        });

        const target = this.getAttribute('data-target');
        const conteudoAlvo = document.getElementById(target);

        conteudoAlvo.style.display = 'block';
    }

    links.forEach(function (link) {
        link.addEventListener('click', mostrarConteudo);
    });

    const linkFeed = document.querySelector('.navegador a[data-target="feed"]');
    linkFeed.click();
});

document.getElementById('show-form-btn').addEventListener('click', function () {
    const form = document.getElementById('contact-form');
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
});

document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var url = this.action;
    var data = new FormData(this);
    fetch(url, {
        method: 'POST',
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(function (response) {
        if (response.ok) {
            /*alert('Form submission successful');*/
            document.getElementById('contact-form').reset();
            document.getElementById('contact-form').style.display = 'none';
            return;
        }
        throw new Error('Form submission failed: ' + response.statusText);
    })
    .catch(function (error) {
        console.error('Error:', error);
    });
});


document.getElementById('themeButton').addEventListener('click', function() {
    var body = document.getElementById('body');
    var icon = document.getElementById('themeIcon');
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
});

var comentarios = [];
for (var i = 1; i <= 2; i++) {
    comentarios = [
        {
            nome: "Iverson",
            avatar: "/images/iverson-perfil.png",
            data: "26 Jun 2023",
            mensagem: "Amanda é realmente notável. Além de ser extremamente inteligente e criativa, ela também é uma talentosa desenvolvedora de software. Sua mente ágil e lógica afiada a tornam uma profissional excepcional nesse campo. Ela tem a capacidade de transformar linhas de código em soluções inovadoras, construindo aplicativos e programas que facilitam a vida das pessoas. É impressionante como ela consegue unir sua criatividade artística com sua habilidade técnica, trazendo à vida projetos únicos e cativantes. Amanda é uma verdadeira inspiração."
        },
        /*{
            nome: "Usuário 2",
            avatar: "/images/foto-perfil2.png",
            data: "25 Jun 2023",
            mensagem: "Mensagem 2"
        },*/
    ];
}

var comentariosPorPagina = 5;
var paginaAtual = 1;

function criarBoxComentario(comentario) {
    return `
    <div class="guestbook-box">
    <div class="pin">
        <img src="/icons/pin-icon.png" class="pinned">
        <p class="pin-text">Fixado</p>
    </div>
    <div class="post-comentario">
        <div class="post-perfil">
            <img src="${comentario.avatar}" class="post-foto">
            <h3>${comentario.nome}<img src="/icons/stars-icon.png" class="post-icon1"></h3>
            <img src="/icons/circle.png" class="circulo">
            <p>${comentario.data}</p>
        </div>
        <div class="comentario-info">
            <p>${comentario.mensagem}</p>
        </div>
    </div>
    <div class="icone">
        <img src="/icons/heart-icon.png">
    </div>
</div>
    `;
}

function atualizarComentarios() {
    var container = document.getElementById('guestbook-box-container');
    var inicio = (paginaAtual - 1) * comentariosPorPagina;
    var fim = inicio + comentariosPorPagina;
    var comentariosDaPagina = comentarios.slice(inicio, fim);

    container.innerHTML = '';
    for (var comentario of comentariosDaPagina) {
        container.innerHTML += criarBoxComentario(comentario);
    }
}

function criarItemPaginacao(pagina, ativa) {
    return `
        <div class="page-item ${ativa ? 'active' : ''}" onclick="irParaPagina(${pagina})">${pagina}</div>
    `;
}

function atualizarPaginacao() {
    var pagination = document.getElementById('pagination');
    var totalPaginas = Math.ceil(comentarios.length / comentariosPorPagina);

    pagination.innerHTML = '';
    for (var i = 1; i <= totalPaginas; i++) {
        pagination.innerHTML += criarItemPaginacao(i, i === paginaAtual);
    }
}

function irParaPagina(pagina) {
    paginaAtual = pagina;
    atualizarComentarios();
    atualizarPaginacao();
}

atualizarComentarios();
atualizarPaginacao();
