// 双向绑定控制器
class NavigationSync {
    constructor() {
        this.navButtons = document.querySelectorAll('.nav-btn')
        this.sections = document.querySelectorAll('.content-section')
        this.init()
    }

    init() {
        // 正向控制：点击导航跳转
        this.navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = document.getElementById(btn.dataset.target)
                target.scrollIntoView({ behavior: 'smooth' })
            })
        })

        // 反向同步：滚动监测
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.updateNavStatus(entry.target.id)
                }
            })
        }, { threshold: 0.5 })

        this.sections.forEach(section => observer.observe(section))
    }

    updateNavStatus(activeId) {
        this.navButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.target === activeId)
        })
    }
}
// 初始化实例
new NavigationSync()


// 监听路由变化
window.addEventListener('hashchange', () => {
    const sectionId = location.hash.slice(1)
    updateNavStatus(sectionId)
})

// 滚动时更新URL
const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        history.replaceState(null, '', `#${entry.target.id}`)
        }
    })
}


// 修改现有滚动处理
let scrollTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    checkVisibleSections();
  }, 100);
});


class ImageOptimizer {
    constructor() {
      this.imageObserver = null;
      this.initImageObserver();
      this.initPreloadHints();
    }
  
    // 初始化图片懒加载观察器
    initImageObserver() {
      this.imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            this.loadImage(img);
            observer.unobserve(img); // 加载后停止观察
          }
        });
      }, {
        rootMargin: '200px 0px', // 提前200px加载
        threshold: 0.01
      });
  
      // 初始页面图片观察
      document.querySelectorAll('img[data-src]').forEach(img => {
        this.imageObserver.observe(img);
      });
    }
  
    // 动态加载图片
    loadImage(img) {
      const src = img.dataset.src;
      const srcset = img.dataset.srcset;
      
      // 显示低质量占位图
      if (img.dataset.lqip) {
        img.style.background = `url(${img.dataset.lqip}) center/cover`;
      }
  
      // 创建临时图片对象预加载
      const tempImg = new Image();
      tempImg.src = src;
      if (srcset) tempImg.srcset = srcset;
      
      tempImg.onload = () => {
        // 移除占位背景
        img.style.background = '';
        
        // 使用渐显动画
        img.style.opacity = 0;
        img.src = src;
        if (srcset) img.srcset = srcset;
        img.classList.add('loaded');
        img.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 300,
          easing: 'ease-in-out'
        });
      };
    }
  
    // 添加预加载提示
    initPreloadHints() {
      const preloadLinks = [];
      
      // 预加载首屏图片
      document.querySelectorAll('.above-fold img[data-src]').forEach(img => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img.dataset.src;
        preloadLinks.push(link);
      });
  
      // 使用requestIdleCallback添加预加载
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          preloadLinks.forEach(link => document.head.appendChild(link));
        }, { timeout: 2000 });
      }
    }
  
    // 动态内容加载后更新观察器
    observeNewImages(container) {
      container.querySelectorAll('img[data-src]').forEach(img => {
        this.imageObserver.observe(img);
      });
    }
  }
  
  // 初始化优化器
  const imageOptimizer = new ImageOptimizer();
  
  // 修改现有内容加载函数
  function loadContent(sectionId) {
    fetch(`/api/content/${sectionId}`)
      .then(res => res.text())
      .then(html => {
        const container = document.getElementById(sectionId);
        container.innerHTML = html;
        
        // 优化新加载内容中的图片
        imageOptimizer.observeNewImages(container);
        
        // 更新导航状态
        observer.observe(container);
      });
  }