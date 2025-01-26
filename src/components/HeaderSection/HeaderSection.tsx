import "./HeaderSection.scss";

export default function HeaderSection({
  title,
  hash,
}: {
  title: string;
  hash: string;
}) {
  return (
    <div className="header__section">
      <a href={`#${hash}`}>{title}</a>
    </div>
  );
}
