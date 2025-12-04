// Neon Sky Fighters – desktop + mobile (touch) build
(function () {
  // Reset DOM
  document.head.innerHTML = "";
  document.body.innerHTML = "";
  document.title = "Neon Sky Fighters";

  window.addEventListener("contextmenu", e => e.preventDefault());

  const style = document.createElement("style");
  style.textContent = `
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      background: #050509;
      overflow: hidden;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: #fff;
      user-select: none;
      cursor: crosshair;
      touch-action: none;
    }
    #hud {
      position: fixed;
      left: 20px;
      top: 20px;
      padding: 10px 14px;
      background: rgba(0,0,0,0.55);
      border-radius: 10px;
      backdrop-filter: blur(6px);
      box-shadow: 0 0 18px rgba(0,0,0,0.9);
      font-size: 13px;
      pointer-events: none;
      min-width: 240px;
      z-index: 5;
    }
    #hud .line {
      margin-top: 4px;
    }
    #hud .label {
      opacity: 0.7;
      margin-right: 4px;
      font-weight: 500;
    }
    #hud .value {
      font-weight: 700;
      font-size: 14px;
    }
    #healthBarOuter {
      position: relative;
      width: 190px;
      height: 10px;
      border-radius: 999px;
      background: rgba(255,255,255,0.08);
      overflow: hidden;
      margin-top: 4px;
      box-shadow: 0 0 10px rgba(0,0,0,0.8) inset;
      display: inline-block;
      vertical-align: middle;
    }
    #healthBarInner {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 100%;
      border-radius: 999px;
      background: linear-gradient(90deg, #3cffb9, #00ff88, #f4ff6b);
      box-shadow: 0 0 12px rgba(0,255,150,0.9);
      transition: width 0.15s ease-out;
    }
    #hint {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      padding: 8px 16px;
      background: rgba(0,0,0,0.78);
      border-radius: 999px;
      backdrop-filter: blur(6px);
      font-size: 13px;
      box-shadow: 0 0 18px rgba(0,0,0,0.9);
      pointer-events: none;
      white-space: nowrap;
      z-index: 5;
    }
    #centerMessage {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      pointer-events: none;
      text-shadow: 0 0 20px rgba(0,0,0,0.9);
      max-width: 540px;
      z-index: 4;
    }
    #centerMessage .title {
      font-size: 32px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    #centerMessage .subtitle {
      font-size: 15px;
      opacity: 0.9;
    }
    #centerMessage .small {
      font-size: 12px;
      opacity: 0.75;
      margin-top: 6px;
    }
    #upgradeToast {
      position: fixed;
      top: 70px;
      left: 50%;
      transform: translateX(-50%);
      padding: 8px 18px;
      background: rgba(0,0,0,0.9);
      border-radius: 12px;
      backdrop-filter: blur(8px);
      font-size: 14px;
      box-shadow: 0 0 22px rgba(0,0,0,0.95);
      pointer-events: none;
      white-space: nowrap;
      opacity: 0;
      transition: opacity 0.2s ease-out;
      z-index: 6;
    }
    #upgradeToast .en {
      display: block;
      font-weight: 600;
    }
    #upgradeToast .ar {
      display: block;
      font-size: 13px;
      opacity: 0.9;
    }
    #pauseOverlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.6);
      backdrop-filter: blur(5px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 10;
      cursor: default;
    }
    #pausePanel {
      background: rgba(15,23,42,0.95);
      border-radius: 14px;
      box-shadow: 0 0 30px rgba(0,0,0,0.9);
      padding: 16px 22px 18px;
      min-width: 260px;
      color: #e5e7eb;
      text-align: left;
      font-size: 14px;
    }
    #pausePanelTitle {
      font-weight: 700;
      font-size: 18px;
      margin-bottom: 4px;
    }
    #pausePanelSubtitle {
      font-size: 12px;
      opacity: 0.8;
      margin-bottom: 10px;
    }
    .pause-line {
      margin-top: 10px;
    }
    .pause-label {
      font-weight: 500;
      opacity: 0.85;
      margin-right: 6px;
    }
    .pause-btn {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 999px;
      border: 1px solid rgba(148,163,184,0.8);
      background: rgba(15,23,42,0.9);
      color: #e5e7eb;
      font-size: 13px;
      cursor: pointer;
      margin-top: 4px;
    }
    .pause-btn:hover {
      background: rgba(30,64,175,0.9);
      border-color: rgba(129,140,248,0.9);
    }
    #btnResume {
      margin-top: 8px;
      width: 100%;
      text-align: center;
      font-weight: 600;
    }
    #volumeSlider, #musicSlider {
      width: 140px;
      vertical-align: middle;
      margin-left: 4px;
    }
    #leaderboardBR {
      position: fixed;
      right: 20px;
      bottom: 20px;
      background: rgba(0,0,0,0.8);
      border-radius: 10px;
      backdrop-filter: blur(6px);
      padding: 10px 14px;
      box-shadow: 0 0 18px rgba(0,0,0,0.9);
      font-size: 11px;
      z-index: 5;
      min-width: 260px;
      max-width: 320px;
    }
    #leaderboardBRTitle {
      font-weight: 700;
      margin-bottom: 4px;
      font-size: 12px;
    }
    .lb-row {
      margin-top: 3px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 6px;
      opacity: 0.9;
    }
    .lb-row span.name {
      font-weight: 600;
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .lb-row span.score {
      opacity: 0.8;
    }
    .lb-row span.meta {
      font-size: 10px;
      opacity: 0.7;
    }
    #playerNameModal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(15,23,42,0.98);
      border-radius: 14px;
      padding: 26px 26px 20px;
      box-shadow: 0 0 30px rgba(0,0,0,0.9);
      z-index: 30;
      text-align: center;
      backdrop-filter: blur(8px);
      width: 320px;
    }
    #playerNameModal h2 {
      color: #3cffb9;
      font-size: 18px;
      margin: 0 0 10px;
    }
    #playerNameModal p {
      font-size: 12px;
      opacity: 0.8;
      margin: 0 0 12px;
    }
    #playerNameInput {
      width: 100%;
      padding: 9px 10px;
      border-radius: 6px;
      border: 2px solid #3cffb9;
      background: #020617;
      color: #fff;
      font-size: 14px;
      box-sizing: border-box;
      outline: none;
    }
    #playerNameBtn {
      margin-top: 12px;
      width: 100%;
      padding: 9px;
      background: linear-gradient(135deg, #3cffb9, #00ff88);
      border: none;
      border-radius: 6px;
      color: #000;
      font-weight: 700;
      cursor: pointer;
      font-size: 14px;
    }
    #playerNameHint {
      font-size: 11px;
      opacity: 0.6;
      margin-top: 8px;
    }

    /* MOBILE TOUCH CONTROLS */
    #mobileControls {
      position: fixed;
      inset: 0;
      z-index: 7;
      pointer-events: auto;
    }
    #mc-joystick-area,
    #mc-buttons-area {
      position: absolute;
      bottom: 0;
      height: 45%;
    }
    #mc-joystick-area {
      left: 0;
      width: 55%;
    }
    #mc-buttons-area {
      right: 0;
      width: 45%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: 18px;
      padding-bottom: 18px;
    }
    #mc-joy-base,
    #mc-joy-stick {
      position: absolute;
      border-radius: 999px;
      transform: translate(-50%, -50%);
      transition: opacity 0.12s ease-out;
    }
    #mc-joy-base {
      width: 120px;
      height: 120px;
      border: 2px solid rgba(148,163,184,0.9);
      background: rgba(15,23,42,0.65);
      box-shadow: 0 0 22px rgba(15,23,42,0.9);
    }
    #mc-joy-stick {
      width: 60px;
      height: 60px;
      border: 2px solid rgba(59,130,246,0.95);
      background: rgba(37,99,235,0.9);
      box-shadow: 0 0 24px rgba(59,130,246,0.9);
    }
    .mc-btn {
      pointer-events: auto;
      width: 78px;
      height: 78px;
      border-radius: 999px;
      border: 2px solid rgba(148,163,184,0.9);
      background: radial-gradient(circle at 30% 30%, rgba(248,250,252,0.9), rgba(37,99,235,0.2));
      color: #e5e7eb;
      font-weight: 700;
      font-size: 14px;
      text-shadow: 0 0 10px rgba(15,23,42,0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 26px rgba(15,23,42,0.9);
      user-select: none;
    }
    .mc-btn:active {
      transform: scale(0.96);
      box-shadow: 0 0 18px rgba(37,99,235,0.9);
    }

    @media (hover: none) and (pointer: coarse) {
      #leaderboardBR {
        display: none;
      }
      #hint {
        bottom: 90px;
        font-size: 12px;
      }
    }
  `;
  document.head.appendChild(style);

  const isTouchDevice =
    ("ontouchstart" in window) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);

  const HS_KEY = "NSF_HS_V2";
  const TUTORIAL_KEY = "NSF_TUTORIAL_DONE";

  let hasSeenTutorial = false;
  try {
    hasSeenTutorial = localStorage.getItem(TUTORIAL_KEY) === "1";
  } catch (e) {
    hasSeenTutorial = false;
  }
  let tutorialMode = !hasSeenTutorial;

  const TEXT = {
    en: {
      score: "Score",
      level: "Level",
      combo: "Combo",
      hp: "HP",
      altFire: "Alt Fire",
      hint:
        "PC: W A S D move, mouse aim, LMB shoot, RMB/Q Alt Fire, Shift dash, ESC pause, R restart. Mobile: left joystick move, FIRE / ALT buttons to shoot.",
      introTitle: "NEON SKY FIGHTERS",
      introSubtitle: "First sortie, learn the basics then survive and evolve your jet.",
      introSmall: "Click or tap anywhere to arm your jet and begin.",
      pausedTitle: "Paused",
      pausedSubtitle: "Game is paused. Adjust settings or resume.",
      resume: "Resume",
      language: "Language",
      languageValueEn: "English",
      languageValueAr: "Arabic / العربية",
      volume: "Effects Volume",
      music: "Music Volume",
      hsTitle: "Best runs on this browser",
      toastRapidEn: "Rapid Fire ++",
      toastRapidAr: "إطلاق ناري سريع ++",
      toastPowerEn: "Power Shot ++",
      toastPowerAr: "قوة النيران ++",
      toastSpeedEn: "Agility ++",
      toastSpeedAr: "رشاقة الطائرة ++",
      toastDashEn: "Afterburner Dash ++",
      toastDashAr: "اندفاعة النفاثة ++",
      toastVitalityEn: "Hull Plating ++",
      toastVitalityAr: "درع الهيكل ++",
      toastPierceEn: "Piercing Rounds ++",
      toastPierceAr: "رصاص مخترق ++",
      toastPatternEn: "Multi-Shot ++",
      toastPatternAr: "رشقات متعددة ++",
      toastBoltEn: "Bolt Core ++",
      toastBoltAr: "نواة البرق ++",
      toastAltEn: "Alt Core ++ (new mode)",
      toastAltAr: "نواة المهارة البديلة ++",
      gameOverTitle: score => `YOU WERE SHOT DOWN`,
      gameOverSubtitle: (score, level, combo) =>
        `Final score: ${score.toFixed(0)}, level ${level}, best combo ${combo.toFixed(0)}.`,
      gameOverSmall: "Press R (PC) or refresh to restart your sortie.",
      lbTitle: "Local Leaderboard"
    },
    ar: {
      score: "النقاط",
      level: "المستوى",
      combo: "السلسلة",
      hp: "الصحة",
      altFire: "الهجوم البديل",
      hint:
        "الكمبيوتر: الحركة WASD، التصويب بالماوس، إطلاق بالأيسر، هجوم بديل بالزر الأيمن/Q، اندفاعة Shift، إيقاف ESC، إعادة R. الجوال: عصا يسار للحركة، أزرار FIRE/ALT للإطلاق.",
      introTitle: "NEON SKY FIGHTERS",
      introSubtitle: "أول طلعة، تعلّم الأساسيات ثم حاول البقاء وطوّر طائرتك.",
      introSmall: "انقر أو المس أي مكان لتسليح الطائرة والبدء.",
      pausedTitle: "إيقاف مؤقت",
      pausedSubtitle: "اللعبة متوقفة مؤقتاً. يمكنك تغيير الإعدادات أو المتابعة.",
      resume: "استئناف",
      language: "اللغة",
      languageValueEn: "الإنجليزية / English",
      languageValueAr: "العربية",
      volume: "مستوى المؤثرات",
      music: "مستوى الموسيقى",
      hsTitle: "أفضل النتائج على هذا المتصفح",
      toastRapidEn: "Rapid Fire ++",
      toastRapidAr: "إطلاق ناري سريع ++",
      toastPowerEn: "Power Shot ++",
      toastPowerAr: "قوة النيران ++",
      toastSpeedEn: "Agility ++",
      toastSpeedAr: "رشاقة الطائرة ++",
      toastDashEn: "Afterburner Dash ++",
      toastDashAr: "اندفاعة النفاثة ++",
      toastVitalityEn: "Hull Plating ++",
      toastVitalityAr: "درع الهيكل ++",
      toastPierceEn: "Piercing Rounds ++",
      toastPierceAr: "رصاص مخترق ++",
      toastPatternEn: "Multi-Shot ++",
      toastPatternAr: "رشقات متعددة ++",
      toastBoltEn: "Bolt Core ++",
      toastBoltAr: "نواة البرق ++",
      toastAltEn: "Alt Core ++ (new mode)",
      toastAltAr: "نواة المهارة البديلة ++",
      gameOverTitle: score => `تم إسقاط طائرتك`,
      gameOverSubtitle: (score, level, combo) =>
        `النتيجة النهائية: ${score.toFixed(0)}، المستوى ${level}، أفضل سلسلة ${combo.toFixed(0)}.`,
      gameOverSmall: "اضغط R على الكمبيوتر أو أعد تحميل الصفحة لبدء طلعة جديدة.",
      lbTitle: "لوحة المتصدرين المحلية"
    }
  };

  let lang = "en";

  // HUD
  const hud = document.createElement("div");
  hud.id = "hud";
  hud.innerHTML = `
    <div class="line"><span id="labelScore" class="label"></span><span id="hudScore" class="value">0</span></div>
    <div class="line"><span id="labelLevel" class="label"></span><span id="hudLevel" class="value">1</span></div>
    <div class="line"><span id="labelCombo" class="label"></span><span id="hudCombo" class="value">0</span></div>
    <div class="line">
      <span id="labelHp" class="label"></span>
      <div id="healthBarOuter">
        <div id="healthBarInner"></div>
      </div>
    </div>
    <div class="line">
      <span id="labelAlt" class="label"></span><span id="hudAlt" class="value">READY</span>
    </div>
  `;
  document.body.appendChild(hud);

  const hint = document.createElement("div");
  hint.id = "hint";
  document.body.appendChild(hint);

  const centerMessage = document.createElement("div");
  centerMessage.id = "centerMessage";
  document.body.appendChild(centerMessage);

  const upgradeToast = document.createElement("div");
  upgradeToast.id = "upgradeToast";
  upgradeToast.innerHTML = `<span class="en"></span><span class="ar"></span>`;
  document.body.appendChild(upgradeToast);
  const upgradeToastEn = upgradeToast.querySelector(".en");
  const upgradeToastAr = upgradeToast.querySelector(".ar");

  const pauseOverlay = document.createElement("div");
  pauseOverlay.id = "pauseOverlay";
  pauseOverlay.innerHTML = `
    <div id="pausePanel">
      <div id="pausePanelTitle"></div>
      <div id="pausePanelSubtitle"></div>
      <button id="btnResume" class="pause-btn"></button>
      <div class="pause-line">
        <span class="pause-label" id="labelLanguage"></span>
        <button id="btnLang" class="pause-btn"></button>
      </div>
      <div class="pause-line">
        <span class="pause-label" id="labelVolume"></span>
        <input type="range" id="volumeSlider" min="0" max="1" step="0.05" value="0.5" />
      </div>
      <div class="pause-line">
        <span class="pause-label" id="labelMusic"></span>
        <input type="range" id="musicSlider" min="0" max="1" step="0.05" value="0.35" />
      </div>
    </div>
  `;
  document.body.appendChild(pauseOverlay);

  const pausePanelTitle = document.getElementById("pausePanelTitle");
  const pausePanelSubtitle = document.getElementById("pausePanelSubtitle");
  const btnResume = document.getElementById("btnResume");
  const btnLang = document.getElementById("btnLang");
  const volumeSlider = document.getElementById("volumeSlider");
  const musicSlider = document.getElementById("musicSlider");
  const labelLanguage = document.getElementById("labelLanguage");
  const labelVolume = document.getElementById("labelVolume");
  const labelMusic = document.getElementById("labelMusic");

  const hudScoreEl = document.getElementById("hudScore");
  const hudLevelEl = document.getElementById("hudLevel");
  const hudComboEl = document.getElementById("hudCombo");
  const healthBarInner = document.getElementById("healthBarInner");
  const hudAltEl = document.getElementById("hudAlt");

  const labelScore = document.getElementById("labelScore");
  const labelLevel = document.getElementById("labelLevel");
  const labelCombo = document.getElementById("labelCombo");
  const labelHp = document.getElementById("labelHp");
  const labelAlt = document.getElementById("labelAlt");

  // bottom-right leaderboard
  const leaderboardBR = document.createElement("div");
  leaderboardBR.id = "leaderboardBR";
  leaderboardBR.innerHTML = `
    <div id="leaderboardBRTitle"></div>
    <div id="leaderboardBRList"></div>
  `;
  document.body.appendChild(leaderboardBR);
  const leaderboardTitleEl = document.getElementById("leaderboardBRTitle");
  const leaderboardListEl = document.getElementById("leaderboardBRList");

  // pilot name modal
  const nameModal = document.createElement("div");
  nameModal.id = "playerNameModal";
  nameModal.innerHTML = `
    <h2>⚡ Pilot Name / اسم الطيار</h2>
    <p>Pick a callsign that will appear in your local leaderboard.</p>
    <input id="playerNameInput" maxlength="18" placeholder="MAD, OGKING, etc" />
    <button id="playerNameBtn">Start Mission</button>
    <div id="playerNameHint">You can restart runs, the same name stays until you reload the page.</div>
  `;
  document.body.appendChild(nameModal);

  const nameInputEl = document.getElementById("playerNameInput");
  const nameBtnEl = document.getElementById("playerNameBtn");

  let playerName = "Anonymous";
  let hasPlayerName = false;

  nameBtnEl.addEventListener("click", () => {
    const v = (nameInputEl.value || "").trim();
    if (!v) {
      nameInputEl.focus();
      return;
    }
    playerName = v;
    hasPlayerName = true;
    nameModal.style.display = "none";
  });

  nameInputEl.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      nameBtnEl.click();
    }
  });

  // mobile controls state
  const touchState = {
    using: isTouchDevice,
    joyTouchId: null,
    joyStartX: 0,
    joyStartY: 0,
    joyVectorX: 0,
    joyVectorY: 0,
    joyActive: false
  };

  if (isTouchDevice) {
    const mobileControlsRoot = document.createElement("div");
    mobileControlsRoot.id = "mobileControls";
    mobileControlsRoot.innerHTML = `
      <div id="mc-joystick-area"></div>
      <div id="mc-buttons-area">
        <div id="mc-btn-fire" class="mc-btn">FIRE</div>
        <div id="mc-btn-alt" class="mc-btn">ALT</div>
      </div>
      <div id="mc-joy-base"></div>
      <div id="mc-joy-stick"></div>
    `;
    document.body.appendChild(mobileControlsRoot);

    const joyAreaEl = document.getElementById("mc-joystick-area");
    const joyBaseEl = document.getElementById("mc-joy-base");
    const joyStickEl = document.getElementById("mc-joy-stick");
    const btnFireEl = document.getElementById("mc-btn-fire");
    const btnAltEl = document.getElementById("mc-btn-alt");

    const joyMaxRadius = 48;
    joyBaseEl.style.opacity = "0";
    joyStickEl.style.opacity = "0";

    function joyStart(ev) {
      const t = ev.changedTouches[0];
      touchState.joyTouchId = t.identifier;
      touchState.joyStartX = t.clientX;
      touchState.joyStartY = t.clientY;
      touchState.joyVectorX = 0;
      touchState.joyVectorY = 0;
      touchState.joyActive = true;

      joyBaseEl.style.left = `${t.clientX}px`;
      joyBaseEl.style.top = `${t.clientY}px`;
      joyStickEl.style.left = `${t.clientX}px`;
      joyStickEl.style.top = `${t.clientY}px`;
      joyBaseEl.style.opacity = "1";
      joyStickEl.style.opacity = "1";
    }

    function joyMove(ev) {
      for (const t of ev.changedTouches) {
        if (t.identifier === touchState.joyTouchId) {
          const dx = t.clientX - touchState.joyStartX;
          const dy = t.clientY - touchState.joyStartY;
          const dist = Math.hypot(dx, dy);
          if (dist > 0) {
            const clamped = Math.min(dist, joyMaxRadius);
            const nx = dx / dist;
            const ny = dy / dist;
            touchState.joyVectorX = (clamped / joyMaxRadius) * nx;
            touchState.joyVectorY = (clamped / joyMaxRadius) * ny;
            joyStickEl.style.left = `${touchState.joyStartX + nx * clamped}px`;
            joyStickEl.style.top = `${touchState.joyStartY + ny * clamped}px`;
          } else {
            touchState.joyVectorX = 0;
            touchState.joyVectorY = 0;
            joyStickEl.style.left = `${touchState.joyStartX}px`;
            joyStickEl.style.top = `${touchState.joyStartY}px`;
          }
          break;
        }
      }
    }

    function joyEnd(ev) {
      for (const t of ev.changedTouches) {
        if (t.identifier === touchState.joyTouchId) {
          touchState.joyTouchId = null;
          touchState.joyActive = false;
          touchState.joyVectorX = 0;
          touchState.joyVectorY = 0;
          joyBaseEl.style.opacity = "0";
          joyStickEl.style.opacity = "0";
          break;
        }
      }
    }

    joyAreaEl.addEventListener(
      "touchstart",
      e => {
        e.preventDefault();
        if (touchState.joyTouchId == null) {
          joyStart(e);
        }
      },
      { passive: false }
    );

    window.addEventListener(
      "touchmove",
      e => {
        if (touchState.joyTouchId != null) {
          e.preventDefault();
          joyMove(e);
        }
      },
      { passive: false }
    );

    window.addEventListener(
      "touchend",
      e => {
        if (touchState.joyTouchId != null) {
          e.preventDefault();
          joyEnd(e);
        }
      },
      { passive: false }
    );

    window.addEventListener(
      "touchcancel",
      e => {
        if (touchState.joyTouchId != null) {
          e.preventDefault();
          joyEnd(e);
        }
      },
      { passive: false }
    );

    btnFireEl.addEventListener(
      "touchstart",
      e => {
        e.preventDefault();
        ensureAudio();
        input.mouseDown = true;
        startRun();
      },
      { passive: false }
    );
    btnFireEl.addEventListener(
      "touchend",
      e => {
        e.preventDefault();
        input.mouseDown = false;
      },
      { passive: false }
    );

    btnAltEl.addEventListener(
      "touchstart",
      e => {
        e.preventDefault();
        ensureAudio();
        input.altFire = true;
        startRun();
      },
      { passive: false }
    );
    btnAltEl.addEventListener(
      "touchend",
      e => {
        e.preventDefault();
        input.altFire = false;
      },
      { passive: false }
    );
  }

  function applyLanguageTextsIntro() {
    const t = TEXT[lang];
    if (tutorialMode) {
      centerMessage.innerHTML = `
        <div class="title">${t.introTitle}</div>
        <div class="subtitle">${t.introSubtitle}</div>
        <div class="small">
          <b>Controls / التحكم:</b><br>
          W A S D – Move / تحريك<br>
          Mouse – Aim / التصويب<br>
          Left mouse – Fire / إطلاق<br>
          Right mouse or Q – Alt fire / هجوم بديل<br>
          Shift – Dash / اندفاعة<br>
          ESC – Pause / إيقاف مؤقت<br>
          R – Restart / إعادة<br><br>
          On phones: left joystick to move, FIRE / ALT buttons to shoot and use alt fire.<br>
          على الجوال: عصا يسار للحركة، وأزرار FIRE / ALT للإطلاق والهجوم البديل.<br><br>
          ${t.introSmall}
        </div>
      `;
    } else {
      centerMessage.innerHTML = `
        <div class="title">${t.introTitle}</div>
        <div class="subtitle">${t.introSubtitle}</div>
        <div class="small">${t.introSmall}</div>
      `;
    }
  }

  function applyLanguageTextsHUD() {
    const t = TEXT[lang];
    labelScore.textContent = t.score;
    labelLevel.textContent = t.level;
    labelCombo.textContent = t.combo;
    labelHp.textContent = t.hp;
    labelAlt.textContent = t.altFire;
    hint.textContent = t.hint;
    pausePanelTitle.textContent = t.pausedTitle;
    pausePanelSubtitle.textContent = t.pausedSubtitle;
    btnResume.textContent = t.resume;
    labelLanguage.textContent = t.language;
    labelVolume.textContent = t.volume;
    labelMusic.textContent = t.music;
    btnLang.textContent = lang === "en" ? t.languageValueEn : t.languageValueAr;
    leaderboardTitleEl.textContent = t.lbTitle;
  }

  function applyLanguageGameOver(score, level, combo, highs) {
    const t = TEXT[lang];
    let hsHtml = "";
    if (highs && highs.length) {
      hsHtml += `<div style="margin-top:10px;font-size:13px;opacity:0.9;">${t.hsTitle}</div>`;
      hsHtml += `<div style="font-size:12px;opacity:0.85;margin-top:4px;">`;
      highs.forEach((h, i) => {
        const sc = typeof h.score === "number" ? h.score.toFixed(0) : h.score;
        const nm = h.name || "Pilot";
        hsHtml += `#${i + 1} – ${nm} • ${sc} (Lv ${h.level}, x${h.combo || 0})<br>`;
      });
      hsHtml += `</div>`;
    }
    centerMessage.innerHTML = `
      <div class="title">${t.gameOverTitle(score)}</div>
      <div class="subtitle">${t.gameOverSubtitle(score, level, combo)}</div>
      <div class="small">${t.gameOverSmall}</div>
      ${hsHtml}
    `;
  }

  applyLanguageTextsIntro();
  applyLanguageTextsHUD();

  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener("resize", resize);
  resize();

  function clamp(v, min, max) {
    return v < min ? min : v > max ? max : v;
  }

  // High score helpers
  function loadHighScores() {
    try {
      const raw = localStorage.getItem(HS_KEY);
      if (!raw) return [];
      const arr = JSON.parse(raw);
      if (!Array.isArray(arr)) return [];
      return arr;
    } catch {
      return [];
    }
  }
  function saveHighScores(list) {
    try {
      localStorage.setItem(HS_KEY, JSON.stringify(list));
    } catch {}
  }
  function recordScore(score, level, combo) {
    const list = loadHighScores();
    list.push({ name: playerName || "Pilot", score, level, combo });
    list.sort((a, b) => b.score - a.score);
    while (list.length > 5) list.pop();
    saveHighScores(list);
    refreshLeaderboardBR();
    return list;
  }
  function refreshLeaderboardBR() {
    const list = loadHighScores();
    leaderboardListEl.innerHTML = "";
    list.forEach((entry, idx) => {
      const row = document.createElement("div");
      row.className = "lb-row";
      const nameSpan = document.createElement("span");
      nameSpan.className = "name";
      nameSpan.textContent = `${idx + 1}. ${entry.name || "Pilot"}`;
      const scoreSpan = document.createElement("span");
      scoreSpan.className = "score";
      scoreSpan.textContent = Math.round(entry.score || 0);
      const metaSpan = document.createElement("span");
      metaSpan.className = "meta";
      metaSpan.textContent = `Lv ${entry.level || 1}, x${entry.combo || 0}`;
      row.appendChild(nameSpan);
      row.appendChild(scoreSpan);
      row.appendChild(metaSpan);
      leaderboardListEl.appendChild(row);
    });
  }
  refreshLeaderboardBR();

  // Audio
  let audioCtx = null;
  let masterGain = null;
  let sfxGain = null;
  let sfxVolume = 0.5;
  let musicVolume = 0.35;

  // Local background music
  const MUSIC_URL = "assets/spaceship-arcade.mp3";
  const bgm = document.createElement("audio");
  bgm.id = "bgm";
  bgm.src = MUSIC_URL;
  bgm.loop = true;
  bgm.preload = "auto";
  bgm.volume = musicVolume;
  document.body.appendChild(bgm);
  let bgmStarted = false;

  function ensureAudio() {
    // SFX via Web Audio, music via HTMLAudioElement
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      audioCtx = new AC();
      masterGain = audioCtx.createGain();
      masterGain.gain.value = 1.0;
      masterGain.connect(audioCtx.destination);

      sfxGain = audioCtx.createGain();
      sfxGain.gain.value = sfxVolume;
      sfxGain.connect(masterGain);
    } else if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    // Start BGM on first user-initiated audio setup
    if (!bgmStarted) {
      bgm
        .play()
        .then(() => {
          bgmStarted = true;
        })
        .catch(err => {
          console.log("BGM play blocked:", err);
        });
    }
  }

  function playTone({ freq = 440, type = "square", duration = 0.08, gain = 0.3, sweepTo = null }) {
    if (!audioCtx || !sfxGain) return;
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (sweepTo != null) {
      osc.frequency.linearRampToValueAtTime(sweepTo, now + duration);
    }
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(gain, now + 0.005);
    g.gain.linearRampToValueAtTime(0.0001, now + duration);
    osc.connect(g);
    g.connect(sfxGain);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  function playShoot() {
    playTone({ freq: 650, type: "square", duration: 0.05, gain: 0.25, sweepTo: 900 });
  }
  function playAlt(mode) {
    const baseFreq = [520, 620, 520, 440, 380][mode] || 500;
    playTone({ freq: baseFreq, type: "sawtooth", duration: 0.18, gain: 0.4, sweepTo: baseFreq * 0.4 });
  }
  function playPickup() {
    playTone({ freq: 900, type: "triangle", duration: 0.12, gain: 0.28, sweepTo: 1200 });
  }
  function playExplode() {
    playTone({ freq: 120, type: "sawtooth", duration: 0.2, gain: 0.35, sweepTo: 60 });
  }
  function playDash() {
    playTone({ freq: 320, type: "square", duration: 0.12, gain: 0.4, sweepTo: 220 });
  }
  function playDamage() {
    playTone({ freq: 200, type: "square", duration: 0.1, gain: 0.35, sweepTo: 80 });
  }
  function playBossSpawn() {
    playTone({ freq: 260, type: "sawtooth", duration: 0.35, gain: 0.5, sweepTo: 120 });
  }
  function playEnemyShot() {
    playTone({ freq: 420, type: "square", duration: 0.12, gain: 0.28, sweepTo: 260 });
  }

  volumeSlider.addEventListener("input", () => {
    sfxVolume = parseFloat(volumeSlider.value);
    if (sfxGain) sfxGain.gain.value = sfxVolume;
  });
  musicSlider.addEventListener("input", () => {
    musicVolume = parseFloat(musicSlider.value);
    bgm.volume = musicVolume;
  });

  // Input
  const input = {
    w: false,
    a: false,
    s: false,
    d: false,
    mouseDown: false,
    dash: false,
    altFire: false
  };
  const mouse = { x: 0, y: 0 };

  window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  let running = false;
  let gameOver = false;
  let paused = false;

  function setPaused(value) {
    paused = value;
    pauseOverlay.style.display = paused ? "flex" : "none";
  }

  function canStartRun() {
    return hasPlayerName;
  }

  function startRun() {
    if (!canStartRun()) return;
    ensureAudio();
    if (!running && !gameOver) {
      running = true;
      centerMessage.style.display = "none";
      if (tutorialMode) {
        tutorialMode = false;
        try {
          localStorage.setItem(TUTORIAL_KEY, "1");
        } catch {}
      }
    }
  }

  window.addEventListener("mousedown", e => {
    if (e.button === 0) {
      input.mouseDown = true;
      startRun();
    } else if (e.button === 2) {
      input.altFire = true;
      startRun();
    }
  });
  window.addEventListener("mouseup", e => {
    if (e.button === 0) input.mouseDown = false;
    if (e.button === 2) input.altFire = false;
  });

  window.addEventListener("keydown", e => {
    if (e.code === "KeyW") input.w = true;
    if (e.code === "KeyA") input.a = true;
    if (e.code === "KeyS") input.s = true;
    if (e.code === "KeyD") input.d = true;
    if (e.code === "ShiftLeft" || e.code === "ShiftRight") input.dash = true;
    if (e.code === "KeyQ") input.altFire = true;
    if (e.code === "KeyR" && gameOver) resetGame();
    if (e.code === "Escape") {
      if (!gameOver && running) {
        setPaused(!paused);
      }
    }
    if (
      !running &&
      !gameOver &&
      ["KeyW", "KeyA", "KeyS", "KeyD", "Space", "Enter"].includes(e.code)
    ) {
      startRun();
    }
  });
  window.addEventListener("keyup", e => {
    if (e.code === "KeyW") input.w = false;
    if (e.code === "KeyA") input.a = false;
    if (e.code === "KeyS") input.s = false;
    if (e.code === "KeyD") input.d = false;
    if (e.code === "ShiftLeft" || e.code === "ShiftRight") input.dash = false;
    if (e.code === "KeyQ") input.altFire = false;
  });

  btnResume.addEventListener("click", () => setPaused(false));
  btnLang.addEventListener("click", () => {
    lang = lang === "en" ? "ar" : "en";
    applyLanguageTextsHUD();
  });
  pauseOverlay.addEventListener("click", e => {
    if (e.target === pauseOverlay) setPaused(false);
  });

  const worldRadius = 2000;

  const player = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    radius: 16,
    maxSpeed: 340,
    accel: 1450,
    friction: 8,
    angle: 0,
    hp: 100,
    maxHp: 100,
    dashCooldown: 0,
    dashActive: 0,
    fireInterval: 0.12,
    bulletDamage: 14,
    bulletSpeed: 550,
    dashCooldownBase: 0.8,
    dashDuration: 0.24,
    dashSpeed: 1200,
    bulletPierce: 0,
    firePatternLevel: 0,
    altCooldown: 0,
    altCooldownBase: 3.0,
    altProjectiles: 14,
    bulletVisualLevel: 0,
    invulnTimer: 0,
    altLevel: 0
  };

  let bullets = [];
  let enemyBullets = [];
  let enemies = [];
  let particles = [];
  let pickups = [];

  let shootCooldown = 0;
  let score = 0;
  let level = 1;
  let combo = 0;
  let comboTimer = 0;
  let spawnTimer = 0;

  const themes = [
    { top: "#050509", bottom: "#020204" },
    { top: "#050712", bottom: "#02020a" },
    { top: "#061018", bottom: "#020509" },
    { top: "#070910", bottom: "#030308" }
  ];

  const stars = [];
  const starColors = ["#ffffff", "#c7ddff", "#9fd4ff"];
  for (let i = 0; i < 2500; i++) {
    stars.push({
      x: (Math.random() * 2 - 1) * worldRadius * 4,
      y: (Math.random() * 2 - 1) * worldRadius * 4,
      size: Math.random() * 1.9 + 0.7,
      alpha: Math.random() * 0.6 + 0.4,
      color: starColors[Math.floor(Math.random() * starColors.length)]
    });
  }

  let upgradeScorePool = 0;
  let upgradeThreshold = 150;
  let upgradeCount = 0;
  let upgradeToastTimer = 0;

  let bossActive = false;
  let lastBossLevel = 0;

  function showUpgradeToast(enText, arText) {
    upgradeToastEn.textContent = enText;
    upgradeToastAr.textContent = arText;
    upgradeToast.style.opacity = "1";
    upgradeToastTimer = 3.2;
  }

  function updateUpgradeToast(dt) {
    if (upgradeToastTimer > 0) {
      upgradeToastTimer -= dt;
      if (upgradeToastTimer <= 0) {
        upgradeToastTimer = 0;
        upgradeToast.style.opacity = "0";
      } else {
        const alpha = clamp(upgradeToastTimer, 0, 1);
        upgradeToast.style.opacity = String(alpha);
      }
    }
  }

  function updateHud() {
    if (!hudScoreEl || !hudLevelEl || !hudComboEl || !healthBarInner || !hudAltEl) return;
    hudScoreEl.textContent = score.toFixed(0);
    hudLevelEl.textContent = level.toString();
    hudComboEl.textContent = combo.toFixed(0);
    const hpPercent = clamp(player.hp / player.maxHp, 0, 1);
    healthBarInner.style.width = (hpPercent * 100).toFixed(1) + "%";

    if (player.altCooldown <= 0) {
      hudAltEl.textContent = "READY";
      hudAltEl.style.color = "#3cffb9";
    } else {
      hudAltEl.textContent = player.altCooldown.toFixed(1) + "s";
      hudAltEl.style.color = "#ffb13b";
    }
  }

  function addParticles(x, y, color, count, lifeMin, lifeMax, speedMin, speedMax) {
    for (let i = 0; i < count; i++) {
      const ang = Math.random() * Math.PI * 2;
      const mag = speedMin + Math.random() * (speedMax - speedMin);
      const life = lifeMin + Math.random() * (lifeMax - lifeMin);
      particles.push({
        x,
        y,
        vx: Math.cos(ang) * mag,
        vy: Math.sin(ang) * mag,
        life,
        maxLife: life,
        radius: 1 + Math.random() * 2,
        color
      });
    }
  }

  function spawnEnemy() {
    if (bossActive) return;

    const angle = Math.random() * Math.PI * 2;
    const minDist = 420;
    const maxDist = 720;
    const dist = minDist + Math.random() * (maxDist - minDist);
    const ex = player.x + Math.cos(angle) * dist;
    const ey = player.y + Math.sin(angle) * dist;

    const r = Math.random();
    let type;
    if (r < 0.35) type = "fighter";
    else if (r < 0.6) type = "interceptor";
    else if (r < 0.8) type = "bomber";
    else if (r < 0.93) type = "drone";
    else type = "ace";

    let speed, radius, hp, color, glow, scoreValue, damageFactor;
    if (type === "fighter") {
      speed = 135 + level * 4;
      radius = 16;
      hp = 20 + level * 2;
      color = "#40f3ff";
      glow = "rgba(64,243,255,0.9)";
      scoreValue = 22;
      damageFactor = 1.0;
    } else if (type === "interceptor") {
      speed = 190 + level * 5;
      radius = 13;
      hp = 16 + level * 1.5;
      color = "#ff5af7";
      glow = "rgba(255,90,247,0.9)";
      scoreValue = 26;
      damageFactor = 1.0;
    } else if (type === "bomber") {
      speed = 90 + level * 3;
      radius = 22;
      hp = 30 + level * 3.2;
      color = "#ffb13b";
      glow = "rgba(255,177,59,0.9)";
      scoreValue = 35;
      damageFactor = 1.2;
    } else if (type === "drone") {
      speed = 160 + level * 3.5;
      radius = 11;
      hp = 12 + level * 1.4;
      color = "#9bff7a";
      glow = "rgba(155,255,122,0.9)";
      scoreValue = 18;
      damageFactor = 0.8;
    } else {
      speed = 160 + level * 4.5;
      radius = 18;
      hp = 26 + level * 3.0;
      color = "#ff4b6e";
      glow = "rgba(255,75,110,0.95)";
      scoreValue = 45;
      damageFactor = 1.3;
    }

    enemies.push({
      x: ex,
      y: ey,
      vx: 0,
      vy: 0,
      radius,
      speed,
      hp,
      maxHp: hp,
      type,
      color,
      glow,
      scoreValue,
      damageFactor,
      boss: false,
      shotTimer: 0
    });
  }

  function spawnBoss() {
    const angle = Math.random() * Math.PI * 2;
    const dist = 680;
    const ex = player.x + Math.cos(angle) * dist;
    const ey = player.y + Math.sin(angle) * dist;

    const baseHp = 260 + level * 45;
    enemies.push({
      x: ex,
      y: ey,
      vx: 0,
      vy: 0,
      radius: 40,
      speed: 130 + level * 4,
      hp: baseHp,
      maxHp: baseHp,
      type: "boss_core",
      color: "#ff1744",
      glow: "rgba(255,23,68,0.98)",
      scoreValue: 220 + level * 18,
      damageFactor: 2.0,
      boss: true,
      shotTimer: 1.5 + Math.random() * 1.5
    });
    bossActive = true;
    addParticles(ex, ey, "rgba(255,23,68,0.95)", 70, 0.5, 1.2, 120, 260);
    playBossSpawn();
  }

  function spawnBossShots(e) {
    const count = Math.random() < 0.6 ? 1 : 2;
    const baseAng = Math.atan2(player.y - e.y, player.x - e.x);
    const speed = 260 + level * 10;
    for (let i = 0; i < count; i++) {
      const spread = count === 2 ? (i === 0 ? -0.18 : 0.18) : 0;
      const ang = baseAng + spread;
      const bx = e.x + Math.cos(ang) * (e.radius + 6);
      const by = e.y + Math.sin(ang) * (e.radius + 6);
      enemyBullets.push({
        x: bx,
        y: by,
        vx: Math.cos(ang) * speed,
        vy: Math.sin(ang) * speed,
        radius: 7,
        life: 5,
        damage: 18 + level * 1.3,
        color: "#ffcf5a"
      });
      addParticles(bx, by, "rgba(255,207,90,0.9)", 8, 0.2, 0.4, 80, 160);
    }
    playEnemyShot();
  }

  function triggerGameOver() {
    const highs = recordScore(score, level, combo);
    gameOver = true;
    running = false;
    setPaused(false);
    centerMessage.style.display = "block";
    applyLanguageGameOver(score, level, combo, highs);
  }

  const bulletColors = ["#00ffd5", "#7eff3b", "#ffe600", "#ff8a00", "#ff2b5c", "#ff4bff"];
  function getBulletColor(level) {
    const idx = clamp(level, 0, bulletColors.length - 1);
    return bulletColors[idx];
  }

  function choosePickupType(enemyType) {
    let pool;
    if (enemyType === "bomber" || enemyType === "ace" || enemyType === "boss_core") {
      pool = ["power", "vitality", "pierce", "pattern", "bolt", "alt"];
    } else if (enemyType === "interceptor" || enemyType === "drone") {
      pool = ["rapid", "dash", "speed", "pattern", "bolt", "alt"];
    } else {
      pool = ["rapid", "speed", "vitality", "pattern", "bolt", "alt"];
    }
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function spawnPickup(x, y, type) {
    let color, auraColor, labelEn, labelAr;
    if (type === "rapid") {
      color = "#00ffd5";
      auraColor = "rgba(0,255,213,0.85)";
      labelEn = "Rapid";
      labelAr = "سريع";
    } else if (type === "power") {
      color = "#ff5c5c";
      auraColor = "rgba(255,92,92,0.85)";
      labelEn = "Power";
      labelAr = "قوة";
    } else if (type === "speed") {
      color = "#7eff3b";
      auraColor = "rgba(126,255,59,0.85)";
      labelEn = "Speed";
      labelAr = "سرعة";
    } else if (type === "dash") {
      color = "#ffb13b";
      auraColor = "rgba(255,177,59,0.85)";
      labelEn = "Dash";
      labelAr = "اندفاعة";
    } else if (type === "vitality") {
      color = "#ff66ff";
      auraColor = "rgba(255,102,255,0.85)";
      labelEn = "Hull";
      labelAr = "درع";
    } else if (type === "pierce") {
      color = "#c68bff";
      auraColor = "rgba(198,139,255,0.85)";
      labelEn = "Pierce";
      labelAr = "اختراق";
    } else if (type === "pattern") {
      color = "#6df2ff";
      auraColor = "rgba(109,242,255,0.9)";
      labelEn = "Multi";
      labelAr = "متعدد";
    } else if (type === "bolt") {
      color = "#ffffff";
      auraColor = "rgba(255,255,255,0.9)";
      labelEn = "Bolt";
      labelAr = "برق";
    } else if (type === "alt") {
      color = "#4f9dff";
      auraColor = "rgba(79,157,255,0.9)";
      labelEn = "Alt";
      labelAr = "بديل";
    } else {
      color = "#ffffff";
      auraColor = "rgba(255,255,255,0.85)";
      labelEn = "?";
      labelAr = "?";
    }

    pickups.push({
      x,
      y,
      radius: 20,
      type,
      color,
      auraColor,
      labelEn,
      labelAr,
      life: 22,
      pulse: Math.random() * Math.PI * 2
    });
  }

  function applyUpgrade(type) {
    const t = TEXT[lang];
    switch (type) {
      case "rapid":
        player.fireInterval = Math.max(0.045, player.fireInterval * 0.87);
        showUpgradeToast(t.toastRapidEn, t.toastRapidAr);
        break;
      case "power":
        player.bulletDamage *= 1.2;
        showUpgradeToast(t.toastPowerEn, t.toastPowerAr);
        break;
      case "speed":
        player.maxSpeed *= 1.12;
        player.accel *= 1.12;
        showUpgradeToast(t.toastSpeedEn, t.toastSpeedAr);
        break;
      case "dash":
        player.dashCooldownBase *= 0.86;
        player.dashSpeed *= 1.12;
        showUpgradeToast(t.toastDashEn, t.toastDashAr);
        break;
      case "vitality":
        player.maxHp += 20;
        player.hp = clamp(player.hp + 25, 0, player.maxHp);
        showUpgradeToast(t.toastVitalityEn, t.toastVitalityAr);
        break;
      case "pierce":
        player.bulletPierce = clamp(player.bulletPierce + 1, 0, 4);
        showUpgradeToast(t.toastPierceEn, t.toastPierceAr);
        break;
      case "pattern":
        player.firePatternLevel = clamp(player.firePatternLevel + 1, 0, 4);
        showUpgradeToast(t.toastPatternEn, t.toastPatternAr);
        break;
      case "bolt":
        player.bulletVisualLevel = clamp(player.bulletVisualLevel + 1, 0, 5);
        showUpgradeToast(t.toastBoltEn, t.toastBoltAr);
        break;
      case "alt":
        player.altLevel = clamp(player.altLevel + 1, 0, 4);
        player.altCooldownBase = Math.max(1.2, player.altCooldownBase * 0.9);
        player.altProjectiles += 2;
        showUpgradeToast(t.toastAltEn, t.toastAltAr);
        break;
      default:
        showUpgradeToast("Upgrade ++", "ترقية ++");
        break;
    }
    updateHud();
  }

  function spawnMainFireBullets() {
    const pattern = player.firePatternLevel;
    const angles = [player.angle];

    if (pattern >= 1) {
      const s = 0.12;
      angles.push(player.angle - s, player.angle + s);
    }
    if (pattern >= 2) {
      const s = 0.22;
      angles.push(player.angle - s, player.angle + s);
    }
    if (pattern >= 3) {
      angles.push(player.angle + Math.PI / 2, player.angle - Math.PI / 2);
    }
    if (pattern >= 4) {
      angles.push(player.angle + Math.PI);
    }

    const bulletLevel = player.bulletVisualLevel;
    const radiusBase = 4;
    const radius = radiusBase + bulletLevel * 1.7;

    for (const ang of angles) {
      const bx = player.x + Math.cos(ang) * 24;
      const by = player.y + Math.sin(ang) * 24;
      bullets.push({
        x: bx,
        y: by,
        vx: Math.cos(ang) * player.bulletSpeed,
        vy: Math.sin(ang) * player.bulletSpeed,
        radius,
        life: 1.2 + bulletLevel * 0.12,
        damage: player.bulletDamage,
        pierce: player.bulletPierce,
        powerLevel: bulletLevel
      });
      addParticles(bx, by, "rgba(0,255,200,0.7)", 3, 0.1, 0.2, 80, 160);
    }
    playShoot();
  }

  function tryAltFire() {
    if (player.altCooldown > 0) return;
    const mode = player.altLevel || 0;
    player.altCooldown = player.altCooldownBase;

    const bulletLevel = clamp(player.bulletVisualLevel + (mode > 0 ? 1 : 0), 0, 5);

    if (mode === 0) {
      const count = player.altProjectiles;
      const baseDamage = player.bulletDamage * 1.35;
      const speed = player.bulletSpeed * 0.8;
      const radius = 5 + bulletLevel * 1.8;

      for (let i = 0; i < count; i++) {
        const ang = (Math.PI * 2 * i) / count;
        const bx = player.x + Math.cos(ang) * 10;
        const by = player.y + Math.sin(ang) * 10;
        bullets.push({
          x: bx,
          y: by,
          vx: Math.cos(ang) * speed,
          vy: Math.sin(ang) * speed,
          radius,
          life: 0.9 + bulletLevel * 0.1,
          damage: baseDamage,
          pierce: player.bulletPierce + 1,
          powerLevel: bulletLevel
        });
      }
      addParticles(player.x, player.y, "rgba(0,255,220,0.9)", 40, 0.3, 0.7, 150, 320);
      addParticles(player.x, player.y, "rgba(255,255,255,0.9)", 22, 0.3, 0.7, 100, 260);
    } else if (mode === 1) {
      const count = player.altProjectiles + 8;
      const baseDamage = player.bulletDamage * 1.55;
      const speed = player.bulletSpeed * 0.9;
      const radius = 7 + bulletLevel * 2.0;

      for (let i = 0; i < count; i++) {
        const ang = (Math.PI * 2 * i) / count;
        const bx = player.x + Math.cos(ang) * 14;
        const by = player.y + Math.sin(ang) * 14;
        bullets.push({
          x: bx,
          y: by,
          vx: Math.cos(ang) * speed,
          vy: Math.sin(ang) * speed,
          radius,
          life: 1.0 + bulletLevel * 0.1,
          damage: baseDamage,
          pierce: player.bulletPierce + 1,
          powerLevel: bulletLevel
        });
      }
      addParticles(player.x, player.y, "rgba(0,255,240,0.9)", 55, 0.3, 0.7, 160, 340);
      addParticles(player.x, player.y, "rgba(255,255,255,0.95)", 26, 0.3, 0.7, 120, 280);
    } else if (mode === 2) {
      const count = 20 + player.altProjectiles;
      const baseDamage = player.bulletDamage * 1.75;
      const speed = player.bulletSpeed * 1.15;
      const radius = 6 + bulletLevel * 2.2;
      const spread = 0.6;

      for (let i = 0; i < count; i++) {
        const t = i / (count - 1) - 0.5;
        const ang = player.angle + t * spread;
        const bx = player.x + Math.cos(player.angle) * 24;
        const by = player.y + Math.sin(player.angle) * 24;
        bullets.push({
          x: bx,
          y: by,
          vx: Math.cos(ang) * speed,
          vy: Math.sin(ang) * speed,
          radius,
          life: 1.0 + bulletLevel * 0.1,
          damage: baseDamage,
          pierce: player.bulletPierce + 2,
          powerLevel: bulletLevel
        });
      }
      addParticles(player.x, player.y, "rgba(0,255,210,0.9)", 40, 0.25, 0.55, 180, 360);
      addParticles(player.x, player.y, "rgba(255,255,255,0.95)", 22, 0.25, 0.55, 140, 300);
    } else if (mode === 3) {
      const arms = 4;
      const perArm = 12 + Math.floor(player.altProjectiles / 2);
      const baseDamage = player.bulletDamage * 1.6;
      const speed = player.bulletSpeed * 0.95;
      const radius = 6 + bulletLevel * 2.0;

      for (let arm = 0; arm < arms; arm++) {
        const armOffset = (Math.PI * 2 * arm) / arms;
        for (let i = 0; i < perArm; i++) {
          const t = i / perArm;
          const ang = player.angle + armOffset + t * Math.PI * 1.5;
          const dist = 10 + t * 80;
          const bx = player.x + Math.cos(ang) * dist;
          const by = player.y + Math.sin(ang) * dist;
          bullets.push({
            x: bx,
            y: by,
            vx: Math.cos(ang) * speed,
            vy: Math.sin(ang) * speed,
            radius,
            life: 0.8 + bulletLevel * 0.12,
            damage: baseDamage,
            pierce: player.bulletPierce + 2,
            powerLevel: bulletLevel
          });
        }
      }
      addParticles(player.x, player.y, "rgba(0,255,240,0.9)", 50, 0.35, 0.7, 150, 260);
      addParticles(player.x, player.y, "rgba(255,255,255,0.9)", 26, 0.35, 0.7, 120, 220);
    } else {
      const baseDamage = player.bulletDamage * 2.0;
      const radius = 7 + bulletLevel * 2.4;
      const segments = 26;
      const step = 60;

      for (let i = 1; i <= segments; i++) {
        const dist = 40 + step * i;
        const bx = player.x + Math.cos(player.angle) * dist;
        const by = player.y + Math.sin(player.angle) * dist;
        bullets.push({
          x: bx,
          y: by,
          vx: 0,
          vy: 0,
          radius,
          life: 0.26 + bulletLevel * 0.05,
          damage: baseDamage,
          pierce: player.bulletPierce + 4,
          powerLevel: bulletLevel
        });
      }
      addParticles(player.x, player.y, "rgba(56,189,248,0.95)", 40, 0.25, 0.45, 160, 260);
      addParticles(player.x, player.y, "rgba(255,255,255,0.95)", 20, 0.25, 0.45, 120, 220);
    }

    playAlt(mode);
  }

  function resetGame() {
    player.x = 0;
    player.y = 0;
    player.vx = 0;
    player.vy = 0;
    player.maxSpeed = 340;
    player.accel = 1450;
    player.maxHp = 100;
    player.hp = player.maxHp;
    player.dashCooldown = 0;
    player.dashActive = 0;
    player.fireInterval = 0.12;
    player.bulletDamage = 14;
    player.bulletSpeed = 550;
    player.dashCooldownBase = 0.8;
    player.dashDuration = 0.24;
    player.dashSpeed = 1200;
    player.bulletPierce = 0;
    player.firePatternLevel = 0;
    player.altCooldownBase = 3.0;
    player.altCooldown = 0;
    player.altProjectiles = 14;
    player.bulletVisualLevel = 0;
    player.invulnTimer = 0;
    player.altLevel = 0;

    bullets = [];
    enemyBullets = [];
    enemies = [];
    particles = [];
    pickups = [];

    score = 0;
    level = 1;
    combo = 0;
    comboTimer = 0;
    spawnTimer = 0;
    shootCooldown = 0;
    gameOver = false;
    running = false;
    paused = false;
    upgradeScorePool = 0;
    upgradeThreshold = 150;
    upgradeCount = 0;
    upgradeToastTimer = 0;
    bossActive = false;
    lastBossLevel = 0;
    upgradeToast.style.opacity = "0";

    pauseOverlay.style.display = "none";

    applyLanguageTextsIntro();
    centerMessage.style.display = "block";
    updateHud();
  }
  resetGame();

  function update(dt) {
    updateUpgradeToast(dt);
    if (!running || gameOver || paused) return;

    if (player.invulnTimer > 0) player.invulnTimer -= dt;
    if (player.altCooldown > 0) {
      player.altCooldown -= dt;
      if (player.altCooldown < 0) player.altCooldown = 0;
    }

    if (combo > 0) {
      comboTimer -= dt;
      if (comboTimer <= 0) combo = 0;
    }

    const w = canvas.width / (window.devicePixelRatio || 1);
    const h = canvas.height / (window.devicePixelRatio || 1);
    const cx = w / 2;
    const cy = h / 2;
    const dxm = mouse.x - cx;
    const dym = mouse.y - cy;
    player.angle = Math.atan2(dym, dxm);

    let ix = 0,
      iy = 0;
    if (input.w) iy -= 1;
    if (input.s) iy += 1;
    if (input.a) ix -= 1;
    if (input.d) ix += 1;

    if (isTouchDevice && touchState.joyActive) {
      ix = touchState.joyVectorX;
      iy = touchState.joyVectorY;
    }

    const len = Math.hypot(ix, iy) || 1;
    ix /= len;
    iy /= len;

    if (isTouchDevice && (ix !== 0 || iy !== 0)) {
      player.angle = Math.atan2(iy, ix);
    }

    if (player.dashCooldown > 0) player.dashCooldown -= dt;
    if (player.dashActive > 0) {
      player.dashActive -= dt;
      if (player.dashActive <= 0) {
        player.dashActive = 0;
      }
    } else if (input.dash && player.dashCooldown <= 0 && (ix !== 0 || iy !== 0)) {
      player.vx = ix * player.dashSpeed;
      player.vy = iy * player.dashSpeed;
      player.dashActive = player.dashDuration;
      player.dashCooldown = player.dashCooldownBase;
      player.invulnTimer = player.dashDuration + 0.15;
      addParticles(player.x, player.y, "rgba(0,255,200,0.8)", 32, 0.25, 0.5, 180, 320);
      playDash();

      const shockRadius = 140;
      for (const e of enemies) {
        const d = Math.hypot(e.x - player.x, e.y - player.y);
        if (d < shockRadius) {
          e.hp -= player.bulletDamage * 1.9 + level * 3;
          addParticles(e.x, e.y, e.glow, 12, 0.2, 0.4, 100, 220);
        }
      }
    }

    if (ix !== 0 || iy !== 0) {
      player.vx += ix * player.accel * dt;
      player.vy += iy * player.accel * dt;
    }

    const s = Math.hypot(player.vx, player.vy);
    if (s > 0) {
      const drag = 1 - Math.min(player.friction * dt, 0.98);
      player.vx *= drag;
      player.vy *= drag;
    }

    const sp = Math.hypot(player.vx, player.vy);
    if (sp > player.maxSpeed && player.dashActive <= 0) {
      const f = player.maxSpeed / sp;
      player.vx *= f;
      player.vy *= f;
    }

    player.x += player.vx * dt;
    player.y += player.vy * dt;

    if (shootCooldown > 0) shootCooldown -= dt;
    if (input.mouseDown && shootCooldown <= 0) {
      shootCooldown = player.fireInterval;
      spawnMainFireBullets();
    }

    if (input.altFire) {
      tryAltFire();
      input.altFire = false;
    }

    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i];
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.life -= dt;
      if (b.life <= 0) bullets.splice(i, 1);
    }

    spawnTimer -= dt;
    if (spawnTimer <= 0) {
      const base = 0.9;
      const rate = base - Math.min((level - 1) * 0.04, 0.6);
      spawnTimer = clamp(rate, bossActive ? 0.5 : 0.18, 999);
      spawnEnemy();
    }

    for (let i = enemies.length - 1; i >= 0; i--) {
      const e = enemies[i];

      const dx = player.x - e.x;
      const dy = player.y - e.y;
      const dist = Math.hypot(dx, dy) || 1;

      const targetSpeed = e.speed;
      e.vx += (dx / dist) * targetSpeed * 0.7 * dt;
      e.vy += (dy / dist) * targetSpeed * 0.7 * dt;

      const es = Math.hypot(e.vx, e.vy);
      if (es > targetSpeed) {
        const f = targetSpeed / es;
        e.vx *= f;
        e.vy *= f;
      }

      e.x += e.vx * dt;
      e.y += e.vy * dt;

      if (e.boss) {
        if (e.shotTimer == null) e.shotTimer = 2 + Math.random() * 2;
        e.shotTimer -= dt;
        if (e.shotTimer <= 0) {
          spawnBossShots(e);
          e.shotTimer = 2 + Math.random() * 2;
        }
      }

      for (let j = bullets.length - 1; j >= 0; j--) {
        const b = bullets[j];
        const ddx = b.x - e.x;
        const ddy = b.y - e.y;
        const d = Math.hypot(ddx, ddy);
        if (d < e.radius + b.radius) {
          e.hp -= b.damage;
          addParticles(e.x, e.y, e.glow, 10, 0.2, 0.4, 80, 180);

          if (b.pierce > 0) {
            b.pierce -= 1;
          } else {
            bullets.splice(j, 1);
          }

          if (e.hp <= 0) {
            playExplode();
            addParticles(e.x, e.y, "rgba(255,255,255,0.9)", 16, 0.3, 0.6, 100, 220);
            addParticles(e.x, e.y, e.glow, 20, 0.3, 0.6, 120, 260);

            const baseScore = e.scoreValue || 20;
            combo += 1;
            comboTimer = 3;
            score += baseScore * (1 + combo * 0.06);

            upgradeScorePool += baseScore;
            const drops = e.boss ? 4 : 1;
            for (let dDrop = 0; dDrop < drops; dDrop++) {
              if (upgradeScorePool >= upgradeThreshold) {
                upgradeScorePool -= upgradeThreshold;
                upgradeCount++;
                upgradeThreshold *= 1.25;
                const pickType = choosePickupType(e.type);
                const offX = (Math.random() - 0.5) * 40;
                const offY = (Math.random() - 0.5) * 40;
                spawnPickup(e.x + offX, e.y + offY, pickType);
              }
            }

            if (e.boss) {
              bossActive = false;
            }

            enemies.splice(i, 1);

            const levelUpNeed = 150 + (level - 1) * 110;
            if (score > levelUpNeed * level) {
              level++;
              player.maxHp += 6;
              player.hp = clamp(player.hp + 12, 0, player.maxHp);
              player.maxSpeed += 10;
              addParticles(
                player.x,
                player.y,
                "rgba(0,255,180,0.85)",
                30,
                0.4,
                0.8,
                160,
                300
              );
            }

            updateHud();
          }
          break;
        }
      }

      const distToPlayer = Math.hypot(e.x - player.x, e.y - player.y);
      if (distToPlayer < e.radius + player.radius) {
        if (player.dashActive <= 0 && player.invulnTimer <= 0) {
          const baseDamage = player.maxHp * 0.4;
          const typeFactor = e.damageFactor || 1.0;
          const damage = baseDamage * typeFactor;

          player.hp -= damage;
          player.invulnTimer = 0.5;

          const nx = (player.x - e.x) / (distToPlayer || 1);
          const ny = (player.y - e.y) / (distToPlayer || 1);
          player.vx += nx * 260;
          player.vy += ny * 260;

          addParticles(player.x, player.y, "rgba(255,60,60,0.9)", 24, 0.2, 0.5, 140, 260);
          playDamage();
          updateHud();

          if (player.hp <= 0) {
            player.hp = 0;
            updateHud();
            triggerGameOver();
          }
        } else if (player.dashActive > 0) {
          e.hp -= player.bulletDamage * 1.7 + level * 2;
          addParticles(e.x, e.y, e.glow, 12, 0.2, 0.4, 100, 200);
          if (e.hp <= 0) {
            playExplode();
            const baseScore = e.scoreValue || 20;
            combo += 1;
            comboTimer = 3;
            score += baseScore * (1 + combo * 0.06);

            upgradeScorePool += baseScore;
            if (upgradeScorePool >= upgradeThreshold) {
              upgradeScorePool -= upgradeThreshold;
              upgradeCount++;
              upgradeThreshold *= 1.25;
              const pickType = choosePickupType(e.type);
              spawnPickup(e.x, e.y, pickType);
            }

            if (e.boss) bossActive = false;
            enemies.splice(i, 1);
            updateHud();
          }
        }
      }
    }

    if (!bossActive && level >= 3 && level % 4 === 0 && level !== lastBossLevel) {
      lastBossLevel = level;
      spawnBoss();
    }

    for (let i = pickups.length - 1; i >= 0; i--) {
      const p = pickups[i];
      p.pulse += dt * 3;
      p.life -= dt;
      if (p.life <= 0) {
        pickups.splice(i, 1);
        continue;
      }
      const d = Math.hypot(player.x - p.x, player.y - p.y);
      if (d < player.radius + p.radius + 6) {
        applyUpgrade(p.type);
        addParticles(p.x, p.y, p.auraColor, 20, 0.2, 0.5, 120, 260);
        playPickup();
        pickups.splice(i, 1);
      }
    }

    for (let i = enemyBullets.length - 1; i >= 0; i--) {
      const b = enemyBullets[i];
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.life -= dt;
      if (b.life <= 0) {
        enemyBullets.splice(i, 1);
        continue;
      }
      const dx = b.x - player.x;
      const dy = b.y - player.y;
      const d = Math.hypot(dx, dy);
      if (d < player.radius + b.radius) {
        enemyBullets.splice(i, 1);
        if (player.dashActive <= 0 && player.invulnTimer <= 0) {
          player.hp -= b.damage;
          player.invulnTimer = 0.5;
          addParticles(player.x, player.y, "rgba(255,207,90,0.95)", 18, 0.25, 0.5, 120, 220);
          playDamage();
          updateHud();
          if (player.hp <= 0) {
            player.hp = 0;
            updateHud();
            triggerGameOver();
          }
        }
      }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
      if (p.life <= 0) particles.splice(i, 1);
    }

    updateHud();
  }

  function draw() {
    const w = canvas.width / (window.devicePixelRatio || 1);
    const h = canvas.height / (window.devicePixelRatio || 1);

    ctx.clearRect(0, 0, w, h);
    ctx.save();

    const themeIndex = Math.max(0, Math.floor((level - 1) / 3)) % themes.length;
    const theme = themes[themeIndex];

    const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
    skyGrad.addColorStop(0, theme.top);
    skyGrad.addColorStop(1, theme.bottom);
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    ctx.translate(cx, cy);

    ctx.save();
    const vignetteR = Math.max(w, h) * 0.9;
    const vGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, vignetteR);
    vGrad.addColorStop(0, "rgba(15,23,42,0.45)");
    vGrad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = vGrad;
    ctx.beginPath();
    ctx.arc(0, 0, vignetteR, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    for (const s of stars) {
      const sx = s.x - player.x * 0.17;
      const sy = s.y - player.y * 0.17;
      ctx.globalAlpha = s.alpha;
      ctx.fillStyle = s.color;
      ctx.fillRect(sx, sy, s.size, s.size);
    }
    ctx.restore();

    ctx.save();
    for (const p of particles) {
      const lifeRatio = p.life / p.maxLife;
      const alpha = clamp(lifeRatio, 0, 1) * 0.9;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x - player.x, p.y - player.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    ctx.save();
    for (const p of pickups) {
      const px = p.x - player.x;
      const py = p.y - player.y;
      const r = p.radius + Math.sin(p.pulse) * 2;

      const grad = ctx.createRadialGradient(px, py, 0, px, py, r * 2.6);
      grad.addColorStop(0, p.auraColor);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalAlpha = 0.95;
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px, py, r * 2.6, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 1;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(15,23,42,0.9)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(px, py, r + 1, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = "#020617";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "bold 11px system-ui";
      ctx.fillText(p.labelEn, px, py - 2);
      ctx.font = "9px system-ui";
      ctx.fillText(p.labelAr, px, py + 8);
    }
    ctx.restore();

    ctx.save();
    for (const e of enemies) {
      const ex = e.x - player.x;
      const ey = e.y - player.y;
      const ang = Math.atan2(player.y - e.y, player.x - e.x);

      const grad = ctx.createRadialGradient(ex, ey, 0, ex, ey, e.radius * 2.8);
      grad.addColorStop(0, e.glow);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(ex, ey, e.radius * 2.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.translate(ex, ey);
      ctx.rotate(ang);
      ctx.globalAlpha = 1;
      ctx.fillStyle = e.color;

      const r = e.radius;

      if (e.boss) {
        const bodyW = r * 3.2;
        const bodyH = r * 1.7;
        ctx.beginPath();
        ctx.moveTo(r * 2.2, 0);
        ctx.lineTo(-bodyW * 0.2, bodyH * 0.9);
        ctx.lineTo(-bodyW * 0.9, 0);
        ctx.lineTo(-bodyW * 0.2, -bodyH * 0.9);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(-r * 0.4, bodyH * 0.9);
        ctx.lineTo(-r * 1.8, bodyH * 1.4);
        ctx.lineTo(-r * 0.8, bodyH * 0.3);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(-r * 0.4, -bodyH * 0.9);
        ctx.lineTo(-r * 1.8, -bodyH * 1.4);
        ctx.lineTo(-r * 0.8, -bodyH * 0.3);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(r * 0.3, -bodyH * 0.8);
        ctx.lineTo(r * 0.9, -bodyH * 1.5);
        ctx.lineTo(r * 0.1, -bodyH * 1.1);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(r * 0.3, bodyH * 0.8);
        ctx.lineTo(r * 0.9, bodyH * 1.5);
        ctx.lineTo(r * 0.1, bodyH * 1.1);
        ctx.closePath();
        ctx.fill();

        const eyeGrad = ctx.createRadialGradient(r * 0.7, 0, 0, r * 0.7, 0, r * 0.9);
        eyeGrad.addColorStop(0, "#ffffff");
        eyeGrad.addColorStop(0.4, "#ffcfdf");
        eyeGrad.addColorStop(1, "#ff1744");
        ctx.fillStyle = eyeGrad;
        ctx.beginPath();
        ctx.ellipse(r * 0.7, 0, r * 0.9, r * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(r * 0.5, bodyH * 0.45);
        ctx.lineTo(r * 0.3, bodyH * 1.0);
        ctx.lineTo(r * 0.1, bodyH * 0.45);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(r * 0.5, -bodyH * 0.45);
        ctx.lineTo(r * 0.3, -bodyH * 1.0);
        ctx.lineTo(r * 0.1, -bodyH * -0.45);
        ctx.closePath();
        ctx.fill();
      } else if (e.type === "fighter") {
        ctx.beginPath();
        ctx.moveTo(r * 1.6, 0);
        ctx.lineTo(-r * 1.0, r * 0.9);
        ctx.lineTo(-r * 0.4, 0);
        ctx.lineTo(-r * 1.0, -r * 0.9);
        ctx.closePath();
        ctx.fill();
      } else if (e.type === "interceptor") {
        ctx.beginPath();
        ctx.moveTo(r * 1.7, 0);
        ctx.lineTo(-r * 0.8, r * 0.6);
        ctx.lineTo(-r * 1.4, 0);
        ctx.lineTo(-r * 0.8, -r * 0.6);
        ctx.closePath();
        ctx.fill();
      } else if (e.type === "bomber") {
        const wBody = r * 2.6;
        const hBody = r * 1.2;
        ctx.fillRect(-wBody / 2, -hBody / 2, wBody, hBody);
        ctx.fillRect(-r * 0.6, -r * 1.3, r * 1.2, r * 0.6);
        ctx.fillRect(-r * 0.6, r * 0.7, r * 1.2, r * 0.6);
      } else if (e.type === "drone") {
        ctx.beginPath();
        ctx.moveTo(0, -r * 1.1);
        ctx.lineTo(r * 1.1, 0);
        ctx.lineTo(0, r * 1.1);
        ctx.lineTo(-r * 1.1, 0);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(r * 1.8, 0);
        ctx.lineTo(-r * 0.8, r * 1.1);
        ctx.lineTo(-r * 1.3, 0);
        ctx.lineTo(-r * 0.8, -r * 1.1);
        ctx.closePath();
        ctx.fill();
        ctx.fillRect(-r * 1.1, -r * 0.2, r * 0.3, r * 0.9);
        ctx.fillRect(-r * 1.1, -r * 0.7, r * 0.3, r * 0.9);
      }

      ctx.restore();

      const hpRatio = clamp(e.hp / e.maxHp, 0, 1);
      ctx.beginPath();
      ctx.strokeStyle = "rgba(10,10,10,0.9)";
      ctx.lineWidth = 3;
      ctx.arc(ex, ey, e.radius + 6, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = e.boss ? "rgba(255,232,138,0.95)" : "rgba(255,255,255,0.95)";
      ctx.lineWidth = 2;
      ctx.arc(ex, ey, e.radius + 6, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * hpRatio);
      ctx.stroke();
    }
    ctx.restore();

    ctx.save();
    for (const b of bullets) {
      const bx = b.x - player.x;
      const by = b.y - player.y;
      const color = getBulletColor(b.powerLevel || 0);

      const trailFactor = 0.02 + 0.005 * (b.powerLevel || 0);
      ctx.globalAlpha = 0.55;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5 + (b.powerLevel || 0) * 0.7;
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(bx - b.vx * trailFactor, by - b.vy * trailFactor);
      ctx.stroke();

      ctx.globalAlpha = 1;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(bx, by, b.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    ctx.save();
    for (const b of enemyBullets) {
      const bx = b.x - player.x;
      const by = b.y - player.y;
      ctx.globalAlpha = 0.95;
      ctx.fillStyle = b.color;
      ctx.beginPath();
      ctx.arc(bx, by, b.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 0.6;
      ctx.strokeStyle = "rgba(255,255,255,0.85)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(bx, by, b.radius + 2, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    ctx.save();
    ctx.rotate(player.angle);

    const auraGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, player.radius * 3);
    if (player.invulnTimer > 0) {
      auraGrad.addColorStop(0, "rgba(248,113,113,0.9)");
    } else {
      auraGrad.addColorStop(0, "rgba(34,211,238,0.9)");
    }
    auraGrad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = auraGrad;
    ctx.globalAlpha = 0.75;
    ctx.beginPath();
    ctx.arc(0, 0, player.radius * 3, 0, Math.PI * 2);
    ctx.fill();

    const blink = player.invulnTimer > 0 ? Math.sin(performance.now() * 0.02) * 0.5 + 0.5 : 1;
    ctx.globalAlpha = 0.45 + 0.55 * blink;

    const r = player.radius;

    ctx.fillStyle = "#e5f3ff";
    ctx.beginPath();
    ctx.moveTo(r * 2.0, 0);
    ctx.lineTo(-r * 1.4, r * 0.9);
    ctx.lineTo(-r * 1.7, 0);
    ctx.lineTo(-r * 1.4, -r * 0.9);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#a5e4ff";
    ctx.beginPath();
    ctx.moveTo(-r * 0.2, r * 1.2);
    ctx.lineTo(-r * 1.1, r * 2.0);
    ctx.lineTo(r * 0.8, r * 1.6);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-r * 0.2, -r * 1.2);
    ctx.lineTo(-r * 1.1, -r * 2.0);
    ctx.lineTo(r * 0.8, -r * 1.6);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#c4f1ff";
    ctx.beginPath();
    ctx.moveTo(-r * 1.3, 0);
    ctx.lineTo(-r * 2.0, r * 0.8);
    ctx.lineTo(-r * 2.0, -r * 0.8);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#0ea5e9";
    ctx.beginPath();
    ctx.ellipse(r * 0.6, 0, r * 0.8, r * 0.45, 0, 0, Math.PI * 2);
    ctx.fill();

    if (player.dashActive > 0) {
      ctx.globalAlpha = 0.9;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, player.radius * 2.2, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore();
    ctx.restore();
  }

  let lastTime = performance.now();
  function loop(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    update(dt);
    draw();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
