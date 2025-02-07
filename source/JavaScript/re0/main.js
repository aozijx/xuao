// MD5在线链接
/* <script src="https://cdn.bootcss.com/blueimp-md5/2.10.0/js/md5.min.js"></script> */
// 切换主题函数
function toggleDarkMode(event) {
  const button = event.currentTarget;
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  button.textContent = newTheme === "dark" ? "Light" : "Dark";
  // **切换主题后，立即更新 navbar 颜色**
  updateNavbarBackground();
  // 强制触发重绘（如果过渡无效）
  document.body.offsetHeight;
}
function updateNavbarBackground() {
  var navbar = document.querySelector(".navbar");
  var scrollY = window.scrollY;
  var windowHeight = window.innerHeight;
  var opacity = Math.min(0.9, Math.max(0, scrollY / windowHeight));

  if (scrollY === 0) {
    opacity = 0; // 滚动到顶部时透明度为 0
  }
  // 获取当前主题
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  // 选择不同的背景颜色
  const bgColor = isDark
    ? `rgba(26, 26, 26, ${opacity})`
    : `rgba(255, 255, 255, ${opacity})`;
  // 立即更新 navbar 背景色
  navbar.style.backgroundColor = bgColor;
}
// **页面加载时立即执行**
document.addEventListener("DOMContentLoaded", updateNavbarBackground);
// **滚动时动态更新**
window.onscroll = updateNavbarBackground;
// 初始化主题（页面加载时检查）
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const darkModeButton = document.getElementById("dark");
  // 确定要应用的主题
  const theme = savedTheme || (systemPrefersDark ? "dark" : "light");
  // 应用主题并设置按钮文字
  document.documentElement.setAttribute("data-theme", theme);
  darkModeButton.textContent = theme === "dark" ? "Light" : "Dark";
}
// DOM加载完成后初始化
document.addEventListener("DOMContentLoaded", () => {
  const darkModeButton = document.getElementById("dark");
  darkModeButton.addEventListener("click", toggleDarkMode);
  initTheme();
});

let isF12Blocked = true; // 初始状态：禁用 F12
// 创建右上角按钮
const toggleButton = document.createElement("button");
toggleButton.id = "f12-toggle"; // 添加 ID
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
toggleButton.style.zIndex = "6666";
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
      warningDiv.textContent = "被我逮到了吧!👻";

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
ap = null;
Object.defineProperty(document.querySelector("meting-js"), "aplayer", {
  set: function (aplayer) {
    ap = aplayer;
    ready();
  },
});
isRecover = false;
function ready() {
  ap.on("canplay", function () {
    if (!isRecover) {
      if (localStorage.getItem("musicIndex") != null) {
        musicIndex = localStorage.getItem("musicIndex");
        musicTime = localStorage.getItem("musicTime");
        if (ap.list.index != musicIndex) {
          ap.list.switch(musicIndex);
        } else {
          ap.seek(musicTime);
          ap.play();
          localStorage.clear();
          isRecover = true;
        }
      } else {
        isRecover = true;
      }
    }
  });
}
window.onbeforeunload = function (event) {
  if (!ap.audio.paused) {
    musicIndex = ap.list.index;
    musicTime = ap.audio.currentTime;
    localStorage.setItem("musicIndex", musicIndex);
    localStorage.setItem("musicTime", musicTime);
  }
};

