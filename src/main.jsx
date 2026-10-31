import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CalendarDays, MapPin, Clock3, Heart, ArrowDown, Sparkles, Volume2, VolumeX, Flower2, Music2, Star } from 'lucide-react';
import './styles.css';

const WEDDING_DATE = new Date('2026-11-21T19:00:00+05:30');
function ScratchCard() {
  const canvasRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const drawing = useRef(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.fillStyle = '#dfc58d';
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.strokeStyle = 'rgba(135,91,43,.15)';
    ctx.lineWidth = 1;
    for (let x = -rect.height; x < rect.width; x += 14) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + rect.height, rect.height); ctx.stroke();
    }
    ctx.fillStyle = '#805b31'; ctx.font = '600 10px Arial'; ctx.textAlign = 'center';
    ctx.fillText('✧  SCRATCH TO REVEAL  ✧', rect.width / 2, rect.height / 2 + 4);
  }, []);
  const scratch = (e) => {
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath(); ctx.arc(e.clientX - rect.left, e.clientY - rect.top, 23, 0, Math.PI * 2); ctx.fill();
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    for (let i = 3; i < pixels.length; i += 32) if (pixels[i] === 0) clear++;
    if (clear / (pixels.length / 32) > .38) setRevealed(true);
  };
  return <div className={`scratch-wrap ${revealed ? 'scratch-done' : ''}`}>
    <div className="scratch-reveal"><span className="scratch-date">21 <i>NOVEMBER</i> 2026</span><span className="scratch-caption">THE DAY OUR FOREVER BEGINS</span></div>
    {!revealed && <canvas ref={canvasRef} className="scratch-layer" onPointerDown={(e) => { drawing.current = true; e.currentTarget.setPointerCapture(e.pointerId); scratch(e); }} onPointerMove={scratch} onPointerUp={() => { drawing.current = false; }} onPointerCancel={() => { drawing.current = false; }} />}
  </div>;
}

