export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#050816] text-white">

      <Navbar />

      <main className="pt-20 pb-32">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Internship />
        <Certificates />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
