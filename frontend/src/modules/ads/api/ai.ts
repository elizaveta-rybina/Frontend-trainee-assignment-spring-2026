import type { UpdateAdPayload } from '../model/types'

const OLLAMA_URL =
	import.meta.env?.VITE_OLLAMA_URL || 'http://localhost:11434/api/generate'
const MODEL = import.meta.env?.VITE_OLLAMA_MODEL || 'llama3'

const BASE_AI_RULES = `
CRITICAL RESPONSE RULES (IF VIOLATED, THE RESPONSE IS INVALID):
1. LANGUAGE: You MUST write the final output EXCLUSIVELY in Russian (Cyrillic alphabet).
2. NO LATIN CHARACTERS: Strictly NO English words and NO Latin letters (A-Z, a-z) in the output.
3. SELF-CORRECTION: Before responding, check your text. If there is a single Latin letter, rewrite the entire text using only Cyrillic.
`

const formatParamsForAI = (payload: UpdateAdPayload) => {
	return `Category: ${payload.category}. Title: ${payload.title}. Characteristics: ${JSON.stringify(payload.params)}.`
}

const fetchFromOllama = async (prompt: string): Promise<string> => {
	try {
		const res = await fetch(OLLAMA_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ model: MODEL, prompt, stream: false })
		})

		if (!res.ok) {
			throw new Error(`Ошибка сервера AI: ${res.status} ${res.statusText}`)
		}

		const data = await res.json()
		return data.response
	} catch (error) {
		console.error('Ollama fetch error:', error)
		throw error
	}
}

export const aiApi = {
	generatePrice: async (payload: UpdateAdPayload): Promise<string> => {
		const prompt = `
      Act as an expert marketplace appraiser. Estimate the fair market value of the following item.
      Item details: ${formatParamsForAI(payload)}
      
      Task: Provide a short response stating the average price or price range, and briefly explain why.
      
      ${BASE_AI_RULES}
      5. PRICE FORMAT: Write prices ONLY as full numbers (e.g., "350000 рублей", NOT "350 тыс"). Do not use abbreviations like "тыс" or "млн".
    `
		return fetchFromOllama(prompt)
	},

	generateDescription: async (payload: UpdateAdPayload): Promise<string> => {
		const task = payload.description
			? `Improve the following item description to make it more attractive and professional for a classified ads website. Current description: "${payload.description}".`
			: `Create a compelling, professional, and concise description for selling this item on a classified ads website.`

		const prompt = `
      Act as a professional Russian copywriter for a classified ads marketplace.
      ${task}
      
      Item details: ${formatParamsForAI(payload)}
      
      ${BASE_AI_RULES}
      5. FORMAT: Write ONLY the description text. No introductory phrases, no quotes, no greetings like "Here is the description".
    `
		return fetchFromOllama(prompt)
	}
}