function App() {
  const [countdown, setCountdown] = useState(getCountdown());
  const [invitationOpened, setInvitationOpened] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicError, setMusicError] = useState(false);
  const audioRef = useRef(null);
  function getCountdown() {
    const diff = Math.max(0, WEDDING_DATE.getTime() - Date.now());
    return { days: Math.floor(diff / 86400000), hours: Math.floor(diff % 86400000 / 3600000), minutes: Math.floor(diff % 3600000 / 60000), seconds: Math.floor(diff % 60000 / 1000), passed: diff <= 0 };
  }
  useEffect(() => { const t = setInterval(() => setCountdown(getCountdown()), 1000); return () => clearInterval(t); }, []);
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { nodes.forEach(n => n.classList.add('is-visible')); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
    nodes.forEach(n => observer.observe(n)); return () => observer.disconnect();
  }, [invitationOpened]);
  async function toggleMusic() {
    if (!audioRef.current) return;
    if (musicPlaying) { audioRef.current.pause(); setMusicPlaying(false); return; }
    try { await audioRef.current.play(); setMusicPlaying(true); setMusicError(false); } catch { setMusicPlaying(false); setMusicError(true); }
  }
  const formattedDate = new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' }).format(WEDDING_DATE);
  return <main className="royal-site">
    {!invitationOpened && <div className="invitation-gate" role="dialog" aria-modal="true" aria-label="Open wedding invitation">
      <div className="gate-frame"><div className="gate-inner">
        <p className="ganesh-line">ॐ श्री गणेशाय नमः</p><p className="gate-overline">TOGETHER WITH THEIR FAMILIES</p>
        <div className="gate-divider"><span>✦</span></div><div className="gate-seal">ॐ</div>
        <div className="gate-couple"><div><strong>Archit ji</strong><small>With the blessings of our families</small></div><i>WEDS</i><div><strong>Priyanka</strong><small>With the blessings of our families</small></div></div>
        <p className="gate-message">invite you to celebrate the beginning of their<br/> forever</p>
        <button className="open-invitation" onClick={() => { setInvitationOpened(true); audioRef.current?.play().then(() => { setMusicPlaying(true); setMusicError(false); }).catch(() => setMusicError(true)); }}>✉ &nbsp; OPEN THE INVITATION <ArrowDown size={16}/></button>
      </div><div className="gate-ribbon">A CELEBRATION OF LOVE · FAMILY · FOREVER</div></div>
    </div>}
    <audio ref={audioRef} src="/audio/wedding-shehnai.mp3" loop preload="none" onError={() => { setMusicPlaying(false); setMusicError(true); }}/>
    <button className={`music-toggle ${musicPlaying ? 'is-playing' : ''}`} onClick={toggleMusic}>{musicPlaying ? <Volume2 size={16}/> : <VolumeX size={16}/>}<span>{musicPlaying ? 'Music on' : 'Wedding music'}</span></button>
    {musicError && <div className="music-hint">Add your MP3 as <strong>public/audio/wedding-shehnai.mp3</strong> to enable music.</div>}
    <section className="hero" id="home"><div className="hero-frame"><div className="hero-content">
      <p className="ganesh-line">ॐ श्री गणेशाय नमः</p><p className="hero-overline">TOGETHER WITH THEIR FAMILIES</p><div className="hero-seal">❧ A &amp; P ❧</div>
      <div className="hero-couple"><h1>Archit <small>ji</small></h1><span>WEDS</span><h1>Priyanka</h1></div>
      <p className="hero-subtitle">invite you to celebrate the beginning of their<br/> forever</p>
      <div className="hero-date"><CalendarDays size={15}/> 21 NOVEMBER 2026 <b>•</b> JODHPUR, RAJASTHAN</div>
      <a href="#scratch" className="discover-link">DISCOVER YOUR INVITATION <ArrowDown size={14}/></a>
    </div><div className="hero-ribbon">A CELEBRATION OF LOVE · FAMILY · FOREVER</div></div></section>
    <section className="scratch-section section-pad reveal" id="scratch"><div className="scratch-panel"><div className="scratch-copy"><p className="section-kicker">A LITTLE SURPRISE FOR YOU</p><h2>Scratch to reveal</h2><h3>our special day</h3><p>Gently scratch the card to reveal the date of our celebration.</p></div><ScratchCard/></div></section>
    <section className="welcome section-pad reveal"><p className="section-kicker">A JOYFUL NEW BEGINNING</p><h2>With love, we invite <span>you</span></h2><p className="welcome-copy">Together with our families, we request the pleasure of your company as we celebrate the wedding of Archit ji and Priyanka. Your presence and blessings will make our day truly special.</p><div className="welcome-ornament"><span>❧</span><i>✦</i><span>❧</span></div><p className="blessing">Every moment is more special with you by our side.</p></section>
    <section className="countdown-section section-pad reveal"><p className="section-kicker">SAVE THE DATE</p><h2>The countdown <span>begins</span></h2><p className="date-caption">{formattedDate}</p><div className="countdown">{[[countdown.days,'DAYS'],[countdown.hours,'HOURS'],[countdown.minutes,'MINUTES'],[countdown.seconds,'SECONDS']].map(([n,l]) => <div className="time-box" key={l}><strong>{String(n).padStart(2,'0')}</strong><span>{l}</span></div>)}</div></section>
    <section className="event-section section-pad reveal" id="events"><p className="section-kicker">THE WEDDING FESTIVITIES</p><h2>Join us for the <span>celebrations</span></h2><p className="event-intro">Every moment is more special with you by our side.</p>
      <div className="event-grid event-grid-three">
        <article className="event-card event-card-one"><div className="event-photo event-photo-golden"><img src="/events/golden-hour.jpg" alt="Golden Hour haldi celebration"/><span className="event-photo-mark">✿</span></div><div className="event-card-body"><p className="event-date-label">20 NOVEMBER 2026</p><h3>The Golden Hour</h3><p className="event-description">A joyful celebration filled with turmeric, flowers, laughter and blessings.</p><div className="event-meta"><Clock3 size={15}/> 11:00 AM onwards</div><div className="event-venue event-venue-full"><MapPin size={18}/><div><strong>Maharishi Gautam Sabha Bhawan &amp; Garden</strong><span>Baldev Nagar, Jodhpur, Rajasthan 342003<br/>Near the back side of Juna Khedapati Temple</span></div></div><a className="event-map-link" href="https://www.google.com/maps/search/?api=1&amp;query=Maharishi+Gautam+Sabha+Bhawan+%26+Garden+Baldev+Nagar+Jodhpur+Rajasthan+342003" target="_blank" rel="noreferrer">View map ↗</a></div></article>
        <article className="event-card event-card-two"><div className="event-photo event-photo-shaam"><img src="/events/shaam-shandaar.jpg" alt="Shaam Shandaar evening celebration"/><span className="event-photo-mark">♫</span></div><div className="event-card-body"><p className="event-date-label">20 NOVEMBER 2026</p><h3>Shaam Shandaar</h3><p className="event-description">An evening of music, dance and unforgettable memories.</p><div className="event-meta"><Clock3 size={15}/> 7:00 PM onwards</div><div className="event-venue event-venue-full"><MapPin size={18}/><div><strong>Maharishi Gautam Sabha Bhawan &amp; Garden</strong><span>Baldev Nagar, Jodhpur, Rajasthan 342003<br/>Near the back side of Juna Khedapati Temple</span></div></div><a className="event-map-link" href="https://www.google.com/maps/search/?api=1&amp;query=Maharishi+Gautam+Sabha+Bhawan+%26+Garden+Baldev+Nagar+Jodhpur+Rajasthan+342003" target="_blank" rel="noreferrer">View map ↗</a></div></article>
        <article className="event-card event-card-three"><div className="event-photo event-photo-vows"><img src="/events/wedding-vows.jpg" alt="Bride and groom beneath a floral wedding mandap"/><span className="event-photo-mark">✦</span></div><div className="event-card-body"><p className="event-date-label">21 NOVEMBER 2026</p><h3>The Wedding Vows</h3><p className="event-description">The beginning of our forever, surrounded by our loved ones.</p><div className="event-meta"><Clock3 size={15}/> 7:00 PM onwards</div><div className="event-venue event-venue-full"><MapPin size={18}/><div><strong>Maharishi Gautam Sabha Bhawan &amp; Garden</strong><span>Baldev Nagar, Jodhpur, Rajasthan 342003<br/>Near the back side of Juna Khedapati Temple</span></div></div><a className="event-map-link" href="https://www.google.com/maps/search/?api=1&amp;query=Maharishi+Gautam+Sabha+Bhawan+%26+Garden+Baldev+Nagar+Jodhpur+Rajasthan+342003" target="_blank" rel="noreferrer">View map ↗</a></div></article>
      </div>
    </section>
    <footer className="footer"><div className="footer-flourish">❧ ✦ ❧</div><p className="footer-small">WITH LOVE, AND THE BLESSINGS OF OUR FAMILIES</p><div className="footer-names">Archit <span>&amp;</span> Priyanka</div><p className="footer-date">21 · 11 · 2026 &nbsp; | &nbsp; JODHPUR, RAJASTHAN</p><p className="footer-end">MADE WITH <Heart size={12} fill="currentColor"/> FOR A DAY TO REMEMBER</p></footer>
  </main>;
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
