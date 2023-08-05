<template>
    <section class="h-screen p-0 flex items-center mx-5 md:justify-center">
        <div class="block w-[90vw] md:grid md:grid-flow-col md:grid-cols-2 md:justify-between md:items-center md:max-w-[1280px]">
            <div class="left-col">
                <p id="uphead" class="text-white text-left m-0 text-1xl pl-1 sm:text-2xl md:pl-2 w-100">{{upText}}</p>
                <div>
                    <h1 id="name1" class="text-left text-accent-600 m-0 text-5xl sm:text-7xl font-normal">{{nombre}}</h1>
                    <h1 id="name2" class="text-left text-accent-600 m-0 text-5xl sm:text-7xl -translate-y-2.5 font-normal">{{apellido}}</h1>
                </div>
                <div>
                    <p id="subhead1" class="text-left text-white -translate-y-2.5 text-1xl sm:text-3xl md:pl-1 m-0">{{underText1}}</p>
                    <p id="subhead2" class="text-left text-white -translate-y-2.5 text-1xl sm:text-3xl md:pl-1 m-0">{{underText2}}</p>
                </div>

            </div>
            <div id="fedeFace" class="md:flex md:justify-center md:items-center hidden">
                <transition>
                    <img v-if="allVisible" src="../assets/fede-face.png" class="w-80 md:absolute" alt="photo of Federico Brenner">
                </transition>
            </div>
        </div>
        <transition>
            <div v-if="allVisible" id="mouse" class="-translate-x-2/4 flex items-center justify-center flex-col absolute left-2/4 whitespace-no-wrap before:w-1 before:h-1 before:absolute before:opacity-100" style="bottom: 2%;">
                <svg xmlns="http://www.w3.org/2000/svg" id="mouse-border" width="40" height="80" viewBox="0 0 65 100"><path fill="#888888" d="M25 0h15v5H25V0ZM15 10V5h10v5H15Zm-5 5v-5h5v5h-5ZM5 25V15h5v10H5Zm0 50H0V25h5v50Zm5 10H5V75h5v10Zm5 5h-5v-5h5v5Zm10 5H15v-5h10v5Zm15 0H25v5h15v-5Zm10-5v5H40v-5h10Zm5-5v5h-5v-5h5Zm5-10v10h-5V75h5Zm0-50h5v50h-5V25Zm-5-10h5v10h-5V15Zm-5-5h5v5h-5v-5Zm0 0V5H40v5h10Z"/></svg>
                <p class="text-sm m-0 text-grayText">scroll down</p>
            </div>
        </transition>
    </section>
</template>

<script>
import { ref } from 'vue';


let i=0;
let s=0;
let l=0;
let n=0;
let m=0;
const upheadText = "Hi there, I'm";
const nameText1 = "Federico";
const nameText2 = "Brenner";
const subheadText1 = "I'm a Full-Stack";
const subheadText2 = "Developer";

export default {
  name: 'My-Hero',
  data() {
    return {
      upText: "",
      nombre: "",
      apellido: "",
      underText1: "",
      underText2: "",
      allVisible: ref(false),
    };
  },
  methods:{
    typing(){
        if(i<upheadText.length){
            this.upText = this.upText.slice(0,-1);
            this.upText += upheadText.charAt(i);
            i++;
            if(i<upheadText.length){
                this.upText += '_';
            }
            setTimeout(this.typing,25);
        }else if(s<nameText1.length){
            this.nombre = this.nombre.slice(0,-1);
            this.nombre += nameText1.charAt(s);
            s++;
            if(s<nameText1.length){
                this.nombre += '_';
            }
            setTimeout(this.typing,60);
        }else if(l<nameText2.length){
            this.apellido = this.apellido.slice(0,-1);
            this.apellido += nameText2.charAt(l);
            l++;
            if(l<nameText2.length){
                this.apellido += '_';
            }
            setTimeout(this.typing,60);
        }else if(n<subheadText1.length){
            this.underText1 = this.underText1.slice(0,-1);
            this.underText1 += subheadText1.charAt(n);
            n++;
            if(n<subheadText1.length){
                this.underText1 += '_';
            }
            setTimeout(this.typing,30);
        }else if(m<subheadText2.length){
            this.underText2 = this.underText2.slice(0,-1);
            this.underText2 += subheadText2.charAt(m);
            this.underText2 += '_';
            m++;
            setTimeout(this.typing,30);
        }else{
            if(this.underText2.charAt(m)=="_"){
                this.underText2 = this.underText2.slice(0,-1);
            }else{
                this.underText2 += '_';
            }
            setTimeout(this.typing,500);
        }
    }
  },
  mounted() {
    this.typing(),
    setTimeout(() => {
      this.allVisible = true;
    }, 2100);
  },
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #mouse::before {
    content: '';
    width: 4px;
    height: 4px;
    position: absolute;
    top: 25px;
    left: 50%;
    z-index: 1;
    transform: translateX(-50%);
    background-color: #888888;
    opacity: 1;
    animation: wheel 2s infinite;
    -webkit-animation: wheel 2s infinite;
    }
    @keyframes wheel {
        to {
            opacity: 0;
            top: 40px;
        }
    }
    @-webkit-keyframes wheel {
        to {
            opacity: 0;
            top: 40px;
        }
    }
    /* Define the fade-in animation */
    .v-enter-active, .v-leave-active {
    transition: opacity 1s ease;
    }

    .v-enter-from, .v-leave-to {
    opacity: 0;
    }
</style>