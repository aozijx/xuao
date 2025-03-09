// 双向绑定控制器
// san.js 优化版本
class NavigationSync {
  constructor() {
    this.navButtons = document.querySelectorAll('.nav-btn');
    this.sections = document.querySelectorAll('section');
    this.isProgrammaticScroll = false;
    this.scrollTimeout = null;
    this.init();
  }

  init() {
    // 阻止默认锚点跳转
    this.navButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.dataset.target;
        this.scrollToSection(targetId, true);
      });
    });

    // 优化滚动监听
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.isProgrammaticScroll) {
          const sectionId = entry.target.id;
          this.syncNavigation(sectionId);
        }
      });
    }, { 
      threshold: 0.25,
      rootMargin: '-50px 0px -50% 0px' 
    });

    this.sections.forEach(section => observer.observe(section));

    // 初始化状态
    this.handleInitialState();
    
    // 增强路由处理
    window.addEventListener('hashchange', () => {
      if (this.isProgrammaticScroll) return;
      const sectionId = window.location.hash.slice(1);
      this.scrollToSection(sectionId);
    });
  }

  scrollToSection(targetId, updateHistory = false) {
    const targetSection = document.getElementById(targetId);
    if (!targetSection) return;

    this.isProgrammaticScroll = true;
    clearTimeout(this.scrollTimeout);
    
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    if (updateHistory) {
      history.replaceState(null, '', `#${targetId}`);
    }

    this.syncNavigation(targetId);
    
    this.scrollTimeout = setTimeout(() => {
      this.isProgrammaticScroll = false;
    }, 800);
  }

  syncNavigation(activeId) {
    this.navButtons.forEach(btn => {
      const isActive = btn.dataset.target === activeId;
      btn.classList.toggle('active', isActive);
      
      // 确保URL同步
      if (isActive && window.location.hash.slice(1) !== activeId) {
        history.replaceState(null, '', `#${activeId}`);
      }
    });
  }

  handleInitialState() {
    const initialHash = window.location.hash.slice(1);
    const isValidHash = Array.from(this.sections).some(
      section => section.id === initialHash
    );

    if (isValidHash) {
      this.scrollToSection(initialHash);
    } else {
      this.syncNavigation('home');
      history.replaceState(null, '', '#home');
    }
  }
}

// 初始化实例
new NavigationSync();


// 简化后的懒加载核心类 (保留核心功能，移除冗余代码)
class LazyLoader {
  constructor() {
    this.observer = new IntersectionObserver(this.handleIntersect, {
      rootMargin: '200px 0px',
      threshold: 0.01
    })
    this.init()
  }

  // 初始化方法合并
  init() {
    this.observeImages() // 初始观察
    this.addDynamicContentHandler() // 动态内容处理
  }

  // 统一图片处理逻辑
  handleIntersect = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        this.loadImage(img)
        this.observer.unobserve(img)
      }
    })
  }

  // 简化图片加载流程
  loadImage(img) {
    if (!img.dataset.src) return;
    // 统一添加加载动画
    img.style.backgroundSize = '200% 200%';
    img.animate(
      [{ backgroundPosition: '100% 100%' }, { backgroundPosition: '0% 0%' }],
      { duration: 1500, iterations: Infinity }
    );

    const setSrc = () => {
      img.style.opacity = 0
      img.src = img.dataset.src
      if (img.dataset.srcset) img.srcset = img.dataset.srcset
      img.classList.add('loaded')
      img.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards'  })
      // 清理占位背景
      img.style.background = 'none';
    }

    // 统一占位图处理
    // 优先使用 LQIP（低质量图片占位）
    if (img.dataset.lqip) img.style.background = `url(${img.dataset.lqip}) center/cover no-repeat`;
    
    // 预加载与正式加载合并
    const preloader = new Image();
    preloader.onload = setSrc
    preloader.onerror = () => {
      console.warn("图片加载失败:", img.dataset.src);
      img.style.background = '#ff000020'; // 错误状态指示
    }
    preloader.src = img.dataset.src
  }

  // 自动监听现有及新增图片
  observeImages(container = document) {
    container.querySelectorAll('img[data-src]').forEach(img => {
      this.observer.observe(img)
    })
  }

  // 动态内容监听简化
  addDynamicContentHandler() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) this.observeImages(node)
        })
      })
    })
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
  }
}

// 初始化懒加载 (单例模式)
const lazyLoader = new LazyLoader()

// 动态内容加载函数简化版
async function loadContent(sectionId) {
  const res = await fetch(`/api/content/${sectionId}`)
  const container = document.getElementById(sectionId)
  container.innerHTML = await res.text()
}