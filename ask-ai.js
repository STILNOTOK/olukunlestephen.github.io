(() => {
  const API_URL = 'https://ai.olukunlestephen.com/chat';
  const root = document.getElementById('ask-ai-root');
  if (!root) return;

  const style = document.createElement('style');
  style.textContent = `
  #ask-ai-root{font-family:inherit}
  .ask-ai-launcher{position:fixed;right:22px;bottom:22px;z-index:9998;border:0;border-radius:999px;padding:14px 18px;background:#111;color:#fff;font:600 14px/1 inherit;letter-spacing:.01em;box-shadow:0 12px 35px rgba(0,0,0,.2);cursor:pointer}
  .ask-ai-launcher:hover{transform:translateY(-2px)}
  .ask-ai-panel{position:fixed;right:22px;bottom:82px;width:min(390px,calc(100vw - 28px));height:min(600px,calc(100vh - 110px));z-index:9999;background:#fff;color:#111;border:1px solid rgba(0,0,0,.12);border-radius:22px;box-shadow:0 24px 70px rgba(0,0,0,.2);display:none;overflow:hidden;flex-direction:column}
  .ask-ai-panel.open{display:flex}
  .ask-ai-head{padding:17px 18px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;gap:12px}
  .ask-ai-brand{font-weight:700;font-size:15px}.ask-ai-sub{font-size:11px;color:#777;margin-top:3px}
  .ask-ai-close{border:0;background:transparent;font-size:23px;line-height:1;cursor:pointer;color:#555}
  .ask-ai-messages{flex:1;overflow:auto;padding:16px;background:#fafafa;display:flex;flex-direction:column;gap:10px}
  .ask-ai-msg{max-width:88%;padding:11px 13px;border-radius:15px;font-size:13px;line-height:1.55;white-space:pre-wrap;word-break:break-word}
  .ask-ai-msg.bot{align-self:flex-start;background:#fff;border:1px solid #e9e9e9}.ask-ai-msg.user{align-self:flex-end;background:#111;color:#fff}
  .ask-ai-typing{opacity:.6;font-style:italic}.ask-ai-suggestions{padding:10px 12px 0;background:#fff;display:flex;gap:7px;overflow:auto}.ask-ai-suggestions button{white-space:nowrap;border:1px solid #ddd;background:#fff;border-radius:999px;padding:8px 10px;font-size:11px;cursor:pointer}
  .ask-ai-form{display:flex;gap:8px;padding:12px;background:#fff;border-top:1px solid #eee}.ask-ai-input{flex:1;min-width:0;border:1px solid #ddd;border-radius:14px;padding:11px 12px;font:inherit;font-size:13px;outline:none}.ask-ai-input:focus{border-color:#111}.ask-ai-send{border:0;border-radius:13px;background:#111;color:#fff;padding:0 15px;font-weight:700;cursor:pointer}.ask-ai-send:disabled{opacity:.45;cursor:not-allowed}
  @media(max-width:520px){.ask-ai-launcher{right:14px;bottom:14px}.ask-ai-panel{right:10px;bottom:72px;width:calc(100vw - 20px);height:calc(100vh - 92px);border-radius:18px}}
  `;
  document.head.appendChild(style);

  root.innerHTML = `
    <button class="ask-ai-launcher" id="ask-ai-open" aria-label="Open Ask Olukunle AI">Ask Olukunle AI</button>
    <section class="ask-ai-panel" id="ask-ai-panel" role="dialog" aria-label="Ask Olukunle AI">
      <header class="ask-ai-head"><div><div class="ask-ai-brand">Ask Olukunle AI</div><div class="ask-ai-sub">Ask about Olukunle, his work, projects or writing.</div></div><button class="ask-ai-close" id="ask-ai-close" aria-label="Close">×</button></header>
      <div class="ask-ai-suggestions" id="ask-ai-suggestions">
        <button>Who is Olukunle?</button><button>Tell me about Stillnotok</button><button>What is SNOKPay?</button><button>How can I contact him?</button>
      </div>
      <div class="ask-ai-messages" id="ask-ai-messages"></div>
      <form class="ask-ai-form" id="ask-ai-form"><input class="ask-ai-input" id="ask-ai-input" maxlength="1000" autocomplete="off" placeholder="Ask a question…" aria-label="Your question"/><button class="ask-ai-send" id="ask-ai-send" type="submit">Send</button></form>
    </section>`;

  const openBtn=document.getElementById('ask-ai-open'), panel=document.getElementById('ask-ai-panel'), closeBtn=document.getElementById('ask-ai-close');
  const messages=document.getElementById('ask-ai-messages'), form=document.getElementById('ask-ai-form'), input=document.getElementById('ask-ai-input'), send=document.getElementById('ask-ai-send');
  let history=[];
  function add(role,text,typing=false){const d=document.createElement('div');d.className=`ask-ai-msg ${role}${typing?' ask-ai-typing':''}`;d.textContent=text;messages.appendChild(d);messages.scrollTop=messages.scrollHeight;return d;}
  function welcome(){if(!messages.children.length)add('bot',"Hi — I'm Olukunle's AI website assistant. Ask me about his background, Stillnotok, SNOKPay, articles, projects or how to get in touch.");}
  openBtn.onclick=()=>{panel.classList.add('open');welcome();input.focus()}; closeBtn.onclick=()=>panel.classList.remove('open');
  document.querySelectorAll('#ask-ai-suggestions button').forEach(b=>b.onclick=()=>{input.value=b.textContent;form.requestSubmit()});
  form.onsubmit=async e=>{e.preventDefault();const q=input.value.trim();if(!q||send.disabled)return;add('user',q);input.value='';send.disabled=true;const t=add('bot','Thinking…',true);history.push({role:'user',content:q});
    try{const r=await fetch(API_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:history.slice(-8)})});const data=await r.json();if(!r.ok)throw new Error(data.error||'Request failed');t.remove();add('bot',data.answer||'I could not find an answer right now.');history.push({role:'assistant',content:data.answer||''});}
    catch(err){t.textContent='Sorry, the assistant is temporarily unavailable. Please try again or use the Contact page.';}
    finally{send.disabled=false;input.focus()}
  };
})();
