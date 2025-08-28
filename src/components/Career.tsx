import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Şirketimizin <span>geçmişi</span>
          <br /> ve deneyimi
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Kuruluş & İlk Projeler</h4>
                <h5>Misgibi Software</h5>
              </div>
              <h3>2023 - GÜNÜMÜZ</h3>
            </div>
            <p>
              Misgibi Software olarak dijital dünyada markaların başarısı için çalışmaya başladık. 
              İlk projelerimizde modern web teknolojileri kullanarak responsive ve kullanıcı dostu 
              web siteleri geliştirdik. Müşteri memnuniyeti ve kaliteli kod yazımı bizim için 
              her zaman öncelik oldu.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Web Geliştirme Hizmetleri</h4>
                <h5>Misgibi Software</h5>
              </div>
              <h3>2023 - GÜNÜMÜZ</h3>
            </div>
            <p>
              React, Next.js, TypeScript ve TailwindCSS gibi güncel teknolojileri kullanarak 
              ölçeklenebilir web uygulamaları geliştirdik. E-ticaret siteleri, kurumsal web siteleri 
              ve özel yazılım çözümleri ile müşterilerimizin dijital dönüşümüne öncülük ettik.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Dijital Pazarlama Çözümleri</h4>
                <h5>Misgibi Software</h5>
              </div>
              <h3>2023 - GÜNÜMÜZ</h3>
            </div>
            <p>
              SEO uyumlu web siteleri, sosyal medya entegrasyonları ve dijital pazarlama 
              araçları ile markaların online varlığını güçlendirdik. Analitik ve raporlama 
              sistemleri ile performans takibi sağladık.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
