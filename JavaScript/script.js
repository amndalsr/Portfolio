document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.navegador a');
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
