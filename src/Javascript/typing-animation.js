let i=0;
let s=0;
let l=0;
let n=0;
let m=0;
const upheadText = "Hi there, I'm";
const nameText1 = "Federico";
const nameText2 = "Brenner";
const subheadText1 = "I'm a Front-End";
const subheadText2 = "Developer";
const uphead = document.getElementById('uphead');
const name1 = document.getElementById('name1');
const name2 = document.getElementById('name2');
const subhead1 = document.getElementById('subhead1');
const subhead2 = document.getElementById('subhead2');

function typing(){
    if(i<upheadText.length){
        uphead.innerHTML = uphead.innerHTML.slice(0,-1);
        uphead.innerHTML += upheadText.charAt(i);
        i++;
        if(i<upheadText.length){
            uphead.innerHTML += '_';
        }
        setTimeout(typing,50);
    }else if(s<nameText1.length){
        name1.innerHTML = name1.innerHTML.slice(0,-1);
        name1.innerHTML += nameText1.charAt(s);
        s++;
        if(s<nameText1.length){
            name1.innerHTML += '_';
        }
        setTimeout(typing,80);
    }else if(l<nameText2.length){
        name2.innerHTML = name2.innerHTML.slice(0,-1);
        name2.innerHTML += nameText2.charAt(l);
        l++;
        if(l<nameText2.length){
            name2.innerHTML += '_';
        }
        setTimeout(typing,80);
    }else if(n<subheadText1.length){
        subhead1.innerHTML = subhead1.innerHTML.slice(0,-1);
        subhead1.innerHTML += subheadText1.charAt(n);
        n++;
        if(n<subheadText1.length){
            subhead1.innerHTML += '_';
        }
        setTimeout(typing,60);
    }else if(m<subheadText2.length){
        subhead2.innerHTML = subhead2.innerHTML.slice(0,-1);
        subhead2.innerHTML += subheadText2.charAt(m);
        subhead2.innerHTML += '_';
        m++;
        setTimeout(typing,60);
    }else{
        if(subhead2.textContent.charAt(m)=="_"){
            subhead2.innerHTML = subhead2.innerHTML.slice(0,-1);
        }else{
            subhead2.innerHTML += '_';
        }
        setTimeout(typing,500);
    }
}
typing();