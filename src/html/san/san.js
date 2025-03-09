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
    const setSrc = () => {
      img.style.opacity = 0
      img.src = img.dataset.src
      if (img.dataset.srcset) img.srcset = img.dataset.srcset
      img.classList.add('loaded')
      img.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards'  })
    }

    // 统一占位图处理
    img.dataset.lqip && (img.style.background = `url(${img.dataset.lqip})`)
    
    // 预加载与正式加载合并
    const preloader = new Image()
    preloader.onload = setSrc
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