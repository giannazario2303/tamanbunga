const D={to:"Sayang",from:"Pengirim",pin:"2303",date:"",song:"You'll Be in My Heart",artist:"NIKI",
letter:`Kamu pasti lagi kecewa sama aku, dan aku ngerti banget kenapa. Aku mau minta maaf, sayang. Bukan buat nyari pembenaran, tapi karena aku sadar aku udah salah dan buat dirimu marah sama aku seharian ini.

Aku ga mau nyari alasan, Apa pun yang udah aku bilang atau aku lakuin, diriku tau itu sakit buat dirimu, dan kamm tidak seharusnya merasakan itu, Aku nyesel yangggg, bakalan ku ingat ini yangggg, dan bakal ini yang terakhir tidak ada untuk lain harinya.

Makasih yaaa sayanggg selama iniiii dirimuuu udahh sabarr sama akuuu,selalu mau dengarin akuuu, selalu ngertiin, bahkan pada saat sayanggg lagi BM atau Datang Bulan. Aku sadar aku engga pernah *bilang makasih sebanyak yang seharusnya.*

Aku ga minta dirimu langsung maafin akuu sekaranggg kokk,sayangggg boleh marah, boleh butuh waktu, dan aku bakal nunggu sampai sayangggg selesaiii marahhhh nyaaa sama akuuuu. tapi jangan pernah ninggalin akuuu yaaa, aku ga mau kehilangan dirimu, aku ga mau kehilangan sayanggggkuuuuuu. Aku sayanggggg kaliiii sama dirimuuuuu, dan aku ga mau kehilangan dirimuuuuu.

Sekali lagi, aku minta maaf, sayangggg. *Dirimu Sangatttt pentinggg buat aku,* dan aku ga mau kehilangan sayanggg cuma gara-gara kesalahan aku sendiri.`,
caps:"Kita waktu itu\nHari yang ga bakal aku lupa\nSenyum kamu\nTempat favorit kita\nSelalu kamu",
rs:`Dirimu yang selalu sabar | sayangggg sabar kaliii ngadepin aku, bahkan pas aku lagi jugulll-jugulll nyaa. Aku baru sadar sepenting apa itu.
Dirimu yang selalu dengerin | Sayang selalu mau dengerin ceritaku, sesepele apa pun. Makasih ya, dan maaf aku sering ga ngehargain itu.
Dirimu yang perhatian | Sayanggg sadar hal-hal kecil, siapa yang lagi diem, siapa yang lagi capek, Bahkan sampe seluruh penampilan kuuu sayanggg perhatikannn.
Dirimu yang kuat | Sayangggg bisa ngelewatin minggu-minggu berat tanpa ngeluh, tapi aku malah nambah beban sayanggg. Aku nyesel kaliii yangggg.
Dirimu yang bikin tenang | Deket sama sayangggg itu rasanya kayak pulang. Dan aku hampir rusakin Rumah tempat aku pulangggg.
Semua tentang kamu | Suara kamu, cara kamu ngomong, semua hal kecil tentang kamu, aku sayangggggg banget. Maaf kalo aku belum pernah nunjukin itu pake cara yang bener.`};
const S=window.SAVED||{};
const T=Object.assign({},D,S.text||{}),IM=Object.assign({},S.imgs||{});
const $=id=>document.getElementById(id);
const esc=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;");
try{const p=JSON.parse(localStorage.getItem("taman-maaf")||"null");if(p&&!S.text){Object.assign(T,p.text||{});Object.assign(IM,p.imgs||{})}}catch(e){}
if(!T.date){const d=new Date(Date.now()+364*864e5);d.setHours(0,0,0,0);T.date=d.toISOString()}
function persist(){try{localStorage.setItem("taman-maaf",JSON.stringify({text:T,imgs:IM}))}catch(e){}}

