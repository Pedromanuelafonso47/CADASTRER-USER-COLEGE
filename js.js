const dados = {
  nome: document.querySelector("#colege"),
  sala: document.querySelector("#colege1"),
  idade: document.querySelector("#colege2")
};

// Pegando os botões
const button = document.querySelector("#submit");
const editarButton = document.querySelector("#submit2");
const apagarButton = document.querySelector("#submit1");
const listButton = document.querySelector("#listAll");


function entrar(){
  let a =document.querySelector("#submit1");
a.style.background="#17A2B8"



}


function sair(){
  let a =document.querySelector("#submit1");
a.style.background="#212529"



}
//





const spans = {
  name: document.querySelector("#displayName"),
  sala: document.querySelector("#displaySala"),
  idade: document.querySelector("#displayIdade")
};

const listaAlunos = [];
let alunoAtual = null;

// Classe para criar um novo aluno
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

  listarAlunos();
  limparCampos();
});

// Função para limpar os campos do formulário
function limparCampos() {
  dados.nome.value = "";
  dados.sala.value = "";
  dados.idade.value = "";
}

// Função para listar todos os alunos com botões de edição e exclusão
function listarAlunos() {
  const alunoList = document.querySelector("#alunoList");
  alunoList.innerHTML = ""; // Limpar lista anterior

  listaAlunos.forEach((aluno, index) => {
      const listItem = document.createElement("li");
      listItem.innerText = `Aluno ${index + 1}: ${aluno.nome}, Sala: ${aluno.sala}, Idade: ${aluno.idade}`;

      // Botão de editar
      const editButton = document.createElement("button");
      editButton.innerText = "Editar";
      editButton.addEventListener("click", () => editarRegistro(index));
      listItem.appendChild(editButton);

      // Botão de excluir
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Excluir";
      deleteButton.addEventListener("click", () => excluirRegistro(index));
      listItem.appendChild(deleteButton);

      alunoList.appendChild(listItem);
  });
}

// Função para configurar um aluno específico para edição
function editarRegistro(index) {
  const aluno = listaAlunos[index];
  dados.nome.value = aluno.nome;
  dados.sala.value = aluno.sala;
  dados.idade.value = aluno.idade;
  alunoAtual = index;
  button.innerText = "Atualizar";
}


function excluirRegistro(index) {
  listaAlunos.splice(index, 1);
  listarAlunos();
}

// Evento para listar todos os alunos
listButton.addEventListener("click", listarAlunos)
