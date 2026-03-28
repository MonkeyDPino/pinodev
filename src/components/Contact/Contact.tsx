import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useEmailJS } from "../../hooks/useEmailJS";
import "./Contact.scss";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMPTY_FORM: FormState = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const { t } = useTranslation();
  const gridRef = useScrollReveal<HTMLDivElement>();
  const { send, status } = useEmailJS();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  useEffect(() => {
    if (status === "success") {
      setForm(EMPTY_FORM);
    }
  }, [status]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(form);
  };

  return (
    <section className="section contact" id="contact">
      <div className="content">
        <div className="title">{t("contact_title")}</div>
        <div
          className="contact__grid reveal stagger-children"
          ref={gridRef}
        >
          {/* Left: CTA + contact info */}
          <div className="contact__cta" style={{ '--i': 0 } as React.CSSProperties}>
            <h2 className="contact__cta__heading">
              {t("contact_cta_pre")}{" "}
              <span className="contact__cta__accent">{t("contact_cta_accent")}</span>
            </h2>
            <p className="contact__cta__sub">{t("contact_cta_sub")}</p>
            <ul className="contact__info">
              <li>
                <span className="contact__info__icon contact__info__icon--teal">@</span>
                <a href="mailto:juanrespolo@gmail.com">juanrespolo@gmail.com</a>
              </li>
              <li>
                <span className="contact__info__icon contact__info__icon--lime">☎</span>
                <a href="https://wa.me/573233927516" target="_blank" rel="noreferrer">
                  +57 323 392 7516
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
              <div className="contact__field">
                <label htmlFor="contact-name">{t("contact_field_name")}</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder={t("contact_placeholder_name")}
                />
              </div>
              <div className="contact__field">
                <label htmlFor="contact-email">{t("contact_field_email")}</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder={t("contact_placeholder_email")}
                />
              </div>
            </div>
            <div className="contact__field">
              <label htmlFor="contact-subject">{t("contact_field_subject")}</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                required
                placeholder={t("contact_placeholder_subject")}
              />
            </div>
            <div className="contact__field">
              <label htmlFor="contact-message">{t("contact_field_message")}</label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder={t("contact_placeholder_message")}
              />
            </div>

            {status === "success" && (
              <p className="contact__feedback contact__feedback--success">
                {t("contact_success")}
              </p>
            )}
            {status === "error" && (
              <p className="contact__feedback contact__feedback--error">
                {t("contact_error")}
              </p>
            )}

            <button
              type="submit"
              className="contact__submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? t("contact_sending") : `${t("contact_submit")} →`}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
