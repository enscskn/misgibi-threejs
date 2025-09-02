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
            <h3>Bizimle</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Projeni</div>
              <div className="landing-h2-2">Yönet</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Projeni</div>
              <div className="landing-h2-info-1">Yönet</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
