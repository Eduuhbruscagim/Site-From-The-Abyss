# 🌐 From the Abyss - Web Portal

![Site Preview](assets/images/site-preview.png)

> **Status:** Online

## 📜 Sobre o Projeto

Este repositório contém a fonte oficial do jogo **From the Abyss**. O projeto foi desenvolvido como uma Single Page Application (SPA) conceitual, utilizando **Vanilla JavaScript** e **CSS3** moderno, sem dependência de frameworks pesados (como React ou Bootstrap) para garantir performance e controle total do DOM.

O site atua como hub central para distribuição do jogo, além de expandir a história através de narrativas interativas.

## 🔗 Demonstração

O projeto está hospedado e acessível publicamente:

👉 **[Acesse: from-the-abyss.vercel.app](https://from-the-abyss.vercel.app/)**

## ⚙️ Arquitetura e Funcionalidades

O desenvolvimento foi focado em práticas modernas de Front-end (Mobile-First):

* **HTML5 Semântico:** Estruturação correta (`<nav>`, `<main>`, `<article>`, `<footer>`) para SEO e acessibilidade.
* **CSS Architecture:**
    * Uso extensivo de **CSS Grid** e **Flexbox** para layouts fluidos independente do tamanho da tela.
    * **CSS Variables (`:root`)** para gerenciamento de tema (paleta de cores e tipografia).
    * Design totalmente responsivo com breakpoints manuais (Mobile 320px -> Desktop 1440px).
* **JavaScript (ES6+):**
    * Manipulação de DOM para componentes interativos (Accordions da História).
    * Menu Mobile com transições via manipulação de classes.
    * Otimização de eventos (Debounce/Smooth Scroll).

## 🛠️ Tecnologias Utilizadas

* **Markup:** HTML5
* **Estilização:** CSS3 (Custom Properties, Keyframes)
* **Scripting:** JavaScript (Vanilla)
* **Assets:** FontAwesome 6 (Ícones), Google Fonts (Tipografia)
* **Hospedagem:** Vercel

## 🗂 Estrutura de Arquivos

```text
/
├── index.html              # Landing Page (Home)
├── historia.html           # Lore e Componentes Accordion
├── mecanica.html           # Tutoriais e Cards
├── desenvolvedor.html    #   Créditos
└── assets/
    ├── css/                # Aparência do site
    ├── js/                 # Scripts (main logic, UI interactions)
    ├── images/             # Assets otimizados (WebP/PNG)
    └── fonts/              # Tipografias locais
