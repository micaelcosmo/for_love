document.addEventListener('DOMContentLoaded', () => {
    // 1. INJEÇÃO DE DADOS (CONFIG.JS)
    if (typeof APP_CONFIG !== 'undefined') {
        // Esta parte usa valores fixos ('Ju', '1 de Janeiro de 2025', 'Kaell')
        // Se você tiver o arquivo config.js com as variáveis NOME_DA_PARCEIRA, etc.,
        // você pode remover os comentários da linha abaixo e usar as variáveis dinâmicas.
        // const { NOME_DO_PARCEIRO, NOME_DA_PARCEIRA, DATA_INICIO_FORMATADA } = APP_CONFIG;

        document.title = `Para a minha Ju`;

        // Subtítulo
        const subtituloJu = document.getElementById('subtitulo-ju');
        if (subtituloJu) {
            subtituloJu.textContent = `Uma pequena coleção de lembranças e sentimentos, só para Ju.`;
        }

        // Título da Declaração (Data)
        const tituloData = document.getElementById('titulo-data');
        if (tituloData) {
            tituloData.textContent = `Onde Tudo Começou (1 de Janeiro de 2025)`;
        }
        
        // Texto da Declaração (Nome e Data)
        const declaracaoP = document.getElementById('texto-declaracao');
        if (declaracaoP) {
            declaracaoP.innerHTML = declaracaoP.innerHTML
                .replace('Desde o dia,', `Desde o dia 1 de Janeiro de 2025,`)
                .replace('Você é a minha paz', `Ju, você é a minha paz`);
        }

        // Legenda da Foto (Nome dela) - Usando 'querySelectorAll' para atingir todas as ocorrências de um mesmo ID
        document.querySelectorAll('#figcaption-ju').forEach(el => {
            el.textContent = `Aquele sorriso que ilumina meu mundo, minha Ju.`;
        });

        // Assinatura Final (Seu Nome)
        const assinaturaFinal = document.getElementById('assinatura-final');
        if (assinaturaFinal) {
            assinaturaFinal.textContent = `Seu Kaell`;
        }
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
    // 3. CONTROLE DE ÁUDIO DE FUNDO (SOLUÇÃO MOBILE ROBUSTA)
    // -------------------------------------------
    const music = document.getElementById('background-music');
    let audioStarted = false; // Flag para garantir que o áudio só inicie uma vez

    if (music) {
        // Tenta dar play no modo mudo no início, por segurança e compatibilidade inicial.
        music.muted = true;
        music.play().catch(error => {
            // Se falhar (o que é comum em mobile), não há problema. Esperamos a interação.
        });

        // Função para iniciar o áudio (com som) no primeiro toque/interação
        function startAudio() {
            if (!audioStarted) {
                music.muted = false; // Tenta desmutar
                music.play().then(() => {
                    // Sucesso: Áudio iniciou com som. Remove os listeners.
                    audioStarted = true;
                    document.removeEventListener('click', startAudio);
                    document.removeEventListener('touchstart', startAudio);
                    document.removeEventListener('scroll', startAudio);
                }).catch(error => {
                    // Se o navegador ainda bloquear o som (por exemplo, no iOS em alguns casos):
                    // Tentamos tocar mudo, garantindo que pelo menos a música toque.
                    music.muted = true;
                    music.play();
                    audioStarted = true;
                    document.removeEventListener('click', startAudio);
                    document.removeEventListener('touchstart', startAudio);
                    document.removeEventListener('scroll', startAudio);
                });
            }
        }

        // Adiciona os listeners de eventos de interação mais comuns:
        document.addEventListener('click', startAudio);      // Clique (desktop)
        document.addEventListener('touchstart', startAudio); // Toque na tela (mobile - o mais importante)
        document.addEventListener('scroll', startAudio);     // Rolagem
    }
});