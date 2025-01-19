import VoltageButton from "../buttons/VoltageButton";
import "./Home.scss";

export default function Home() {
  return (
    <main className="home">
      <div className="title1">Software Engineer</div>
      <div className="title2">Juan Esteban Pino</div>
      <section className="content">
        <div className="role">Full Stack Developer</div>
        <VoltageButton />
      </section>
    </main>
  );
}
