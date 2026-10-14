import content from './posts.generated.json';
import type { Post } from './types';

export const posts: Post[] = content.posts;
export const buildYear: number = content.year;
