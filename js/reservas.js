const BASE_URL = "https://soundgarden-api.vercel.app";

const tabela = document.querySelector("tbody");
const titulo = document.querySelector("#h1eventos");

const id = new URLSearchParams(window.location.search).get("id");

async function listasReservas() {
  const resposta = await fetch(`${BASE_URL}/bookings/event/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  });
  console.log(resposta);
  const conteudoResposta = await resposta.json();
  console.log(conteudoResposta);

  titulo.innerHTML = conteudoResposta[0].event.name;

  conteudoResposta.forEach((item) => {
    tabela.innerHTML += `<tr>
    <th scope="row">${conteudoResposta.indexOf(item) + 1}</th>
    <td>${item.owner_name}</td>
    <td>${item.owner_email}</td>
    <td>${item.number_tickets}</td>
    <td>
        <button class="btn btn-danger" onclick="deletaReserva('${
          item._id
        }')">excluir</button>
    </td>
</tr>`;
  });
}
listasReservas();

async function deletaReserva(id) {
  const resposta = await fetch(`${BASE_URL}/bookings/${id}`, {
    method: "DELETE",
    redirect: "follow",
    headers: { "Content-Type": "application/json" },
  });
  if (resposta.status == 204) {
    alert("Reserva deletada!");
  }
  window.location.reload();
}
