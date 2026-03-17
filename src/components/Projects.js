export default function ProjectsPage() {
  const projectList = [
    {
      title: "Portfolio Website",
      desc: "Responsive website built with HTML, CSS, React.",
      tech: "React, CSS",
    },
    {
      title: "Student Management System",
      desc: "CRUD operations with Java & MySQL.",
      tech: "Java, Spring Boot, MySQL",
    },
    {
      title: "Cryptocurrency Trader App",
      desc: "Microservices + JWT + API communication.",
      tech: "Spring Boot, JWT, REST API",
    },
    {
      title: "Ecommerce System",
      desc: "Add to cart, orders, microservices architecture.",
      tech: "Spring Boot, Microservices, MySQL",
    },
  ];

  return (
    <section className="projects">
      <h2>My Projects</h2>

      <div className="project-grid">
        {projectList.map((p, index) => (
          <div key={index} className="project-card">
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <p><strong>Tech:</strong> {p.tech}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
