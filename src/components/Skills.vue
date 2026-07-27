<template>
    <section id="skills" class="p-0 flex flex-col items-center justify-center py-32 px-2 md:px-8 text-white relative overflow-hidden" style="background: linear-gradient(to bottom, #1a1c26, #0e150f);">
        <PixelStars/>
        <PixelClouds :clouds="clouds"/>
        <div class="relative z-10 w-full flex flex-col items-center max-w-[1080px]">
            <h2 class="w-full text-4xl my-10 text-left px-6 md:px-0">{{ t.skills.heading }}</h2>
            <ul class="w-full m-0 list-none flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-6 md:px-0">
                <li class="pixel-corners-sm bg-gray-800 border-b-4 border-accent flex flex-col items-center justify-center gap-2 w-20 h-20 sm:w-24 sm:h-24 transition-transform duration-200 ease-in-out hover:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="w-6 h-6 sm:w-8 sm:h-8"><path fill="#8B6FD6" d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z"/></svg>
                    <p class="m-0 text-[10px] sm:text-xs text-grayText">HTML</p>
                </li>
                <li class="pixel-corners-sm bg-gray-800 border-b-4 border-accent flex flex-col items-center justify-center gap-2 w-20 h-20 sm:w-24 sm:h-24 transition-transform duration-200 ease-in-out hover:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="w-6 h-6 sm:w-8 sm:h-8"><path fill="#8B6FD6" d="M0 32l34.9 395.8L192 480l157.1-52.2L384 32H0zm313.1 80l-4.8 47.3L193 208.6l-.3.1h111.5l-12.8 146.6-98.2 28.7-98.8-29.2-6.4-73.9h48.9l3.2 38.3 52.6 13.3 54.7-15.4 3.7-61.6-166.3-.5v-.1l-.2.1-3.6-46.3L193.1 162l6.5-2.7H76.7L70.9 112h242.2z"/></svg>
                    <p class="m-0 text-[10px] sm:text-xs text-grayText">CSS</p>
                </li>
                <li class="pixel-corners-sm bg-gray-800 border-b-4 border-accent flex flex-col items-center justify-center gap-2 w-20 h-20 sm:w-24 sm:h-24 transition-transform duration-200 ease-in-out hover:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-6 h-6 sm:w-8 sm:h-8"><path fill="#8B6FD6" d="M0 32v448h448V32H0zm243.8 349.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z"/></svg>
                    <p class="m-0 text-[10px] sm:text-xs text-grayText">JS</p>
                </li>
                <li class="pixel-corners-sm bg-gray-800 border-b-4 border-accent flex flex-col items-center justify-center gap-2 w-20 h-20 sm:w-24 sm:h-24 transition-transform duration-200 ease-in-out hover:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-6 h-6 sm:w-8 sm:h-8"><polygon fill="#8B6FD6" points="23.987,17 18.734,8 2.974,8 23.987,44 45,8 29.24,8"/><polygon fill="#5D42A9" points="29.24,8 23.987,17 18.734,8 11.146,8 23.987,30 36.828,8"/></svg>
                    <p class="m-0 text-[10px] sm:text-xs text-grayText">Vue</p>
                </li>
                <li class="pixel-corners-sm bg-gray-800 border-b-4 border-accent flex flex-col items-center justify-center gap-2 w-20 h-20 sm:w-24 sm:h-24 transition-transform duration-200 ease-in-out hover:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6 h-6 sm:w-8 sm:h-8"><path fill="#8B6FD6" d="M418.2 177.2c-5.4-1.8-10.8-3.5-16.2-5.1.9-3.7 1.7-7.4 2.5-11.1 12.3-59.6 4.2-107.5-23.1-123.3-26.3-15.1-69.2.6-112.6 38.4-4.3 3.7-8.5 7.6-12.5 11.5-2.7-2.6-5.5-5.2-8.3-7.7-45.5-40.4-91.1-57.4-118.4-41.5-26.2 15.2-34 60.3-23 116.7 1.1 5.6 2.3 11.1 3.7 16.7-6.4 1.8-12.7 3.8-18.6 5.9C38.3 196.2 0 225.4 0 255.6c0 31.2 40.8 62.5 96.3 81.5 4.5 1.5 9 3 13.6 4.3-1.5 6-2.8 11.9-4 18-10.5 55.5-2.3 99.5 23.9 114.6 27 15.6 72.4-.4 116.6-39.1 3.5-3.1 7-6.3 10.5-9.7 4.4 4.3 9 8.4 13.6 12.4 42.8 36.8 85.1 51.7 111.2 36.6 27-15.6 35.8-62.9 24.4-120.5-.9-4.4-1.9-8.9-3-13.5 3.2-.9 6.3-1.9 9.4-2.9 57.7-19.1 99.5-50 99.5-81.7 0-30.3-39.4-59.7-93.8-78.4zM282.9 92.3c37.2-32.4 71.9-45.1 87.7-36 16.9 9.7 23.4 48.9 12.8 100.4-.7 3.4-1.4 6.7-2.3 10-22.2-5-44.7-8.6-67.3-10.6-13-18.6-27.2-36.4-42.6-53.1 3.9-3.7 7.7-7.2 11.7-10.7zM167.2 307.5c5.1 8.7 10.3 17.4 15.8 25.9-15.6-1.7-31.1-4.2-46.4-7.5 4.4-14.4 9.9-29.3 16.3-44.5 4.6 8.8 9.3 17.5 14.3 26.1zm-30.3-120.3c14.4-3.2 29.7-5.8 45.6-7.8-5.3 8.3-10.5 16.8-15.4 25.4-4.9 8.5-9.7 17.2-14.2 26-6.3-14.9-11.6-29.5-16-43.6zm27.4 68.9c6.6-13.8 13.8-27.3 21.4-40.6s15.8-26.2 24.4-38.9c15-1.1 30.3-1.7 45.9-1.7s31 .6 45.9 1.7c8.5 12.6 16.6 25.5 24.3 38.7s14.9 26.7 21.7 40.4c-6.7 13.8-13.9 27.4-21.6 40.8-7.6 13.3-15.7 26.2-24.2 39-14.9 1.1-30.4 1.6-46.1 1.6s-30.9-.5-45.6-1.4c-8.7-12.7-16.9-25.7-24.6-39s-14.8-26.8-21.5-40.6zm180.6 51.2c5.1-8.8 9.9-17.7 14.6-26.7 6.4 14.5 12 29.2 16.9 44.3-15.5 3.5-31.2 6.2-47 8 5.4-8.4 10.5-17 15.5-25.6zm14.4-76.5c-4.7-8.8-9.5-17.6-14.5-26.2-4.9-8.5-10-16.9-15.3-25.2 16.1 2 31.5 4.7 45.9 8-4.6 14.8-10 29.2-16.1 43.4zM256.2 118.3c10.5 11.4 20.4 23.4 29.6 35.8-19.8-.9-39.7-.9-59.5 0 9.8-12.9 19.9-24.9 29.9-35.8zM140.2 57c16.8-9.8 54.1 4.2 93.4 39 2.5 2.2 5 4.6 7.6 7-15.5 16.7-29.8 34.5-42.9 53.1-22.6 2-45 5.5-67.2 10.4-1.3-5.1-2.4-10.3-3.5-15.5-9.4-48.4-3.2-84.9 12.6-94zm-24.5 263.6c-4.2-1.2-8.3-2.5-12.4-3.9-21.3-6.7-45.5-17.3-63-31.2-10.1-7-16.9-17.8-18.8-29.9 0-18.3 31.6-41.7 77.2-57.6 5.7-2 11.5-3.8 17.3-5.5 6.8 21.7 15 43 24.5 63.6-9.6 20.9-17.9 42.5-24.8 64.5zm116.6 98c-16.5 15.1-35.6 27.1-56.4 35.3-11.1 5.3-23.9 5.8-35.3 1.3-15.9-9.2-22.5-44.5-13.5-92 1.1-5.6 2.3-11.2 3.7-16.7 22.4 4.8 45 8.1 67.9 9.8 13.2 18.7 27.7 36.6 43.2 53.4-3.2 3.1-6.4 6.1-9.6 8.9zm24.5-24.3c-10.2-11-20.4-23.2-30.3-36.3 9.6.4 19.5.6 29.5.6 10.3 0 20.4-.2 30.4-.7-9.2 12.7-19.1 24.8-29.6 36.4zm130.7 30c-.9 12.2-6.9 23.6-16.5 31.3-15.9 9.2-49.8-2.8-86.4-34.2-4.2-3.6-8.4-7.5-12.7-11.5 15.3-16.9 29.4-34.8 42.2-53.6 22.9-1.9 45.7-5.4 68.2-10.5 1 4.1 1.9 8.2 2.7 12.2 4.9 21.6 5.7 44.1 2.5 66.3zm18.2-107.5c-2.8.9-5.6 1.8-8.5 2.6-7-21.8-15.6-43.1-25.5-63.8 9.6-20.4 17.7-41.4 24.5-62.9 5.2 1.5 10.2 3.1 15 4.7 46.6 16 79.3 39.8 79.3 58 0 19.6-34.9 44.9-84.8 61.4zm-149.7-15c25.3 0 45.8-20.5 45.8-45.8s-20.5-45.8-45.8-45.8c-25.3 0-45.8 20.5-45.8 45.8s20.5 45.8 45.8 45.8z"/></svg>
                    <p class="m-0 text-[10px] sm:text-xs text-grayText">React</p>
                </li>
                <li class="pixel-corners-sm bg-gray-800 border-b-4 border-accent flex flex-col items-center justify-center gap-2 w-20 h-20 sm:w-24 sm:h-24 transition-transform duration-200 ease-in-out hover:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-6 h-6 sm:w-8 sm:h-8"><path fill="#8B6FD6" d="M24,9.604c-6.4,0-10.4,3.199-12,9.597c2.4-3.199,5.2-4.398,8.4-3.599 c1.826,0.456,3.131,1.781,4.576,3.247C27.328,21.236,30.051,24,36,24c6.4,0,10.4-3.199,12-9.598c-2.4,3.199-5.2,4.399-8.4,3.6 c-1.825-0.456-3.13-1.781-4.575-3.247C32.672,12.367,29.948,9.604,24,9.604L24,9.604z M12,24c-6.4,0-10.4,3.199-12,9.598 c2.4-3.199,5.2-4.399,8.4-3.599c1.825,0.457,3.13,1.781,4.575,3.246c2.353,2.388,5.077,5.152,11.025,5.152 c6.4,0,10.4-3.199,12-9.598c-2.4,3.199-5.2,4.399-8.4,3.599c-1.826-0.456-3.131-1.781-4.576-3.246C20.672,26.764,17.949,24,12,24 L12,24z"/></svg>
                    <p class="m-0 text-[10px] sm:text-xs text-grayText">Tailwind</p>
                </li>
                <li class="pixel-corners-sm bg-gray-800 border-b-4 border-accent flex flex-col items-center justify-center gap-2 w-20 h-20 sm:w-24 sm:h-24 transition-transform duration-200 ease-in-out hover:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="w-6 h-6 sm:w-8 sm:h-8"><path fill="#8B6FD6" d="M8.562,15.256A21.159,21.159,0,0,0,16,16.449a21.159,21.159,0,0,0,7.438-1.194c1.864-.727,2.525-1.535,2.525-2V9.7a10.357,10.357,0,0,1-2.084,1.076A22.293,22.293,0,0,1,16,12.078a22.36,22.36,0,0,1-7.879-1.3A10.28,10.28,0,0,1,6.037,9.7v3.55C6.037,13.724,6.7,14.528,8.562,15.256Z"/><path fill="#8B6FD6" d="M8.562,21.961a15.611,15.611,0,0,0,2.6.741A24.9,24.9,0,0,0,16,23.155a24.9,24.9,0,0,0,4.838-.452,15.614,15.614,0,0,0,2.6-.741c1.864-.727,2.525-1.535,2.525-2v-3.39a10.706,10.706,0,0,1-1.692.825A23.49,23.49,0,0,1,16,18.74a23.49,23.49,0,0,1-8.271-1.348,10.829,10.829,0,0,1-1.692-.825V19.96C6.037,20.426,6.7,21.231,8.562,21.961Z"/><path fill="#8B6FD6" d="M16,30c5.5,0,9.963-1.744,9.963-3.894V23.269a10.5,10.5,0,0,1-1.535.762l-.157.063A23.487,23.487,0,0,1,16,25.445a23.422,23.422,0,0,1-8.271-1.351c-.054-.02-.106-.043-.157-.063a10.5,10.5,0,0,1-1.535-.762v2.837C6.037,28.256,10.5,30,16,30Z"/><ellipse cx="16" cy="5.894" rx="9.963" ry="3.894" fill="#8B6FD6"/></svg>
                    <p class="m-0 text-[10px] sm:text-xs text-grayText">SQL</p>
                </li>
                <li class="pixel-corners-sm bg-gray-800 border-b-4 border-accent flex flex-col items-center justify-center gap-2 w-20 h-20 sm:w-24 sm:h-24 transition-transform duration-200 ease-in-out hover:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" class="w-6 h-6 sm:w-8 sm:h-8"><path fill="#5D42A9" d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z"/><path fill="#8B6FD6" d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z"/><path fill="#fff" d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6zM97 66.2l.9-4.3h-4.2v-4.7h5.1L100 51h4.9l-1.2 6.1h3.8l1.2-6.1h4.8l-1.2 6.1h2.4v4.7h-3.3l-.9 4.3h4.2v4.7h-5.1l-1.2 6h-4.9l1.2-6h-3.8l-1.2 6h-4.8l1.2-6h-2.4v-4.7H97zm4.8 0h3.8l.9-4.3h-3.8l-.9 4.3z"/></svg>
                    <p class="m-0 text-[10px] sm:text-xs text-grayText">C#</p>
                </li>
                <li class="pixel-corners-sm bg-gray-800 border-b-4 border-accent flex flex-col items-center justify-center gap-2 w-20 h-20 sm:w-24 sm:h-24 transition-transform duration-200 ease-in-out hover:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 sm:w-8 sm:h-8"><path fill="#8B6FD6" d="M24 8.77h-2.468v7.565h-1.425V8.77h-2.462V7.53H24zm-6.852 7.565h-4.821V7.53h4.63v1.24h-3.205v2.494h2.953v1.234h-2.953v2.604h3.396zm-6.708 0H8.882L4.78 9.863a2.896 2.896 0 0 1-.258-.51h-.036c.032.189.048.592.048 1.21v5.772H3.157V7.53h1.659l3.965 6.32c.167.261.275.442.323.54h.024c-.04-.233-.06-.629-.06-1.185V7.529h1.372zm-8.703-.693a.868.829 0 0 1-.869.829.868.829 0 0 1-.868-.83.868.829 0 0 1 .868-.828.868.829 0 0 1 .869.829Z"/></svg>
                    <p class="m-0 text-[10px] sm:text-xs text-grayText">.NET</p>
                </li>
                <li class="pixel-corners-sm bg-gray-800 border-b-4 border-accent flex flex-col items-center justify-center gap-2 w-20 h-20 sm:w-24 sm:h-24 transition-transform duration-200 ease-in-out hover:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" class="w-6 h-6 sm:w-8 sm:h-8"><path fill="#8B6FD6" d="M0 0h128v128H0z"/><path fill="#fff" d="M73.022 80.632h-5.415V47.368H86.4v4.596H73.022V62.34h12.514v4.574H73.022v13.72zm-12.582 0H41.601V47.368h18.84v4.596H47.06v9.033h12.537v4.573H47.062v10.443H60.44v4.62z"/></svg>
                    <p class="m-0 text-[10px] sm:text-xs text-grayText">EF Core</p>
                </li>
                <li class="pixel-corners-sm bg-gray-800 border-b-4 border-accent flex flex-col items-center justify-center gap-2 w-20 h-20 sm:w-24 sm:h-24 transition-transform duration-200 ease-in-out hover:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 sm:w-8 sm:h-8"><path fill="#8B6FD6" d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/></svg>
                    <p class="m-0 text-[10px] sm:text-xs text-grayText">Docker</p>
                </li>
                <li class="pixel-corners-sm bg-gray-800 border-b-4 border-accent flex flex-col items-center justify-center gap-2 w-20 h-20 sm:w-24 sm:h-24 transition-transform duration-200 ease-in-out hover:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 sm:w-8 sm:h-8"><path fill="#8B6FD6" d="M13.09 23.549a1.54 1.54 0 0 1-2.18 0L.451 13.089a1.54 1.54 0 0 1 0-2.179l7.191-7.19 2.733 2.733a1.85 1.85 0 0 0 .964 2.326v6.66a1.849 1.849 0 1 0 1.54 0V8.957l2.508 2.508a1.85 1.85 0 1 0 1.09-1.09l-2.634-2.634a1.85 1.85 0 0 0-2.378-2.377L8.73 2.63 10.91.451a1.54 1.54 0 0 1 2.179 0l10.459 10.46a1.54 1.54 0 0 1 0 2.179z"/></svg>
                    <p class="m-0 text-[10px] sm:text-xs text-grayText">Git</p>
                </li>
                <li class="pixel-corners-sm bg-gray-800 border-b-4 border-accent flex flex-col items-center justify-center gap-2 w-20 h-20 sm:w-24 sm:h-24 transition-transform duration-200 ease-in-out hover:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 sm:w-8 sm:h-8"><path fill="#8B6FD6" d="M11.77 11.24H9.956V8.202h2.152c1.17 0 1.834.522 1.834 1.466 0 1.008-.773 1.572-2.174 1.572zm.324 1.206H9.957v3.348h2.231c1.459 0 2.232-.585 2.232-1.685s-.795-1.663-2.326-1.663zM24 11.39v1.218c-1.128.108-1.817.944-2.226 2.268-.407 1.319-.463 2.937-.42 4.186.045 1.3-.968 2.5-2.337 2.5H4.985c-1.37 0-2.383-1.2-2.337-2.5.043-1.249-.013-2.867-.42-4.186-.41-1.324-1.1-2.16-2.228-2.268V11.39c1.128-.108 1.819-.944 2.227-2.268.408-1.319.464-2.937.42-4.186-.045-1.3.968-2.5 2.338-2.5h14.032c1.37 0 2.382 1.2 2.337 2.5-.043 1.249.013 2.867.42 4.186.409 1.324 1.098 2.16 2.226 2.268zm-7.927 2.817c0-1.354-.953-2.333-2.368-2.488v-.057c1.04-.169 1.856-1.135 1.856-2.213 0-1.537-1.213-2.538-3.062-2.538h-4.16v10.172h4.181c2.218 0 3.553-1.086 3.553-2.876z"/></svg>
                    <p class="m-0 text-[10px] sm:text-xs text-grayText">Bootstrap</p>
                </li>
            </ul>
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

// Posiciones distintas a las de AboutMe (que usa las mismas 4 nubes): acá se
// ubican más hacia los bordes/esquinas para no tapar la grilla de íconos que
// ocupa el centro de la sección.
const CLOUDS = [
    { src: nube1, top: '4%', left: '4%', width: 130, height: 67, duration: '24s', delay: '-2s', phase: 0.6, amplitude: 60 },
    { src: nube2, top: '10%', left: '86%', width: 150, height: 83, duration: '20s', delay: '-11s', phase: 2, amplitude: 68 },
    { src: nube3, top: '82%', left: '6%', width: 120, height: 68, duration: '27s', delay: '-6s', phase: 3.2, amplitude: 50 },
    { src: nube4, top: '86%', left: '78%', width: 170, height: 50, duration: '23s', delay: '-16s', phase: 4.4, amplitude: 72 },
]

export default {
    name: 'My-Skills',
    components: {
        PixelStars,
        PixelClouds,
    },
    data() {
        return { languageState, clouds: CLOUDS }
    },
    computed: {
        t() {
            return translations[this.languageState.value]
        },
    },
}
</script>
