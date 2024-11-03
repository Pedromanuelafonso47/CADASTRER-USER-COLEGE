//organização peguei os inputs e armazenei eles em Arraws

const dados = {
  nome: document.querySelector("#colege"),
  sala: document.querySelector("#colege1"),
  idade: document.querySelector("#colege2")
};
//Peguei os botãos 
const button = document.querySelector("#submit");
const editarButton = document.querySelector("#submit2");
const apagarButton = document.querySelector("#submit1");
const listButton = document.querySelector("#listAll"); // Button for listing all students

//Eventos Dom de quando o muser Entrar e Sair 
listButton.addEventListener("mouseenter",entrar);
listButton.addEventListener("mouseout" ,sair);
function entrar() {
  let a=document.querySelector("#listAll")
  a.style.background="#17A2B8"

}
function sair() {
  let a=document.querySelector("#listAll")
  a.style.background="#212529"

}

//Peguei os span onde o Js ENTRARA pARA APRESENTAR OS RESULTADOS 
const spans = {
  name: document.querySelector("#displayName"),
  sala: document.querySelector("#displaySala"),
  idade: document.querySelector("#displayIdade")
};

const listaAlunos = []; // Array para armazenar alunos registrados
let alunoAtual = null; // o aluno atual que está sendo editado

class Aluno {
  constructor(nome, sala, idade) {
    this.nome = nome;
    this.sala = sala;
    this.idade = idade;
  }

  exibirNoHTML() {
    spans.name.innerText = this.nome;
    spans.sala.innerText = this.sala;
    spans.idade.innerText = this.idade;
  }
}

// Função para adicionar ou atualizar um aluno
button.addEventListener("click", (event) => {
  event.preventDefault();

  if (!dados.nome.value || !dados.sala.value || !dados.idade.value) {
    alert("Preencha todos os campos!");
    return;
  }

  const aluno = new Aluno(dados.nome.value, dados.sala.value, dados.idade.value);

  if (alunoAtual !== null) {
    listaAlunos[alunoAtual] = aluno;
    alunoAtual = null;
    button.innerText = "Enviar";
  } else {
    listaAlunos.push(aluno);
  }

  atualizarExibicao();
  limparCampos();
});

// Função para atualizar a exibição do último aluno registrado/atualizado
function atualizarExibicao() {
  if (listaAlunos.length > 0) {
    listaAlunos[listaAlunos.length - 1].exibirNoHTML();
  }
}

// Função para limpar os campos do formulário
function limparCampos() {
  dados.nome.value = "";
  dados.sala.value = "";
  dados.idade.value = "";
}

// Função para editar o último aluno,
editarButton.addEventListener("click", () => {
  if (listaAlunos.length === 0) {
    alert("Não há alunos cadastrados para editar.");
    return;
  }

  alunoAtual = listaAlunos.length - 1;
  const aluno = listaAlunos[alunoAtual];
  dados.nome.value = aluno.nome;
  dados.sala.value = aluno.sala;
  dados.idade.value = aluno.idade;
  button.innerText = "Atualizar";
});

// Função para excluir o último aluno
apagarButton.addEventListener("click", () => {
  if (listaAlunos.length === 0) {
    alert("Não há alunos cadastrados para apagar.");
    return;
  }

  listaAlunos.pop();
  limparCampos();

  if (listaAlunos.length > 0) {
    listaAlunos[listaAlunos.length - 1].exibirNoHTML();
  } else {
    Object.values(spans).forEach(span => span.innerText = "");
  }
});

// função para listar todos os alunos,Limpar lista anterior
listButton.addEventListener("click", () => {
  const alunoList = document.querySelector("#alunoList");
  alunoList.innerHTML = ""; // Linpar Lista 

  listaAlunos.forEach((aluno, index) => {
    const listItem = document.createElement("li");
    listItem.innerText = `Aluno ${index + 1}: ${aluno.nome}, Sala: ${aluno.sala}, Idade: ${aluno.idade}`;
    alunoList.appendChild(listItem);
  });
});
