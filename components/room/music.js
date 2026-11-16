// The record on Yara's turntable: an original loop, played live with the Web Audio API.
// No audio file and nothing to license. A 96 BPM tech groove in maqam Hijaz on D:
// darbuka in the maqsum rhythm (dum-tak-tak-dum-tak) with tech hi-hats, a sub bass,
// a soft pad, an arpeggio through an echo, and an oud-like plucked line with Hijaz
// intonation (the 2nd a little high, the 3rd a little low, as oud players play it).
// Vinyl crackle and a needle drop make it a record.

const BPM = 96;
const SIX = 60 / BPM / 4; // one sixteenth note, in seconds
const SWING = 0.13; // late off-beat sixteenths, for a relaxed feel

// Pitch: MIDI number to Hz, with Hijaz intonation on E-flat and F-sharp.
const CENTS = { 3: 0.14, 6: -0.14 };
const hz = (m) => 440 * Math.pow(2, (m + (CENTS[((m % 12) + 12) % 12] || 0) - 69) / 12);

const CHORDS = {
  D: [62, 66, 69],
  Cm: [60, 63, 67],
  Gm: [55, 58, 62],
  Eb: [63, 67, 70],
};
const ROOT = { D: 38, Cm: 36, Gm: 43, Eb: 39 };
const PROGRESSION = ["D", "D", "Cm", "D", "Gm", "Cm", "Eb", "D"]; // Eb → D: the Hijaz half-step home
const INTRO_BARS = 2;

// Oud lines: [sixteenth, midi, length in sixteenths, tremolo]. Each spans two bars.
const TAQSIM = [[0, 62, 4, 1], [6, 63, 2], [8, 66, 4], [12, 67, 2], [14, 66, 2], [16, 63, 4], [20, 62, 10, 1]];
const PHRASE_A = [
  [0, 62, 2], [2, 63, 1], [3, 66, 1], [4, 67, 2], [6, 66, 1], [7, 63, 1], [8, 62, 4, 1],
  [12, 69, 1], [13, 70, 1], [14, 69, 2], [16, 67, 2], [18, 66, 1], [19, 63, 1], [20, 66, 2],
  [22, 63, 2], [24, 62, 8, 1],
];
const PHRASE_B = [
  [0, 69, 1], [1, 70, 1], [2, 72, 2], [4, 74, 4, 1], [8, 72, 1], [9, 70, 1], [10, 69, 2],
  [12, 67, 1], [13, 66, 1], [14, 67, 2], [16, 69, 2], [18, 67, 1], [19, 66, 1], [20, 63, 2],
  [22, 66, 1], [23, 63, 1], [24, 62, 6, 1], [30, 74, 1], [31, 75, 1],
];
const ARP = [0, 2, 1, 3, 0, 2, 3, 1, 0, 2, 1, 3, 2, 3, 1, 2];

