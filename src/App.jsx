 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/App.jsx b/src/App.jsx
index afdc24b043b451d3b75a91354ceac7df86f7d85c..0f2369bb4954d4a9512dc5d2d96859f0f0d3e3e1 100644
--- a/src/App.jsx
+++ b/src/App.jsx
@@ -719,106 +719,104 @@ function SuccessScreen({ctx}){
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
-    if(form.email==="admin@beauty.il"&&form.password==="admin123"){
-      const adm={id:"admin",name:"Администратор",email:"admin@beauty.il",role:"admin"};
+    const loginValue=form.email.trim().toLowerCase();
+    if(loginValue==="admin"&&form.password==="ZXCVasdfqwer"){
+      const adm={id:"admin",name:"Администратор",email:"admin",role:"admin"};
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
-            <div style={{background:T.accentPl,border:`1px solid ${T.bdr}`,borderRadius:T.cardRadius,padding:"12px 14px",marginBottom:18,fontSize:12,color:T.muted}}>
-              🔑 Администратор: <strong style={{color:T.accent}}>admin@beauty.il</strong> / <strong style={{color:T.accent}}>admin123</strong>
-            </div>
-            {[{id:"email",lbl:"Email",ph:"your@email.com",type:"email"},{id:"password",lbl:"Пароль",ph:"••••••••",type:"password"}].map(f=>(
+            {[{id:"email",lbl:"Email или логин",ph:"your@email.com или admin",type:"text"},{id:"password",lbl:"Пароль",ph:"••••••••",type:"password"}].map(f=>(
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
 
EOF
)
