/* GenEqual demo scripts: quiz, join form, dashboard tabs, pop-ups. Each part only runs on pages that have it. */
/* ===== Quiz: edit the questions here. "a" is the index of the right answer (starts at 0). ===== */
const QUESTIONS=[
 {q:"What does gender equality mean?",o:["Everyone is treated exactly the same in every way","Everyone has equal rights, respect, and opportunities","One gender gets priority","Gender is never discussed"],a:1,why:"Equality is about fair rights and chances for all genders."},
 {q:"Which of these is an example of gender discrimination?",o:["Letting any student join the robotics club","Telling a student they can’t join a class because of their gender","Giving every student the same homework","Asking everyone for their ideas"],a:1,why:"Blocking someone because of their gender is discrimination."},
 {q:"Which Sustainable Development Goal is about gender equality?",o:["SDG 1","SDG 3","SDG 5","SDG 10"],a:2,why:"SDG 5 aims to achieve gender equality and empower all women and girls."},
 {q:"You hear a classmate say “Girls can’t be good at math.” What’s a helpful response?",o:["Laugh along","Ignore it","Kindly point out that ability isn’t decided by gender","Repeat it to others"],a:2,why:"Speaking up kindly helps stop stereotypes from spreading."},
 {q:"Why does equal access to education matter?",o:["It gives everyone a fair chance to grow and find good work","It only helps a few people","It makes school shorter","It doesn’t matter"],a:0,why:"Education opens doors to skills and jobs for everyone."}
];
const box=document.getElementById("quizBox");let i=0,score=0;
function show(){
  if(i>=QUESTIONS.length){
    const msg=score>=4?"You’re a GenEqual star! ⭐":score>=2?"Nice work, keep learning! 🌱":"Good start. Try again and see how far you get! 💪";
    box.innerHTML=`<h3>You got ${score} out of ${QUESTIONS.length}</h3><p>${msg}</p><button class="btn" id="again">Play again</button>`;
    document.getElementById("again").onclick=()=>{i=0;score=0;show()};return;
  }
  const Q=QUESTIONS[i];
  box.innerHTML=`<div class="bar"><i style="width:${i/QUESTIONS.length*100}%"></i></div><h3>${Q.q}</h3>`+
    Q.o.map((t,n)=>`<button class="opt" data-n="${n}">${t}</button>`).join("")+`<p class="fb" id="fb"></p><button class="btn blue" id="next" hidden>${i===QUESTIONS.length-1?"See my score":"Next question"}</button>`;
  box.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{
    const n=+b.dataset.n,ok=n===Q.a;if(ok)score++;
    box.querySelectorAll(".opt").forEach((x,k)=>{x.disabled=true;if(k===Q.a)x.classList.add("right")});
    if(!ok)b.classList.add("wrong");
    document.getElementById("fb").textContent=(ok?"Correct! ":"Not quite. ")+Q.why;
    const nx=document.getElementById("next");nx.hidden=false;nx.focus();nx.onclick=()=>{i++;show()};
  });
}
if(box)show();
/* ===== Join (demo): the name is remembered on every page. Nothing is sent anywhere. ===== */
function getName(){try{const n=localStorage.getItem("ge_name");if(n)return n}catch(e){}return window.name.indexOf("ge_name:")===0?window.name.slice(8):""}
function saveName(n){try{localStorage.setItem("ge_name",n)}catch(e){}window.name="ge_name:"+n}
function forgetName(){try{localStorage.removeItem("ge_name")}catch(e){}window.name=""}
const jf=document.getElementById("joinForm");
function applyMember(name){
  const nav=document.querySelector("nav");
  if(nav&&!nav.querySelector(".hello")){const c=document.createElement("span");c.className="hello";c.textContent="Hi, "+name+" 👋";nav.append(c)}
  document.querySelectorAll('[data-join="hero"]').forEach(a=>{a.textContent="Explore features";a.href="features.html"});
  document.querySelectorAll('[data-join="foot"]').forEach(a=>{const b=document.createElement("b");b.textContent="Welcome to the community, "+name+"!";a.replaceWith(b)});
  const box=document.getElementById("joinBox");
  if(box){box.classList.add("welcome");box.innerHTML="";
    const h=document.createElement("h2");h.textContent="Welcome to the community, "+name+"! 🎉";
    const p=document.createElement("p");p.textContent="You’re part of GenEqual now. Start with a quiz, or read a resource.";
    const a=document.createElement("a");a.className="btn";a.href="features.html";a.textContent="Explore the features";
    const s=document.createElement("p");s.className="small";s.textContent="Demo only: no account was created. Your name is only remembered in this browser.";
    const r=document.createElement("button");r.className="linkbtn";r.type="button";r.textContent="Not you? Join with a different name";
    r.onclick=()=>{forgetName();location.reload()};
    box.append(h,p,a,s,r)}
}
if(jf)jf.onsubmit=e=>{e.preventDefault();
  const name=document.getElementById("jname").value.trim();
  if(!name){document.getElementById("jmsg").textContent="Please type your first name to join.";document.getElementById("jname").focus();return}
  saveName(name);applyMember(name)};
const member=getName();if(member)applyMember(member);

/* ===== Features dashboard: tabs ===== */
document.querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>{
  document.querySelectorAll("[data-tab]").forEach(x=>x.setAttribute("aria-selected",x===b));
  document.querySelectorAll(".panel").forEach(p=>p.classList.toggle("on",p.id===b.dataset.tab))});

/* ===== Resource cards: open a pop-up preview, or a real link if the card has data-href="https://..." ===== */
const dlg=document.getElementById("modal");
if(dlg){
  document.querySelectorAll("[data-title]").forEach(c=>c.onclick=()=>{
    if(c.dataset.href){window.open(c.dataset.href,"_blank","noopener");return}
    dlg.querySelector("h3").textContent=c.dataset.title;dlg.querySelector("p").textContent=c.dataset.text;dlg.showModal()});
  dlg.querySelector("button").onclick=()=>dlg.close();
  dlg.onclick=e=>{if(e.target===dlg)dlg.close()};
}

/* ===== Campaign buttons ===== */
document.querySelectorAll("[data-support]").forEach(b=>b.onclick=()=>{
  const on=b.getAttribute("aria-pressed")!=="true";b.setAttribute("aria-pressed",on);b.textContent=on?"Supported ✓":"Support this campaign"});
