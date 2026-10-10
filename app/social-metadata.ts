import type { Metadata } from 'next';
import { headers } from 'next/headers';
const allowedHosts = ['tate-brown-website.tateinho.chatgpt.site', 'mdc-website.mdc-coalition.workers.dev'];
export async function socialMetadata(title: string, description: string, path: string, image: string, imageAlt: string): Promise<Metadata> {
 const requestHeaders = await headers();
 const candidates = [requestHeaders.get('host'), requestHeaders.get('x-forwarded-host')];
 const host = candidates.find(value => value && allowedHosts.includes(value)) || allowedHosts[1];
 const origin = `https://${host}`;
 const imageUrl = new URL(image, origin).href;
 return {title, description, metadataBase:new URL(origin), openGraph:{type:'website',siteName:'Mass Deportation Coalition',title,description,url:new URL(path,origin).href,images:[{url:imageUrl,alt:imageAlt}]},twitter:{card:'summary_large_image',title,description,images:[{url:imageUrl,alt:imageAlt}]}};
}
