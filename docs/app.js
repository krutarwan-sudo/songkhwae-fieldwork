'use strict';
const places=['วัดใหญ่','พระราชวังจันทน์','วัดจุฬามณี','ตลาดใต้'];
const fieldMaps={
  'วัดใหญ่':{file:'wat-yai',examples:'วิหารพระพุทธชินราช · พระปรางค์ประธาน · บริเวณริมแม่น้ำน่าน'},
  'พระราชวังจันทน์':{file:'chan-palace',examples:'แนวฐานพระราชวังจันทน์ · ศาลสมเด็จพระนเรศวรมหาราช · ศูนย์ประวัติศาสตร์พระราชวังจันทน์'},
  'วัดจุฬามณี':{file:'wat-chulamani',examples:'บริเวณวัด · เขตโบราณสถาน · ชุมชนวัดจุฬามณี'},
  'ตลาดใต้':{file:'talat-tai',examples:'ตลาดเทศบาล 1 · ย่านร้านค้าตลาดใต้ · แนวริมแม่น้ำน่าน'}
};
const domains=['รับผิดชอบดูแลพื้นที่','มีส่วนร่วมเสนอความคิดเห็น','เห็นคุณค่าชุมชนและเข้าใจประวัติศาสตร์','เคารพความหลากหลาย'];
const phases={pre:'ก่อนเรียน',post:'หลังเรียน'};
const titles={Survey:'แบบวัดก่อน–หลัง',Fieldwork:'บันทึกกลุ่ม',Reflection:'สะท้อนรายบุคคล',Observation:'สังเกตพฤติกรรม',Rubric:'ประเมินผลงานกลุ่ม',InterviewBefore:'สัมภาษณ์ก่อนกิจกรรม',InterviewAfter:'สัมภาษณ์หลังเรียน',Evidence:'หลักฐาน'};
const recordLabels={requestId:'เลขรายการ',savedAt:'เวลาที่บันทึก',student:'รหัสนักเรียน',author:'ผู้ส่ง',teacher:'รหัสครู',group:'กลุ่ม',place:'สถานที่',phase:'ช่วงเก็บข้อมูล',version:'รุ่นแบบวัด',D1:'คะแนนด้าน 1',D2:'คะแนนด้าน 2',D3:'คะแนนด้าน 3',D4:'คะแนนด้าน 4',total:'คะแนนรวม',missingReason:'เหตุผลที่ข้อมูลไม่ครบ',visitDate:'วันที่ลงพื้นที่',area:'ขอบเขตสำรวจ',teacherMeeting:'การนัดหมายครู',teacherGuidance:'ข้อเสนอแนะของครู',question:'คำถามของกลุ่ม',why:'เหตุผลที่เลือก',source1:'หลักฐานชิ้นที่ 1',source2:'หลักฐานชิ้นที่ 2',point1:'จุดสำรวจที่ 1',point2:'จุดสำรวจที่ 2',point3:'จุดสำรวจที่ 3',map:'แผนที่',mapSource:'แหล่งแผนที่',finding:'ข้อค้นพบ',evidence:'หลักฐานประกอบ',uncertain:'สิ่งที่ยังไม่แน่ใจ',feedback:'ข้อคิดเห็น',revision:'สิ่งที่ปรับ',roles:'บทบาทสมาชิก',myWork:'งานที่ทำ',participation:'การมีส่วนร่วม',help:'ความช่วยเหลือ',date:'วันที่',observer:'ผู้สังเกต',spot:'จุดศึกษา',start:'เวลาเริ่ม',end:'เวลาสิ้นสุด',stage:'ช่วงกิจกรรม',opportunity:'โอกาสที่จัดให้',event:'เหตุการณ์ที่สังเกต',notObserved:'เหตุผลที่ไม่ได้ประเมิน',guidance:'แนวทางช่วยเหลือ',assessor:'ผู้ประเมิน',edition:'ฉบับผลงาน',geoHistory:'ภูมิศาสตร์และประวัติศาสตร์',community:'สื่อสารคุณค่าและมุมมองชุมชน',action:'การนำไปใช้และสะท้อนผล',reason:'เหตุผลและหลักฐาน',participant:'รหัสผู้ให้ข้อมูล',participantRole:'บทบาทผู้ให้ข้อมูล',method:'วิธีบันทึก',filename:'ชื่อหลักฐาน',mime:'ประเภทไฟล์',bytes:'ขนาด (ไบต์)',source:'ที่มา',permission:'ขอบเขตการใช้'};
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
const workspaceBanner=document.getElementById('workspace-banner'),routeTitle=document.getElementById('route-title');
const configuredUrl=window.TWO_KHWAE_CONFIG?.appsScriptUrl;
const config=typeof configuredUrl==='string'?configuredUrl.trim():'';
const usable=/^https:\/\/script\.google\.com\/(?:a\/macros\/[^/]+\/s|macros\/s)\/[A-Za-z0-9_-]+\/exec$/.test(config);
const localPreview=window.location?.protocol==='file:';
const directMode=window.TWO_KHWAE_DIRECT===true;
const bridgeWaitMs=[22000,30000];
let user=null,token='',demo=false,view='home',status={},teacherData={},toast='',busy=false,transport=null,navSerial=0;
let motionPaused=false;
let recordTab='Survey',recordMode='summary',recordPhase='pre',recordResult=null;
let demoRows={},demoFlags={pre:true,post:true},demoConsents={};
const gid=i=>i<=25?Math.ceil(i/5):i<=29?6:i<=34?7:8;
const pOf=g=>places[Math.floor((Number(g.slice(1))-1)/2)]||'';
const rosterDemo=()=>Array.from({length:39},(_,i)=>({id:'SQ'+String(i+1).padStart(3,'0'),group:'G'+gid(i+1),place:pOf('G'+gid(i+1)),consent:demoConsents['SQ'+String(i+1).padStart(3,'0')]||'granted'}));
function bridge(){
  if(transport)return transport;
  let frame,source,origin,nonce,resolveReady,rejectReady,timer;
  const pending=new Map();
  const ready=new Promise((res,rej)=>{resolveReady=res;rejectReady=rej;});
  // The login form can open the bridge before any request is waiting on it.
  ready.catch(()=>{});
  const removeFrame=()=>{clearTimeout(timer);frame?.remove();frame=null;};
  const clear=()=>{
    removeFrame();window.removeEventListener('message',handler);
    if(transport===send)transport=null;
  };
  const connectionError='ยังเชื่อมต่อ Apps Script ไม่ได้หลังลองใหม่แล้ว กรุณากด “ตรวจการเชื่อมต่อ” อีกครั้ง หากยังไม่ได้ให้แจ้งครูผู้ดูแลเว็บ';
  const handler=ev=>{
    const m=ev.data;
    if(!/^https:\/\/(?:script\.google\.com|(?:[a-z0-9-]+-)?script\.googleusercontent\.com)$/i.test(ev.origin)||!m||m.channel!=='TWK_BRIDGE_V1'||m.nonce!==nonce)return;
    if(m.type==='ready'&&!source&&ev.source){source=ev.source;origin=ev.origin;clearTimeout(timer);resolveReady();return;}
    if(ev.source!==source||ev.origin!==origin||m.type!=='reply'||!pending.has(m.request))return;
    const cb=pending.get(m.request);pending.delete(m.request);clearTimeout(cb.timer);
    if(m.result?.ok===true)cb.res(m.result.data);else cb.rej(Error(m.result?.error||'Google ส่งผลตอบกลับไม่ครบ'));
  };
  const openAttempt=attempt=>{
    removeFrame();
    send.attempt=attempt;
    nonce=rand();
    frame=document.createElement('iframe');frame.title='ช่องเชื่อม Google Sheets';frame.src=config+'?n='+nonce;
    timer=setTimeout(()=>{
      if(attempt+1<bridgeWaitMs.length)openAttempt(attempt+1);
      else{clear();rejectReady(Error(connectionError));}
    },bridgeWaitMs[attempt]);
    document.getElementById('bridge-host').append(frame);
    if(attempt)send.onRetry?.();
  };
  const send=async(action,payload={})=>{const requestToken=token;await ready;return new Promise((res,rej)=>{
    const request=rand(),message=action==='login'?'เชื่อมต่อ Apps Script แล้ว แต่ยังไม่ได้ผลตรวจรหัส กรุณาลองเข้าสู่ระบบอีกครั้ง':action==='save'?'ยังไม่ได้รับการยืนยัน กรุณากดส่งอีกครั้งโดยใช้ข้อมูลเดิม':'Google ยังไม่ส่งข้อมูลกลับมา กรุณาลองโหลดใหม่';
    const timer=setTimeout(()=>{
      pending.delete(request);
      if(action==='login'&&!pending.size)clear();
      rej(Error(message));
    },action==='login'?30000:50000);
    pending.set(request,{res,rej,timer});
    try{source.postMessage({channel:'TWK_BRIDGE_V1',nonce,type:'request',request,action,token:requestToken,payload},origin);}
    catch{pending.delete(request);clearTimeout(timer);rej(Error('ส่งคำขอไป Apps Script ไม่สำเร็จ กรุณารีเฟรชแล้วลองอีกครั้ง'));}
  });};
  send.ready=ready;
  transport=send;
  window.addEventListener('message',handler);
  openAttempt(0);
  return send;
}
// BEGIN RECORD SUMMARY: shared with the local demo.
const summaryKeys_=(prefix,n)=>Array.from({length:n},(_,i)=>prefix+(prefix==='Q'?String(i+1).padStart(2,'0'):i+1));
const summarySpecs_={
  Survey:{categories:['group','place'],ratings:summaryKeys_('Q',24),min:1,max:5,text:['missingReason']},
  Fieldwork:{categories:['group','place'],text:['visitDate','area','teacherMeeting','teacherGuidance','question','why','source1','source2','point1','point2','point3','map','mapSource','finding','evidence','uncertain','feedback','revision','roles']},
  Reflection:{categories:['group','place'],text:['myWork','evidence','participation','help']},
  Observation:{categories:['stage','group','place'],ratings:summaryKeys_('O',8),min:0,max:3,text:['date','spot','start','end','opportunity','event','notObserved','guidance']},
  Rubric:{categories:['group','place'],ratings:['geoHistory','evidence','community','action'],min:1,max:4,text:['edition','reason']},
  InterviewBefore:{categories:['method'],text:['date','participantRole',...summaryKeys_('q',5)]},
  InterviewAfter:{categories:['method','group','place'],text:['date',...summaryKeys_('q',4)]},
  Evidence:{categories:['mime','group','place'],text:[]}
};
const summarySampleLimit_=5;
function summaryString_(v){
  return v instanceof Date?(Number.isNaN(v.valueOf())?'':v.toISOString()):String(v==null?'':v).trim();
}
function evidenceKind_(mime){
  mime=summaryString_(mime).toLowerCase();
  return mime.startsWith('image/')?'ภาพ':mime.startsWith('audio/')?'เสียง':mime.startsWith('video/')?'วิดีโอ':mime==='application/pdf'?'PDF':'ไฟล์หรือลิงก์อื่น';
}
function summarizeRecords_(tab,headers,rows){
  const spec=summarySpecs_[tab],index=Object.fromEntries(headers.map((k,i)=>[k,i]));
  const categoryKeys=spec.categories,ratingKeys=spec.ratings||[],textKeys=spec.text;
  const empty=()=>({total:0,categories:categoryKeys.map(key=>({key,counts:new Map()})),
    ratings:ratingKeys.map(key=>({key,min:spec.min,counts:Array(spec.max-spec.min+1).fill(0)})),
    text:textKeys.map(key=>({key,count:0,samples:[]}))});
  const all=empty(),phases=tab==='Survey'?{pre:empty(),post:empty(),other:empty()}:null,recent=[];
  let total=0;
  for(let i=rows.length-1;i>=0;i--){
    const row=rows[i],value=key=>row[index[key]];
    if(!row.some(v=>summaryString_(v)!==''))continue;
    total++;
    const phase=value('phase'),bucket=phases?(phase==='pre'?phases.pre:phase==='post'?phases.post:phases.other):all;
    bucket.total++;
    for(const c of bucket.categories){
      const label=c.key==='mime'?evidenceKind_(value('mime')):summaryString_(value(c.key));
      if(label)c.counts.set(label,(c.counts.get(label)||0)+1);
    }
    for(const r of bucket.ratings){
      const raw=summaryString_(value(r.key)),score=Number(raw);
      if(raw!==''&&Number.isInteger(score)&&score>=spec.min&&score<=spec.max)r.counts[score-spec.min]++;
    }
    for(const t of bucket.text){
      const answer=summaryString_(value(t.key));
      if(!answer)continue;
      t.count++;
      if(t.samples.length<summarySampleLimit_)t.samples.push(answer.length>320?Array.from(answer.slice(0,322)).slice(0,320).join('')+'…':answer);
    }
    if(tab==='Evidence'&&recent.length<summarySampleLimit_)recent.push(row);
  }
  const finish=bucket=>({total:bucket.total,ratings:bucket.ratings,text:bucket.text,
    categories:bucket.categories.map(({key,counts})=>{
      const ordered=Array.from(counts,([label,count])=>({label,count})).sort((a,b)=>b.count-a.count||a.label.localeCompare(b.label,'th'));
      const items=ordered.slice(0,8),n=ordered.reduce((sum,item)=>sum+item.count,0);
      if(ordered.length>8)items.push({label:'หมวดอื่น ๆ รวมกัน',count:ordered.slice(8).reduce((sum,item)=>sum+item.count,0)});
      return {key,items,n};
    })});
  const groups=phases?Object.fromEntries(Object.entries(phases).filter(([key,b])=>key!=='other'||b.total).map(([key,b])=>[key,finish(b)])):{all:finish(all)};
  return {total,groups,recent};
}
// END RECORD SUMMARY

