(function(){
var CATS=['all','metro','business','sports','around','opinion'];
var secs=[].slice.call(document.querySelectorAll('main .sec'));
var tabs=[].slice.call(document.querySelectorAll('.tabs a'));
function apply(cat){
secs.forEach(function(s){ s.hidden = !(cat==='all' || s.getAttribute('data-sec')===cat); });
tabs.forEach(function(t){ if(t.getAttribute('data-cat')===cat){t.setAttribute('aria-current','page');} else {t.removeAttribute('aria-current');} });
document.body.setAttribute('data-view',cat);
}
function route(initial){
var h=(location.hash||'').replace('#','');
if(!h){ apply('all'); return; }
if(CATS.indexOf(h)>=0){ apply(h); if(!initial){ window.scrollTo(0,0); } else { window.scrollTo(0,0); } return; }
var el=document.getElementById(h);
if(el){ var sec=el.closest('.sec'); if(sec && sec.hidden){ apply('all'); } setTimeout(function(){ el.scrollIntoView(); },0); }
else { apply('all'); }
}
window.addEventListener('hashchange',function(){route(false);});
route(true);
})();
