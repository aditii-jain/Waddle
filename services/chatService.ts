import axios from 'axios';
import { OPENAI_API_KEY } from '@env';

const SYSTEM_PROMPT = `You are a friendly and knowledgeable penguin assistant named Waddle. 
You specialize in giving eco-friendly advice and suggestions to help people reduce their carbon footprint. 
Your responses should be:
1. Friendly and encouraging
2. Concise (keep responses under 3-4 sentences)
3. Practical and actionable
4. Focused on environmental sustainability
Always maintain a positive, supportive tone, and sign off with a penguin-related emoji 🐧`;

export async function getChatResponse(userMessage: string): Promise<string> {
  const endpoint = 'https://api.openai.com/v1/chat/completions';

  if (!OPENAI_API_KEY) {
    console.error('OpenAI API key is not set in environment variables');
    return "I'm having configuration issues. Please check the API key setup! 🐧";
  }

  try {
    console.log('Sending message to ChatGPT:', userMessage);
    
    const response = await axios.post(
      endpoint,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 150
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    console.log('Received response from ChatGPT:', reply);
    return reply;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
    } else {
      console.error('Error calling ChatGPT:', error);
    }
    return "I'm having trouble connecting right now. Please try again later! 🐧";
  }
}

export async function getEcoSuggestion(activity: string): Promise<string> {
  return getChatResponse(`Give me one specific, actionable eco-friendly alternative for: ${activity}`);
} 