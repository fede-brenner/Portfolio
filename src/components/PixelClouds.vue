<template>
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
            v-for="(cloud, index) in clouds"
            :key="'cloud-' + index"
            class="pixel-cloud-wrap"
            :style="{
                top: cloud.top,
                left: cloud.left,
                width: cloud.width + 'px',
                height: cloud.height + 'px',
                transform: 'translateX(' + parallaxOffset(cloud) + 'px)'
            }"
        >
            <img
                :src="cloud.src"
                alt=""
                class="pixel-cloud"
                :style="{ animationDuration: cloud.duration, animationDelay: cloud.delay }"
            >
        </div>
    </div>
</template>

<script>
export default {
    name: 'Pixel-Clouds',
    props: {
        clouds: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            scrollY: 0,
            ticking: false,
        }
    },
    methods: {
        parallaxOffset(cloud) {
            // Multiplicador bajo: el vaivén se extiende a lo largo de un tramo de
            // scroll grande (ciclo completo ~4200px) para que el movimiento sea
            // lento y gradual, aunque la amplitud siga siendo notoria cuando
            // llega al límite y vuelve hacia atrás.
            return Math.sin(this.scrollY * 0.0015 + cloud.phase) * cloud.amplitude
        },
        onScroll() {
            if (this.ticking) return
            this.ticking = true
            window.requestAnimationFrame(() => {
                this.scrollY = window.scrollY
                this.ticking = false
            })
        },
    },
    mounted() {
        window.addEventListener('scroll', this.onScroll, { passive: true })
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.onScroll)
    },
}
</script>

<style scoped>
    .pixel-cloud-wrap {
        position: absolute;
    }

    .pixel-cloud {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        image-rendering: pixelated;
        opacity: 0.25;
        pointer-events: none;
        animation-name: cloud-drift;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }

    @keyframes cloud-drift {
        from { transform: translateX(-6px); }
        to { transform: translateX(6px); }
    }
</style>
