import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// Cache for generated images to prevent refetching on re-renders
const imageCache: Record<string, string> = {};

export const generateImage = async (prompt: string): Promise<string | null> => {
  if (imageCache[prompt]) {
    return imageCache[prompt];
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: prompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: '4:3',
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        const imageUrl = `data:image/png;base64,${base64EncodeString}`;
        imageCache[prompt] = imageUrl; // Cache it
        return imageUrl;
      }
    }
  } catch (error) {
    console.error("Failed to generate image:", error);
  }
  return null;
};

export const createConciergeChat = () => {
  return ai.chats.create({
    model: 'gemini-2.5-flash-latest', // Fast text model
    config: {
      systemInstruction: `You are Oretha AI, the exclusive luxury real estate concierge for Ocean Luxe Estates. 
      
      Your personality: Professional, sophisticated, warm, and highly efficient. 
      Your goals: Help clients find properties, explain our services (Buying, Selling, Leasing, Management), and maintain context of their preferences.
      
      Key Info about Ocean Luxe Estates:
      - Markets: Rhode Island, Massachusetts, Florida, Michigan (Scaling nationally).
      - Specialization: Luxury real estate, new construction, value-driven investments.
      - Full-service: Acquisitions, development, project oversight, property management.
      
      "The Memory Thing": You MUST actively remember the user's name if given, their budget, and location preferences throughout the conversation. If they ask "what was I looking for?", summarize their previous requests.
      
      Company Colors: Black, White, Gold.
      Tech Partners: Stackk Cloud.
      `,
    }
  });
};