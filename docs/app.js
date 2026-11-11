'use strict';
const places=['วัดใหญ่','พระราชวังจันทน์','วัดจุฬามณี','ตลาดใต้'];
const domains=['รับผิดชอบดูแลพื้นที่','มีส่วนร่วมเสนอความคิดเห็น','เห็นคุณค่าชุมชนและเข้าใจประวัติศาสตร์','เคารพความหลากหลาย'];
const phases={pre:'ก่อนเรียน',post:'หลังเรียน'};
const titles={Survey:'แบบวัดก่อน–หลัง',Fieldwork:'บันทึกกลุ่ม',Reflection:'สะท้อนรายบุคคล',Observation:'สังเกตพฤติกรรม',Rubric:'ประเมินผลงานกลุ่ม',InterviewBefore:'สัมภาษณ์ก่อนกิจกรรม',InterviewAfter:'สัมภาษณ์หลังเรียน',Evidence:'หลักฐาน'};
const states={pending:'ยังไม่ยืนยัน',granted:'ยินยอม',declined:'ไม่ยินยอม',withdrawn:'ถอนความยินยอม'};
const observe=['ทำหน้าที่ที่รับผิดชอบตามข้อตกลง','ดูแลพื้นที่ วัสดุ หรือข้อมูลตามกติกาที่กำหนด','เสนอความคิดเห็นหรือคำถามผ่านช่องทางที่จัดให้','ร่วมพิจารณาทางเลือกหรือตัดสินใจโดยให้เหตุผล','อธิบายคุณค่าของสถานที่โดยยกหลักฐานที่เกี่ยวข้อง','เชื่อมเรื่องราวในอดีตกับพื้นที่หรือวิถีชีวิตโดยอ้างหลักฐาน','รับฟังมุมมองต่างและโต้ตอบโดยไม่เหมารวม','เคารพการยินยอมหรือปฏิเสธและเงื่อนไขการใช้ข้อมูล'];
const rubric=['การเชื่อมโยงภูมิศาสตร์และประวัติศาสตร์','การใช้หลักฐานและการให้เหตุผล','การสื่อสารคุณค่าและมุมมองชุมชน','การนำข้อค้นพบไปใช้และสะท้อนผล'];
const rubricLevels=[
 ['เชื่อมที่ตั้ง เวลา วิถีชีวิตหรือเหตุการณ์ และอธิบายด้วยหลักฐาน','เชื่อมพื้นที่กับประวัติศาสตร์ได้ แต่คำอธิบายยังไม่ครบ','มีทั้งแผนที่และข้อมูลประวัติศาสตร์ แต่ส่วนใหญ่แยกกัน','ขาดมิติพื้นที่หรือเวลา หรือคลาดเคลื่อนสำคัญ'],
 ['ข้อสรุปมีหลักฐาน มีที่มา และอธิบายได้ว่าสนับสนุนอย่างไร','หลักฐานส่วนใหญ่เกี่ยวข้อง แต่ที่มาหรือคำอธิบายบางส่วนไม่ครบ','มีหลักฐานบางส่วน แต่ยังเชื่อมกับข้อสรุปไม่ชัด','ข้อสรุปส่วนใหญ่ยังไม่มีหลักฐานที่เกี่ยวข้อง'],
 ['อธิบายคุณค่าด้วยข้อมูลเฉพาะ นำเสนอความต่างอย่างให้เกียรติ','อธิบายคุณค่าชัดและให้เกียรติ แต่มุมมองยังจำกัด','กล่าวถึงคุณค่ากว้าง ๆ ขาดข้อมูลเฉพาะหรือเสียงคนในพื้นที่','ยังไม่แสดงคุณค่าหรือมุมมองชุมชนชัด'],
 ['ลงมือใช้ข้อค้นพบกับผู้รับสารจริง ใช้ข้อคิดเห็นอธิบายการปรับ','นำข้อค้นพบไปใช้กับผู้รับสารจริง แต่ข้อคิดเห็นหรือการสะท้อนยังไม่ครบ','มีผลงานเชื่อมประเด็น แต่ยังไม่มีหลักฐานใช้กับผู้รับสารจริง','แนวทางใช้ยังไม่ชัดหรือยังไม่เชื่อมประเด็นศึกษา']
];
const interviewBefore=['ท่านเกี่ยวข้องกับการเรียนรู้หรือพื้นที่เมืองสองแควอย่างไร และมีประเด็นใดที่ควรให้นักเรียนศึกษา','นักเรียนมีความเข้าใจหรือข้อสงสัยเกี่ยวกับพื้นที่และประวัติศาสตร์อย่างไร และต้องการความช่วยเหลือด้านใด','มีแผนที่ เอกสาร ภาพ ร่องรอย หรือผู้รู้ใดที่ใช้ศึกษาพื้นที่ร่วมกับเรื่องราวในอดีตได้ และควรตรวจที่มาอย่างไร','กิจกรรมใดเปิดโอกาสให้เยาวชนรับผิดชอบ มีส่วนร่วม เห็นคุณค่าชุมชน และรับฟังคนต่างกลุ่มได้จริง','ควรจัดเวลา สื่อ การเข้าพื้นที่ และการติดตามครูรายกลุ่มอย่างไรให้กิจกรรมทำได้จริง'];
const interviewAfter=['เลือกชิ้นงานหนึ่งชิ้นแล้วเล่าว่าตนทำอะไร หลักฐานใดช่วยให้เข้าใจสถานที่ และมีเรื่องใดยังไม่แน่ใจ','มีเหตุการณ์ใดที่ตนทำหน้าที่ ดูแลส่วนรวม หรือร่วมเสนอและตัดสินใจกับผู้อื่น เกิดอะไรขึ้นจริง','เมื่อพบคนหรือข้อมูลที่มีมุมมองต่างกัน ตนคิดและทำอย่างไร และเข้าใจคุณค่าของพื้นที่อย่างไร','กิจกรรมหรือเงื่อนไขใดช่วยหรือทำให้เรียนยาก และอยากนำสิ่งที่รู้ไปใช้หรือปรับกิจกรรมอย่างไร'];
const prompts=['ทำเลริมแม่น้ำ ผังวัด และบทบาทต่อเมืองสัมพันธ์กันอย่างไร','ร่องรอยที่พบ ผังสันนิษฐาน และอนุสรณ์เล่าเรื่องอดีตต่างกันอย่างไร','หลักฐานใดอธิบายความเปลี่ยนแปลงของวัด และเรื่องใดยังสรุปไม่ได้','ตลาดเชื่อมกับแม่น้ำ ถนน และชีวิตผู้คนอย่างไร และมีอะไรเปลี่ยนแปลงไป'];
const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rand=()=>Array.from(crypto.getRandomValues(new Uint8Array(16)),n=>n.toString(16).padStart(2,'0')).join('');
const root=document.getElementById('app'),topbar=document.getElementById('top-actions');
const config=window.TWO_KHWAE_CONFIG?.appsScriptUrl?.trim()||'';
const usable=/^https:\/\/script\.google\.com\/(?:a\/macros\/[^/]+\/s|macros\/s)\/[A-Za-z0-9_-]+\/exec$/.test(config);
let user=null,token='',demo=false,view='home',status={},teacherData={},toast='',busy=false,transport=null,navSerial=0;
let demoRows={},demoFlags={pre:true,post:true},demoConsents={};
const gid=i=>i<=25?Math.ceil(i/5):i<=29?6:i<=34?7:8;
const pOf=g=>places[Math.floor((Number(g.slice(1))-1)/2)]||'';
const rosterDemo=()=>Array.from({length:39},(_,i)=>({id:'SQ'+String(i+1).padStart(3,'0'),group:'G'+gid(i+1),place:pOf('G'+gid(i+1)),consent:demoConsents['SQ'+String(i+1).padStart(3,'0')]||'granted'}));
function bridge(){
  if(transport)return transport;
  let frame,source,origin,resolveReady,rejectReady,handler,timer;
  const nonce=rand(),pending=new Map();
  const ready=new Promise((res,rej)=>{resolveReady=res;rejectReady=rej;});
  // The login form can open the bridge before any request is waiting on it.
  ready.catch(()=>{});
  const clear=()=>{clearTimeout(timer);window.removeEventListener('message',handler);frame?.remove();transport=null;};
  handler=ev=>{
    const m=ev.data;
    if(!/^https:\/\/(?:script\.google\.com|(?:[a-z0-9-]+-)?script\.googleusercontent\.com)$/i.test(ev.origin)||!m||m.channel!=='TWK_BRIDGE_V1'||m.nonce!==nonce)return;
    if(m.type==='ready'&&!source&&ev.source){source=ev.source;origin=ev.origin;clearTimeout(timer);resolveReady();return;}
    if(ev.source!==source||ev.origin!==origin||m.type!=='reply'||!pending.has(m.request))return;
    const cb=pending.get(m.request);pending.delete(m.request);clearTimeout(cb.timer);
    if(m.result?.ok===true)cb.res(m.result.data);else cb.rej(Error(m.result?.error||'Google ส่งผลตอบกลับไม่ครบ'));
  };
  window.addEventListener('message',handler);
  frame=document.createElement('iframe');frame.title='ช่องเชื่อม Google Sheets';frame.src=config+'?n='+nonce;
  timer=setTimeout(()=>{clear();rejectReady(Error('เชื่อมต่อ Apps Script ไม่สำเร็จ ตรวจ URL /exec, PAGES_ORIGIN และสิทธิ์ Anyone'));},18000);
  document.getElementById('bridge-host').append(frame);
  transport=async(action,payload={})=>{const requestToken=token;await ready;return new Promise((res,rej)=>{
    const request=rand();pending.set(request,{res,rej,timer:setTimeout(()=>{pending.delete(request);rej(Error('ยังไม่ได้รับการยืนยัน กรุณากดส่งอีกครั้งโดยใช้ข้อมูลเดิม'));},50000)});
    source.postMessage({channel:'TWK_BRIDGE_V1',nonce,type:'request',request,action,token:requestToken,payload},origin);
  });};
  return transport;
}
function demoCall(a,d){
  if(a==='status'){
    const mine=(demoRows.Survey||[]).filter(r=>r.owner===user.id);
    return {flags:demoFlags,consent:demoConsents[user.id]||'granted',pre:mine.some(r=>r.fields.phase==='pre'),post:mine.some(r=>r.fields.phase==='post'),fieldwork:(demoRows.Fieldwork||[]).length,reflection:(demoRows.Reflection||[]).length};
  }
  if(a==='teacher')return {roster:rosterDemo(),flags:demoFlags,counts:Object.fromEntries(Object.keys(titles).map(k=>[k,demoRows[k]?.length||0])),pairs:[]};
  if(a==='settings'){demoFlags={pre:d.pre,post:d.post};return demoFlags;}
  if(a==='consent'){demoConsents[d.id]=d.state;return {state:d.state};}
  if(a==='save'){
    demoRows[d.type]??=[];if(!demoRows[d.type].some(r=>r.id===d.requestId))demoRows[d.type].push({id:d.requestId,owner:user.id,fields:{...d.fields,fileBase64:undefined}});
    return {id:d.requestId};
  }
  if(a==='rows'){const r=demoRows[d.tab]||[];return {headers:['รหัสรายการ','ผู้กรอก','ข้อมูลทดลอง'],rows:r.slice(d.offset,d.offset+30).map(x=>[x.id,x.owner,JSON.stringify(x.fields)]),total:r.length,offset:d.offset};}
  return {};
}
async function api(a,d){if(demo)return demoCall(a,d);if(!usable)throw Error('ยังไม่ได้ใส่ URL Apps Script ใน config.js');return bridge()(a,d);}
function btn(label,attr='',alt=false){return '<button class="btn'+(alt?' alt':'')+'" '+(attr.includes('type=')?'':'type="button" ')+attr+'>'+e(label)+'</button>';}
function options(a){return a.map(x=>'<option value="'+e(x[0])+'">'+e(x[1])+'</option>').join('');}
function input(name,label,opt={}){
  const wide=opt.wide?' wide':'',hint=opt.hint?'<small>'+e(opt.hint)+'</small>':'',required=opt.optional?'':' required';
  const a=opt.choices?'<select name="'+name+'"'+required+'>'+options(opt.choices)+'</select>':opt.area?'<textarea name="'+name+'" maxlength="'+(opt.max||4000)+'"'+required+'></textarea>':'<input name="'+name+'" type="'+(opt.type||'text')+'"'+(opt.type==='date'?' value="'+new Date().toLocaleDateString('sv-SE',{timeZone:'Asia/Bangkok'})+'"':'')+(opt.type==='file'?' accept="image/jpeg,image/png,image/webp,audio/*,video/*,application/pdf"':' maxlength="'+(opt.max||500)+'"')+required+'>';
  return '<label class="label'+wide+'">'+e(label)+(opt.optional?' <small>(ไม่บังคับ)</small>':'')+hint+a+'</label>';
}
const area=(n,l,h)=>input(n,l,{area:true,wide:true,hint:h});
const optional=(n,l)=>input(n,l,{area:true,wide:true,optional:true});
function section(name,body){return '<fieldset class="section"><legend>'+e(name)+'</legend>'+body+'</fieldset>';}
function feedback(el,msg,t='error'){const p=el.querySelector('.feedback');if(p){p.textContent=msg;p.dataset.tone=t;}}
function header(title,desc){return '<div class="heading"><h2>'+e(title)+'</h2><p class="muted">'+e(desc)+'</p></div>';}
function landing(){
  topbar.innerHTML='<span class="pill">สังคมศึกษา · ม.1</span>';
  root.innerHTML='<div class="wrap landing"><section class="hero"><svg class="terrain" viewBox="0 0 500 500" fill="none" aria-hidden="true"><path d="M380-20c-132 55-98 110-199 146C86 161 203 247 109 291 10 337 117 451-15 519" stroke="#a6ca97" stroke-width="53"/><path d="M380-20c-132 55-98 110-199 146C86 161 203 247 109 291 10 337 117 451-15 519" stroke="#dceca5" stroke-width="1" stroke-dasharray="5 7"/><g stroke="#e9efcf" stroke-width="1" opacity=".55"><path d="M7 90 430 255M11 190 440 348M10 280 460 448M205 18 25 439M325 29 142 462M420 52 260 499"/></g><g fill="#e4efa8"><circle cx="215" cy="138" r="9"/><circle cx="229" cy="241" r="9"/><circle cx="96" cy="318" r="9"/><circle cx="154" cy="410" r="9"/></g></svg><div class="hero-text"><div class="eyebrow">พื้นที่เรียนรู้ · พิษณุโลก</div><h1>ออกสำรวจ<br>เมืองสองแคว</h1><p>ตั้งคำถามจากสถานที่จริง เก็บหลักฐาน แล้วเล่าเรื่องความสัมพันธ์ของพื้นที่ เวลา และผู้คน</p><div class="kicker"><span class="pill dark">39 คน</span><span class="pill dark">8 กลุ่ม</span><span class="pill dark">6 ชั่วโมง</span></div></div><div class="trail">'+places.map((p,i)=>'<div class="place"><b>0'+(i+1)+'</b>'+e(p)+'</div>').join('')+'</div></section><section class="card login-card">'+header('เข้าสมุดภาคสนาม','ใช้รหัสบัญชีและรหัสผ่านที่ครูแจกให้')+'<form id="login" class="stack"><label class="label">รหัสบัญชี<input name="id" autocomplete="username" placeholder="เช่น SQ001" maxlength="24" required></label><label class="label">รหัสผ่าน<input type="password" name="password" autocomplete="current-password" required maxlength="100"></label>'+btn('เข้าสู่ระบบ','type="submit"')+'<p class="feedback" role="status" aria-live="polite"></p></form><div class="intro-note"><p class="small muted">'+(usable?'ทดลองดูหน้าจอก่อนกรอกข้อมูลจริงได้':'ยังไม่ได้ตั้งค่า Apps Script · ทดลองใช้หน้าจอได้โดยไม่เขียนลงชีต')+'</p><div class="row">'+btn('ทดลองแบบนักเรียน','data-demo="student"',true)+btn('ทดลองแบบครู','data-demo="teacher"',true)+'</div></div></section></div>';
  const loginForm=root.querySelector('#login');
  if(usable)loginForm.addEventListener('focusin',()=>bridge(),{once:true});
  loginForm.addEventListener('submit',async ev=>{
    ev.preventDefault();if(busy)return;
    const form=ev.currentTarget,fd=new FormData(form),b=form.querySelector('button');busy=true;b.disabled=true;feedback(form,'กำลังเข้าสู่ระบบ…','ok');
    try{const result=await api('login',{id:fd.get('id'),password:fd.get('password')});token=result.token;user=result.user;}
    catch(err){feedback(form,err.message);b.disabled=false;return;}
    finally{busy=false;}
    await go('home');
  });
}
const menusStudent=[['home','ภาพรวม'],['pre','ก่อนเรียน'],['Fieldwork','บันทึกกลุ่ม'],['Evidence','ส่งหลักฐาน'],['Reflection','สะท้อนรายบุคคล'],['post','หลังเรียน']];
const menusTeacher=[['home','ภาพรวมครู'],['Observation','สังเกตพฤติกรรม'],['Rubric','ประเมินกลุ่ม'],['Evidence','ส่งหลักฐาน'],['InterviewBefore','สัมภาษณ์ก่อน'],['InterviewAfter','สัมภาษณ์หลัง'],['records','ดูข้อมูล'],['controls','ตั้งค่าการเก็บ']];
const studentDataViews=new Set(['home','pre','post']);
const teacherDataViews=new Set(['home','Observation','InterviewAfter','controls']);
async function go(next){
  if(busy)return;
  const req=++navSerial,teacher=user.role==='teacher';view=next;
  try{
    if((teacher?teacherDataViews:studentDataViews).has(next)){
      render('<p class="muted" role="status">กำลังโหลด…</p>',true);
      const data=await api(teacher?'teacher':'status');
      if(req!==navSerial||!user)return;
      if(teacher)teacherData=data;else status=data;
    }
    render(panel());
    if(view==='records')await showRows();
  }catch(err){if(req===navSerial&&user)render('<p class="notice" role="alert">'+e(err.message)+'</p>'+btn('ลองโหลดใหม่','data-view="'+e(next)+'"',true));}
}
function render(body,loading=false){
  topbar.innerHTML=(demo?'<span class="pill demo">โหมดทดลอง</span>':'')+'<span class="pill">'+e(user.id)+(user.group?' · '+e(user.group):'')+'</span>'+btn('ออกจากระบบ','data-logout="1"',true);
  root.innerHTML='<div class="wrap workspace"><aside class="card side"><div class="tagline">'+e(user.place||'เครื่องมือของครู')+'</div><nav class="nav" aria-label="เมนูสมุดภาคสนาม">'+(user.role==='teacher'?menusTeacher:menusStudent).map(([k,l])=>'<button type="button" data-view="'+k+'"'+(k===view?' aria-current="page"':'')+'>'+e(l)+'</button>').join('')+'</nav></aside><section class="card" id="panel">'+(demo?'<div class="notice">โหมดทดลอง · ข้อมูลสมมติจะหายเมื่อปิดหรือโหลดหน้าใหม่ ไม่บันทึกลงชีตจริง</div>':'')+(!loading&&toast?'<p class="toast" role="status">'+e(toast)+'</p>':'')+body+'</section></div>';
  if(!loading)toast='';
}
const fmt=x=>x==null?'—':Number(x).toFixed(2);
function home(){
  if(user.role==='student'){
    const placeIdx=places.indexOf(user.place);
    return header('กลุ่ม '+user.group.slice(1)+' · '+user.place,'เลือกเมนูตามช่วงกิจกรรม ครูเปิดแบบวัดแต่ละช่วงให้เมื่อพร้อม')+
      '<div class="statgrid"><div class="stat"><b>'+(status.pre?'ส่งแล้ว':'—')+'</b>ก่อนเรียน</div><div class="stat"><b>'+e(status.fieldwork||0)+'</b>รายการบันทึกกลุ่ม</div><div class="stat"><b>'+(status.post?'ส่งแล้ว':'—')+'</b>หลังเรียน</div></div>'+
      '<div class="details"><h3>คำถามตั้งต้น</h3><p>'+e(prompts[placeIdx]||'ตั้งคำถามที่เชื่อมสถานที่ เวลา และผู้คน')+'</p><ol class="flow"><li>ตั้งคำถามและฝึกอ่านหลักฐาน · 60 นาที</li><li>สำรวจ เก็บหลักฐาน 2 ชิ้นจากต่างแหล่ง บันทึกอย่างน้อย 3 จุด · 120 นาที</li><li>วิเคราะห์ ทำแผนที่หรือผัง และสร้างเรื่องเล่า · 60 นาที</li><li>สื่อสาร รับข้อคิดเห็น ปรับงาน และสะท้อนผล · 120 นาที</li></ol></div>';
  }
  const c=teacherData.counts||{},sheet=teacherData.url;
  return header('ติดตามการเก็บข้อมูล','นักเรียน 39 คน · 8 กลุ่ม · 4 สถานที่')+
    (sheet?'<p><a class="btn alt" href="'+e(sheet)+'" target="_blank" rel="noopener">เปิด Google Sheets ↗</a></p>':'')+
    '<div class="statgrid"><div class="stat"><b>'+e(c.Survey||0)+'</b>รายการแบบวัด</div><div class="stat"><b>'+e(c.Fieldwork||0)+'</b>รายการบันทึกกลุ่ม</div><div class="stat"><b>'+e(c.Evidence||0)+'</b>รายการหลักฐาน</div></div>'+
    '<h3>คะแนนก่อน–หลังจากคู่ข้อมูลครบ</h3><p class="small muted">คำนวณเฉพาะผู้ที่ยืนยันความยินยอมและมีข้อมูลครบในด้านนั้น ช่องว่างไม่แทนด้วยศูนย์</p>'+
    table(['ด้าน','จำนวนคู่','เฉลี่ยก่อน','SD ก่อน','เฉลี่ยหลัง','SD หลัง','ผลต่างเฉลี่ย','SD ผลต่าง'],(teacherData.pairs||[]).map(r=>[r.domain,r.n,fmt(r.pre),fmt(r.sdPre),fmt(r.post),fmt(r.sdPost),fmt(r.change),fmt(r.sdChange)]));
}
function table(h,rows){return '<div class="table-wrap"><table><thead><tr>'+h.map(x=>'<th scope="col">'+e(x)+'</th>').join('')+'</tr></thead><tbody>'+rows.map(r=>'<tr>'+r.map(x=>'<td>'+e(x)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';}
function rating(items,values,empty,start=0){return '<div class="rate-grid">'+items.map((q,i)=>'<label class="rate"><span><strong>'+(start+i+1)+'.</strong> '+e(q)+'</span><select name="a'+(start+i)+'">'+options([['',empty],...values])+'</select></label>').join('')+'</div>';}
function form(type,inside){return '<form id="save-form" data-type="'+type+'" data-request="'+rand()+'">'+inside+'<div class="form-actions row">'+btn('บันทึกข้อมูล','type="submit"')+'<p class="feedback" role="status" aria-live="polite"></p></div></form>';}
function survey(phase){
  const title='แบบวัดจิตสำนึกพลเมืองท้องถิ่น · '+phases[phase];
  if(status[phase])return header(title,'บันทึกช่วงนี้แล้ว ข้อมูลถูกจับคู่ด้วยรหัสนักเรียนเดิม');
  if(status.consent!=='granted')return header(title,'ยังไม่ได้ยืนยันความยินยอมกับครู คุณยังทำกิจกรรมและส่งงานส่วนอื่นได้');
  if(!status.flags?.[phase])return header(title,'ครูยังไม่เปิดแบบวัดช่วงนี้');
  const v=[[5,'5 · เห็นด้วยอย่างยิ่ง'],[4,'4 · เห็นด้วย'],[3,'3 · ปานกลาง'],[2,'2 · ไม่เห็นด้วย'],[1,'1 · ไม่เห็นด้วยอย่างยิ่ง']];
  return header(title,'เลือกตามความคิดเห็นของตนเอง ข้ามข้อได้ คำตอบส่วนวิจัยไม่กระทบคะแนนเรียน')+form('Survey',domains.map((d,i)=>section(d,rating(SURVEY_ITEMS.slice(i*6,i*6+6),v,'ข้ามข้อนี้',i*6))).join('')+optional('missingReason','หมายเหตุข้อมูลขาด'));
}
function groupInput(){return input('group','กลุ่ม',{choices:[['','เลือกกลุ่ม'],...Array.from({length:8},(_,i)=>['G'+(i+1),'กลุ่ม '+(i+1)+' · '+places[Math.floor(i/2)]])]});}
function studentInput(){return input('student','รหัสนักเรียน',{choices:[['','เลือกนักเรียนที่ยืนยันแล้ว'],...(teacherData.roster||[]).filter(u=>u.consent==='granted').map(u=>[u.id,u.id+' · '+u.group])]});}
function panel(){
  if(view==='home')return home();
  if(phases[view])return survey(view);
  if(view==='Fieldwork')return header('บันทึกกลุ่มประจำสถานที่',user.group+' · '+user.place+' · ให้ตัวแทนส่งกลุ่มละ 1 ชุดต่อฉบับ')+form('Fieldwork',
    section('ข้อมูลการสำรวจ','<div class="grid">'+input('visitDate','วันที่ลงพื้นที่',{type:'date'})+input('area','ขอบเขตหรือช่วงถนนที่สำรวจ')+input('teacherMeeting','นัดพบครู / เวลาพบจริง',{optional:true})+input('teacherGuidance','จุดสังเกตหรือคำชี้แนะของครู',{optional:true})+'</div>')+
    section('1. คำถามและเหตุผล','<div class="grid">'+area('question','กลุ่มเราอยากรู้เรื่องอะไร')+area('why','เหตุผลที่เลือกคำถาม')+'</div>')+
    section('2. หลักฐานจากต่างแหล่ง','<div class="grid">'+area('source1','หลักฐานชิ้นที่ 1','ระบุชื่อ/ไฟล์ ผู้สร้างหรือแหล่ง เวลาเหตุการณ์ วันที่เก็บ และสิ่งที่พบ')+area('source2','หลักฐานชิ้นที่ 2','ใช้ต่างแหล่ง ระบุข้อมูลเช่นเดียวกับชิ้นแรก')+'</div>')+
    section('3. จุดสำรวจและแผนที่','<div class="grid">'+[1,2,3].map(i=>area('point'+i,'จุดสำรวจที่ '+i,'ระบุจุด สิ่งที่พบ และช่วงเวลาที่เกี่ยวข้อง')).join('')+input('map','ชื่อไฟล์หรือลิงก์แผนที่',{optional:true})+input('mapSource','แหล่งแผนที่ ปีข้อมูล ทิศและสัญลักษณ์',{optional:true})+'</div>')+
    section('4. ข้อค้นพบ','<div class="grid">'+area('finding','ข้อค้นพบ 2–4 ประโยค')+area('evidence','หลักฐานที่สนับสนุนหรือขัดแย้ง')+optional('uncertain','เรื่องที่ยังสรุปไม่ได้และสิ่งที่ควรตรวจต่อ')+'</div>')+
    section('5. ทดลองใช้และปรับงาน','<div class="grid">'+area('feedback','ความคิดเห็นจากผู้รับสาร')+area('revision','สิ่งที่กลุ่มปรับและเหตุผล')+area('roles','บทบาทสมาชิก','ระบุรหัสสมาชิก หน้าที่ ตำแหน่งหลักฐาน และความช่วยเหลือ')+'</div>'));
  if(view==='Reflection')return header('สะท้อนการเรียนรู้รายบุคคล','ตอบตามสิ่งที่เกิดขึ้นจริง รวมถึงสิ่งที่ยังไม่แน่ใจหรือยังไม่มีโอกาสทำ')+form(view,'<div class="grid">'+area('myWork','1. วันนี้นักเรียนทำอะไรด้วยตนเอง มีหลักฐานใดแสดงงานของนักเรียน')+area('evidence','2. หลักฐานใดทำให้นักเรียนเข้าใจสถานที่นี้ และเรื่องใดยังสรุปไม่ได้')+area('participation','3. นักเรียนได้เสนอความคิดเห็น รับฟัง หรือร่วมตัดสินใจอย่างไร ถ้ายังไม่มีโอกาสให้บอกตามจริง')+optional('help','ชื่อไฟล์ จุดหลักฐาน หรือความช่วยเหลือที่ได้รับ')+'</div>');
  if(view==='Observation')return header('สังเกตพฤติกรรมพลเมือง','บันทึกพฤติกรรมรายบุคคลที่เห็นจริง แยกคะแนน 0 จากยังไม่ประเมิน')+form(view,'<div class="grid line">'+studentInput()+input('observer','ผู้สังเกต')+input('date','วันที่',{type:'date'})+input('spot','สถานที่และจุดศึกษา')+input('start','เวลาเริ่ม',{type:'time'})+input('end','เวลาสิ้นสุด',{type:'time'})+input('stage','ช่วงกิจกรรม',{choices:['เตรียมงาน','สำรวจภาคสนาม','อภิปราย','นำเสนอ/ทดลองใช้'].map(v=>[v,v])})+input('opportunity','งานและโอกาสที่จัดให้')+'</div>'+section('รายการสังเกต 8 ข้อ',rating(observe,[[3,'3 · ทำเองและมีเหตุผล'],[2,'2 · ทำเองตามโอกาส'],[1,'1 · ทำเมื่อชวน/เตือน'],[0,'0 · มีโอกาสแต่ไม่พบ']],'ยังไม่ประเมิน'))+'<div class="grid">'+area('event','เหตุการณ์หรือคำพูดที่เห็นจริง')+optional('notObserved','เหตุผลของข้อที่ยังไม่ประเมิน')+optional('guidance','คำชี้แนะและการตอบสนอง')+'</div>');
  if(view==='Rubric')return header('ประเมินแผนที่เรื่องเล่าของกลุ่ม','ให้ 1–4 ตามเกณฑ์ หากหลักฐานยังไม่พอให้รอประเมิน')+form(view,'<div class="grid line">'+groupInput()+input('assessor','ผู้ประเมิน')+input('edition','ฉบับผลงาน')+'</div>'+rubric.map((r,i)=>section(r,'<div class="details"><details><summary>ดูคำอธิบายระดับคะแนน</summary><ol reversed>'+rubricLevels[i].map(s=>'<li>'+e(s)+'</li>').join('')+'</ol></details></div>'+rating([r],[[4,'4'],[3,'3'],[2,'2'],[1,'1']],'รอประเมิน',i))).join('')+area('reason','เหตุผลและตำแหน่งหลักฐาน'));
  if(view==='InterviewBefore'||view==='InterviewAfter'){
    const before=view==='InterviewBefore',qs=before?interviewBefore:interviewAfter;
    return header(titles[view],'จดคำตอบตามจริงและระบุที่มาของหลักฐานเมื่อมี')+form(view,'<div class="grid line">'+(before?input('participant','รหัสผู้ให้ข้อมูล')+input('participantRole','บทบาทผู้ให้ข้อมูล'):studentInput())+input('date','วันที่',{type:'date'})+input('method','วิธีบันทึก',{choices:[['จด','จด'],['เสียง','เสียง']]})+'</div><label class="scope"><input type="checkbox" name="consent" required> ยืนยันว่าได้รับความยินยอมตามขอบเขตการบันทึก</label><div class="grid">'+qs.map((q,i)=>optional('q'+(i+1),(i+1)+'. '+q)).join('')+'</div>');
  }
  if(view==='Evidence')return header('แนบหลักฐานการเรียนรู้','รองรับภาพ เสียง วิดีโอ และ PDF ไม่เกิน 6 MB ต่อรายการ ไฟล์ใหญ่ให้ใช้ลิงก์ Drive ที่ครูมีสิทธิ์เปิด')+form(view,'<div class="grid">'+(user.role==='teacher'?groupInput():'')+input('filename','ชื่อหลักฐาน',{max:100})+input('date','วันที่เก็บ',{type:'date'})+input('source','ที่มาของหลักฐาน')+input('permission','ขอบเขตที่อนุญาตให้ใช้')+input('file','เลือกไฟล์',{type:'file',optional:true,wide:true})+input('url','หรือลิงก์ Google Drive / Docs',{type:'url',max:700,optional:true,wide:true})+'</div>');
  if(view==='records')return header('ดูข้อมูลที่บันทึก','ดูแต่ละประเภททีละ 30 รายการ หรือเปิดชีตเพื่ออ่านทั้งหมด')+'<div class="grid">'+input('table','ประเภทข้อมูล',{choices:Object.keys(titles).map(k=>[k,titles[k]])})+'</div><div id="records" aria-live="polite"></div>';
  if(view==='controls')return header('ตั้งค่าการเก็บข้อมูล','เปิดช่วงเก็บก่อนหรือหลังตามกิจกรรม และยืนยันเฉพาะรายการที่ตรวจสอบความยินยอมจริง')+
    '<form id="flags" class="line"><label class="scope"><input type="checkbox" name="pre"'+(teacherData.flags?.pre?' checked':'')+'> เปิดแบบวัดก่อนเรียน</label><label class="scope"><input type="checkbox" name="post"'+(teacherData.flags?.post?' checked':'')+'> เปิดแบบวัดหลังเรียน</label>'+btn('บันทึกช่วงเก็บ','type="submit"')+'<p class="feedback" role="status"></p></form>'+
    '<h3>สถานะความยินยอมรายคน</h3><div class="stack">'+(teacherData.roster||[]).map(u=>'<form class="consent" data-account="'+e(u.id)+'"><div class="roster-row"><strong>'+e(u.id)+' · '+e(u.group)+' · '+e(u.place)+'</strong><label class="label">สถานะ<select name="state">'+Object.entries(states).map(([k,l])=>'<option value="'+k+'"'+(k===u.consent?' selected':'')+'>'+l+'</option>').join('')+'</select></label>'+btn('ยืนยัน','type="submit"',true)+'</div><p class="feedback" role="status"></p></form>').join('')+'</div>';
  return '';
}
async function showRows(offset=0){
  const host=document.getElementById('records'),sel=root.querySelector('[name=table]');if(!host||!sel)return;
  const tab=sel.value,serial=++navSerial;host.textContent='กำลังโหลด…';
  try{const r=await api('rows',{tab,offset});if(serial!==navSerial||!host.isConnected)return;
    host.innerHTML=(r.rows.length?table(r.headers,r.rows):'<p class="caption">ยังไม่มีข้อมูล</p>')+'<div class="row"><p class="caption">ทั้งหมด '+e(r.total)+' รายการ</p>'+(r.offset>0?btn('ก่อนหน้า','data-page="'+Math.max(0,r.offset-30)+'"',true):'')+(r.offset+r.rows.length<r.total?btn('ถัดไป','data-page="'+(r.offset+r.rows.length)+'"',true):'')+'</div>';
  }catch(err){if(host.isConnected)host.textContent=err.message;}
}
const readFile=file=>new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(String(r.result).split(',')[1]);r.onerror=()=>reject(Error('อ่านไฟล์ไม่สำเร็จ'));r.readAsDataURL(file);});
async function saveForm(formEl){
  const fd=new FormData(formEl),type=formEl.dataset.type,fields={};
  for(const [k,v] of fd)if(typeof v==='string'&&!/^a\d+$/.test(k))fields[k]=v;
  const count={Survey:24,Observation:8,Rubric:4}[type];
  if(count)fields.answers=Array.from({length:count},(_,i)=>fd.get('a'+i)===''?null:Number(fd.get('a'+i)));
  if(type==='Survey')fields.phase=view;
  if(type.startsWith('Interview'))fields.consent=fd.has('consent');
  if(type==='Evidence'){
    const file=fd.get('file');if(file?.size&&fields.url)throw Error('เลือกไฟล์หรือลิงก์อย่างใดอย่างหนึ่ง');
    if(file?.size){if(file.size>6*1024*1024)throw Error('ไฟล์ใหญ่เกิน 6 MB กรุณาใช้ลิงก์ Drive');fields.mime=file.type;fields.fileBase64=await readFile(file);}
    else if(!fields.url)throw Error('เลือกไฟล์หรือใส่ลิงก์ Google Drive');
  }
  if(type==='Survey'&&fields.answers.every(x=>x===null))throw Error('หากไม่ประสงค์ตอบทั้งฉบับ ไม่ต้องส่งแบบวัด');
  const r=await api('save',{type,requestId:formEl.dataset.request,fields});
  if(!r?.id)throw Error('ไม่ได้รับเลขรายการยืนยัน');
  return 'บันทึกแล้ว · เลขรายการ '+r.id.slice(0,8).toUpperCase()+(demo?' (ทดลอง)':'');
}
document.addEventListener('click',async ev=>{
  const b=ev.target.closest('button');if(!b||busy)return;
  if(b.dataset.demo){demo=true;const t=b.dataset.demo==='teacher';user={id:t?'TEACHER':'SQ001',role:t?'teacher':'student',group:t?'':'G1',place:t?'':'วัดใหญ่'};await go('home');}
  if(b.dataset.view)await go(b.dataset.view);
  if(b.dataset.page!==undefined)await showRows(Number(b.dataset.page));
  if(b.dataset.logout){if(!demo)api('logout').catch(()=>{});++navSerial;user=null;token='';demo=false;landing();}
});
root.addEventListener('change',ev=>{if(ev.target.name==='table')showRows();});
root.addEventListener('submit',async ev=>{
  const f=ev.target;if(f.id==='login')return;ev.preventDefault();if(busy)return;
  busy=true;const b=f.querySelector('button[type=submit]');if(b)b.disabled=true;feedback(f,'กำลังบันทึก…','ok');
  let next=null;
  try{
    if(f.id==='save-form'){toast=await saveForm(f);next=view;}
    if(f.id==='flags'){const d=new FormData(f);await api('settings',{pre:d.has('pre'),post:d.has('post')});feedback(f,'บันทึกสถานะแล้ว','ok');}
    if(f.classList.contains('consent')){await api('consent',{id:f.dataset.account,state:new FormData(f).get('state')});feedback(f,'บันทึกสถานะแล้ว','ok');}
  }catch(err){feedback(f,err.message);}
  finally{busy=false;if(b)b.disabled=false;}
  if(next)await go(next);
});
landing();
