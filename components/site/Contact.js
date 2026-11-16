"use client";

// "Contact me": a letter that opens into a sheet of stamps, one per mail service.
// Each stamp opens a new email to Yara, already addressed, in that service.
import { useEffect, useId, useRef, useState } from "react";
import { cv } from "@/data/cv";
import { contact } from "@/data/room";
import { dirOf } from "@/lib/i18n";

export function contactLinks(lang) {
  const to = encodeURIComponent(cv.contact.email);
  const su = encodeURIComponent(contact.subject[lang]);
  const body = encodeURIComponent(contact.body[lang]);
  return [
    { id: "gmail", name: "Gmail", mark: "G", href: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}&body=${body}` },
    { id: "outlook", name: "Outlook", mark: "O", href: `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${su}&body=${body}` },
    {
      id: "outlook-work",
      name: contact.outlookWork[lang],
      mark: "O",
      href: `https://outlook.office.com/mail/deeplink/compose?to=${to}&subject=${su}&body=${body}`,
    },
    { id: "yahoo", name: "Yahoo Mail", mark: "Y", href: `https://compose.mail.yahoo.com/?to=${to}&subject=${su}&body=${body}` },
    { id: "app", name: contact.app[lang], mark: "@", href: `mailto:${cv.contact.email}?subject=${su}&body=${body}`, local: true },
  ];
}

// The stamps themselves, usable inside the sheet or right on a page.
export function Stamps({ lang }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(cv.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  }
  return (
    <div className="stamps-wrap">
      <ul className="stamps">
        {contactLinks(lang).map((l, i) => (
          <li key={l.id} style={{ "--tilt": `${[-2, 1.5, -1, 2, -1.5][i]}deg` }}>
            <a className="stamp" href={l.href} target={l.local ? undefined : "_blank"} rel={l.local ? undefined : "noopener noreferrer"}>
              <span className="stamp-inner">
                <span className="stamp-mark" aria-hidden="true">
                  {l.mark}
                </span>
                <span className="stamp-name" dir="auto">
                  {l.name}
                </span>
                {!l.local && <span className="sr-only"> ({contact.opens[lang]})</span>}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="stamps-address">
        <span dir="ltr">{cv.contact.email}</span>
        <button type="button" className="link-btn" onClick={copy}>
          {copied ? contact.copied[lang] : contact.copy[lang]}
        </button>
        <span className="sr-only" role="status">
          {copied ? contact.copied[lang] : ""}
        </span>
      </p>
    </div>
  );
}

// A sheet (native dialog) holding the stamps.
export function ContactSheet({ lang, open, onClose }) {
  const ref = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog ref={ref} className="contact-sheet" aria-labelledby={titleId} lang={lang} dir={dirOf(lang)} onClose={onClose}>
      <svg className="contact-sheet-art" viewBox="0 0 120 64" aria-hidden="true">
        <rect x="2" y="10" width="116" height="52" rx="8" />
        <path d="M4 14 L60 44 L116 14" />
      </svg>
      <h2 id={titleId}>{contact.title[lang]}</h2>
      <p className="contact-sheet-lede">{contact.lede[lang]}</p>
      <Stamps lang={lang} />
      <form method="dialog">
        <button className="btn btn-quiet">{contact.close[lang]}</button>
      </form>
    </dialog>
  );
}

// The envelope that opens the sheet.
export function ContactEnvelope({ lang, className = "" }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className={`envelope ${className}`} onClick={() => setOpen(true)} aria-haspopup="dialog">
        <svg className="envelope-art" viewBox="0 0 64 44" aria-hidden="true">
          <rect className="envelope-body" x="2" y="6" width="60" height="36" rx="6" />
          <path className="envelope-flap" d="M3 8 L32 28 L61 8" />
          <circle className="envelope-seal" cx="32" cy="27" r="5" />
        </svg>
        <span>{contact.open[lang]}</span>
      </button>
      <ContactSheet lang={lang} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
