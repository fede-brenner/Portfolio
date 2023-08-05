<template lang="">
    <section id="skills" class="p-0 flex flex-col items-center my-32 mx-2 md:mx-8 text-white overflow-hidden">
        <div class="w-full flex flex-col items-center md:max-w-[1080px]">
            <h2 class="w-full text-4xl my-32 text-left px-6 md:px-0">SKILLS</h2>
            <div id="container" class="ml-7 md:ml-16 grid grid-flow-row mjustify-between mitems-center grid-cols-14-2 sm:grid-cols-14 md:grid-cols-16 lg:grid-cols-18 grid-rows-3 grid-row-w">
                <div id="tab" class="p-0 flex flex-col items-end transition-transform duration-200 ease-in-out hover:scale-95 col-span-4">
                    <img src="../assets/tab-key.png" alt="tab key" class="w-[83px] sm:w-[166px]">
                    <p class="absolute translate-y-[17px] sm:translate-y-[36px] translate-x-[-28px] sm:translate-x-[-60px]  text-[#414e80] text-xs sm:text-xl">TAB</p>
                </div>

                <div id="html" class="p-0 flex flex-col items-center transition-transform duration-200 ease-in-out hover:scale-95 col-span-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="absolute translate-y-[13px] sm:translate-y-[27px] w-[12px] sm:w-[25px]"><path style="fill:#414e80" d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z"/></svg>
                    <img src="../assets/key.png" alt="skill key" class="w-[50px] sm:w-[100px]">
                    <p class="absolute translate-y-[30px] sm:translate-y-[60px] text-[#414e80] text-[6px] sm:text-sm">HTML</p>
                </div>
                <div id="css" class="p-0 flex flex-col items-center transition-transform duration-200 ease-in-out hover:scale-95 col-span-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="absolute translate-y-[13px] sm:translate-y-[27px] w-[12px] sm:w-[25px]"><path style="fill:#414e80" d="M0 32l34.9 395.8L192 480l157.1-52.2L384 32H0zm313.1 80l-4.8 47.3L193 208.6l-.3.1h111.5l-12.8 146.6-98.2 28.7-98.8-29.2-6.4-73.9h48.9l3.2 38.3 52.6 13.3 54.7-15.4 3.7-61.6-166.3-.5v-.1l-.2.1-3.6-46.3L193.1 162l6.5-2.7H76.7L70.9 112h242.2z"/></svg>
                    <img src="../assets/key.png" alt="skill key" class="w-[50px] sm:w-[100px]">
                    <p class="absolute translate-y-[30px] sm:translate-y-[60px] text-[#414e80] text-[6px] sm:text-sm">CSS</p>
                </div>
                <div id="java-script" class="p-0 flex flex-col items-center transition-transform duration-200 ease-in-out hover:scale-95 col-span-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="absolute translate-y-[13px] sm:translate-y-[27px] w-[15px] sm:w-[30px]"><path style="fill:#414e80" d="M0 32v448h448V32H0zm243.8 349.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z"/></svg>
                    <img src="../assets/key.png" alt="skill key" class="w-[50px] sm:w-[100px]">
                    <p class="absolute translate-y-[30px] sm:translate-y-[60px] text-[#414e80] text-[6px] sm:text-sm">JS</p>
                </div>

                <div id="enter" class="p-0 flex flex-col items-end transition-transform duration-200 ease-in-out hover:translate-x-[-3px] hover:scale-[.98] col-span-4 row-span-2 col-start-11 md:col-start-13 lg:col-[15_/_start_15] row-start-1">
                    <img src="../assets/enter-key.png" alt="enter key" class="w-[80px] sm:w-[160px] translate-x-[-51px] sm:translate-x-[-102px]">
                </div>
                <div id="caps" class="p-0 flex flex-col items-end transition-transform duration-200 ease-in-out hover:scale-95 col-span-5 translate-x-[-6px] sm:translate-x-[-11px] col-start-1 md:row-start-2">
                    <img src="../assets/caps-key.png" alt="caps key" class="w-[102px] sm:w-[205px]">
                    <p class="absolute translate-y-[17px] sm:translate-y-[36px] translate-x-[-32px] sm:translate-x-[-71px] text-[#414e80] text-xs sm:text-xl">CAPS</p>
                </div>

                <div id="react" class="p-0 flex flex-col items-center transition-transform duration-200 ease-in-out hover:scale-95 col-span-2 z-10 translate-x-[-6px] sm:translate-x-[-11px] md:translate-x-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="absolute translate-y-[13px] sm:translate-y-[27px] w-[17px] sm:w-[35px]"><path style="fill:#414e80" d="M418.2 177.2c-5.4-1.8-10.8-3.5-16.2-5.1.9-3.7 1.7-7.4 2.5-11.1 12.3-59.6 4.2-107.5-23.1-123.3-26.3-15.1-69.2.6-112.6 38.4-4.3 3.7-8.5 7.6-12.5 11.5-2.7-2.6-5.5-5.2-8.3-7.7-45.5-40.4-91.1-57.4-118.4-41.5-26.2 15.2-34 60.3-23 116.7 1.1 5.6 2.3 11.1 3.7 16.7-6.4 1.8-12.7 3.8-18.6 5.9C38.3 196.2 0 225.4 0 255.6c0 31.2 40.8 62.5 96.3 81.5 4.5 1.5 9 3 13.6 4.3-1.5 6-2.8 11.9-4 18-10.5 55.5-2.3 99.5 23.9 114.6 27 15.6 72.4-.4 116.6-39.1 3.5-3.1 7-6.3 10.5-9.7 4.4 4.3 9 8.4 13.6 12.4 42.8 36.8 85.1 51.7 111.2 36.6 27-15.6 35.8-62.9 24.4-120.5-.9-4.4-1.9-8.9-3-13.5 3.2-.9 6.3-1.9 9.4-2.9 57.7-19.1 99.5-50 99.5-81.7 0-30.3-39.4-59.7-93.8-78.4zM282.9 92.3c37.2-32.4 71.9-45.1 87.7-36 16.9 9.7 23.4 48.9 12.8 100.4-.7 3.4-1.4 6.7-2.3 10-22.2-5-44.7-8.6-67.3-10.6-13-18.6-27.2-36.4-42.6-53.1 3.9-3.7 7.7-7.2 11.7-10.7zM167.2 307.5c5.1 8.7 10.3 17.4 15.8 25.9-15.6-1.7-31.1-4.2-46.4-7.5 4.4-14.4 9.9-29.3 16.3-44.5 4.6 8.8 9.3 17.5 14.3 26.1zm-30.3-120.3c14.4-3.2 29.7-5.8 45.6-7.8-5.3 8.3-10.5 16.8-15.4 25.4-4.9 8.5-9.7 17.2-14.2 26-6.3-14.9-11.6-29.5-16-43.6zm27.4 68.9c6.6-13.8 13.8-27.3 21.4-40.6s15.8-26.2 24.4-38.9c15-1.1 30.3-1.7 45.9-1.7s31 .6 45.9 1.7c8.5 12.6 16.6 25.5 24.3 38.7s14.9 26.7 21.7 40.4c-6.7 13.8-13.9 27.4-21.6 40.8-7.6 13.3-15.7 26.2-24.2 39-14.9 1.1-30.4 1.6-46.1 1.6s-30.9-.5-45.6-1.4c-8.7-12.7-16.9-25.7-24.6-39s-14.8-26.8-21.5-40.6zm180.6 51.2c5.1-8.8 9.9-17.7 14.6-26.7 6.4 14.5 12 29.2 16.9 44.3-15.5 3.5-31.2 6.2-47 8 5.4-8.4 10.5-17 15.5-25.6zm14.4-76.5c-4.7-8.8-9.5-17.6-14.5-26.2-4.9-8.5-10-16.9-15.3-25.2 16.1 2 31.5 4.7 45.9 8-4.6 14.8-10 29.2-16.1 43.4zM256.2 118.3c10.5 11.4 20.4 23.4 29.6 35.8-19.8-.9-39.7-.9-59.5 0 9.8-12.9 19.9-24.9 29.9-35.8zM140.2 57c16.8-9.8 54.1 4.2 93.4 39 2.5 2.2 5 4.6 7.6 7-15.5 16.7-29.8 34.5-42.9 53.1-22.6 2-45 5.5-67.2 10.4-1.3-5.1-2.4-10.3-3.5-15.5-9.4-48.4-3.2-84.9 12.6-94zm-24.5 263.6c-4.2-1.2-8.3-2.5-12.4-3.9-21.3-6.7-45.5-17.3-63-31.2-10.1-7-16.9-17.8-18.8-29.9 0-18.3 31.6-41.7 77.2-57.6 5.7-2 11.5-3.8 17.3-5.5 6.8 21.7 15 43 24.5 63.6-9.6 20.9-17.9 42.5-24.8 64.5zm116.6 98c-16.5 15.1-35.6 27.1-56.4 35.3-11.1 5.3-23.9 5.8-35.3 1.3-15.9-9.2-22.5-44.5-13.5-92 1.1-5.6 2.3-11.2 3.7-16.7 22.4 4.8 45 8.1 67.9 9.8 13.2 18.7 27.7 36.6 43.2 53.4-3.2 3.1-6.4 6.1-9.6 8.9zm24.5-24.3c-10.2-11-20.4-23.2-30.3-36.3 9.6.4 19.5.6 29.5.6 10.3 0 20.4-.2 30.4-.7-9.2 12.7-19.1 24.8-29.6 36.4zm130.7 30c-.9 12.2-6.9 23.6-16.5 31.3-15.9 9.2-49.8-2.8-86.4-34.2-4.2-3.6-8.4-7.5-12.7-11.5 15.3-16.9 29.4-34.8 42.2-53.6 22.9-1.9 45.7-5.4 68.2-10.5 1 4.1 1.9 8.2 2.7 12.2 4.9 21.6 5.7 44.1 2.5 66.3zm18.2-107.5c-2.8.9-5.6 1.8-8.5 2.6-7-21.8-15.6-43.1-25.5-63.8 9.6-20.4 17.7-41.4 24.5-62.9 5.2 1.5 10.2 3.1 15 4.7 46.6 16 79.3 39.8 79.3 58 0 19.6-34.9 44.9-84.8 61.4zm-149.7-15c25.3 0 45.8-20.5 45.8-45.8s-20.5-45.8-45.8-45.8c-25.3 0-45.8 20.5-45.8 45.8s20.5 45.8 45.8 45.8z"/></svg>
                    <img src="../assets/key.png" alt="skill key" class="w-[50px] sm:w-[100px]">
                    <p class="absolute translate-y-[30px] sm:translate-y-[60px] text-[#414e80] text-[6px] sm:text-sm">React</p>
                </div>
                <div id="dot-net" class="hidden p-0 md:flex flex-col items-center transition-transform duration-200 ease-in-out hover:scale-95 col-span-2 translate-x-[-6px] md:translate-x-[-11px]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="absolute translate-y-[13px] sm:translate-y-[26px] w-[16px] sm:w-[32px]"><path fill="#3a4570" d="M44 25c0 5.694-2.381 10.831-6.2 14.481l-.006.006A19.972 19.972 0 0 1 24 45C12.956 45 4 36.044 4 25a19.913 19.913 0 0 1 5.5-13.775c.006-.013.013-.019.019-.025C13.169 7.381 18.306 5 24 5c11.044 0 20 8.956 20 20Z"/><path fill="#414e80" d="M38.375 38.862c-.187.213-.381.419-.575.619l-.006.006A19.972 19.972 0 0 1 24 45C12.956 45 4 36.044 4 25a19.913 19.913 0 0 1 5.5-13.775c.006-.013.013-.019.019-.025.2-.194.406-.387.619-.575l28.237 28.237Z"/><path fill="#7986ba" d="M8.626 31.281a.841.841 0 0 1-.625-.262.862.862 0 0 1-.256-.625.877.877 0 0 1 .256-.625.837.837 0 0 1 .625-.269.854.854 0 0 1 .625.269c.169.164.263.39.262.625a.858.858 0 0 1-.262.625.862.862 0 0 1-.625.262Zm12.418-.156h-1.638l-5.856-9.087a3.82 3.82 0 0 1-.363-.712h-.05c.056.519.077 1.041.062 1.562v8.237h-1.331V19.731h1.731l5.7 8.925c.237.371.392.625.462.763h.031a12.017 12.017 0 0 1-.081-1.675v-8.012h1.331v11.393h.002Zm9.013 0h-6.056V19.731h5.775v1.206h-4.412v3.788h4.113v1.2h-4.113v3.95h4.7l-.007 1.25Zm8.944-10.187h-3.312v10.188h-1.331V20.938h-3.275v-1.206h7.919l-.001 1.206Z"/></svg>
                    <img src="../assets/key.png" alt="dot net key" class="w-[50px] sm:w-[100px]">
                    <p class="absolute translate-y-[30px] sm:translate-y-[60px] text-[#414e80] text-[6px] sm:text-sm">.NET</p>
                </div>
                <div id="c-sharp" class="p-0 flex flex-col items-center transition-transform duration-200 ease-in-out hover:scale-95 col-span-2 translate-x-[-6px] sm:translate-x-[-11px]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 288" class="absolute translate-y-[14px] sm:translate-y-[28px] w-[13px] sm:w-[27px]"><path d="m255.569 84.452376c-.002-4.83-1.035-9.098-3.124-12.761-2.052-3.602-5.125-6.621-9.247-9.008-34.025-19.619-68.083-39.178-102.097-58.81699995-9.17-5.294-18.061-5.101-27.163.269-13.543 7.98699995-81.348 46.83399995-101.553 58.53699995-8.321 4.817-12.37 12.189-12.372 21.771-.013 39.455 0 78.909-.013 118.365 0 4.724.991 8.909 2.988 12.517 2.053 3.711 5.169 6.813 9.386 9.254 20.206 11.703 88.02 50.547 101.56 58.536 9.106 5.373 17.997 5.565 27.17.269 34.015-19.64 68.075-39.198 102.105-58.817 4.217-2.44 7.333-5.544 9.386-9.252 1.994-3.608 2.987-7.793 2.987-12.518 0 0 0-78.889-.013-118.345" fill="#3a4570"/><path d="m128.182 143.241376-125.194 72.084c2.053 3.711 5.169 6.813 9.386 9.254 20.206 11.703 88.02 50.547 101.56 58.536 9.106 5.373 17.997 5.565 27.17.269 34.015-19.64 68.075-39.198 102.105-58.817 4.217-2.44 7.333-5.544 9.386-9.252z" fill="#2e375c"/><path d="m255.569 84.452376c-.002-4.83-1.035-9.098-3.124-12.761l-124.263 71.55 124.413 72.074c1.994-3.608 2.985-7.793 2.987-12.518 0 0 0-78.889-.013-118.345" fill="#2a3152"/><g fill="#606da1"><path d="m201.892326 116.294008v13.473684h13.473684v-13.473684h6.736842v13.473684h13.473685v6.736842h-13.473685v13.473684h13.473685v6.736842h-13.473685v13.473684h-6.736842v-13.473684h-13.473684v13.473684h-6.736842v-13.473684h-13.473684v-6.736842h13.473684v-13.473684h-13.473684v-6.736842h13.473684v-13.473684zm13.473684 20.210526h-13.473684v13.473684h13.473684z"/><path d="m128.456752 48.625876c35.143771 0 65.827133 19.0862981 82.26181 47.4560675l-.16037-.2730675-41.348577 23.808283c-8.146656-13.793605-23.081479-23.1020873-40.213232-23.2937868l-.539631-.0030178c-26.125574 0-47.3060815 21.1793886-47.3060815 47.3049616 0 8.543615 2.2777748 16.552204 6.2389764 23.469476 8.1540981 14.235253 23.4829071 23.836606 41.0671051 23.836606 17.69277 0 33.108884-9.723357 41.221568-24.110835l-.197128.345313 41.286486 23.918037c-16.254398 28.129557-46.517408 47.156948-81.252701 47.536189l-1.058225.005774c-35.2545819 0-66.0252492-19.203824-82.4185122-47.72358-8.0029927-13.922969-12.5820476-30.064389-12.5820476-47.27698 0-52.4660524 42.5322682-94.99944 95.0005598-94.99944z"/></g></svg>
                    <img src="../assets/key.png" alt="skill key" class="w-[50px] sm:w-[100px]">
                    <p class="absolute translate-y-[30px] sm:translate-y-[60px] text-[#414e80] text-[6px] sm:text-sm">C#</p>
                </div>
                
                <div id="control" class="p-0 flex flex-col items-end transition-transform duration-200 ease-in-out hover:scale-95 col-span-4 lg:col-start-1 lg:row-start-3">
                    <img src="../assets/tab-key.png" alt="control key" class="w-[83px] sm:w-[166px]">
                    <p class="absolute translate-y-[17px] sm:translate-y-[36px] translate-x-[-25px] sm:translate-x-[-50px]  text-[#414e80] text-xs sm:text-xl">CTRL</p>
                </div>
                <div id="min-max" class="hidden p-0 md:flex flex-col items-center transition-transform duration-200 ease-in-out hover:scale-95 col-span-2">
                    <img src="../assets/key.png" alt="min max key" class="w-[50px] sm:w-[100px]">
                    <p class="absolute translate-y-[12px] sm:translate-y-[22px] text-[#414e80] text-[8px] sm:text-xl">&lt;<br>&gt;</p>
                </div>

                <div id="sql" class="p-0 flex flex-col items-center transition-transform duration-200 ease-in-out hover:scale-95 col-span-2 md:translate-x-[-11px] md:row-start-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="absolute translate-y-[14px] sm:translate-y-[28px] w-[15px] sm:w-[30px]"><path d="M8.562,15.256A21.159,21.159,0,0,0,16,16.449a21.159,21.159,0,0,0,7.438-1.194c1.864-.727,2.525-1.535,2.525-2V9.7a10.357,10.357,0,0,1-2.084,1.076A22.293,22.293,0,0,1,16,12.078a22.36,22.36,0,0,1-7.879-1.3A10.28,10.28,0,0,1,6.037,9.7v3.55C6.037,13.724,6.7,14.528,8.562,15.256Z" style="fill:#414e80"/><path d="M8.562,21.961a15.611,15.611,0,0,0,2.6.741A24.9,24.9,0,0,0,16,23.155a24.9,24.9,0,0,0,4.838-.452,15.614,15.614,0,0,0,2.6-.741c1.864-.727,2.525-1.535,2.525-2v-3.39a10.706,10.706,0,0,1-1.692.825A23.49,23.49,0,0,1,16,18.74a23.49,23.49,0,0,1-8.271-1.348,10.829,10.829,0,0,1-1.692-.825V19.96C6.037,20.426,6.7,21.231,8.562,21.961Z" style="fill:#414e80"/><path d="M16,30c5.5,0,9.963-1.744,9.963-3.894V23.269a10.5,10.5,0,0,1-1.535.762l-.157.063A23.487,23.487,0,0,1,16,25.445a23.422,23.422,0,0,1-8.271-1.351c-.054-.02-.106-.043-.157-.063a10.5,10.5,0,0,1-1.535-.762v2.837C6.037,28.256,10.5,30,16,30Z" style="fill:#414e80"/><ellipse cx="16" cy="5.894" rx="9.963" ry="3.894" style="fill:#414e80"/></svg>
                    <img src="../assets/key.png" alt="skill key" class="w-[50px] sm:w-[100px]">
                    <p class="absolute translate-y-[30px] sm:translate-y-[60px] text-[#414e80] text-[6px] sm:text-sm">SQL</p>
                </div>
                

                <div id="vue" class="p-0 flex flex-col items-center transition-transform duration-200 ease-in-out hover:scale-95 col-span-2 lg:col-start-13 lg:row-start-1">
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" class="absolute translate-y-[12px] sm:translate-y-[25px] w-[17px] sm:w-[35px]"><polygon fill="#414e80" points="23.987,17 18.734,8 2.974,8 23.987,44 45,8 29.24,8"/><polygon fill="#2e375c" points="29.24,8 23.987,17 18.734,8 11.146,8 23.987,30 36.828,8"/></svg>
                    <img src="../assets/key.png" alt="skill key" class="w-[50px] sm:w-[100px]">
                    <p class="absolute translate-y-[30px] sm:translate-y-[60px] text-[#414e80] text-[6px] sm:text-sm">Vue</p>
                </div>
                <div id="tailwind" class="hidden p-0 md:flex flex-col items-center transition-transform duration-200 ease-in-out hover:scale-95 col-span-2 lg:col-start-12 lg:row-start-2 lg:translate-x-[-11px]">
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" class="absolute translate-y-[12px] sm:translate-y-[25px] w-[17px] sm:w-[35px]"><path fill="#414e80" d="M24,9.604c-6.4,0-10.4,3.199-12,9.597c2.4-3.199,5.2-4.398,8.4-3.599 c1.826,0.456,3.131,1.781,4.576,3.247C27.328,21.236,30.051,24,36,24c6.4,0,10.4-3.199,12-9.598c-2.4,3.199-5.2,4.399-8.4,3.6 c-1.825-0.456-3.13-1.781-4.575-3.247C32.672,12.367,29.948,9.604,24,9.604L24,9.604z M12,24c-6.4,0-10.4,3.199-12,9.598 c2.4-3.199,5.2-4.399,8.4-3.599c1.825,0.457,3.13,1.781,4.575,3.246c2.353,2.388,5.077,5.152,11.025,5.152 c6.4,0,10.4-3.199,12-9.598c-2.4,3.199-5.2,4.399-8.4,3.599c-1.826-0.456-3.131-1.781-4.576-3.246C20.672,26.764,17.949,24,12,24 L12,24z"/></svg>
                    <img src="../assets/key.png" alt="tailwind key" class="w-[50px] sm:w-[100px]">
                    <p class="absolute translate-y-[30px] sm:translate-y-[63px] text-[#414e80] text-[4px] sm:text-[11px]">Tailwind</p>
                </div>

                <div id="coma" class="hidden p-0 lg:flex flex-col items-center transition-transform duration-200 ease-in-out hover:scale-95 col-span-2">
                    <img src="../assets/key.png" alt="coma key" class="w-[50px] sm:w-[100px]">
                    <p class="absolute translate-y-[12px] sm:translate-y-[22px] text-[#414e80] text-[8px] sm:text-xl">;<br>,</p>
                </div>
                <div id="point" class="hidden p-0 lg:flex flex-col items-center transition-transform duration-200 ease-in-out hover:scale-95 col-span-2">
                    <img src="../assets/key.png" alt="point key" class="w-[50px] sm:w-[100px]">
                    <p class="absolute translate-y-[12px] sm:translate-y-[22px] text-[#414e80] text-[8px] sm:text-xl">:<br>.</p>
                </div>
                <div id="dash" class="hidden p-0 lg:flex flex-col items-center transition-transform duration-200 ease-in-out hover:scale-95 col-span-2">
                    <img src="../assets/key.png" alt="dash key" class="w-[50px] sm:w-[100px]">
                    <p class="absolute translate-y-[12px] sm:translate-y-[22px] text-[#414e80] text-[8px] sm:text-xl">_<br>-</p>
                </div>
                <div id="right-shift" class="p-0 flex flex-col items-start transition-transform duration-200 ease-in-out hover:scale-95 col-span-5">
                    <img src="../assets/shift-right-key.png" alt="right shift key" class="w-[100px] sm:w-[198px]">
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: 'my-skills',
}
</script>
<style lang="">
    
</style>