import { useState, useEffect, useMemo } from "react";

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const GS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Tenor+Sans&family=Nunito:wght@300;400;500;600;700;800&display=swap');
    *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
    html,body,#root{height:100%;background:#FDF8F5;}
    body{font-family:'Nunito',sans-serif;color:#2D1B2E;overflow:hidden;}
    ::-webkit-scrollbar{width:3px;}
    ::-webkit-scrollbar-thumb{background:rgba(198,152,168,0.4);border-radius:4px;}
    input,select,textarea,button{font-family:'Nunito',sans-serif;}
    @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
    @keyframes pop{from{transform:scale(.8);opacity:0}to{transform:scale(1);opacity:1}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
    @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
    .au{animation:fadeUp .35s ease both;}
    .af{animation:fadeIn .3s ease both;}
    .ap{animation:pop .3s cubic-bezier(.34,1.56,.64,1) both;}
  `}</style>
);

/* ─────────────────────────────────────────────
   DESIGN TOKENS  –  blush & botanical palette
───────────────────────────────────────────── */
const T = {
  // backgrounds
  bg:    '#FDF8F5',
  bg2:   '#FFF5F7',
  card:  '#FFFFFF',
  // pinks / rose
  rose:  '#D4788A',
  roseLt:'#F2B5C0',
  rosePl:'rgba(212,120,138,.12)',
  // mauve / purple
  mauve: '#8C5F7A',
  mauveLt:'#C9A3BC',
  mauvePl:'rgba(140,95,122,.1)',
  // sage
  sage:  '#7A9E8A',
  sagePl:'rgba(122,158,138,.12)',
  // gold accent
  gold:  '#C8986A',
  goldPl:'rgba(200,152,106,.12)',
  // text
  tx:    '#2D1B2E',
  tx2:   '#5A3D52',
  muted: '#A07A90',
  mutedLt:'#C4A8B8',
  // borders
  bdr:   'rgba(212,120,138,.18)',
  bdr2:  'rgba(212,120,138,.28)',
  // status
  green: '#6AAF82',
  red:   '#D47878',
  amber: '#C8986A',
  // overlay
  ov:    'rgba(45,27,46,.55)',
};

/* ─────────────────────────────────────────────
   SEED DATA
───────────────────────────────────────────── */
const CITIES = ['חיפה – Хайфа', 'חריש – Хариш', 'ראשון לציון – Ришон-ле-Цион'];
const CITY_SHORT = {'חיפה – Хайфа':'Хайфа','חריש – Хариш':'Хариш','ראשון לציון – Ришон-ле-Цион':'Ришон'};

const CATEGORIES = [
  {id:'nail',    label:'💅 Маникюр & Педикюр', en:'Nail'},
  {id:'cosmo',   label:'✨ Косметолог',         en:'Cosmetology'},
  {id:'hair',    label:'💇 Парикмахер',         en:'Hair'},
  {id:'brow',    label:'🪄 Брови & Ресницы',    en:'Brows'},
  {id:'massage', label:'🌿 Массаж',             en:'Massage'},
];

const ALL_SERVICES = {
  nail:    ['Маникюр классический','Маникюр с гель-лаком','Педикюр классический','Педикюр с гель-лаком','Наращивание ногтей','Нейл-арт','Маникюр + Педикюр'],
  cosmo:   ['Чистка лица','Пилинг','Мезотерапия','Биоревитализация','Ботокс','Контурная пластика','Уходовый массаж лица'],
  hair:    ['Стрижка женская','Стрижка мужская','Окрашивание','Мелирование','Кератиновое выпрямление','Укладка','Ботокс для волос'],
  brow:    ['Коррекция бровей','Окрашивание бровей','Ламинирование бровей','Наращивание ресниц','Ламинирование ресниц','Перманентный макияж бровей'],
  massage: ['Расслабляющий массаж','Антицеллюлитный','Лимфодренажный','Тайский массаж','Массаж лица','Стоун-терапия'],
};

const MASTER_COLORS = ['#D4788A','#8C5F7A','#7A9E8A','#C8986A','#7A8EC8','#C87A9E','#9EC87A'];

function genSlots() {
  const s = {}; const t = new Date();
  for (let i = 0; i < 28; i++) {
    const d = new Date(t); d.setDate(d.getDate() + i);
    if (d.getDay() === 5) continue; // Shabbat (Fri eve – actually skip Sat)
    if (d.getDay() === 6) continue; // Sat
    const key = fd(d);
    const hrs = ['9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00'];
    const booked = hrs.filter(() => Math.random() < .3);
    s[key] = { hrs, booked };
  }
  return s;
}

const SEED_MASTERS = [
  { id:'sm1', name:'Нета Коэн', avatar:'נ', city:'חיפה – Хайфа', district:'Кармель', category:'nail',
    bio:'Мастер маникюра и педикюра с 8-летним опытом. Работаю только с профессиональными материалами CND и OPI.',
    services:ALL_SERVICES.nail.slice(0,5), prices:Object.fromEntries(ALL_SERVICES.nail.slice(0,5).map((s,i)=>[s,80+i*20])),
    rating:4.9, reviews:213, phone:'+972 52 111 2233', whatsapp:'97252111223', color:MASTER_COLORS[0],
    approved:true, slots:genSlots(), bookings:[] },
  { id:'sm2', name:'Лиора Бен-Давид', avatar:'ל', city:'חיפה – Хайфа', district:'Центр Хайфы', category:'cosmo',
    bio:'Косметолог-эстетист. Специализация — омолаживающие процедуры и глубокое увлажнение кожи.',
    services:ALL_SERVICES.cosmo.slice(0,5), prices:Object.fromEntries(ALL_SERVICES.cosmo.slice(0,5).map((s,i)=>[s,150+i*50])),
    rating:5.0, reviews:98, phone:'+972 54 222 3344', whatsapp:'97254222334', color:MASTER_COLORS[1],
    approved:true, slots:genSlots(), bookings:[] },
  { id:'sm3', name:'Даниэль Леви', avatar:'ד', city:'חיפה – Хайфа', district:'Хадар', category:'hair',
    bio:'Парикмахер-колорист. Стажировка в Милане. Работаю с натуральными красителями Wella & L\'Oréal.',
    services:ALL_SERVICES.hair, prices:Object.fromEntries(ALL_SERVICES.hair.map((s,i)=>[s,120+i*40])),
    rating:4.8, reviews:341, phone:'+972 50 333 4455', whatsapp:'97250333445', color:MASTER_COLORS[2],
    approved:true, slots:genSlots(), bookings:[] },
  { id:'sm4', name:'Шира Азулай', avatar:'ש', city:'חריש – Хариш', district:'Хариш', category:'brow',
    bio:'Мастер бровей и ресниц. Создаю идеальный образ, который подчёркивает вашу природную красоту.',
    services:ALL_SERVICES.brow, prices:Object.fromEntries(ALL_SERVICES.brow.map((s,i)=>[s,90+i*30])),
    rating:4.7, reviews:156, phone:'+972 53 444 5566', whatsapp:'97253444556', color:MASTER_COLORS[3],
    approved:true, slots:genSlots(), bookings:[] },
  { id:'sm5', name:'Яэль Перец', avatar:'י', city:'ראשון לציון – Ришон-ле-Цион', district:'Центр', category:'nail',
    bio:'Нейл-дизайнер. Авторские работы, любой сложности. Инстаграм: @yael_nails_il',
    services:ALL_SERVICES.nail, prices:Object.fromEntries(ALL_SERVICES.nail.map((s,i)=>[s,100+i*25])),
    rating:4.9, reviews:189, phone:'+972 55 555 6677', whatsapp:'97255555667', color:MASTER_COLORS[4],
    approved:true, slots:genSlots(), bookings:[] },
  { id:'sm6', name:'Ронит Кац', avatar:'ר', city:'ראשון לציון – Ришон-ле-Цион', district:'Неве-Дкалим', category:'cosmo',
    bio:'Косметолог. Уходовые программы, пилинги, массаж лица. Ваша кожа — моя забота.',
    services:ALL_SERVICES.cosmo, prices:Object.fromEntries(ALL_SERVICES.cosmo.map((s,i)=>[s,180+i*40])),
    rating:4.6, reviews:74, phone:'+972 52 666 7788', whatsapp:'97252666778', color:MASTER_COLORS[5],
    approved:true, slots:genSlots(), bookings:[] },
  { id:'sm7', name:'Офир Хаим', avatar:'א', city:'חיפה – Хайфа', district:'Рамат-Шауль', category:'massage',
    bio:'Сертифицированный массажист. Тайский и расслабляющий массаж. Записываю мужчин и женщин.',
    services:ALL_SERVICES.massage, prices:Object.fromEntries(ALL_SERVICES.massage.map((s,i)=>[s,160+i*30])),
    rating:4.8, reviews:112, phone:'+972 54 777 8899', whatsapp:'97254777889', color:MASTER_COLORS[6],
    approved:true, slots:genSlots(), bookings:[] },
];

/* helpers */
function fd(d){return`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
const today = ()=>fd(new Date());
const MGEN=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const MNAMES=['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
function fmtLong(s){const d=new Date(s+'T12:00:00');const dn=['Вс','Пн','Вт','Ср','Чт','Пт','Сб'];return`${dn[d.getDay()]}, ${d.getDate()} ${MGEN[d.getMonth()]}`;}
function ls(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d;}catch{return d;}}
function lsSave(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch{}}
function catLabel(id){return CATEGORIES.find(c=>c.id===id)?.label||id;}
function avail(m,dStr){const sl=m.slots?.[dStr];if(!sl)return[];return sl.hrs.filter(h=>!sl.booked.includes(h));}

/* ─────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────── */
export default function App(){
  const [masters,setMasters]   = useState(()=>ls('il_masters',SEED_MASTERS));
  const [users,setUsers]       = useState(()=>ls('il_users',[]));
  const [me,setMe]             = useState(()=>ls('il_me',null));
  const [screen,setScreen]     = useState('home');
  const [selMaster,setSelMaster]= useState(null);
  const [booking,setBooking]   = useState(null);
  const [toast,setToast]       = useState(null);
  const [cityFilter,setCityF]  = useState('');
  const [catFilter,setCatF]    = useState('');
  const [qFilter,setQF]        = useState('');

  useEffect(()=>{lsSave('il_masters',masters);},[masters]);
  useEffect(()=>{lsSave('il_users',users);},[users]);
  useEffect(()=>{lsSave('il_me',me);},[me]);

  const showToast=(msg,type='ok')=>{setToast({msg,type});setTimeout(()=>setToast(null),3000);};
  const logout=()=>{setMe(null);lsSave('il_me',null);setScreen('home');showToast('Вы вышли');};

  const activeMasters = masters.filter(m=>m.approved);
  const filtered = activeMasters.filter(m=>{
    const q=qFilter.toLowerCase();
    return(!cityFilter||m.city===cityFilter)&&(!catFilter||m.category===catFilter)&&
      (!q||m.name.toLowerCase().includes(q)||m.district.toLowerCase().includes(q)||m.services.some(s=>s.toLowerCase().includes(q)));
  });

  const openMaster=(m)=>{setSelMaster(m);setScreen('master');};

  const saveBooking=(b)=>{
    setMasters(prev=>prev.map(m=>{
      if(m.id!==b.masterId)return m;
      const slots={...m.slots};
      if(slots[b.date])slots[b.date]={...slots[b.date],booked:[...slots[b.date].booked,b.time]};
      return{...m,slots,bookings:[...(m.bookings||[]),b]};
    }));
    setBooking(b);setScreen('success');
  };

  const updateMaster=(id,upd)=>{
    setMasters(prev=>prev.map(m=>m.id===id?{...m,...upd}:m));
    if(me?.id===id){const nm={...me,...upd};setMe(nm);lsSave('il_me',nm);}
    const nu=users.map(u=>u.id===id?{...u,...upd}:u);setUsers(nu);
  };

  const approveMaster=(id)=>{updateMaster(id,{approved:true});showToast('Мастер одобрен ✅');};
  const deleteMaster=(id)=>{
    setMasters(prev=>prev.filter(m=>m.id!==id));
    setUsers(prev=>prev.filter(u=>u.id!==id));
    showToast('Мастер удалён');
  };

  return(
    <div style={{height:'100dvh',display:'flex',flexDirection:'column',background:T.bg,maxWidth:480,margin:'0 auto',overflow:'hidden',position:'relative'}}>
      <GS/>
      {!['auth','success','admin'].includes(screen)&&<Header me={me} screen={screen} setScreen={setScreen} logout={logout}/>}
      <div style={{flex:1,overflowY:'auto',overflowX:'hidden',WebkitOverflowScrolling:'touch'}}>
        {screen==='home'    &&<HomeScreen setScreen={setScreen} setCityF={setCityF} setCatF={setCatF} masters={activeMasters} openMaster={openMaster}/>}
        {screen==='explore' &&<ExploreScreen masters={filtered} cityFilter={cityFilter} setCityF={setCityF} catFilter={catFilter} setCatF={setCatF} q={qFilter} setQ={setQF} openMaster={openMaster}/>}
        {screen==='master'  &&selMaster&&<MasterScreen master={masters.find(m=>m.id===selMaster.id)||selMaster} me={me} saveBooking={saveBooking} setScreen={setScreen} showToast={showToast}/>}
        {screen==='success' &&booking  &&<SuccessScreen booking={booking} masters={masters} setScreen={setScreen}/>}
        {screen==='auth'    &&<AuthScreen me={me} setMe={setMe} users={users} setUsers={setUsers} masters={masters} setMasters={setMasters} setScreen={setScreen} showToast={showToast}/>}
        {screen==='dash'    &&me        &&<Dashboard me={me} setMe={setMe} masters={masters} updateMaster={updateMaster} showToast={showToast} setScreen={setScreen}/>}
        {screen==='admin'   &&<AdminPanel me={me} masters={masters} users={users} approveMaster={approveMaster} deleteMaster={deleteMaster} setScreen={setScreen} showToast={showToast}/>}
      </div>
      {toast&&<Toast msg={toast.msg} type={toast.type}/>}
    </div>
  );
}

/* ─────────────────────────────────────────────
   HEADER
───────────────────────────────────────────── */
function Header({me,screen,setScreen,logout}){
  const isHome=screen==='home';
  return(
    <div style={{background:'#fff',borderBottom:`1px solid ${T.bdr}`,padding:'13px 18px',display:'flex',alignItems:'center',justifyContent:'space-between',flexShrink:0,boxShadow:'0 1px 12px rgba(212,120,138,.08)'}}>
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        {!isHome&&<button onClick={()=>setScreen('home')} style={{background:'none',border:'none',fontSize:18,color:T.muted,padding:'2px 6px 2px 0',lineHeight:1}}>←</button>}
        <div onClick={()=>setScreen('home')} style={{cursor:'pointer'}}>
          <div style={{fontFamily:'Tenor Sans,serif',fontSize:17,color:T.rose,letterSpacing:1}}>✦ יופי ישראל</div>
          <div style={{fontSize:9,color:T.mutedLt,letterSpacing:2.5,textTransform:'uppercase',marginTop:1}}>Красота Израиля</div>
        </div>
      </div>
      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        {me?.role==='admin'&&<button onClick={()=>setScreen('admin')} style={{background:T.mauve,border:'none',borderRadius:10,padding:'7px 12px',color:'#fff',fontSize:11,fontWeight:700}}>⚙️ Админ</button>}
        {me?(<>
          <button onClick={()=>setScreen('dash')} style={{display:'flex',alignItems:'center',gap:7,background:T.rosePl,border:`1px solid ${T.bdr}`,borderRadius:22,padding:'7px 12px 7px 8px',color:T.rose,fontSize:12,fontWeight:700}}>
            <span style={{width:22,height:22,borderRadius:'50%',background:T.rose,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,color:'#fff'}}>{me.name[0]}</span>
            Кабинет
          </button>
          <button onClick={logout} style={{background:'none',border:`1px solid ${T.bdr}`,borderRadius:10,padding:'7px 10px',color:T.muted,fontSize:11}}>Выйти</button>
        </>):(
          <button onClick={()=>setScreen('auth')} style={{background:`linear-gradient(135deg,${T.rose},${T.mauve})`,border:'none',borderRadius:22,padding:'9px 16px',color:'#fff',fontSize:12,fontWeight:700,boxShadow:'0 3px 14px rgba(212,120,138,.35)'}}>
            Войти / Регистрация
          </button>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HOME
───────────────────────────────────────────── */
function HomeScreen({setScreen,setCityF,setCatF,masters,openMaster}){
  const top=[...masters].sort((a,b)=>b.rating-a.rating).slice(0,4);
  return(
    <div className="au" style={{paddingBottom:32}}>
      {/* Hero */}
      <div style={{background:`linear-gradient(160deg,#FFF0F3 0%,#F9EAF6 50%,#EFF5F1 100%)`,padding:'32px 22px 28px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:-30,right:-30,width:160,height:160,borderRadius:'50%',background:'rgba(212,120,138,.08)'}}/>
        <div style={{position:'absolute',bottom:-50,left:-20,width:140,height:140,borderRadius:'50%',background:'rgba(140,95,122,.06)'}}/>
        <div style={{position:'absolute',top:12,right:18,fontSize:48,opacity:.15,animation:'float 4s ease-in-out infinite'}}>🌸</div>
        <div style={{position:'relative'}}>
          <div style={{fontFamily:'Tenor Sans,serif',fontSize:13,color:T.rose,letterSpacing:3,textTransform:'uppercase',marginBottom:10}}>✦ Добро пожаловать ✦</div>
          <div style={{fontFamily:'Tenor Sans,serif',fontSize:29,lineHeight:1.25,color:T.tx,marginBottom:6}}>
            Найдите своего<br/><span style={{color:T.rose,fontStyle:'normal'}}>мастера красоты</span><br/>в Израиле
          </div>
          <div style={{fontSize:14,color:T.tx2,lineHeight:1.65,marginBottom:22,maxWidth:290}}>
            Маникюр, педикюр, косметолог, парикмахер — лучшие специалисты в Хайфе, Харише и Ришоне
          </div>
          <div style={{display:'flex',gap:10}}>
            <button onClick={()=>setScreen('explore')} style={{background:`linear-gradient(135deg,${T.rose},${T.mauve})`,border:'none',borderRadius:24,padding:'13px 22px',fontSize:14,fontWeight:700,color:'#fff',boxShadow:'0 4px 18px rgba(212,120,138,.38)'}}>
              🔍 Найти мастера
            </button>
            <button onClick={()=>setScreen('auth')} style={{background:'#fff',border:`1.5px solid ${T.bdr2}`,borderRadius:24,padding:'13px 18px',fontSize:13,fontWeight:600,color:T.rose}}>
              Я мастер →
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',background:'#fff',borderBottom:`1px solid ${T.bdr}`}}>
        {[{n:masters.length,e:'Мастеров'},{n:CITIES.length,e:'Города'},{n:masters.reduce((s,m)=>s+(m.reviews||0),0),e:'Отзывов'}].map((s,i)=>(
          <div key={i} style={{padding:'14px 6px',textAlign:'center',borderRight:i<2?`1px solid ${T.bdr}`:''}}>
            <div style={{fontFamily:'Tenor Sans,serif',fontSize:22,color:T.rose}}>{s.n}</div>
            <div style={{fontSize:10,color:T.muted,textTransform:'uppercase',letterSpacing:1}}>{s.e}</div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div style={{padding:'20px 18px 4px'}}>
        <SectionTitle>Услуги</SectionTitle>
        <div style={{display:'flex',gap:9,overflowX:'auto',paddingBottom:6,marginBottom:4}}>
          {CATEGORIES.map(c=>(
            <button key={c.id} onClick={()=>{setCatF(c.id);setScreen('explore');}}
              style={{flexShrink:0,background:'#fff',border:`1.5px solid ${T.bdr}`,borderRadius:16,padding:'12px 14px',textAlign:'center',minWidth:90,boxShadow:'0 2px 10px rgba(212,120,138,.07)'}}>
              <div style={{fontSize:22,marginBottom:4}}>{c.label.split(' ')[0]}</div>
              <div style={{fontSize:11,fontWeight:600,color:T.tx2,lineHeight:1.2}}>{c.label.substring(2)}</div>
            </button>
          ))}
        </div>
      </div>

      {/* By city */}
      <div style={{padding:'16px 18px 4px'}}>
        <SectionTitle>По городу</SectionTitle>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {CITIES.map(city=>{
            const cnt=masters.filter(m=>m.city===city).length;
            return(
              <button key={city} onClick={()=>{setCityF(city);setScreen('explore');}}
                style={{display:'flex',alignItems:'center',justifyContent:'space-between',background:'#fff',border:`1.5px solid ${T.bdr}`,borderRadius:16,padding:'14px 18px',boxShadow:'0 2px 10px rgba(212,120,138,.06)'}}>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <span style={{fontSize:24}}>📍</span>
                  <div style={{textAlign:'left'}}>
                    <div style={{fontWeight:700,fontSize:15,color:T.tx}}>{CITY_SHORT[city]}</div>
                    <div style={{fontSize:11,color:T.muted}}>{city.split('–')[0].trim()}</div>
                  </div>
                </div>
                <span style={{background:T.rosePl,color:T.rose,fontSize:12,fontWeight:700,borderRadius:20,padding:'4px 12px',border:`1px solid ${T.bdr}`}}>{cnt} мастеров</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Top masters */}
      <div style={{padding:'20px 18px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
          <SectionTitle style={{marginBottom:0}}>Топ мастера</SectionTitle>
          <button onClick={()=>setScreen('explore')} style={{background:'none',border:'none',fontSize:12,color:T.rose,fontWeight:700}}>Все →</button>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {top.map(m=><MiniCard key={m.id} m={m} onClick={()=>openMaster(m)}/>)}
        </div>
      </div>

      {/* CTA banner */}
      <div style={{margin:'0 18px 24px',background:`linear-gradient(135deg,#FFF0F6,#F0EBF8)`,border:`1.5px solid ${T.bdr}`,borderRadius:20,padding:'20px',textAlign:'center'}}>
        <div style={{fontSize:28,marginBottom:8}}>🌸</div>
        <div style={{fontFamily:'Tenor Sans,serif',fontSize:18,color:T.tx,marginBottom:6}}>Вы мастер красоты?</div>
        <div style={{fontSize:13,color:T.tx2,lineHeight:1.6,marginBottom:14}}>Создайте профиль бесплатно и начните принимать клиентов уже сегодня!</div>
        <button onClick={()=>setScreen('auth')} style={{background:`linear-gradient(135deg,${T.rose},${T.mauve})`,border:'none',borderRadius:22,padding:'12px 24px',fontSize:13,fontWeight:700,color:'#fff',boxShadow:'0 4px 16px rgba(212,120,138,.3)'}}>
          Зарегистрироваться бесплатно
        </button>
      </div>
    </div>
  );
}

function SectionTitle({children,style={}}){
  return <div style={{fontFamily:'Tenor Sans,serif',fontSize:16,color:T.tx,marginBottom:14,...style}}>{children}</div>;
}

function MiniCard({m,onClick}){
  return(
    <div onClick={onClick} style={{background:'#fff',border:`1.5px solid ${T.bdr}`,borderRadius:18,padding:'14px 16px',display:'flex',gap:13,alignItems:'center',cursor:'pointer',boxShadow:'0 2px 12px rgba(212,120,138,.07)'}}>
      <div style={{width:50,height:50,borderRadius:14,background:m.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,fontWeight:700,color:'#fff',flexShrink:0,fontFamily:'Tenor Sans,serif'}}>{m.avatar}</div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontWeight:700,fontSize:15,color:T.tx}}>{m.name}</div>
        <div style={{fontSize:11,color:T.muted,marginTop:2}}>📍 {CITY_SHORT[m.city]} · {m.district}</div>
        <div style={{fontSize:11,color:T.mutedLt,marginTop:2}}>{catLabel(m.category)}</div>
      </div>
      <div style={{textAlign:'right',flexShrink:0}}>
        <div style={{fontSize:15,fontWeight:700,color:T.rose}}>★{m.rating}</div>
        <div style={{fontSize:10,color:T.muted}}>{m.reviews} отз.</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   EXPLORE
───────────────────────────────────────────── */
function ExploreScreen({masters,cityFilter,setCityF,catFilter,setCatF,q,setQ,openMaster}){
  return(
    <div className="au" style={{paddingBottom:24}}>
      <div style={{padding:'14px 18px',background:'#fff',borderBottom:`1px solid ${T.bdr}`,position:'sticky',top:0,zIndex:5,boxShadow:'0 2px 10px rgba(212,120,138,.06)'}}>
        <div style={{position:'relative',marginBottom:10}}>
          <span style={{position:'absolute',left:13,top:'50%',transform:'translateY(-50%)',fontSize:15,pointerEvents:'none'}}>🔍</span>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Имя, услуга, район..."
            style={{width:'100%',background:T.bg2,border:`1.5px solid ${T.bdr}`,borderRadius:22,padding:'11px 12px 11px 40px',color:T.tx,fontSize:14,outline:'none'}}/>
        </div>
        <div style={{display:'flex',gap:7,overflowX:'auto',paddingBottom:2,marginBottom:6}}>
          <Pill label="Все города" active={!cityFilter} onClick={()=>setCityF('')}/>
          {CITIES.map(c=><Pill key={c} label={CITY_SHORT[c]} active={cityFilter===c} onClick={()=>setCityF(cityFilter===c?'':c)}/>)}
        </div>
        <div style={{display:'flex',gap:7,overflowX:'auto',paddingBottom:2}}>
          <Pill label="Все услуги" active={!catFilter} onClick={()=>setCatF('')}/>
          {CATEGORIES.map(c=><Pill key={c.id} label={c.label} active={catFilter===c.id} onClick={()=>setCatF(catFilter===c.id?'':c.id)}/>)}
        </div>
      </div>
      <div style={{padding:'14px 18px'}}>
        <div style={{fontSize:11,color:T.muted,marginBottom:12,letterSpacing:.5}}>Найдено: <strong style={{color:T.tx}}>{masters.length}</strong> мастеров</div>
        {masters.length===0?(
          <div style={{textAlign:'center',padding:'60px 20px',color:T.muted}}>
            <div style={{fontSize:48,marginBottom:12}}>🌸</div>
            <div style={{fontSize:15}}>Мастера не найдены</div>
            <div style={{fontSize:13,marginTop:6}}>Попробуйте изменить фильтры</div>
          </div>
        ):masters.map(m=><FullCard key={m.id} m={m} onClick={()=>openMaster(m)}/>)}
      </div>
    </div>
  );
}

function Pill({label,active,onClick}){
  return(
    <button onClick={onClick} style={{flexShrink:0,padding:'7px 14px',borderRadius:22,border:`1.5px solid ${active?T.rose:T.bdr}`,background:active?T.rosePl:'transparent',color:active?T.rose:T.muted,fontSize:12,fontWeight:active?700:500,whiteSpace:'nowrap',transition:'all .15s'}}>
      {label}
    </button>
  );
}

function FullCard({m,onClick}){
  const minPrice=Math.min(...Object.values(m.prices));
  return(
    <div onClick={onClick} style={{background:'#fff',border:`1.5px solid ${T.bdr}`,borderRadius:20,padding:'16px',marginBottom:12,cursor:'pointer',boxShadow:'0 3px 16px rgba(212,120,138,.07)'}}>
      <div style={{display:'flex',gap:14,marginBottom:11}}>
        <div style={{width:58,height:58,borderRadius:16,background:m.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,fontWeight:700,color:'#fff',flexShrink:0,fontFamily:'Tenor Sans,serif',position:'relative'}}>
          {m.avatar}
          <div style={{position:'absolute',bottom:-2,right:-2,width:14,height:14,borderRadius:'50%',background:T.green,border:'2px solid #fff'}}/>
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontWeight:700,fontSize:16,color:T.tx}}>{m.name}</div>
          <div style={{fontSize:11,color:T.muted,marginTop:2}}>📍 {CITY_SHORT[m.city]} · {m.district}</div>
          <div style={{display:'flex',alignItems:'center',gap:8,marginTop:4}}>
            <span style={{fontSize:13,color:T.rose,fontWeight:700}}>★ {m.rating}</span>
            <span style={{fontSize:11,color:T.muted}}>({m.reviews} отзывов)</span>
            <span style={{fontSize:10,background:T.rosePl,color:T.rose,borderRadius:10,padding:'2px 8px',border:`1px solid ${T.bdr}`}}>{catLabel(m.category)}</span>
          </div>
        </div>
      </div>
      <div style={{fontSize:13,color:T.tx2,lineHeight:1.6,marginBottom:10}}>{m.bio}</div>
      <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:12}}>
        {m.services.slice(0,3).map(s=><span key={s} style={{fontSize:11,background:'#FAF4F8',border:`1px solid ${T.bdr}`,borderRadius:20,padding:'4px 10px',color:T.tx2}}>{s}</span>)}
        {m.services.length>3&&<span style={{fontSize:11,color:T.muted}}>+{m.services.length-3}</span>}
      </div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontSize:13,color:T.muted}}>от <span style={{color:T.rose,fontWeight:700,fontSize:16}}>₪{minPrice}</span></div>
        <button style={{background:`linear-gradient(135deg,${T.rose},${T.mauve})`,border:'none',borderRadius:22,padding:'9px 18px',fontSize:13,fontWeight:700,color:'#fff',boxShadow:'0 3px 10px rgba(212,120,138,.3)'}}>
          Записаться →
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MASTER PROFILE + BOOKING
───────────────────────────────────────────── */
function MasterScreen({master,me,saveBooking,setScreen,showToast}){
  const [tab,setTab]=useState('book'); // book | info
  const [calY,setCalY]=useState(()=>new Date().getFullYear());
  const [calM,setCalM]=useState(()=>new Date().getMonth());
  const [selDate,setSelDate]=useState(null);
  const [selSlot,setSelSlot]=useState(null);
  const [step,setStep]=useState('cal'); // cal | form
  const [form,setForm]=useState({first:'',last:'',phone:'',city:'',service:''});
  const [errs,setErrs]=useState({});

  const todayStr=today();
  const prevM=()=>{if(calM===0){setCalY(y=>y-1);setCalM(11);}else setCalM(m=>m-1);};
  const nextM=()=>{if(calM===11){setCalY(y=>y+1);setCalM(0);}else setCalM(m=>m+1);};
  const fdo=new Date(calY,calM,1).getDay();
  const offset=fdo===0?6:fdo-1;
  const dim=new Date(calY,calM+1,0).getDate();

  const submit=()=>{
    const e={};
    if(!form.first)e.first='Введите имя';if(!form.last)e.last='Введите фамилию';
    if(!form.phone)e.phone='Введите телефон';if(!form.city)e.city='Введите город';
    if(!form.service)e.service='Выберите услугу';
    if(!selDate||!selSlot){showToast('Выберите дату и время','err');return;}
    if(Object.keys(e).length){setErrs(e);return;}
    saveBooking({id:Date.now(),masterId:master.id,masterName:master.name,masterWA:master.whatsapp,masterPhone:master.phone,date:selDate,time:selSlot,service:form.service,clientName:form.first+' '+form.last,clientPhone:form.phone,clientCity:form.city,createdAt:new Date().toISOString()});
  };

  return(
    <div className="au" style={{paddingBottom:32}}>
      {/* Hero */}
      <div style={{background:`linear-gradient(160deg,#FFF0F5,#F4EEF9)`,padding:'22px 20px 18px',borderBottom:`1px solid ${T.bdr}`}}>
        <div style={{display:'flex',gap:16,alignItems:'flex-start'}}>
          <div style={{width:68,height:68,borderRadius:18,background:master.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,fontWeight:700,color:'#fff',fontFamily:'Tenor Sans,serif',flexShrink:0,boxShadow:`0 6px 20px ${master.color}55`}}>{master.avatar}</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:'Tenor Sans,serif',fontSize:21,color:T.tx}}>{master.name}</div>
            <div style={{fontSize:11,color:T.muted,marginTop:3}}>📍 {CITY_SHORT[master.city]} · {master.district}</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:6,marginTop:7}}>
              <span style={{fontSize:12,background:T.rosePl,color:T.rose,borderRadius:10,padding:'3px 10px',border:`1px solid ${T.bdr}`,fontWeight:600}}>★ {master.rating}</span>
              <span style={{fontSize:12,color:T.muted}}>{master.reviews} отзывов</span>
              <span style={{fontSize:11,background:T.sagePl,color:T.sage,borderRadius:10,padding:'3px 10px',border:'1px solid rgba(122,158,138,.2)'}}>● Принимает</span>
            </div>
          </div>
        </div>
        <div style={{fontSize:13,color:T.tx2,lineHeight:1.65,marginTop:14}}>{master.bio}</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:6,marginTop:12}}>
          {master.services.map(s=><span key={s} style={{fontSize:11,background:'#fff',border:`1px solid ${T.bdr}`,borderRadius:20,padding:'4px 10px',color:T.tx2}}>{s}</span>)}
        </div>
      </div>

      {/* Tab switcher */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',background:'#fff',borderBottom:`1px solid ${T.bdr}`}}>
        {[['book','📅 Запись'],['info','💰 Прайс']].map(([id,lbl])=>(
          <button key={id} onClick={()=>setTab(id)} style={{padding:'13px',background:'none',border:'none',borderBottom:`2.5px solid ${tab===id?T.rose:'transparent'}`,color:tab===id?T.rose:T.muted,fontSize:13,fontWeight:tab===id?700:500}}>
            {lbl}
          </button>
        ))}
      </div>

      <div style={{padding:'16px 18px'}}>
        {tab==='info'&&(
          <div className="af">
            <SectionTitle>Прайс-лист</SectionTitle>
            <div style={{background:'#fff',border:`1px solid ${T.bdr}`,borderRadius:18,overflow:'hidden',marginBottom:16}}>
              {Object.entries(master.prices).map(([s,p],i,arr)=>(
                <div key={s} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'13px 16px',borderBottom:i<arr.length-1?`1px solid ${T.bdr}`:''}}>
                  <span style={{fontSize:13,color:T.tx}}>{s}</span>
                  <span style={{fontWeight:700,color:T.rose,fontSize:16}}>₪{p}</span>
                </div>
              ))}
            </div>
            <div style={{background:'#fff',border:`1px solid ${T.bdr}`,borderRadius:16,padding:'16px'}}>
              <div style={{fontSize:11,color:T.muted,textTransform:'uppercase',letterSpacing:1.5,marginBottom:12}}>Контакты</div>
              <div style={{fontSize:14,color:T.tx,marginBottom:6}}>📞 {master.phone}</div>
              <a href={`https://wa.me/${master.whatsapp}`} target="_blank" rel="noreferrer"
                style={{display:'flex',alignItems:'center',gap:8,padding:'12px 14px',background:'rgba(37,211,102,.07)',border:'1px solid rgba(37,211,102,.2)',borderRadius:12,textDecoration:'none',marginTop:8}}>
                <span style={{fontSize:18}}>💬</span>
                <div>
                  <div style={{fontSize:13,fontWeight:600,color:'#25a350'}}>WhatsApp</div>
                  <div style={{fontSize:11,color:T.muted}}>Написать напрямую</div>
                </div>
              </a>
            </div>
          </div>
        )}

        {tab==='book'&&(
          <div className="af">
            {/* Step toggle */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',background:'#FAF4F8',borderRadius:14,padding:4,marginBottom:16,border:`1px solid ${T.bdr}`}}>
              {[['cal','📅 Выбор даты'],['form','✍️ Ваши данные']].map(([id,lbl])=>(
                <button key={id} onClick={()=>setStep(id)} style={{padding:'9px',borderRadius:11,border:'none',background:step===id?'#fff':'transparent',color:step===id?T.rose:T.muted,fontSize:12,fontWeight:700,boxShadow:step===id?'0 2px 8px rgba(212,120,138,.15)':'none',transition:'all .2s'}}>
                  {lbl}
                </button>
              ))}
            </div>

            {step==='cal'&&(
              <div className="af">
                <div style={{background:'#fff',border:`1px solid ${T.bdr}`,borderRadius:20,padding:'16px',marginBottom:14,boxShadow:'0 2px 14px rgba(212,120,138,.07)'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
                    <div style={{fontFamily:'Tenor Sans,serif',fontSize:17,color:T.tx}}>{MNAMES[calM]} {calY}</div>
                    <div style={{display:'flex',gap:6}}>
                      {[['◀',prevM],['▶',nextM]].map(([lbl,fn])=>(
                        <button key={lbl} onClick={fn} style={{width:32,height:32,borderRadius:10,background:'#FAF4F8',border:`1px solid ${T.bdr}`,color:T.muted,fontSize:12}}>{lbl}</button>
                      ))}
                    </div>
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',marginBottom:4}}>
                    {['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map((d,i)=>(
                      <div key={d} style={{textAlign:'center',fontSize:10,fontWeight:600,color:i>=5?T.rose:T.muted,padding:'3px 0',textTransform:'uppercase'}}>{d}</div>
                    ))}
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:2}}>
                    {Array(offset).fill(null).map((_,i)=><div key={i}/>)}
                    {Array(dim).fill(null).map((_,i)=>{
                      const d=i+1,date=new Date(calY,calM,d),dStr=fd(date);
                      const isFri=date.getDay()===5,isSat=date.getDay()===6;
                      const isPast=date<new Date(new Date().setHours(0,0,0,0));
                      const av=(!isFri&&!isSat&&!isPast)?avail(master,dStr).length:0;
                      const isSel=selDate===dStr,isToday=dStr===todayStr;
                      return(
                        <div key={d} onClick={()=>{if(isFri||isSat||isPast||av===0)return;setSelDate(dStr);setSelSlot(null);}}
                          style={{aspectRatio:'1',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',borderRadius:10,cursor:(isFri||isSat||isPast||av===0)?'default':'pointer',background:isSel?T.rose:(isToday?T.rosePl:'transparent'),opacity:(isFri||isSat||isPast)?.3:1,transition:'all .12s',border:isToday&&!isSel?`1px solid ${T.bdr2}`:'1px solid transparent'}}>
                          <div style={{fontSize:12,fontWeight:isSel?700:500,color:isSel?'#fff':(isToday?T.rose:T.tx),lineHeight:1}}>{d}</div>
                          {!isFri&&!isSat&&!isPast&&<div style={{width:4,height:4,borderRadius:'50%',background:av>0?T.green:T.bdr,marginTop:2}}/>}
                        </div>
                      );
                    })}
                  </div>
                  {/* Legend */}
                  <div style={{display:'flex',gap:14,marginTop:12,paddingTop:10,borderTop:`1px solid ${T.bdr}`}}>
                    {[[T.green,'Есть места'],[T.rose,'Выбрано'],[T.bdr,'Нет мест']].map(([c,l])=>(
                      <div key={l} style={{display:'flex',alignItems:'center',gap:5,fontSize:10,color:T.muted}}>
                        <div style={{width:8,height:8,borderRadius:'50%',background:c}}/>
                        {l}
                      </div>
                    ))}
                  </div>
                </div>

                {selDate&&(()=>{
                  const sl=master.slots?.[selDate];
                  const hrs=sl?.hrs||[];
                  const bkd=sl?.booked||[];
                  return(
                    <div className="af">
                      <div style={{fontWeight:600,fontSize:13,color:T.tx2,marginBottom:12}}>🗓 {fmtLong(selDate)}</div>
                      {avail(master,selDate).length===0?(
                        <div style={{textAlign:'center',padding:'20px',background:'#fff',borderRadius:14,color:T.muted,border:`1px solid ${T.bdr}`}}>На этот день мест нет</div>
                      ):(
                        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:9,marginBottom:14}}>
                          {hrs.map(h=>{
                            const isB=bkd.includes(h),isSel=selSlot===h&&selDate===selDate;
                            return(
                              <button key={h} onClick={()=>!isB&&setSelSlot(h)} disabled={isB}
                                style={{padding:'11px 6px',borderRadius:12,border:`1.5px solid ${isSel?T.rose:(isB?T.bdr:'rgba(122,158,138,.35)')}`,background:isSel?T.rose:(isB?'#FAF8F8':'rgba(122,158,138,.06)'),color:isSel?'#fff':(isB?T.muted:T.tx),fontSize:14,fontWeight:isSel?700:500,opacity:isB?.45:1,transition:'all .12s'}}>
                                {h}
                                <div style={{fontSize:9,marginTop:2,color:isSel?'rgba(255,255,255,.75)':(isB?T.mutedLt:T.sage)}}>{isB?'Занято':'Свободно'}</div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                      {selSlot&&(
                        <button onClick={()=>setStep('form')} style={{width:'100%',padding:'14px',background:`linear-gradient(135deg,${T.rose},${T.mauve})`,border:'none',borderRadius:14,fontSize:15,fontWeight:700,color:'#fff',boxShadow:'0 4px 16px rgba(212,120,138,.3)'}}>
                          Перейти к форме записи →
                        </button>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            {step==='form'&&(
              <div className="af">
                {selDate&&selSlot?(
                  <div style={{background:'#fff',border:`1.5px solid ${T.bdr2}`,borderRadius:16,padding:'14px 16px',marginBottom:20,boxShadow:'0 2px 12px rgba(212,120,138,.08)'}}>
                    <div style={{fontSize:10,color:T.rose,textTransform:'uppercase',letterSpacing:2,marginBottom:6}}>Ваша запись</div>
                    <div style={{fontFamily:'Tenor Sans,serif',fontSize:17,color:T.tx}}>{fmtLong(selDate)}</div>
                    <div style={{fontSize:13,color:T.tx2,marginTop:3}}>⏰ {selSlot} · {master.name}</div>
                    <button onClick={()=>setStep('cal')} style={{background:'none',border:'none',fontSize:12,color:T.rose,marginTop:8,padding:0,fontWeight:600}}>← Изменить время</button>
                  </div>
                ):(
                  <div onClick={()=>setStep('cal')} style={{background:T.rosePl,border:`1px solid ${T.bdr2}`,borderRadius:12,padding:'12px 14px',marginBottom:18,fontSize:13,color:T.rose,cursor:'pointer'}}>
                    ⚠️ Сначала выберите дату и время →
                  </div>
                )}

                {[{id:'first',lbl:'Имя',ph:'Ваше имя'},{id:'last',lbl:'Фамилия',ph:'Ваша фамилия'},{id:'phone',lbl:'Телефон',ph:'+972 50 123 4567'},{id:'city',lbl:'Город проживания',ph:'Хайфа, Хариш...'}].map(f=>(
                  <FG key={f.id} label={f.lbl} error={errs[f.id]} req>
                    <input value={form[f.id]} onChange={e=>{setForm({...form,[f.id]:e.target.value});setErrs({...errs,[f.id]:''});}} placeholder={f.ph}
                      style={{width:'100%',...inputStyle(!!errs[f.id])}}/>
                  </FG>
                ))}

                <FG label="Услуга" error={errs.service} req>
                  <select value={form.service} onChange={e=>{setForm({...form,service:e.target.value});setErrs({...errs,service:''}); }}
                    style={{width:'100%',...inputStyle(!!errs.service),WebkitAppearance:'none',color:form.service?T.tx:T.muted}}>
                    <option value="">— Выберите услугу —</option>
                    {master.services.map(s=><option key={s} value={s}>{s} — ₪{master.prices[s]||'—'}</option>)}
                  </select>
                </FG>

                <button onClick={submit} style={{width:'100%',padding:'16px',background:`linear-gradient(135deg,${T.rose},${T.mauve})`,border:'none',borderRadius:14,fontSize:16,fontWeight:700,color:'#fff',boxShadow:'0 5px 18px rgba(212,120,138,.35)',marginTop:4}}>
                  💅 Записаться
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function FG({label,children,error,req}){
  return(
    <div style={{marginBottom:14}}>
      <div style={{fontSize:11,fontWeight:700,color:error?T.red:T.muted,textTransform:'uppercase',letterSpacing:.8,marginBottom:7}}>
        {label} {req&&<span style={{color:T.rose}}>✱</span>}
        {error&&<span style={{textTransform:'none',fontSize:10,marginLeft:6,color:T.red}}>{error}</span>}
      </div>
      {children}
    </div>
  );
}
const inputStyle=(err)=>({background:err?'#FFF5F5':'#FAF4F8',border:`1.5px solid ${err?T.red:T.bdr}`,borderRadius:12,padding:'13px 16px',color:T.tx,fontSize:15,outline:'none'});

/* ─────────────────────────────────────────────
   SUCCESS
───────────────────────────────────────────── */
function SuccessScreen({booking,masters,setScreen}){
  const master=masters.find(m=>m.id===booking.masterId);
  const waMsg=encodeURIComponent(`שלום! שמי ${booking.clientName}.\nנרשמתי לתור ל${fmtLong(booking.date)} בשעה ${booking.time}.\nשירות: ${booking.service}\nטלפון: ${booking.clientPhone}\nברצוני לשנות/לבטל את התור.`);
  return(
    <div className="au" style={{padding:'40px 22px',textAlign:'center',display:'flex',flexDirection:'column',alignItems:'center',minHeight:'100%',background:`linear-gradient(180deg,#FFF0F5 0%,${T.bg} 40%)`}}>
      <div className="ap" style={{width:90,height:90,borderRadius:'50%',background:`linear-gradient(135deg,${T.rose},${T.mauve})`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:38,marginBottom:22,boxShadow:`0 14px 40px rgba(212,120,138,.32)`}}>💅</div>
      <div style={{fontFamily:'Tenor Sans,serif',fontSize:28,color:T.tx,marginBottom:8,lineHeight:1.2}}>Запись принята!</div>
      <div style={{fontSize:14,color:T.tx2,lineHeight:1.7,marginBottom:26,maxWidth:290}}>
        Спасибо, что выбрали нас! ✨<br/>Ждём вас в нашей студии красоты.
      </div>

      <div style={{background:'#fff',border:`1px solid ${T.bdr}`,borderRadius:20,padding:'18px',width:'100%',marginBottom:18,textAlign:'left',boxShadow:'0 4px 20px rgba(212,120,138,.08)'}}>
        {[['👤 Клиент',booking.clientName],['📞 Телефон',booking.clientPhone],['📍 Город',booking.clientCity],['💅 Мастер',booking.masterName],['🗓 Дата',fmtLong(booking.date)],['⏰ Время',booking.time],['✂️ Услуга',booking.service]].map(([k,v])=>(
          <div key={k} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:`1px solid ${T.bdr}`,fontSize:13}}>
            <span style={{color:T.muted}}>{k}</span><span style={{fontWeight:600,color:T.tx}}>{v}</span>
          </div>
        ))}
      </div>

      <div style={{background:T.rosePl,border:`1px solid ${T.bdr}`,borderRadius:14,padding:'14px 16px',width:'100%',marginBottom:16,textAlign:'left'}}>
        <div style={{fontSize:10,color:T.rose,textTransform:'uppercase',letterSpacing:2,marginBottom:6}}>💡 Важно знать</div>
        <div style={{fontSize:13,color:T.tx2,lineHeight:1.65}}>Если у вас что-то изменилось — пожалуйста, сообщите мастеру заранее через WhatsApp. Спасибо за понимание! 🙏</div>
      </div>

      <a href={`https://wa.me/${booking.masterWA}?text=${waMsg}`} target="_blank" rel="noreferrer"
        style={{display:'flex',alignItems:'center',justifyContent:'center',gap:12,width:'100%',padding:'16px',background:'#25D366',borderRadius:14,textDecoration:'none',marginBottom:12,boxShadow:'0 6px 20px rgba(37,211,102,.25)'}}>
        <span style={{fontSize:22}}>💬</span>
        <div style={{textAlign:'left'}}>
          <div style={{fontSize:15,fontWeight:700,color:'#fff'}}>Написать мастеру в WhatsApp</div>
          <div style={{fontSize:11,color:'rgba(255,255,255,.8)',marginTop:1}}>{booking.masterPhone} · отменить или перенести</div>
        </div>
      </a>

      <button onClick={()=>setScreen('explore')} style={{width:'100%',padding:'13px',background:'transparent',border:`1.5px solid ${T.bdr}`,borderRadius:14,fontSize:14,color:T.muted,fontWeight:500}}>
        🔍 Найти другого мастера
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   AUTH (login + register)
───────────────────────────────────────────── */
function AuthScreen({me,setMe,users,setUsers,masters,setMasters,setScreen,showToast}){
  const [mode,setMode]=useState('login');
  const [form,setForm]=useState({name:'',email:'',password:'',phone:'',whatsapp:'',city:CITIES[0],district:'',bio:'',category:'nail',services:[],prices:{}});
  const [errs,setErrs]=useState({});

  const login=()=>{
    // Admin hardcode
    if(form.email==='admin@beauty.il'&&form.password==='admin123'){
      const adm={id:'admin',name:'Администратор',email:'admin@beauty.il',role:'admin'};
      setMe(adm);lsSave('il_me',adm);showToast('Добро пожаловать, Admin! 👑');setScreen('home');return;
    }
    const u=users.find(u=>u.email===form.email&&u.password===form.password);
    if(!u){setErrs({email:'Неверный email или пароль'});return;}
    setMe(u);lsSave('il_me',u);showToast('Добро пожаловать, '+u.name+'! 🌸');setScreen('dash');
  };

  const register=()=>{
    const e={};
    if(!form.name)e.name='Введите имя';
    if(!form.email||!form.email.includes('@'))e.email='Некорректный email';
    if(form.password.length<6)e.password='Минимум 6 символов';
    if(!form.phone)e.phone='Введите телефон';
    if(!form.district)e.district='Введите район';
    if(form.services.length===0)e.services='Выберите услуги';
    if(users.find(u=>u.email===form.email)){e.email='Email уже зарегистрирован';setErrs(e);return;}
    if(Object.keys(e).length){setErrs(e);return;}
    const prices=Object.fromEntries(form.services.map(s=>[s,form.prices[s]||100]));
    const newM={
      id:'u'+Date.now(),name:form.name,email:form.email,password:form.password,
      city:form.city,district:form.district,bio:form.bio||'Профессиональный мастер красоты.',
      phone:form.phone,whatsapp:form.whatsapp||form.phone.replace(/\D/g,''),
      category:form.category,services:form.services,prices,
      avatar:form.name.trim().split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()||'М',
      color:MASTER_COLORS[Math.floor(Math.random()*MASTER_COLORS.length)],
      rating:5.0,reviews:0,slots:genSlots(),bookings:[],
      approved:false,role:'master',
    };
    setMasters(prev=>[...prev,newM]);
    setUsers(prev=>[...prev,newM]);
    setMe(newM);lsSave('il_me',newM);
    showToast('Регистрация отправлена! Ожидайте одобрения администратора 🌸');
    setScreen('dash');
  };

  const toggleSvc=(s)=>{
    const svcs=form.services.includes(s)?form.services.filter(x=>x!==s):[...form.services,s];
    setForm({...form,services:svcs});setErrs({...errs,services:''});
  };
  const setPrice=(s,v)=>setForm(prev=>({...prev,prices:{...prev.prices,[s]:parseInt(v)||0}}));

  return(
    <div className="au" style={{paddingBottom:40}}>
      {/* Header */}
      <div style={{background:`linear-gradient(160deg,#FFF0F5,#F4EEF9)`,padding:'28px 22px 20px',textAlign:'center',borderBottom:`1px solid ${T.bdr}`}}>
        <div style={{fontSize:36,marginBottom:8}}>🌸</div>
        <div style={{fontFamily:'Tenor Sans,serif',fontSize:24,color:T.tx,marginBottom:4}}>{mode==='login'?'Добро пожаловать':'Регистрация мастера'}</div>
        <div style={{fontSize:13,color:T.muted}}>{mode==='login'?'Войдите в личный кабинет':'Создайте профиль и начните принимать клиентов'}</div>
        <button onClick={()=>setScreen('home')} style={{position:'absolute',top:18,left:18,background:'none',border:`1px solid ${T.bdr}`,borderRadius:10,padding:'8px 12px',color:T.muted,fontSize:12}}>← Назад</button>
      </div>

      {/* Toggle */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',background:'#FAF4F8',borderRadius:0,padding:4,borderBottom:`1px solid ${T.bdr}`}}>
        {[['login','Войти'],['register','Зарегистрироваться']].map(([id,lbl])=>(
          <button key={id} onClick={()=>{setMode(id);setErrs({});}} style={{padding:'11px',borderRadius:0,border:'none',borderBottom:`2.5px solid ${mode===id?T.rose:'transparent'}`,background:'transparent',color:mode===id?T.rose:T.muted,fontSize:13,fontWeight:mode===id?700:500}}>
            {lbl}
          </button>
        ))}
      </div>

      <div style={{padding:'22px 20px'}}>
        {mode==='login'?(
          <div className="af">
            <div style={{background:T.rosePl,border:`1px solid ${T.bdr}`,borderRadius:12,padding:'12px 14px',marginBottom:18,fontSize:12,color:T.muted}}>
              🔑 Для входа администратора используйте:<br/>
              <strong style={{color:T.rose}}>admin@beauty.il</strong> / <strong style={{color:T.rose}}>admin123</strong>
            </div>
            {[{id:'email',lbl:'Email',ph:'your@email.com',type:'email'},{id:'password',lbl:'Пароль',ph:'••••••••',type:'password'}].map(f=>(
              <FG key={f.id} label={f.lbl} error={errs[f.id]}>
                <input type={f.type} value={form[f.id]} placeholder={f.ph} onChange={e=>{setForm({...form,[f.id]:e.target.value});setErrs({...errs,[f.id]:''}); }}
                  style={{width:'100%',...inputStyle(!!errs[f.id])}}/>
              </FG>
            ))}
            <button onClick={login} style={{width:'100%',padding:'15px',background:`linear-gradient(135deg,${T.rose},${T.mauve})`,border:'none',borderRadius:14,fontSize:16,fontWeight:700,color:'#fff',marginTop:8,boxShadow:'0 5px 18px rgba(212,120,138,.3)'}}>
              Войти
            </button>
            <div style={{textAlign:'center',marginTop:14,fontSize:13,color:T.muted}}>
              Нет аккаунта? <span onClick={()=>setMode('register')} style={{color:T.rose,cursor:'pointer',fontWeight:700}}>Зарегистрируйтесь</span>
            </div>
          </div>
        ):(
          <div className="af">
            {/* Basic */}
            {[{id:'name',lbl:'Полное имя',ph:'Ваше имя'},{id:'email',lbl:'Email',ph:'your@email.com',type:'email'},{id:'password',lbl:'Пароль (мин. 6 символов)',ph:'••••••••',type:'password'},{id:'phone',lbl:'Телефон',ph:'+972 50 ...'},{id:'whatsapp',lbl:'WhatsApp (если другой)',ph:'+972...',req:false}].map(f=>(
              <FG key={f.id} label={f.lbl} error={errs[f.id]} req={f.req!==false}>
                <input type={f.type||'text'} value={form[f.id]} placeholder={f.ph} onChange={e=>{setForm({...form,[f.id]:e.target.value});setErrs({...errs,[f.id]:''}); }}
                  style={{width:'100%',...inputStyle(!!errs[f.id])}}/>
              </FG>
            ))}

            {/* City */}
            <FG label="Город" req>
              <select value={form.city} onChange={e=>setForm({...form,city:e.target.value})}
                style={{width:'100%',...inputStyle(false),WebkitAppearance:'none'}}>
                {CITIES.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </FG>

            <FG label="Район / Улица" error={errs.district} req>
              <input value={form.district} placeholder="Кармель, Хадар, Центр..." onChange={e=>{setForm({...form,district:e.target.value});setErrs({...errs,district:''}); }}
                style={{width:'100%',...inputStyle(!!errs.district)}}/>
            </FG>

            {/* Category */}
            <FG label="Категория услуг" req>
              <div style={{display:'flex',flexWrap:'wrap',gap:7}}>
                {CATEGORIES.map(c=>{
                  const on=form.category===c.id;
                  return <button key={c.id} onClick={()=>setForm({...form,category:c.id,services:[]})}
                    style={{padding:'8px 14px',borderRadius:20,border:`1.5px solid ${on?T.rose:T.bdr}`,background:on?T.rosePl:'transparent',color:on?T.rose:T.muted,fontSize:12,fontWeight:on?700:500}}>{c.label}</button>;
                })}
              </div>
            </FG>

            {/* Services */}
            <FG label="Услуги" error={errs.services} req>
              <div style={{display:'flex',flexWrap:'wrap',gap:7,marginBottom:form.services.length?14:0}}>
                {(ALL_SERVICES[form.category]||[]).map(s=>{
                  const on=form.services.includes(s);
                  return <button key={s} onClick={()=>toggleSvc(s)}
                    style={{padding:'7px 12px',borderRadius:20,border:`1px solid ${on?T.rose:T.bdr}`,background:on?T.rosePl:'transparent',color:on?T.rose:T.muted,fontSize:12,fontWeight:on?600:400}}>{s}</button>;
                })}
              </div>
            </FG>

            {/* Prices */}
            {form.services.length>0&&(
              <FG label="Цены (₪)">
                {form.services.map(s=>(
                  <div key={s} style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
                    <span style={{flex:1,fontSize:12,color:T.tx2}}>{s}</span>
                    <input type="number" value={form.prices[s]||''} onChange={e=>setPrice(s,e.target.value)} placeholder="₪"
                      style={{width:80,...inputStyle(false),padding:'9px 10px',textAlign:'right',fontSize:14,fontWeight:600,color:T.rose}}/>
                  </div>
                ))}
              </FG>
            )}

            {/* Bio */}
            <FG label="О себе">
              <textarea value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} placeholder="Расскажите о своём опыте..."
                style={{width:'100%',...inputStyle(false),resize:'none',minHeight:80,fontSize:14}}/>
            </FG>

            <button onClick={register} style={{width:'100%',padding:'15px',background:`linear-gradient(135deg,${T.rose},${T.mauve})`,border:'none',borderRadius:14,fontSize:16,fontWeight:700,color:'#fff',boxShadow:'0 5px 18px rgba(212,120,138,.3)'}}>
              Создать профиль 🌸
            </button>
            <div style={{textAlign:'center',marginTop:12,fontSize:12,color:T.muted}}>
              После регистрации ваш профиль будет проверен администратором
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DASHBOARD (master cabinet)
───────────────────────────────────────────── */
function Dashboard({me,setMe,masters,updateMaster,showToast,setScreen}){
  const [tab,setTab]=useState('bookings');
  const master=masters.find(m=>m.id===me.id);

  if(!master)return <div style={{padding:40,textAlign:'center',color:T.muted}}>Профиль не найден</div>;

  const bookings=master.bookings||[];
  const upcoming=bookings.filter(b=>b.date>=today()).sort((a,b)=>a.date>b.date?1:-1);
  const past=bookings.filter(b=>b.date<today()).sort((a,b)=>a.date<b.date?1:-1);

  return(
    <div className="au" style={{paddingBottom:32}}>
      {/* Pending banner */}
      {!master.approved&&(
        <div style={{background:'rgba(200,152,106,.1)',border:'1px solid rgba(200,152,106,.3)',borderRadius:0,padding:'12px 18px',display:'flex',gap:10,alignItems:'center',borderBottom:`1px solid ${T.bdr}`}}>
          <span style={{fontSize:20}}>⏳</span>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:T.gold}}>Профиль на проверке</div>
            <div style={{fontSize:12,color:T.muted,marginTop:2}}>Администратор рассмотрит вашу заявку в ближайшее время</div>
          </div>
        </div>
      )}

      {/* Hero */}
      <div style={{background:`linear-gradient(160deg,#FFF0F5,#F4EEF9)`,padding:'20px',borderBottom:`1px solid ${T.bdr}`}}>
        <div style={{display:'flex',gap:14,alignItems:'center'}}>
          <div style={{width:60,height:60,borderRadius:16,background:master.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,fontWeight:700,color:'#fff',flexShrink:0,fontFamily:'Tenor Sans,serif'}}>{master.avatar}</div>
          <div>
            <div style={{fontFamily:'Tenor Sans,serif',fontSize:20,color:T.tx}}>{master.name}</div>
            <div style={{fontSize:11,color:T.muted,marginTop:2}}>📍 {CITY_SHORT[master.city]} · {master.district}</div>
            <div style={{display:'flex',alignItems:'center',gap:10,marginTop:4}}>
              <span style={{fontSize:13,color:T.rose,fontWeight:700}}>★ {master.rating}</span>
              <span style={{fontSize:11,background:master.approved?T.sagePl:'rgba(200,152,106,.1)',color:master.approved?T.sage:T.gold,borderRadius:10,padding:'2px 8px',border:`1px solid ${master.approved?'rgba(122,158,138,.2)':'rgba(200,152,106,.2)'}`}}>{master.approved?'✅ Одобрен':'⏳ На проверке'}</span>
            </div>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginTop:14}}>
          {[{n:upcoming.length,l:'Предстоящих'},{n:past.length,l:'Выполнено'},{n:master.services.length,l:'Услуг'}].map((s,i)=>(
            <div key={i} style={{background:'#fff',border:`1px solid ${T.bdr}`,borderRadius:12,padding:'10px 6px',textAlign:'center'}}>
              <div style={{fontFamily:'Tenor Sans,serif',fontSize:22,color:T.rose}}>{s.n}</div>
              <div style={{fontSize:9,color:T.muted,textTransform:'uppercase',letterSpacing:.8}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:'flex',background:'#fff',borderBottom:`1px solid ${T.bdr}`,overflowX:'auto'}}>
        {[['bookings','📋 Записи'],['profile','👤 Профиль'],['prices','💰 Цены'],['schedule','⚙️ Дни']].map(([id,lbl])=>(
          <button key={id} onClick={()=>setTab(id)} style={{flex:'none',padding:'12px 16px',background:'none',border:'none',borderBottom:`2.5px solid ${tab===id?T.rose:'transparent'}`,color:tab===id?T.rose:T.muted,fontSize:12,fontWeight:tab===id?700:500,whiteSpace:'nowrap'}}>
            {lbl}
          </button>
        ))}
      </div>

      <div style={{padding:'18px'}}>
        {tab==='bookings'&&<BookingsTab upcoming={upcoming} past={past}/>}
        {tab==='profile'&&<ProfileTab master={master} updateMaster={updateMaster} showToast={showToast}/>}
        {tab==='prices'&&<PricesTab master={master} updateMaster={updateMaster} showToast={showToast}/>}
        {tab==='schedule'&&<ScheduleTab master={master} updateMaster={updateMaster} showToast={showToast}/>}
      </div>
    </div>
  );
}

function BookingsTab({upcoming,past}){
  return(
    <div>
      <SectionTitle>Предстоящие ({upcoming.length})</SectionTitle>
      {upcoming.length===0?(
        <div style={{textAlign:'center',padding:'28px 20px',background:'#fff',borderRadius:16,color:T.muted,marginBottom:18,border:`1px solid ${T.bdr}`}}>
          <div style={{fontSize:36,marginBottom:8}}>📭</div><div>Записей пока нет</div>
        </div>
      ):upcoming.map(b=><BCard key={b.id} b={b} upcoming/>)}
      {past.length>0&&<>
        <SectionTitle style={{marginTop:20}}>История ({past.length})</SectionTitle>
        {past.slice(0,8).map(b=><BCard key={b.id} b={b}/>)}
      </>}
    </div>
  );
}
function BCard({b,upcoming}){
  const waMsg=encodeURIComponent(`שלום, ${b.clientName}! תזכורת לתור שלך ב${fmtLong(b.date)} בשעה ${b.time}. מחכים לך! 💅`);
  return(
    <div style={{background:'#fff',border:`1.5px solid ${upcoming?T.bdr2:T.bdr}`,borderRadius:16,padding:'14px 16px',marginBottom:10,borderLeft:`4px solid ${upcoming?T.rose:T.bdr}`}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
        <div>
          <div style={{fontWeight:700,fontSize:15,color:T.tx}}>{b.clientName}</div>
          <div style={{fontSize:12,color:T.muted,marginTop:2}}>📞 {b.clientPhone} · 📍 {b.clientCity}</div>
        </div>
        {upcoming&&(
          <a href={`https://wa.me/${b.clientPhone.replace(/\D/g,'')}?text=${waMsg}`} target="_blank" rel="noreferrer"
            style={{width:34,height:34,borderRadius:10,background:'rgba(37,211,102,.1)',border:'1px solid rgba(37,211,102,.25)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,textDecoration:'none'}}>💬</a>
        )}
      </div>
      <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
        {[[T.rose,`🗓 ${fmtLong(b.date)}`],[T.tx2,`⏰ ${b.time}`],[T.muted,b.service]].map(([c,txt])=>(
          <span key={txt} style={{fontSize:11,background:'#FAF4F8',border:`1px solid ${T.bdr}`,borderRadius:20,padding:'4px 10px',color:c}}>{txt}</span>
        ))}
      </div>
    </div>
  );
}

function ProfileTab({master,updateMaster,showToast}){
  const [f,setF]=useState({name:master.name,phone:master.phone||'',whatsapp:master.whatsapp||'',city:master.city,district:master.district,bio:master.bio||''});
  const save=()=>{updateMaster(master.id,f);showToast('Профиль обновлён ✅');};
  return(
    <div>
      {[{id:'name',lbl:'Имя'},{id:'phone',lbl:'Телефон'},{id:'whatsapp',lbl:'WhatsApp'},{id:'district',lbl:'Район'}].map(fl=>(
        <FG key={fl.id} label={fl.lbl}>
          <input value={f[fl.id]} onChange={e=>setF({...f,[fl.id]:e.target.value})} style={{width:'100%',...inputStyle(false)}}/>
        </FG>
      ))}
      <FG label="Город">
        <select value={f.city} onChange={e=>setF({...f,city:e.target.value})} style={{width:'100%',...inputStyle(false),WebkitAppearance:'none'}}>
          {CITIES.map(c=><option key={c} value={c}>{c}</option>)}
        </select>
      </FG>
      <FG label="О себе">
        <textarea value={f.bio} onChange={e=>setF({...f,bio:e.target.value})} style={{width:'100%',...inputStyle(false),resize:'none',minHeight:80,fontSize:14}}/>
      </FG>
      <button onClick={save} style={{width:'100%',padding:'14px',background:`linear-gradient(135deg,${T.rose},${T.mauve})`,border:'none',borderRadius:14,fontSize:15,fontWeight:700,color:'#fff',boxShadow:'0 4px 14px rgba(212,120,138,.28)'}}>💾 Сохранить</button>
    </div>
  );
}

function PricesTab({master,updateMaster,showToast}){
  const [svcs,setSvcs]=useState([...master.services]);
  const [prices,setPrices]=useState({...master.prices});
  const catSvcs=ALL_SERVICES[master.category]||[];
  const toggle=(s)=>{
    const ns=svcs.includes(s)?svcs.filter(x=>x!==s):[...svcs,s];
    setSvcs(ns);if(!prices[s])setPrices({...prices,[s]:100});
  };
  const save=()=>{
    const fp=Object.fromEntries(Object.entries(prices).filter(([k])=>svcs.includes(k)));
    updateMaster(master.id,{services:svcs,prices:fp});showToast('Цены обновлены ✅');
  };
  return(
    <div>
      <FG label="Услуги">
        <div style={{display:'flex',flexWrap:'wrap',gap:7,marginBottom:14}}>
          {catSvcs.map(s=>{const on=svcs.includes(s);return(
            <button key={s} onClick={()=>toggle(s)} style={{padding:'7px 12px',borderRadius:20,border:`1px solid ${on?T.rose:T.bdr}`,background:on?T.rosePl:'transparent',color:on?T.rose:T.muted,fontSize:12,fontWeight:on?600:400}}>{s}</button>
          );})}
        </div>
      </FG>
      {svcs.length>0&&(
        <FG label="Цены (₪)">
          {svcs.map(s=>(
            <div key={s} style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
              <span style={{flex:1,fontSize:13,color:T.tx}}>{s}</span>
              <input type="number" value={prices[s]||''} onChange={e=>setPrices({...prices,[s]:parseInt(e.target.value)||0})}
                style={{width:85,...inputStyle(false),padding:'9px 10px',textAlign:'right',fontSize:14,fontWeight:700,color:T.rose}}/>
              <span style={{fontSize:11,color:T.muted}}>₪</span>
            </div>
          ))}
        </FG>
      )}
      <button onClick={save} style={{width:'100%',padding:'14px',background:`linear-gradient(135deg,${T.rose},${T.mauve})`,border:'none',borderRadius:14,fontSize:15,fontWeight:700,color:'#fff',boxShadow:'0 4px 14px rgba(212,120,138,.28)'}}>💾 Сохранить</button>
    </div>
  );
}

function ScheduleTab({master,updateMaster,showToast}){
  const [blocked,setBlocked]=useState(()=>ls('bl_'+master.id,[]));
  const toggle=(dStr)=>{
    const nb=blocked.includes(dStr)?blocked.filter(d=>d!==dStr):[...blocked,dStr];
    setBlocked(nb);lsSave('bl_'+master.id,nb);
    showToast(blocked.includes(dStr)?'День открыт':'День закрыт');
  };
  const dates=[];for(let i=0;i<14;i++){const d=new Date();d.setDate(d.getDate()+i);if(d.getDay()!==5&&d.getDay()!==6)dates.push(fd(d));}
  return(
    <div>
      <div style={{background:'rgba(122,158,138,.08)',border:'1px solid rgba(122,158,138,.2)',borderRadius:12,padding:'12px 14px',marginBottom:16,fontSize:13,color:T.tx2,lineHeight:1.6}}>
        💡 Нажмите на день чтобы закрыть его (клиенты не смогут записаться).<br/>
        <span style={{fontSize:11,color:T.muted}}>Шаббат (пятница–суббота) уже недоступен.</span>
      </div>
      {dates.map(dStr=>{
        const isB=blocked.includes(dStr);
        const sl=master.slots?.[dStr];
        const avl=sl?avail(master,dStr).length:0;
        const bkd=sl?sl.booked.length:0;
        return(
          <div key={dStr} onClick={()=>toggle(dStr)} style={{display:'flex',alignItems:'center',justifyContent:'space-between',background:isB?'rgba(212,120,138,.06)':'#fff',border:`1.5px solid ${isB?T.bdr2:T.bdr}`,borderRadius:14,padding:'13px 16px',marginBottom:8,cursor:'pointer'}}>
            <div>
              <div style={{fontWeight:600,fontSize:14,color:isB?T.rose:T.tx}}>{fmtLong(dStr)}</div>
              <div style={{fontSize:11,color:T.muted,marginTop:2}}>{isB?'🔒 Закрыто':`✅ ${avl} своб. · 🔴 ${bkd} занято`}</div>
            </div>
            <div style={{width:30,height:30,borderRadius:9,background:isB?T.rosePl:'rgba(122,158,138,.1)',border:`1px solid ${isB?T.bdr2:'rgba(122,158,138,.25)'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>
              {isB?'🔒':'✅'}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   ADMIN PANEL
───────────────────────────────────────────── */
function AdminPanel({me,masters,users,approveMaster,deleteMaster,setScreen,showToast}){
  const [tab,setTab]=useState('pending');
  if(!me||me.role!=='admin'){return(
    <div style={{padding:40,textAlign:'center'}}>
      <div style={{fontSize:48,marginBottom:16}}>🔐</div>
      <div style={{fontSize:16,color:T.muted}}>Доступ запрещён</div>
      <button onClick={()=>setScreen('home')} style={{marginTop:16,padding:'10px 20px',background:T.rose,border:'none',borderRadius:12,color:'#fff',fontWeight:600}}>← Назад</button>
    </div>
  );}

  const pending=masters.filter(m=>!m.approved);
  const approved=masters.filter(m=>m.approved);

  const stats=[
    {n:masters.length,  l:'Всего мастеров',  e:'🌸'},
    {n:approved.length, l:'Активных',         e:'✅'},
    {n:pending.length,  l:'На проверке',      e:'⏳'},
    {n:masters.reduce((s,m)=>s+(m.bookings?.length||0),0), l:'Всего записей', e:'📋'},
  ];

  return(
    <div className="au" style={{paddingBottom:32}}>
      {/* Header */}
      <div style={{background:`linear-gradient(160deg,#2D1B2E,#4A2A40)`,padding:'20px 20px 16px',borderBottom:`1px solid ${T.bdr}`}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
          <div>
            <div style={{fontFamily:'Tenor Sans,serif',fontSize:20,color:'#FAE8F5'}}>⚙️ Панель администратора</div>
            <div style={{fontSize:11,color:'rgba(250,232,245,.5)',marginTop:3}}>יופי ישראל · Управление платформой</div>
          </div>
          <button onClick={()=>setScreen('home')} style={{background:'rgba(255,255,255,.1)',border:'1px solid rgba(255,255,255,.15)',borderRadius:10,padding:'8px 12px',color:'rgba(255,255,255,.7)',fontSize:12}}>← Сайт</button>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
          {stats.map((s,i)=>(
            <div key={i} style={{background:'rgba(255,255,255,.07)',borderRadius:12,padding:'10px 6px',textAlign:'center',border:'1px solid rgba(255,255,255,.08)'}}>
              <div style={{fontSize:16,marginBottom:2}}>{s.e}</div>
              <div style={{fontFamily:'Tenor Sans,serif',fontSize:20,color:'#FAE8F5'}}>{s.n}</div>
              <div style={{fontSize:9,color:'rgba(250,232,245,.45)',textTransform:'uppercase',letterSpacing:.6}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:'flex',background:'#fff',borderBottom:`1px solid ${T.bdr}`}}>
        {[['pending',`⏳ На проверке (${pending.length})`],['approved',`✅ Одобренные (${approved.length})`],['all','📊 Все мастера']].map(([id,lbl])=>(
          <button key={id} onClick={()=>setTab(id)} style={{flex:1,padding:'12px 8px',background:'none',border:'none',borderBottom:`2.5px solid ${tab===id?T.rose:'transparent'}`,color:tab===id?T.rose:T.muted,fontSize:11,fontWeight:tab===id?700:500,whiteSpace:'nowrap'}}>
            {lbl}
          </button>
        ))}
      </div>

      <div style={{padding:'16px 18px'}}>
        {tab==='pending'&&(
          <div>
            {pending.length===0?(
              <div style={{textAlign:'center',padding:'50px 20px',color:T.muted}}>
                <div style={{fontSize:48,marginBottom:12}}>🎉</div>
                <div style={{fontSize:15}}>Нет заявок на проверку</div>
              </div>
            ):pending.map(m=><AdminMasterCard key={m.id} m={m} onApprove={()=>approveMaster(m.id)} onDelete={()=>deleteMaster(m.id)} showPending/>)}
          </div>
        )}
        {tab==='approved'&&(
          <div>
            {approved.map(m=><AdminMasterCard key={m.id} m={m} onDelete={()=>deleteMaster(m.id)}/>)}
          </div>
        )}
        {tab==='all'&&(
          <div>
            <div style={{background:'#fff',border:`1px solid ${T.bdr}`,borderRadius:16,overflow:'hidden',marginBottom:16}}>
              <div style={{padding:'12px 16px',background:'#FAF4F8',borderBottom:`1px solid ${T.bdr}`,fontSize:11,fontWeight:700,color:T.muted,textTransform:'uppercase',letterSpacing:1}}>Статистика по городам</div>
              {CITIES.map(city=>{
                const cnt=masters.filter(m=>m.city===city);
                const bkd=cnt.reduce((s,m)=>s+(m.bookings?.length||0),0);
                return(
                  <div key={city} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 16px',borderBottom:`1px solid ${T.bdr}`}}>
                    <div>
                      <div style={{fontWeight:600,fontSize:14,color:T.tx}}>{CITY_SHORT[city]}</div>
                      <div style={{fontSize:11,color:T.muted}}>{cnt.length} мастеров</div>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div style={{fontSize:14,fontWeight:700,color:T.rose}}>{bkd}</div>
                      <div style={{fontSize:10,color:T.muted}}>записей</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{background:'#fff',border:`1px solid ${T.bdr}`,borderRadius:16,overflow:'hidden'}}>
              <div style={{padding:'12px 16px',background:'#FAF4F8',borderBottom:`1px solid ${T.bdr}`,fontSize:11,fontWeight:700,color:T.muted,textTransform:'uppercase',letterSpacing:1}}>Статистика по категориям</div>
              {CATEGORIES.map(cat=>{
                const cnt=masters.filter(m=>m.category===cat.id);
                return(
                  <div key={cat.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 16px',borderBottom:`1px solid ${T.bdr}`}}>
                    <div style={{fontSize:13,color:T.tx}}>{cat.label}</div>
                    <span style={{background:T.rosePl,color:T.rose,fontSize:12,fontWeight:700,borderRadius:20,padding:'3px 10px',border:`1px solid ${T.bdr}`}}>{cnt.length} мастеров</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminMasterCard({m,onApprove,onDelete,showPending}){
  const [open,setOpen]=useState(false);
  return(
    <div style={{background:'#fff',border:`1.5px solid ${showPending?'rgba(200,152,106,.3)':T.bdr}`,borderRadius:18,marginBottom:12,overflow:'hidden',boxShadow:'0 2px 14px rgba(212,120,138,.06)'}}>
      <div style={{padding:'14px 16px'}}>
        <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
          <div style={{width:46,height:46,borderRadius:12,background:m.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:17,fontWeight:700,color:'#fff',flexShrink:0,fontFamily:'Tenor Sans,serif'}}>{m.avatar}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontWeight:700,fontSize:15,color:T.tx}}>{m.name}</div>
            <div style={{fontSize:11,color:T.muted,marginTop:2}}>📍 {CITY_SHORT[m.city]} · {m.district}</div>
            <div style={{fontSize:11,color:T.muted,marginTop:1}}>{catLabel(m.category)} · 📞 {m.phone}</div>
            <div style={{fontSize:11,color:T.muted,marginTop:1}}>✉️ {m.email}</div>
          </div>
          <button onClick={()=>setOpen(!open)} style={{background:'#FAF4F8',border:`1px solid ${T.bdr}`,borderRadius:8,padding:'6px 8px',color:T.muted,fontSize:11}}>
            {open?'▲':'▼'}
          </button>
        </div>

        {open&&(
          <div className="af" style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${T.bdr}`}}>
            <div style={{fontSize:13,color:T.tx2,lineHeight:1.6,marginBottom:10}}>{m.bio}</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:10}}>
              {m.services.map(s=><span key={s} style={{fontSize:11,background:'#FAF4F8',border:`1px solid ${T.bdr}`,borderRadius:20,padding:'3px 8px',color:T.tx2}}>{s}</span>)}
            </div>
            <div style={{fontSize:11,color:T.muted}}>
              📊 Записей: {m.bookings?.length||0} · ★ {m.rating} · {m.reviews} отзывов
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{display:'flex',gap:0,borderTop:`1px solid ${T.bdr}`}}>
        {showPending&&(
          <button onClick={onApprove} style={{flex:1,padding:'13px',background:'rgba(122,158,138,.08)',border:'none',borderRight:`1px solid ${T.bdr}`,color:T.sage,fontSize:13,fontWeight:700}}>
            ✅ Одобрить
          </button>
        )}
        <button onClick={()=>{if(window.confirm(`Удалить мастера «${m.name}»?`))onDelete();}} style={{flex:1,padding:'13px',background:'rgba(212,120,138,.06)',border:'none',color:T.rose,fontSize:13,fontWeight:700}}>
          🗑 Удалить
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TOAST
───────────────────────────────────────────── */
function Toast({msg,type}){
  return(
    <div style={{position:'fixed',top:72,left:'50%',transform:'translateX(-50%)',zIndex:9999,pointerEvents:'none',width:'88%',animation:'fadeUp .25s ease'}}>
      <div style={{background:'#fff',border:`1.5px solid ${type==='err'?T.red:T.rose}`,borderRadius:14,padding:'12px 18px',fontSize:13,fontWeight:600,color:type==='err'?T.red:T.rose,textAlign:'center',boxShadow:'0 8px 30px rgba(212,120,138,.18)'}}>
        {type==='err'?'❌ ':'🌸 '}{msg}
      </div>
    </div>
  );
}
