import "./Certifications.scss";

export default function Certifications() {
  const certifications = [
    {
      name: "AWS Certified Solutions Architect - Associate",
      description:
        "Validate your technical expertise in designing and deploying scalable, highly available, and fault-tolerant systems on AWS.",
      link: "https://www.youracclaim.com/badges/1f9c8f4b-6d3d-4b8d-8b6c-5f5f0e3b6d3b",
      date: "2021",
    },
    {
      name: "AWS Certified Solutions Architect - Associate",
      description:
        "Validate your technical expertise in designing and deploying scalable, highly available, and fault-tolerant systems on AWS.",
      link: "https://www.youracclaim.com/badges/1f9c8f4b-6d3d-4b8d-8b6c-5f5f0e3b6d3b",
      date: "2021",
    },
    {
      name: "AWS Certified Solutions Architect - Associate",
      description:
        "Validate your technical expertise in designing and deploying scalable, highly available, and fault-tolerant systems on AWS.",
      link: "https://www.youracclaim.com/badges/1f9c8f4b-6d3d-4b8d-8b6c-5f5f0e3b6d3b",
      date: "2021",
    },
    {
      name: "AWS Certified Solutions Architect - Associate",
      description:
        "Validate your technical expertise in designing and deploying scalable, highly available, and fault-tolerant systems on AWS.",
      link: "https://www.youracclaim.com/badges/1f9c8f4b-6d3d-4b8d-8b6c-5f5f0e3b6d3b",
      date: "2021",
    },
    {
      name: "AWS Certified Solutions Architect - Associate",
      description:
        "Validate your technical expertise in designing and deploying scalable, highly available, and fault-tolerant systems on AWS.",
      link: "https://www.youracclaim.com/badges/1f9c8f4b-6d3d-4b8d-8b6c-5f5f0e3b6d3b",
      date: "2021",
    },
  ];

  return (
    <section className="section certifications" id="certifications">
      <div className="content">
        <div className="title">Certifications</div>
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
