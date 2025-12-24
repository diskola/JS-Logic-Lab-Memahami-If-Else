
import { GoogleGenAI } from "@google/genai";

export const getAIExplanation = async (scenario: string, value: any, result: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Saya sedang belajar JavaScript. 
    Skenario: ${scenario}
    Input user: ${value}
    Hasil logika: ${result}
    
    Tolong jelaskan secara singkat dan sederhana kenapa blok kode tersebut yang terpilih. 
    Gunakan bahasa yang ramah untuk pemula dan jelaskan konsep perbandingannya.
    Maksimal 3 kalimat dalam Bahasa Indonesia.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Maaf, penjelasan AI tidak tersedia saat ini.";
  }
};
