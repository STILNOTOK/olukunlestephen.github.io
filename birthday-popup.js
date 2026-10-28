(function () {
  // Birthday display date uses Nigeria time so the message appears on October 28 in the founder's home time zone.
  const now = new Date();
  const nigeriaDate = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Africa/Lagos', year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(now);
  if (!nigeriaDate.endsWith('-10-28')) return;

  const year = nigeriaDate.slice(0, 4);
  const storageKey = 'olukunle-birthday-popup-seen-' + year;
  try { if (localStorage.getItem(storageKey) === 'yes') return; } catch (e) {}

  const style = document.createElement('style');
  style.textContent = `
    .osg-birthday-overlay{position:fixed;inset:0;z-index:99999;display:grid;place-items:center;padding:20px;background:rgba(8,8,8,.78);backdrop-filter:blur(8px);animation:osgFade .35s ease both}
    .osg-birthday-card{position:relative;overflow:hidden;width:min(100%,520px);padding:42px 28px 30px;text-align:center;color:#f8f2e6;background:linear-gradient(145deg,#111 0%,#202020 58%,#111 100%);border:1px solid rgba(213,177,94,.7);box-shadow:0 25px 90px rgba(0,0,0,.45);font-family:inherit}
    .osg-birthday-card:before{content:"";position:absolute;inset:9px;border:1px solid rgba(213,177,94,.25);pointer-events:none}
    .osg-birthday-kicker{margin:0 0 15px;color:#e2c47e;letter-spacing:.24em;text-transform:uppercase;font-size:11px;font-weight:700}
    .osg-birthday-card h2{position:relative;margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:clamp(30px,7vw,48px);line-height:1.08;font-weight:500}
    .osg-birthday-card p{position:relative;max-width:390px;margin:0 auto 17px;color:#dedbd3;font-size:15px;line-height:1.75}
    .osg-birthday-card .osg-birthday-signoff{color:#e2c47e;font-size:12px;letter-spacing:.08em;text-transform:uppercase}
    .osg-birthday-close{position:absolute;top:17px;right:17px;z-index:2;width:36px;height:36px;border:1px solid rgba(255,255,255,.35);border-radius:50%;background:transparent;color:#fff;font-size:22px;cursor:pointer}
    .osg-birthday-button{position:relative;margin-top:8px;padding:13px 20px;border:1px solid #d8b86b;background:#d8b86b;color:#111;font:inherit;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;cursor:pointer}
    .osg-birthday-button:hover{background:#f0d99c}
    .osg-birthday-spark{position:absolute;color:#d8b86b;opacity:.7;font-size:22px;animation:osgTwinkle 2.4s ease-in-out infinite}
    .osg-birthday-spark.one{top:26px;left:28px}.osg-birthday-spark.two{right:30px;bottom:27px;animation-delay:.8s}
    @keyframes osgFade{from{opacity:0}to{opacity:1}}@keyframes osgTwinkle{0%,100%{transform:scale(.8) rotate(0);opacity:.35}50%{transform:scale(1.15) rotate(18deg);opacity:1}}
    @media(prefers-reduced-motion:reduce){.osg-birthday-overlay,.osg-birthday-spark{animation:none}}
  `;
  document.head.appendChild(style);

  const overlay = document.createElement('div');
  overlay.className = 'osg-birthday-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'osg-birthday-title');
  overlay.innerHTML = `
    <section class="osg-birthday-card">
      <button class="osg-birthday-close" type="button" aria-label="Close birthday message">&times;</button>
      <span class="osg-birthday-spark one" aria-hidden="true">✦</span>
      <span class="osg-birthday-spark two" aria-hidden="true">✧</span>
      <p class="osg-birthday-kicker">A special day · October 28</p>
      <h2 id="osg-birthday-title">Happy Birthday,<br>Olukunle!</h2>
      <p>Another year. Another chapter. Another opportunity to become.</p>
      <p>Today, I’m celebrating life, growth, the lessons that shaped me, and the journey that is still unfolding. Thank you for being part of it.</p>
      <p class="osg-birthday-signoff">Olukunle Stephen Gbolahan</p>
      <button class="osg-birthday-button" type="button">Continue exploring</button>
    </section>`;

  function closePopup() {
    overlay.remove();
    try { localStorage.setItem(storageKey, 'yes'); } catch (e) {}
  }
  overlay.addEventListener('click', function (event) { if (event.target === overlay) closePopup(); });
  overlay.querySelector('.osg-birthday-close').addEventListener('click', closePopup);
  overlay.querySelector('.osg-birthday-button').addEventListener('click', closePopup);
  document.addEventListener('keydown', function (event) { if (event.key === 'Escape' && document.body.contains(overlay)) closePopup(); });
  document.body.appendChild(overlay);
})();
