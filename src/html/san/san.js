// 双向绑定控制器
class NavigationSync {
  constructor() {
    this.navButtons = document.querySelectorAll('.nav-btn');
    this.sections = document.querySelectorAll('section');
    this.isProgrammaticScroll = false;
    this.lastActiveId = null;
    this.init();
  }

  init() {
    // 点击事件处理（保持不变）
    this.navButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.dataset.target;
        this.scrollToSection(targetId, true);
      });
    });
    // 修改 init 方法中的事件监听
    const handleRouteChange = () => {
      if (this.isProgrammaticScroll) return;
      const sectionId = window.location.hash.slice(1);
      this.scrollToSection(sectionId);
    };
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);

    // 优化后的 Intersection Observer
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (this.isProgrammaticScroll) return;
          
          // 当元素顶部进入视口时触发
          const headerHeight = 100; // 根据实际页眉高度调整
          const bounding = entry.boundingClientRect;
          const isInView = bounding.top <= headerHeight && bounding.bottom >= headerHeight;

          if (isInView) {
            const candidates = Array.from(this.sections).filter(section => {
              const rect = section.getBoundingClientRect();
              return rect.top <= headerHeight && rect.bottom >= headerHeight;
            });

            // 找到最接近顶部的 section
            if (candidates.length > 0) {
              const closest = candidates.reduce((prev, curr) => 
                Math.abs(prev.getBoundingClientRect().top - headerHeight) < 
                Math.abs(curr.getBoundingClientRect().top - headerHeight) 
                  ? prev 
                  : curr
              );
              
              if (this.lastActiveId !== closest.id) {
                this.lastActiveId = closest.id;
                this.syncNavigation(closest.id);
              }
            }
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '-100px 0px -50% 0px'  // 根据页面布局调整
      }
    );

    this.sections.forEach(section => observer.observe(section));

    // 其他初始化逻辑（保持不变）
    this.handleInitialState();
    
    window.addEventListener('hashchange', () => {
      if (this.isProgrammaticScroll) return;
      const sectionId = window.location.hash.slice(1);
      this.scrollToSection(sectionId);
    });
  }

  // 滚动方法（保持不变）
  scrollToSection(targetId, updateHistory = false) {
    const targetSection = document.getElementById(targetId);
    if (!targetSection) return;

    this.isProgrammaticScroll = true;
    
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    if (updateHistory) {
      history.replaceState(null, '', `#${targetId}`);
    }

    this.syncNavigation(targetId);
    
    // 优化滚动完成检测
    const checkScrollStop = () => {
      if (this.isScrolling()) return;
      this.isProgrammaticScroll = false;
    };
    
    setTimeout(checkScrollStop, 100);
    setTimeout(checkScrollStop, 200);
  }

  isScrolling() {
    return !!this.scrollCheckTimer;
  }

  // 同步导航状态（优化样式切换）
  syncNavigation(activeId) {
    this.navButtons.forEach(btn => {
      const isActive = btn.dataset.target === activeId;
      btn.classList.toggle('active', isActive);
      
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


// 懒加载核心类
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

    // 优先使用 LQIP（低质量图片占位）
    if (img.dataset.lqip) img.style.background = `url(${img.dataset.lqip}) center/cover no-repeat`;
    
    // 预加载与正式加载合并
    const preloader = new Image();
    preloader.onload = () => {
      setSrc();
      saveScrollPosition(); // 修正作用域
    };
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
  const res = await fetch(`/api/content/${sectionId}`);
  const container = document.getElementById(sectionId);
  container.innerHTML = await res.text();

  const images = Array.from(container.querySelectorAll('img'));
  await Promise.all(images.map(img =>
    img.complete ? Promise.resolve()
    : new Promise(resolve => {
      img.onload = resolve;
      img.onerror = resolve; // 防止个别图片阻塞
    })
  ));
  // 内容加载后触发恢复滚动位置
  restoreScrollPosition(); // 确保此时布局稳定
}


// 保存滚动位置到localStorage
function saveScrollPosition() {
  const scrollKey = `pageScrollPosition:${window.location.href}`;
  const data = {
    y: window.scrollY,
    timestamp: Date.now(),
  };
  localStorage.setItem(scrollKey, JSON.stringify(data));
}

// 自动清理旧数据
function cleanOldScrollPositions() {
  const MAX_STORAGE_ITEMS = 50;
  const items = [];
  
  // 收集并解析所有滚动位置数据
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('pageScrollPosition:')) {
      try {
        const data = JSON.parse(localStorage.getItem(key));
        items.push({ key, timestamp: data.timestamp });
      } catch (e) {
        // 无效数据，直接删除
        localStorage.removeItem(key);
      }
    }
  });

  // 按时间戳排序，保留最新的50个
  items.sort((a, b) => b.timestamp - a.timestamp);
  if (items.length > MAX_STORAGE_ITEMS) {
    items.slice(MAX_STORAGE_ITEMS).forEach((item) => {
      localStorage.removeItem(item.key);
    });
  }
}

// 恢复滚动位置
function restoreScrollPosition() {
  // 存在 hash 时让浏览器默认处理
  if (window.location.hash) return;

  const scrollKey = `pageScrollPosition:${window.location.href}`;
  const savedData = localStorage.getItem(scrollKey);
  
  if (savedData) {
    try {
      const { y, timestamp } = JSON.parse(savedData);
      // 检查数据是否在24小时内
      if (Date.now() - timestamp < 86400000) {
        // 微任务延迟确保DOM更新
        Promise.resolve().then(() => {
          window.scrollTo(0, y);
        });
      }
    } catch (e) {
      console.error('Failed to restore scroll position:', e);
    }
  }
}

// 路由监听处理（保存当前位置并在新页面恢复）
(function enhanceHistoryAPI() {
  if (!window.history.pushState) return;

  const originalPushState = window.history.pushState;
  window.history.pushState = function () {
    // 保存当前页面的滚动位置
    saveScrollPosition();
    originalPushState.apply(this, arguments);
    // 清理旧数据
    cleanOldScrollPositions();
    // 新页面加载后会自动触发restore
  };

  const originalReplaceState = window.history.replaceState;
  window.history.replaceState = function () {
    saveScrollPosition();
    originalReplaceState.apply(this, arguments);
    cleanOldScrollPositions();
  };

  window.addEventListener('popstate', () => {
    // 返回时恢复目标页面的位置
    restoreScrollPosition();
  });
})();

// 内容加载检测
const observer = new MutationObserver((mutations) => {
  // 检查是否有新增内容节点
  const hasAddedNodes = mutations.some(m => m.addedNodes.length > 0);
  if (hasAddedNodes) {
    restoreScrollPosition();
  }
});
observer.observe(document, {
  childList: true,
  subtree: true,
});

// 事件监听优化
window.addEventListener('load', () => {
  restoreScrollPosition();
  
  // 防抖保存（300ms间隔）
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      // 仅在垂直滚动超过 50px 时保存
      if (Math.abs(window.scrollY - this.lastSavedY) > 50) {
        saveScrollPosition();
        this.lastSavedY = window.scrollY;
      }
    }, 0);
  });
});

// 处理页面关闭前保存
window.addEventListener('beforeunload', () => {
  saveScrollPosition();
});