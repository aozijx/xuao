## 背景视频

```CSS
.background-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
}
```

```html
<video autoplay loop class="background-video">
    <source src="https://dwxcx.fp.ps.netease.com/file/66d91cf8120d8a0358bc8cf0SFQzdATS05" type="video/mp4">
</video>
```

## IP查询

```html
<button id="query-ip">查询 IP 地址</button>
<p id="ip-box">等待查询...</p>
<p id="location">正在获取地理位置信息...</p>
```

```JavaScript
const button = document.getElementById('query-ip');
const ipBox = document.getElementById('ip-box');
// 添加点击事件
button.addEventListener('click', function () {
    ipBox.textContent = '查询中...'; // 显示加载提示
    // 发起 IP 查询请求
    fetch('https://api64.ipify.org?format=json') // 这里可以更换其他 API
        .then(response => response.json())
        .then(data => {
            // 显示 IP 地址
            ipBox.textContent = `您的 IP 地址是: ${data.ip}`;
        })
        .catch(error => {
            // 处理错误
            ipBox.textContent = '查询失败，请稍后再试。';
            console.error('查询失败:', error);
    });
});
```
```JavaScript
// 使用 ip-api.com 的免费 API 获取地理位置
fetch('http://ip-api.com/json/?lang=zh-CN')
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            // 提取城市、省份、国家信息
            const location = `${data.country} ${data.regionName} ${data.city}`;
            // 在网页上显示地理位置信息
            document.getElementById("location").innerText = `您所在的位置：${location}`;
        } else {
            document.getElementById("location").innerText = "无法获取地理位置信息。";
        }
    })
    .catch(error => {
        console.error("Error fetching IP location:", error);
        document.getElementById("location").innerText = "获取地理位置信息时出错。";
    });
```