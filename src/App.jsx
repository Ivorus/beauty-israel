import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const GS = ({ theme }) => {
  const fonts = {
    blush: "https://fonts.googleapis.com/css2?family=Tenor+Sans&family=Nunito:wght@300;400;500;600;700;800&display=swap",
    dark:  "https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;600;700&family=Raleway:wght@300;400;500;600;700&display=swap",
    fresh: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Fredoka+One&display=swap",
  };
  return (
    <style>{`
      @import url('${fonts[theme]}');
      *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
      html,body,#root{height:100%;background:${THEMES[theme].bg};}
      body{font-family:${THEMES[theme].fontBody};color:${THEMES[theme].tx};}
      ::-webkit-scrollbar{width:3px;}
      ::-webkit-scrollbar-thumb{background:${THEMES[theme].accent}55;border-radius:4px;}
      input,select,textarea,button{font-family:${THEMES[theme].fontBody};}
      @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes pop{from{transform:scale(.8);opacity:0}to{transform:scale(1);opacity:1}}
      @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
      .au{animation:fadeUp .35s ease both;}
      .af{animation:fadeIn .3s ease both;}
      .ap{animation:pop .3s cubic-bezier(.34,1.56,.64,1) both;}
    `}</style>
  );
};

/* ─────────────────────────────────────────────
   3 THEMES
───────────────────────────────────────────── */
const THEMES = {
  // 🌸 BLUSH — нежный розовый (оригинал)
  blush: {
    name: "🌸 Блаш",
    bg: "#FDF8F5", bg2: "#FFF5F7", card: "#FFFFFF",
    accent: "#D4788A", accent2: "#8C5F7A",
    accentPl: "rgba(212,120,138,.12)",
    tx: "#2D1B2E", tx2: "#5A3D52",
    muted: "#A07A90", mutedLt: "#C4A8B8",
    bdr: "rgba(212,120,138,.18)", bdr2: "rgba(212,120,138,.28)",
    green: "#6AAF82", red: "#D47878", amber: "#C8986A",
    headerBg: "linear-gradient(160deg,#FFF0F3 0%,#F9EAF6 50%,#EFF5F1 100%)",
    btnGrad: "linear-gradient(135deg,#D4788A,#8C5F7A)",
    fontTitle: "'Tenor Sans',serif",
    fontBody: "'Nunito',sans-serif",
    cardRadius: "18px", btnRadius: "22px",
    shadow: "0 3px 16px rgba(212,120,138,.1)",
  },
  // 🌑 DARK — тёмный люкс
  dark: {
    name: "🌑 Люкс",
    bg: "#0D0D0D", bg2: "#141414", card: "#1A1A1A",
    accent: "#C9A84C", accent2: "#8B6914",
    accentPl: "rgba(201,168,76,.12)",
    tx: "#F0EAD6", tx2: "#C8B89A",
    muted: "#6B6050", mutedLt: "#8B7860",
    bdr: "rgba(201,168,76,.18)", bdr2: "rgba(201,168,76,.32)",
    green: "#5A9E6F", red: "#C46060", amber: "#C9A84C",
    headerBg: "linear-gradient(160deg,#1A1205 0%,#0D0D0D 100%)",
    btnGrad: "linear-gradient(135deg,#C9A84C,#8B6914)",
    fontTitle: "'Josefin Sans',sans-serif",
    fontBody: "'Raleway',sans-serif",
    cardRadius: "10px", btnRadius: "8px",
    shadow: "0 4px 20px rgba(0,0,0,.5)",
  },
  // 🍃 FRESH — яркий зелёный/минт
  fresh: {
    name: "🍃 Фреш",
    bg: "#F0FAF4", bg2: "#E8F7EE", card: "#FFFFFF",
    accent: "#2A9D5C", accent2: "#1A6E3F",
    accentPl: "rgba(42,157,92,.1)",
    tx: "#0D2B1A", tx2: "#1A4D2E",
    muted: "#5A8C6E", mutedLt: "#8AB89A",
    bdr: "rgba(42,157,92,.18)", bdr2: "rgba(42,157,92,.3)",
    green: "#2A9D5C", red: "#D45C5C", amber: "#E09B3A",
    headerBg: "linear-gradient(160deg,#D4F0E0 0%,#E8F7EE 50%,#F0FAF4 100%)",
    btnGrad: "linear-gradient(135deg,#2A9D5C,#1A6E3F)",
    fontTitle: "'Fredoka One',cursive",
    fontBody: "'Poppins',sans-serif",
    cardRadius: "24px", btnRadius: "30px",
    shadow: "0 4px 20px rgba(42,157,92,.1)",
  },
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const CITIES = ["חיפה – Хайфа","חריש – Хариш","ראשון לציון – Ришон-ле-Цион"];
const CITY_SHORT = {"חיפה – Хайфа":"Хайфа","חריש – Хариш":"Хариш","ראשון לציון – Ришон-ле-Цион":"Ришон"};
const CATEGORIES = [
  {id:"nail",    label:"💅 Маникюр & Педикюр"},
  {id:"cosmo",   label:"✨ Косметолог"},
  {id:"hair",    label:"💇 Парикмахер"},
  {id:"brow",    label:"🪄 Брови & Ресницы"},
  {id:"massage", label:"🌿 Массаж"},
];
const ALL_SERVICES = {
  nail:    ["Маникюр классический","Маникюр с гель-лаком","Педикюр классический","Педикюр с гель-лаком","Наращивание ногтей","Нейл-арт","Маникюр + Педикюр"],
  cosmo:   ["Чистка лица","Пилинг","Мезотерапия","Биоревитализация","Ботокс","Контурная пластика","Уход лица"],
  hair:    ["Стрижка женская","Стрижка мужская","Окрашивание","Мелирование","Кератин","Укладка","Ботокс волос"],
  brow:    ["Коррекция бровей","Окраска бровей","Ламинирование бровей","Наращивание ресниц","Ламинирование ресниц","Перманентный макияж"],
  massage: ["Расслабляющий","Антицеллюлитный","Лимфодренажный","Тайский","Массаж лица","Стоун-терапия"],
};
const MASTER_COLORS = ["#D4788A","#8C5F7A","#7A9E8A","#C8986A","#7A8EC8","#C87A9E","#9EC87A"];

function genSlots(customHours = null) {
  const s = {}; const t = new Date();
  const defaultHrs = ["9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00"];
  for (let i = 0; i < 28; i++) {
    const d = new Date(t); d.setDate(d.getDate() + i);
    if (d.getDay() === 5 || d.getDay() === 6) continue;
    const key = fd(d);
    const hrs = customHours || defaultHrs;
    const booked = hrs.filter(() => Math.random() < .25);
    s[key] = { hrs, booked, blocked: false };
  }
  return s;
}

const SEED_MASTERS = [
  { id:"sm1", name:"Нета Коэн", avatar:"נ", city:"חיפה – Хайфа", district:"Кармель", category:"nail",
    bio:"Мастер маникюра и педикюра с 8-летним опытом.", workStart:"9:00", workEnd:"19:00",
    services:ALL_SERVICES.nail.slice(0,5), prices:Object.fromEntries(ALL_SERVICES.nail.slice(0,5).map((s,i)=>[s,80+i*20])),
    rating:4.9, reviews:213, phone:"+972 52 111 2233", whatsapp:"97252111223", color:MASTER_COLORS[0],
    approved:true, slots:genSlots(), bookings:[] },
  { id:"sm2", name:"Лиора Бен-Давид", avatar:"ל", city:"חיפה – Хайфа", district:"Центр", category:"cosmo",
    bio:"Косметолог-эстетист. Омолаживающие процедуры.", workStart:"10:00", workEnd:"18:00",
    services:ALL_SERVICES.cosmo.slice(0,5), prices:Object.fromEntries(ALL_SERVICES.cosmo.slice(0,5).map((s,i)=>[s,150+i*50])),
    rating:5.0, reviews:98, phone:"+972 54 222 3344", whatsapp:"97254222334", color:MASTER_COLORS[1],
    approved:true, slots:genSlots(), bookings:[] },
  { id:"sm3", name:"Даниэль Леви", avatar:"ד", city:"חיפה – Хайפа", district:"Хадар", category:"hair",
    bio:"Парикмахер-колорист. Стажировка в Милане.", workStart:"9:00", workEnd:"20:00",
    services:ALL_SERVICES.hair, prices:Object.fromEntries(ALL_SERVICES.hair.map((s,i)=>[s,120+i*40])),
    rating:4.8, reviews:341, phone:"+972 50 333 4455", whatsapp:"97250333445", color:MASTER_COLORS[2],
    approved:true, slots:genSlots(), bookings:[] },
  { id:"sm4", name:"Шира Азулай", avatar:"ש", city:"חריש – Хариш", district:"Хариш", category:"brow",
    bio:"Мастер бровей и ресниц.", workStart:"10:00", workEnd:"17:00",
    services:ALL_SERVICES.brow, prices:Object.fromEntries(ALL_SERVICES.brow.map((s,i)=>[s,90+i*30])),
    rating:4.7, reviews:156, phone:"+972 53 444 5566", whatsapp:"97253444556", color:MASTER_COLORS[3],
    approved:true, slots:genSlots(), bookings:[] },
  { id:"sm5", name:"Яэль Перец", avatar:"י", city:"ראשון לציון – Ришон-ле-Цион", district:"Центр", category:"nail",
    bio:"Нейл-дизайнер. Авторские работы.", workStart:"9:00", workEnd:"19:00",
    services:ALL_SERVICES.nail, prices:Object.fromEntries(ALL_SERVICES.nail.map((s,i)=>[s,100+i*25])),
    rating:4.9, reviews:189, phone:"+972 55 555 6677", whatsapp:"97255555667", color:MASTER_COLORS[4],
    approved:true, slots:genSlots(), bookings:[] },
];

function fd(d){return`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;}
const today=()=>fd(new Date());
const MGEN=["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
const MNAMES=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
function fmtLong(s){const d=new Date(s+"T12:00:00");const dn=["Вс","Пн","Вт","Ср","Чт","Пт","Сб"];return`${dn[d.getDay()]}, ${d.getDate()} ${MGEN[d.getMonth()]}`;}
function ls(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d;}catch{return d;}}
function lsSave(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch{}}
function catLabel(id){return CATEGORIES.find(c=>c.id===id)?.label||id;}
function getAvail(m,dStr){const sl=m.slots?.[dStr];if(!sl||sl.blocked)return[];return sl.hrs.filter(h=>!sl.booked.includes(h));}

const TIME_OPTIONS = ["8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00"];

/* ─────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────── */
export default function App() {
  const [theme, setTheme]     = useState(()=>ls("il_theme","blush"));
  const [masters,setMasters]  = useState(()=>ls("il_masters",SEED_MASTERS));
  const [users,setUsers]      = useState(()=>ls("il_users",[]));
  const [me,setMe]            = useState(()=>ls("il_me",null));
  const [screen,setScreen]    = useState("home");
  const [selMaster,setSelM]   = useState(null);
  const [booking,setBooking]  = useState(null);
  const [toast,setToast]      = useState(null);
  const [cityF,setCityF]      = useState("");
  const [catF,setCatF]        = useState("");
  const [qF,setQF]            = useState("");

  const T = THEMES[theme];

  useEffect(()=>{lsSave("il_masters",masters);},[masters]);
  useEffect(()=>{lsSave("il_users",users);},[users]);
  useEffect(()=>{lsSave("il_me",me);},[me]);
  useEffect(()=>{lsSave("il_theme",theme);},[theme]);

  const showToast=(msg,type="ok")=>{setToast({msg,type});setTimeout(()=>setToast(null),3000);};
  const logout=()=>{setMe(null);lsSave("il_me",null);setScreen("home");showToast("Вы вышли");};

  const activeMasters=masters.filter(m=>m.approved);
  const filtered=activeMasters.filter(m=>{
    const q=qF.toLowerCase();
    return(!cityF||m.city===cityF)&&(!catF||m.category===catF)&&
      (!q||m.name.toLowerCase().includes(q)||m.district.toLowerCase().includes(q)||m.services.some(s=>s.toLowerCase().includes(q)));
  });

  const openMaster=(m)=>{setSelM(m);setScreen("master");};

  const saveBooking=(b)=>{
    setMasters(prev=>prev.map(m=>{
      if(m.id!==b.masterId)return m;
      const slots={...m.slots};
      if(slots[b.date])slots[b.date]={...slots[b.date],booked:[...slots[b.date].booked,b.time]};
      return{...m,slots,bookings:[...(m.bookings||[]),b]};
    }));
    setBooking(b);setScreen("success");
  };

  const updateMaster=(id,upd)=>{
    setMasters(prev=>prev.map(m=>m.id===id?{...m,...upd}:m));
    if(me?.id===id){const nm={...me,...upd};setMe(nm);lsSave("il_me",nm);}
    setUsers(prev=>prev.map(u=>u.id===id?{...u,...upd}:u));
  };

  const approveMaster=(id)=>{updateMaster(id,{approved:true});showToast("Мастер одобрен ✅");};
  const deleteMaster=(id)=>{
    setMasters(prev=>prev.filter(m=>m.id!==id));
    setUsers(prev=>prev.filter(u=>u.id!==id));
    if(me?.id===id){setMe(null);lsSave("il_me",null);setScreen("home");}
    showToast("Мастер удалён");
  };

  const ctx = { T, theme, setTheme, masters, setMasters, users, setUsers, me, setMe,
    screen, setScreen, selMaster, setSelM, booking, setBooking,
    cityF, setCityF, catF, setCatF, qF, setQF,
    filtered, activeMasters, openMaster, saveBooking, updateMaster,
    approveMaster, deleteMaster, showToast, logout };

  return (
    <div style={{height:"100dvh",display:"flex",flexDirection:"column",background:T.bg,maxWidth:480,margin:"0 auto",overflow:"hidden",position:"relative"}}>
      <GS theme={theme}/>
      {!["auth","success","admin"].includes(screen)&&<Header ctx={ctx}/>}
      <div style={{flex:1,overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch"}}>
        {screen==="home"    &&<HomeScreen ctx={ctx}/>}
        {screen==="explore" &&<ExploreScreen ctx={ctx}/>}
        {screen==="master"  &&selMaster&&<MasterScreen ctx={ctx} master={masters.find(m=>m.id===selMaster.id)||selMaster}/>}
        {screen==="success" &&booking&&<SuccessScreen ctx={ctx}/>}
        {screen==="auth"    &&<AuthScreen ctx={ctx}/>}
        {screen==="dash"    &&me&&<Dashboard ctx={ctx}/>}
        {screen==="admin"   &&<AdminPanel ctx={ctx}/>}
      </div>
      {toast&&<Toast msg={toast.msg} type={toast.type} T={T}/>}
    </div>
  );
}

/* ─────────────────────────────────────────────
   HEADER
───────────────────────────────────────────── */
function Header({ctx}){
  const {T,screen,setScreen,me,logout}=ctx;
  const isHome=screen==="home";
  return(
    <div style={{background:T.card,borderBottom:`1px solid ${T.bdr}`,padding:"13px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,boxShadow:T.shadow}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        {!isHome&&<button onClick={()=>setScreen("home")} style={{background:"none",border:"none",fontSize:18,color:T.muted,padding:"2px 6px 2px 0"}}>←</button>}
        <div onClick={()=>setScreen("home")} style={{cursor:"pointer"}}>
          <div style={{fontFamily:T.fontTitle,fontSize:17,color:T.accent,letterSpacing:1}}>✦ יופי ישראל</div>
          <div style={{fontSize:9,color:T.mutedLt,letterSpacing:2.5,textTransform:"uppercase",marginTop:1}}>Красота Израиля</div>
        </div>
      </div>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        {me?.role==="admin"&&<button onClick={()=>setScreen("admin")} style={{background:T.accent2,border:"none",borderRadius:T.btnRadius,padding:"7px 12px",color:"#fff",fontSize:11,fontWeight:700}}>⚙️ Админ</button>}
        {me?(<>
          <button onClick={()=>setScreen("dash")} style={{display:"flex",alignItems:"center",gap:7,background:T.accentPl,border:`1px solid ${T.bdr}`,borderRadius:T.btnRadius,padding:"7px 12px 7px 8px",color:T.accent,fontSize:12,fontWeight:700}}>
            <span style={{width:22,height:22,borderRadius:"50%",background:T.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#fff"}}>{me.name[0]}</span>
            Кабинет
          </button>
          <button onClick={logout} style={{background:"none",border:`1px solid ${T.bdr}`,borderRadius:T.btnRadius,padding:"7px 10px",color:T.muted,fontSize:11}}>Выйти</button>
        </>):(
          <button onClick={()=>setScreen("auth")} style={{background:T.btnGrad,border:"none",borderRadius:T.btnRadius,padding:"9px 16px",color:"#fff",fontSize:12,fontWeight:700,boxShadow:`0 3px 14px ${T.accent}44`}}>
            Войти
          </button>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HOME
───────────────────────────────────────────── */
function HomeScreen({ctx}){
  const {T,setScreen,setCityF,setCatF,activeMasters,openMaster}=ctx;
  const top=[...activeMasters].sort((a,b)=>b.rating-a.rating).slice(0,4);
  return(
    <div className="au" style={{paddingBottom:32}}>
      {/* Hero */}
      <div style={{background:T.headerBg,padding:"32px 22px 28px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-30,right:-30,width:160,height:160,borderRadius:"50%",background:`${T.accent}10`}}/>
        <div style={{position:"absolute",top:12,right:18,fontSize:48,opacity:.15,animation:"float 4s ease-in-out infinite"}}>🌸</div>
        <div style={{position:"relative"}}>
          <div style={{fontFamily:T.fontTitle,fontSize:12,color:T.accent,letterSpacing:3,textTransform:"uppercase",marginBottom:10}}>✦ Добро пожаловать ✦</div>
          <div style={{fontFamily:T.fontTitle,fontSize:28,lineHeight:1.25,color:T.tx,marginBottom:8}}>
            Найдите своего<br/><span style={{color:T.accent}}>мастера красоты</span><br/>в Израиле
          </div>
          <div style={{fontSize:13,color:T.tx2,lineHeight:1.65,marginBottom:22,maxWidth:290}}>
            Маникюр, педикюр, косметолог, парикмахер — лучшие мастера в Хайфе, Харише и Ришоне
          </div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>setScreen("explore")} style={{background:T.btnGrad,border:"none",borderRadius:T.btnRadius,padding:"13px 22px",fontSize:14,fontWeight:700,color:"#fff",boxShadow:`0 4px 18px ${T.accent}44`}}>
              🔍 Найти мастера
            </button>
            <button onClick={()=>setScreen("auth")} style={{background:T.card,border:`1.5px solid ${T.bdr2}`,borderRadius:T.btnRadius,padding:"13px 18px",fontSize:13,fontWeight:600,color:T.accent}}>
              Я мастер →
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",background:T.card,borderBottom:`1px solid ${T.bdr}`}}>
        {[{n:activeMasters.length,l:"Мастеров"},{n:CITIES.length,l:"Города"},{n:activeMasters.reduce((s,m)=>s+(m.reviews||0),0),l:"Отзывов"}].map((s,i)=>(
          <div key={i} style={{padding:"14px 6px",textAlign:"center",borderRight:i<2?`1px solid ${T.bdr}`:""}}>
            <div style={{fontFamily:T.fontTitle,fontSize:22,color:T.accent}}>{s.n}</div>
            <div style={{fontSize:10,color:T.muted,textTransform:"uppercase",letterSpacing:1}}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div style={{padding:"20px 18px 4px"}}>
        <ST T={T}>Услуги</ST>
        <div style={{display:"flex",gap:9,overflowX:"auto",paddingBottom:6}}>
          {CATEGORIES.map(c=>(
            <button key={c.id} onClick={()=>{setCatF(c.id);setScreen("explore");}}
              style={{flexShrink:0,background:T.card,border:`1.5px solid ${T.bdr}`,borderRadius:T.cardRadius,padding:"12px 14px",textAlign:"center",minWidth:90,boxShadow:T.shadow}}>
              <div style={{fontSize:22,marginBottom:4}}>{c.label.split(" ")[0]}</div>
              <div style={{fontSize:11,fontWeight:600,color:T.tx2,lineHeight:1.2}}>{c.label.substring(2)}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Cities */}
      <div style={{padding:"16px 18px 4px"}}>
        <ST T={T}>По городу</ST>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {CITIES.map(city=>{
            const cnt=activeMasters.filter(m=>m.city===city).length;
            return(
              <button key={city} onClick={()=>{setCityF(city);setScreen("explore");}}
                style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:T.card,border:`1.5px solid ${T.bdr}`,borderRadius:T.cardRadius,padding:"14px 18px",boxShadow:T.shadow}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <span style={{fontSize:22}}>📍</span>
                  <div style={{textAlign:"left"}}>
                    <div style={{fontWeight:700,fontSize:15,color:T.tx}}>{CITY_SHORT[city]}</div>
                    <div style={{fontSize:11,color:T.muted}}>{city.split("–")[0].trim()}</div>
                  </div>
                </div>
                <span style={{background:T.accentPl,color:T.accent,fontSize:12,fontWeight:700,borderRadius:"20px",padding:"4px 12px",border:`1px solid ${T.bdr}`}}>{cnt} мастеров</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Top */}
      <div style={{padding:"20px 18px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <ST T={T} mb={0}>Топ мастера</ST>
          <button onClick={()=>setScreen("explore")} style={{background:"none",border:"none",fontSize:12,color:T.accent,fontWeight:700}}>Все →</button>
        </div>
        {top.map(m=><MiniCard key={m.id} m={m} T={T} onClick={()=>openMaster(m)}/>)}
      </div>

      {/* CTA */}
      <div style={{margin:"0 18px 24px",background:T.headerBg,border:`1.5px solid ${T.bdr}`,borderRadius:T.cardRadius,padding:"20px",textAlign:"center"}}>
        <div style={{fontSize:28,marginBottom:8}}>🌸</div>
        <div style={{fontFamily:T.fontTitle,fontSize:18,color:T.tx,marginBottom:6}}>Вы мастер красоты?</div>
        <div style={{fontSize:13,color:T.tx2,lineHeight:1.6,marginBottom:14}}>Создайте профиль бесплатно и начните принимать клиентов уже сегодня!</div>
        <button onClick={()=>setScreen("auth")} style={{background:T.btnGrad,border:"none",borderRadius:T.btnRadius,padding:"12px 24px",fontSize:13,fontWeight:700,color:"#fff",boxShadow:`0 4px 16px ${T.accent}33`}}>
          Зарегистрироваться бесплатно
        </button>
      </div>
    </div>
  );
}

function ST({T,children,mb=14,style={}}){
  return <div style={{fontFamily:T.fontTitle,fontSize:16,color:T.tx,marginBottom:mb,...style}}>{children}</div>;
}

function MiniCard({m,T,onClick}){
  return(
    <div onClick={onClick} style={{background:T.card,border:`1.5px solid ${T.bdr}`,borderRadius:T.cardRadius,padding:"14px 16px",display:"flex",gap:13,alignItems:"center",cursor:"pointer",boxShadow:T.shadow,marginBottom:10}}>
      <div style={{width:50,height:50,borderRadius:T.cardRadius,background:m.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:700,color:"#fff",flexShrink:0,fontFamily:T.fontTitle}}>{m.avatar}</div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontWeight:700,fontSize:15,color:T.tx}}>{m.name}</div>
        <div style={{fontSize:11,color:T.muted,marginTop:2}}>📍 {CITY_SHORT[m.city]} · {m.district}</div>
        <div style={{fontSize:11,color:T.mutedLt,marginTop:2}}>{catLabel(m.category)}</div>
      </div>
      <div style={{textAlign:"right",flexShrink:0}}>
        <div style={{fontSize:15,fontWeight:700,color:T.accent}}>★{m.rating}</div>
        <div style={{fontSize:10,color:T.muted}}>{m.reviews} отз.</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   EXPLORE
───────────────────────────────────────────── */
function ExploreScreen({ctx}){
  const {T,filtered,cityF,setCityF,catF,setCatF,qF,setQF,openMaster}=ctx;
  return(
    <div className="au" style={{paddingBottom:24}}>
      <div style={{padding:"14px 18px",background:T.card,borderBottom:`1px solid ${T.bdr}`,position:"sticky",top:0,zIndex:5,boxShadow:T.shadow}}>
        <div style={{position:"relative",marginBottom:10}}>
          <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",fontSize:15,pointerEvents:"none"}}>🔍</span>
          <input value={qF} onChange={e=>setQF(e.target.value)} placeholder="Имя, услуга, район..."
            style={{width:"100%",background:T.bg2,border:`1.5px solid ${T.bdr}`,borderRadius:"22px",padding:"11px 12px 11px 40px",color:T.tx,fontSize:14,outline:"none"}}/>
        </div>
        <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:2,marginBottom:6}}>
          <Pill T={T} label="Все города" active={!cityF} onClick={()=>setCityF("")}/>
          {CITIES.map(c=><Pill key={c} T={T} label={CITY_SHORT[c]} active={cityF===c} onClick={()=>setCityF(cityF===c?"":c)}/>)}
        </div>
        <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:2}}>
          <Pill T={T} label="Все услуги" active={!catF} onClick={()=>setCatF("")}/>
          {CATEGORIES.map(c=><Pill key={c.id} T={T} label={c.label} active={catF===c.id} onClick={()=>setCatF(catF===c.id?"":c.id)}/>)}
        </div>
      </div>
      <div style={{padding:"14px 18px"}}>
        <div style={{fontSize:11,color:T.muted,marginBottom:12}}>Найдено: <strong style={{color:T.tx}}>{filtered.length}</strong> мастеров</div>
        {filtered.length===0?(
          <div style={{textAlign:"center",padding:"60px 20px",color:T.muted}}>
            <div style={{fontSize:48,marginBottom:12}}>🌸</div>
            <div style={{fontSize:15}}>Мастера не найдены</div>
          </div>
        ):filtered.map(m=><FullCard key={m.id} m={m} T={T} onClick={()=>openMaster(m)}/>)}
      </div>
    </div>
  );
}

function Pill({T,label,active,onClick}){
  return(
    <button onClick={onClick} style={{flexShrink:0,padding:"7px 14px",borderRadius:"22px",border:`1.5px solid ${active?T.accent:T.bdr}`,background:active?T.accentPl:"transparent",color:active?T.accent:T.muted,fontSize:12,fontWeight:active?700:500,whiteSpace:"nowrap"}}>
      {label}
    </button>
  );
}

function FullCard({m,T,onClick}){
  const minP=Math.min(...Object.values(m.prices));
  return(
    <div onClick={onClick} style={{background:T.card,border:`1.5px solid ${T.bdr}`,borderRadius:T.cardRadius,padding:"16px",marginBottom:12,cursor:"pointer",boxShadow:T.shadow}}>
      <div style={{display:"flex",gap:14,marginBottom:11}}>
        <div style={{width:58,height:58,borderRadius:T.cardRadius,background:m.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:700,color:"#fff",flexShrink:0,fontFamily:T.fontTitle,position:"relative"}}>
          {m.avatar}
          <div style={{position:"absolute",bottom:-2,right:-2,width:14,height:14,borderRadius:"50%",background:T.green,border:`2px solid ${T.card}`}}/>
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontWeight:700,fontSize:16,color:T.tx}}>{m.name}</div>
          <div style={{fontSize:11,color:T.muted,marginTop:2}}>📍 {CITY_SHORT[m.city]} · {m.district}</div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}>
            <span style={{fontSize:13,color:T.accent,fontWeight:700}}>★ {m.rating}</span>
            <span style={{fontSize:11,color:T.muted}}>({m.reviews} отзывов)</span>
            <span style={{fontSize:10,background:T.accentPl,color:T.accent,borderRadius:"10px",padding:"2px 8px",border:`1px solid ${T.bdr}`}}>{catLabel(m.category)}</span>
          </div>
        </div>
      </div>
      <div style={{fontSize:13,color:T.tx2,lineHeight:1.6,marginBottom:10}}>{m.bio}</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12}}>
        {m.services.slice(0,3).map(s=><span key={s} style={{fontSize:11,background:T.bg2,border:`1px solid ${T.bdr}`,borderRadius:"20px",padding:"4px 10px",color:T.tx2}}>{s}</span>)}
        {m.services.length>3&&<span style={{fontSize:11,color:T.muted}}>+{m.services.length-3}</span>}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontSize:13,color:T.muted}}>от <span style={{color:T.accent,fontWeight:700,fontSize:16}}>₪{minP}</span></div>
        <button style={{background:T.btnGrad,border:"none",borderRadius:T.btnRadius,padding:"9px 18px",fontSize:13,fontWeight:700,color:"#fff",boxShadow:`0 3px 10px ${T.accent}33`}}>
          Записаться →
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MASTER SCREEN + BOOKING
───────────────────────────────────────────── */
function MasterScreen({ctx,master}){
  const {T,saveBooking,showToast}=ctx;
  const [tab,setTab]=useState("book");
  const [calY,setCalY]=useState(()=>new Date().getFullYear());
  const [calM,setCalM]=useState(()=>new Date().getMonth());
  const [selDate,setSelDate]=useState(null);
  const [selSlot,setSelSlot]=useState(null);
  const [step,setStep]=useState("cal");
  const [form,setForm]=useState({first:"",last:"",phone:"",city:"",service:""});
  const [errs,setErrs]=useState({});

  const prevM=()=>{if(calM===0){setCalY(y=>y-1);setCalM(11);}else setCalM(m=>m-1);};
  const nextM=()=>{if(calM===11){setCalY(y=>y+1);setCalM(0);}else setCalM(m=>m+1);};
  const fdo=new Date(calY,calM,1).getDay();
  const offset=fdo===0?6:fdo-1;
  const dim=new Date(calY,calM+1,0).getDate();

  const submit=()=>{
    const e={};
    if(!form.first)e.first="Введите имя";if(!form.last)e.last="Введите фамилию";
    if(!form.phone)e.phone="Введите телефон";if(!form.city)e.city="Введите город";
    if(!form.service)e.service="Выберите услугу";
    if(!selDate||!selSlot){showToast("Выберите дату и время","err");return;}
    if(Object.keys(e).length){setErrs(e);return;}
    saveBooking({id:Date.now(),masterId:master.id,masterName:master.name,masterWA:master.whatsapp,masterPhone:master.phone,date:selDate,time:selSlot,service:form.service,clientName:form.first+" "+form.last,clientPhone:form.phone,clientCity:form.city,createdAt:new Date().toISOString()});
  };

  return(
    <div className="au" style={{paddingBottom:32}}>
      {/* Hero */}
      <div style={{background:T.headerBg,padding:"22px 20px 18px",borderBottom:`1px solid ${T.bdr}`}}>
        <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
          <div style={{width:68,height:68,borderRadius:T.cardRadius,background:master.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,fontWeight:700,color:"#fff",flexShrink:0,fontFamily:T.fontTitle,boxShadow:`0 6px 20px ${master.color}55`}}>{master.avatar}</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:T.fontTitle,fontSize:21,color:T.tx}}>{master.name}</div>
            <div style={{fontSize:11,color:T.muted,marginTop:3}}>📍 {CITY_SHORT[master.city]} · {master.district}</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:7}}>
              <span style={{fontSize:12,background:T.accentPl,color:T.accent,borderRadius:"10px",padding:"3px 10px",border:`1px solid ${T.bdr}`,fontWeight:600}}>★ {master.rating}</span>
              <span style={{fontSize:12,color:T.muted}}>{master.reviews} отзывов</span>
              <span style={{fontSize:11,background:`${T.green}15`,color:T.green,borderRadius:"10px",padding:"3px 10px",border:`1px solid ${T.green}30`}}>● Принимает</span>
            </div>
          </div>
        </div>
        <div style={{fontSize:13,color:T.tx2,lineHeight:1.65,marginTop:14}}>{master.bio}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:12}}>
          {master.services.map(s=><span key={s} style={{fontSize:11,background:T.card,border:`1px solid ${T.bdr}`,borderRadius:"20px",padding:"4px 10px",color:T.tx2}}>{s}</span>)}
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",background:T.card,borderBottom:`1px solid ${T.bdr}`}}>
        {[["book","📅 Запись"],["info","💰 Прайс"]].map(([id,lbl])=>(
          <button key={id} onClick={()=>setTab(id)} style={{padding:"13px",background:"none",border:"none",borderBottom:`2.5px solid ${tab===id?T.accent:"transparent"}`,color:tab===id?T.accent:T.muted,fontSize:13,fontWeight:tab===id?700:500}}>
            {lbl}
          </button>
        ))}
      </div>

      <div style={{padding:"16px 18px"}}>
        {tab==="info"&&(
          <div className="af">
            <ST T={T}>Прайс-лист</ST>
            <div style={{background:T.card,border:`1px solid ${T.bdr}`,borderRadius:T.cardRadius,overflow:"hidden",marginBottom:16}}>
              {Object.entries(master.prices).map(([s,p],i,arr)=>(
                <div key={s} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 16px",borderBottom:i<arr.length-1?`1px solid ${T.bdr}`:""}}>
                  <span style={{fontSize:13,color:T.tx}}>{s}</span>
                  <span style={{fontWeight:700,color:T.accent,fontSize:16}}>₪{p}</span>
                </div>
              ))}
            </div>
            <a href={`https://wa.me/${master.whatsapp}`} target="_blank" rel="noreferrer"
              style={{display:"flex",alignItems:"center",gap:10,padding:"14px 16px",background:"rgba(37,211,102,.08)",border:"1px solid rgba(37,211,102,.2)",borderRadius:T.cardRadius,textDecoration:"none"}}>
              <span style={{fontSize:22}}>💬</span>
              <div>
                <div style={{fontSize:14,fontWeight:700,color:"#25a350"}}>WhatsApp · {master.phone}</div>
                <div style={{fontSize:11,color:T.muted}}>Написать напрямую</div>
              </div>
            </a>
          </div>
        )}

        {tab==="book"&&(
          <div className="af">
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",background:T.bg2,borderRadius:T.cardRadius,padding:4,marginBottom:16,border:`1px solid ${T.bdr}`}}>
              {[["cal","📅 Дата"],["form","✍️ Данные"]].map(([id,lbl])=>(
                <button key={id} onClick={()=>setStep(id)} style={{padding:"9px",borderRadius:T.cardRadius,border:"none",background:step===id?T.card:"transparent",color:step===id?T.accent:T.muted,fontSize:12,fontWeight:700,boxShadow:step===id?T.shadow:"none"}}>
                  {lbl}
                </button>
              ))}
            </div>

            {step==="cal"&&(
              <div className="af">
                <div style={{background:T.card,border:`1px solid ${T.bdr}`,borderRadius:T.cardRadius,padding:"16px",marginBottom:14,boxShadow:T.shadow}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                    <div style={{fontFamily:T.fontTitle,fontSize:17,color:T.tx}}>{MNAMES[calM]} {calY}</div>
                    <div style={{display:"flex",gap:6}}>
                      {[["◀",prevM],["▶",nextM]].map(([lbl,fn])=>(
                        <button key={lbl} onClick={fn} style={{width:32,height:32,borderRadius:T.cardRadius,background:T.bg2,border:`1px solid ${T.bdr}`,color:T.muted,fontSize:12}}>{lbl}</button>
                      ))}
                    </div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",marginBottom:4}}>
                    {["Пн","Вт","Ср","Чт","Пт","Сб","Вс"].map((d,i)=>(
                      <div key={d} style={{textAlign:"center",fontSize:10,fontWeight:600,color:i>=5?T.accent:T.muted,padding:"3px 0",textTransform:"uppercase"}}>{d}</div>
                    ))}
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2}}>
                    {Array(offset).fill(null).map((_,i)=><div key={i}/>)}
                    {Array(dim).fill(null).map((_,i)=>{
                      const d=i+1,date=new Date(calY,calM,d),dStr=fd(date);
                      const isFri=date.getDay()===5,isSat=date.getDay()===6;
                      const isPast=date<new Date(new Date().setHours(0,0,0,0));
                      const sl=master.slots?.[dStr];
                      const isBlocked=sl?.blocked;
                      const av=(!isFri&&!isSat&&!isPast&&!isBlocked)?getAvail(master,dStr).length:0;
                      const isSel=selDate===dStr,isToday=dStr===today();
                      return(
                        <div key={d} onClick={()=>{if(isFri||isSat||isPast||av===0||isBlocked)return;setSelDate(dStr);setSelSlot(null);}}
                          style={{aspectRatio:"1",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",borderRadius:T.cardRadius,cursor:(isFri||isSat||isPast||av===0||isBlocked)?"default":"pointer",background:isSel?T.accent:(isToday?T.accentPl:"transparent"),opacity:(isFri||isSat||isPast||isBlocked)?.3:1,transition:"all .12s",border:isToday&&!isSel?`1px solid ${T.bdr2}`:"1px solid transparent"}}>
                          <div style={{fontSize:12,fontWeight:isSel?700:500,color:isSel?"#fff":(isToday?T.accent:T.tx),lineHeight:1}}>{d}</div>
                          {!isFri&&!isSat&&!isPast&&<div style={{width:4,height:4,borderRadius:"50%",background:av>0&&!isBlocked?T.green:T.bdr,marginTop:2}}/>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {selDate&&(()=>{
                  const sl=master.slots?.[selDate];
                  const hrs=sl?.hrs||[];
                  const bkd=sl?.booked||[];
                  const avHrs=getAvail(master,selDate);
                  return(
                    <div className="af">
                      <div style={{fontWeight:600,fontSize:13,color:T.tx2,marginBottom:12}}>🗓 {fmtLong(selDate)}</div>
                      {avHrs.length===0?(
                        <div style={{textAlign:"center",padding:"20px",background:T.card,borderRadius:T.cardRadius,color:T.muted,border:`1px solid ${T.bdr}`}}>На этот день мест нет</div>
                      ):(
                        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9,marginBottom:14}}>
                          {hrs.map(h=>{
                            const isB=bkd.includes(h),isSel=selSlot===h;
                            return(
                              <button key={h} onClick={()=>!isB&&setSelSlot(h)} disabled={isB}
                                style={{padding:"11px 6px",borderRadius:T.cardRadius,border:`1.5px solid ${isSel?T.accent:(isB?T.bdr:`${T.green}55`)}`,background:isSel?T.accent:(isB?T.bg2:`${T.green}08`),color:isSel?"#fff":(isB?T.muted:T.tx),fontSize:14,fontWeight:isSel?700:500,opacity:isB?.4:1}}>
                                {h}
                                <div style={{fontSize:9,marginTop:2,color:isSel?"rgba(255,255,255,.7)":(isB?T.mutedLt:T.green)}}>{isB?"Занято":"Свободно"}</div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                      {selSlot&&(
                        <button onClick={()=>setStep("form")} style={{width:"100%",padding:"14px",background:T.btnGrad,border:"none",borderRadius:T.btnRadius,fontSize:15,fontWeight:700,color:"#fff",boxShadow:`0 4px 16px ${T.accent}33`}}>
                          Перейти к форме →
                        </button>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            {step==="form"&&(
              <div className="af">
                {selDate&&selSlot?(
                  <div style={{background:T.card,border:`1.5px solid ${T.bdr2}`,borderRadius:T.cardRadius,padding:"14px 16px",marginBottom:20,boxShadow:T.shadow}}>
                    <div style={{fontSize:10,color:T.accent,textTransform:"uppercase",letterSpacing:2,marginBottom:6}}>Ваша запись</div>
                    <div style={{fontFamily:T.fontTitle,fontSize:17,color:T.tx}}>{fmtLong(selDate)}</div>
                    <div style={{fontSize:13,color:T.tx2,marginTop:3}}>⏰ {selSlot} · {master.name}</div>
                    <button onClick={()=>setStep("cal")} style={{background:"none",border:"none",fontSize:12,color:T.accent,marginTop:8,padding:0,fontWeight:600}}>← Изменить время</button>
                  </div>
                ):(
                  <div onClick={()=>setStep("cal")} style={{background:T.accentPl,border:`1px solid ${T.bdr2}`,borderRadius:T.cardRadius,padding:"12px 14px",marginBottom:18,fontSize:13,color:T.accent,cursor:"pointer"}}>
                    ⚠️ Сначала выберите дату и время →
                  </div>
                )}
                {[{id:"first",lbl:"Имя",ph:"Ваше имя"},{id:"last",lbl:"Фамилия",ph:"Ваша фамилия"},{id:"phone",lbl:"Телефон",ph:"+972 50 ..."},{id:"city",lbl:"Город",ph:"Хайфа, Хариш..."}].map(f=>(
                  <FG key={f.id} T={T} label={f.lbl} error={errs[f.id]} req>
                    <input value={form[f.id]} onChange={e=>{setForm({...form,[f.id]:e.target.value});setErrs({...errs,[f.id]:""}); }} placeholder={f.ph}
                      style={{width:"100%",...IS(T,!!errs[f.id])}}/>
                  </FG>
                ))}
                <FG T={T} label="Услуга" error={errs.service} req>
                  <select value={form.service} onChange={e=>{setForm({...form,service:e.target.value});setErrs({...errs,service:""});}}
                    style={{width:"100%",...IS(T,!!errs.service),WebkitAppearance:"none",color:form.service?T.tx:T.muted}}>
                    <option value="">— Выберите услугу —</option>
                    {master.services.map(s=><option key={s} value={s}>{s} — ₪{master.prices[s]||"—"}</option>)}
                  </select>
                </FG>
                <button onClick={submit} style={{width:"100%",padding:"16px",background:T.btnGrad,border:"none",borderRadius:T.btnRadius,fontSize:16,fontWeight:700,color:"#fff",boxShadow:`0 5px 18px ${T.accent}35`,marginTop:4}}>
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

function FG({T,label,children,error,req}){
  return(
    <div style={{marginBottom:14}}>
      <div style={{fontSize:11,fontWeight:700,color:error?T.red:T.muted,textTransform:"uppercase",letterSpacing:.8,marginBottom:7}}>
        {label} {req&&<span style={{color:T.accent}}>✱</span>}
        {error&&<span style={{textTransform:"none",fontSize:10,marginLeft:6,color:T.red}}>{error}</span>}
      </div>
      {children}
    </div>
  );
}
const IS=(T,err)=>({background:err?`${T.red}10`:T.bg2,border:`1.5px solid ${err?T.red:T.bdr}`,borderRadius:T.cardRadius,padding:"13px 16px",color:T.tx,fontSize:15,outline:"none"});

/* ─────────────────────────────────────────────
   SUCCESS
───────────────────────────────────────────── */
function SuccessScreen({ctx}){
  const {T,booking,masters,setScreen}=ctx;
  const master=masters.find(m=>m.id===booking.masterId);
  const waMsg=encodeURIComponent(`שלום! שמי ${booking.clientName}.\nנרשמתי לתור ל${fmtLong(booking.date)} בשעה ${booking.time}.\nשירות: ${booking.service}\nטלפון: ${booking.clientPhone}\nברצוני לשנות/לבטל.`);
  return(
    <div className="au" style={{padding:"40px 22px",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",minHeight:"100%",background:T.headerBg}}>
      <div className="ap" style={{width:90,height:90,borderRadius:"50%",background:T.btnGrad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:38,marginBottom:22,boxShadow:`0 14px 40px ${T.accent}33`}}>💅</div>
      <div style={{fontFamily:T.fontTitle,fontSize:28,color:T.tx,marginBottom:8,lineHeight:1.2}}>Запись принята!</div>
      <div style={{fontSize:14,color:T.tx2,lineHeight:1.7,marginBottom:26,maxWidth:290}}>Спасибо! Ждём вас в нашей студии ✨</div>
      <div style={{background:T.card,border:`1px solid ${T.bdr}`,borderRadius:T.cardRadius,padding:"18px",width:"100%",marginBottom:18,textAlign:"left",boxShadow:T.shadow}}>
        {[["👤",booking.clientName],["📞",booking.clientPhone],["📍",booking.clientCity],["💅",booking.masterName],["🗓",fmtLong(booking.date)],["⏰",booking.time],["✂️",booking.service]].map(([k,v])=>(
          <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${T.bdr}`,fontSize:13}}>
            <span style={{color:T.muted}}>{k}</span><span style={{fontWeight:600,color:T.tx}}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{background:T.accentPl,border:`1px solid ${T.bdr}`,borderRadius:T.cardRadius,padding:"14px 16px",width:"100%",marginBottom:16,textAlign:"left"}}>
        <div style={{fontSize:10,color:T.accent,textTransform:"uppercase",letterSpacing:2,marginBottom:6}}>💡 Важно</div>
        <div style={{fontSize:13,color:T.tx2,lineHeight:1.65}}>Если что-то изменилось — сообщите мастеру заранее через WhatsApp 🙏</div>
      </div>
      <a href={`https://wa.me/${booking.masterWA}?text=${waMsg}`} target="_blank" rel="noreferrer"
        style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,width:"100%",padding:"16px",background:"#25D366",borderRadius:T.btnRadius,textDecoration:"none",marginBottom:12,boxShadow:"0 6px 20px rgba(37,211,102,.25)"}}>
        <span style={{fontSize:22}}>💬</span>
        <div style={{textAlign:"left"}}>
          <div style={{fontSize:15,fontWeight:700,color:"#fff"}}>Написать мастеру в WhatsApp</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,.8)",marginTop:1}}>{booking.masterPhone} · отменить или перенести</div>
        </div>
      </a>
      <button onClick={()=>setScreen("explore")} style={{width:"100%",padding:"13px",background:"transparent",border:`1.5px solid ${T.bdr}`,borderRadius:T.btnRadius,fontSize:14,color:T.muted,fontWeight:500}}>
        🔍 Найти другого мастера
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   AUTH
───────────────────────────────────────────── */
function AuthScreen({ctx}){
  const {T,setMe,users,setUsers,masters,setMasters,setScreen,showToast}=ctx;
  const [mode,setMode]=useState("login");
  const [form,setForm]=useState({name:"",email:"",password:"",phone:"",whatsapp:"",city:CITIES[0],district:"",bio:"",category:"nail",services:[],prices:{}});
  const [errs,setErrs]=useState({});

  const login=()=>{
    if(form.email==="admin@beauty.il"&&form.password==="admin123"){
      const adm={id:"admin",name:"Администратор",email:"admin@beauty.il",role:"admin"};
      setMe(adm);lsSave("il_me",adm);showToast("Добро пожаловать, Admin! 👑");setScreen("home");return;
    }
    const u=users.find(u=>u.email===form.email&&u.password===form.password);
    if(!u){setErrs({email:"Неверный email или пароль"});return;}
    setMe(u);lsSave("il_me",u);showToast("Добро пожаловать, "+u.name+"! 🌸");setScreen("dash");
  };

  const register=()=>{
    const e={};
    if(!form.name)e.name="Введите имя";
    if(!form.email||!form.email.includes("@"))e.email="Некорректный email";
    if(form.password.length<6)e.password="Минимум 6 символов";
    if(!form.phone)e.phone="Введите телефон";
    if(!form.district)e.district="Введите район";
    if(form.services.length===0)e.services="Выберите услуги";
    if(users.find(u=>u.email===form.email)){e.email="Email уже зарегистрирован";setErrs(e);return;}
    if(Object.keys(e).length){setErrs(e);return;}
    const prices=Object.fromEntries(form.services.map(s=>[s,form.prices[s]||100]));
    const newM={
      id:"u"+Date.now(),name:form.name,email:form.email,password:form.password,
      city:form.city,district:form.district,bio:form.bio||"Профессиональный мастер.",
      phone:form.phone,whatsapp:form.whatsapp||form.phone.replace(/\D/g,""),
      category:form.category,services:form.services,prices,workStart:"9:00",workEnd:"19:00",
      avatar:form.name.trim().split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()||"М",
      color:MASTER_COLORS[Math.floor(Math.random()*MASTER_COLORS.length)],
      rating:5.0,reviews:0,slots:genSlots(),bookings:[],approved:false,role:"master",
    };
    setMasters(prev=>[...prev,newM]);setUsers(prev=>[...prev,newM]);
    setMe(newM);lsSave("il_me",newM);
    showToast("Регистрация отправлена! Ожидайте одобрения 🌸");setScreen("dash");
  };

  const toggleSvc=(s)=>setForm(prev=>({...prev,services:prev.services.includes(s)?prev.services.filter(x=>x!==s):[...prev.services,s]}));

  return(
    <div className="au" style={{paddingBottom:40}}>
      <div style={{background:T.headerBg,padding:"28px 22px 20px",textAlign:"center",borderBottom:`1px solid ${T.bdr}`,position:"relative"}}>
        <div style={{fontSize:36,marginBottom:8}}>🌸</div>
        <div style={{fontFamily:T.fontTitle,fontSize:24,color:T.tx,marginBottom:4}}>{mode==="login"?"Добро пожаловать":"Регистрация мастера"}</div>
        <div style={{fontSize:13,color:T.muted}}>{mode==="login"?"Войдите в личный кабинет":"Создайте профиль бесплатно"}</div>
        <button onClick={()=>setScreen("home")} style={{position:"absolute",top:18,left:18,background:"none",border:`1px solid ${T.bdr}`,borderRadius:T.btnRadius,padding:"8px 12px",color:T.muted,fontSize:12}}>← Назад</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",background:T.bg2,padding:4,borderBottom:`1px solid ${T.bdr}`}}>
        {[["login","Войти"],["register","Регистрация"]].map(([id,lbl])=>(
          <button key={id} onClick={()=>{setMode(id);setErrs({});}} style={{padding:"11px",border:"none",borderBottom:`2.5px solid ${mode===id?T.accent:"transparent"}`,background:"transparent",color:mode===id?T.accent:T.muted,fontSize:13,fontWeight:mode===id?700:500}}>{lbl}</button>
        ))}
      </div>
      <div style={{padding:"22px 20px"}}>
        {mode==="login"?(
          <div className="af">
            <div style={{background:T.accentPl,border:`1px solid ${T.bdr}`,borderRadius:T.cardRadius,padding:"12px 14px",marginBottom:18,fontSize:12,color:T.muted}}>
              🔑 Администратор: <strong style={{color:T.accent}}>admin@beauty.il</strong> / <strong style={{color:T.accent}}>admin123</strong>
            </div>
            {[{id:"email",lbl:"Email",ph:"your@email.com",type:"email"},{id:"password",lbl:"Пароль",ph:"••••••••",type:"password"}].map(f=>(
              <FG key={f.id} T={T} label={f.lbl} error={errs[f.id]}>
                <input type={f.type} value={form[f.id]} placeholder={f.ph} onChange={e=>{setForm({...form,[f.id]:e.target.value});setErrs({...errs,[f.id]:""}); }}
                  style={{width:"100%",...IS(T,!!errs[f.id])}}/>
              </FG>
            ))}
            <button onClick={login} style={{width:"100%",padding:"15px",background:T.btnGrad,border:"none",borderRadius:T.btnRadius,fontSize:16,fontWeight:700,color:"#fff",marginTop:8,boxShadow:`0 5px 18px ${T.accent}33`}}>Войти</button>
            <div style={{textAlign:"center",marginTop:14,fontSize:13,color:T.muted}}>
              Нет аккаунта? <span onClick={()=>setMode("register")} style={{color:T.accent,cursor:"pointer",fontWeight:700}}>Зарегистрируйтесь</span>
            </div>
          </div>
        ):(
          <div className="af">
            {[{id:"name",lbl:"Полное имя",ph:"Ваше имя"},{id:"email",lbl:"Email",ph:"your@email.com",type:"email"},{id:"password",lbl:"Пароль",ph:"Мин. 6 символов",type:"password"},{id:"phone",lbl:"Телефон",ph:"+972 50 ..."},{id:"whatsapp",lbl:"WhatsApp (если другой)",ph:"+972...",req:false}].map(f=>(
              <FG key={f.id} T={T} label={f.lbl} error={errs[f.id]} req={f.req!==false}>
                <input type={f.type||"text"} value={form[f.id]} placeholder={f.ph} onChange={e=>{setForm({...form,[f.id]:e.target.value});setErrs({...errs,[f.id]:""}); }}
                  style={{width:"100%",...IS(T,!!errs[f.id])}}/>
              </FG>
            ))}
            <FG T={T} label="Город" req>
              <select value={form.city} onChange={e=>setForm({...form,city:e.target.value})} style={{width:"100%",...IS(T,false),WebkitAppearance:"none"}}>
                {CITIES.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </FG>
            <FG T={T} label="Район / Улица" error={errs.district} req>
              <input value={form.district} placeholder="Кармель, Хадар..." onChange={e=>{setForm({...form,district:e.target.value});setErrs({...errs,district:""}); }} style={{width:"100%",...IS(T,!!errs.district)}}/>
            </FG>
            <FG T={T} label="Категория" req>
              <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                {CATEGORIES.map(c=>{const on=form.category===c.id;return(
                  <button key={c.id} onClick={()=>setForm({...form,category:c.id,services:[]})} style={{padding:"8px 14px",borderRadius:T.btnRadius,border:`1.5px solid ${on?T.accent:T.bdr}`,background:on?T.accentPl:"transparent",color:on?T.accent:T.muted,fontSize:12,fontWeight:on?700:500}}>{c.label}</button>
                );})}
              </div>
            </FG>
            <FG T={T} label="Услуги" error={errs.services} req>
              <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:form.services.length?14:0}}>
                {(ALL_SERVICES[form.category]||[]).map(s=>{const on=form.services.includes(s);return(
                  <button key={s} onClick={()=>toggleSvc(s)} style={{padding:"7px 12px",borderRadius:T.btnRadius,border:`1px solid ${on?T.accent:T.bdr}`,background:on?T.accentPl:"transparent",color:on?T.accent:T.muted,fontSize:12,fontWeight:on?600:400}}>{s}</button>
                );})}
              </div>
            </FG>
            {form.services.length>0&&(
              <FG T={T} label="Цены (₪)">
                {form.services.map(s=>(
                  <div key={s} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                    <span style={{flex:1,fontSize:12,color:T.tx2}}>{s}</span>
                    <input type="number" value={form.prices[s]||""} onChange={e=>setForm(p=>({...p,prices:{...p.prices,[s]:parseInt(e.target.value)||0}}))} placeholder="₪"
                      style={{width:80,...IS(T,false),padding:"9px 10px",textAlign:"right",fontSize:14,fontWeight:600,color:T.accent}}/>
                  </div>
                ))}
              </FG>
            )}
            <FG T={T} label="О себе">
              <textarea value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} placeholder="Расскажите об опыте..."
                style={{width:"100%",...IS(T,false),resize:"none",minHeight:80,fontSize:14}}/>
            </FG>
            <button onClick={register} style={{width:"100%",padding:"15px",background:T.btnGrad,border:"none",borderRadius:T.btnRadius,fontSize:16,fontWeight:700,color:"#fff",boxShadow:`0 5px 18px ${T.accent}33`}}>
              Создать профиль 🌸
            </button>
            <div style={{textAlign:"center",marginTop:12,fontSize:12,color:T.muted}}>Профиль будет проверен администратором</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DASHBOARD (master)
───────────────────────────────────────────── */
function Dashboard({ctx}){
  const {T,me,masters,updateMaster,showToast,setScreen}=ctx;
  const [tab,setTab]=useState("bookings");
  const master=masters.find(m=>m.id===me.id);
  if(!master)return <div style={{padding:40,textAlign:"center",color:T.muted}}>Профиль не найден</div>;
  const bookings=master.bookings||[];
  const upcoming=bookings.filter(b=>b.date>=today()).sort((a,b)=>a.date>b.date?1:-1);
  const past=bookings.filter(b=>b.date<today()).sort((a,b)=>a.date<b.date?1:-1);
  return(
    <div className="au" style={{paddingBottom:32}}>
      {!master.approved&&(
        <div style={{background:`${T.amber}15`,border:`1px solid ${T.amber}40`,padding:"12px 18px",display:"flex",gap:10,alignItems:"center",borderBottom:`1px solid ${T.bdr}`}}>
          <span style={{fontSize:20}}>⏳</span>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:T.amber}}>Профиль на проверке</div>
            <div style={{fontSize:12,color:T.muted,marginTop:2}}>Администратор рассмотрит заявку в ближайшее время</div>
          </div>
        </div>
      )}
      <div style={{background:T.headerBg,padding:"20px",borderBottom:`1px solid ${T.bdr}`}}>
        <div style={{display:"flex",gap:14,alignItems:"center"}}>
          <div style={{width:60,height:60,borderRadius:T.cardRadius,background:master.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:700,color:"#fff",flexShrink:0,fontFamily:T.fontTitle}}>{master.avatar}</div>
          <div>
            <div style={{fontFamily:T.fontTitle,fontSize:20,color:T.tx}}>{master.name}</div>
            <div style={{fontSize:11,color:T.muted,marginTop:2}}>📍 {CITY_SHORT[master.city]} · {master.district}</div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginTop:4}}>
              <span style={{fontSize:13,color:T.accent,fontWeight:700}}>★ {master.rating}</span>
              <span style={{fontSize:11,background:master.approved?`${T.green}15`:`${T.amber}15`,color:master.approved?T.green:T.amber,borderRadius:"10px",padding:"2px 8px",border:`1px solid ${master.approved?T.green+"30":T.amber+"30"}`}}>{master.approved?"✅ Одобрен":"⏳ На проверке"}</span>
            </div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginTop:14}}>
          {[{n:upcoming.length,l:"Предстоящих"},{n:past.length,l:"Выполнено"},{n:master.services.length,l:"Услуг"}].map((s,i)=>(
            <div key={i} style={{background:T.card,border:`1px solid ${T.bdr}`,borderRadius:T.cardRadius,padding:"10px 6px",textAlign:"center"}}>
              <div style={{fontFamily:T.fontTitle,fontSize:22,color:T.accent}}>{s.n}</div>
              <div style={{fontSize:9,color:T.muted,textTransform:"uppercase",letterSpacing:.8}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{display:"flex",background:T.card,borderBottom:`1px solid ${T.bdr}`,overflowX:"auto"}}>
        {[["bookings","📋 Записи"],["profile","👤 Профиль"],["prices","💰 Цены"],["schedule","📅 Расписание"]].map(([id,lbl])=>(
          <button key={id} onClick={()=>setTab(id)} style={{flex:"none",padding:"12px 14px",background:"none",border:"none",borderBottom:`2.5px solid ${tab===id?T.accent:"transparent"}`,color:tab===id?T.accent:T.muted,fontSize:12,fontWeight:tab===id?700:500,whiteSpace:"nowrap"}}>{lbl}</button>
        ))}
      </div>
      <div style={{padding:"18px"}}>
        {tab==="bookings"&&<BookingsTab upcoming={upcoming} past={past} T={T}/>}
        {tab==="profile"&&<ProfileTab master={master} updateMaster={updateMaster} showToast={showToast} T={T}/>}
        {tab==="prices"&&<PricesTab master={master} updateMaster={updateMaster} showToast={showToast} T={T}/>}
        {tab==="schedule"&&<ScheduleTab master={master} updateMaster={updateMaster} showToast={showToast} T={T}/>}
      </div>
    </div>
  );
}

function BookingsTab({upcoming,past,T}){
  return(
    <div>
      <ST T={T}>Предстоящие ({upcoming.length})</ST>
      {upcoming.length===0?(
        <div style={{textAlign:"center",padding:"28px 20px",background:T.card,borderRadius:T.cardRadius,color:T.muted,marginBottom:18,border:`1px solid ${T.bdr}`}}>
          <div style={{fontSize:36,marginBottom:8}}>📭</div><div>Записей пока нет</div>
        </div>
      ):upcoming.map(b=><BCard key={b.id} b={b} T={T} upcoming/>)}
      {past.length>0&&<>
        <ST T={T} style={{marginTop:20}}>История ({past.length})</ST>
        {past.slice(0,8).map(b=><BCard key={b.id} b={b} T={T}/>)}
      </>}
    </div>
  );
}
function BCard({b,T,upcoming}){
  const waMsg=encodeURIComponent(`שלום ${b.clientName}! תזכורת לתור ב${fmtLong(b.date)} בשעה ${b.time}. מחכים לך! 💅`);
  return(
    <div style={{background:T.card,border:`1.5px solid ${upcoming?T.bdr2:T.bdr}`,borderRadius:T.cardRadius,padding:"14px 16px",marginBottom:10,borderLeft:`4px solid ${upcoming?T.accent:T.bdr}`}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
        <div>
          <div style={{fontWeight:700,fontSize:15,color:T.tx}}>{b.clientName}</div>
          <div style={{fontSize:12,color:T.muted,marginTop:2}}>📞 {b.clientPhone} · 📍 {b.clientCity}</div>
        </div>
        {upcoming&&(
          <a href={`https://wa.me/${b.clientPhone.replace(/\D/g,"")}?text=${waMsg}`} target="_blank" rel="noreferrer"
            style={{width:34,height:34,borderRadius:T.cardRadius,background:"rgba(37,211,102,.1)",border:"1px solid rgba(37,211,102,.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,textDecoration:"none"}}>💬</a>
        )}
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {[[T.accent,`🗓 ${fmtLong(b.date)}`],[T.tx2,`⏰ ${b.time}`],[T.muted,b.service]].map(([c,txt])=>(
          <span key={txt} style={{fontSize:11,background:T.bg2,border:`1px solid ${T.bdr}`,borderRadius:"20px",padding:"4px 10px",color:c}}>{txt}</span>
        ))}
      </div>
    </div>
  );
}

function ProfileTab({master,updateMaster,showToast,T}){
  const [f,setF]=useState({name:master.name,phone:master.phone||"",whatsapp:master.whatsapp||"",city:master.city,district:master.district,bio:master.bio||""});
  const save=()=>{updateMaster(master.id,f);showToast("Профиль обновлён ✅");};
  return(
    <div>
      {[{id:"name",lbl:"Имя"},{id:"phone",lbl:"Телефон"},{id:"whatsapp",lbl:"WhatsApp"},{id:"district",lbl:"Район"}].map(fl=>(
        <FG key={fl.id} T={T} label={fl.lbl}>
          <input value={f[fl.id]} onChange={e=>setF({...f,[fl.id]:e.target.value})} style={{width:"100%",...IS(T,false)}}/>
        </FG>
      ))}
      <FG T={T} label="Город">
        <select value={f.city} onChange={e=>setF({...f,city:e.target.value})} style={{width:"100%",...IS(T,false),WebkitAppearance:"none"}}>
          {CITIES.map(c=><option key={c} value={c}>{c}</option>)}
        </select>
      </FG>
      <FG T={T} label="О себе">
        <textarea value={f.bio} onChange={e=>setF({...f,bio:e.target.value})} style={{width:"100%",...IS(T,false),resize:"none",minHeight:80,fontSize:14}}/>
      </FG>
      <button onClick={save} style={{width:"100%",padding:"14px",background:T.btnGrad,border:"none",borderRadius:T.btnRadius,fontSize:15,fontWeight:700,color:"#fff",boxShadow:`0 4px 14px ${T.accent}30`}}>💾 Сохранить</button>
    </div>
  );
}

function PricesTab({master,updateMaster,showToast,T}){
  const [svcs,setSvcs]=useState([...master.services]);
  const [prices,setPrices]=useState({...master.prices});
  const catSvcs=ALL_SERVICES[master.category]||[];
  const toggle=(s)=>{const ns=svcs.includes(s)?svcs.filter(x=>x!==s):[...svcs,s];setSvcs(ns);if(!prices[s])setPrices({...prices,[s]:100});};
  const save=()=>{const fp=Object.fromEntries(Object.entries(prices).filter(([k])=>svcs.includes(k)));updateMaster(master.id,{services:svcs,prices:fp});showToast("Цены обновлены ✅");};
  return(
    <div>
      <FG T={T} label="Услуги">
        <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:14}}>
          {catSvcs.map(s=>{const on=svcs.includes(s);return(
            <button key={s} onClick={()=>toggle(s)} style={{padding:"7px 12px",borderRadius:T.btnRadius,border:`1px solid ${on?T.accent:T.bdr}`,background:on?T.accentPl:"transparent",color:on?T.accent:T.muted,fontSize:12,fontWeight:on?600:400}}>{s}</button>
          );})}
        </div>
      </FG>
      {svcs.length>0&&(
        <FG T={T} label="Цены (₪)">
          {svcs.map(s=>(
            <div key={s} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
              <span style={{flex:1,fontSize:13,color:T.tx}}>{s}</span>
              <input type="number" value={prices[s]||""} onChange={e=>setPrices({...prices,[s]:parseInt(e.target.value)||0})}
                style={{width:85,...IS(T,false),padding:"9px 10px",textAlign:"right",fontSize:14,fontWeight:700,color:T.accent}}/>
              <span style={{fontSize:11,color:T.muted}}>₪</span>
            </div>
          ))}
        </FG>
      )}
      <button onClick={save} style={{width:"100%",padding:"14px",background:T.btnGrad,border:"none",borderRadius:T.btnRadius,fontSize:15,fontWeight:700,color:"#fff",boxShadow:`0 4px 14px ${T.accent}30`}}>💾 Сохранить</button>
    </div>
  );
}

/* ─── SCHEDULE TAB — мастер сам управляет расписанием ─── */
function ScheduleTab({master,updateMaster,showToast,T}){
  const [calY,setCalY]=useState(()=>new Date().getFullYear());
  const [calM,setCalM]=useState(()=>new Date().getMonth());
  const [selDate,setSelDate]=useState(null);
  const [workStart,setWorkStart]=useState(master.workStart||"9:00");
  const [workEnd,setWorkEnd]=useState(master.workEnd||"19:00");

  const fdo=new Date(calY,calM,1).getDay();
  const offset=fdo===0?6:fdo-1;
  const dim=new Date(calY,calM+1,0).getDate();
  const prevM=()=>{if(calM===0){setCalY(y=>y-1);setCalM(11);}else setCalM(m=>m-1);};
  const nextM=()=>{if(calM===11){setCalY(y=>y+1);setCalM(0);}else setCalM(m=>m+1);};

  const genHours=(start,end)=>{
    const all=TIME_OPTIONS;
    const si=all.indexOf(start),ei=all.indexOf(end);
    if(si<0||ei<=si)return all;
    return all.slice(si,ei+1);
  };

  const saveWorkHours=()=>{
    const newHrs=genHours(workStart,workEnd);
    const newSlots={...master.slots};
    Object.keys(newSlots).forEach(d=>{
      newSlots[d]={...newSlots[d],hrs:newHrs,booked:newSlots[d].booked.filter(h=>newHrs.includes(h))};
    });
    updateMaster(master.id,{slots:newSlots,workStart,workEnd});
    showToast("Рабочие часы обновлены ✅");
  };

  const toggleBlock=(dStr)=>{
    const newSlots={...master.slots};
    if(!newSlots[dStr])newSlots[dStr]={hrs:genHours(workStart,workEnd),booked:[],blocked:false};
    newSlots[dStr]={...newSlots[dStr],blocked:!newSlots[dStr].blocked};
    updateMaster(master.id,{slots:newSlots});
    showToast(newSlots[dStr].blocked?"День закрыт 🔒":"День открыт ✅");
  };

  const toggleSlot=(dStr,h)=>{
    const newSlots={...master.slots};
    if(!newSlots[dStr])return;
    const booked=newSlots[dStr].booked;
    newSlots[dStr]={...newSlots[dStr],booked:booked.includes(h)?booked.filter(x=>x!==h):[...booked,h]};
    updateMaster(master.id,{slots:newSlots});
  };

  const selSl=selDate?master.slots?.[selDate]:null;

  return(
    <div>
      {/* Work hours */}
      <div style={{background:T.card,border:`1px solid ${T.bdr}`,borderRadius:T.cardRadius,padding:"16px",marginBottom:16,boxShadow:T.shadow}}>
        <div style={{fontSize:12,fontWeight:700,color:T.muted,textTransform:"uppercase",letterSpacing:1,marginBottom:12}}>⏰ Рабочие часы</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
          <div>
            <div style={{fontSize:11,color:T.muted,marginBottom:6}}>Начало работы</div>
            <select value={workStart} onChange={e=>setWorkStart(e.target.value)} style={{width:"100%",...IS(T,false),padding:"10px 12px",WebkitAppearance:"none",fontSize:14,fontWeight:600,color:T.accent}}>
              {TIME_OPTIONS.map(t=><option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <div style={{fontSize:11,color:T.muted,marginBottom:6}}>Конец работы</div>
            <select value={workEnd} onChange={e=>setWorkEnd(e.target.value)} style={{width:"100%",...IS(T,false),padding:"10px 12px",WebkitAppearance:"none",fontSize:14,fontWeight:600,color:T.accent}}>
              {TIME_OPTIONS.map(t=><option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <button onClick={saveWorkHours} style={{width:"100%",padding:"12px",background:T.btnGrad,border:"none",borderRadius:T.btnRadius,fontSize:14,fontWeight:700,color:"#fff"}}>
          💾 Сохранить рабочие часы
        </button>
      </div>

      {/* Calendar */}
      <div style={{background:T.card,border:`1px solid ${T.bdr}`,borderRadius:T.cardRadius,padding:"16px",marginBottom:14,boxShadow:T.shadow}}>
        <div style={{fontSize:12,fontWeight:700,color:T.muted,textTransform:"uppercase",letterSpacing:1,marginBottom:12}}>📅 Управление днями</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{fontFamily:T.fontTitle,fontSize:16,color:T.tx}}>{MNAMES[calM]} {calY}</div>
          <div style={{display:"flex",gap:6}}>
            {[["◀",prevM],["▶",nextM]].map(([l,fn])=>(
              <button key={l} onClick={fn} style={{width:30,height:30,borderRadius:T.cardRadius,background:T.bg2,border:`1px solid ${T.bdr}`,color:T.muted,fontSize:11}}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",marginBottom:4}}>
          {["Пн","Вт","Ср","Чт","Пт","Сб","Вс"].map((d,i)=>(
            <div key={d} style={{textAlign:"center",fontSize:9,fontWeight:600,color:i>=5?T.accent:T.muted,padding:"2px 0",textTransform:"uppercase"}}>{d}</div>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2}}>
          {Array(offset).fill(null).map((_,i)=><div key={i}/>)}
          {Array(dim).fill(null).map((_,i)=>{
            const d=i+1,date=new Date(calY,calM,d),dStr=fd(date);
            const isFri=date.getDay()===5,isSat=date.getDay()===6;
            const isPast=date<new Date(new Date().setHours(0,0,0,0));
            const sl=master.slots?.[dStr];
            const isBlocked=sl?.blocked;
            const isSel=selDate===dStr;
            const avl=sl?getAvail(master,dStr).length:0;
            return(
              <div key={d} onClick={()=>{ if(isFri||isSat||isPast)return; setSelDate(isSel?null:dStr); }}
                style={{aspectRatio:"1",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",borderRadius:T.cardRadius,cursor:(isFri||isSat||isPast)?"default":"pointer",background:isSel?T.accent:(isBlocked?`${T.red}15`:(isFri||isSat||isPast?T.bg2:"transparent")),opacity:isPast?.35:1,border:`1px solid ${isSel?T.accent:(isBlocked?T.red+"40":T.bdr)}`,transition:"all .12s"}}>
                <div style={{fontSize:11,fontWeight:isSel?700:500,color:isSel?"#fff":(isBlocked?T.red:T.tx),lineHeight:1}}>{d}</div>
                {!isFri&&!isSat&&!isPast&&<div style={{width:4,height:4,borderRadius:"50%",background:isBlocked?T.red:(avl>0?T.green:T.amber),marginTop:2}}/>}
              </div>
            );
          })}
        </div>
        <div style={{display:"flex",gap:12,marginTop:12,paddingTop:10,borderTop:`1px solid ${T.bdr}`}}>
          {[[T.green,"Есть места"],[T.amber,"Все занято"],[T.red,"Закрыто"]].map(([c,l])=>(
            <div key={l} style={{display:"flex",alignItems:"center",gap:5,fontSize:10,color:T.muted}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:c}}/>{l}
            </div>
          ))}
        </div>
      </div>

      {/* Selected day detail */}
      {selDate&&(
        <div className="af" style={{background:T.card,border:`1.5px solid ${T.bdr2}`,borderRadius:T.cardRadius,padding:"16px",boxShadow:T.shadow}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div style={{fontWeight:700,fontSize:14,color:T.tx}}>🗓 {fmtLong(selDate)}</div>
            <button onClick={()=>toggleBlock(selDate)}
              style={{padding:"8px 14px",borderRadius:T.btnRadius,border:`1px solid ${selSl?.blocked?T.green+"50":T.red+"50"}`,background:selSl?.blocked?`${T.green}10`:`${T.red}10`,color:selSl?.blocked?T.green:T.red,fontSize:12,fontWeight:700}}>
              {selSl?.blocked?"🔓 Открыть день":"🔒 Закрыть день"}
            </button>
          </div>
          {!selSl?.blocked&&(
            <>
              <div style={{fontSize:11,color:T.muted,marginBottom:10}}>Нажмите на время чтобы закрыть/открыть слот:</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
                {(selSl?.hrs||genHours(workStart,workEnd)).map(h=>{
                  const isB=(selSl?.booked||[]).includes(h);
                  return(
                    <button key={h} onClick={()=>toggleSlot(selDate,h)}
                      style={{padding:"10px 6px",borderRadius:T.cardRadius,border:`1.5px solid ${isB?T.red+"50":T.green+"50"}`,background:isB?`${T.red}10`:`${T.green}08`,color:isB?T.red:T.green,fontSize:13,fontWeight:600}}>
                      {h}
                      <div style={{fontSize:9,marginTop:2,opacity:.8}}>{isB?"Закрыто":"Открыто"}</div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
          {selSl?.blocked&&(
            <div style={{textAlign:"center",padding:"16px",color:T.red,fontSize:13}}>🔒 Этот день закрыт для записи</div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   ADMIN PANEL — полное редактирование мастеров
───────────────────────────────────────────── */
function AdminPanel({ctx}){
  const {T,me,masters,users,approveMaster,deleteMaster,setScreen,showToast,updateMaster,theme,setTheme}=ctx;
  const [tab,setTab]=useState("pending");
  const [editingMaster,setEditingMaster]=useState(null);

  if(!me||me.role!=="admin"){
    return(
      <div style={{padding:40,textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:16}}>🔐</div>
        <div style={{fontSize:16,color:T.muted}}>Доступ запрещён</div>
        <button onClick={()=>setScreen("home")} style={{marginTop:16,padding:"10px 20px",background:T.btnGrad,border:"none",borderRadius:T.btnRadius,color:"#fff",fontWeight:600}}>← Назад</button>
      </div>
    );
  }

  const pending=masters.filter(m=>!m.approved);
  const approved=masters.filter(m=>m.approved);

  return(
    <div className="au" style={{paddingBottom:32}}>
      {/* Header */}
      <div style={{background:T.headerBg,padding:"20px 20px 16px",borderBottom:`1px solid ${T.bdr}`}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
          <div>
            <div style={{fontFamily:T.fontTitle,fontSize:20,color:T.tx}}>⚙️ Панель администратора</div>
            <div style={{fontSize:11,color:T.muted,marginTop:3}}>יופי ישראל · Управление платформой</div>
          </div>
          <button onClick={()=>setScreen("home")} style={{background:T.card,border:`1px solid ${T.bdr}`,borderRadius:T.btnRadius,padding:"8px 12px",color:T.muted,fontSize:12}}>← Сайт</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
          {[{n:masters.length,l:"Мастеров",e:"🌸"},{n:approved.length,l:"Активных",e:"✅"},{n:pending.length,l:"На проверке",e:"⏳"},{n:masters.reduce((s,m)=>s+(m.bookings?.length||0),0),l:"Записей",e:"📋"}].map((s,i)=>(
            <div key={i} style={{background:T.card,borderRadius:T.cardRadius,padding:"10px 6px",textAlign:"center",border:`1px solid ${T.bdr}`,boxShadow:T.shadow}}>
              <div style={{fontSize:16,marginBottom:2}}>{s.e}</div>
              <div style={{fontFamily:T.fontTitle,fontSize:20,color:T.accent}}>{s.n}</div>
              <div style={{fontSize:9,color:T.muted,textTransform:"uppercase",letterSpacing:.6}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",background:T.card,borderBottom:`1px solid ${T.bdr}`,overflowX:"auto"}}>
        {[["pending",`⏳ Проверка (${pending.length})`],["approved","✅ Активные"],["all","📊 Статистика"],["themes","🎨 Дизайн"]].map(([id,lbl])=>(
          <button key={id} onClick={()=>setTab(id)} style={{flex:"none",padding:"12px 14px",background:"none",border:"none",borderBottom:`2.5px solid ${tab===id?T.accent:"transparent"}`,color:tab===id?T.accent:T.muted,fontSize:11,fontWeight:tab===id?700:500,whiteSpace:"nowrap"}}>{lbl}</button>
        ))}
      </div>

      <div style={{padding:"16px 18px"}}>
        {tab==="pending"&&(
          <div>
            {pending.length===0?(
              <div style={{textAlign:"center",padding:"50px 20px",color:T.muted}}>
                <div style={{fontSize:48,marginBottom:12}}>🎉</div>
                <div>Нет заявок на проверку</div>
              </div>
            ):pending.map(m=><AdminCard key={m.id} m={m} T={T} onApprove={()=>approveMaster(m.id)} onDelete={()=>deleteMaster(m.id)} onEdit={()=>setEditingMaster(m)} showPending/>)}
          </div>
        )}

        {tab==="approved"&&(
          <div>{approved.map(m=><AdminCard key={m.id} m={m} T={T} onDelete={()=>deleteMaster(m.id)} onEdit={()=>setEditingMaster(m)}/>)}</div>
        )}

        {tab==="all"&&(
          <div>
            <div style={{background:T.card,border:`1px solid ${T.bdr}`,borderRadius:T.cardRadius,overflow:"hidden",marginBottom:16}}>
              <div style={{padding:"12px 16px",background:T.bg2,borderBottom:`1px solid ${T.bdr}`,fontSize:11,fontWeight:700,color:T.muted,textTransform:"uppercase",letterSpacing:1}}>По городам</div>
              {CITIES.map(city=>{
                const cnt=masters.filter(m=>m.city===city);
                const bkd=cnt.reduce((s,m)=>s+(m.bookings?.length||0),0);
                return(
                  <div key={city} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",borderBottom:`1px solid ${T.bdr}`}}>
                    <div>
                      <div style={{fontWeight:600,fontSize:14,color:T.tx}}>{CITY_SHORT[city]}</div>
                      <div style={{fontSize:11,color:T.muted}}>{cnt.length} мастеров</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:14,fontWeight:700,color:T.accent}}>{bkd}</div>
                      <div style={{fontSize:10,color:T.muted}}>записей</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{background:T.card,border:`1px solid ${T.bdr}`,borderRadius:T.cardRadius,overflow:"hidden"}}>
              <div style={{padding:"12px 16px",background:T.bg2,borderBottom:`1px solid ${T.bdr}`,fontSize:11,fontWeight:700,color:T.muted,textTransform:"uppercase",letterSpacing:1}}>По категориям</div>
              {CATEGORIES.map(cat=>{
                const cnt=masters.filter(m=>m.category===cat.id);
                return(
                  <div key={cat.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",borderBottom:`1px solid ${T.bdr}`}}>
                    <div style={{fontSize:13,color:T.tx}}>{cat.label}</div>
                    <span style={{background:T.accentPl,color:T.accent,fontSize:12,fontWeight:700,borderRadius:"20px",padding:"3px 10px",border:`1px solid ${T.bdr}`}}>{cnt.length}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 🎨 THEME SWITCHER */}
        {tab==="themes"&&(
          <div>
            <ST T={T}>Выберите дизайн платформы</ST>
            <div style={{fontSize:13,color:T.muted,marginBottom:20,lineHeight:1.6}}>Выбранный дизайн применится для всех пользователей платформы.</div>
            {Object.entries(THEMES).map(([key,th])=>(
              <div key={key} onClick={()=>{setTheme(key);showToast(`Тема "${th.name}" применена! 🎨`);}}
                style={{background:theme===key?T.accentPl:T.card,border:`2px solid ${theme===key?T.accent:T.bdr}`,borderRadius:T.cardRadius,padding:"18px",marginBottom:14,cursor:"pointer",boxShadow:T.shadow,transition:"all .2s"}}>
                {/* Preview */}
                <div style={{background:th.headerBg,borderRadius:"12px",padding:"14px",marginBottom:14,border:`1px solid ${th.bdr}`}}>
                  <div style={{fontFamily:th.fontTitle,fontSize:18,color:th.accent,marginBottom:6}}>✦ יופי ישראל</div>
                  <div style={{display:"flex",gap:8,marginBottom:10}}>
                    <div style={{background:th.btnGrad,borderRadius:th.btnRadius,padding:"6px 14px",fontSize:12,color:"#fff",fontWeight:700}}>Найти мастера</div>
                    <div style={{background:th.card,border:`1px solid ${th.bdr}`,borderRadius:th.btnRadius,padding:"6px 12px",fontSize:12,color:th.accent,fontWeight:600}}>Я мастер</div>
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    {[th.accent,th.green,th.amber].map((c,i)=>(
                      <div key={i} style={{width:28,height:28,borderRadius:th.cardRadius,background:c}}/>
                    ))}
                    <div style={{fontSize:11,color:th.muted,paddingTop:6,fontFamily:th.fontBody}}>{th.fontTitle.split(",")[0]}</div>
                  </div>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <div style={{fontFamily:T.fontTitle,fontSize:17,color:T.tx,fontWeight:700}}>{th.name}</div>
                    <div style={{fontSize:12,color:T.muted,marginTop:3}}>
                      {key==="blush"?"Нежный розовый · женственный · пастельный":key==="dark"?"Тёмный люкс · золото · элегантный":"Свежий зелёный · яркий · современный"}
                    </div>
                  </div>
                  {theme===key?(
                    <div style={{background:T.accentPl,border:`1px solid ${T.accent}`,borderRadius:"20px",padding:"6px 14px",fontSize:12,color:T.accent,fontWeight:700}}>✓ Активен</div>
                  ):(
                    <div style={{background:T.bg2,border:`1px solid ${T.bdr}`,borderRadius:"20px",padding:"6px 14px",fontSize:12,color:T.muted}}>Выбрать</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingMaster&&(
        <EditMasterModal master={editingMaster} T={T} updateMaster={updateMaster} showToast={showToast} onClose={()=>setEditingMaster(null)}/>
      )}
    </div>
  );
}

function AdminCard({m,T,onApprove,onDelete,onEdit,showPending}){
  const [open,setOpen]=useState(false);
  return(
    <div style={{background:T.card,border:`1.5px solid ${showPending?T.amber+"40":T.bdr}`,borderRadius:T.cardRadius,marginBottom:12,overflow:"hidden",boxShadow:T.shadow}}>
      <div style={{padding:"14px 16px"}}>
        <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
          <div style={{width:46,height:46,borderRadius:T.cardRadius,background:m.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,fontWeight:700,color:"#fff",flexShrink:0,fontFamily:T.fontTitle}}>{m.avatar}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontWeight:700,fontSize:15,color:T.tx}}>{m.name}</div>
            <div style={{fontSize:11,color:T.muted,marginTop:2}}>📍 {CITY_SHORT[m.city]||m.city} · {m.district}</div>
            <div style={{fontSize:11,color:T.muted,marginTop:1}}>{catLabel(m.category)} · 📞 {m.phone}</div>
            <div style={{fontSize:11,color:T.muted,marginTop:1}}>✉️ {m.email}</div>
            <div style={{fontSize:11,color:T.muted,marginTop:1}}>📊 {m.bookings?.length||0} записей · ★{m.rating}</div>
          </div>
          <button onClick={()=>setOpen(!open)} style={{background:T.bg2,border:`1px solid ${T.bdr}`,borderRadius:T.cardRadius,padding:"6px 8px",color:T.muted,fontSize:11}}>{open?"▲":"▼"}</button>
        </div>
        {open&&(
          <div className="af" style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${T.bdr}`}}>
            <div style={{fontSize:13,color:T.tx2,lineHeight:1.6,marginBottom:10}}>{m.bio}</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
              {m.services.map(s=><span key={s} style={{fontSize:11,background:T.bg2,border:`1px solid ${T.bdr}`,borderRadius:"20px",padding:"3px 8px",color:T.tx2}}>{s}</span>)}
            </div>
          </div>
        )}
      </div>
      <div style={{display:"flex",borderTop:`1px solid ${T.bdr}`}}>
        <button onClick={onEdit} style={{flex:1,padding:"12px",background:T.accentPl,border:"none",borderRight:`1px solid ${T.bdr}`,color:T.accent,fontSize:13,fontWeight:700}}>✏️ Редактировать</button>
        {showPending&&<button onClick={onApprove} style={{flex:1,padding:"12px",background:`${T.green}10`,border:"none",borderRight:`1px solid ${T.bdr}`,color:T.green,fontSize:13,fontWeight:700}}>✅ Одобрить</button>}
        <button onClick={()=>{if(window.confirm(`Удалить мастера «${m.name}»?`))onDelete();}} style={{flex:1,padding:"12px",background:`${T.red}08`,border:"none",color:T.red,fontSize:13,fontWeight:700}}>🗑 Удалить</button>
      </div>
    </div>
  );
}

/* ─── EDIT MASTER MODAL ─── */
function EditMasterModal({master,T,updateMaster,showToast,onClose}){
  const [f,setF]=useState({
    name:master.name||"",email:master.email||"",phone:master.phone||"",
    whatsapp:master.whatsapp||"",city:master.city||CITIES[0],
    district:master.district||"",bio:master.bio||"",
    category:master.category||"nail",services:[...master.services],
    prices:{...master.prices},rating:master.rating||5.0,reviews:master.reviews||0,
    workStart:master.workStart||"9:00",workEnd:master.workEnd||"19:00",
  });
  const [tab,setTab]=useState("basic");

  const toggleSvc=(s)=>setF(prev=>({...prev,services:prev.services.includes(s)?prev.services.filter(x=>x!==s):[...prev.services,s]}));

  const save=()=>{
    const prices=Object.fromEntries(Object.entries(f.prices).filter(([k])=>f.services.includes(k)));
    updateMaster(master.id,{...f,prices});
    showToast("Данные мастера обновлены ✅");
    onClose();
  };

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",backdropFilter:"blur(6px)",zIndex:1000,display:"flex",alignItems:"flex-end"}}>
      <div style={{background:T.card,borderRadius:"20px 20px 0 0",width:"100%",maxHeight:"92dvh",display:"flex",flexDirection:"column",animation:"slideUp .28s ease"}}>
        <style>{`@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}`}</style>
        <div style={{width:36,height:4,background:T.bdr,borderRadius:4,margin:"10px auto 0"}}/>
        <div style={{padding:"14px 18px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`1px solid ${T.bdr}`}}>
          <div style={{fontFamily:T.fontTitle,fontSize:16,color:T.tx}}>✏️ Редактировать: {master.name}</div>
          <button onClick={onClose} style={{width:30,height:30,borderRadius:T.cardRadius,background:T.bg2,border:`1px solid ${T.bdr}`,color:T.muted,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>
        {/* Inner tabs */}
        <div style={{display:"flex",background:T.bg2,borderBottom:`1px solid ${T.bdr}`,overflowX:"auto",flexShrink:0}}>
          {[["basic","👤 Основное"],["services","💅 Услуги"],["prices","💰 Цены"],["meta","⭐ Рейтинг"]].map(([id,lbl])=>(
            <button key={id} onClick={()=>setTab(id)} style={{flex:"none",padding:"11px 14px",background:"none",border:"none",borderBottom:`2px solid ${tab===id?T.accent:"transparent"}`,color:tab===id?T.accent:T.muted,fontSize:11,fontWeight:tab===id?700:500,whiteSpace:"nowrap"}}>{lbl}</button>
          ))}
        </div>
        <div style={{padding:"16px 18px",overflowY:"auto",flex:1}}>
          {tab==="basic"&&(
            <div className="af">
              {[{id:"name",lbl:"Имя"},{id:"email",lbl:"Email"},{id:"phone",lbl:"Телефон"},{id:"whatsapp",lbl:"WhatsApp"},{id:"district",lbl:"Район"}].map(fl=>(
                <FG key={fl.id} T={T} label={fl.lbl}>
                  <input value={f[fl.id]} onChange={e=>setF({...f,[fl.id]:e.target.value})} style={{width:"100%",...IS(T,false)}}/>
                </FG>
              ))}
              <FG T={T} label="Город">
                <select value={f.city} onChange={e=>setF({...f,city:e.target.value})} style={{width:"100%",...IS(T,false),WebkitAppearance:"none"}}>
                  {CITIES.map(c=><option key={c} value={c}>{c}</option>)}
                </select>
              </FG>
              <FG T={T} label="Категория">
                <select value={f.category} onChange={e=>setF({...f,category:e.target.value,services:[]})} style={{width:"100%",...IS(T,false),WebkitAppearance:"none"}}>
                  {CATEGORIES.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </FG>
              <FG T={T} label="О себе">
                <textarea value={f.bio} onChange={e=>setF({...f,bio:e.target.value})} style={{width:"100%",...IS(T,false),resize:"none",minHeight:80,fontSize:14}}/>
              </FG>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <FG T={T} label="Начало работы">
                  <select value={f.workStart} onChange={e=>setF({...f,workStart:e.target.value})} style={{width:"100%",...IS(T,false),WebkitAppearance:"none",fontSize:14,fontWeight:600,color:T.accent}}>
                    {TIME_OPTIONS.map(t=><option key={t} value={t}>{t}</option>)}
                  </select>
                </FG>
                <FG T={T} label="Конец работы">
                  <select value={f.workEnd} onChange={e=>setF({...f,workEnd:e.target.value})} style={{width:"100%",...IS(T,false),WebkitAppearance:"none",fontSize:14,fontWeight:600,color:T.accent}}>
                    {TIME_OPTIONS.map(t=><option key={t} value={t}>{t}</option>)}
                  </select>
                </FG>
              </div>
            </div>
          )}
          {tab==="services"&&(
            <div className="af">
              <div style={{fontSize:13,color:T.muted,marginBottom:14}}>Выберите услуги которые предоставляет мастер:</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                {(ALL_SERVICES[f.category]||[]).map(s=>{const on=f.services.includes(s);return(
                  <button key={s} onClick={()=>toggleSvc(s)} style={{padding:"9px 14px",borderRadius:T.btnRadius,border:`1.5px solid ${on?T.accent:T.bdr}`,background:on?T.accentPl:"transparent",color:on?T.accent:T.muted,fontSize:13,fontWeight:on?700:500}}>{s}</button>
                );})}
              </div>
            </div>
          )}
          {tab==="prices"&&(
            <div className="af">
              <div style={{fontSize:13,color:T.muted,marginBottom:14}}>Установите цены в шекелях (₪):</div>
              {f.services.map(s=>(
                <div key={s} style={{display:"flex",alignItems:"center",gap:10,marginBottom:12,background:T.bg2,borderRadius:T.cardRadius,padding:"12px 14px",border:`1px solid ${T.bdr}`}}>
                  <span style={{flex:1,fontSize:13,color:T.tx,fontWeight:500}}>{s}</span>
                  <input type="number" value={f.prices[s]||""} onChange={e=>setF(prev=>({...prev,prices:{...prev.prices,[s]:parseInt(e.target.value)||0}}))}
                    style={{width:90,...IS(T,false),padding:"10px 12px",textAlign:"right",fontSize:15,fontWeight:700,color:T.accent}}/>
                  <span style={{fontSize:13,color:T.muted,fontWeight:600}}>₪</span>
                </div>
              ))}
              {f.services.length===0&&<div style={{textAlign:"center",padding:"30px",color:T.muted}}>Сначала выберите услуги на вкладке «Услуги»</div>}
            </div>
          )}
          {tab==="meta"&&(
            <div className="af">
              <FG T={T} label="Рейтинг (1-5)">
                <input type="number" min="1" max="5" step="0.1" value={f.rating} onChange={e=>setF({...f,rating:parseFloat(e.target.value)||5})} style={{width:"100%",...IS(T,false),fontSize:18,fontWeight:700,color:T.accent,textAlign:"center"}}/>
              </FG>
              <FG T={T} label="Количество отзывов">
                <input type="number" value={f.reviews} onChange={e=>setF({...f,reviews:parseInt(e.target.value)||0})} style={{width:"100%",...IS(T,false),fontSize:18,fontWeight:700,textAlign:"center"}}/>
              </FG>
            </div>
          )}
        </div>
        <div style={{padding:"12px 18px",borderTop:`1px solid ${T.bdr}`,display:"flex",gap:10,paddingBottom:"calc(12px + env(safe-area-inset-bottom,0px))"}}>
          <button onClick={onClose} style={{flex:1,padding:"14px",background:T.bg2,border:`1px solid ${T.bdr}`,borderRadius:T.btnRadius,color:T.muted,fontSize:14,fontWeight:600}}>Отмена</button>
          <button onClick={save} style={{flex:2,padding:"14px",background:T.btnGrad,border:"none",borderRadius:T.btnRadius,color:"#fff",fontSize:15,fontWeight:700,boxShadow:`0 4px 14px ${T.accent}30`}}>💾 Сохранить изменения</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TOAST
───────────────────────────────────────────── */
function Toast({msg,type,T}){
  return(
    <div style={{position:"fixed",top:72,left:"50%",transform:"translateX(-50%)",zIndex:9999,pointerEvents:"none",width:"88%",animation:"fadeUp .25s ease"}}>
      <div style={{background:T.card,border:`1.5px solid ${type==="err"?T.red:T.accent}`,borderRadius:T.cardRadius,padding:"12px 18px",fontSize:13,fontWeight:600,color:type==="err"?T.red:T.accent,textAlign:"center",boxShadow:T.shadow}}>
        {type==="err"?"❌ ":"🌸 "}{msg}
      </div>
    </div>
  );
}
