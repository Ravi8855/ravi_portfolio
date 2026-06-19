import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Internship from "../components/Internship";
import Certificates from "../components/Certificates";
import Contact from "../components/Contact";

export default function PortfolioPage() {
  return (
    <>
      <section id="hero"><Hero /></section>
      <section id="about"><About /></section>
      <section id="skills"><Skills /></section>
      <section id="projects"><Projects /></section>
      <section id="internship"><Internship /></section>
      <section id="certificates"><Certificates /></section>
      <section id="contact"><Contact /></section>
    </>
  );
}
