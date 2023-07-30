<template>
    <section id="about-me" class="p-0 md:pr-[10vw] flex items-center my-40 mx-8 text-white">
        <div id="container" class="w-full md:grid md:grid-flow-col md:justify-between md:items-center md:gap-12 md:grid-cols-4">
            <div id="about-me-img" class="md:justify-self-end  hidden md:block"></div>
            <div id="about-me-text" class="md:col-span-3">
                <h2 class="text-4xl my-10 text-left">ABOUT ME</h2>
                <p class="text-base md:text-xl text-left">I'm a Full-Stack Developer. Currently studying Computer Systems Engineering at Interamerican Open University(UAI). I love the feeling of compleeting complex proyects and knowing that i learned a lot in the process.</p>
                <div id="buttons" class="flex items-center mt-12 gap-12">
                    <button id="resume-btn" v-on:click="ToggleVisibility()" class="p-3 text-1xl md:text-2xl text-white ml-2 border-none pixel-corners bg-accent-600">
                        RESUME
                    </button>
                    <div class="flex items-center">
                        <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" id="github" onclick="window.open('https://github.com/fede-brenner');" viewBox="0 0 64 64" width="55px" height="55px"><path d="M32 6C17.641 6 6 17.641 6 32c0 12.277 8.512 22.56 19.955 25.286-.592-.141-1.179-.299-1.755-.479V50.85c0 0-.975.325-2.275.325-3.637 0-5.148-3.245-5.525-4.875-.229-.993-.827-1.934-1.469-2.509-.767-.684-1.126-.686-1.131-.92-.01-.491.658-.471.975-.471 1.625 0 2.857 1.729 3.429 2.623 1.417 2.207 2.938 2.577 3.721 2.577.975 0 1.817-.146 2.397-.426.268-1.888 1.108-3.57 2.478-4.774-6.097-1.219-10.4-4.716-10.4-10.4 0-2.928 1.175-5.619 3.133-7.792C19.333 23.641 19 22.494 19 20.625c0-1.235.086-2.751.65-4.225 0 0 3.708.026 7.205 3.338C28.469 19.268 30.196 19 32 19s3.531.268 5.145.738c3.497-3.312 7.205-3.338 7.205-3.338.567 1.474.65 2.99.65 4.225 0 2.015-.268 3.19-.432 3.697C46.466 26.475 47.6 29.124 47.6 32c0 5.684-4.303 9.181-10.4 10.4 1.628 1.43 2.6 3.513 2.6 5.85v8.557c-.576.181-1.162.338-1.755.479C49.488 54.56 58 44.277 58 32 58 17.641 46.359 6 32 6zM33.813 57.93C33.214 57.972 32.61 58 32 58 32.61 58 33.213 57.971 33.813 57.93zM37.786 57.346c-1.164.265-2.357.451-3.575.554C35.429 57.797 36.622 57.61 37.786 57.346zM32 58c-.61 0-1.214-.028-1.813-.07C30.787 57.971 31.39 58 32 58zM29.788 57.9c-1.217-.103-2.411-.289-3.574-.554C27.378 57.61 28.571 57.797 29.788 57.9z"/></svg>
                    </div>
                </div>
            </div>
        </div>

        <!-- Resume -->
        <div v-if="this.Visible" class="fixed left-[1rem] z-50 top-[1rem] h-full w-full overflow-y-auto overflow-x-hidden outline-none" id="exampleModalScrollable">
            <div class="pointer-events-none relative h-[calc(100%-2rem)] w-[calc(100%-2rem)] md:inset-0 max-h-full">
                <div class="pointer-events-auto relative flex max-h-[100%] w-full flex-col overflow-hidden rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-800">
                    <div class="flex flex-shrink-0 items-center justify-between rounded-t-md p-2 md:p-4">
                        <!--Resume title-->
                        <h5 class="text-lg md:text-2xl pl-2 font-medium leading-normal text-neutral-800 dark:text-neutral-200" id="exampleModalScrollableLabel">
                            Resume
                        </h5>
                        <!--Resume button-->
                        <button v-on:click="ToggleVisibility()" type="button" class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <!--Modal body-->
                    <div class="relative overflow-y-auto p-2 md:p-4 overscroll-auto">
                        <h2 class="text-lg md:text-2xl p-2 text-left">Work Experience:</h2>
                        <div id="work-experience" class="p-2 md:p-5 text-gray-100">
                            <div class="pl-[15px] pb-[5px] hidden md:block">
                                <svg xmlns="http://www.w3.org/2000/svg" width="5" fill="none" viewBox="0 0 5 40"><path fill="#D9D9D9" fill-rule="evenodd" d="M5 0H0v5h5V0ZM0 10h5v10H0V10Zm0 15h5v15H0V25Z" clip-rule="evenodd"/></svg>
                            </div>
                            <div v-for="(job, index) of jobs" :key="index"  id="job" class="list-item ml-5 md:ml-0 md:flex flex-row items-center">
                                <svg class="hidden md:block" id="bullet-point" xmlns="http://www.w3.org/2000/svg" width="35" fill="none" viewBox="0 0 35 185"><path fill="#D9D9D9" fill-rule="evenodd" d="M15 0h5v75h5v5H10v-5h5V0ZM5 85v-5h5v5H5Zm0 15H0V85h5v15Zm5 5H5v-5h5v5Zm15 0v5h-5v75h-5v-75h-5v-5h15Zm5-5v5h-5v-5h5Zm0-15h5v15h-5V85Zm0 0v-5h-5v5h5Zm-10 5v5h-5v-5h5Z" clip-rule="evenodd"/></svg>
                                <div id="job-details" class="flex flex-col justify-start mt-4 md:mt-0 md:pl-5 text-left md:w-[80vw]">
                                    <h2 class="text-base md:text-xl text-accent-500">{{ job.Title }}</h2>
                                    <h3 class="text-xs md:text-base text-grayText">{{ job.Company }}</h3>
                                    <p class="text-xs md:text-base text-grayText">{{ job.Start + " - " + job.Finish }}</p>
                                    <p class="text-xs md:text-base w-full">{{ job.Description }}</p>
                                </div>
                            </div>
                            <div class="pl-[15px] pt-[5px] hidden md:block">
                                <svg xmlns="http://www.w3.org/2000/svg" width="5" fill="none" viewBox="0 0 5 40"><path fill="#D9D9D9" fill-rule="evenodd" d="M5 15H0V0h5v15Zm0 15H0V20h5v10ZM0 40h5v-5H0v5Z" clip-rule="evenodd"/></svg>
                            </div>
                        </div>
                        <h2 class="text-lg md:text-2xl p-2 pt-12 text-left">Education:</h2>
                        <div id="education" class="p-2 md:p-5 text-gray-100">
                            <div class="pl-[15px] pb-[5px] hidden md:block">
                                <svg xmlns="http://www.w3.org/2000/svg" width="5" fill="none" viewBox="0 0 5 40"><path fill="#D9D9D9" fill-rule="evenodd" d="M5 0H0v5h5V0ZM0 10h5v10H0V10Zm0 15h5v15H0V25Z" clip-rule="evenodd"/></svg>
                            </div>
                            <div v-for="(degree, index) of degrees" :key="index"  id="degree" class="list-item ml-5 md:ml-0 md:flex flex-row items-center">
                                <svg class="hidden md:block" id="bullet-point" xmlns="http://www.w3.org/2000/svg" width="35" fill="none" viewBox="0 0 35 185"><path fill="#D9D9D9" fill-rule="evenodd" d="M15 0h5v75h5v5H10v-5h5V0ZM5 85v-5h5v5H5Zm0 15H0V85h5v15Zm5 5H5v-5h5v5Zm15 0v5h-5v75h-5v-75h-5v-5h15Zm5-5v5h-5v-5h5Zm0-15h5v15h-5V85Zm0 0v-5h-5v5h5Zm-10 5v5h-5v-5h5Z" clip-rule="evenodd"/></svg>
                                <div id="degree-details" class="flex flex-col justify-start mt-4 md:mt-0 md:pl-5 text-left md:w-[80vw]">
                                    <h2 class="text-base md:text-xl text-accent-500">{{ degree.Title }}</h2>
                                    <h3 class="text-xs md:text-base text-grayText">{{ degree.Institucion }}</h3>
                                    <p class="text-xs md:text-base text-grayText">{{ degree.Start + " - " + degree.Finish }}</p>
                                </div>
                            </div>
                            <div class="pl-[15px] pt-[5px] hidden md:block">
                                <svg xmlns="http://www.w3.org/2000/svg" width="5" fill="none" viewBox="0 0 5 40"><path fill="#D9D9D9" fill-rule="evenodd" d="M5 15H0V0h5v15Zm0 15H0V20h5v10ZM0 40h5v-5H0v5Z" clip-rule="evenodd"/></svg>
                            </div>
                        </div>
                        <h2 class="text-lg md:text-2xl p-2 pt-12 text-left">Certificates:</h2>
                        <div id="certificates" class="p-2 md:p-5 text-gray-100">
                            <div id="certificate" class="flex flex-row items-center">
                                <ul id="certificate-details" class="flex flex-col justify-start pl-5 text-left list-disc">
                                    <li>
                                        <h2 class="text-base md:text-xl text-accent-500">Deutsches Sprachdiplom (DSD II)</h2>
                                        <h3 class="text-xs md:text-base text-grayText">Certificado de Nivel Aleman obteniendo los siguientes resultados:</h3>
                                        <ul class="text-xs md:text-base text-grayText list-disc pl-5 md:pl-10">
                                            <li>Compresion Lectora: B2</li>
                                            <li>Compresion Auditiva: C1</li>
                                            <li>Comunicacion Escrita: B2</li>
                                            <li>Comunicacion Oral: C1</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'About-Me',
    data() {
        return{
            Visible:false,
            jobs:[],
            degrees:[],
        };
    },
    methods:{
        ToggleVisibility(){
            this.Visible = !this.Visible
        },
        getData(){
            this.jobs[0]={
                Title:'Full-Stack Developer',
                Company:'Freelancer',
                Start:'07.2023',
                Finish:'Actualmente',
                Description:'Creo paginas web para clientes, utilizando tecnologias como Vue, Tailwind, CSS, HTML, Javascript, API.REST, SQL',
            }
            this.jobs[1]={
                Title:'Asistente IT Junior',
                Company:'Colegio Goethe',
                Start:'06.2023',
                Finish:'Actualmente',
                Description: 'Brindo soporte técnico a los empleados, resuelvo problemas de hardware y software, y ayudo en la elaboracion de Informes en el sistema Colegium utilizando el lenguaje de programacion 4D.',
            }
            this.degrees[0]={
                Title:'Ingenieria en Sistemas de Informacion',
                Institucion:'Universidad Abierta Interamericana(UAI)',
                Start:'03.2020',
                Finish:'Actualmente',
            }
            this.degrees[1]={
                Title:'Bachillerato en Economia y Administracion',
                Institucion:'Colegio Hölters Schule',
                Start:'03.2014',
                Finish:'12.2019',
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