function demoCall(a,d){
  if(a==='status'){
    const mine=(demoRows.Survey||[]).filter(r=>r.owner===user.id);
    return {flags:demoFlags,consent:demoConsents[user.id]||'granted',pre:mine.some(r=>r.fields.phase==='pre'),post:mine.some(r=>r.fields.phase==='post'),fieldwork:(demoRows.Fieldwork||[]).length,reflection:(demoRows.Reflection||[]).length};
  }
  if(a==='teacher')return {roster:rosterDemo(),flags:demoFlags,counts:Object.fromEntries(Object.keys(titles).map(k=>[k,demoRows[k]?.length||0])),pairs:[]};
  if(a==='settings'){demoFlags={pre:d.pre,post:d.post};return demoFlags;}
  if(a==='consent'){demoConsents[d.id]=d.state;return {state:d.state};}
  if(a==='save'){
    demoRows[d.type]??=[];
    if(!demoRows[d.type].some(r=>r.id===d.requestId)){
      const fields={...d.fields},member=rosterDemo().find(r=>r.id===fields.student);
      fields.group=user.group||member?.group||fields.group;
      fields.place=user.place||member?.place||pOf(fields.group||'');
      delete fields.fileBase64;
      for(const [i,key] of (summarySpecs_[d.type]?.ratings||[]).entries())fields[key]=fields.answers?.[i]??'';
      delete fields.answers;
      demoRows[d.type].push({id:d.requestId,owner:user.id,fields});
    }
    return {id:d.requestId};
  }
  if(a==='rows'){
    const r=demoRows[d.tab]||[],offset=d.offset||0,page=d.mode==='summary'?r:r.slice(offset,offset+30);
    const headers=['requestId','author',...new Set(page.flatMap(x=>Object.keys(x.fields)))];
    const rows=page.map(x=>headers.map(k=>k==='requestId'?x.id:k==='author'?x.owner:x.fields[k]??''));
    if(d.mode==='summary'){
      const {total,groups,recent}=summarizeRecords_(d.tab,headers,rows);
      return {headers,total,summary:groups,rows:recent,sampleLimit:summarySampleLimit_};
    }
    return {headers,rows,total:r.length,offset};
  }
  return {};
}
function directRpc(action,payload={}){
  const runner=window.google?.script?.run;
  if(!runner)return Promise.reject(Error('หน้านี้ต้องเปิดจากลิงก์ Web app ของ Apps Script'));
  return new Promise((resolve,reject)=>{
    const timer=setTimeout(()=>reject(Error(action==='save'?'ยังไม่ได้รับการยืนยัน กรุณากดส่งอีกครั้งโดยใช้ข้อมูลเดิม':'Apps Script ยังไม่ตอบ กรุณาลองใหม่')),action==='login'||action==='ping'?30000:50000);
    const finish=fn=>value=>{clearTimeout(timer);fn(value);};
    try{
      runner.withSuccessHandler(finish(result=>{
        if(result?.ok===true)resolve(result.data);
        else reject(Error(result?.error||'Google ส่งผลตอบกลับไม่ครบ'));
      })).withFailureHandler(finish(()=>reject(Error('Apps Script ติดต่อระบบไม่สำเร็จ ให้เจ้าของเว็บตรวจสิทธิ์ของ Web app'))))
        .rpc(action,token,payload);
    }catch(err){clearTimeout(timer);reject(err);}
  });
}
async function api(a,d){if(demo)return demoCall(a,d);return loginBridge()(a,d);}
function loginBridge(){
  if(directMode)return directRpc;
  if(localPreview)throw Error('หน้านี้เปิดจากไฟล์ในเครื่อง ให้เปิดลิงก์ GitHub Pages เพื่อเข้าสู่ระบบจริง');
  if(!usable)throw Error('ยังไม่ได้ตั้งค่า URL /exec ใน docs/config.js ให้ใช้ไฟล์ config.js เดิมของเว็บ');
  return bridge();
}
async function readyToSignIn(form){
  const send=loginBridge();
  if(directMode)return send;
  const announce=()=>feedback(form,'Apps Script ตอบช้า กำลังเชื่อมต่อใหม่ให้อีกครั้ง…','ok');
  send.onRetry=announce;
  if(send.attempt)announce();
  try{await send.ready;return send;}
  finally{send.onRetry=null;}
}
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
  if(workspaceBanner)workspaceBanner.hidden=true;
  document.body.classList.remove('workspace-open');
  topbar.innerHTML='<span class="pill">สังคมศึกษา · ม.1</span>';
  root.innerHTML=`<div class="wrap landing">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-art" aria-hidden="true"></div>
      <button class="motion-toggle" type="button" data-motion aria-pressed="${motionPaused}">พักภาพเคลื่อนไหว</button>
      <div class="hero-text">
        <div class="eyebrow">สมุดสำรวจท้องถิ่น · พิษณุโลก</div>
        <h1 id="hero-title">ออกสำรวจ<br><span>เมืองสองแคว</span></h1>
        <p>ตามรอยเมืองเก่า เก็บหลักฐาน และเล่าเรื่องของสถานที่ เวลา และผู้คน</p>
        <div class="kicker"><span class="pill dark">39 คน</span><span class="pill dark">8 กลุ่ม</span><span class="pill dark">6 ชั่วโมง</span></div>
      </div>
      <div class="trail">
        <span class="trail-label">เส้นทางสำรวจ 4 แห่ง</span>
        <div class="trail-grid">${places.map((p,i)=>'<div class="place"><b>0'+(i+1)+'</b>'+e(p)+'</div>').join('')}</div>
      </div>
    </section>
    <section class="card login-card">
      <div class="login-stamp"><img src="./assets/songkhwae-mark.svg" alt="" width="39" height="39"> ห้องเรียนภาคสนาม</div>
      ${header('เข้าสมุดภาคสนาม','ใช้รหัสบัญชีและรหัสผ่านที่ครูแจกให้')}
      <form id="login" class="stack">
        <label class="label">รหัสบัญชี<input name="id" autocomplete="username" placeholder="เช่น SQ001" maxlength="24" required></label>
        <label class="label">รหัสผ่าน<input type="password" name="password" autocomplete="current-password" required maxlength="100"></label>
        ${btn('เข้าสู่ระบบ','type="submit"')}
        ${directMode||(usable&&!localPreview)?'<button class="btn alt small" type="button" data-check-connection>ตรวจการเชื่อมต่อ</button>':''}
        <p class="feedback" role="status" aria-live="polite"></p>
      </form>
      <div class="intro-note">
        <p class="small muted">${directMode?'ทางเข้าสำรองผ่าน Apps Script · ใช้รหัสเดิมได้':usable?'ทดลองดูหน้าจอก่อนกรอกข้อมูลจริงได้':'ยังไม่ได้ตั้งค่า Apps Script · ทดลองใช้หน้าจอได้โดยไม่เขียนลงชีต'}</p>
        <div class="row">${btn('ทดลองแบบนักเรียน','data-demo="student"',true)}${btn('ทดลองแบบครู','data-demo="teacher"',true)}</div>
      </div>
    </section>
  </div>`;
  const loginForm=root.querySelector('#login');
  if(usable&&!localPreview)loginForm.addEventListener('focusin',()=>bridge(),{once:true});
  loginForm.querySelector('[data-check-connection]')?.addEventListener('click',async ev=>{
    if(busy)return;
    const b=ev.currentTarget;b.disabled=true;busy=true;
    feedback(loginForm,'กำลังตรวจการเชื่อมต่อ Apps Script…','ok');
    try{
      const send=await readyToSignIn(loginForm);
      if(directMode)await send('ping');
      feedback(loginForm,'เชื่อมต่อ Apps Script ได้แล้ว ลองกดเข้าสู่ระบบเพื่อตรวจรหัส','ok');
    }
    catch(err){feedback(loginForm,err.message);}
    finally{b.disabled=false;busy=false;}
  });
  loginForm.addEventListener('submit',async ev=>{
    ev.preventDefault();if(busy)return;
    const form=ev.currentTarget,fd=new FormData(form),b=form.querySelector('[type=submit]');busy=true;b.disabled=true;feedback(form,'กำลังเชื่อมต่อ Apps Script…','ok');
    try{
      const send=await readyToSignIn(form);
      feedback(form,'เชื่อมต่อแล้ว กำลังตรวจรหัสบัญชี…','ok');
      const result=await send('login',{id:fd.get('id'),password:fd.get('password')});
      if(!result?.token||!result.user)throw Error('Apps Script ตอบกลับไม่ครบ กรุณาลองอีกครั้ง');
      token=result.token;user=result.user;
    }
    catch(err){feedback(form,err.message);b.disabled=false;return;}
    finally{busy=false;}
    await go('home');
  });
}
const menusStudent=[['home','ภาพรวม'],['pre','ก่อนเรียน'],['Fieldwork','บันทึกกลุ่ม'],['Evidence','ส่งหลักฐาน'],['Reflection','สะท้อนรายบุคคล'],['post','หลังเรียน']];
const menusTeacher=[['home','ภาพรวมครู'],['Observation','สังเกตพฤติกรรม'],['Rubric','ประเมินกลุ่ม'],['Evidence','ส่งหลักฐาน'],['InterviewBefore','สัมภาษณ์ก่อน'],['InterviewAfter','สัมภาษณ์หลัง'],['records','ดูข้อมูล'],['controls','ตั้งค่าการเก็บ']];
const studentDataViews=new Set(['home','pre','post']);
const teacherDataViews=new Set(['home','Observation','InterviewAfter','controls']);
const routeScenes={home:'temple',pre:'temple',post:'river',Fieldwork:'market',Evidence:'river',Reflection:'river',Observation:'market',Rubric:'temple',InterviewBefore:'market',InterviewAfter:'market',records:'river',controls:'temple'};
async function go(next,initialData){
  if(busy||!user)return;
  const req=++navSerial,teacher=user.role==='teacher';view=next;
  try{
    if((teacher?teacherDataViews:studentDataViews).has(next)){
      const scope=next==='home'||next==='controls'?next:teacher?'roster':'survey';
      let data=initialData;
      if(!data){
        render('<p class="muted" role="status">'+(next==='home'?'เข้าสู่ระบบแล้ว กำลังโหลดภาพรวม…':'กำลังโหลด…')+'</p>',true);
        data=await api(teacher?'teacher':'status',{view:scope});
      }
      if(req!==navSerial||!user)return;
      if(teacher)teacherData=data;else status=data;
    }
    render(panel());
    if(view==='records')await showRows();
  }catch(err){if(req===navSerial&&user)render('<p class="notice" role="alert">'+e(err.message)+'</p>'+btn('ลองโหลดใหม่','data-view="'+e(next)+'"',true));}
}
function render(body,loading=false){
  const menus=user.role==='teacher'?menusTeacher:menusStudent;
  if(workspaceBanner?.hidden){
    workspaceBanner.hidden=false;
    document.body.classList.add('workspace-open');
  }
  if(workspaceBanner)workspaceBanner.dataset.scene=routeScenes[view]||'temple';
  if(routeTitle)routeTitle.textContent=menus.find(([k])=>k===view)?.[1]||'สมุดภาคสนาม';
  topbar.innerHTML=(demo?'<span class="pill demo">โหมดทดลอง</span>':'')+'<span class="pill">'+e(user.id)+(user.group?' · '+e(user.group):'')+'</span>'+btn('ออกจากระบบ','data-logout="1"',true);
  root.innerHTML='<div class="wrap workspace"><aside class="card side"><div class="tagline">'+e(user.place||'เครื่องมือของครู')+'</div><nav class="nav" aria-label="เมนูสมุดภาคสนาม">'+menus.map(([k,l])=>'<button type="button" data-view="'+k+'"'+(k===view?' aria-current="page"':'')+'>'+e(l)+'</button>').join('')+'</nav></aside><section class="card" id="panel">'+(demo?'<div class="notice">โหมดทดลอง · ข้อมูลสมมติจะหายเมื่อปิดหรือโหลดหน้าใหม่ ไม่บันทึกลงชีตจริง</div>':'')+(!loading&&toast?'<p class="toast" role="status">'+e(toast)+'</p>':'')+body+'</section></div>';
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
  const v=[[1,'1 · ไม่เห็นด้วยอย่างยิ่ง'],[2,'2 · ไม่เห็นด้วย'],[3,'3 · ปานกลาง'],[4,'4 · เห็นด้วย'],[5,'5 · เห็นด้วยอย่างยิ่ง']];
  return header(title,'เลือกตามความคิดเห็นของตนเอง ข้ามข้อได้ คำตอบส่วนวิจัยไม่กระทบคะแนนเรียน')+form('Survey',domains.map((d,i)=>section(d,rating(SURVEY_ITEMS.slice(i*6,i*6+6),v,'ข้ามข้อนี้',i*6))).join('')+optional('missingReason','หมายเหตุข้อมูลขาด'));
}
function groupInput(){return input('group','กลุ่ม',{choices:[['','เลือกกลุ่ม'],...Array.from({length:8},(_,i)=>['G'+(i+1),'กลุ่ม '+(i+1)+' · '+places[Math.floor(i/2)]])]});}
function studentInput(){return input('student','รหัสนักเรียน',{choices:[['','เลือกนักเรียนที่ยืนยันแล้ว'],...(teacherData.roster||[]).filter(u=>u.consent==='granted').map(u=>[u.id,u.id+' · '+u.group])]});}
function fieldMap(group){
  const place=pOf(group),map=fieldMaps[place];
  if(!map)return '';
  const path='./assets/maps/'+map.file;
  return `<figure class="field-map">
    <a class="field-map-link" href="${path}.webp" target="_blank" rel="noopener">
      <img src="${path}-preview.webp" width="720" height="480" loading="lazy" decoding="async" alt="แผนที่ภาพวาดบริเวณ${e(place)}">
      <span>เปิดแผนที่ขนาดเต็มในแท็บใหม่ ↗</span>
    </a>
    <figcaption class="field-map-note">
      <span class="pill">แผนที่ประกอบกิจกรรม</span>
      <h3>${e(place)}</h3>
      <p>ใช้ภาพช่วยวางแผนเลือกจุดสำรวจ 3 จุด แล้วบันทึกชื่อจุด สิ่งที่พบ และช่วงเวลาที่เกี่ยวข้องในช่องด้านล่าง ถ้าจุดบนภาพมีหมายเลข ให้ระบุหมายเลขคู่กับชื่อจุดได้</p>
      <p class="small"><strong>ตัวอย่างจุดสังเกต:</strong> ${e(map.examples)}</p>
      <p class="small muted">ภาพวาดอ้างอิงพื้นที่จริง ตำแหน่งและสัดส่วนเป็นค่าประมาณ</p>
    </figcaption>
  </figure>`;
}
function panel(){
  if(view==='home')return home();
  if(phases[view])return survey(view);
  if(view==='Fieldwork')return header('บันทึกกลุ่มประจำสถานที่',user.group+' · '+user.place+' · ให้ตัวแทนส่งกลุ่มละ 1 ชุดต่อฉบับ')+form('Fieldwork',
    section('ข้อมูลการสำรวจ','<div class="grid">'+input('visitDate','วันที่ลงพื้นที่',{type:'date'})+input('area','ขอบเขตหรือช่วงถนนที่สำรวจ')+input('teacherMeeting','นัดพบครู / เวลาพบจริง',{optional:true})+input('teacherGuidance','จุดสังเกตหรือคำชี้แนะของครู',{optional:true})+'</div>')+
    section('1. คำถามและเหตุผล','<div class="grid">'+area('question','กลุ่มเราอยากรู้เรื่องอะไร')+area('why','เหตุผลที่เลือกคำถาม')+'</div>')+
    section('2. หลักฐานจากต่างแหล่ง','<div class="grid">'+area('source1','หลักฐานชิ้นที่ 1','ระบุชื่อ/ไฟล์ ผู้สร้างหรือแหล่ง เวลาเหตุการณ์ วันที่เก็บ และสิ่งที่พบ')+area('source2','หลักฐานชิ้นที่ 2','ใช้ต่างแหล่ง ระบุข้อมูลเช่นเดียวกับชิ้นแรก')+'</div>')+
    section('3. จุดสำรวจและแผนที่',fieldMap(user.group)+'<div class="grid">'+[1,2,3].map(i=>area('point'+i,'จุดสำรวจที่ '+i,'ระบุชื่อจุด สิ่งที่พบ และช่วงเวลาที่เกี่ยวข้อง')).join('')+input('map','ชื่อไฟล์หรือลิงก์แผนที่',{optional:true})+input('mapSource','แหล่งแผนที่ ปีข้อมูล ทิศและสัญลักษณ์',{optional:true})+'</div>')+
    section('4. ข้อค้นพบ','<div class="grid">'+area('finding','ข้อค้นพบ 2–4 ประโยค')+area('evidence','หลักฐานที่สนับสนุนหรือขัดแย้ง')+optional('uncertain','เรื่องที่ยังสรุปไม่ได้และสิ่งที่ควรตรวจต่อ')+'</div>')+
    section('5. ทดลองใช้และปรับงาน','<div class="grid">'+area('feedback','ความคิดเห็นจากผู้รับสาร')+area('revision','สิ่งที่กลุ่มปรับและเหตุผล')+area('roles','บทบาทสมาชิก','ระบุรหัสสมาชิก หน้าที่ ตำแหน่งหลักฐาน และความช่วยเหลือ')+'</div>'));
  if(view==='Reflection')return header('สะท้อนการเรียนรู้รายบุคคล','ตอบตามสิ่งที่เกิดขึ้นจริง รวมถึงสิ่งที่ยังไม่แน่ใจหรือยังไม่มีโอกาสทำ')+form(view,'<div class="grid">'+area('myWork','1. วันนี้นักเรียนทำอะไรด้วยตนเอง มีหลักฐานใดแสดงงานของนักเรียน')+area('evidence','2. หลักฐานใดทำให้นักเรียนเข้าใจสถานที่นี้ และเรื่องใดยังสรุปไม่ได้')+area('participation','3. นักเรียนได้เสนอความคิดเห็น รับฟัง หรือร่วมตัดสินใจอย่างไร ถ้ายังไม่มีโอกาสให้บอกตามจริง')+optional('help','ชื่อไฟล์ จุดหลักฐาน หรือความช่วยเหลือที่ได้รับ')+'</div>');
  if(view==='Observation')return header('สังเกตพฤติกรรมพลเมือง','บันทึกพฤติกรรมรายบุคคลที่เห็นจริง แยกคะแนน 0 จากยังไม่ประเมิน')+form(view,'<div class="grid line">'+studentInput()+input('observer','ผู้สังเกต')+input('date','วันที่',{type:'date'})+input('spot','สถานที่และจุดศึกษา')+input('start','เวลาเริ่ม',{type:'time'})+input('end','เวลาสิ้นสุด',{type:'time'})+input('stage','ช่วงกิจกรรม',{choices:['เตรียมงาน','สำรวจภาคสนาม','อภิปราย','นำเสนอ/ทดลองใช้'].map(v=>[v,v])})+input('opportunity','งานและโอกาสที่จัดให้')+'</div>'+section('รายการสังเกต 8 ข้อ',rating(observe,[[0,'0 · มีโอกาสแต่ไม่พบ'],[1,'1 · ทำเมื่อชวน/เตือน'],[2,'2 · ทำเองตามโอกาส'],[3,'3 · ทำเองและมีเหตุผล']],'ยังไม่ประเมิน'))+'<div class="grid">'+area('event','เหตุการณ์หรือคำพูดที่เห็นจริง')+optional('notObserved','เหตุผลของข้อที่ยังไม่ประเมิน')+optional('guidance','คำชี้แนะและการตอบสนอง')+'</div>');
  if(view==='Rubric')return header('ประเมินแผนที่เรื่องเล่าของกลุ่ม','ให้ 1–4 ตามเกณฑ์ หากหลักฐานยังไม่พอให้รอประเมิน')+form(view,'<div class="grid line">'+groupInput()+input('assessor','ผู้ประเมิน')+input('edition','ฉบับผลงาน')+'</div>'+rubric.map((r,i)=>section(r,'<div class="details"><details><summary>ดูคำอธิบายระดับคะแนน</summary><ol>'+rubricLevels[i].slice().reverse().map(s=>'<li>'+e(s)+'</li>').join('')+'</ol></details></div>'+rating([r],[[1,'1'],[2,'2'],[3,'3'],[4,'4']],'รอประเมิน',i))).join('')+area('reason','เหตุผลและตำแหน่งหลักฐาน'));
  if(view==='InterviewBefore'||view==='InterviewAfter'){
    const before=view==='InterviewBefore',qs=before?interviewBefore:interviewAfter;
    return header(titles[view],'จดคำตอบตามจริงและระบุที่มาของหลักฐานเมื่อมี')+form(view,'<div class="grid line">'+(before?input('participant','รหัสผู้ให้ข้อมูล')+input('participantRole','บทบาทผู้ให้ข้อมูล'):studentInput())+input('date','วันที่',{type:'date'})+input('method','วิธีบันทึก',{choices:[['จด','จด'],['เสียง','เสียง']]})+'</div><label class="scope"><input type="checkbox" name="consent" required> ยืนยันว่าได้รับความยินยอมตามขอบเขตการบันทึก</label><div class="grid">'+qs.map((q,i)=>optional('q'+(i+1),(i+1)+'. '+q)).join('')+'</div>');
  }
  if(view==='Evidence')return header('แนบหลักฐานการเรียนรู้','รองรับภาพ เสียง วิดีโอ และ PDF ไม่เกิน 6 MB ต่อรายการ ไฟล์ใหญ่ให้ใช้ลิงก์ Drive ที่ครูมีสิทธิ์เปิด')+form(view,'<div class="grid">'+(user.role==='teacher'?groupInput():'')+input('filename','ชื่อหลักฐาน',{max:100})+input('date','วันที่เก็บ',{type:'date'})+input('source','ที่มาของหลักฐาน')+input('permission','ขอบเขตที่อนุญาตให้ใช้')+input('file','เลือกไฟล์',{type:'file',optional:true,wide:true})+input('url','หรือลิงก์ Google Drive / Docs',{type:'url',max:700,optional:true,wide:true})+'</div>');
  if(view==='records')return header('ดูข้อมูลที่บันทึก','เลือกกิจกรรมเพื่อดูสรุปผล หรือสลับไปอ่านคำตอบทีละรายการ')+
    '<nav class="record-tabs" aria-label="แท็บข้อมูล">'+Object.entries(titles).map(([k,l])=>'<button class="btn alt" type="button" data-record-tab="'+e(k)+'" aria-pressed="'+(k===recordTab)+'">'+e(l)+'</button>').join('')+'</nav>'+
    '<div class="row record-modes" role="group" aria-label="รูปแบบการดูข้อมูล">'+Object.entries({summary:'สรุปผล',individual:'คำตอบรายรายการ'}).map(([k,l])=>'<button type="button" class="btn alt" data-record-mode="'+k+'" aria-pressed="'+(k===recordMode)+'">'+l+'</button>').join('')+'</div><p class="small muted" id="records-status" role="status"></p><div id="records"></div>';
  if(view==='controls')return header('ตั้งค่าการเก็บข้อมูล','เปิดช่วงเก็บก่อนหรือหลังตามกิจกรรม และยืนยันเฉพาะรายการที่ตรวจสอบความยินยอมจริง')+
    '<form id="flags" class="line"><label class="scope"><input type="checkbox" name="pre"'+(teacherData.flags?.pre?' checked':'')+'> เปิดแบบวัดก่อนเรียน</label><label class="scope"><input type="checkbox" name="post"'+(teacherData.flags?.post?' checked':'')+'> เปิดแบบวัดหลังเรียน</label>'+btn('บันทึกช่วงเก็บ','type="submit"')+'<p class="feedback" role="status"></p></form>'+
    '<h3>สถานะความยินยอมรายคน</h3><div class="stack">'+(teacherData.roster||[]).map(u=>'<form class="consent" data-account="'+e(u.id)+'"><div class="roster-row"><strong>'+e(u.id)+' · '+e(u.group)+' · '+e(u.place)+'</strong><label class="label">สถานะ<select name="state">'+Object.entries(states).map(([k,l])=>'<option value="'+k+'"'+(k===u.consent?' selected':'')+'>'+l+'</option>').join('')+'</select></label>'+btn('ยืนยัน','type="submit"',true)+'</div><p class="feedback" role="status"></p></form>').join('')+'</div>';
  return '';
}
function googleLink(raw){
  try{
    const url=new URL(String(raw??''));
    return url.protocol==='https:'&&['drive.google.com','docs.google.com'].includes(url.hostname)&&!url.username&&!url.password&&!url.port?url:null;
  }catch{return null;}
}
function drivePreview(raw){
  const url=googleLink(raw);if(!url||url.hostname!=='drive.google.com')return '';
  const id=url.pathname.match(/^\/file\/d\/([A-Za-z0-9_-]+)(?:\/(?:view|preview|edit))?\/?$/)?.[1]||(url.pathname==='/open'?url.searchParams.get('id'):'');
  if(!id||!/^[A-Za-z0-9_-]+$/.test(id))return '';
  const preview=new URL('https://drive.google.com/file/d/'+id+'/preview');
  const key=url.searchParams.get('resourcekey');if(key&&/^[A-Za-z0-9_-]+$/.test(key))preview.searchParams.set('resourcekey',key);
  return preview.href;
}
function openLink(label,raw){
  const url=googleLink(raw);
  return url?'<a class="btn alt small" href="'+e(url.href)+'" target="_blank" rel="noopener noreferrer">'+e(label)+' ↗</a>':'';
}
function recordLabel(key){
  const n=key.match(/^[Qq](\d+)$/);if(n)return 'ข้อ '+Number(n[1]);
  const o=key.match(/^O(\d+)$/);if(o)return 'รายการสังเกต '+Number(o[1]);
  return recordLabels[key]||key;
}
const recordDateFormat=new Intl.DateTimeFormat('th-TH',{dateStyle:'medium',timeStyle:'short',timeZone:'Asia/Bangkok'});
function recordValue(key,val){
  if(key==='phase')return phases[val]||val;
  if(key==='savedAt'&&val){const d=new Date(val);if(!Number.isNaN(d.valueOf()))return recordDateFormat.format(d);}
  return val===null||val===undefined||val===''?'—':val;
}
function recordFields(headers,row,skip=[]){
  return '<dl class="record-fields">'+headers.map((k,i)=>skip.includes(k)?'':'<div><dt>'+e(recordLabel(k))+'</dt><dd>'+e(recordValue(k,row[i]))+'</dd></div>').join('')+'</dl>';
}
function evidenceCard(headers,row,v){
  const filename=v.filename||'หลักฐาน',mime=String(v.mime||''),kind=mime.startsWith('image/')?'ภาพ':mime.startsWith('audio/')?'เสียง':mime.startsWith('video/')?'วิดีโอ':mime==='application/pdf'?'PDF':'ไฟล์หรือลิงก์';
  const link=openLink('เปิดใน Drive',v.url),preview=drivePreview(v.url);
  const imageId=link&&/^image\/(jpeg|png|webp)$/i.test(mime)&&/^[a-f0-9]{32}$/.test(v.requestId)?v.requestId:'';
  const canPreview=Boolean(preview||imageId);
  return '<article class="record-card evidence-card"><div class="row"><h3>'+e(filename)+'</h3><span class="pill">'+e(kind)+'</span></div><p class="record-meta">'+e([v.author,v.group,v.place,v.date].filter(Boolean).join(' · '))+'</p>'+
    '<div class="row">'+(canPreview?'<button type="button" class="btn small" data-preview="'+e(preview)+'"'+(imageId?' data-image-id="'+e(imageId)+'"':'')+' aria-expanded="false">'+(imageId?'ดูภาพ':'ดูตัวอย่าง')+'</button>':'')+(link||'<span class="small muted">ไม่มีลิงก์ Drive ที่เปิดได้</span>')+'</div>'+
    (canPreview?'<div class="drive-preview" hidden></div>':'')+
    '<details class="record-details"><summary>รายละเอียดหลักฐาน</summary>'+recordFields(headers,row,['filename','url'])+'</details></article>';
}
function recordCard(tab,headers,row){
  const v=Object.fromEntries(headers.map((k,i)=>[k,row[i]]));
  if(tab==='Evidence')return evidenceCard(headers,row,v);
  const label=[v.student||v.author||v.participant||v.teacher,v.group,phases[v.phase],v.place].filter(Boolean).join(' · ')||'รายการ '+String(v.requestId||'').slice(0,8);
  const date=v.savedAt?recordValue('savedAt',v.savedAt):v.date||v.visitDate||'';
  return '<details class="record-card record-details"><summary><strong>'+e(label)+'</strong>'+(date?'<span class="record-meta">'+e(date)+'</span>':'')+'</summary>'+recordFields(headers,row)+'</details>';
}
const summaryNumber=new Intl.NumberFormat('th-TH',{maximumFractionDigits:1});
const sn=n=>summaryNumber.format(n);
function summaryQuestion(tab,key){
  const n=Number(key.slice(1));
  if(tab==='Survey'&&/^Q\d+$/.test(key))return n+'. '+SURVEY_ITEMS[n-1];
  if(tab==='Observation'&&/^O\d+$/.test(key))return n+'. '+observe[n-1];
  if(tab==='Rubric'&&summarySpecs_.Rubric.ratings.includes(key))return rubric[summarySpecs_.Rubric.ratings.indexOf(key)];
  if(tab.startsWith('Interview')&&/^q\d+$/.test(key))return n+'. '+(tab==='InterviewBefore'?interviewBefore:interviewAfter)[n-1];
  if(tab==='Reflection')return {myWork:'วันนี้ทำอะไรด้วยตนเอง และมีหลักฐานอะไร',evidence:'หลักฐานใดช่วยให้เข้าใจสถานที่ และเรื่องใดยังสรุปไม่ได้',participation:'เสนอความคิดเห็น รับฟัง หรือร่วมตัดสินใจอย่างไร',help:'ชื่อไฟล์ จุดหลักฐาน หรือความช่วยเหลือที่ได้รับ'}[key];
  return recordLabel(key);
}
function summaryBars(items,n){
  return '<ul class="summary-bars">'+items.map(({label,count})=>{
    const fraction=n?100*count/n:0;
    return '<li><span class="summary-bar-label">'+e(label)+'</span><span class="summary-bar-track" aria-hidden="true"><span style="width:'+fraction+'%"></span></span><span class="summary-bar-value">'+sn(count)+' <span>('+sn(fraction)+'%)</span></span></li>';
  }).join('')+'</ul>';
}
function summarySection(title,html){
  return '<section class="summary-section"><h3>'+e(title)+'</h3><div class="summary-grid">'+html+'</div></section>';
}
function summaryCard(title,meta,body){
  return '<article class="summary-card"><h4>'+e(title)+'</h4><p class="small muted">'+e(meta)+'</p>'+body+'</article>';
}
function summaryBody(tab,r){
  const bucket=r.summary[tab==='Survey'?recordPhase:'all'];
  if(!bucket?.total)return '<p class="notice">ยังไม่มีข้อมูลในช่วงนี้</p>';
  const absent='ยังไม่มีคำตอบ';
  const categories=bucket.categories.filter(c=>c.n).map(c=>summaryCard(c.key==='mime'?'ประเภทหลักฐาน':recordLabel(c.key),'ระบุ '+sn(c.n)+' จาก '+sn(bucket.total)+' รายการ',summaryBars(c.items,c.n))).join('');
  const scores=bucket.ratings.map(q=>{
    const n=q.counts.reduce((sum,count)=>sum+count,0);
    return summaryCard(summaryQuestion(tab,q.key),sn(n)+' จาก '+sn(bucket.total)+' รายการมีคะแนน',n?summaryBars(q.counts.map((count,i)=>({label:q.min+i,count})),n):'');
  }).join('');
  const responses=bucket.text.map(q=>{
    const more=q.count>q.samples.length;
    const note=q.count?sn(q.count)+' คำตอบ'+(more?' · แสดง '+sn(q.samples.length)+' ล่าสุด':''):absent;
    return summaryCard(summaryQuestion(tab,q.key),note,q.samples.length?'<ul class="summary-answers">'+q.samples.map(answer=>'<li>'+e(answer)+'</li>').join('')+'</ul>':'');
  }).join('');
  return (categories?summarySection('ภาพรวม',categories):'')+
    (scores?summarySection('คะแนนรายข้อ',scores):'')+
    (responses?summarySection('คำตอบแยกตามคำถาม',responses):'')+
    (tab==='Evidence'&&r.rows.length?'<section class="summary-section"><h3>หลักฐานล่าสุด '+sn(r.rows.length)+' รายการ</h3><div class="record-list">'+r.rows.map(row=>recordCard(tab,r.headers,row)).join('')+'</div></section>':'');
}
function summaryView(tab,r){
  if(!r.total)return '<p class="notice">ยังไม่มีข้อมูลในแท็บนี้</p>';
  let controls='';
  if(tab==='Survey'){
    if(!Object.hasOwn(r.summary,recordPhase))recordPhase='pre';
    controls='<div class="row summary-phases" role="group" aria-label="ช่วงแบบวัด">'+Object.entries(r.summary).map(([key,phase])=>'<button type="button" class="btn alt" data-record-phase="'+key+'" aria-pressed="'+(key===recordPhase)+'">'+e(phases[key]||'ไม่ระบุช่วง')+' · '+sn(phase.total)+'</button>').join('')+'</div>';
  }
  const note=tab==='Survey'?'กราฟแยกตามช่วงและคิดเปอร์เซ็นต์จากจำนวนที่ตอบข้อนั้น หากต้องการเทียบเฉพาะคู่ข้อมูลครบ ให้ดูที่ภาพรวมครู':
    tab==='Evidence'?'ดูจำนวนหลักฐานตามประเภท กลุ่ม และสถานที่ หรือเปิดไฟล์จากรายการด้านล่าง':
    'กราฟคิดเปอร์เซ็นต์จากรายการที่ระบุคำตอบของข้อนั้น ข้อความยาวแสดงบางส่วน เปิดคำตอบรายรายการเพื่ออ่านทั้งหมด';
  return controls+'<p class="small muted">'+e(note)+'</p><div id="record-summary-body">'+summaryBody(tab,r)+'</div>';
}
async function showRows(offset=0){
  const host=document.getElementById('records'),notice=document.getElementById('records-status');if(!host||!notice||user?.role!=='teacher')return;
  const tab=recordTab,mode=recordMode,serial=++navSerial;recordResult=null;host.replaceChildren();notice.textContent='กำลังโหลด…';host.setAttribute('aria-busy','true');
  root.querySelectorAll('[data-record-tab]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.recordTab===tab)));
  root.querySelectorAll('[data-record-mode]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.recordMode===mode)));
  try{
    const r=await api('rows',{tab,mode,offset});if(serial!==navSerial||!host.isConnected)return;
    const toolbar='<div class="records-toolbar row"><strong>'+e(titles[tab])+' · '+sn(r.total)+' รายการ</strong>'+openLink('เปิดแท็บใน Google Sheet',r.sheetUrl||teacherData.url)+(tab==='Evidence'?openLink('เปิดโฟลเดอร์หลักฐาน',r.folderUrl):'')+'</div>';
    if(mode==='summary'){
      if(r.summary)recordResult=r;
      host.innerHTML=toolbar+(r.summary?summaryView(tab,r):'<p class="notice">กรุณาอัปเดต Code.gs และเผยแพร่เวอร์ชันใหม่ของ Apps Script เพื่อเปิดสรุปผล ระหว่างนี้ยังดูคำตอบรายรายการได้</p>');
    }else host.innerHTML=toolbar+
      (r.rows.length?'<div class="record-list">'+r.rows.map(row=>recordCard(tab,r.headers,row)).join('')+'</div>':'<p class="notice">ยังไม่มีข้อมูลในแท็บนี้</p>')+
      '<div class="row records-pages">'+(r.offset>0?btn('ก่อนหน้า','data-page="'+Math.max(0,r.offset-30)+'"',true):'')+(r.rows.length?'<span class="caption">รายการ '+e(r.offset+1)+'–'+e(r.offset+r.rows.length)+' จาก '+e(r.total)+'</span>':'')+(r.offset+r.rows.length<r.total?btn('ถัดไป','data-page="'+(r.offset+r.rows.length)+'"',true):'')+'</div>';
    notice.textContent='';
  }catch(err){if(serial===navSerial&&host.isConnected)notice.textContent=err.message;}
  finally{if(serial===navSerial&&host.isConnected)host.setAttribute('aria-busy','false');}
}
async function toggleDrivePreview(button){
  const card=button.closest('.evidence-card'),host=card?.querySelector('.drive-preview'),id=button.dataset.imageId,src=drivePreview(button.dataset.preview);
  if(!host||(!src&&!id))return;
  if(!host.hidden){host.replaceChildren();host.hidden=true;button.setAttribute('aria-expanded','false');button.textContent=id?'ดูภาพ':'ดูตัวอย่าง';return;}
  const previous=root.querySelector('[data-preview][aria-expanded="true"]');if(previous&&previous!==button)await toggleDrivePreview(previous);
  const hint=document.createElement('p');hint.className='small muted';
  const fallback='เปิดตัวอย่างในเว็บไม่ได้ ให้กด เปิดใน Drive ด้านบน และใช้บัญชี Google ที่มีสิทธิ์เข้าถึง';
  host.replaceChildren(hint);host.hidden=false;button.setAttribute('aria-expanded','true');button.textContent=id?'ปิดภาพ':'ปิดตัวอย่าง';
  if(id){
    hint.textContent='กำลังโหลดภาพ…';hint.setAttribute('role','status');
    const current=()=>host.isConnected&&!host.hidden&&host.firstChild===hint;
    try{
      const image=await api('rows',{tab:'Evidence',imageRequestId:id});
      if(!current())return;
      if(!/^image\/(jpeg|png|webp)$/.test(image?.mime)||typeof image.base64!=='string'||!image.base64||image.base64.length>8*1024*1024||!/^[A-Za-z0-9+/]+={0,2}$/.test(image.base64))throw Error('ไม่มีตัวอย่างภาพ');
      const img=document.createElement('img');img.className='evidence-image';img.alt=card.querySelector('h3')?.textContent||'ภาพหลักฐาน';
      img.onload=()=>{if(current())hint.textContent='';};
      img.onerror=()=>{if(current()){hint.textContent=fallback;img.remove();}};
      img.src='data:'+image.mime+';base64,'+image.base64;
      host.append(img);
    }catch{if(current())hint.textContent=fallback;}
    return;
  }
  hint.textContent='ถ้าตัวอย่างไม่ขึ้น ให้กด เปิดใน Drive ด้านบน และใช้บัญชี Google ที่มีสิทธิ์เข้าถึง';
  const frame=document.createElement('iframe');frame.src=src;frame.title='ตัวอย่างไฟล์หลักฐานจาก Google Drive';frame.allowFullscreen=true;frame.referrerPolicy='no-referrer';frame.setAttribute('sandbox','allow-scripts allow-same-origin');
  host.append(frame);
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
  const b=ev.target.closest('button');if(!b)return;
  if(b.dataset.motion!==undefined){
    motionPaused=!motionPaused;
    document.body.classList.toggle('motion-paused',motionPaused);
    document.querySelectorAll('[data-motion]').forEach(button=>button.setAttribute('aria-pressed',String(motionPaused)));
    return;
  }
  if(busy)return;
  if(b.dataset.demo){demo=true;const t=b.dataset.demo==='teacher';user={id:t?'TEACHER':'SQ001',role:t?'teacher':'student',group:t?'':'G1',place:t?'':'วัดใหญ่'};await go('home');}
  if(b.dataset.view)await go(b.dataset.view);
  if(b.dataset.recordTab&&Object.prototype.hasOwnProperty.call(titles,b.dataset.recordTab)){recordTab=b.dataset.recordTab;await showRows();}
  if(['summary','individual'].includes(b.dataset.recordMode)&&recordMode!==b.dataset.recordMode){recordMode=b.dataset.recordMode;await showRows();}
  if(b.dataset.recordPhase&&recordTab==='Survey'&&recordMode==='summary'&&Object.hasOwn(recordResult?.summary||{},b.dataset.recordPhase)){
    recordPhase=b.dataset.recordPhase;
    root.querySelectorAll('[data-record-phase]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.recordPhase===recordPhase)));
    document.getElementById('record-summary-body').innerHTML=summaryBody('Survey',recordResult);
  }
  if(b.dataset.page!==undefined)await showRows(Number(b.dataset.page));
  if(b.dataset.preview!==undefined)await toggleDrivePreview(b);
  if(b.dataset.logout){if(!demo)api('logout').catch(()=>{});++navSerial;user=null;token='';demo=false;recordTab='Survey';recordMode='summary';recordPhase='pre';recordResult=null;teacherData={};landing();}
});
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
