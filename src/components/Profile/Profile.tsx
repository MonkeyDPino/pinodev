import "./Profile.scss";

export default function Profile() {
  return (
    <div className="profile">
      <div className="profile__image">
        <img src="https://www.gravatar.com/avatar/0?d=mp" alt="Profile" />
      </div>
      <div className="profile__info">
        <span className="name">John Doe</span>
        <span className="description">Software Engineer</span>
      </div>
    </div>
  );
}
