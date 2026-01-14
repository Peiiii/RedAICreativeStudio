
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { GeneratedContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a full Xiaohongshu post content (title, caption, tags) and an accompanying image.
 */
export const generateXhsContent = async (prompt: string, base64Image?: string): Promise<GeneratedContent> => {
  // 1. Generate Text (Title, Caption, Tags)
  const textPrompt = `
    Based on this input: "${prompt}", generate a high-engagement Xiaohongshu (Red) post.
    The response must include:
    - A catchy, clickbait title (use emojis, keep it short).
    - A detailed caption (friendly, sharing-oriented, use line breaks and emojis).
    - A list of 5 relevant trending hashtags.
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
    If context suggests a product, show the product in an lifestyle setting.`;

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
  const prompt = "Generate 5 short, creative, and trending Xiaohongshu content ideas or prompts (in Chinese). Each should be a single sentence describing a scene or a topic like 'A minimalist home office setup' or 'A secret rooftop cafe in the city'.";

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