/* Render konten */
function render(){
  const h=new Date().getHours();
  $("greet").textContent=(h<11?"Selamat pagi":h<15?"Selamat siang":h<18?"Selamat sore":"Selamat malam")+" | Taman kecil, ditanam diam-diam buat kamu";
  $("to").textContent=T.to;$("fr").textContent="Dari "+T.from;
  $("let").innerHTML=T.letter.split(/\n\s*\n/).map(p=>"<p>"+esc(p).replace(/\*(.+?)\*/g,"<em>$1</em>")+"</p>").join("");
  $("sig").innerHTML="Dari aku, yang nyesel banget<small>"+esc(T.from.toUpperCase())+"</small>";
  $("st").textContent=T.song;$("sa").textContent=T.artist.toUpperCase();
  const caps=T.caps.split("\n");
  $("polas").innerHTML=[1,2,3,4,5].map(i=>`<div class="pola" data-n="MEMORI ${i}"><div class="slot" data-k="f${i}" tabindex="0" role="button"><img alt=""><span>+ Foto ${i}<br>Klik untuk pilih</span></div><p>${esc(caps[i-1]||"")}</p></div>`).join("");
  document.querySelectorAll(".slot").forEach(s=>{
    const k=s.dataset.k;if(IM[k]){s.querySelector("img").src=IM[k];s.classList.add("has")}
    s.onclick=()=>{cur=s;$("pf_in").value="";$("pf_in").click()};
    s.onkeydown=e=>{if(e.key==="Enter")s.click()};
  });
  $("rs").innerHTML=T.rs.split("\n").filter(x=>x.trim()).map((l,i)=>{const [a,...b]=l.split("|");return `<div class="r"><small>Bunga ${String(i+1).padStart(2,"0")}</small><h4>${esc(a.trim())}</h4><p>${esc(b.join("|").trim())}</p></div>`}).join("");
  document.querySelectorAll(".r").forEach(r=>io.observe(r));
}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("in")}),{threshold:.3});

/* Foto */
let cur=null;
$("pf_in").onchange=e=>{
  const f=e.target.files[0];if(!f||!cur)return;
  const r=new FileReader();
  r.onload=()=>{const im=new Image();im.onload=()=>{
    const sc=Math.min(1,800/Math.max(im.width,im.height)),c=document.createElement("canvas");
    c.width=im.width*sc;c.height=im.height*sc;c.getContext("2d").drawImage(im,0,0,c.width,c.height);
    const u=c.toDataURL("image/webp",.82);IM[cur.dataset.k]=u;
    cur.querySelector("img").src=u;cur.classList.add("has");persist();
  };im.src=r.result};r.readAsDataURL(f);
};

/* Gerbang PIN */
const ins=[...document.querySelectorAll("#pin input")];
ins.forEach((el,i)=>{
  el.oninput=()=>{el.value=el.value.replace(/\D/g,"");if(el.value&&i<3)ins[i+1].focus();if(ins.every(x=>x.value))tryPin()};
  el.onkeydown=e=>{if(e.key==="Backspace"&&!el.value&&i>0)ins[i-1].focus();if(e.key==="Enter")tryPin()};
});
function tryPin(){
  if(ins.map(x=>x.value).join("")===T.pin){
    $("gate").classList.add("off");document.body.classList.remove("lock");burstAt(innerWidth/2,innerHeight/2,50);
  }else{
    $("err").textContent="PIN belum pas, coba lagi ya.";
    $("card").classList.remove("shake");void $("card").offsetWidth;$("card").classList.add("shake");
    ins.forEach(x=>x.value="");ins[0].focus();
  }
}
$("open").onclick=tryPin;ins[0].focus();

/* Navigasi */
const links=[...document.querySelectorAll("nav a")],secs=links.map(a=>$(a.hash.slice(1)));
function scr(){
  const m=document.documentElement.scrollHeight-innerHeight;
  $("bar").style.width=(m>0?scrollY/m*100:0)+"%";
  let c=0;secs.forEach((s,i)=>{if(s.getBoundingClientRect().top<innerHeight*.45)c=i});
  links.forEach((a,i)=>a.classList.toggle("on",i===c));
}
addEventListener("scroll",scr,{passive:true});

/* Lagu */
const au=$("au"),fmt=t=>isFinite(t)?Math.floor(t/60)+":"+String(Math.floor(t%60)).padStart(2,"0"):"0:00";
$("pp").onclick=()=>{if(au.paused)au.play().catch(()=>{$("sa").textContent="FILE LAGU BELUM ADA, KLIK PILIH FILE"});else au.pause()};
au.onplay=()=>$("pp").innerHTML="&#10074;&#10074;";au.onpause=()=>$("pp").innerHTML="&#9654;";
au.onloadedmetadata=()=>$("dur").textContent=fmt(au.duration);
au.ontimeupdate=()=>{$("cur").textContent=fmt(au.currentTime);$("pf").style.width=(au.currentTime/au.duration*100||0)+"%"};
$("pg").onclick=e=>{const r=$("pg").getBoundingClientRect();if(au.duration)au.currentTime=(e.clientX-r.left)/r.width*au.duration};
$("pick").onclick=()=>$("af").click();
$("af").onchange=e=>{const f=e.target.files[0];if(f){au.src=URL.createObjectURL(f);$("sa").textContent=T.artist.toUpperCase();au.play()}};

