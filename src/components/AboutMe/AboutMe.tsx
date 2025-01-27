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
            I am a Full-Stack Developer, passionate about technology and
            continuous learning. I enjoy adding value to people by building
            robust, reliable, and high-impact systems. I am driven by
            challenges, as they provide opportunities to learn, grow, and
            develop my professional and personal skills. I have experience in
            front-end and back-end, enabling me to tackle projects holistically
            and deliver efficient solutions to any technical challenge.
          </p>
        </div>
      </div>
    </section>
  );
}
