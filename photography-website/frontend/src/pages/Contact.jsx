import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowRight } from 'lucide-react';

const EMAIL = 'snippetsbytanvi@gmail.com';

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  inquiry_type: z.string().min(1, 'Please choose a session type'),
  preferred_date: z.string().optional(),
  message: z.string().min(10, 'Tell Tanvi a little more (at least 10 characters)'),
});

const inquiryTypes = [
  'Baby Blossom (Maternity)',
  'Newborn Photography',
  '3 Months Baby Shoot',
  '6 Months Baby Shoot',
  '1 Year Baby Shoot',
  'Mini Session',
  'Pre-Wedding Shoot',
  'Wedding Photography',
  'Family Portrait',
  'Commercial Shoot',
  'Other',
];

const fieldClass =
  'w-full bg-transparent border-0 border-b border-[#CFC4B5] rounded-none px-0 py-3 text-[17px] text-ink placeholder:text-[#A39889] focus:outline-none focus:border-ink transition-colors';
const labelClass = 'ed-cap text-stone block';

const Field = ({ label, error, children }) => (
  <label className="block">
    <span className={labelClass}>{label}</span>
    {children}
    {error && <span className="block mt-2 text-[14px] text-[#A3361F]" role="alert">{error}</span>}
  </label>
);

/**
 * Formspree form ID (the part after https://formspree.io/f/). Enquiries are posted there and
 * Formspree emails them to Tanvi. Leave empty to fall back to opening the visitor's email app.
 */
const FORMSPREE_FORM_ID = '';

const enquiryLines = (d) =>
  [
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    d.phone ? `Phone: ${d.phone}` : null,
    `Session: ${d.inquiry_type}`,
    d.preferred_date ? `Preferred date: ${d.preferred_date}` : null,
    '',
    d.message,
  ].filter((l) => l !== null);

const enquirySubject = (d) => `Session enquiry — ${d.inquiry_type} — ${d.name}`;

