/* Tappy shared module. Storage: localStorage (demo). Replace DB.load/save with Firebase/API for production. */
var P={cup:'<path d="M5 8h11v6a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5zM16 10h2a2 2 0 0 1 0 4h-2M8 3v2M12 3v2"/>',
scissors:'<circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><path d="M8 7.5L20 18M8 16.5L20 6"/>',
nail:'<path d="M9 3h6v5H9zM8 8h8l1 4v7a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-7z"/>',
gift:'<rect x="3" y="9" width="18" height="12" rx="1"/><path d="M12 9v12M3 13h18M12 9C9 9 7 7 8 5s4 0 4 4zM12 9c3 0 5-2 4-4s-4 0-4 4z"/>',
star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
wallet:'<path d="M4 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4zM4 7V6a2 2 0 0 1 2-2h10v3M16 14h2"/>',
qr:'<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v6h-4M14 18v2"/>',
pin:'<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
bell:'<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21h4"/>',
phone:'<rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M11 18h2"/>',
sig:'<path d="M5 18a1 1 0 1 0 .01 0M5 12a7 7 0 0 1 7 7M5 6a13 13 0 0 1 13 13"/>',
chart:'<path d="M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-3"/>'};
function ic(n,c){return '<svg class="ic '+(c||'')+'" viewBox="0 0 24 24" aria-hidden="true">'+P[n]+'</svg>'}
function logo(){return '<span class="lg"><svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round">'+P.sig+'</svg></span>'}
var BIZ={cafe:{n:'كافي',i:'cup',c:'#7a4a2b',r:'قهوة فابور',pin:'1111'},barber:{n:'الحلاق',i:'scissors',c:'#1e3a5f',r:'حسانة فابور',pin:'2222'},salon:{n:'صالون النساء',i:'nail',c:'#7a2a6a',r:'مينيكور فابور',pin:'3333'}};
var ADMIN_PIN='0000',GOAL=5;
var DB={k:'tappy_db_v1',load:function(){try{return JSON.parse(localStorage.getItem(this.k))||{cards:[],reviews:[],log:[]}}catch(e){return{cards:[],reviews:[],log:[]}}},
save:function(d){try{localStorage.setItem(this.k,JSON.stringify(d))}catch(e){}},
reset:function(){try{localStorage.removeItem(this.k)}catch(e){}}};
function newCode(d){var c;do{c='T'+Math.floor(1000+Math.random()*9000)}while(d.cards.some(function(x){return x.id===c}));return c}
function qr(seed){var h=7;for(var k=0;k<seed.length;k++)h=(h*31+seed.charCodeAt(k))>>>0;var d='',r=function(){h=(h*1664525+1013904223)>>>0;return h/4294967296};
for(var y=0;y<21;y++)for(var x=0;x<21;x++){if((x<8&&y<8)||(x>12&&y<8)||(x<8&&y>12)||(x>7&&x<13&&y>7&&y<13))continue;if(r()>.5)d+='M'+x+' '+y+'h1v1h-1z'}
var f=function(x,y){return'M'+x+' '+y+'h7v7h-7zM'+(x+1)+' '+(y+1)+'v5h5v-5zM'+(x+2)+' '+(y+2)+'h3v3h-3z'};
return '<svg class="qr" viewBox="-1 -1 23 23" role="img" aria-label="QR"><path fill="#06120c" fill-rule="evenodd" d="'+d+f(0,0)+f(14,0)+f(0,14)+'"/><rect x="9" y="9" width="3" height="3" rx=".6" fill="#10b981"/></svg>'}
function cardHTML(c){var b=BIZ[c.biz],s='';for(var i=0;i<GOAL;i++){var g=i===GOAL-1;s+='<div class="s'+(i<c.stamps?' on':'')+(g?' gift':'')+'">'+ic(g?'gift':b.i)+'</div>'}
return '<div class="card" style="background:'+b.c+'"><div class="ch"><span class="ci">'+ic(b.i)+'</span><span>'+b.n+'</span></div><div class="cn">الأختام<b>'+c.stamps+'/'+GOAL+'</b></div><div class="st">'+s+'</div><div class="meta"><span>المكافأة<b>'+b.r+'</b></span><span>الزبون<b>'+esc(c.name)+'</b></span></div>'+qr(c.id)+'<div class="code">'+c.id+'</div></div>'}
function esc(s){return String(s).replace(/[&<>"]/g,function(m){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]})}
var _t;function toast(t){var e=document.getElementById('toast');if(!e)return;e.innerHTML=logo()+'<div><b>Tappy</b>'+esc(t)+'</div>';e.classList.add('show');clearTimeout(_t);_t=setTimeout(function(){e.classList.remove('show')},3800)}
function head(active){var l=[['index.html','الرئيسية'],['customer.html','الزبون'],['merchant.html','المتجر'],['admin.html','المشرف']];
document.getElementById('hd').innerHTML='<a class="logo" href="index.html">'+logo()+'tappy</a><nav>'+l.map(function(x){return'<a class="'+(x[0]===active?'btn':'btn o')+'" href="'+x[0]+'">'+x[1]+'</a>'}).join('')+'</nav>'}
