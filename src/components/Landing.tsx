import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>MİSGİB!</h2>
            <h1>Software</h1>
          </div>
          <div className="landing-info">
            <h3>Yaratıcı</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Geliştirici</div>
              <div className="landing-h2-2">Tasarımcı</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Geliştirici</div>
              <div className="landing-h2-info-1">Tasarımcı</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
