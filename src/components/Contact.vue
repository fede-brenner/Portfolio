<template>
    <section id="contact" class="flex flex-col items-center p-8 text-white my-12">
        <div class="m-0 w-full md:max-w-[1080px]">
            <h3 class="py-10 text-4xl text-left">CONTACT</h3>
            <div class="flex items-center justify-center">
                <form action="https://formsubmit.co/e2815e4dadd171a7699fe6a439e6534a" method="POST">
                    <input type="hidden" name="_next" value="http://fedebrenner.com/#contact">
                    <input type="hidden" name="_subject" value="Nuevo mensaje del Portfolio!">

                    <label for="name" class="block mt-4 mb-2 text-xl">Name</label>
                    <input type="text" name="name" required class="pixel-corners w-full box-border bg-gray-800 resize-none text-base outline-none p-3">

                    <label for="email" class="block mt-4 mb-2 text-xl">Email</label>
                    <input type="email" name="email" required class="pixel-corners w-full box-border bg-gray-800 resize-none text-base outline-none p-3">

                    <label for="message" class="block mt-4 mb-2 text-xl">Message</label>
                    <textarea name="message" cols="30" rows="10" required class="pixel-corners w-full box-border bg-gray-800 resize-none text-base outline-none p-3"></textarea>

                    <button type="submit" class="pixel-corners mt-3 w-full box-border bg-accent-600 resize-none text-base outline-none p-3 hover:bg-violet-500">Send</button>
                </form>
            </div>
        </div>
    </section>
</template>

<script>

export default {
    name: 'My-Contact',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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