import "./HeaderSection.scss";

export default function HeaderSection({
  title,
  hash,
  onClick,
}: {
  title: string;
  hash: string;
  onClick?: () => void;
}) {
  return (
    <div className="header__section">
      <a href={`#${hash}`} onClick={onClick}>{title}</a>
    </div>
  );
}
