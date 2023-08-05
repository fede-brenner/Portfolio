<template>
    <section id="proyects" class="flex flex-col items-center p-8 text-white">
        <div id="container" class="m-0 w-full md:max-w-[1080px]">
            <h2 class="py-10 text-4xl text-left">PROYECTS</h2>
            <div class="m-0 flex items-center justify-center">
                <ul class="grid items-center justify-center m-0 gap-12 grid-cols-1 md:grid-cols-2 md:w-[75vw] md:max-w-[875px]">
                    <li v-for="(proyect, index) of proyects" :key="index" class="pixel-corners w-[80vw] bg-gray-800 text-left h-48 transition-transform duration-500 ease-in-out hover:scale-105 md:text-left md:w-[35vw] md:max-w-[400px]" id="card">
                        <h2 class="m-0 text-2xl p-5">{{proyect.name}}</h2>
                        <p class="text-grayText text-sm pb-1 px-5">{{proyect.description}}</p>
                    </li>
                </ul>
            </div>

        </div>
    </section>
</template>

<script>
export default {
  name: 'all-proyects',
  data() {
    return{
        proyects:[],
    };
  },
  methods:{
    getData(){
        this.proyects[0]={
            name:'AFBRENNER',
            description:'A website that shows products that the client sells',
        }
        this.proyects[1]={
            name:'ALLE JUNG',
            description:'A website for a dance group, that shows a gallery with photos of the different shows they attended, plus a calendar of all the planned events',
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
    .pixel-corners {
        clip-path: polygon(
            0px calc(100% - 20px),
            4px calc(100% - 20px),
            4px calc(100% - 12px),
            8px calc(100% - 12px),
            8px calc(100% - 8px),
            12px calc(100% - 8px),
            12px calc(100% - 4px),
            20px calc(100% - 4px),
            20px 100%,
            calc(100% - 20px) 100%,
            calc(100% - 20px) calc(100% - 4px),
            calc(100% - 12px) calc(100% - 4px),
            calc(100% - 12px) calc(100% - 8px),
            calc(100% - 8px) calc(100% - 8px),
            calc(100% - 8px) calc(100% - 12px),
            calc(100% - 4px) calc(100% - 12px),
            calc(100% - 4px) calc(100% - 20px),
            100% calc(100% - 20px),
            100% 20px,
            calc(100% - 4px) 20px,
            calc(100% - 4px) 12px,
            calc(100% - 8px) 12px,
            calc(100% - 8px) 8px,
            calc(100% - 12px) 8px,
            calc(100% - 12px) 4px,
            calc(100% - 20px) 4px,
            calc(100% - 20px) 0px,
            20px 0px,
            20px 4px,
            12px 4px,
            12px 8px,
            8px 8px,
            8px 12px,
            4px 12px,
            4px 20px,
            0px 20px
        );
    }
</style>