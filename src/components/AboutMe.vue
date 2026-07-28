<template>
    <section id="about-me" class="p-0 flex items-center justify-center py-40 px-8 text-white relative overflow-hidden" style="background: linear-gradient(to bottom, #131418, #1a1c26);">
        <PixelStars shooting-stars/>
        <PixelClouds :clouds="clouds"/>
        <div id="container" class="relative z-10 w-full max-w-[1080px] md:grid md:grid-flow-col md:justify-between md:items-center md:gap-12 md:grid-cols-4">
            <div id="about-me-img" class="md:justify-self-end  hidden md:block"></div>
            <div id="about-me-text" class="md:col-span-3">
                <h2 class="text-4xl my-10 text-left">{{ t.aboutMe.heading }}</h2>
                <p class="text-xl text-left">{{ t.aboutMe.description }}</p>
                <div id="buttons" class="flex items-center mt-12 gap-12">
                    <a id="resume-btn" href="#resume" class="inline-block p-3 text-2xl font-bold text-white ml-2 border-none pixel-corners bg-accent">{{ t.aboutMe.resumeBtn }}</a>
                    <div class="flex items-center gap-4">
                        <a href="https://github.com/fede-brenner" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                            <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" id="github" viewBox="0 0 64 64" width="55px" height="55px"><path d="M32 6C17.641 6 6 17.641 6 32c0 12.277 8.512 22.56 19.955 25.286-.592-.141-1.179-.299-1.755-.479V50.85c0 0-.975.325-2.275.325-3.637 0-5.148-3.245-5.525-4.875-.229-.993-.827-1.934-1.469-2.509-.767-.684-1.126-.686-1.131-.92-.01-.491.658-.471.975-.471 1.625 0 2.857 1.729 3.429 2.623 1.417 2.207 2.938 2.577 3.721 2.577.975 0 1.817-.146 2.397-.426.268-1.888 1.108-3.57 2.478-4.774-6.097-1.219-10.4-4.716-10.4-10.4 0-2.928 1.175-5.619 3.133-7.792C19.333 23.641 19 22.494 19 20.625c0-1.235.086-2.751.65-4.225 0 0 3.708.026 7.205 3.338C28.469 19.268 30.196 19 32 19s3.531.268 5.145.738c3.497-3.312 7.205-3.338 7.205-3.338.567 1.474.65 2.99.65 4.225 0 2.015-.268 3.19-.432 3.697C46.466 26.475 47.6 29.124 47.6 32c0 5.684-4.303 9.181-10.4 10.4 1.628 1.43 2.6 3.513 2.6 5.85v8.557c-.576.181-1.162.338-1.755.479C49.488 54.56 58 44.277 58 32 58 17.641 46.359 6 32 6zM33.813 57.93C33.214 57.972 32.61 58 32 58 32.61 58 33.213 57.971 33.813 57.93zM37.786 57.346c-1.164.265-2.357.451-3.575.554C35.429 57.797 36.622 57.61 37.786 57.346zM32 58c-.61 0-1.214-.028-1.813-.07C30.787 57.971 31.39 58 32 58zM29.788 57.9c-1.217-.103-2.411-.289-3.574-.554C27.378 57.61 28.571 57.797 29.788 57.9z"/></svg>
                        </a>
                        <a href="https://www.linkedin.com/in/federico-brenner-5a05721a4" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
                            <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" id="linkedin" viewBox="0 0 24 24" width="46px" height="46px"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import PixelStars from './PixelStars.vue';
import PixelClouds from './PixelClouds.vue';
import { languageState } from '@/lib/language';
import { translations } from '@/config/translations';
import nube1 from '@/assets/clouds/nube-1-superior.svg';
import nube2 from '@/assets/clouds/nube-2-central-derecha.svg';
import nube3 from '@/assets/clouds/nube-3-central-izquierda.svg';
import nube4 from '@/assets/clouds/nube-4-inferior.svg';

const CLOUDS = [
    { src: nube1, top: '9%', left: '8%', width: 160, height: 82, duration: '22s', delay: '0s', phase: 0, amplitude: 70 },
    { src: nube2, top: '30%', left: '72%', width: 130, height: 72, duration: '26s', delay: '-4s', phase: 1.2, amplitude: 65 },
    { src: nube3, top: '58%', left: '18%', width: 110, height: 62, duration: '19s', delay: '-9s', phase: 2.4, amplitude: 55 },
    { src: nube4, top: '78%', left: '52%', width: 200, height: 59, duration: '30s', delay: '-14s', phase: 3.6, amplitude: 75 },
]

export default {
  name: 'About-Me',
  components: {
    PixelStars,
    PixelClouds,
  },
  data() {
    return {
      clouds: CLOUDS,
      languageState,
    }
  },
  computed: {
    t() {
      return translations[this.languageState.value]
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #about-me-img{
        background-color: #38393E;
        background: url('../assets/Fede Idle.png');
        background-repeat: no-repeat;
        background-size: cover;
        width: 96px;
        height: 225px;
        animation: idle 2s steps(6) infinite;
    }

    @keyframes idle{
        from{
            background-position: 0px;
        }
        to{
            background-position: -578px;}
    }

    #resume-btn:hover {
        background-color: #7d5ed3;
    }
    .pixel-corners {
        clip-path: polygon(
            0px calc(100% - 10px),
            5px calc(100% - 10px),
            5px calc(100% - 5px),
            10px calc(100% - 5px),
            10px 100%,
            calc(100% - 10px) 100%,
            calc(100% - 10px) calc(100% - 5px),
            calc(100% - 5px) calc(100% - 5px),
            calc(100% - 5px) calc(100% - 10px),
            100% calc(100% - 10px),
            100% 10px,
            calc(100% - 5px) 10px,
            calc(100% - 5px) 5px,
            calc(100% - 10px) 5px,
            calc(100% - 10px) 0px,
            10px 0px,
            10px 5px,
            5px 5px,
            5px 10px,
            0px 10px
        );
    }

</style>