var now = new Date();
function createtime() {
  now.setTime(now.getTime() + 1000); // 每秒更新
  var start = new Date("2025-01-07 00:00:00"); // 设置开始时间,使用 ISO 格式
  var dis = Math.trunc(23400000000 + ((now - start) / 1000) * 17); // 计算距离，速度为17千米/秒
  var unit = (dis / 149600000).toFixed(6); // 计算天文单位
  var grt = new Date("2025-01-07 00:13:00"); // 网站诞生的时间
  let currentTimeHtml = "";
  var days = Math.floor((now - grt) / (1000 * 60 * 60 * 24)); // 计算天数
  var hours = Math.floor(((now - grt) / (1000 * 60 * 60)) % 24); // 计算小时数
  var minutes = Math.floor(((now - grt) / (1000 * 60)) % 60); // 计算分钟数
  var seconds = Math.floor(((now - grt) / 1000) % 60); // 计算秒数
  (currentTimeHtml =
    hours < 18 && hours >= 9
      ? `<div style="font-size:13px;font-weight:bold">本站居然苟活了 ${days} 天 ${hours} 小时 ${minutes} 分 ${seconds} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> <br> 旅行者 1 号当前距离地球 ${dis} 千米，约为 ${unit} 个天文单位 🚀</div>`
      : `<div style="font-size:13px;font-weight:bold">本站居然苟活了 ${days} 天 ${hours} 小时 ${minutes} 分 ${seconds} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> <br> 旅行者 1 号当前距离地球 ${dis} 千米，约为 ${unit} 个天文单位 🚀</div>`),
    document.getElementById("workboard") &&
    (document.getElementById("workboard").innerHTML = currentTimeHtml);
}
setInterval(createtime, 1000); // 每秒更新一次

window.onscroll = function () {
  var navbar = document.querySelector("nav");
  var scrollY = window.scrollY;
  var windowHeight = window.innerHeight;
  var documentHeight = document.documentElement.scrollHeight;
  // 动态计算透明度，确保透明度在 0 和 x 之间
  var opacity = Math.min(0.9, Math.max(0, scrollY / windowHeight));
  // 防止在滚动到顶部时背景色依然是黑色
  if (scrollY === 0) {
    opacity = 0; // 当滚动到顶部时透明度为 0
  }
  // 判断当前主题
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  // 根据主题选择颜色,设置背景颜色的透明度
  const bgColor = isDark
    ? `rgba(26, 26, 26, ${opacity})`
    : `rgba(255, 255, 255, ${opacity})`;
  // 直接设置背景色
  navbar.style.backgroundColor = bgColor;
  // navbar.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
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

// fetch 超时封装（使用 AbortController）
async function fetchWithTimeout(url, timeout = config.timeout) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error("网络请求失败");
    return await res.text();
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

// // PJAX 跳转逻辑
async function pjaxNavigate(link) {
  const url = link.href;
  const container = document.querySelector(config.container);
  container.style.opacity = "0.5";
  const loader = document.createElement("div");
  loader.className = "loading-spinner";
  document.body.appendChild(loader);

  try {
    let html = cache.get(url) || (await fetchWithTimeout(url));
    if (!cache.has(url)) updateCache(url, html);

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const newContent = doc.querySelector(config.container);
    if (newContent) {
      container.innerHTML = newContent.innerHTML;
      history.pushState({ html, url }, "", url);
    }
  } catch (e) {
    console.warn("PJAX 跳转失败:", e);
    window.location.href = url;
  } finally {
    container.style.opacity = "1";
    loader.remove();
  }
}

// 点击事件：事件委托处理所有 [data-pjax] 链接
document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-pjax]");
  if (link) {
    e.preventDefault();
    pjaxNavigate(link);
  }
});

// 鼠标悬停预加载（确保每个链接只预加载一次）
document.addEventListener("mouseover", (e) => {
  const link = e.target.closest("[data-pjax]");
  if (link && !link.dataset.prefetched) {
    link.dataset.prefetched = "true";
    fetchWithTimeout(link.href)
      .then((html) => updateCache(link.href, html))
      .catch(console.warn);
  }
});

// 处理浏览器前进/后退
window.addEventListener("popstate", (e) => {
  if (e.state && e.state.html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(e.state.html, "text/html");
    const container = document.querySelector(config.container);
    const newContent = doc.querySelector(config.container);
    if (newContent) {
      container.innerHTML = newContent.innerHTML;
    } else {
      window.location.reload();
    }
  } else {
    window.location.reload();
  }
});

// 预存滚动位置（适用于静态页面）
const scrollPositions = {};
document.querySelectorAll("[id]").forEach((el) => {
  scrollPositions[el.id] = el.offsetTop;
});
// 监听锚点链接点击事件
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    // 仅处理以#开头的锚点链接
    if (href.startsWith("#")) {
      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);
      // 确认目标元素存在
      if (targetElement) {
        e.preventDefault(); // 阻止默认跳转
        // 使用 scrollIntoView 实现平滑滚动
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
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
  setTimeout(() => {
    isScrolling = false;
  }, 500);
}

