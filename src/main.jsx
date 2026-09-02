import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";

const contact = {
  phone: "139-6740-0515",
  email: "57968451@qq.com",
  wechat: "Liuran0515",
};

const metrics = [
  { value: "20+", label: "年设计深耕" },
  { value: "180+", label: "落地项目" },
  { value: "金住奖", label: "十大居住设计师" },
  { value: "副会长", label: "义乌工业设计协会" },
];

const projects = [
  {
    title: "大平层私宅客厅",
    type: "大平层私宅 / 全案设计",
    image: "/assets/project-flat-home.png",
    details: "弧形壁炉、环抱式沙发与大面采光建立克制、松弛的生活场域。",
    video: "/assets/flat-tour.mp4",
    gallery: [2, 3, 4, 5, 6].map((item) => `/assets/flat-gallery-${item}.png`),
  },
  {
    title: "排屋私宅会客厅",
    type: "排屋私宅 / 全案设计",
    image: "/assets/project-rowhouse.png",
    details: "大面落地窗、天然木皮与低饱和织物建立通透、松弛的会客秩序。",
    gallery: [1, 3, 4, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((item) => `/assets/rowhouse-gallery-${item}.png`),
  },
  {
    title: "杭州茶叶数字展馆",
    type: "商业空间 / 数字展陈设计",
    image: "/assets/project-tea-museum.png",
    details: "以茶文化叙事、沉浸式影像、展柜灯光与观展动线建立商业空间的记忆点。",
    video: "/assets/tea-museum-tour.mp4",
    gallery: [
      "/assets/project-tea-museum.png",
      "/assets/tea-gallery-1.png",
      "/assets/tea-gallery-2.png",
      "/assets/tea-gallery-4.png",
      "/assets/tea-gallery-5.png",
      "/assets/tea-gallery-7.png",
      "/assets/tea-gallery-8.png",
      "/assets/tea-gallery-9.png",
    ],
  },
];

const strengths = [
  {
    title: "全案室内设计",
    copy: "从平面优化、材料定样、灯光体系到施工收口，控制空间质感与落地精度。",
  },
  {
    title: "高级材质表达",
    copy: "擅长木饰面、石材干挂、金属收边、艺术涂料与软装肌理的组合关系。",
  },
  {
    title: "AI辅助提案",
    copy: "使用 ChatGPT、AI Agent、BananaPro、Midjourney 快速完成风格探索与效果图验证。",
  },
  {
    title: "品牌视觉统筹",
    copy: "把空间、标识、画册、社媒视觉与客户触点统一成完整品牌体验。",
  },
];

function App() {
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const rootRef = useRef(null);

  usePortfolioMotion(rootRef, setShowFloatingNav);

  return (
    <main ref={rootRef}>
      <OpeningMask />
      <FloatingNav visible={showFloatingNav} />
      <Hero />
      <Profile />
      <SelectedProjects />
      <Strengths />
      <Contact />
    </main>
  );
}

function usePortfolioMotion(rootRef, setShowFloatingNav) {
  useEffect(() => {
    if (!rootRef.current) return undefined;

    if (window.location.hash && window.location.hash !== "#home") {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
      window.scrollTo(0, 0);
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      document.body.classList.add("motionReady");
      const openingMask = rootRef.current.querySelector(".openingMask");
      if (openingMask) openingMask.style.display = "none";
      const onScroll = () => {
        setShowFloatingNav(window.scrollY > window.innerHeight * 0.82);
      };

      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        document.body.classList.remove("motionReady");
        window.removeEventListener("scroll", onScroll);
      };
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      document.body.classList.add("motionReady");

      ScrollTrigger.create({
        trigger: ".profile",
        start: "top 18%",
        onEnter: () => setShowFloatingNav(true),
        onLeaveBack: () => setShowFloatingNav(false),
      });

      const playHeroBlurText = () => {
        gsap.fromTo(
          ".heroTitleChar",
          {
            y: 164,
            x: 28,
            scaleX: 0.52,
            opacity: 0,
            filter: "blur(30px)",
            transformOrigin: "0% 100%",
          },
          {
            y: 0,
            x: 0,
            scaleX: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.34,
            stagger: 0.11,
            ease: "power4.out",
            overwrite: true,
          },
        );
      };

      ScrollTrigger.create({
        trigger: ".hero",
        start: "top 78%",
        onEnterBack: playHeroBlurText,
      });

      const opening = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      opening
        .set(".heroVideo", { scale: 1.12, filter: "saturate(0.75) contrast(1.2) brightness(0.72)" })
        .set(".nav", { y: -44, opacity: 0 })
        .set(".kicker", { y: 46, opacity: 0 })
        .set(".heroTitle", { opacity: 1 })
        .set(".heroTitleChar", {
          y: 164,
          x: 28,
          scaleX: 0.52,
          opacity: 0,
          filter: "blur(30px)",
          transformOrigin: "0% 100%",
        })
        .set(".heroCopy", { y: 46, opacity: 0 })
        .set(".heroActions a", { y: 32, opacity: 0 })
        .to(".openingWord", { y: 0, opacity: 1, duration: 0.9 })
        .to(".openingLine", { scaleX: 1, duration: 0.9 }, "-=0.55")
        .to(".openingContent", { y: -22, opacity: 0, duration: 0.58, ease: "power3.inOut" }, "+=0.08")
        .to(".openingPanelTop", { yPercent: -100, duration: 1.28, ease: "power4.inOut" }, "+=0.12")
        .to(".openingPanelBottom", { yPercent: 100, duration: 1.28, ease: "power4.inOut" }, "<")
        .set(".openingMask", { display: "none" })
        .to(".heroVideo", { scale: 1, filter: "saturate(0.88) contrast(1.06) brightness(1)", duration: 1.7 }, "-=0.9")
        .to(".nav", { y: 0, opacity: 1, duration: 0.95 }, "-=1.0")
        .to(".kicker", { y: 0, opacity: 1, duration: 0.95 }, "-=0.42")
        .to(
          ".heroTitleChar",
          {
            y: 0,
            x: 0,
            scaleX: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.34,
            stagger: 0.11,
          },
          "-=0.18",
        )
        .to(".heroCopy", { y: 0, opacity: 1, duration: 0.92 }, "-=0.62")
        .to(".heroActions a", { y: 0, opacity: 1, duration: 0.72, stagger: 0.12 }, "-=0.52");

      gsap.utils.toArray(".motionSection").forEach((section) => {
        const title = section.querySelector(".motionTitle");
        const sectionLabel = section.querySelector(".sectionLabel");
        const heading = section.querySelector("h2");
        const items = section.querySelectorAll(
          ".portraitPanel, .profileCredits div, .contactStrip > *, .metric, .projectCard, .strengthCard, .contactCards > div",
        );
        const contactActions = section.querySelectorAll(".contactActions > *");

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
          },
          defaults: { ease: "power4.out" },
        });

        if (title) {
          timeline.from(title, {
            y: 116,
            xPercent: -10,
            scaleX: 1.18,
            opacity: 0,
            duration: 1.12,
            transformOrigin: "0% 100%",
          });
        }

        if (sectionLabel) {
          timeline.from(sectionLabel, { y: 34, opacity: 0, duration: 0.7 }, title ? "-=0.62" : 0);
        }

        if (heading) {
          timeline.from(heading, { y: 74, opacity: 0, duration: 1.05 }, "-=0.48");
        }

        if (items.length) {
          timeline.from(
            items,
            {
              y: 76,
              opacity: 0,
              clipPath: "inset(18% 0 0 0)",
              duration: 0.95,
              stagger: 0.1,
            },
            "-=0.52",
          );
        }

        if (contactActions.length) {
          timeline.from(
            contactActions,
            {
              y: 36,
              opacity: 0,
              duration: 0.78,
              stagger: 0.12,
            },
            "-=0.72",
          );
        }
      });

      gsap.utils.toArray(".projectCard img, .galleryItem img").forEach((image) => {
        gsap.fromTo(
          image,
          { yPercent: -4, scale: 1.08 },
          {
            yPercent: 4,
            scale: 1.02,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.9,
            },
          },
        );
      });
    }, rootRef);

    return () => {
      document.body.classList.remove("motionReady");
      ctx.revert();
    };
  }, [rootRef, setShowFloatingNav]);
}

