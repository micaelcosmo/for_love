document.addEventListener('DOMContentLoaded', () => {
    // 1. INJEÇÃO DE DADOS (CONFIG.JS)
    if (typeof APP_CONFIG !== 'undefined') {
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

        // Legenda da Foto (Nome dela)
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
    // 3. INICIALIZAÇÃO DO CARROSSEL (SWIPER)
    // -------------------------------------------
    // -------------------------------------------
    // 3.0 GERAÇÃO AUTOMÁTICA DE SLIDES (NOVO)
    // -------------------------------------------
    const swiperWrapper = document.getElementById('swiper-wrapper-dinamico');
    const totalImagens = 39; // Quantidade de fotos que você tem

    if (swiperWrapper) {
        for (let i = 1; i <= totalImagens; i++) {
            // Cria a div do slide
            const slideDiv = document.createElement('div');
            slideDiv.classList.add('swiper-slide');

            // Formata o número para ter zero à esquerda (01, 02... 10)
            // Se suas imagens renomeadas pelo Python ficaram img1.jpg, tire o padStart
            const numeroFormatado = i.toString().padStart(2, '0'); 
            
            // Cria a imagem
            const img = document.createElement('img');
            // Caminho da imagem (ajuste a extensão se for png)
            img.src = `img/img${numeroFormatado}.jpg`; 
            img.alt = `Momento Especial ${i}`;
            img.loading = "lazy"; // Importante para performance com 40 fotos

            // Monta o HTML
            slideDiv.appendChild(img);
            swiperWrapper.appendChild(slideDiv);
        }
    }

    // -------------------------------------------
    // 3.1 INICIALIZAÇÃO DO CARROSSEL (SWIPER)
    // -------------------------------------------
    // Mantenha seu código Swiper aqui embaixo, EXATAMENTE como já estava
    var swiper = new Swiper(".mySwiper", {
        // ... suas configurações ...
    });
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1, // Mobile: 1 slide por vez
        spaceBetween: 20, // Espaço entre os slides
        loop: true,       // Loop infinito
        speed: 1000,      // Velocidade da transição suave
        autoplay: {
            delay: 3000,  // Troca a cada 3 segundos
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        // Responsividade
        breakpoints: {
            640: {
                slidesPerView: 2, // Tablets pequenos
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3, // Desktop: 3 slides por vez
                spaceBetween: 30,
            },
        },
    });

    // -------------------------------------------
    // 4. CONTROLE DE ÁUDIO DE FUNDO
    // -------------------------------------------
    const music = document.getElementById('background-music');
    let audioStarted = false; 

    if (music) {
        music.muted = true;
        music.play().catch(error => {
            // Esperamos interação
        });

        function startAudio() {
            if (!audioStarted) {
                music.muted = false; 
                music.play().then(() => {
                    audioStarted = true;
                    removeAudioListeners();
                }).catch(error => {
                    music.muted = true;
                    music.play();
                    audioStarted = true;
                    removeAudioListeners();
                });
            }
        }

        function removeAudioListeners() {
            document.removeEventListener('click', startAudio);
            document.removeEventListener('touchstart', startAudio);
            document.removeEventListener('scroll', startAudio);
        }

        document.addEventListener('click', startAudio);      
        document.addEventListener('touchstart', startAudio); 
        document.addEventListener('scroll', startAudio);     
    }
});