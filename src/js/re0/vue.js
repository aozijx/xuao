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
