import { useEffect, useState, lazy, Suspense, PropsWithChildren } from "react";
import Landing from "./Landing";
import About from "./About";
import WhatIDo from "./WhatIDo";
import Career from "./Career";
import Team from "./Team";
import Work from "./Work";
import CustomerReviews from "./CustomerReviews";
import TechStack from "./TechStack";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import setSplitText from "./utils/splitText";
import "./styles/style.css";

const CharacterModel = lazy(() => import("./Character"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Team />
            <Work />
            <CustomerReviews />
            {isDesktopView && (
              <div className="character-container">
                <Suspense fallback={<div>Loading....</div>}>
                  <CharacterModel />
                </Suspense>
              </div>
            )}
            <Suspense fallback={<div>Loading....</div>}>
              <TechStack />
            </Suspense>
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
