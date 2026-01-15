// Smooth scroll para a seção de oferta
function scrollToOffer() {
    const offerSection = document.getElementById('offer');
    offerSection.scrollIntoView({ behavior: 'smooth' });
}

// Toggle FAQ
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Fecha todos os itens
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Abre o item clicado se não estava ativo
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Função de compra (simulação)
function handlePurchase() {
    const modal = document.getElementById('successModal');
    modal.classList.add('active');
    
    // Simula redirecionamento após 2 segundos
    setTimeout(() => {
        // Aqui você integraria com seu gateway de pagamento
        console.log('Redirecionando para página de pagamento...');
        // window.location.href = 'https://sua-pagina-de-checkout.com';
    }, 2000);
}

// Fechar modal
function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('active');
}

// Fechar modal ao clicar fora
window.addEventListener('click', (e) => {
    const modal = document.getElementById('successModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Animação de scroll reveal
function revealOnScroll() {
    const elements = document.querySelectorAll('.benefit-card, .testimonial-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Inicializa animações
window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.benefit-card, .testimonial-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    revealOnScroll();
});

window.addEventListener('scroll', revealOnScroll);

// Contador de visitantes (simulado)
function updateVisitorCount() {
    const count = Math.floor(Math.random() * 50) + 150;
    console.log(`Visitantes online: ${count}`);
}

// Atualiza contador a cada 5 segundos
setInterval(updateVisitorCount, 5000);

// Efeito de urgência (opcional)
function createUrgencyTimer() {
    const offerBadge = document.querySelector('.offer-badge');
    let minutes = 15;
    let seconds = 0;
    
    const timer = setInterval(() => {
        seconds--;
        
        if (seconds < 0) {
            minutes--;
            seconds = 59;
        }
        
        if (minutes < 0) {
            clearInterval(timer);
            return;
        }
        
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        offerBadge.textContent = `OFERTA EXPIRA EM ${timeString}`;
    }, 1000);
}

// Descomente para ativar o timer de urgência
// createUrgencyTimer();

// Tracking de eventos (para analytics)
function trackEvent(eventName, eventData) {
    console.log('Event:', eventName, eventData);
    // Aqui você integraria com Google Analytics, Facebook Pixel, etc.
    // gtag('event', eventName, eventData);
}

// Rastrear cliques nos botões CTA
document.querySelectorAll('.cta-button-primary, .cta-button-header').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('cta_click', {
            button_text: button.textContent.trim(),
            button_location: button.className
        });
    });
});

// Rastrear visualização das seções
const sections = document.querySelectorAll('section');
const observerOptions = {
    threshold: 0.5
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            trackEvent('section_view', {
                section: entry.target.className
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});
