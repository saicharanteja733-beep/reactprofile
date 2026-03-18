import saiteja from "../assets/saiteja.jpg";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <img src={saiteja} alt="saiteja" />
      <h1>Hello, I’m Sai Teja ✨</h1>
      <p>Java Developer and Frontend Learner</p>
    </section>
  );
}