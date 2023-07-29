<template>
    <section id="contact" class="p-8 text-white my-12">
        <div class="m-0">
            <h3 class="py-10 text-4xl text-left md:pl-[10vw]">CONTACT</h3>
            <div class="flex items-center justify-center">
                <form action="">
                    <label for="name" class="block mt-4 mb-2 text-xl">Name</label>
                    <input type="text" id="name" name="name" class="pixel-corners w-full box-border bg-gray-800 resize-none text-base outline-none p-3">

                    <label for="email" class="block mt-4 mb-2 text-xl">Email</label>
                    <input type="email" id="email" name="email" class="pixel-corners w-full box-border bg-gray-800 resize-none text-base outline-none p-3">

                    <label for="message" class="block mt-4 mb-2 text-xl">Message</label>
                    <textarea name="message" id="message" cols="30" rows="10" class="pixel-corners w-full box-border bg-gray-800 resize-none text-base outline-none p-3"></textarea>

                    <input type="submit" value="Send message" class="pixel-corners mt-3 w-full box-border bg-accent resize-none text-base outline-none p-3 hover:bg-violet-500">
                </form>
            </div>
            
        </div>
    </section>
</template>

<script>
export default {
  name: 'My-Contact'
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