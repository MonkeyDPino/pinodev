import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useEmailJS } from "../../hooks/useEmailJS";
import { cv } from "../../data/cv";
import "./Contact.scss";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = { name: "", email: "", subject: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function MailIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

// Field-level errors pair color with this glyph (SC 1.4.1 — color is
// never the only channel).
function FieldErrorIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="8" x2="12" y2="13" />
      <line x1="12" y1="16" x2="12" y2="16.01" />
    </svg>
  );
}

export default function Contact() {
  const { t } = useTranslation();
  const gridRef = useScrollReveal<HTMLDivElement>();
  const { send, status } = useEmailJS();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const whatsappHref = `https://wa.me/${cv.phone.replace(/\D/g, "")}`;

  useEffect(() => {
    if (status === "success") {
      setForm(EMPTY_FORM);
      setErrors({});
    }
  }, [status]);

  const validate = (values: FormState): FormErrors => {
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = t("contact_error_name_required");
    if (!values.email.trim()) {
      next.email = t("contact_error_email_required");
    } else if (!EMAIL_PATTERN.test(values.email)) {
      next.email = t("contact_error_email_invalid");
    }
    if (!values.subject.trim()) next.subject = t("contact_error_subject_required");
    if (!values.message.trim()) next.message = t("contact_error_message_required");
    return next;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const field = name as keyof FormState;
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;
    send(form);
  };

  return (
    <section className="section contact" id="contact">
      <div className="content">
        <h2 className="title">{t("contact_title")}</h2>
        <div
          className="contact__grid reveal stagger-children"
          ref={gridRef}
        >
          {/* Left: CTA + contact info */}
          <div className="contact__cta" style={{ '--i': 0 } as React.CSSProperties}>
            <h3 className="contact__cta__heading">
              {t("contact_cta_pre")} {t("contact_cta_accent")}
            </h3>
            <p className="contact__cta__sub">{t("contact_cta_sub")}</p>
            <ul className="contact__info">
              <li>
                <MailIcon />
                <a href={`mailto:${cv.email}`}>{cv.email}</a>
              </li>
              <li>
                <PhoneIcon />
                <a href={whatsappHref} target="_blank" rel="noreferrer">
                  {cv.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Right: Form */}
          <form
            className="contact__form"
            onSubmit={handleSubmit}
            noValidate
            style={{ '--i': 1 } as React.CSSProperties}
          >
            <div className="contact__form__row">
              <div className={`contact__field${errors.name ? " contact__field--error" : ""}`}>
                <label htmlFor="contact-name">{t("contact_field_name")}</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                />
                {errors.name && (
                  <p className="contact__field__error" id="contact-name-error">
                    <FieldErrorIcon />
                    {errors.name}
                  </p>
                )}
              </div>
              <div className={`contact__field${errors.email ? " contact__field--error" : ""}`}>
                <label htmlFor="contact-email">{t("contact_field_email")}</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                />
                {errors.email && (
                  <p className="contact__field__error" id="contact-email-error">
                    <FieldErrorIcon />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
            <div className={`contact__field${errors.subject ? " contact__field--error" : ""}`}>
              <label htmlFor="contact-subject">{t("contact_field_subject")}</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                required
                aria-invalid={errors.subject ? true : undefined}
                aria-describedby={errors.subject ? "contact-subject-error" : undefined}
              />
              {errors.subject && (
                <p className="contact__field__error" id="contact-subject-error">
                  <FieldErrorIcon />
                  {errors.subject}
                </p>
              )}
            </div>
            <div className={`contact__field${errors.message ? " contact__field--error" : ""}`}>
              <label htmlFor="contact-message">{t("contact_field_message")}</label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
              />
              {errors.message && (
                <p className="contact__field__error" id="contact-message-error">
                  <FieldErrorIcon />
                  {errors.message}
                </p>
              )}
            </div>

            {/* SC 4.1.3 — programmatically determinable without receiving
                focus, no context change. Success is polite; errors are
                assertive; assertive-on-non-urgent is a documented failure
                pattern (research A3), so success never uses role="alert". */}
            {status === "success" && (
              <p
                className="contact__feedback contact__feedback--success"
                role="status"
                aria-atomic="true"
              >
                {t("contact_success")}
              </p>
            )}
            {status === "error" && (
              <p
                className="contact__feedback contact__feedback--error"
                role="alert"
                aria-atomic="true"
              >
                {t("contact_error")}
              </p>
            )}

            <button
              type="submit"
              className="contact__submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? t("contact_sending") : t("contact_submit")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
