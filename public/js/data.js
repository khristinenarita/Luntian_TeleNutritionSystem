"use strict";
/* ================= DATA LAYER ================= */
const Store={m:{},get(k,d){try{const v=localStorage.getItem("nc2."+k);return v?JSON.parse(v):d}catch(e){return this.m[k]??d}},set(k,v){try{localStorage.setItem("nc2."+k,JSON.stringify(v))}catch(e){this.m[k]=v}}};
const DB={users:Store.get("users",[]),meals:Store.get("meals",[]),appts:Store.get("appts",[]),recs:Store.get("recs",[]),foods:Store.get("foods",[]),
 save(){["users","meals","appts","recs","foods"].forEach(k=>Store.set(k,this[k]))},id(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6)}};
const rnd=n=>[...crypto.getRandomValues(new Uint8Array(n))].map(x=>x.toString(16).padStart(2,"0")).join("");
async function hashPw(pw,salt){const s=salt+pw;if(window.crypto&&crypto.subtle){const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(s));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("")}let h=5381;for(const c of s)h=(h*33^c.charCodeAt(0))>>>0;return"f"+h.toString(16)}
async function mk(name,email,pw,role,profile,consent){const salt=rnd(8),u={id:DB.id(),name,email,role,salt,hash:await hashPw(pw,salt),profile,consent};DB.users.push(u);DB.save();return u}
