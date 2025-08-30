import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import "./styles/Blog.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Cursor from "./Cursor";
import SocialIcons from "./SocialIcons";
import { MdArrowBack, MdClose, MdCalendarToday, MdPerson, MdAccessTime, MdTag, MdSearch, MdFilterList } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  slug: string;
  seoDescription: string;
  featured?: boolean;
}

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tümü");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"date" | "title" | "readTime">("date");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "React 18 ile Modern Web Uygulamaları Geliştirme",
      excerpt: "React 18'in yeni özelliklerini keşfedin ve performanslı web uygulamaları nasıl geliştirileceğini öğrenin.",
      content: "React 18, web geliştirme dünyasında devrim yaratan yeni özellikler getiriyor. Concurrent rendering, automatic batching ve suspense for data fetching gibi özellikler sayesinde daha hızlı ve responsive uygulamalar geliştirebilirsiniz.\n\nReact 18'in en önemli özelliklerinden biri Concurrent Features'dır. Bu özellik sayesinde React, kullanıcı etkileşimlerini önceliklendirir ve daha akıcı bir deneyim sunar. Automatic batching ile state güncellemeleri otomatik olarak gruplandırılır ve gereksiz re-render'lar önlenir.\n\nSuspense for data fetching ile veri yükleme durumları daha iyi yönetilir ve loading states daha kolay implement edilir. Bu özellikler sayesinde modern web uygulamaları çok daha performanslı ve kullanıcı dostu hale gelir.",
      author: "Enes Coşkun",
      publishDate: "2024-12-15",
      readTime: "8 dk",
      category: "Web Geliştirme",
      tags: ["React", "JavaScript", "Frontend", "Performance", "Concurrent"],
      image: "/teams/teams1.avif",
      slug: "react-18-modern-web-uygulamalari",
      seoDescription: "React 18 ile modern web uygulamaları geliştirme rehberi. Yeni özellikler, performans optimizasyonu ve best practices.",
      featured: true
    },
    {
      id: 2,
      title: "TypeScript ile Güvenli Kod Yazımı",
      excerpt: "TypeScript kullanarak daha güvenli ve sürdürülebilir kod nasıl yazılır? Detaylı rehber ve örnekler.",
      content: "TypeScript, JavaScript'in tip güvenli versiyonu olarak modern web geliştirmede vazgeçilmez hale geldi. Bu makalede TypeScript'in temel kavramlarını, tip tanımlamalarını, interface'leri ve advanced type features'ları öğreneceksiniz.\n\nTypeScript'in en büyük avantajlarından biri compile-time error checking'dir. Bu sayede runtime'da karşılaşabileceğiniz hataları geliştirme aşamasında yakalayabilirsiniz. Interface'ler ve type aliases ile kodunuz daha okunabilir ve maintainable hale gelir.\n\nAdvanced type features olarak generic types, union types, intersection types ve conditional types gibi güçlü özellikler bulunur. Bu özellikler sayesinde çok daha esnek ve type-safe kod yazabilirsiniz.",
      author: "Ahmetcan Altıntaş",
      publishDate: "2024-12-12",
      readTime: "12 dk",
      category: "Programlama",
      tags: ["TypeScript", "JavaScript", "Code Quality", "Best Practices", "Type Safety"],
      image: "/teams/teams2.avif",
      slug: "typescript-guvenli-kod-yazimi",
      seoDescription: "TypeScript ile güvenli kod yazımı. Tip güvenliği, best practices ve gerçek dünya örnekleri.",
      featured: true
    },
    {
      id: 3,
      title: "Next.js 14 ile SEO Optimizasyonu",
      excerpt: "Next.js 14 kullanarak web sitenizi Google'da üst sıralara çıkarın. SEO teknikleri ve implementasyon.",
      content: "SEO, modern web geliştirmede en kritik faktörlerden biri. Next.js 14 ile server-side rendering, static generation ve dynamic routing kullanarak SEO dostu web siteleri nasıl geliştirilir? Bu makalede meta tags, structured data, performance optimization ve Google Core Web Vitals konularını detaylı olarak ele alacağız.\n\nNext.js 14'in App Router'ı ile çok daha güçlü SEO özellikleri sunar. Metadata API sayesinde her sayfa için dinamik meta tags tanımlayabilirsiniz. Structured data ile arama motorlarına içeriğinizi daha iyi anlatabilirsiniz.\n\nPerformance optimization için Image component, font optimization ve bundle analyzer gibi araçlar kullanabilirsiniz. Google Core Web Vitals metriklerini iyileştirerek arama sıralamanızı yükseltebilirsiniz.",
      author: "Enes Balcı",
      publishDate: "2024-12-10",
      readTime: "10 dk",
      category: "SEO & Marketing",
      tags: ["Next.js", "SEO", "Performance", "Marketing", "Core Web Vitals"],
      image: "/teams/teams3.avif",
      slug: "nextjs-14-seo-optimizasyonu",
      seoDescription: "Next.js 14 ile SEO optimizasyonu. Server-side rendering, meta tags ve performans optimizasyonu.",
      featured: false
    },
    {
      id: 4,
      title: "UI/UX Tasarımında Kullanıcı Deneyimi",
      excerpt: "Kullanıcı odaklı tasarım prensipleri ve modern UI/UX trendleri. Kullanıcı memnuniyetini artırın.",
      content: "Kullanıcı deneyimi, dijital ürünlerin başarısında en kritik faktör. Bu makalede modern UI/UX tasarım prensiplerini, kullanıcı araştırma metodlarını, prototyping tekniklerini ve design system'leri inceleyeceğiz. Figma ve Adobe XD gibi araçlarla nasıl etkili tasarımlar oluşturulur?\n\nUI/UX tasarımında en önemli prensiplerden biri user-centered design'dır. Kullanıcılarınızı anlamak için user research, personas ve user journey mapping gibi metodları kullanmalısınız. Prototyping ile tasarım fikirlerinizi hızlıca test edebilirsiniz.\n\nDesign system'ler ile tutarlı ve scalable tasarımlar oluşturabilirsiniz. Component library'ler sayesinde geliştirme sürecini hızlandırabilir ve tasarım kalitesini artırabilirsiniz.",
      author: "Ahmetcan Altıntaş",
      publishDate: "2024-12-08",
      readTime: "15 dk",
      category: "UI/UX Tasarım",
      tags: ["UI/UX", "Design", "User Experience", "Figma", "Design Systems"],
      image: "/teams/teams4.avif",
      slug: "ui-ux-tasariminda-kullanici-deneyimi",
      seoDescription: "UI/UX tasarımında kullanıcı deneyimi. Modern tasarım prensipleri ve best practices.",
      featured: false
    },
    {
      id: 5,
      title: "Mobil Uygulama Geliştirmede React Native",
      excerpt: "React Native ile cross-platform mobil uygulamalar geliştirin. Performans ve kullanıcı deneyimi optimizasyonu.",
      content: "Mobil uygulama geliştirme, günümüzde en popüler ve karlı alanlardan biri. React Native ile iOS ve Android platformları için tek kod tabanından uygulamalar nasıl geliştirilir? Bu makalede React Native'in temel kavramlarını, navigation, state management, performance optimization ve native module entegrasyonunu öğreneceksiniz.\n\nReact Native'in en büyük avantajı cross-platform geliştirmedir. Tek kod tabanı ile hem iOS hem de Android için uygulama geliştirebilirsiniz. Navigation için React Navigation kullanarak güçlü routing sistemleri oluşturabilirsiniz.\n\nState management için Redux, MobX veya Context API kullanabilirsiniz. Performance optimization için FlatList, Image caching ve lazy loading gibi teknikleri uygulayabilirsiniz. Native module entegrasyonu ile platform-specific özellikleri kullanabilirsiniz.",
      author: "Yunus Eren Bilici",
      publishDate: "2024-12-05",
      readTime: "14 dk",
      category: "Mobil Geliştirme",
      tags: ["React Native", "Mobile", "Cross-platform", "Performance", "Navigation"],
      image: "/teams/teams1.avif",
      slug: "mobil-uygulama-gelistirmede-react-native",
      seoDescription: "React Native ile mobil uygulama geliştirme. Cross-platform geliştirme ve performans optimizasyonu.",
      featured: false
    },
    {
      id: 6,
      title: "Web Güvenliği ve Güvenlik Açıkları",
      excerpt: "Web uygulamalarında güvenlik nasıl sağlanır? Yaygın güvenlik açıkları ve korunma yöntemleri.",
      content: "Web güvenliği, modern internet dünyasında en kritik konulardan biri. Bu makalede OWASP Top 10 güvenlik açıklarını, authentication ve authorization sistemlerini, data encryption tekniklerini ve security testing metodlarını detaylı olarak inceleyeceğiz. Güvenli web uygulamaları nasıl geliştirilir ve korunur?\n\nOWASP Top 10 listesinde en kritik güvenlik açıkları bulunur. Injection attacks, broken authentication, sensitive data exposure ve security misconfiguration gibi konuları detaylı olarak ele alacağız. Her bir güvenlik açığı için prevention ve mitigation stratejileri öğreneceksiniz.\n\nAuthentication ve authorization sistemleri için JWT, OAuth 2.0 ve multi-factor authentication gibi modern güvenlik protokollerini kullanabilirsiniz. Data encryption için HTTPS, hashing ve encryption algoritmalarını uygulayabilirsiniz.",
      author: "Sıraç Alp Özkan",
      publishDate: "2024-12-03",
      readTime: "18 dk",
      category: "Güvenlik",
      tags: ["Security", "Web Security", "Best Practices", "Authentication", "OWASP"],
      image: "/teams/teams2.avif",
      slug: "web-guvenligi-ve-guvenlik-aciklari",
      seoDescription: "Web güvenliği ve güvenlik açıkları. Güvenlik best practices ve korunma yöntemleri.",
      featured: false
    }
  ];

  const categories = ["Tümü", "Web Geliştirme", "Programlama", "SEO & Marketing", "UI/UX Tasarım", "Mobil Geliştirme", "Güvenlik"];
  const sortOptions = [
    { value: "date", label: "Tarihe Göre" },
    { value: "title", label: "Başlığa Göre" },
    { value: "readTime", label: "Okuma Süresine Göre" }
  ];

  // Tüm tag'leri topla
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogPosts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filtreleme ve sıralama
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = blogPosts.filter(post => {
      const matchesCategory = selectedCategory === "Tümü" || post.category === selectedCategory;
      const matchesSearch = searchQuery === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => post.tags.includes(tag));
      return matchesCategory && matchesSearch && matchesTags;
    });

    // Sıralama
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
        case "title":
          return a.title.localeCompare(b.title, 'tr');
        case "readTime":
          return parseInt(a.readTime) - parseInt(b.readTime);
        default:
          return 0;
      }
    });

    return filtered;
  }, [blogPosts, selectedCategory, searchQuery, selectedTags, sortBy]);

  // Tag seçimi
  const toggleTag = useCallback((tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  }, []);

  // Arama temizleme
  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setSelectedTags([]);
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  // Filtreleri sıfırlama
  const resetFilters = useCallback(() => {
    setSelectedCategory("Tümü");
    setSearchQuery("");
    setSelectedTags([]);
    setSortBy("date");
  }, []);

  useEffect(() => {
    // Blog sayfası açıldığında body ve html overflow'u düzelt
    document.body.classList.add('blog-page-active');
    document.documentElement.classList.add('blog-page-active');
    
    if (containerRef.current) {
      gsap.fromTo(
        ".blog-post-card",
        { 
          y: 50, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".blog-content",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Cleanup function
    return () => {
      document.body.classList.remove('blog-page-active');
      document.documentElement.classList.remove('blog-page-active');
    };
  }, [filteredAndSortedPosts]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const openModal = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="blog-page">
      <Cursor />
      <SocialIcons />
      
      <div className="blog-back-home">
        <a href="/" data-cursor="disable">
          <MdArrowBack />
          Ana Sayfaya Dön
        </a>
      </div>
      
      <div className="blog-content">
        <div className="blog-header">
          <h2>
            Blog & <span>Makaleler</span>
          </h2>
          <p>Teknoloji dünyasından en güncel bilgiler ve rehberler</p>
        </div>
        
        <div className="blog-filters">
          <div className="search-container">
            <div className={`search-input-wrapper ${isSearchFocused ? 'focused' : ''}`}>
              <MdSearch className="search-icon" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Blog yazılarında ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="blog-search"
              />
              {searchQuery && (
                <button className="clear-search" onClick={clearSearch}>
                  ×
                </button>
              )}
            </div>
            
            <div className="sort-controls">
              <MdFilterList className="sort-icon" />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as "date" | "title" | "readTime")}
                className="sort-select"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="filter-controls">
            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {selectedTags.length > 0 && (
            <div className="selected-tags">
              <span className="selected-tags-label">Seçili Tag'ler:</span>
              {selectedTags.map(tag => (
                <button
                  key={tag}
                  className="selected-tag"
                  onClick={() => toggleTag(tag)}
                >
                  {tag} ×
                </button>
              ))}
              <button className="clear-tags" onClick={() => setSelectedTags([])}>
                Tümünü Temizle
              </button>
            </div>
          )}
          
          <div className="tag-filters">
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`tag-filter ${selectedTags.includes(tag) ? 'active' : ''}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          
          {(searchQuery || selectedTags.length > 0 || selectedCategory !== "Tümü") && (
            <div className="filter-summary">
              <span>Aktif Filtreler:</span>
              {selectedCategory !== "Tümü" && (
                <span className="filter-badge">Kategori: {selectedCategory}</span>
              )}
              {searchQuery && (
                <span className="filter-badge">Arama: "{searchQuery}"</span>
              )}
              {selectedTags.length > 0 && (
                <span className="filter-badge">Tag'ler: {selectedTags.join(", ")}</span>
              )}
              <button className="reset-filters" onClick={resetFilters}>
                Filtreleri Sıfırla
              </button>
            </div>
          )}
        </div>
        
        <div className="blog-grid" ref={containerRef}>
          {filteredAndSortedPosts.map((post) => (
            <article 
              key={post.id} 
              className={`blog-post-card ${post.featured ? 'featured' : ''}`}
              onClick={() => openModal(post)}
            >
              {post.featured && (
                <div className="featured-badge">
                  <span>Öne Çıkan</span>
                </div>
              )}
              
              <div className="blog-post-image">
                <img src={post.image} alt={post.title} />
                <div className="blog-post-category">
                  {post.category}
                </div>
              </div>
              
              <div className="blog-post-content">
                <div className="blog-post-meta">
                  <span className="blog-post-author">{post.author}</span>
                  <span className="blog-post-date">{formatDate(post.publishDate)}</span>
                  <span className="blog-post-readtime">{post.readTime}</span>
                </div>
                
                <h3 className="blog-post-title">
                  {post.title}
                </h3>
                
                <p className="blog-post-excerpt">{post.excerpt}</p>
                
                <div className="blog-post-tags">
                  {post.tags.slice(0, 4).map((tag, index) => (
                    <span key={index} className="blog-post-tag">
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 4 && (
                    <span className="blog-post-tag more-tags">
                      +{post.tags.length - 4}
                    </span>
                  )}
                </div>
                
                <div className="blog-post-readmore">
                  Devamını Oku →
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {filteredAndSortedPosts.length === 0 && (
          <div className="blog-no-results">
            <h3>Arama sonucu bulunamadı</h3>
            <p>Farklı anahtar kelimeler deneyin veya filtreleri değiştirin.</p>
            <button className="reset-filters-btn" onClick={resetFilters}>
              Filtreleri Sıfırla
            </button>
          </div>
        )}
        
        {filteredAndSortedPosts.length > 0 && (
          <div className="blog-results-info">
            <p>
              {filteredAndSortedPosts.length} blog yazısı bulundu
              {searchQuery && ` "${searchQuery}" araması için`}
              {selectedCategory !== "Tümü" && ` "${selectedCategory}" kategorisinde`}
            </p>
          </div>
        )}
      </div>

      {/* Blog Post Modal */}
      {isModalOpen && selectedPost && (
        <div className="blog-modal-overlay" onClick={closeModal}>
          <div className="blog-modal" onClick={(e) => e.stopPropagation()}>
            <button className="blog-modal-close" onClick={closeModal}>
              <MdClose />
            </button>
            
            <div className="blog-modal-image">
              <img src={selectedPost.image} alt={selectedPost.title} />
              <div className="blog-modal-category">
                {selectedPost.category}
              </div>
              {selectedPost.featured && (
                <div className="modal-featured-badge">
                  <span>Öne Çıkan</span>
                </div>
              )}
            </div>
            
            <div className="blog-modal-content">
              <div className="blog-modal-header">
                <h2>{selectedPost.title}</h2>
                <div className="blog-modal-meta">
                  <span className="blog-modal-author">
                    <MdPerson />
                    {selectedPost.author}
                  </span>
                  <span className="blog-modal-date">
                    <MdCalendarToday />
                    {formatDate(selectedPost.publishDate)}
                  </span>
                  <span className="blog-modal-readtime">
                    <MdAccessTime />
                    {selectedPost.readTime}
                  </span>
                </div>
              </div>
              
              <div className="blog-modal-tags">
                <MdTag />
                {selectedPost.tags.map((tag, index) => (
                  <span key={index} className="blog-modal-tag">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="blog-modal-body">
                {selectedPost.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