/* Hitung mundur */
function tick(){
  let d=Math.max(0,new Date(T.date)-Date.now())/1000;
  $("cd").textContent=Math.floor(d/86400);$("ch").textContent=Math.floor(d%86400/3600);
  $("cm").textContent=Math.floor(d%3600/60);$("cs").textContent=Math.floor(d%60);
}
setInterval(tick,1000);

/* Kelopak */
const cv=$("fx"),cx=cv.getContext("2d"),E=["🌸","🌺","🌷","🌹"],P=[],B=[];
const calm=matchMedia("(prefers-reduced-motion:reduce)").matches;
let W=0,H=0,dpr=1;
function rs(){dpr=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0)}
addEventListener("resize",rs);rs();
/* Gambar emoji dibuat sekali, lalu dipakai ulang agar ringan */
const SP=E.map(e=>{const c=document.createElement("canvas");c.width=c.height=64;const x=c.getContext("2d");x.font="48px serif";x.textBaseline="middle";x.textAlign="center";x.fillText(e,32,34);return c});
function mk(top){return{x:Math.random()*W,y:top?-30:Math.random()*H,s:14+Math.random()*18,v:(.5+Math.random()*1.1)*(calm?.5:1),w:Math.random()*6,r:Math.random()*6,k:Math.random()*4|0}}
for(let i=0;i<(calm?18:36);i++)P.push(mk(false));
function burstAt(x,y,n){for(let i=0;i<n;i++){const a=Math.random()*6.28,v=2+Math.random()*7;B.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-3,s:14+Math.random()*18,r:Math.random()*6,l:1,k:Math.random()*4|0})}}
function draw(o,a){cx.globalAlpha=a;cx.setTransform(dpr,0,0,dpr,0,0);cx.translate(o.x,o.y);cx.rotate(o.r);cx.drawImage(SP[o.k],-o.s/2,-o.s/2,o.s,o.s)}
let last=performance.now();
function loop(t){
  const f=Math.min((t-last)/16.67,3);last=t;
  cx.setTransform(dpr,0,0,dpr,0,0);cx.clearRect(0,0,W,H);
  P.forEach((p,i)=>{p.y+=p.v*f;p.w+=.02*f;p.x+=Math.sin(p.w)*.7*f;p.r+=.01*f;if(p.y>H+30)P[i]=mk(true);draw(p,1)});
  for(let i=B.length-1;i>=0;i--){const b=B[i];b.x+=b.vx*f;b.y+=b.vy*f;b.vy+=.18*f;b.vx*=.99;b.r+=.1*f;b.l-=.008*f;
    if(b.l<=0){B.splice(i,1);continue}draw(b,b.l)}
  cx.globalAlpha=1;
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
$("burst").onclick=e=>{const r=e.target.getBoundingClientRect();burstAt(r.left+r.width/2,r.top,90)};

/* Panel */
const F={to:"e_to",from:"e_from",pin:"e_pin",letter:"e_letter",caps:"e_caps",rs:"e_rs",song:"e_song",artist:"e_artist"};
function loc(d){const z=new Date(d);z.setMinutes(z.getMinutes()-z.getTimezoneOffset());return z.toISOString().slice(0,16)}
$("gear").onclick=()=>{for(const k in F)$(F[k]).value=T[k];$("e_date").value=loc(T.date);$("panel").classList.add("on")};
$("close").onclick=()=>$("panel").classList.remove("on");
function read(){for(const k in F)T[k]=$(F[k]).value;if($("e_date").value)T.date=new Date($("e_date").value).toISOString();if(!/^\d{4}$/.test(T.pin))T.pin="1234"}
$("save").onclick=()=>{read();persist();render();tick();$("panel").classList.remove("on")};
$("exp").onclick=()=>{read();const l=document.createElement("a");l.href=URL.createObjectURL(new Blob(["window.SAVED="+JSON.stringify({text:T,imgs:IM})+";"],{type:"text/javascript"}));l.download="data.js";l.click()};
render();tick();scr();