function OpeningMask() {
  return (
    <div className="openingMask" aria-hidden="true">
      <div className="openingPanel openingPanelTop" />
      <div className="openingPanel openingPanelBottom" />
      <div className="openingContent">
        <span className="openingWord">LIU RAN DESIGN</span>
        <i className="openingLine" />
      </div>
    </div>
  );
}

function NavContent() {
  return (
    <>
      <a className="brand" href="#home" aria-label="返回首页">
        刘然|三希然设计
      </a>
      <div className="navLinks" aria-label="主导航">
        <a href="#profile">经历</a>
        <a href="#projects">项目</a>
        <a href="#strengths">优势</a>
        <a href="#contact">联系</a>
      </div>
      <a className="navCta" href="#contact">
        联系
      </a>
    </>
  );
}

function FloatingNav({ visible }) {
  return (
    <nav className={`floatingNav${visible ? " isVisible" : ""}`} aria-label="悬浮导航">
      <div className="floatingNavInner">
        <NavContent />
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <video className="heroVideo" autoPlay muted loop playsInline poster="/assets/project-ai.svg">
        <source src="/assets/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="heroShade" />
      <nav className="nav">
        <NavContent />
      </nav>
      <div className="heroInner">
        <p className="kicker">INTERIOR / VISUAL / AI / BRAND DESIGN</p>
        <h1 className="heroTitle" aria-label="空间即品牌">
          {"空间即品牌".split("").map((char) => (
            <span className="heroTitleChar" aria-hidden="true" key={char}>
              {char}
            </span>
          ))}
        </h1>
        <p className="heroCopy">
          以室内设计为核心，整合空间策略、材质美学、灯光美学、品牌视觉与AI设计流程，为高端住宅与商业场景提供可落地的完整设计服务。
        </p>
        <div className="heroActions">
          <a className="primaryBtn" href="#contact">
            预约设计咨询
          </a>
          <a className="secondaryBtn" href="#projects">
            查看精选作品
          </a>
        </div>
      </div>
    </section>
  );
}

