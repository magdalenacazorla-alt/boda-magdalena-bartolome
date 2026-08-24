const refs=["assets/ref1.jpg","assets/ref2.jpg","assets/ref3.jpg","assets/ref4.jpg","assets/ref5.jpg"];
const book=document.getElementById("book");
refs.forEach((r,i)=>{
 const p=document.createElement("section");p.className="page"+(i===0?" active":"");
 const img=document.createElement("img");img.src=r;img.alt="";
 p.appendChild(img);
 if(i===0){
   const b=document.createElement("button");b.id="open";b.setAttribute("aria-label","Abrir sobre");
   b.onclick=()=>{show(1);startMusic()};p.appendChild(b);
 } else {
   const nav=document.createElement("div");nav.className="nav";
   const l=document.createElement("button");const rr=document.createElement("button");
   l.onclick=()=>show(i-1);rr.onclick=()=>show(i+1);
   nav.append(l,rr);p.appendChild(nav);
 }
 book.appendChild(p);
});
let cur=0;
function show(n){if(n<0||n>=refs.length)return;document.querySelectorAll(".page").forEach((p,i)=>p.classList.toggle("active",i===n));cur=n}
let x=0;
document.addEventListener("touchstart",e=>x=e.changedTouches[0].clientX,{passive:true});
document.addEventListener("touchend",e=>{let d=e.changedTouches[0].clientX-x;if(Math.abs(d)>50)show(cur+(d<0?1:-1))},{passive:true});
const song=document.getElementById("song"),music=document.getElementById("music");
function startMusic(){if(!song.src)return;song.play().catch(()=>{})}
music.onclick=()=>{if(song.paused){song.play().catch(()=>{});music.textContent="Ⅱ"}else{song.pause();music.textContent="▶"}};
