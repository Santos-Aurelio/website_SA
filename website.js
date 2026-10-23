
/* SA FOTOGRAFIAS */

// MENU PARA TELEMÓVEIS
const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  const aberto = nav.classList.toggle("open");

  menuBtn.textContent = aberto ? "✕" : "☰";
  menuBtn.setAttribute("aria-expanded", String(aberto));
  menuBtn.setAttribute(
    "aria-label",
    aberto ? "Fechar menu" : "Abrir menu"
  );
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.textContent = "☰";
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// FILTROS DA GALERIA
const filtros = document.querySelectorAll(".filter");
const fotografias = [...document.querySelectorAll(".photo")];

filtros.forEach(botao => {
  botao.addEventListener("click", () => {
    filtros.forEach(f => f.classList.remove("active"));
    botao.classList.add("active");

    const categoria = botao.dataset.filter;

    fotografias.forEach(foto => {
      foto.hidden =
        categoria !== "todos" &&
        foto.dataset.category !== categoria;
    });
  });
});

// VISUALIZAÇÃO AMPLIADA
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");

const fechar = document.getElementById("lightbox-close");
const anterior = document.getElementById("lightbox-prev");
const seguinte = document.getElementById("lightbox-next");

let indiceAtual = 0;

function fotografiasVisiveis() {
  return fotografias.filter(foto => !foto.hidden)
    .flatMap(foto => [...foto.querySelectorAll(".photo-open")]);
}

function mostrarFotografia(indice) {
  const lista = fotografiasVisiveis();

  if (!lista.length) return;

  indiceAtual = (indice + lista.length) % lista.length;

  const botao = lista[indiceAtual];
  const imagem = botao.querySelector("img");

  lightboxImg.src = botao.dataset.full;
  lightboxImg.alt = imagem.alt;
  lightboxCaption.textContent = botao.dataset.title || imagem.alt;
}

document.querySelectorAll(".photo-open").forEach(botao => {
  botao.addEventListener("click", () => {
    const lista = fotografiasVisiveis();
    const indice = lista.indexOf(botao);

    mostrarFotografia(indice);

    if (!lightbox.open) {
      lightbox.showModal();
    }
  });
});

anterior.addEventListener("click", () => {
  mostrarFotografia(indiceAtual - 1);
});

seguinte.addEventListener("click", () => {
  mostrarFotografia(indiceAtual + 1);
});

fechar.addEventListener("click", () => {
  lightbox.close();
});

// Fechar ao clicar no fundo da janela
lightbox.addEventListener("click", evento => {
  if (evento.target === lightbox) {
    lightbox.close();
  }
});

// Navegação por teclado
document.addEventListener("keydown", evento => {
  if (!lightbox.open) return;

  if (evento.key === "ArrowRight") {
    mostrarFotografia(indiceAtual + 1);
  }

  if (evento.key === "ArrowLeft") {
    mostrarFotografia(indiceAtual - 1);
  }
});

// ANO AUTOMÁTICO NO RODAPÉ
document.getElementById("year").textContent =
  new Date().getFullYear();

// CONTACTO PELO WHATSAPP
// Substitui o número abaixo pelo número oficial da SA Fotografias.
// Usa o indicativo do país e apenas números, sem +, espaços ou traços.
const numeroWhatsApp = "258846003222";

const mensagem = encodeURIComponent(
  "Olá, SA Fotografias! Vi os vossos trabalhos no website " +
  "e gostaria de obter informações sobre os serviços fotográficos."
);

const whatsappLink = document.getElementById("whatsapp-link");

whatsappLink.href =
  `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;

whatsappLink.addEventListener("click", evento => {
  if (!/^\d{10,15}$/.test(numeroWhatsApp)) {
    evento.preventDefault();
    alert(
      "Configure o número oficial do WhatsApp no ficheiro script.js."
    );
  }
});

console.log("SA Fotografias: website carregado.");