const buildMailto = (d) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(enquirySubject(d))}&body=${encodeURIComponent(enquiryLines(d).join('\n'))}`;

const sendToFormspree = async (d) => {
  const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      name: d.name,
      email: d.email,
      phone: d.phone || '',
      session: d.inquiry_type,
      preferred_date: d.preferred_date || '',
      message: d.message,
      _subject: enquirySubject(d),
    }),
  });
  if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
};

const Contact = () => {
  // status: 'idle' | 'sending' | 'sent' (Formspree) | 'mailto' (email app opened) | 'error'
  const [status, setStatus] = useState('idle');
  const [lastEnquiry, setLastEnquiry] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data) => {
    setLastEnquiry(data);
    if (!FORMSPREE_FORM_ID) {
      window.location.href = buildMailto(data);
      setStatus('mailto');
      return;
    }
    setStatus('sending');
    try {
      await sendToFormspree(data);
      reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const firstName = lastEnquiry?.name.split(' ')[0];
  const done = status === 'sent' || status === 'mailto';

  return (
    <div className="bg-ivory text-ink font-body text-[17px] leading-[1.65] pt-20">
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 pt-10 pb-24 flex flex-wrap gap-x-20 gap-y-14">
        <div className="flex-[1_1_380px] min-w-0">
          <p className="ed-cap ed-rise text-clay mb-7">Book a session</p>
          <h1 className="ed-rise font-display font-normal m-0 text-[clamp(56px,7vw,112px)] leading-[0.95] tracking-[-0.02em]" style={{ animationDelay: '.15s' }}>
            Let&apos;s story-tell <em>together.</em>
          </h1>
          <p className="ed-rise mt-8 mb-12 max-w-[480px] text-[#4A433D]" style={{ animationDelay: '.3s' }}>
            Every family has its own rhythm. Whether you&apos;re expecting, celebrating a milestone, or simply want to
            capture today&apos;s joy — tell me a little about it.
          </p>
          <dl className="m-0 border-t border-line">
            {[
              ['Email', <a key="e" href={`mailto:${EMAIL}`} className="ed-ul text-ink">{EMAIL}</a>],
              ['Instagram', <a key="i" href="https://www.instagram.com/snippetsbytanvi/" target="_blank" rel="noopener noreferrer" className="ed-ul text-ink">@snippetsbytanvi</a>],
              ['Studio', 'Surat, Gujarat · available for travel'],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-wrap justify-between gap-3 py-5 border-b border-line">
                <dt className={labelClass}>{label}</dt>
                <dd className="m-0">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="font-display italic text-[26px] leading-snug mt-12 mb-0 text-[#3A342F]">
            “Photography is the beauty of life captured.” <span className="not-italic text-clay">Let&apos;s preserve yours.</span>
          </p>
        </div>

        <div className="flex-[1.2_1_460px] min-w-0">
          <div className="bg-paper rounded-md p-[clamp(28px,4vw,56px)]">
            {done ? (
              <div className="ed-fade py-10" aria-live="polite">
                <p className="ed-cap text-clay mb-4">{status === 'sent' ? 'Enquiry sent' : 'Almost there'}</p>
                <h2 className="font-display font-normal text-[48px] leading-none m-0 mb-5">Thank you, <em>{firstName}.</em></h2>
                {status === 'sent' ? (
                  <p className="text-[#4A433D] mb-8">
                    Your enquiry is with Tanvi, and she&apos;ll reply to {lastEnquiry.email} soon.
                  </p>
                ) : (
                  <>
                    <p className="text-[#4A433D] mb-4">
                      Your email app should have opened with your enquiry ready to go — just press send and Tanvi will
                      get back to you.
                    </p>
                    <p className="text-stone text-[15px] mb-8">
                      Nothing opened? Email <a href={`mailto:${EMAIL}`} className="ed-ul text-ink">{EMAIL}</a> directly or
                      message <a href="https://www.instagram.com/snippetsbytanvi/" target="_blank" rel="noopener noreferrer" className="ed-ul text-ink">@snippetsbytanvi</a> on Instagram.
                    </p>
                  </>
                )}
                <button type="button" onClick={() => setStatus('idle')} className="ed-ul text-[15px] text-ink">
                  {status === 'sent' ? 'Send another enquiry' : 'Back to the form'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-9">
                <div className="grid sm:grid-cols-2 gap-9">
                  <Field label="Your name *" error={errors.name?.message}>
                    <input {...register('name')} autoComplete="name" className={fieldClass} placeholder="Full name" />
                  </Field>
                  <Field label="Email *" error={errors.email?.message}>
                    <input {...register('email')} type="email" autoComplete="email" className={fieldClass} placeholder="you@email.com" />
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-9">
                  <Field label="Phone">
                    <input {...register('phone')} type="tel" autoComplete="tel" className={fieldClass} placeholder="Optional" />
                  </Field>
                  <Field label="Preferred date">
                    <input {...register('preferred_date')} type="date" className={fieldClass} />
                  </Field>
                </div>
                <Field label="Session type *" error={errors.inquiry_type?.message}>
                  <select {...register('inquiry_type')} defaultValue="" className={`${fieldClass} cursor-pointer`}>
                    <option value="" disabled>Choose a session</option>
                    {inquiryTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Share your story *" error={errors.message?.message}>
                  <textarea {...register('message')} rows={5} className={`${fieldClass} resize-y`} placeholder="Tell me about your family, the moment you'd love to capture, and any ideas you have…" />
                </Field>
                {status === 'error' && (
                  <p className="m-0 text-[15px] text-[#A3361F]" role="alert">
                    Sorry — your enquiry didn&apos;t go through. Please try again, or{' '}
                    <a href={buildMailto(lastEnquiry)} className="underline">send it by email instead</a>.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group justify-self-start inline-flex items-center gap-3 min-h-[56px] px-[34px] rounded-full bg-ink text-ivory text-[15px] font-medium tracking-[0.04em] hover:bg-clay disabled:opacity-60 disabled:cursor-wait"
                >
                  {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                  <ArrowRight className="w-[18px] h-[18px] transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                </button>
                {!FORMSPREE_FORM_ID && (
                  <p className="m-0 -mt-4 text-[14px] text-stone">This opens your email app with your message ready to send.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-[1360px] mx-auto px-6 md:px-8 pb-[120px]">
        <div className="relative w-full h-[420px] rounded-md overflow-hidden bg-sand">
          <iframe
            title="Snippets by Tanvi studio location on Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.0277306329626!2d72.79541621102771!3d21.151294683477076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04d99e327ea9b%3A0x531833729246f7ba!2sSnippets%20by%20Tanvi!5e0!3m2!1sen!2sin!4v1751817733333!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
      </section>
    </div>
  );
};

export default Contact;
