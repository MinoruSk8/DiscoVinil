const form = document.getElementById('form');
const listaDiscos = document.getElementById('lista-discos');
const btnAdicionar = document.getElementById('btn-adicionar');
const btnEditar = document.getElementById('btn-editar');

let discos = [];

form.addEventListener('submit', adicionarDisco);

function adicionarDisco(event) {
  event.preventDefault();

  const artista = document.getElementById('artista').value;
  const album = document.getElementById('album').value;
  const ano = parseInt(document.getElementById('ano').value);

  if (!artista || !album || !ano) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  const disco = { artista, album, ano };

  if (btnAdicionar.style.display !== 'none') {
    discos.push(disco);
  } else {
    const index = btnEditar.dataset.index;
    discos[index] = disco;
    btnAdicionar.style.display = 'block';
    btnEditar.style.display = 'none';
    form.reset();
  }

  atualizarListaDiscos();
  form.reset();
}

function atualizarListaDiscos() {
  listaDiscos.innerHTML = '';

  discos.forEach((disco, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>Artista:</strong> ${disco.artista}<br>
      <strong>Álbum:</strong> ${disco.album}<br>
      <strong>Ano:</strong> ${disco.ano}<br>
      <button onclick="editarDisco(${index})">Editar</button>
      <button onclick="excluirDisco(${index})">Excluir</button>
    `;
    listaDiscos.appendChild(li);
  });
}

function editarDisco(index) {
    const disco = discos[index];
    document.getElementById('artista').value = disco.artista;
    document.getElementById('album').value = disco.album;
    document.getElementById('ano').value = disco.ano;
    btnAdicionar.style.display = 'none';
    btnEditar.style.display = 'block';
    btnEditar.dataset.index = index;
    btnEditar.addEventListener('click', function() {
      adicionarDisco(event);
      btnEditar.removeEventListener('click', adicionarDisco);
    });
}
  
function excluirDisco(index) {
  discos.splice(index, 1);
  atualizarListaDiscos();
}
