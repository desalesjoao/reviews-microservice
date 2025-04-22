document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
  
    if (!email || !senha) {
      mostrarAlerta('Por favor, preencha todos os campos!');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3006/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        sessionStorage.setItem('usuarios', JSON.stringify(data));
        window.location.href = '../html/pedidos.html';
      } else {
        mostrarAlerta(data.error || 'Erro no login');
      }
    } catch (error) {
      mostrarAlerta('Erro ao conectar ao servidor');
    }
  });
  
  function mostrarAlerta(mensagem) {
    const alertBox = document.getElementById('alertBox');
    const alertMessage = document.getElementById('alertMessage');
    const alertButton = document.getElementById('alertButton');
  
    alertMessage.textContent = mensagem;
    alertBox.classList.remove('hidden');
  
    alertButton.onclick = () => {
      alertBox.classList.add('hidden');
    };
  }
  