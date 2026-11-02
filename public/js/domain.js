"use strict";
/* ================= DOMAIN LAYER ================= */
const FOODS=[["Brown rice, 1 cup",216,5,45,3.5,10],["Chicken adobo, 1 serving",320,28,6,.5,1100],["Fried egg, 1 pc",90,6,.4,0,95],["Banana, 1 pc",105,1.3,27,3.1,1],["Instant noodles, 1 pack",380,8,54,2,1800],["Steamed fish, 100 g",120,22,0,0,90],["Sautéed vegetables, 1 cup",80,3,10,4,300],["Fried chicken, 1 pc",290,20,10,.5,650],["Oatmeal, 1 cup",160,6,28,4,115],["Soft drink, 355 ml",140,0,39,0,45],["Tofu, 100 g",76,8,2,.3,7],["Mango, 1 cup",100,1.4,25,2.6,2],["Pandesal, 2 pcs",160,5,30,1.5,300],["Sinigang na baboy, 1 bowl",250,18,12,2,900],["Boiled sweet potato, 1 cup",180,4,41,6.6,70],["Milk, 1 glass",120,8,12,0,100]].map(([n,kcal,p,c,f,na])=>({n,kcal,p,c,f,na}));
const N={bmr:u=>10*u.wt+6.25*u.ht-5*u.age+(u.sex==="male"?5:-161),
 targets(u){const kcal=Math.round(this.bmr(u)*u.act);return{kcal,protein:Math.round(.8*u.wt),carb:Math.max(130,Math.round(kcal*.55/4)),fiber:Math.round(14*kcal/1000),sodium:2300}},
 totals:l=>l.reduce((t,e)=>(t.kcal+=e.kcal,t.protein+=e.p,t.carb+=e.c,t.fiber+=e.f,t.sodium+=e.na,t),{kcal:0,protein:0,carb:0,fiber:0,sodium:0}),
 cds(t,g){if(!t.kcal)return[];const r=[],f=(c,l,m)=>c&&r.push({l,m});
  f(t.sodium>g.sodium,"e",`Sodium ${Math.round(t.sodium)} mg exceeds 2,300 mg → eNCPT NI-5.10.2 Excessive mineral intake.`);
  f(t.kcal>g.kcal*1.1,"w",`Energy ${Math.round(t.kcal)} kcal is over 110% of need → NI-1.3 Excessive energy intake.`);
  f(t.kcal<g.kcal*.7,"w",`Energy ${Math.round(t.kcal)} kcal is under 70% of need → NI-1.2 Inadequate energy intake.`);
  f(t.protein<g.protein*.8,"w",`Protein ${Math.round(t.protein)} g is under 80% of RDA (${g.protein} g) → NI-5.7.1 Inadequate protein intake.`);
  f(t.fiber<g.fiber*.7,"w",`Fiber ${t.fiber.toFixed(1)} g is under 70% of target (${g.fiber} g) → NI-5.8.5 Inadequate fiber intake.`);return r}};
const SLOTS=[9,10,11,12,13,14,15,16].map(h=>String(h).padStart(2,"0")+":00");
const ymd=d=>new Date(d.getTime()-d.getTimezoneOffset()*6e4).toISOString().slice(0,10),today=ymd(new Date());
const Appt={free(date){return SLOTS.filter(s=>!DB.appts.some(a=>a.date===date&&a.time===s&&a.status!=="cancelled")&&!(date===today&&s<=new Date().toTimeString().slice(0,5)))},
 canJoin:(a,u)=>a.status==="approved"&&a.room&&(a.pid===u.id||a.prov===u.id)};