function Profile() {
  return (
    <section className="section profile motionSection" id="profile">
      <MoltenMetalBackground />
      <div className="sectionInner profileGrid">
        <div className="portraitPanel">
          <img src="/assets/liuran-profile.jpg" alt="刘然在设计活动现场分享" />
        </div>
        <div className="profileContent">
          <p className="motionTitle" aria-hidden="true">EXPERIENCE</p>
          <p className="sectionLabel">个人经历</p>
          <h2>大宅的奢侈，是克制的审美与妥帖动线，而非堆砌的昂贵。</h2>
          <div className="profileCredits" aria-label="刘然个人经历">
            <dl>
              <div>
                <dt>主理人</dt>
                <dd>刘然 / 三希然设计</dd>
              </div>
              <div>
                <dt>专注领域</dt>
                <dd>大平层、排屋、别墅私宅和商业空间设计</dd>
              </div>
              <div>
                <dt>风格方向</dt>
                <dd>宋式美学、新中式、现代极简、意式轻奢、中古、老钱风</dd>
              </div>
              <div>
                <dt>专业身份</dt>
                <dd>金住奖十大居住设计师、义乌工业设计协会副会长</dd>
              </div>
              <div>
                <dt>设计判断</dt>
                <dd>以功能动线为底层逻辑，建立克制、有温度且能长期使用的空间系统</dd>
              </div>
              <div>
                <dt>材质语言</dt>
                <dd>天然木皮、石材、皮革、金属、艺术涂料与织物软装的克制配比</dd>
              </div>
            </dl>
          </div>
          <div className="contactStrip">
            <a href={`tel:${contact.phone.replaceAll("-", "")}`}>{contact.phone}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <span>微信：{contact.wechat}</span>
          </div>
          <div className="metrics">
            {metrics.map((item) => (
              <div className="metric" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SelectedProjects() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section className="section projects motionSection" id="projects">
      <div className="sectionInner">
        <div className="stackHeader">
          <p className="motionTitle" aria-hidden="true">SELECTED WORKS</p>
          <p className="sectionLabel">精选项目</p>
          <h2>以完整案例呈现空间气质、材料尺度与灯光层次。</h2>
        </div>
        <div className="projectGrid">
          {projects.map((project, index) => {
            const CardTag = project.gallery ? "button" : "article";

            return (
              <CardTag
                className={`projectCard projectCard${index + 1}`}
                key={project.title}
                type={project.gallery ? "button" : undefined}
                onClick={project.gallery ? () => setActiveProject(project) : undefined}
              >
                <img src={project.image} alt={project.title} />
                <div className="projectInfo">
                  <span>{project.type}</span>
                  <h3>{project.title}</h3>
                  <p>{project.details}</p>
                  {project.gallery ? <em>点击查看完整案例</em> : null}
                </div>
              </CardTag>
            );
          })}
        </div>
      </div>
      {activeProject ? <ProjectGallery project={activeProject} onClose={() => setActiveProject(null)} /> : null}
    </section>
  );
}

function ProjectGallery({ project, onClose }) {
  return (
    <div className="galleryOverlay" role="dialog" aria-modal="true" aria-label={`${project.title}完整案例`}>
      <div className="galleryTop">
        <div>
          <p className="sectionLabel">完整案例</p>
          <h2>{project.title}</h2>
        </div>
        <button className="galleryClose" type="button" onClick={onClose} aria-label="关闭案例图集">
          关闭
        </button>
      </div>
      {project.video ? (
        <div className="galleryVideo">
          <video controls muted playsInline poster={project.image}>
            <source src={project.video} type="video/mp4" />
          </video>
        </div>
      ) : null}
      <div className="galleryGrid">
        {project.gallery.map((image, index) => (
          <figure className="galleryItem" key={image}>
            <img src={image} alt={`${project.title}作品图 ${index + 1}`} />
          </figure>
        ))}
      </div>
    </div>
  );
}

function Strengths() {
  return (
    <section className="section strengths motionSection" id="strengths">
      <MoltenMetalBackground />
      <div className="sectionInner strengthsGrid">
        <div className="strengthIntro">
          <p className="motionTitle" aria-hidden="true">CAPABILITIES</p>
          <p className="sectionLabel">个人优势</p>
          <h2>不是堆砌昂贵，而是把审美、动线、预算、工艺与成交表达放在同一套系统里。</h2>
        </div>
        <div className="strengthCards">
          {strengths.map((item) => (
            <article className="strengthCard" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contactFinal motionSection" id="contact">
      <MoltenMetalBackground />
      <div className="contactInner">
        <p className="motionTitle" aria-hidden="true">CONTACT</p>
        <p className="sectionLabel">项目咨询</p>
        <h2>如果你需要一个兼顾高级感、施工落地和客户成交表达的设计方案，可以直接发来户型图或项目简述。</h2>
        <div className="contactActions">
          <a className="primaryBtn" href={`mailto:${contact.email}`}>
            邮件咨询
          </a>
          <a className="secondaryBtn" href={`tel:${contact.phone.replaceAll("-", "")}`}>
            电话沟通
          </a>
        </div>
        <div className="contactCards">
          <div>
            <span>邮箱</span>
            <strong>{contact.email}</strong>
          </div>
          <div>
            <span>电话</span>
            <strong>{contact.phone}</strong>
          </div>
          <div>
            <span>微信</span>
            <strong>{contact.wechat}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

function MoltenMetalBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d", { alpha: true });
    let width = 0;
    let height = 0;
    let frame = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, Math.floor(rect.width * dpr));
      height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.width = width;
      canvas.height = height;
    };

    const draw = (time = 0) => {
      const t = time * 0.00016;
      ctx.clearRect(0, 0, width, height);

      const base = ctx.createLinearGradient(0, 0, width, height);
      base.addColorStop(0, "#11100e");
      base.addColorStop(0.42, "#123018");
      base.addColorStop(1, "#070806");
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < 7; i += 1) {
        const x = width * (0.18 + 0.68 * Math.sin(t * (0.8 + i * 0.07) + i * 1.7) * 0.5 + 0.34);
        const y = height * (0.14 + 0.72 * Math.cos(t * (0.7 + i * 0.05) + i * 1.13) * 0.5 + 0.36);
        const radius = Math.max(width, height) * (0.22 + i * 0.035);
        const glow = ctx.createRadialGradient(x, y, radius * 0.04, x, y, radius);

        glow.addColorStop(0, i % 2 ? "rgba(80, 152, 148, 0.42)" : "rgba(214, 180, 111, 0.2)");
        glow.addColorStop(0.38, i % 2 ? "rgba(28, 61, 17, 0.28)" : "rgba(80, 152, 148, 0.18)");
        glow.addColorStop(1, "rgba(7, 8, 6, 0)");
        ctx.globalCompositeOperation = i % 2 ? "screen" : "lighter";
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.ellipse(x, y, radius * 1.1, radius * 0.52, Math.sin(t + i) * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      const shade = ctx.createLinearGradient(0, 0, 0, height);
      shade.addColorStop(0, "rgba(7, 8, 6, 0.18)");
      shade.addColorStop(0.55, "rgba(7, 8, 6, 0.42)");
      shade.addColorStop(1, "rgba(7, 8, 6, 0.72)");
      ctx.fillStyle = shade;
      ctx.fillRect(0, 0, width, height);

      frame = requestAnimationFrame(draw);
    };

    resize();
    if (reduceMotion) {
      draw(0);
      return undefined;
    }

    frame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas className="moltenBackground" ref={canvasRef} aria-hidden="true" />;
}

createRoot(document.getElementById("root")).render(<App />);
