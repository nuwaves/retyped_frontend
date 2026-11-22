// Crawler policy for robots.txt (decision D17, 2026-11-22):
// allow search crawlers, block bulk AI-training crawlers until a paid route
// (Cloudflare Pay Per Use / pay per crawl, or the paid transcript API) is live.
//
// Sources for which user-agent does what:
// - Operator docs:
//   OpenAI      https://platform.openai.com/docs/bots
//   Anthropic   https://support.anthropic.com/en/articles/8896518
//   Google      https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers
//   Perplexity  https://docs.perplexity.ai/guides/bots
//   Apple       https://support.apple.com/en-us/119829
//   Meta        https://developers.facebook.com/docs/sharing/webmasters/web-crawlers
//   Common Crawl https://commoncrawl.org/ccbot
// - Community list: https://github.com/ai-robots-txt/ai.robots.txt
//   (robots.json at commit eba7fddcfdac4ab9c079322464422c5c41af8f44, 2026-11-22),
//   used only for bots whose stated function is model training or dataset building.
//
// Not listed here on purpose (they fall under the `*` group and stay allowed):
// user-initiated fetchers such as ChatGPT-User, Claude-User and Perplexity-User,
// which fetch one page because a person asked, and general crawlers with mixed
// uses (Amazonbot, GoogleOther). Revisit with AI Crawl Control data (D16).
//
// robots.txt is advisory. Bots that ignore it have to be blocked at Cloudflare.

// Paths no crawler should fetch. Same list as the `*` group.
export const PRIVATE_PATHS = ['/api/', '/auth/'];

// Search and answer-engine crawlers: allowed, so retyped stays in search
// results and AI answers (SEO / AEO).
export const SEARCH_CRAWLERS = [
  'Googlebot', // Google Search
  'Bingbot', // Bing (also feeds Copilot and DuckDuckGo results)
  'DuckDuckBot',
  'Applebot', // Siri / Spotlight search; training is controlled by Applebot-Extended
  'OAI-SearchBot', // ChatGPT search; not used for training (OpenAI docs)
  'Claude-SearchBot', // Claude search quality; not training (Anthropic docs)
  'PerplexityBot', // Perplexity search index; not training (Perplexity docs)
];

// Bulk training / dataset crawlers: blocked from the whole site.
export const TRAINING_CRAWLERS = [
  'GPTBot', // OpenAI model training
  'ClaudeBot', // Anthropic model training
  'anthropic-ai', // older Anthropic training token
  'Google-Extended', // Gemini / Vertex AI training token; does not affect Google Search
  'Applebot-Extended', // Apple Intelligence training token; does not affect Applebot search
  'CCBot', // Common Crawl open dataset, widely used for LLM training
  'Bytespider', // ByteDance LLM training
  'TikTokSpider', // ByteDance LLM training
  'meta-externalagent', // Meta model training
  'FacebookBot', // Meta language-model training
  'cohere-training-data-crawler', // Cohere training data
  'MistralAI-Training', // Mistral training
  'DeepSeekBot', // DeepSeek training
  'AI2Bot', // Ai2 open-model training
  'Ai2Bot-Dolma', // Ai2 Dolma dataset
  'Hunyuan', // Tencent training crawler
  'MoonshotBot', // Moonshot / Kimi training crawler
  'PanguBot', // Huawei data scraper
  'Timpibot', // training data for LLMs
  'YandexAdditional', // YandexGPT
  'YandexAdditionalBot', // YandexGPT
  'img2dataset', // dataset builder
  'Cotoyogi', // LLM scraper
  'ICC-Crawler', // NICT AI training
];
