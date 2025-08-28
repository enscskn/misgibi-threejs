import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>İletişim</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>E-posta</h4>
            <p>
              <a href="mailto:info@misgibisoftware.com" data-cursor="disable">
                info@misgibisoftware.com
              </a>
            </p>
            <div className="contact-blog-link">
              <a href="/blog" data-cursor="disable" className="blog-link">
                Blog & Makaleler →
              </a>
            </div>
          </div>
          <div className="contact-box">
            <h4>Sosyal Medya</h4>
            <a
              href="https://github.com/misgibisoftware"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/company/misgibisoftware"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href="https://x.com/misgibisoftware"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Twitter <MdArrowOutward />
            </a>
            <a
              href="https://www.instagram.com/misgibisoftware"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Tasarım ve Geliştirme <br /> <span>MİSGİB! Software</span>
            </h2>
            <h5>
              <MdCopyright /> 2025
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
