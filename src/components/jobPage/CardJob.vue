<script setup>
import { useUserStore } from '@/stores/user'
import { defineProps, ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
const userStore = useUserStore()
const authStore = useAuthStore()

const props = defineProps({
  projeto: {
    type: Object,  
    required: true
  }
})

const showMore = ref(false)
const isMobile = ref(false)

const verMaisProjeto = () => {
  showMore.value = !showMore.value
}

onMounted(() => {
  const checkIfMobile = () => {
    isMobile.value = window.innerWidth <= 767
    if (!isMobile.value) {
      showMore.value = true 
    }
  }

  checkIfMobile()
  window.addEventListener('resize', checkIfMobile)

  return () => window.removeEventListener('resize', checkIfMobile)
})

const calculateVagas = (candidatos, maxCandidates) => {
  const currentCandidates = candidatos && candidatos.length > 0 ? candidatos.length : 0;
  return `${currentCandidates}/${maxCandidates}`;
};

const vagas = computed(() => {
  return calculateVagas(props.projeto.candidatos, props.projeto.max_candidates);
});

const formatMonth = (month) => {
  const months = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
  ];
  return months[month - 1];
};

const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const startFormatted = `${formatMonth(start.getMonth() + 1)} ${start.getDate()}`;
  const endFormatted = `${end.getDate()} ${formatMonth(end.getMonth() + 1)}`;

  return `${startFormatted} / ${endFormatted}`;
};

const formattedDateRange = formatDateRange(
  props.projeto.data_publicada,
  props.projeto.prazo_entrega
);


const applyForJob = async (projetoId) => {  
  try {
    const token = authStore.token
    await userStore.candidatarVaga(projetoId, token);
    console.log('Candidatura realizada para o projeto:', props.projeto.titulo);
    alert('Você se candidatou à vaga!');
  } catch (error) {
    console.error('Erro ao se candidatar:', error);
    alert('Ocorreu um erro ao enviar sua candidatura.');
  }
};
</script>

<template>
  <div v-if="props.projeto" class="container-rectangle">
    <div class="box-img">
      <img :src="projeto.foto?.url || 'https://via.placeholder.com/150'" alt="Imagem do item" />
      <div class="overlay-info" v-if="isMobile && showMore">
        <p class="overlay-text vagas">Vagas: {{ vagas}}</p>
        <p class="overlay-text salario">Salário: R$ {{ props.projeto.orcamento }}</p>
      </div>
    </div>

    <div class="info">
      <h3 class="title">{{ props.projeto.titulo }}</h3>
      <div class="details">
        <p class="date-category">
        {{ formattedDateRange }} | {{ props.projeto.categoria[0]?.nome || 'CULINÁRIA' }}
        </p>
      </div>
      <p class="description">
        {{
          isMobile && !showMore
            ? props.projeto.descricao.slice(0, 100) + '...'
            : props.projeto.descricao
        }}
      </p>
      <div class="action" v-if="showMore">
        <button class="accept" @click="applyForJob(props.projeto.id)">ACEITAR</button>
      </div>
    </div>

    <div class="ver-mais" v-if="!showMore && isMobile">
      <button @click="verMaisProjeto">Ver mais</button>
    </div>
    <div class="ver-menos" v-if="showMore && isMobile">
      <button @click="verMaisProjeto">Ver menos</button>
    </div>
  </div>
</template>


<style scoped>
.container-rectangle {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 14px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.box-img {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.box-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info {
  padding: 16px;
  text-align: center;
}

.action {
  margin-top: 16px;
}

.accept {
  width: 350px;
  border: 1px solid #006b63;
  background-color: #ffffff;
  color: #006b63;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
}

.accept:hover {
  background-color: #006b63;
  color: #fff;
}

.ver-mais,
.ver-menos {
  text-align: center;
  width: 100%;
  margin: 0;
  padding: 8px 0;
}

.ver-mais {
  background-color: #000;
  color: #fff;
}

.ver-menos {
  border: 1px solid #000;
  border-radius: 0 0 14px 14px;
  color: #000;
  background-color: transparent;
}

.ver-mais button,
.ver-menos button {
  background: none;
  border: none;
  color: inherit;
  font-size: 14px;
  cursor: pointer;
}

@media (max-width: 767px) {
  .container-rectangle {
    width: 400px;
  }

  .box-img {
    position: relative;
  }

  .overlay-info {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
  }

  .overlay-text {
    font-size: 14px;
    font-weight: bold;
  }

  .accept {
    margin-bottom: 8px;
  }

.vagas {
  text-align: left; 
}

.salario {
  text-align: right; 
}


  .info {
    padding: 16px;
    text-align: center;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .details {
    font-size: 12px;
    color: #666;
    margin-bottom: 12px;
  }

  .date-category {
    font-size: 12px;
    color: #333;
    font-weight: bold;
  }

  .description {
    font-size: 14px;
    color: #333;
    margin-bottom: 16px;
  }

  .accept {
    width: 350px;
    border: 1px solid #006b63;
    background-color: #ffffff;
    color: #006b63;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .accept:hover {
    background-color: #006b63;
    color: #fff;
  }
}
@media (min-width: 768px) {
  .container-rectangle {
    flex-direction: row;
    max-width: 1000px;
    height: 200px;
    margin: auto;
  }

  .box-img {
    flex: 0 0 300px;
    height: 220px;
  }

  .info {
    flex: 1;
    padding: 32px;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    margin-top: -8px;
    margin-bottom: 3px;
    text-align: left;
  }

  .details {
    font-size: 14px;
    color: #666;
    margin-bottom: 12px;
  }

  .date-category {
    font-size: 14px;
    color: #333;
    font-weight: normal;
    text-align: left;  }

  .description {
    font-size: 16px;
    color: #333;
    text-align: left;
  }

  .accept {
    background: transparent;
    color: #006b63;
    border: 1px #666 solid;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 180px; 
    padding: 8px 16px;
    font-size: 14px;
    margin-top: -5px !important;
    margin-bottom: 15px !important;
  }
  .action {
    display: flex;
    align-content: flex-start;
    justify-content: flex-start;
    padding-bottom: 20px; 
}
  .ver-mais, .ver-menos {
    display: none;
  }
}
</style>
