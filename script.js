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
