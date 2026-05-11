import axios from 'axios';

/**
 * AI Provider Service
 * Modular service layer for AI API integration
 * Supports multiple providers: OpenAI, Grok, and compatible APIs
 */

const AI_PROVIDER = () => process.env.AI_PROVIDER || 'openai';
const OPENAI_API_KEY = () => process.env.OPENAI_API_KEY;
const OPENAI_API_URL = () => process.env.OPENAI_API_URL || 'https://api.openai.com/v1';
const OPENAI_MODEL = () => process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
const GROK_API_KEY = () => process.env.GROK_API_KEY;
const GROK_API_URL = () => process.env.GROK_API_URL || 'https://api.x.ai/v1';
const GEMINI_API_KEY = () => process.env.GEMINI_API_KEY;
const GEMINI_MODEL = () => process.env.GEMINI_MODEL || 'gemini-2.0-flash-lite';
const GROQ_API_KEY = () => process.env.GROQ_API_KEY;
const GROQ_MODEL = () => process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

/**
 * OpenAI Provider
 */
const openaiProvider = {
  name: 'openai',
  isConfigured: () => !!OPENAI_API_KEY(),
  generateResponse: async (message) => {
    const apiKey = OPENAI_API_KEY();
    if (!apiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    try {
      const response = await axios.post(
        `${OPENAI_API_URL()}/chat/completions`,
        {
          model: OPENAI_MODEL(),
          messages: [
            {
              role: 'system',
              content:
                'You are a helpful, friendly AI assistant. Provide clear, concise, and informative responses.',
            },
            {
              role: 'user',
              content: message,
            },
          ],
          temperature: 0.7,
          max_tokens: 2000,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );

      if (
        !response.data ||
        !response.data.choices ||
        response.data.choices.length === 0
      ) {
        throw new Error('Invalid response from OpenAI API');
      }

      return response.data.choices[0].message.content.trim();
    } catch (error) {
      const detail = error.response?.data?.error?.message || error.message;
      console.error('OpenAI API Error:', detail);
      throw new Error(`OpenAI API Error: ${detail}`);
    }
  },
};

/**
 * Grok Provider (Ready for integration)
 */
const grokProvider = {
  name: 'grok',
  isConfigured: () => !!GROK_API_KEY(),
  generateResponse: async (message) => {
    const apiKey = GROK_API_KEY();
    if (!apiKey) {
      throw new Error('Grok API key is not configured');
    }

    try {
      const response = await axios.post(
        `${GROK_API_URL()}/chat/completions`,
        {
          model: 'grok-1',
          messages: [
            {
              role: 'system',
              content:
                'You are Grok, an AI assistant. Provide clear, concise, and informative responses.',
            },
            {
              role: 'user',
              content: message,
            },
          ],
          temperature: 0.7,
          max_tokens: 2000,
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );

      if (
        !response.data ||
        !response.data.choices ||
        response.data.choices.length === 0
      ) {
        throw new Error('Invalid response from Grok API');
      }

      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Grok API Error:', error.message);
      throw new Error(`Grok API Error: ${error.message}`);
    }
  },
};

/**
 * Groq Provider (OpenAI-compatible, free tier)
 */
const groqProvider = {
  name: 'groq',
  isConfigured: () => !!GROQ_API_KEY(),
  generateResponse: async (message) => {
    const apiKey = GROQ_API_KEY();
    if (!apiKey) throw new Error('Groq API key is not configured');

    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: GROQ_MODEL(),
          messages: [
            { role: 'system', content: 'You are a helpful, friendly AI assistant. Provide clear, concise, and informative responses.' },
            { role: 'user', content: message },
          ],
          temperature: 0.7,
          max_tokens: 2000,
        },
        {
          headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
          timeout: 30000,
        }
      );

      const text = response.data?.choices?.[0]?.message?.content;
      if (!text) throw new Error('Invalid response from Groq API');
      return text.trim();
    } catch (error) {
      const detail = error.response?.data?.error?.message || error.message;
      console.error('Groq API Error:', detail);
      throw new Error(`Groq API Error: ${detail}`);
    }
  },
};

/**
 * Gemini Provider
 */
const geminiProvider = {
  name: 'gemini',
  isConfigured: () => !!GEMINI_API_KEY(),
  generateResponse: async (message) => {
    const apiKey = GEMINI_API_KEY();
    if (!apiKey) {
      throw new Error('Gemini API key is not configured');
    }

    try {
      const model = GEMINI_MODEL();
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          system_instruction: {
            parts: [{ text: 'You are a helpful, friendly AI assistant. Provide clear, concise, and informative responses.' }],
          },
          contents: [{ parts: [{ text: message }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2000,
          },
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000,
        }
      );

      const candidate = response.data?.candidates?.[0];
      const text = candidate?.content?.parts?.[0]?.text;
      if (!text) throw new Error('Invalid response from Gemini API');
      return text.trim();
    } catch (error) {
      const detail = error.response?.data?.error?.message || error.message;
      console.error('Gemini API Error:', detail);
      throw new Error(`Gemini API Error: ${detail}`);
    }
  },
};

/**
 * Provider factory
 */
const providers = {
  openai: openaiProvider,
  grok: grokProvider,
  gemini: geminiProvider,
  groq: groqProvider,
};

/**
 * Get active provider
 */
const getProvider = () => {
  const provider = providers[AI_PROVIDER()];

  if (!provider) {
    throw new Error(`Unknown AI provider: ${AI_PROVIDER()}`);
  }

  if (!provider.isConfigured()) {
    throw new Error(
      `AI provider '${AI_PROVIDER()}' is not properly configured. Check your API keys.`
    );
  }

  return provider;
};

/**
 * Generate AI response
 * @param {string} message - User message
 * @returns {Promise<string>} - AI response
 */
export const generateAIResponse = async (message) => {
  try {
    const provider = getProvider();
    console.log(`Generating response using ${provider.name} provider...`);
    const response = await provider.generateResponse(message);
    return response;
  } catch (error) {
    console.error('AI Provider Error:', error.message);
    throw error;
  }
};

/**
 * Get current provider info
 */
export const getProviderInfo = () => {
  const provider = getProvider();
  return {
    name: provider.name,
    configured: provider.isConfigured(),
  };
};

/**
 * List available providers
 */
export const listAvailableProviders = () => {
  return Object.values(providers).map((p) => ({
    name: p.name,
    configured: p.isConfigured(),
  }));
};

export default {
  generateAIResponse,
  getProviderInfo,
  listAvailableProviders,
};
