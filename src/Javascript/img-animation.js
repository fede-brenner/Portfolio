const corners = document.getElementById('img-corners');
const imgfederico = document.getElementById('img-federico');
const navbar = document.getElementById('navbar');
const mouse = document.getElementById('mouse');

corners.style.display = 'none';
setTimeout(CornersAnim,3500);
function CornersAnim(){
    corners.style.removeProperty('display');
    corners.style.zIndex = '99';
    corners.style.animation = '0.5s ease-in 0s 1 zoomin';
}

imgfederico.style.display = 'none';
setTimeout(CornersAnim2,4000);
function CornersAnim2(){
    corners.style.animation = '0.8s ease-in 0s 1 focusein';
    imgfederico.style.removeProperty('display');
}

setTimeout(CornersAnim3,5000);
function CornersAnim3(){
    corners.style.zIndex = '0';
    corners.style.animation = '1s ease-in 0s 1 zoomout';
    setTimeout(dissapear,1000);
    function dissapear(){
        corners.style.display = 'none';
    }
}

navbar.style.display = 'none';
mouse.style.display = 'none';
setTimeout(NavBarAnim,5500);
function NavBarAnim(){
    navbar.style.removeProperty('display');
    navbar.style.animation = '0.8s ease-in 0s 1 fadein';
    mouse.style.removeProperty('display');
    mouse.style.animation = '0.8s ease-in 0s 1 fadein';
}


let f = 0;
var elements = document.getElementById('container').children;
console.log(elements.length);
function remove(){
    if(f  >= 200){
        return;
    }
    let randomelem = getRandom(elements.length-1);
    correctElem();
    function correctElem(){
        if(elements[randomelem].style.opacity == '0'){
            randomelem = getRandom(elements.length-1);
            correctElem();
        }else if( randomelem == 1 || randomelem >= 11 && randomelem <= 13 || randomelem == 25 || randomelem >= 246 && randomelem <= 248 || randomelem == 234 || randomelem == 258 || randomelem == 259){
            randomelem = getRandom(elements.length-1);
            correctElem();
        }else{
            elements[randomelem].style.opacity = '0';
            f++;
            setTimeout(remove,1);
        }
    }
}
let v = 0;
function removeface(){
    if(v  >= 200){
        return;
    }
    if(v >= 43 && v <= 48){
        elements[v].style.opacity = '0';
        v++;
        setTimeout(removeface,1);
    }else if(v >= 55 && v <= 62){
        elements[v].style.opacity = '0';
        v++;
        setTimeout(removeface,1);
    }else if(v >= 67 && v <= 76){
        elements[v].style.opacity = '0';
        v++;
        setTimeout(removeface,1);
    }else if(v >= 80 && v <= 89){
        elements[v].style.opacity = '0';
        v++;
        setTimeout(removeface,1);
    }else if(v >= 93 && v <= 102){
        elements[v].style.opacity = '0';
        v++;
        setTimeout(removeface,1);
    }else if(v >= 106 && v <= 115){
        elements[v].style.opacity = '0';
        v++;
        setTimeout(removeface,1);
    }else if(v >= 119 && v <= 128){
        elements[v].style.opacity = '0';
        v++;
        setTimeout(removeface,1);
    }else if(v >= 132 && v <= 141){
        elements[v].style.opacity = '0';
        v++;
        setTimeout(removeface,1);
    }else if(v >= 145 && v <= 154){
        elements[v].style.opacity = '0';
        v++;
        setTimeout(removeface,1);
    }else if(v >= 159 && v <= 166){
        elements[v].style.opacity = '0';
        v++;
        setTimeout(removeface,1);
    }else if(v >= 173 && v <= 178){
        elements[v].style.opacity = '0';
        v++;
        setTimeout(removeface,1);
    }else{
        v++;
        setTimeout(removeface,1);
    }
}

function getRandom(max){
    return Math.floor(Math.random() * max) + 1;
}

function randomsquare(){
    let randomelem = getRandom(elements.length-1);
    correctElem2();
    function correctElem2(){
        if(randomelem == 12 || randomelem == 247 || randomelem == 259){
            randomelem = getRandom(elements.length-1);
            correctElem2();
        }else if(elements[randomelem].style.opacity == '0'){
            elements[randomelem].style.removeProperty('opacity');
            setTimeout(removesquare,getRandom(2000),randomelem);
            setTimeout(randomsquare,getRandom(5000));
        }else{
            randomelem = getRandom(elements.length-1);
            correctElem2();
        }
    }
}
function removesquare(elem){
    elements[elem].style.opacity = '0';
}

setTimeout(remove,4000);
setTimeout(removeface,4200);

setTimeout(randomsquare,4500); 

