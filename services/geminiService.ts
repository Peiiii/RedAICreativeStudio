
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { GeneratedContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a full Xiaohongshu post content (title, caption, tags) and an accompanying image.
 */
export const generateXhsContent = async (prompt: string, base64Image?: string): Promise<GeneratedContent> => {
  // 1. Generate Text (Title, Caption, Tags)
  const textPrompt = `
    基于以下输入： "${prompt}"，生成一个高互动率的小红书（Xiaohongshu/Red）帖子。
    响应必须完全使用中文，并包含：
    - 一个吸引人的标题（带表情符号，保持简短，点击诱饵风格）。
    - 详细的正文（亲切、分享导向，使用换行符和大量表情符号，语气要像真实的用户）。
    - 5个相关的热门话题标签。
  `;

  const textResponse = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: base64Image 
      ? { parts: [{ text: textPrompt }, { inlineData: { mimeType: 'image/jpeg', data: base64Image } }] }
      : textPrompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          caption: { type: Type.STRING },
          tags: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["title", "caption", "tags"]
      }
    }
  });

  const content = JSON.parse(textResponse.text || "{}") as GeneratedContent;

  // 2. Generate Image (Poster)
  const imagePrompt = `A high-quality, aesthetic Xiaohongshu style poster for: ${content.title}. 
    Style: Minimalist, bright lighting, soft shadows, vertical aspect ratio (3:4). 
    The poster should look like a professional lifestyle photograph or a clean product shot suitable for social media.
    Do not include any English text in the image unless it's a brand logo.`;

  const imageResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: imagePrompt }],
    },
    config: {
      imageConfig: {
        aspectRatio: "3:4"
      }
    }
  });

  let generatedImageUrl = "";
  for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      generatedImageUrl = `data:image/png;base64,${part.inlineData.data}`;
      break;
    }
  }

  return {
    ...content,
    imageUrl: generatedImageUrl
  };
};

/**
 * Generates a list of creative writing prompts for user inspiration.
 */
export const getInspirationPrompts = async (): Promise<string[]> => {
  const prompt = "生成5个简短、创意且热门的小红书内容点子或提示词（纯中文）。每个点子应该是一句描述场景或主题的话，例如：'极简风居家办公桌面改造' 或 '城市里的秘密屋顶咖啡馆探店'。";

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    }
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch (e) {
    return [
      "氛围感复古咖啡厅探店",
      "极简风居家办公桌面改造",
      "夏日清爽感穿搭分享",
      "沉浸式拆箱我的数码新宠",
      "我的周末OOTD与生活碎片"
    ];
  }
};
