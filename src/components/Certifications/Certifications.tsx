import "./Certifications.scss";

export default function Certifications() {
  const certifications = [
    {
      name: "Systems and Computer Engineering - Universidad Tecnológica de Pereira",
      description:
        "Skilled in software development, database management, system integration, and network infrastructure, with a strong focus on problem-solving, optimization, and applying engineering principles to technological challenges.",
      link: "https://drive.google.com/file/d/1jCxd31DtJvMZhq6dY6m17JTouOe4Azjh/view?usp=sharing",
      date: "2019 - 2024",
    },
    {
      name: "Python Data Structures - University of Michigan",
      description: `Explain the principles of data structures & how they are used. Create programs that are able to read and write data from files. Store data as key/value pairs using Python dictionaries. Accomplish multi-step tasks like sorting or looping using tuples`,
      link: "https://drive.google.com/file/d/1UPztyTsnUnd7OuKXb3sxDuSnUPnSWGSO/view?usp=sharing",
      date: "2020",
    },
    {
      name: "Programming Skills - Universidad de Antioquia",
      description:
        "Equips individuals with foundational and advanced programming skills, focusing on developing dynamic and responsive web applications.",
      link: "https://drive.google.com/file/d/1164MDZckr6mvy-LDCfvr9iK-34MZb6k5/view?usp=sharing",
      date: "2021",
    },
    {
      name: "Web Application Development - Universidad de Antioquia",
      description:
        "Learn to design, code, and deploy web solutions using modern frameworks and technologies.",
      link: "https://drive.google.com/file/d/1jSdNX-ZlHEPFfsfWIHKT-3rU1JpjQz1S/view?usp=sharing",
      date: "2021",
    },
  ];

  return (
    <section className="section certifications" id="certifications">
      <div className="content">
        <div className="title">Titles & Certifications</div>
        <div className="certifications__content">
          <article className="certifications__content__list">
            {certifications.map((certification, index) => (
              <div key={index} className="certifications__content__list__item">
                <div className="certifications__content__list__item__name">
                  {certification.name}
                </div>
                <div className="certifications__content__list__item__date">
                  {certification.date}
                </div>
                <div className="certifications__content__list__item__description">
                  {certification.description}
                </div>
                <a
                  href={certification.link}
                  target="_blank"
                  rel="noreferrer"
                  className="certifications__content__list__item__link"
                >
                  <i className="pi pi-external-link"></i>
                </a>
              </div>
            ))}
          </article>
        </div>
      </div>
    </section>
  );
}
