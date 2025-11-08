// Menu Mobile
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Fechar menu ao clicar em um link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Filtro da Galeria
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

// Função para filtrar a galeria
function filterGallery(category) {
  galleryItems.forEach((item) => {
    if (item.getAttribute("data-category") === category) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// Inicializa a galeria mostrando apenas Atletas
document.addEventListener("DOMContentLoaded", function () {
  filterGallery("atletas");

  // Garante que o botão Atletas esteja ativo
  filterButtons.forEach((button) => {
    button.classList.remove("active");
    if (button.getAttribute("data-filter") === "atletas") {
      button.classList.add("active");
    }
  });
});

// Eventos dos botões de filtro
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class de todos os botões
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Adiciona active class ao botão clicado
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");
    filterGallery(filter);
  });
});

// Mostrar/ocultar seção do responsável baseado na idade
const idadeSelect = document.getElementById("idade");
const responsavelSection = document.getElementById("responsavel-section");

function toggleResponsavelSection() {
  const idade = idadeSelect.value;

  // Se for menor de 18 anos, mostra a seção do responsável
  if (
    idade === "3-7" ||
    idade === "8-12" ||
    idade === "13-17" ||
    idade === "3-9" ||
    idade === "10-17"
  ) {
    responsavelSection.style.display = "block";

    // Torna os campos do responsável obrigatórios
    document.getElementById("responsavel_nome").required = true;
    document.getElementById("responsavel_parentesco").required = true;
    document.getElementById("responsavel_telefone").required = true;
    document.getElementById("responsavel_email").required = true;
  } else {
    responsavelSection.style.display = "none";

    // Remove a obrigatoriedade dos campos do responsável
    document.getElementById("responsavel_nome").required = false;
    document.getElementById("responsavel_parentesco").required = false;
    document.getElementById("responsavel_telefone").required = false;
    document.getElementById("responsavel_email").required = false;
  }
}

// Adiciona o evento de change ao select de idade
idadeSelect.addEventListener("change", toggleResponsavelSection);

// Atualiza o formulário de matrícula para validar os novos campos
const matriculaForm = document.getElementById("matricula-form");

matriculaForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validação básica
  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const endereco = document.getElementById("endereco").value;
  const telefoneEmergencia = document.getElementById(
    "telefone_emergencia"
  ).value;

  // Verifica se é menor de idade e se os campos do responsável estão preenchidos
  const idade = idadeSelect.value;
  const isMenorIdade =
    idade === "3-7" ||
    idade === "8-12" ||
    idade === "13-17" ||
    idade === "3-9" ||
    idade === "10-17";

  if (isMenorIdade) {
    const responsavelNome = document.getElementById("responsavel_nome").value;
    const responsavelTelefone = document.getElementById(
      "responsavel_telefone"
    ).value;

    if (!responsavelNome || !responsavelTelefone) {
      alert(
        "Para menores de 18 anos, é obrigatório preencher os dados do responsável."
      );
      return;
    }
  }

  if (nome && telefone && email && endereco && telefoneEmergencia) {
    alert("Matrícula enviada com sucesso! Entraremos em contato em breve.");
    matriculaForm.reset();
    responsavelSection.style.display = "none"; // Reseta a seção do responsável
  } else {
    alert("Por favor, preencha todos os campos obrigatórios.");
  }
});
