import axios from "axios";
let controller
let apiKey=import.meta.env.VITE_API_KEY
let context=import.meta.env.VITE_CONTEXT
export async function generateContent(prompt) {
    if (controller) {
        controller.abort(); 
      }
    
      controller = new AbortController(); 
     console.log(context);
      try {
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            contents: [
              {
                parts: [{ text: context+prompt }],
              },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            signal: controller.signal, 
          }
        );
    
        return response.data;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.warn('Request cancelled');
        } else {
          console.error('Error generating content:', error);
        }
        return null;
      }
}
