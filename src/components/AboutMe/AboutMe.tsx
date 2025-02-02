import "./AboutMe.scss";

export default function AboutMe() {
  return (
    <section className="section about_me" id="about_me">
      <div className="content">
        <div className="title">About Me</div>
        <div className="about_me__content">
          <div className="profile__picture">
            <img src="/images/profile.jpg" alt="Profile" />
          </div>
          <p>
            I am a <strong>Full-Stack Developer</strong>, passionate about
            technology and continuous learning. I enjoy adding value to people
            by building robust, reliable, and high-impact systems.
          </p>
          <p>
            I am driven by challenges, as they provide opportunities to learn,
            grow, and develop my professional and personal skills.
          </p>
          <p>
            I have experience in <strong>front-end and back-end</strong>,
            enabling me to tackle projects holistically and deliver efficient
            solutions to any technical challenge.
          </p>
        </div>
      </div>
    </section>
  );
}
