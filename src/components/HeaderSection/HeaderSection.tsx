export default function HeaderSection({ title }: { title: string }) {
  return (
    <div className="header__section">
      <span>{title}</span>
    </div>
  );
}
