import { generateContent } from './content';

const posts = await generateContent();
console.log(`Prepared ${posts.length} Markdown posts.`);