document.addEventListener("DOMContentLoaded", function () {
  // 获取所有导航项
  const navItems = document.querySelectorAll(".nav-item");
  // 为每个导航项添加事件监听
  navItems.forEach((item) => {
    const subnav = item.querySelector(".subnav");
    // 鼠标悬停时展开
    item.addEventListener("mouseenter", () => {
      closeAllSubnavs();
      if (subnav) subnav.classList.add("active");
    });
    // 鼠标离开时收起
    item.addEventListener("mouseleave", () => {
      if (subnav) subnav.classList.remove("active");
    });
    // 点击移动设备友好
    item.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        subnav.classList.toggle("active");
      }
    });
  });
  // 关闭所有下拉菜单
  function closeAllSubnavs() {
    document.querySelectorAll(".subnav").forEach((sub) => {
      sub.classList.remove("active");
    });
  }
  // 点击页面其他区域关闭菜单
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-item")) {
      closeAllSubnavs();
    }
  });
  // 窗口调整时关闭菜单
  window.addEventListener("resize", closeAllSubnavs);
});
// 推荐方案：监听动画结束事件
document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash-screen");
  if (splash) {
    // 监听动画结束事件
    const handleAnimationEnd = () => {
      splash.style.display = "none"; // 先隐藏
      splash.remove(); // 彻底移除元素
      splash.removeEventListener("animationend", handleAnimationEnd);
    };
    // 添加动画结束监听
    splash.addEventListener("animationend", handleAnimationEnd);
    // 安全兜底：8秒后强制移除(适配低性能设备)
    setTimeout(() => {
      if (splash.parentElement) {
        splash.remove();
      }
    }, 8000);
  }
});

const menu = document.getElementById('menu');
    /**
     * 根据鼠标点击的位置判断右侧和下方空间是否足够，
     * 若不足则将菜单定位到鼠标点击点的左侧或上方，
     * 保证菜单不会超出点击点右侧和下方的区域。
     *
     * @param {MouseEvent} e 右键事件对象
     */
    function showMenu(e) {
      e.preventDefault();  // 阻止浏览器默认右键菜单
      // 先显示菜单（不加动画类）以便获取菜单的尺寸
      menu.style.display = 'block';
      menu.classList.remove('show');
      // 获取菜单尺寸
      const menuWidth = menu.offsetWidth;
      const menuHeight = menu.offsetHeight;
      /*  
          使用 e.clientX 与 e.clientY 获取鼠标在视口内的位置，
          便于计算点击点右侧与下方的剩余空间。
          使用 e.pageX 与 e.pageY 设置菜单绝对定位时会自动考虑滚动条偏移
      */
      const clientX = e.clientX;
      const clientY = e.clientY;
      let posX = e.pageX;
      let posY = e.pageY;
      // 判断鼠标右侧的可用空间是否足够放置菜单
      if (window.innerWidth - clientX < menuWidth) {
        // 如果不足，则将菜单放置到鼠标点击点的左侧
        posX = e.pageX - menuWidth;
      }
      // 判断鼠标下方的可用空间是否足够放置菜单
      if (window.innerHeight - clientY < menuHeight) {
        // 如果不足，则将菜单放置到鼠标点击点的上方
        posY = e.pageY - menuHeight;
      }
      // 设置菜单的最终位置
      menu.style.left = posX + 'px';
      menu.style.top = posY + 'px';
      // 使用 setTimeout 使动画类在渲染后生效，达到淡入效果
      setTimeout(() => {
        menu.classList.add('show');
      }, 0);
    }
    // 隐藏菜单函数
    function hideMenu() {
      menu.classList.remove('show');
      setTimeout(() => {
        menu.style.display = 'none';
      }, 200);  // 等待动画结束后隐藏
    }
    // 右键点击时显示自定义菜单
    document.addEventListener('contextmenu', showMenu);
    // 点击页面其他地方时隐藏菜单
    document.addEventListener('click', function(e) {
      if (!menu.contains(e.target)) {
        hideMenu();
      }
    });
    // 窗口大小改变时隐藏菜单
    window.addEventListener('resize', hideMenu);
