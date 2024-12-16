<template>
  <div class="container">
    <div class="ver-mais">
      <h2>Empregos</h2>
    </div>
    
    <div class="container-rectangle andamento">
      <div class="box-img">
        <img src="https://via.placeholder.com/300" alt="Imagem do item" />
      </div>
      <div class="info">
        <h3 class="title">Descubra o Sabor da Nossa Cozinha</h3>
        <p class="date-category">JUNE 25 / 1 AGOS | CULINÁRIA</p>
        <p class="description">Você é apaixonado por gastronomia e tem habilidades que ...</p>
        <div class="status andamento">EM ANDAMENTO</div>
      </div>
    </div>
    
    <div class="container-rectangle finalizado">
      <div class="box-img">
        <img src="https://via.placeholder.com/300" alt="Imagem do item" />
      </div>
      <div class="info">
        <h3 class="title">Descubra o Sabor da Nossa Cozinha</h3>
        <p class="date-category">JUNE 25 / 1 AGOS | CULINÁRIA</p>
        <p class="description">Você é apaixonado por gastronomia e tem habilidades que ...</p>
        <div class="status finalizado">FINALIZADO</div>
      </div>
    </div>
    
    <div class="container-rectangle inexistente">
      <div class="box-img">
        <img src="https://via.placeholder.com/300" alt="Imagem do item" />
      </div>
      <div class="info">
        <h3 class="title">Descubra o Sabor da Nossa Cozinha</h3>
        <p class="date-category">JUNE 25 / 1 AGOS | CULINÁRIA</p>
        <p class="description">Você é apaixonado por gastronomia e tem habilidades que ...</p>
        <div class="status inexistente">EMPREGO INEXISTENTE</div>
        <p class="taxa">TAXA: 50%</p>
      </div>
    </div>
    
    <div class="ver-mais">
      <button>Ver mais +</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  padding: 20px;
}

.container-rectangle {
  width: 900px;
  display: flex;
  border-radius: 14px;
  border: 1px solid #ccc;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  gap: 16px;
  transition: all 0.3s ease;
}

.box-img {
  flex: 0 0 220px;
  height: 140px;
  overflow: hidden;
  border-radius: 14px;
}

.box-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info {
  flex: 1;
  text-align: left;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}

.date-category {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.description {
  font-size: 14px;
  margin-bottom: 8px;
}

.status {
  font-size: 12px;
  font-weight: bold;
  padding: 6px 12px;
  text-align: center;
  width: 100%;
  border-radius: 4px;
}

.taxa {
  font-weight: bold;
  color: #a50000;
  margin-top: 8px;
  text-align: right;
}


.status.andamento {
  color: #00796b;
  border: 2px solid #00796b;
}

.status.finalizado {
  color: white;
  background-color: #00796b;
}

.status.inexistente {
  color: #b71c1c;
  background-color: #ffcdd2;
}

.finalizado {
  background-color: #e0f2f1;
}

.inexistente {
  background-color: #fbe9e7;
  border: 2px solid #b71c1c;
}

.ver-mais {
  text-align: center;
}

.ver-mais button {
  background: none;
  border: none;
  color: #00796b;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
}

@media (max-width: 768px) {
  .container-rectangle {
    flex-direction: column;
    align-items: center;
    width: 90%;
    height: 40%;
  }

  .box-img {
    width: 100%;
    height: 160px;
  }

  .info {
    text-align: center;
  }

  .status {
    width: auto;
  }
}
</style>
