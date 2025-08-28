import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          N<span className="hat-h2">E</span>
          <div>
            Y<span className="do-h2">APIYORUZ</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>Web Geliştirme</h3>
              <h4>Açıklama</h4>
              <p>
                Modern web teknolojileri kullanarak responsive, hızlı ve kullanıcı dostu web siteleri geliştiriyoruz. React, Next.js, TypeScript ve TailwindCSS ile ölçeklenebilir web uygulamaları oluşturuyoruz. SEO uyumlu, performanslı ve güvenli web çözümleri sunuyoruz.
              </p>
              <h5>Teknolojiler & Araçlar</h5>
              <div className="what-content-flex">
                <div className="what-tags">JavaScript</div>
                <div className="what-tags">TypeScript</div>
                <div className="what-tags">React</div>
                <div className="what-tags">Next.js</div>
                <div className="what-tags">Three.js</div>
                <div className="what-tags">Node.js</div>
                <div className="what-tags">CSS</div>
                <div className="what-tags">Express.js</div>
                <div className="what-tags">TailwindCSS</div>
                <div className="what-tags">MySQL</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
              className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>UI/UX Tasarım</h3>
              <h4>Açıklama</h4>
              <p>
                Kullanıcı deneyimini ön planda tutan modern tasarım çözümleri geliştiriyoruz. Figma, Adobe Creative Suite ve diğer tasarım araçları ile kullanıcı dostu arayüzler tasarlıyoruz. Wireframe'den prototipe, kullanıcı testlerinden final tasarıma kadar tüm süreçleri yönetiyoruz.
              </p>
              <h5>Teknolojiler & Araçlar</h5>
              <div className="what-content-flex">
                <div className="what-tags">Figma</div>
                <div className="what-tags">Adobe XD</div>
                <div className="what-tags">UI Design</div>
                <div className="what-tags">Prototyping</div>
                <div className="what-tags">User Research</div>
                <div className="what-tags">Design Systems</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
