import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let hover = false;
    const cursor = cursorRef.current!;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };
    
    // Mouse hareketini takip et
    document.addEventListener("mousemove", (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      
      // Mouse hızına göre cursor boyutunu ayarla
      const speed = Math.sqrt(e.movementX ** 2 + e.movementY ** 2);
      const dynamicSize = Math.min(50 + speed * 0.5, 80);
      cursor.style.setProperty('--size', `${dynamicSize}px`);
    });
    
    // Smooth cursor hareketi
    requestAnimationFrame(function loop() {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        
        gsap.to(cursor, { 
          x: cursorPos.x, 
          y: cursorPos.y, 
          duration: 0.1,
          ease: "power2.out"
        });
      }
      requestAnimationFrame(loop);
    });
    
    // Hover efektleri
    document.querySelectorAll("[data-cursor]").forEach((item) => {
      const element = item as HTMLElement;
      
      element.addEventListener("mouseover", (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        if (element.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");
          
          // Social icon'lar için özel boyut ayarı
          const isSocialIcons = element.classList.contains('social-icons');
          let targetSize;
          
          if (isSocialIcons) {
            // Social icon'lar için daha küçük cursor
            targetSize = Math.min(60, Math.max(rect.width, rect.height) + 10);
          } else {
            // Diğer icon'lar için normal boyut
            targetSize = Math.max(rect.width, rect.height);
          }
          
          // Cursor'ı element boyutuna göre ayarla
          gsap.to(cursor, { 
            x: rect.left, 
            y: rect.top, 
            duration: 0.3,
            ease: "power2.out"
          });
          
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          cursor.style.setProperty('--size', `${targetSize}px`);
          hover = true;
        }
        
        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
          cursor.style.setProperty('--size', '0px');
        }
      });
      
      element.addEventListener("mouseout", () => {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        cursor.style.setProperty('--size', '50px');
        hover = false;
      });
    });
    
    // Mouse hızına göre glow efekti
    let lastTime = Date.now();
    let velocity = 0;
    
    const updateGlow = () => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      if (deltaTime > 0) {
        velocity = Math.min(velocity + deltaTime * 0.01, 1);
      } else {
        velocity = Math.max(velocity - deltaTime * 0.005, 0);
      }
      
      // Velocity'ye göre glow intensity'yi ayarla
      const glowIntensity = 0.3 + velocity * 0.7;
      cursor.style.setProperty('--glow-intensity', glowIntensity.toString());
      
      requestAnimationFrame(updateGlow);
    };
    
    updateGlow();
    
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
