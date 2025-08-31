document.getElementById('year').textContent = new Date().getFullYear();

// Optional: open a faux search box on Ctrl+K
(function(){
  const open = () => alert('Search placeholder — wire up later.');
  document.addEventListener('keydown', (e)=>{
    if((e.ctrlKey || e.metaKey) && e.key.toLowerCase()==='k'){
      e.preventDefault();
      open();
    }
  });
})();

// Theme toggle with persistence
(function(){
  const KEY = 'theme';
  const btn = document.getElementById('themeToggle');
  if(!btn) return;

  const prefersDark = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const getStored = () => localStorage.getItem(KEY);
  const setStored = (v) => localStorage.setItem(KEY, v);

  function apply(theme){
    if(theme === 'dark'){
      document.body.setAttribute('data-theme','dark');
      btn.title = 'Switch to light theme';
    }else{
      document.body.removeAttribute('data-theme');
      btn.title = 'Switch to dark theme';
    }
  }

  const initial = getStored() || (prefersDark() ? 'dark' : 'light');
  apply(initial);

  btn.addEventListener('click', ()=>{
    const current = document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    apply(next);
    setStored(next);
  });
})();

// Subtitle typewriter: types and deletes phrases in a loop
(function(){
  const el = document.getElementById('subtitleRotator');
  if(!el) return;
  const phrases = ['Cybersecurity', 'Cloud', 'Networking'];
  const typeDelay = 80;      // ms per character when typing
  const deleteDelay = 50;    // ms per character when deleting
  const holdDelay = 1200;    // ms to hold full word
  let p = 0;
  let idx = 0;
  let deleting = false;
  el.classList.add('typewriter');

  function tick(){
    const current = phrases[p];
    if(!deleting){
      // typing
      idx++;
      el.textContent = current.slice(0, idx);
      if(idx === current.length){
        deleting = true;
        setTimeout(tick, holdDelay);
        return;
      }
      setTimeout(tick, typeDelay);
    }else{
      // deleting
      idx--;
      el.textContent = current.slice(0, idx);
      if(idx === 0){
        deleting = false;
        p = (p + 1) % phrases.length;
        setTimeout(tick, typeDelay);
        return;
      }
      setTimeout(tick, deleteDelay);
    }
  }

  // start typing from first phrase
  el.textContent = '';
  tick();
})();
