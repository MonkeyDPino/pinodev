import "./AboutMe.scss";

export default function AboutMe() {
  return (
    <section className="section about_me">
      <div className="content">
        <div className="title">About Me</div>
        <div className="about_me__content">
          <div className="profile__picture">
            <img src="/images/profile.jpg" alt="Profile" />
          </div>
        </div>
      </div>
    </section>
  );
}
