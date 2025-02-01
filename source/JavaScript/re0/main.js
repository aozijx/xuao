// MD5在线链接
{/* <script src="https://cdn.bootcss.com/blueimp-md5/2.10.0/js/md5.min.js"></script> */}
let isF12Blocked = true; // 初始状态：禁用 F12
// 创建右上角按钮
const toggleButton = document.createElement("button");
toggleButton.textContent = "启用防护";
toggleButton.style.position = "fixed";
toggleButton.style.top = "10px";
toggleButton.style.right = "10px";
toggleButton.style.backgroundColor = "#28a745";
toggleButton.style.color = "white";
toggleButton.style.border = "none";
toggleButton.style.padding = "10px 20px";
toggleButton.style.borderRadius = "5px";
toggleButton.style.cursor = "pointer";
toggleButton.style.fontFamily = "Arial, sans-serif";
toggleButton.style.fontSize = "14px";
toggleButton.style.zIndex = "10000";
document.body.appendChild(toggleButton);
// 添加按钮点击事件
toggleButton.addEventListener("click", () => {
  isF12Blocked = !isF12Blocked; // 切换开关状态
  // 更新按钮的显示内容和样式
  if (isF12Blocked) {
    toggleButton.textContent = "启用防护";
    toggleButton.style.backgroundColor = "#28a745"; // 绿色
  } else {
    toggleButton.textContent = "禁用防护";
    toggleButton.style.backgroundColor = "#dc3545"; // 红色
  }
});
// 检测 F12 按键
document.addEventListener("keydown", function (event) {
  if (event.key === "F12") {
    if (isF12Blocked) {
      event.preventDefault(); // 禁用 F12 默认行为
      console.log("F12 被禁用");
      // 创建提示框逻辑
      const warningDiv = document.createElement("div");
      warningDiv.id = "f12-warning";
      warningDiv.textContent = "扒源码，被我逮到了吧!👻";

      warningDiv.style.position = "fixed";
      warningDiv.style.top = "20px";
      warningDiv.style.left = "-300px";
      warningDiv.style.backgroundColor = "#ff4444";
      warningDiv.style.color = "white";
      warningDiv.style.padding = "10px 20px";
      warningDiv.style.borderRadius = "5px";
      warningDiv.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
      warningDiv.style.fontFamily = "Arial, sans-serif";
      warningDiv.style.fontSize = "14px";
      warningDiv.style.zIndex = "9999";
      warningDiv.style.transition = "left 0.5s ease";

      document.body.appendChild(warningDiv);

      setTimeout(() => {
        warningDiv.style.left = "20px";
      }, 50);

      setTimeout(() => {
        warningDiv.style.left = "-300px";
        setTimeout(() => warningDiv.remove(), 500);
      }, 3000);
    } else {
      console.log("F12 防护已禁用");
    }
  }
});


//刷新不中断播放https://yeelz.com/post/564.html
ap = null
    Object.defineProperty(document.querySelector('meting-js'),"aplayer",{
        set: function(aplayer) {
            ap=aplayer
            ready();
        }
    });
    isRecover = false;
    function ready(){
        ap.on('canplay', function () {
            if(!isRecover){
                if(localStorage.getItem("musicIndex") != null){
                    musicIndex = localStorage.getItem("musicIndex");
                    musicTime = localStorage.getItem("musicTime");
                    if(ap.list.index != musicIndex){
                        ap.list.switch(musicIndex);
                    }else{
                        ap.seek(musicTime);
                        ap.play();
                        localStorage.clear();
                        isRecover = true;
                    }
                }else{
                    isRecover = true;
                }
            }
        });
    }
    window.onbeforeunload = function(event) {
        if(!ap.audio.paused){
            musicIndex = ap.list.index;
            musicTime = ap.audio.currentTime;
            localStorage.setItem("musicIndex",musicIndex);
            localStorage.setItem("musicTime",musicTime);
        }
    };


var now = new Date();
  function createtime() {
    now.setTime(now.getTime() + 1000);// 每秒更新
    var start = new Date("2025-01-07 00:00:00");// 设置开始时间,使用 ISO 格式
    var dis = Math.trunc(23400000000 + ((now - start) / 1000) * 17);// 计算距离，速度为17千米/秒
    var unit = (dis / 149600000).toFixed(6);// 计算天文单位
    var grt = new Date("2025-01-07 00:00:00");// 网站诞生的时间
    let currentTimeHtml = "";
    var days = Math.floor((now - grt) / (1000 * 60 * 60 * 24));// 计算天数
    var hours = Math.floor(((now - grt) / (1000 * 60 * 60)) % 24);// 计算小时数
    var minutes = Math.floor(((now - grt) / (1000 * 60)) % 60);// 计算分钟数
    var seconds = Math.floor((now - grt) / 1000 % 60);// 计算秒数
    (currentTimeHtml =
      hours < 18 && hours >= 9
        ? `<div style="font-size:13px;font-weight:bold">本站居然苟活了 ${days} 天 ${hours} 小时 ${minutes} 分 ${seconds} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> <br> 旅行者 1 号当前距离地球 ${dis} 千米，约为 ${unit} 个天文单位 🚀</div>`
        : `<div style="font-size:13px;font-weight:bold">本站居然苟活了 ${days} 天 ${hours} 小时 ${minutes} 分 ${seconds} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> <br> 旅行者 1 号当前距离地球 ${dis} 千米，约为 ${unit} 个天文单位 🚀</div>`),
      document.getElementById("workboard") &&
      (document.getElementById("workboard").innerHTML = currentTimeHtml);
  }
  setInterval(createtime, 1000);// 每秒更新一次


