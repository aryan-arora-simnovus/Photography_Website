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

/** There is no backend, so an enquiry opens the visitor's email app with everything filled in. */
const buildMailto = (d) => {
  const lines = [
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    d.phone ? `Phone: ${d.phone}` : null,
    `Session: ${d.inquiry_type}`,
    d.preferred_date ? `Preferred date: ${d.preferred_date}` : null,
    '',
    d.message,
  ].filter((l) => l !== null);
  const subject = `Session enquiry — ${d.inquiry_type} — ${d.name}`;
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
};

const Contact = () => {
  const [sentTo, setSentTo] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(contactSchema) });

  const onSubmit = (data) => {
    window.location.href = buildMailto(data);
    setSentTo(data.name.split(' ')[0]);
  };

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
            {sentTo ? (
              <div className="ed-fade py-10" aria-live="polite">
                <p className="ed-cap text-clay mb-4">Almost there</p>
                <h2 className="font-display font-normal text-[48px] leading-none m-0 mb-5">Thank you, <em>{sentTo}.</em></h2>
                <p className="text-[#4A433D] mb-4">
                  Your email app should have opened with your enquiry ready to go — just press send and Tanvi will get
                  back to you.
                </p>
                <p className="text-stone text-[15px] mb-8">
                  Nothing opened? Email <a href={`mailto:${EMAIL}`} className="ed-ul text-ink">{EMAIL}</a> directly or
                  message <a href="https://www.instagram.com/snippetsbytanvi/" target="_blank" rel="noopener noreferrer" className="ed-ul text-ink">@snippetsbytanvi</a> on Instagram.
                </p>
                <button type="button" onClick={() => setSentTo(null)} className="ed-ul text-[15px] text-ink">
                  Back to the form
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
                <button
                  type="submit"
                  className="group justify-self-start inline-flex items-center gap-3 min-h-[56px] px-[34px] rounded-full bg-ink text-ivory text-[15px] font-medium tracking-[0.04em] hover:bg-clay"
                >
                  Send enquiry
                  <ArrowRight className="w-[18px] h-[18px] transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                </button>
                <p className="m-0 -mt-4 text-[14px] text-stone">This opens your email app with your message ready to send.</p>
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
