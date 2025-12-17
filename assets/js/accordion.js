// ===== ACCORDION FUNCTIONALITY =====
class Accordion {
    constructor(container) {
        this.container = container;
        this.buttons = container.querySelectorAll('.accordion-button');
        this.contents = container.querySelectorAll('.accordion-content');
        this.progressItems = document.querySelectorAll('.story-progress-item');
        
        this.init();
    }
    
    init() {
        this.buttons.forEach((button, index) => {
            button.addEventListener('click', () => {
                this.toggle(index);
            });
        });
        
        // Adicionar funcionalidade aos indicadores de progresso
        this.progressItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.openByChapter(item.dataset.chapter);
            });
        });
        
        // Abrir primeiro item por padrão
        this.open(0);
    }
    
    toggle(index) {
        const button = this.buttons[index];
        const content = this.contents[index];
        const isActive = button.classList.contains('active');
        
        if (isActive) {
            this.close(index);
        } else {
            // Fechar todos os outros
            this.closeAll();
            // Abrir o selecionado
            this.open(index);
        }
    }
    
    open(index) {
        const button = this.buttons[index];
        const content = this.contents[index];
        
        button.classList.add('active');
        content.classList.add('active');
        
        // Calcular altura real do conteúdo
        const contentInner = content.querySelector('.accordion-content-inner');
        if (contentInner) {
            content.style.maxHeight = contentInner.scrollHeight + 'px';
        }
        
        // Atualizar indicador de progresso
        this.updateProgress(button.dataset.chapter);
        
        // Scroll suave para o item aberto
        setTimeout(() => {
            button.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);
    }
    
    close(index) {
        const button = this.buttons[index];
        const content = this.contents[index];
        
        button.classList.remove('active');
        content.classList.remove('active');
        content.style.maxHeight = '0';
    }
    
    closeAll() {
        this.buttons.forEach((button, index) => {
            this.close(index);
        });
        
        // Remover active de todos os indicadores
        this.progressItems.forEach(item => {
            item.classList.remove('active');
        });
    }
    
    openByChapter(chapter) {
        const button = document.querySelector(`[data-chapter="${chapter}"]`);
        if (button && button.classList.contains('accordion-button')) {
            const index = Array.from(this.buttons).indexOf(button);
            if (index !== -1) {
                this.closeAll();
                this.open(index);
            }
        }
    }
    
    updateProgress(chapter) {
        // Remover active de todos
        this.progressItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Adicionar active ao atual
        const currentItem = document.querySelector(`.story-progress-item[data-chapter="${chapter}"]`);
        if (currentItem) {
            currentItem.classList.add('active');
        }
    }
}

// ===== KEYBOARD NAVIGATION =====
function addKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        const activeButton = document.querySelector('.accordion-button.active');
        if (!activeButton) return;
        
        const allButtons = Array.from(document.querySelectorAll('.accordion-button'));
        const currentIndex = allButtons.indexOf(activeButton);
        
        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (currentIndex < allButtons.length - 1) {
                    accordion.closeAll();
                    accordion.open(currentIndex + 1);
                }
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                if (currentIndex > 0) {
                    accordion.closeAll();
                    accordion.open(currentIndex - 1);
                }
                break;
                
            case 'Home':
                e.preventDefault();
                accordion.closeAll();
                accordion.open(0);
                break;
                
            case 'End':
                e.preventDefault();
                accordion.closeAll();
                accordion.open(allButtons.length - 1);
                break;
        }
    });
}

// ===== READING PROGRESS =====
function addReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
    
    const progressStyle = document.createElement('style');
    progressStyle.textContent = `
        .reading-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: rgba(255, 255, 255, 0.1);
            z-index: 9999;
        }
        
        .reading-progress-bar {
            height: 100%;
            background: var(--gradient-secondary);
            width: 0%;
            transition: width 0.3s ease;
        }
    `;
    
    document.head.appendChild(progressStyle);
    document.body.appendChild(progressBar);
    
    const progressBarFill = progressBar.querySelector('.reading-progress-bar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBarFill.style.width = Math.min(scrollPercent, 100) + '%';
    });
}

// ===== AUTO-SAVE READING POSITION =====
function addReadingPosition() {
    const STORAGE_KEY = 'from-the-abyss-reading-position';
    
    // Salvar posição ao fazer scroll
    let saveTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            const position = {
                scrollY: window.scrollY,
                timestamp: Date.now(),
                page: window.location.pathname
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(position));
        }, 1000);
    });
    
    // Restaurar posição ao carregar
    window.addEventListener('load', () => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const position = JSON.parse(saved);
                // Só restaurar se for a mesma página e menos de 1 hora
                if (position.page === window.location.pathname && 
                    Date.now() - position.timestamp < 3600000) {
                    setTimeout(() => {
                        window.scrollTo({
                            top: position.scrollY,
                            behavior: 'smooth'
                        });
                    }, 500);
                }
            } catch (e) {
                console.log('Erro ao restaurar posição de leitura');
            }
        }
    });
}

// ===== INICIALIZAÇÃO =====
let accordion;

document.addEventListener('DOMContentLoaded', () => {
    const accordionContainer = document.querySelector('.accordion');
    
    if (accordionContainer) {
        accordion = new Accordion(accordionContainer);
        addKeyboardNavigation();
        addReadingProgress();
        addReadingPosition();
        
        console.log('Accordion inicializado com sucesso!');
    }
});

// ===== EXPORT PARA USO GLOBAL =====
window.AccordionController = {
    openChapter: (chapter) => {
        if (accordion) {
            accordion.openByChapter(chapter);
        }
    },
    
    closeAll: () => {
        if (accordion) {
            accordion.closeAll();
        }
    }
};
