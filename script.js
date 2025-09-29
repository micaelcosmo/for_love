document.addEventListener('DOMContentLoaded', () => {
    // 1. VERIFICA SE O ARQUIVO DE CONFIGURAÇÃO FOI CARREGADO
    if (typeof APP_CONFIG !== 'undefined') {
        // const { NOME_DO_PARCEIRO, NOME_DA_PARCEIRA, DATA_INICIO_FORMATADA } = APP_CONFIG;

        // CORREÇÃO APLICADA AQUI: USAR document.title
        document.title = `Para a minha Ju`;

        // Título da Declaração (Data)
        document.getElementById('titulo-data').textContent = `Onde Tudo Começou (1 de Janeiro de 2025)`;
        
        // Texto da Declaração (Nome e Data)
        const declaracaoP = document.getElementById('texto-declaracao');
        if (declaracaoP) {
            // Injeta a data no texto base do HTML
            declaracaoP.innerHTML = declaracaoP.innerHTML
                .replace('Desde o dia,', `Desde o dia 1 de Janeiro de 2025,`)
                .replace('Você é a minha paz', `Ju, você é a minha paz`);
        }

        // Legenda da Foto (Nome dela)
        document.getElementById('figcaption-ju').textContent = `Aquele sorriso que ilumina meu mundo, minha Ju.`;

        // Assinatura Final (Seu Nome)
        document.getElementById('assinatura-final').textContent = `Seu Kaell`;
    }
    
    // 2. CÓDIGO DO INTERSECTION OBSERVER (FADE-IN/SCROLL)
    const fadeElements = document.querySelectorAll('.fade-element');
    const options = {
        root: null, 
        rootMargin: '5px',
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

});