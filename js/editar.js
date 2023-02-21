const BASE_URL = "https://soundgarden-api.vercel.app";

const inputNome = document.querySelector("#nome");
const inputBanner = document.querySelector("#banner");
const inputAtracoes = document.querySelector("#atracoes");
const inputDescricao = document.querySelector("#descricao");
const inputData = document.querySelector("#data");
const inputLotacao = document.querySelector("#lotacao");
const form = document.querySelector("form");

const id = new URLSearchParams(window.location.search).get("id");

async function listarEvento() {
  const options = {
    method: "GET",
    redirect: "follow",
    headers: { "Content-Type": "application/json" },
  };
  const resposta = await fetch(`${BASE_URL}/events/${id}`, options);

  const conteudoResposta = await resposta.json();
  inputNome.value = conteudoResposta.name;
  inputBanner.value = conteudoResposta.poster;
  inputAtracoes.value = conteudoResposta.attractions;
  inputDescricao.value = conteudoResposta.description;
  inputData.value = conteudoResposta.scheduled.slice(0, 16);
  inputLotacao.value = conteudoResposta.number_tickets;
}
listarEvento();

form.onsubmit = async (evento) => {
  evento.preventDefault();

  const atualizarEvento = {
    name: inputNome.value,
    poster: inputBanner.value,
    attractions: inputAtracoes.value.split(","),
    description: inputDescricao.value,
    scheduled: inputData.value,
    number_tickets: inputLotacao.value,
  };

  const options = {
    method: "PUT",
    body: JSON.stringify(atualizarEvento),
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  };

  const resposta = await fetch(`${BASE_URL}/events/${id}`, options);
  if (resposta.status == 200) {
    alert("Evento atualizado com sucesso!!");
  }
};
