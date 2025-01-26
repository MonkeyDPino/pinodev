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
            I'm a Full-stack Developer with experience in developing web
            applications using React, Angular, and Node.js. I have a passion for
            learning new technologies and building scalable applications. I'm
            always looking for new challenges and opportunities to grow as a
            developer.
          </p>
        </div>
      </div>
    </section>
  );
}
