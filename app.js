const refs=[
  "assets/ref1.jpg",
  "assets/ref2.jpg",
  "assets/ref3.jpg",
  "assets/ref4.jpg",
  "assets/ref5.jpg"
];

const book=document.getElementById("book");
const dots=document.getElementById("dots");
const music=document.getElementById("music");
const song=document.getElementById("song");

let cur=0;
let touchStartX=0;
let touchStartY=0;

/*
  Si después quieres añadir una canción, coloca el archivo en assets/cancion.mp3.
  La invitación funcionará igualmente aunque el archivo no exista.
*/
song.src="assets/cancion.mp3";

function makePage(i){
  const page=document.createElement("section");
  page.className="page"+(i===0?" active":"");
  page.setAttribute("aria-label",`Página ${i+1} de ${refs.length}`);

  const img=document.createElement("img");
  img.src=refs[i];
  img.alt="";
  img.draggable=false;
  page.appendChild(img);

  if(i===0){
    const open=document.createElement("button");
    open.id="seal";
    open.className="hot";
    open.setAttribute("aria-label","Tocar el sello para abrir la invitación");
    open.addEventListener("click",()=>{ show(1); startMusic(); });
    page.appendChild(open);
  }else{
    const nav=document.createElement("div");
    nav.className="nav";
    const prev=document.createElement("button");
    const next=document.createElement("button");
    prev.setAttribute("aria-label","Página anterior");
    next.setAttribute("aria-label","Página siguiente");
    prev.addEventListener("click",()=>show(i-1));
    next.addEventListener("click",()=>show(i+1));
    if(i===1) prev.style.display="none";
    if(i===refs.length-1) next.style.display="none";
    nav.append(prev,next);
    page.appendChild(nav);
  }

  // Enlaces sobre los botones que ya aparecen dibujados en las imágenes.
  if(i===2){
    const church=document.createElement("a");
    church.id="church-link";
    church.className="link-hot";
    church.href="https://www.google.com/maps/search/?api=1&query=Iglesia+de+Santa+Catalina%2C+Pl.+Iglesia+9%2C+14400+Pozoblanco%2C+C%C3%B3rdoba";
    church.target="_blank";
    church.rel="noopener";
    church.setAttribute("aria-label","Ver ubicación de la Iglesia de Santa Catalina");
    page.appendChild(church);

    const salon=document.createElement("a");
    salon.id="salon-link";
    salon.className="link-hot";
    salon.href="https://www.google.com/maps/search/?api=1&query=Sal%C3%B3n+Calablanca+Catering%2C+C.+Cronista+Sep%C3%BAlveda+16%2C+14400+Pozoblanco%2C+C%C3%B3rdoba";
    salon.target="_blank";
    salon.rel="noopener";
    salon.setAttribute("aria-label","Ver ubicación de Salón Calablanca Catering");
    page.appendChild(salon);
  }

  if(i===3){
    const suggest=document.createElement("a");
    suggest.id="song-link";
    suggest.className="link-hot";
    suggest.href="mailto:?subject=Sugerencia%20de%20canci%C3%B3n%20para%20la%20boda";
    suggest.setAttribute("aria-label","Sugerir una canción");
    page.appendChild(suggest);
  }

  if(i===4){
    const rsvp=document.createElement("a");
    rsvp.id="rsvp-link";
    rsvp.className="link-hot";
    rsvp.href="mailto:?subject=Confirmaci%C3%B3n%20de%20asistencia%20-%20Magdalena%20y%20Bartolom%C3%A9";
    rsvp.setAttribute("aria-label","Confirmar asistencia");
    page.appendChild(rsvp);
  }

  return page;
}

refs.forEach((_,i)=>book.appendChild(makePage(i)));

refs.forEach((_,i)=>{
  const b=document.createElement("button");
  b.className="dot"+(i===0?" active":"");
  b.setAttribute("aria-label",`Ir a la página ${i+1}`);
  b.addEventListener("click",()=>show(i));
  dots.appendChild(b);
});

function show(n){
  if(n<0 || n>=refs.length) return;
  const pages=document.querySelectorAll(".page");
  pages.forEach((p,i)=>p.classList.toggle("active",i===n));
  dots.querySelectorAll(".dot").forEach((d,i)=>d.classList.toggle("active",i===n));
  cur=n;
}

document.addEventListener("touchstart",e=>{
  const t=e.changedTouches[0];
  touchStartX=t.clientX;
  touchStartY=t.clientY;
},{passive:true});

document.addEventListener("touchend",e=>{
  const t=e.changedTouches[0];
  const dx=t.clientX-touchStartX;
  const dy=t.clientY-touchStartY;
  if(Math.abs(dx)>55 && Math.abs(dx)>Math.abs(dy)*1.2){
    show(cur+(dx<0?1:-1));
  }
},{passive:true});

document.addEventListener("keydown",e=>{
  if(e.key==="ArrowRight") show(cur+1);
  if(e.key==="ArrowLeft") show(cur-1);
});

function startMusic(){
  song.play().then(()=>{
    music.textContent="Ⅱ";
    music.setAttribute("aria-pressed","true");
  }).catch(()=>{
    music.textContent="▶";
  });
}

function toggleMusic(){
  if(song.paused) startMusic();
  else{
    song.pause();
    music.textContent="▶";
    music.setAttribute("aria-pressed","false");
  }
}

music.addEventListener("click",toggleMusic);
music.addEventListener("keydown",e=>{
  if(e.key==="Enter" || e.key===" ") { e.preventDefault(); toggleMusic(); }
});
