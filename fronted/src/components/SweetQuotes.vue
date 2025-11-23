<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

const currentQuote = ref<string>("你長得像我一個親戚，像我媽的兒媳婦");
const isAnimating = ref(false);
const copied = ref(false);

const getRandomQuote = async () => {
  if (isAnimating.value) return;

  isAnimating.value = true;
  copied.value = false;

  try {
    const response = await axios.get(
      "https://my-app.oliverluo0723.workers.dev/api/sweet"
    );
    currentQuote.value = response.data.quote || response.data; // Handle potential object or string response
  } catch (e) {
   alert("請求次數過快，請稍後重試");
    // Fallback if API fails
    currentQuote.value = "每30秒只能取20句，但你依然很可愛。";
  }
  isAnimating.value = false;
};

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(currentQuote.value);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    alert("操作失敗，請稍後重試");
  }
};

onMounted(() => {
  getRandomQuote();
});
</script>

<template>
  <div class="sweet-container">
    <div class="glass-card">
      <div class="icon">土味情話產生器</div>
      <div class="quote-content">
        <p class="quote-text" :class="{ 'fade-out': isAnimating }">
          {{ currentQuote }}
        </p>
      </div>
      <div class="button-group">
        <button
          class="sweet-btn secondary"
          @click="copyToClipboard"
          :class="{ copied: copied }"
        >
          <span>{{ copied ? "已複製" : "複製" }}</span>
        </button>
        <button class="sweet-btn" @click="getRandomQuote">
          <span>再来一句</span>
        </button>
      </div>
    </div>
    <div>
      <p>本網站使用<a href="https://hono.dev/" target="_blank">hono</a>建立</p>
    </div>
  </div>
</template>

<style scoped>
.sweet-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.glass-card {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 40px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-5px);
}

.icon {
  font-size: 48px;
  margin-bottom: 20px;
  color: #4a4a4a;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  animation: float 3s ease-in-out infinite;
}

.quote-content {
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  width: 100%;
}

.quote-text {
  font-size: 1.5rem;
  color: #4a4a4a;
  font-weight: 500;
  line-height: 1.6;
  margin: 0;
  opacity: 1;
  transition: opacity 0.3s ease, transform 0.3s ease;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.quote-text.fade-out {
  opacity: 0;
  transform: translateY(10px);
}

.button-group {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.sweet-btn {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%);
  border: none;
  border-radius: 50px;
  padding: 12px 36px;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 154, 158, 0.4);
  outline: none;
  position: relative;
  overflow: hidden;
  min-width: 120px;
}

.sweet-btn.secondary {
  background: rgba(255, 255, 255, 0.5);
  color: #ff6b6b;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.sweet-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.8);
  color: #ff4757;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.sweet-btn.copied {
  background: #4cd137;
  color: white;
  box-shadow: 0 4px 15px rgba(76, 209, 55, 0.4);
}

.sweet-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 154, 158, 0.6);
}

.sweet-btn:active {
  transform: translateY(1px);
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

@media (max-width: 480px) {
  .glass-card {
    padding: 30px 20px;
  }

  .quote-text {
    font-size: 1.25rem;
  }
}
</style>
