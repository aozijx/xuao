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
  button.title = newTheme === 'dark' ? '切换到浅色模式' : '切换到深色模式'; // 更新 title
  updateNavbarBackground();
}
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
  darkModeButton.title = savedTheme === 'dark' ? '切换到浅色模式' : '切换到深色模式';
}

// DOM加载完成后初始化
document.addEventListener("DOMContentLoaded", () => {
  const darkModeButton = document.getElementById("dark");
  darkModeButton.addEventListener("click", toggleDarkMode);
  initTheme();
});

function updateNavbarBackground() {
  const navbar = document.querySelector(".navbar");
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;

  let opacity = Math.min(1, Math.max(0, scrollY / windowHeight));
  if (scrollY === 0) opacity = 0; // 滚动到顶部时透明度为 0
  // 检查暗色主题
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  // 选择不同的背景颜色
  const bgColor = isDark ? `rgba(26, 26, 26, ${opacity})` : `rgba(255, 255, 255, ${opacity})`;
  navbar.style.backgroundColor = bgColor;
  navbar.style.transition = "background-color 2s ease-in-out"
}
// 页面加载时立即执行
document.addEventListener("DOMContentLoaded", updateNavbarBackground);
// 滚动时动态更新
window.onscroll = updateNavbarBackground;

let isF12Blocked = true; // 初始状态：禁用 F12
// 创建右上角按钮
const F12Button = document.createElement("button");
F12Button.id = "f12-toggle"; // 添加 ID
F12Button.textContent = "启用防护";
F12Button.style.position = "fixed";
F12Button.style.top = "6px";
F12Button.style.right = "5px";
F12Button.style.backgroundColor = "#28a745";
F12Button.style.color = "white";
F12Button.style.border = "none";
F12Button.style.padding = "10px 20px";
F12Button.style.borderRadius = "5px";
F12Button.style.cursor = "pointer";
F12Button.style.fontFamily = "Arial, sans-serif";
F12Button.style.fontSize = "12px";
F12Button.style.zIndex = "6666";
document.body.appendChild(F12Button);
// 添加按钮点击事件
F12Button.addEventListener("click", () => {
  isF12Blocked = !isF12Blocked; // 切换开关状态
  // 更新按钮的显示内容和样式
  if (isF12Blocked) {
    F12Button.textContent = "启用防护";
    F12Button.style.backgroundColor = "#28a745"; // 绿色
  } else {
    F12Button.textContent = "禁用防护";
    F12Button.style.backgroundColor = "#dc3545"; // 红色
  }
});
// 检测 F12 按键
document.addEventListener("keydown", function (e) {
  if (e.key === "F12") {
    if (isF12Blocked) {
      e.preventDefault(); // 禁用 F12 默认行为
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

// 保存滚动位置到localStorage
function saveScrollPosition() {
  // 使用当前页面URL作为键名的一部分，确保不同页面独立保存
  const scrollKey = `pageScrollPosition:${window.location.href}`;
  const yPosition = window.scrollY;
  localStorage.setItem(scrollKey, yPosition);
}

// 恢复滚动位置
function restoreScrollPosition() {
  const scrollKey = `pageScrollPosition:${window.location.href}`;
  const savedPosition = localStorage.getItem(scrollKey);

  if (savedPosition !== null) {
      // 添加微任务延迟确保滚动执行在页面加载完成后
      Promise.resolve().then(() => {
          window.scrollTo(0, parseInt(savedPosition));
      });
  }
}

// 添加事件监听
window.addEventListener('load', function() {
  // 先尝试恢复滚动位置
  restoreScrollPosition();
  
  // 设置防抖函数减少频繁存储
  let isScrolling;
  window.addEventListener('scroll', function() {
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(saveScrollPosition, 100);
  });
});
// 可选：离开页面时保存（处理快速关闭的情况）
window.addEventListener('beforeunload', saveScrollPosition);


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

// 创建一个 Vue 应用实例
const app = Vue.createApp({
  methods: {
    // 定义 pop 方法
    pop() {
      alert("123");
    }
  }
});
// 挂载 Vue 应用到 id 为 app 的元素上
app.mount('#app');
