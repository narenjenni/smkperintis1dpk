
// Mobile & theme
const menuBtn=document.getElementById('menuBtn');
const mobileMenu=document.getElementById('mobileMenu');
if(menuBtn && mobileMenu){menuBtn.addEventListener('click',()=>mobileMenu.classList.toggle('hidden'))}
const themeToggle=document.getElementById('themeToggle');
if(themeToggle){
  themeToggle.addEventListener('click',()=>{
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme',document.documentElement.classList.contains('dark')?'dark':'light')
  });
  if(localStorage.getItem('theme')==='dark') document.documentElement.classList.add('dark');
}
// Ripple origin
document.addEventListener('pointerdown',e=>{const t=e.target.closest('.ripple');if(!t)return;const r=t.getBoundingClientRect();t.style.setProperty('--x',`${e.clientX-r.left-5}px`);t.style.setProperty('--y',`${e.clientY-r.top-5}px`)});
// Reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.2});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
// Slider
const slider=document.getElementById('slider');
if(slider){const slides=Array.from(slider.querySelectorAll('.absolute.inset-0')).slice(0,3);let i=0;setInterval(()=>{slides.forEach((s,idx)=>s.style.opacity=idx===i?'1':'0');i=(i+1)%slides.length},5000)}
// Data loader
async function loadJSON(p){try{const r=await fetch(p);return await r.json()}catch{return[]}}
(async()=>{
  const news=await loadJSON('../data/news.json');
  const agenda=await loadJSON('../data/agenda.json');
  const homeNews=document.getElementById('newsList');
  if(homeNews){homeNews.innerHTML=news.slice(0,4).map(n=>`
    <article class="card rounded-2xl border border-slate-200/50 dark:border-white/10 p-4 bg-white/60 dark:bg-slate-900/30">
      <img src="${n.image}" alt="" class="h-40 w-full object-cover rounded-xl">
      <h3 class="mt-3 font-bold">${n.title}</h3>
      <p class="text-xs text-slate-500 mt-1">${n.date}</p>
      <p class="text-sm mt-2">${n.excerpt}</p>
    </article>`).join('')}
  const newsPage=document.getElementById('newsPage');
  if(newsPage){newsPage.innerHTML=news.map(n=>`
    <article class="card rounded-2xl border border-slate-200/50 dark:border-white/10 p-4 bg-white/60 dark:bg-slate-900/30">
      <img src="${n.image}" alt="" class="h-48 w-full object-cover rounded-xl">
      <h3 class="mt-3 font-bold">${n.title}</h3>
      <p class="text-xs text-slate-500 mt-1">${n.date}</p>
      <p class="text-sm mt-2">${n.excerpt}</p>
      <a class="mt-3 inline-block hover:underline" href="${n.source}" target="_blank">Sumber</a>
    </article>`).join('')}
  const agendaList=document.getElementById('agendaList');
  if(agendaList){agendaList.innerHTML=agenda.slice(0,6).map(a=>`
    <li class="rounded-2xl border border-slate-200/50 dark:border-white/10 p-4">
      <div class="font-semibold">${a.title}</div>
      <div class="text-xs text-slate-500">${a.date} • ${a.time}</div>
      <div class="text-sm mt-1">${a.place}</div>
    </li>`).join('')}
  const agendaPage=document.getElementById('agendaPage');
  if(agendaPage){agendaPage.innerHTML=agenda.map(a=>`
    <li class="rounded-2xl border border-slate-200/50 dark:border-white/10 p-4">
      <div class="font-semibold">${a.title}</div>
      <div class="text-xs text-slate-500">${a.date} • ${a.time}</div>
      <div class="text-sm mt-1">${a.place}</div>
      <p class="text-sm mt-2">${a.desc||''}</p>
    </li>`).join('')}
})();
// SPMB helper
window.SPMB = {
  save(){
    const form=document.getElementById('spmbForm');
    const data=Object.fromEntries(new FormData(form).entries());
    localStorage.setItem('spmb',JSON.stringify(data));
    const el=document.getElementById('spmbSaved'); if(el) el.classList.remove('hidden');
  },
  shareWA(){
    const json=localStorage.getItem('spmb');
    const data=json?JSON.parse(json):Object.fromEntries(new FormData(document.getElementById('spmbForm')).entries());
    const text = `SPMB SMK Perintis 1 Depok%0A`+
      `Nama: ${data.nama||''}%0A`+
      `NISN: ${data.nisn||''}%0A`+
      `Asal Sekolah: ${data.asal_sekolah||''}%0A`+
      `Jurusan: ${data.jurusan||''}%0A`+
      `HP: ${data.hp||''}%0A`+
      `Alamat: ${data.alamat||''}`;
    window.open('https://wa.me/6281282460257?text='+text,'_blank');
  }
};
// Contact
window.Contact = {
  submit(e){
    e.preventDefault();
    const [nama, kontak, pesan] = e.target.querySelectorAll('input, textarea');
    const body=encodeURIComponent(`Nama: ${nama.value}\nKontak: ${kontak.value}\n\n${pesan.value}`);
    const mailto=`mailto:smk1perdep39@yahoo.co.id?subject=Pesan dari Website&body=${body}`;
    document.getElementById('contactInfo').textContent='Membuka aplikasi email Anda...';
    window.location.href=mailto;
  }
};