// Builds the instruments on any AudioContext (live or offline) and returns
// schedule(step, time) for one sixteenth of the song.
export function createSong(ctx, out) {
  const rand = (a) => 1 + (Math.random() * 2 - 1) * a;

  // Mix: everything into a bus, then warm low-pass and a gentle compressor.
  const bus = ctx.createGain();
  const warm = ctx.createBiquadFilter();
  warm.type = "lowpass";
  warm.frequency.value = 11000;
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -14;
  comp.knee.value = 10;
  comp.ratio.value = 3;
  comp.attack.value = 0.004;
  comp.release.value = 0.2;
  bus.connect(warm);
  warm.connect(comp);
  comp.connect(out);

  // Echo: a dotted eighth, darkened on each repeat.
  const echo = ctx.createGain();
  const delay = ctx.createDelay(1);
  delay.delayTime.value = SIX * 3;
  const fb = ctx.createGain();
  fb.gain.value = 0.33;
  const dark = ctx.createBiquadFilter();
  dark.type = "lowpass";
  dark.frequency.value = 2300;
  echo.connect(delay);
  delay.connect(dark);
  dark.connect(fb);
  fb.connect(delay);
  dark.connect(bus);

  // Room: a generated reverb tail.
  const room = ctx.createGain();
  const conv = ctx.createConvolver();
  const len = Math.floor(ctx.sampleRate * 2.4);
  const ir = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = ir.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
  }
  conv.buffer = ir;
  const wet = ctx.createGain();
  wet.gain.value = 0.32;
  room.connect(conv);
  conv.connect(wet);
  wet.connect(bus);

  const noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const nd = noise.getChannelData(0);
  for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;

  function env(t, peak, attack, decay) {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
    return g;
  }
  function burst(t, dur) {
    const s = ctx.createBufferSource();
    s.buffer = noise;
    s.start(t, Math.random() * 0.5, dur + 0.05);
    return s;
  }

  // Darbuka: the low "dum" and the sharp "tak".
  function dum(t, v) {
    const o = ctx.createOscillator();
    o.frequency.setValueAtTime(150, t);
    o.frequency.exponentialRampToValueAtTime(62, t + 0.13);
    const g = env(t, 0.55 * v, 0.004, 0.38);
    o.connect(g);
    g.connect(bus);
    o.start(t);
    o.stop(t + 0.5);
    const n = burst(t, 0.08);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 700;
    const ng = env(t, 0.26 * v, 0.002, 0.07);
    n.connect(lp);
    lp.connect(ng);
    ng.connect(bus);
  }
  function tak(t, v) {
    const n = burst(t, 0.09);
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 3300;
    bp.Q.value = 1.3;
    const g = env(t, 0.8 * v, 0.001, 0.075);
    n.connect(bp);
    bp.connect(g);
    g.connect(bus);
    g.connect(room);
    const o = ctx.createOscillator();
    o.frequency.setValueAtTime(880, t);
    o.frequency.exponentialRampToValueAtTime(620, t + 0.05);
    const og = env(t, 0.3 * v, 0.001, 0.05);
    o.connect(og);
    og.connect(bus);
    o.start(t);
    o.stop(t + 0.08);
  }
  function hat(t, v) {
    const n = burst(t, 0.04);
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 7500;
    const g = env(t, 0.22 * v, 0.001, 0.032);
    n.connect(hp);
    hp.connect(g);
    g.connect(bus);
  }

  function bass(t, m, dur) {
    const f = hz(m);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 760;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.32, t + 0.015);
    g.gain.setTargetAtTime(0.2, t + 0.02, 0.12);
    g.gain.setTargetAtTime(0.0001, t + dur, 0.05);
    lp.connect(g);
    g.connect(bus);
    // The triangle an octave up lets small speakers hear the bass line.
    for (const [type, mult, level] of [["sine", 1, 1], ["triangle", 2, 0.45]]) {
      const o = ctx.createOscillator();
      o.type = type;
      o.frequency.value = f * mult;
      const lg = ctx.createGain();
      lg.gain.value = level;
      o.connect(lg);
      lg.connect(lp);
      o.start(t);
      o.stop(t + dur + 0.4);
    }
  }

  function pad(t, notes, dur) {
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(650, t);
    lp.frequency.linearRampToValueAtTime(1300, t + dur * 0.5);
    lp.frequency.linearRampToValueAtTime(800, t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.05, t + 0.45);
    g.gain.setValueAtTime(0.05, t + dur - 0.2);
    g.gain.linearRampToValueAtTime(0.0001, t + dur + 0.5);
    lp.connect(g);
    g.connect(bus);
    g.connect(room);
    for (const m of notes)
      for (const cents of [-8, 8]) {
        const o = ctx.createOscillator();
        o.type = "sawtooth";
        o.frequency.value = hz(m);
        o.detune.value = cents;
        o.connect(lp);
        o.start(t);
        o.stop(t + dur + 0.6);
      }
  }

  function arp(t, m, v) {
    const o = ctx.createOscillator();
    o.type = "triangle";
    o.frequency.value = hz(m);
    const o2 = ctx.createOscillator();
    o2.type = "square";
    o2.frequency.value = hz(m);
    const mix = ctx.createGain();
    mix.gain.value = 0.25;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(2600, t);
    lp.frequency.exponentialRampToValueAtTime(700, t + 0.16);
    const g = env(t, 0.095 * v, 0.003, 0.17);
    o.connect(lp);
    o2.connect(mix);
    mix.connect(lp);
    lp.connect(g);
    g.connect(bus);
    g.connect(echo);
    o.start(t);
    o2.start(t);
    o.stop(t + 0.25);
    o2.stop(t + 0.25);
  }

  // The oud: a plucked string (Karplus–Strong), warm and short, with a body resonance.
  const strings = new Map();
  function string(m) {
    if (strings.has(m)) return strings.get(m);
    const sr = ctx.sampleRate;
    const f = hz(m);
    const N = Math.max(2, Math.round(sr / f));
    const n = Math.floor(sr * 1.4);
    const buf = ctx.createBuffer(1, n, sr);
    const d = buf.getChannelData(0);
    let prev = 0;
    for (let i = 0; i < N; i++) {
      prev = prev * 0.55 + (Math.random() * 2 - 1) * 0.45;
      d[i] = prev;
    }
    for (let i = N; i < n; i++) d[i] = 0.4985 * (d[i - N] + d[i - N - 1 < 0 ? i - N : i - N - 1]);
    const s = { buf, rate: f / (sr / (N + 0.5)) };
    strings.set(m, s);
    return s;
  }
  const body = ctx.createBiquadFilter();
  body.type = "peaking";
  body.frequency.value = 230;
  body.Q.value = 1.1;
  body.gain.value = 5;
  const oudTone = ctx.createBiquadFilter();
  oudTone.type = "lowpass";
  oudTone.frequency.value = 2800;
  const oudOut = ctx.createGain();
  oudOut.gain.value = 0.95;
  body.connect(oudTone);
  oudTone.connect(oudOut);
  oudOut.connect(bus);
  oudOut.connect(room);
  const oudEcho = ctx.createGain();
  oudEcho.gain.value = 0.18;
  oudOut.connect(oudEcho);
  oudEcho.connect(echo);
  function pluck(t, m, v) {
    const s = string(m);
    const src = ctx.createBufferSource();
    src.buffer = s.buf;
    src.playbackRate.value = s.rate;
    const g = ctx.createGain();
    g.gain.value = 0.5 * v;
    src.connect(g);
    g.connect(body);
    src.start(t);
  }
  function oud(t, m, dur, trem) {
    if (!trem) {
      pluck(t, m, rand(0.08));
      return;
    }
    // Tremolo with the risha: fast repeated strokes, softer as they go.
    const strokes = Math.floor((dur * SIX) / (SIX / 2));
    for (let k = 0; k < strokes; k++) pluck(t + k * (SIX / 2), m, (k % 2 ? 0.55 : 0.75) * Math.pow(0.97, k));
  }
  function phrase(lines, offset, t0, i) {
    for (const [s, m, d, trem] of lines) if (s === offset + i) oud(t0, m, d, trem);
  }

  function schedule(step, t) {
    const bar = Math.floor(step / 16);
    const i = step % 16;
    const intro = bar < INTRO_BARS;
    const lb = intro ? -1 : (bar - INTRO_BARS) % 8;
    const chord = intro ? "D" : PROGRESSION[lb];
    const B = lb >= 4;

    if (i === 0) pad(t, CHORDS[chord], 16 * SIX);

    if (intro) {
      phrase(TAQSIM, bar * 16, t, i);
      if (bar === 1 && i % 4 === 2) hat(t, 0.6);
      return;
    }

    // Maqsum: dum . tak . . . tak . dum . . . tak . . .
    if (i === 0 || i === 8) dum(t, rand(0.06));
    if (i === 2 || i === 6 || i === 12) tak(t, 0.85 * rand(0.08));
    if ([3, 10, 14].includes(i)) tak(t, 0.3 * rand(0.15));
    if (lb === 7 && i >= 12) tak(t, (0.35 + (i - 12) * 0.15) * rand(0.05)); // a roll back to the top
    hat(t, (i % 4 === 2 ? 1 : i % 2 ? 0.45 : 0.7) * rand(0.1));

    // Bass on the dums, with a ghost octave and a fifth.
    const r = ROOT[chord];
    if (i === 0) bass(t, r, 6 * SIX);
    if (i === 7) bass(t, r + 12, SIX);
    if (i === 8) bass(t, r, 3 * SIX);
    if (i === 11) bass(t, r, 2 * SIX);
    if (i === 14) bass(t, r + 7, 2 * SIX);

    // Arpeggio: eighths in the first half of the loop, sixteenths in the second.
    if (B || i % 2 === 0) {
      const c = CHORDS[chord];
      const notes = [c[0] + 12, c[1] + 12, c[2] + 12, c[0] + 24];
      arp(t, notes[ARP[i]], (i % 4 === 0 ? 1 : 0.7) * rand(0.1));
    }

    // The oud answers in bars 3-4 and 7-8 of the loop.
    if (lb === 2 || lb === 3) phrase(PHRASE_A, (lb - 2) * 16, t, i);
    if (lb === 6 || lb === 7) phrase(PHRASE_B, (lb - 6) * 16, t, i);
  }

  // The needle landing on the record.
  function needle(t) {
    const n = burst(t, 0.18);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 260;
    const g = env(t, 0.5, 0.002, 0.16);
    n.connect(lp);
    lp.connect(g);
    g.connect(out);
  }

  // Vinyl: a faint hiss with the odd crackle, looping under everything.
  function crackle(t) {
    const len = ctx.sampleRate * 3;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      d[i] += (Math.random() * 2 - 1) * 0.012;
      if (Math.random() < 0.0004) {
        const amp = (Math.random() * 0.6 + 0.2) * (Math.random() < 0.5 ? -1 : 1);
        for (let k = 0; k < 24 && i + k < len; k++) d[i + k] += amp * Math.exp(-k / 4);
      }
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 900;
    const g = ctx.createGain();
    g.gain.value = 0.09;
    src.connect(hp);
    hp.connect(g);
    g.connect(out);
    src.start(t);
    return src;
  }

  return { schedule, needle, crackle, SIX, SWING };
}

