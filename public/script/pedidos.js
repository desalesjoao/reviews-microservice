const usuario = JSON.parse(sessionStorage.getItem('usuarios'));
const listaPedidos = document.getElementById('listaPedidos');
const formAvaliacao = document.getElementById('formAvaliacao');
const pedidoSelecionadoInput = document.getElementById('pedidoSelecionado');

async function carregarPedidos() {
    try {
      const response = await fetch(`/pedidos-cliente/${usuario.id}`);
      const pedidos = await response.json();
  
      listaPedidos.innerHTML = '';
  
      const pedidosNaoAvaliados = pedidos.filter(p => !p.avaliado);
      const pedidosAvaliados = pedidos.filter(p => p.avaliado);
  
      function criarElementoPedido(pedido, avaliado) {
        const div = document.createElement('div');
        div.className = 'pedido';
        if (avaliado) div.classList.add('avaliado');
        else div.classList.add('nao-avaliado');
  
        div.innerHTML = `
          <strong>Pedido #${pedido.id}</strong><br>
          ${new Date(pedido.data_pedido).toLocaleDateString()} - ${pedido.status}
        `;
  
        div.addEventListener('click', () => {
          if (avaliado) {
            exibirAlerta("Este pedido já foi avaliado.");
          } else {
            formAvaliacao.style.display = 'block';
            pedidoSelecionadoInput.value = pedido.id;
          }
        });
  
        return div;
      }
  
      pedidosNaoAvaliados.forEach(p => {
        listaPedidos.appendChild(criarElementoPedido(p, false));
      });
  
      pedidosAvaliados.forEach(p => {
        listaPedidos.appendChild(criarElementoPedido(p, true));
      });
  
    } catch (error) {
      exibirAlerta("Erro ao carregar pedidos.");
    }
  }
  

formAvaliacao.addEventListener('submit', async (e) => {
  e.preventDefault();

  const pedido_id = pedidoSelecionadoInput.value;
  const usuario_id = usuario.id;
  const nota = document.getElementById('nota').value;
  const comentario = document.getElementById('comentario').value;

  try {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pedido_id, usuario_id, nota, comentario })
    });

    const data = await response.json();
    if (response.ok) {
      exibirAlerta(data.message, true);
      formAvaliacao.reset();
      formAvaliacao.style.display = 'none';
      listaPedidos.innerHTML = '';
      carregarPedidos();
    } else {
      exibirAlerta(data.error || 'Erro ao enviar avaliação.');
    }
  } catch (error) {
    exibirAlerta('Erro ao conectar ao servidor.');
  }
});

function exibirAlerta(mensagem, sucesso = false) {
  const alerta = document.createElement('div');
  alerta.textContent = mensagem;
  alerta.style.position = 'fixed';
  alerta.style.top = '20px';
  alerta.style.left = '50%';
  alerta.style.transform = 'translateX(-50%)';
  alerta.style.background = sucesso ? '#4CAF50' : '#f44336';
  alerta.style.color = '#fff';
  alerta.style.padding = '12px 20px';
  alerta.style.borderRadius = '5px';
  alerta.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
  alerta.style.zIndex = '1000';
  document.body.appendChild(alerta);

  setTimeout(() => {
    alerta.remove();
  }, 3000);
}

carregarPedidos();
