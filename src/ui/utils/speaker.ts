import { message } from "antd";

export const speaker = (text: string) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.volume = 1.0;
    utterance.lang = "zh-CN"; // 设置语言（中文）
    utterance.rate = 1.0; // 语速（0.1~10）
    utterance.pitch = 1.0; // 音调（0~2）
    window.speechSynthesis.speak(utterance);
    message.success(text);
    return;
  }

  message.warning("您收到了一条语言提示，但您的浏览器不支持语音合成功能。");
  message.info(text);
};

export const initSpeaker = () => {
  console.log("已完成初始化");
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = "";
    utterance.volume = 0;
    utterance.lang = "zh-CN";
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }

  document.body.removeEventListener("click", initSpeaker);
};