window.onscroll = function() {
  var navbar = document.querySelector('nav');
  var scrollY = window.scrollY;
  var windowHeight = window.innerHeight;
  var documentHeight = document.documentElement.scrollHeight;
  // 动态计算透明度，确保透明度在 0 和 x 之间
  var opacity = Math.min(0.9, Math.max(0, scrollY / windowHeight));
  // 防止在滚动到顶部时背景色依然是黑色
  if (scrollY === 0) {
    opacity = 0;  // 当滚动到顶部时透明度为 0
  }
  // 设置背景颜色的透明度
  navbar.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
};


// 缓存已加载的页面（使用LRU缓存策略）
const cache = new Map(); // 改用Map提高性能及维护键的顺序
const MAX_CACHE_SIZE = 20;
function maintainCache(url) {
  // 确保URL已缓存
  if (!cache.has(url)) return;
  // 删除并重新插入以更新为最近使用
  cache.delete(url);
  cache.set(url, cache.get(url)); // 重新插入到Map末尾
  // 维护缓存大小
  if (cache.size > MAX_CACHE_SIZE) {
    // Map的keys()是按插入顺序的迭代器，首个元素即最旧
    const oldestKey = cache.keys().next().value;
    cache.delete(oldestKey);
  }
}
// 鼠标悬停时预加载
document.querySelectorAll('[data-pjax]').forEach(link => {
  link.addEventListener('mouseenter', () => {
    fetch(link.href)
  }, { once: true })
})
// PJAX 配置
const config = {
  container: '#content',
  timeout: 5000
}
// 创建加载动画
function createLoader() {
  const loader = document.createElement('div')
  loader.className = 'loading-spinner'
  document.body.appendChild(loader)
  return loader
}
// PJAX 跳转逻辑
async function handlePjaxNavigation(event) {
  event.preventDefault()
  const link = event.currentTarget
  const url = link.href
  const targetContainer = document.querySelector(config.container)
  // 显示加载状态
  targetContainer.style.opacity = '0.5'
  const loader = createLoader()
  try {
    // 发起 PJAX 请求
    const response = await Promise.race([
      fetch(url),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), config.timeout))
    ])
    if (!response.ok) throw new Error('请求失败')
    // 解析 HTML
    const text = await response.text()
    const parser = new DOMParser()
    const newDoc = parser.parseFromString(text, 'text/html')
    const newContent = newDoc.querySelector(config.container).innerHTML
    // 更新内容
    targetContainer.innerHTML = newContent
    history.pushState({}, '', url)
    // 初始化新内容
    initPjaxLinks()
  } catch (error) {
    console.warn('PJAX 失败，执行普通跳转:', error)
    window.location.href = url
  } finally {
    // 隐藏加载状态
    targetContainer.style.opacity = '1'
    loader.remove()
  }
}
// 初始化 PJAX 链接
function initPjaxLinks() {
  document.querySelectorAll('[data-pjax]').forEach(link => {
    link.addEventListener('click', handlePjaxNavigation)
  })
}
// 浏览器后退/前进处理
window.addEventListener('popstate', () => {
  handlePjaxNavigation({ preventDefault: () => {} })
})
// 初始加载
initPjaxLinks()


// 预存滚动位置（适用于静态页面）
const scrollPositions = {};
document.querySelectorAll('[id]').forEach(el => {
  scrollPositions[el.id] = el.offsetTop;
});
// 监听锚点链接点击事件
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    // 仅处理以#开头的锚点链接
    if (href.startsWith('#')) {
      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);
      // 确认目标元素存在
      if (targetElement) {
        e.preventDefault(); // 阻止默认跳转
        // 使用 scrollIntoView 实现平滑滚动
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
    // 其他链接（非#开头）保持默认行为
  });
});
// 添加防抖避免快速点击
let isScrolling = false;
function handleScroll() {
  if (isScrolling) return;
  isScrolling = true;
  // ... 滚动逻辑
  setTimeout(() => { isScrolling = false; }, 500);
}


document.addEventListener('DOMContentLoaded', function() {
  // 获取所有导航项
  const navItems = document.querySelectorAll('.nav-item');
  // 为每个导航项添加事件监听
  navItems.forEach(item => {
    const subnav = item.querySelector('.subnav');
    // 鼠标悬停时展开
    item.addEventListener('mouseenter', () => {
      closeAllSubnavs();
      if (subnav) subnav.classList.add('active');
    });
    // 鼠标离开时收起
    item.addEventListener('mouseleave', () => {
      if (subnav) subnav.classList.remove('active');
    });
    // 点击移动设备友好
    item.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        subnav.classList.toggle('active');
      }
    });
  });
  // 关闭所有下拉菜单
  function closeAllSubnavs() {
    document.querySelectorAll('.subnav').forEach(sub => {
      sub.classList.remove('active');
    });
  }
  // 点击页面其他区域关闭菜单
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item')) {
      closeAllSubnavs();
    }
  });
  // 窗口调整时关闭菜单
  window.addEventListener('resize', closeAllSubnavs);
});


// 推荐方案：监听动画结束事件
document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash-screen');
  if (splash) {
    // 监听动画结束事件
    const handleAnimationEnd = () => {
      splash.style.display = 'none';  // 先隐藏
      splash.remove();                // 彻底移除元素
      splash.removeEventListener('animationend', handleAnimationEnd);
    };
    // 添加动画结束监听
    splash.addEventListener('animationend', handleAnimationEnd);
    // 安全兜底：8秒后强制移除(适配低性能设备)
    setTimeout(() => {
      if (splash.parentElement) {
        splash.remove();
      }
    }, 8000);
  }
});
