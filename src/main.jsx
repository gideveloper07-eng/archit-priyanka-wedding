import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CalendarDays, MapPin, Clock3, Heart, MessageCircle, ArrowDown, Sparkles, Copy, Check } from 'lucide-react';
import './styles.css';

const WEDDING_DATE = new Date('2026-11-21T19:00:00+05:30');
// Replace with the couple's WhatsApp number, including country code, digits only (example: 919876543210).
const WHATSAPP_NUMBER = '';

function App() {
  const [countdown, setCountdown] = useState(getCountdown());
  const [guestName, setGuestName] = useState('');
  const [guestCount, setGuestCount] = useState('2');
  const [attendance, setAttendance] = useState('joyfully-attending');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  function getCountdown() {
    const now = new Date();
    const diff = Math.max(0, WEDDING_DATE.getTime() - now.getTime());
    return { days: Math.floor(diff / 86400000), hours: Math.floor((diff % 86400000) / 3600000), minutes: Math.floor((diff % 3600000) / 60000), seconds: Math.floor((diff % 60000) / 1000), passed: diff <= 0 };
  }
  useEffect(() => {
    const timer = setInterval(() => setCountdown(getCountdown()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' }).format(WEDDING_DATE);
  const rsvpText = `Wedding RSVP — Archit ji & Priyanka\nName: ${guestName || 'Guest'}\nResponse: ${attendance === 'joyfully-attending' ? 'Joyfully attending' : 'Regretfully unable to attend'}\nGuests: ${attendance === 'joyfully-attending' ? guestCount : '0'}${message ? `\nMessage: ${message}` : ''}`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(rsvpText)}`;
  const sendRsvp = (e) => {
    e.preventDefault();
    if (!WHATSAPP_NUMBER) {
      alert('Please add the couple’s WhatsApp number in src/main.jsx (WHATSAPP_NUMBER) before using RSVP.');
      return;
    }
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };
  const copyInvite = async () => {
    const text = `With love and blessings, join us for the wedding of Archit ji & Priyanka on 21 November 2026 in Jodhpur, Rajasthan.`;
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    catch { window.prompt('Copy your invitation text:', text); }
  };

  return <main>
    <section className="hero" id="home">
      <div className="hero-noise" />
      <div className="ornament ornament-top" aria-hidden="true">✦　❧　✦</div>
      <div className="hero-content">
        <div className="eyebrow"><span /> A CELEBRATION OF LOVE <span /></div>
        <p className="invite-line">Together with our families</p>
        <p className="request-line">request the pleasure of your company</p>
        <div className="names-wrap">
          <h1>Archit <em>ji</em></h1>
          <div className="ampersand"><span />&amp;<span /></div>
          <h1>Priyanka</h1>
        </div>
        <p className="hero-subtitle">Two hearts. One beautiful beginning.</p>
        <div className="gold-rule"><span>✦</span></div>
        <div className="hero-date"><CalendarDays size={17}/><span>21 NOVEMBER 2026</span><i>•</i><span>JODHPUR, RAJASTHAN</span></div>
        <a href="#celebration" className="discover-link">DISCOVER THE CELEBRATION <ArrowDown size={14}/></a>
      </div>
      <div className="hero-bottom-ornament" aria-hidden="true"><span>❦</span></div>
      <div className="side-label">THE WEDDING CELEBRATION · 2026</div>
    </section>

    <section className="welcome section-pad" id="celebration">
      <div className="section-kicker"><Sparkles size={14}/> THE BEGINNING OF FOREVER</div>
      <h2>A promise of <span>forever</span></h2>
      <p className="welcome-copy">Some moments become memories, and some memories become the beginning of a lifetime. With the blessings of our families, we invite you to join us as we begin our forever together.</p>
      <div className="monogram"><span>A</span><i>&amp;</i><span>P</span><small>21 · 11 · 2026</small></div>
      <p className="blessing">Your presence will make our celebration complete.</p>
    </section>

    <section className="countdown-section section-pad">
      <div className="section-kicker">SAVE THE DATE</div>
      <h2>Counting down to <span>our day</span></h2>
      <p className="date-caption">{formattedDate}</p>
      <div className="countdown" aria-live="polite">
        {[[countdown.days,'DAYS'],[countdown.hours,'HOURS'],[countdown.minutes,'MINUTES'],[countdown.seconds,'SECONDS']].map(([n,label]) => <div className="time-box" key={label}><strong>{String(n).padStart(2,'0')}</strong><span>{label}</span></div>)}
      </div>
      {countdown.passed && <p className="date-caption">The celebration has begun — thank you for being part of our story.</p>}
    </section>

    <section className="event-section section-pad" id="events">
      <div className="section-kicker">COME CELEBRATE WITH US</div>
      <h2>The wedding <span>details</span></h2>
      <p className="event-intro">Mark your calendar and join us for a day filled with love, laughter, and blessings.</p>
      <div className="event-card">
        <div className="event-card-top"><span className="event-symbol"><Heart size={21}/></span><span className="event-tag">THE MAIN CELEBRATION</span></div>
        <h3>Wedding Ceremony</h3>
        <p className="event-script">A new chapter begins</p>
        <div className="event-detail"><CalendarDays size={17}/><span>Saturday, 21 November 2026</span></div>
        <div className="event-detail"><Clock3 size={17}/><span>Time to be announced</span></div>
        <div className="event-detail"><MapPin size={17}/><span>Jodhpur, Rajasthan, India</span></div>
        <div className="event-card-footer"><span>WITH LOVE & BLESSINGS</span><span>ARCHIT JI & PRIYANKA</span></div>
      </div>
      <p className="venue-note">The exact venue and ceremony timings will be shared soon.</p>
      <a className="outline-link" href="https://www.google.com/maps/search/?api=1&query=Jodhpur%2C%20Rajasthan%2C%20India" target="_blank" rel="noreferrer"><MapPin size={16}/> EXPLORE JODHPUR</a>
    </section>

    <section className="rsvp-section section-pad" id="rsvp">
      <div className="rsvp-decoration" aria-hidden="true">✦</div>
      <div className="section-kicker">KINDLY REPLY</div>
      <h2>Will you join <span>our celebration?</span></h2>
      <p className="rsvp-intro">Your blessings mean the world to us. Please let us know if you can celebrate with us.</p>
      <form className="rsvp-form" onSubmit={sendRsvp}>
        <label htmlFor="guest-name">Your name</label>
        <input id="guest-name" value={guestName} onChange={e => setGuestName(e.target.value)} placeholder="Enter your full name" required />
        <label htmlFor="attendance">Your response</label>
        <select id="attendance" value={attendance} onChange={e => setAttendance(e.target.value)}>
          <option value="joyfully-attending">Joyfully attending</option>
          <option value="regretfully-unable">Regretfully unable to attend</option>
        </select>
        {attendance === 'joyfully-attending' && <><label htmlFor="guests">Number of guests</label><select id="guests" value={guestCount} onChange={e => setGuestCount(e.target.value)}>{[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>)}</select></>}
        <label htmlFor="note">A little message <span className="optional">(optional)</span></label>
        <textarea id="note" rows="3" value={message} onChange={e => setMessage(e.target.value)} placeholder="Share your wishes with the couple…" />
        <button className="gold-button" type="submit"><MessageCircle size={17}/> SEND RSVP ON WHATSAPP</button>
        <p className="form-note">Your response opens in WhatsApp so you can review and send it.</p>
      </form>
    </section>

    <footer className="footer">
      <div className="footer-flourish">❧ ✦ ❧</div>
      <p className="footer-small">WITH LOVE, AND THE BLESSINGS OF OUR FAMILIES</p>
      <div className="footer-names">Archit <span>&amp;</span> Priyanka</div>
      <p className="footer-date">21 · 11 · 2026 &nbsp; | &nbsp; JODHPUR, RAJASTHAN</p>
      <button className="copy-button" onClick={copyInvite}>{copied ? <Check size={15}/> : <Copy size={15}/>} {copied ? 'INVITATION COPIED' : 'COPY INVITATION MESSAGE'}</button>
      <p className="footer-end">MADE WITH <Heart size={12} fill="currentColor"/> FOR A DAY TO REMEMBER</p>
    </footer>
  </main>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