// The live player: start on a tap (browsers only allow sound after one), stop any time.
export function createMusic() {
  let ctx = null;
  let master = null;
  let song = null;
  let vinyl = null;
  let timer = 0;
  let step = 0;
  let next = 0;
  let playing = false;
  const listeners = new Set();
  const emit = () => listeners.forEach((fn) => fn(playing));

  function tick() {
    const ahead = document.hidden ? 1.5 : 0.18;
    while (next < ctx.currentTime + ahead) {
      song.schedule(step, next + (step % 2 ? SIX * SWING : 0));
      next += SIX;
      step++;
    }
  }

  return {
    get playing() {
      return playing;
    },
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    start() {
      if (playing) return;
      if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        ctx = new AC();
        master = ctx.createGain();
        master.gain.value = 0;
        master.connect(ctx.destination);
        song = createSong(ctx, master);
      }
      // On iPhone, play through the speaker even when the ring switch is on silent.
      try {
        if (navigator.audioSession) navigator.audioSession.type = "playback";
      } catch {}
      ctx.resume();
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(0.0001, now);
      master.gain.linearRampToValueAtTime(0.62, now + 0.4);
      song.needle(now + 0.05);
      vinyl = song.crackle(now + 0.05);
      step = 0;
      next = now + 0.5;
      playing = true;
      tick();
      timer = setInterval(tick, 25);
      emit();
    },
    stop() {
      if (!playing) return;
      playing = false;
      clearInterval(timer);
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(0.0001, now + 0.35);
      const v = vinyl;
      vinyl = null;
      setTimeout(() => {
        try {
          v?.stop();
        } catch {}
        if (!playing) ctx.suspend();
      }, 450);
      emit();
    },
    toggle() {
      if (playing) this.stop();
      else this.start();
    },
    dispose() {
      clearInterval(timer);
      playing = false;
      listeners.clear();
      ctx?.close();
      ctx = null;
    },
  };
}
