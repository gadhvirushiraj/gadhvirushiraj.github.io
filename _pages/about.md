---
layout: archive
title: ""
permalink: /
author_profile: true
redirect_from:
  - /about/
  - /aboutme
  - /me/
---

<div class="bio-box">
  <h1>Namaste World! 👋 I'm Rushiraj</h1>
  <div class="bio-content">
    <div class="bio-text">
      A final-year undergraduate student at Plaksha University, pursuing Computer Science and majoring in Artificial Intelligence.
      <br><br>
      An AI/ML Developer & Researcher and a Design lover, my interests revolve around Reinforcement Learning, Machine Learning, Computer Vision, and Human-Computer Interaction. My work submissions are targeting A/A* venues such as CHI, AAAI, ICRA and other conferences and journals.
      <br><br>
      Apart from research, I'm also an enthusiastic advocate for open source and an active contributor to its vibrant community. I also work in the industry, as the CEO & Founder of Housify (TechSurf Solutions).
      <br><br>
      ⚡ <i> Eager to explore new ideas, build stuff and make an impact through innovation! </i>
    </div>
    <img class="bio-img" src="/images/ai_climbs.webp" alt="woah">
  </div>
</div>

<style>
.bio-box {
  background: linear-gradient(135deg, #161b22, #1e2630);
  padding: 1rem 1.25rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin: 1.5rem 0;
  color: white;
}

.bio-content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}

.bio-text {
  flex: 1 1 300px;
  min-width: 0;
}

.bio-img {
  width: 225px;
  margin-bottom: 0.5rem;
}

/* Responsive for mobile */
@media (max-width: 768px) {
  .bio-content {
    flex-direction:
  }
}

</style>

<!--  -->
<!-- GALLERY -->
<!--  -->
<!--
<h2 style="margin-top: 2rem;">📸 <strong>Gallery</strong></h2>

<div class="gallery-scroll-container">
  <div class="gallery-image-wrapper">
    <img src="/images/gallery1.jpg" alt="Gallery image 1">
  </div>
  <div class="gallery-image-wrapper">
    <img src="/images/gallery2.jpg" alt="Gallery image 2">
  </div>
  <div class="gallery-image-wrapper">
    <img src="/images/gallery3.jpg" alt="Gallery image 3">
  </div>
  <div class="gallery-image-wrapper">
    <img src="/images/gallery3.jpg" alt="Gallery image 4">
  </div>
  <div class="gallery-image-wrapper">
    <img src="/images/gallery3.jpg" alt="Gallery image 5">
  </div>
  <div class="gallery-image-wrapper">
    <img src="/images/gallery3.jpg" alt="Gallery image 6">
  </div>
  <div class="gallery-image-wrapper">
    <img src="/images/gallery3.jpg" alt="Gallery image 7">
  </div>
  <div class="gallery-image-wrapper">
    <img src="/images/gallery3.jpg" alt="Gallery image 8">
  </div>
  <div class="gallery-image-wrapper">
    <img src="/images/gallery3.jpg" alt="Gallery image 9">
  </div>
  <div class="gallery-image-wrapper">
    <img src="/images/gallery3.jpg" alt="Gallery image 10">
  </div>
</div>

<style>
.gallery-scroll-container {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  gap: 1rem;
  padding: 1rem;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;

  background: linear-gradient(135deg, #161b22, #1e2630);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.08);
  scrollbar-width: none; /* Firefox */
}
.gallery-scroll-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}

