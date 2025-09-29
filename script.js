document.addEventListener('DOMContentLoaded', () => {
    // 1. VERIFICA SE O ARQUIVO DE CONFIGURAÇÃO FOI CARREGADO
    if (typeof APP_CONFIG !== 'undefined') {
        
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
        const figcaptionJu = document.getElementById('figcaption-ju');
        if (figcaptionJu) {
            figcaptionJu.textContent = `Aquele sorriso que ilumina meu mundo, minha Ju.`;
        }

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

    // -------------------------------------------
    // 3. CONTROLE DE ÁUDIO DE FUNDO (NOVA SEÇÃO)
    // -------------------------------------------
    const music = document.getElementById('background-music');

    if (music) {
        // 1. Tenta dar play no modo mudo (necessário para Autoplay em mobile/Chrome)
        music.muted = true;
        music.play().catch(error => {
            // console.warn("Autoplay falhou, esperando interação...", error);
        });

        // Função para desmutar e tentar tocar (após a primeira interação)
        function enableAudio() {
            // Só tenta se o áudio estiver pausado ou mudo
            if (music.paused || music.muted) { 
                music.muted = false;
                music.play().catch(error => {
                    // Trata o erro de permissão (mas a interação já ocorreu)
                });
            }
            
            // Remove os listeners após a primeira interação bem-sucedida ou tentativa
            document.removeEventListener('click', enableAudio);
            document.removeEventListener('scroll', enableAudio);
            document.removeEventListener('touchstart', enableAudio); 
        }

        // Adiciona listeners para desmutar o áudio na primeira interação do usuário
        document.addEventListener('click', enableAudio);
        document.addEventListener('scroll', enableAudio);
        document.addEventListener('touchstart', enableAudio); 
    }
});