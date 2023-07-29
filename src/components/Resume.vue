<template>
    <section id="resume" class="flex flex-row w-full">

    </section>
</template>

<script>
export default {
  name: 'My-Resume',
  data() {
    return{
        jobs:[],
    };
  },
  methods:{
    getData(){
        this.proyects[0]={
            Title:'Soporte de Primer Nivel',
            Company:'Colegio Goethe',
            Start:'06-2023',
            Finish:'día de hoy',
            Description:'Realizo tareas de manutencion',
        }
        this.proyects[1]={
            Title:'Full-Stack Developer',
            Company:'Freelancer',
            Start:'07-2023',
            Finish:'dia de hoy',
            Description:'Creo paginas web para clientes',
        }
    }
  },
  mounted(){
    this.getData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>