.gallery-image-wrapper {
  flex: 0 0 auto;
  scroll-snap-align: start;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.gallery-image-wrapper:hover {
  transform: scale(1.05);
}

.gallery-image-wrapper img {
  display: block;
  max-width: 200px;
  object-fit: cover;
}
</style>

<script>
  const gallery = document.querySelector('.gallery-scroll-container');
  let scrollAmount = 1;
  let isUserScrolling = false;

  // Disable auto-scroll while dragging or scrolling
  let isDragging = false;
  let startX;
  let scrollLeft;

  gallery.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - gallery.offsetLeft;
    scrollLeft = gallery.scrollLeft;
    isUserScrolling = true;
  });

  gallery.addEventListener('mouseleave', () => {
    isDragging = false;
  });

  gallery.addEventListener('mouseup', () => {
    isDragging = false;
    setTimeout(() => isUserScrolling = false, 1500);
  });

  gallery.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - gallery.offsetLeft;
    const walk = (x - startX) * 1.5; // scroll-fastness
    gallery.scrollLeft = scrollLeft - walk;
  });

  gallery.addEventListener('scroll', () => {
    isUserScrolling = true;
    clearTimeout(window._scrollTimeout);
    window._scrollTimeout = setTimeout(() => isUserScrolling = false, 1500);
  });

  function autoScrollGallery() {
    if (!gallery || isUserScrolling) return;

    if (gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth - 1) {
      gallery.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      gallery.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  setInterval(autoScrollGallery, 60); // 20% slower than 50ms
</script> -->

<!--  -->
<!-- ACHIEVEMENT SECTION -->
<!--  -->

## 🏆 <strong>Achievements</strong>

<style>
.achievement-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 1.5rem;
}

@media (min-width: 768px) {
  .achievement-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.achievement-item {
  background: #161b22; /*linear-gradient(135deg, #161b22, #1e2630);*/
  border-left: 4px solid #FFD700;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.achievement-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(255, 215, 0, 0.12);
}

.achievement-title {
  font-weight: 600;
  font-size: 1rem;
  color: #f0f6fc;
  display: block;
  margin-bottom: 0.15rem;
}

.achievement-note {
  font-size: 0.94rem;
  color: #9eb1c6;
  display: block;
}
</style>

<div class="achievement-grid">

  <div class="achievement-item">
    <span class="achievement-title">Google Summer of Code 2024</span>
    <span class="achievement-note"> One of 1,220 selected from 43K+ applicants</span>
  </div>

  <div class="achievement-item">
    <span class="achievement-title">AWS AI & ML Scholar Advance 2024</span>
    <span class="achievement-note">One of 500 selected globally</span>
  </div>

  <div class="achievement-item">
    <span class="achievement-title">AWS AI & ML Scholar 2023</span>
    <span class="achievement-note">One of 2K selected from 70K+ applicants</span>
  </div>

  <div class="achievement-item">
    <span class="achievement-title">UN Millennium Fellowship 2022</span>
    <span class="achievement-note">One of 3K selected from 31K+ applicants</span>
  </div>

  <div class="achievement-item">
    <span class="achievement-title">1st Rank | IIT Bombay E-Cell BnB 2022</span>
    <span class="achievement-note">Ranked 1st among 190+ teams</span>
  </div>

  <div class="achievement-item">
    <span class="achievement-title">Selected for SSIP 2020</span>
    <span class="achievement-note">For Project ‘Emergency Vehicle Priority System’</span>
  </div>
</div>

<!--  -->
<!-- EXPERIENCE SECTION -->
<!--  -->

## 📊 <strong>Experience</strong>

<style>
.exp-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 1.5rem;
}

@media (min-width: 768px) {
  .exp-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.exp-item {
  background: #161b22;
  border-left: 4px solid #00BFFF;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 191, 255, 0.08);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.exp-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0, 191, 255, 0.12);
}

/* Header now uses a two-column grid: left (title + desc) and right (date) */
.exp-header {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: start;
}

.header-left {
  display: flex;
  flex-direction: column;
}

.exp-title {
  font-weight: 600;
  font-size: 1rem;
  color: #f0f6fc;
  margin-bottom: 0.2rem;
}

.exp-desp {
  font-size: 0.95rem;
  color: #9eb1c6;
  font-style: italic;
  font-weight: 500;
}

.exp-date {
  font-size: 0.85rem;
  color: #7f8c9f;
  font-style: italic;
  white-space: nowrap;
  padding-left: 1rem;
  padding-top: 0.15rem;
}
</style>

<div class="exp-grid">

  <!-- Research Collabrator | MIT -->
  <div class="exp-item">
    <div class="exp-header">
      <div class="header-left">
        <div class="exp-title">Research Collabrator</div>
        <div class="exp-desp">HCI Engeneering Group, MIT</div>
      </div>
      <div class="exp-date">Aug, 2025 – Present</div>
    </div>
  </div>

  <!-- Founder / Housify -->
  <div class="exp-item">
    <div class="exp-header">
      <div class="header-left">
        <div class="exp-title">Founder</div>
        <div class="exp-desp">Housify; fintech app for residential society management </div>
      </div>
      <div class="exp-date">Jan, 2025 – Present</div>
    </div>
  </div>

  <!-- Research Intern / Plaksha University -->
  <div class="exp-item">
    <div class="exp-header">
      <div class="header-left">
        <div class="exp-title">Research Intern</div>
        <div class="exp-desp">Robotics Lab, Plaksha University</div>
      </div>
      <div class="exp-date">Jun, 2025 – Aug, 2025</div>
    </div>
  </div>

  <!-- Research Intern / HTI Lab -->
  <div class="exp-item">
    <div class="exp-header">
      <div class="header-left">
        <div class="exp-title">Research Intern</div>
        <div class="exp-desp">HTI (Human Technology Interaction) Lab, Plaksha University</div>
      </div>
      <div class="exp-date">Jan, 2024 – Feb, 2025</div>
    </div>
  </div>

  <!-- Contributor / Google Summer of Code 2024 -->
  <div class="exp-item">
    <div class="exp-header">
      <div class="header-left">
        <div class="exp-title">Contributor</div>
        <div class="exp-desp">Google Summer of Code 2024 <br> @QuTiP @NUMFOCUS</div>
      </div>
      <div class="exp-date">May – Sep, 2024</div>
    </div>
  </div>

  <!-- Data Science Intern / BlinkX by JM Financial, Mumbai -->
  <div class="exp-item">
    <div class="exp-header">
      <div class="header-left">
        <div class="exp-title">Data Science Intern</div>
        <div class="exp-desp">BlinkX by JM Financial, Mumbai</div>
      </div>
      <div class="exp-date">Jun – Aug, 2024</div>
    </div>
  </div>

  <!-- Research Intern / PRL, Ahmedabad -->
  <div class="exp-item">
    <div class="exp-header">
      <div class="header-left">
        <div class="exp-title">Research Intern</div>
        <div class="exp-desp">Physical Research Laboratory (PRL), Ahmedabad</div>
      </div>
      <div class="exp-date">Jun – Aug 2023</div>
    </div>
  </div>

  <!-- Game Design Intern / MADIEE Games -->
  <div class="exp-item">
    <div class="exp-header">
      <div class="header-left">
        <div class="exp-title">Game Design Intern</div>
        <div class="exp-desp">MADIEE Games</div>
      </div>
      <div class="exp-date">Jan – Apr 2022</div>
    </div>
  </div>

</div>

<!-- ## 🤩 Things I love to do ....
<table style="border-collapse: collapse; border: none;">
  <tr>
    <td style="border: none;">
      <h2>⛰️ Trekking</h2>
      <img src="/images/rushi-trek.png" width="200" height="200"><br>
    </td>
    <td style="border: none;">
      <h2>📟 Electronics</h2>
      <img src="painting.jpg" width="200" height="200"><br>
    </td>
    <td style="border: none;">
      <h2>🪐 Star Gazing</h2>
      <img src="photography.jpg" width="200" height="200"><br>
    </td>
  </tr>
</table> -->
