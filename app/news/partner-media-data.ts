import {sortedNews,type NewsItem} from '../content/model';
export type MediaFormat='articles'|'films'|'interviews';
export type PartnerMedia=NewsItem & {format:MediaFormat;partner:string;runtime?:string;portrait?:string;imageKind?:'photo'|'portrait'};
export const formatLabels:Record<MediaFormat,string>={articles:'Articles',films:'Documentaries & Specials',interviews:'Interviews & Podcasts'};
const legacyDetails:Record<string,{format:MediaFormat;partner:string;runtime?:string;image?:string}>={
 '-i-m-horrified-92-year-old-returns-to-london-after-50-years':{format:'films',partner:'Steven Edginton',image:'https://i.ytimg.com/vi/EYHWpMswzOI/hqdefault.jpg'},
 'the-promise-was-mass-deportation-the-policy-is-carve-outs':{format:'articles',partner:'Scott Mechkowski'},
 'a-playbook-for-mass-deportations':{format:'articles',partner:'Kyle Brosnan · Oversight Project'},
 'jason-killmeyer-tomi-lahren':{format:'interviews',partner:'Jason Killmeyer',image:'https://i.ytimg.com/vi/XpRlxJxgZ1k/hqdefault.jpg'},
 'mike-howell-on-immigration-in-britain-and-the-united-states':{format:'interviews',partner:'Mike Howell · Oversight Project',image:'https://i.ytimg.com/vi/aa86D8-n1JA/hqdefault.jpg'},
};
export function partnerMedia(items:NewsItem[],partnerNames:string[]=[],portraits:Record<string,string>={}):PartnerMedia[]{
 const names=new Set(partnerNames.map(name=>name.trim().toLowerCase()));
 const formats:Record<string,MediaFormat>={'Articles':'articles','Documentaries & Specials':'films','Interviews & Podcasts':'interviews'};
 return sortedNews(items).flatMap(item=>{
  if(item.status!=='Published')return [];
  const legacy=legacyDetails[item.id];
  const format=formats[item.category]||legacy?.format||(item.author&&names.has(item.author.toLowerCase())?(item.category==='Interviews'?'interviews':item.section==='press'?'articles':undefined):undefined);
  if(!format)return [];
  const partner=item.author||legacy?.partner;
  if(!partner)return [];
  const portrait=portraits[partner]||'';
  const image=item.image||legacy?.image||portrait;
  const imageKind=image&&(image===portrait||image.startsWith('/assets/partners/'))?'portrait':'photo';
  return [{...item,format,partner,runtime:legacy?.runtime,image,portrait,imageKind}];
 });
}

export function featuredFilm(items:NewsItem[],partnerNames:string[]=[]){return partnerMedia(items,partnerNames).find(item=>item.format==='films'&&item.featured);}
export function videoEmbed(raw:string){
 try{const u=new URL(raw);let id='';
 if(u.hostname==='youtu.be')id=u.pathname.slice(1);
 if(['youtube.com','www.youtube.com','m.youtube.com'].includes(u.hostname))id=u.pathname==='/watch'?u.searchParams.get('v')||'':/^\/(shorts|embed)\//.test(u.pathname)?u.pathname.split('/')[2]:'';
 return /^[A-Za-z0-9_-]{11}$/.test(id)?'https://www.youtube-nocookie.com/embed/'+id:null;
 }catch{return null;}
}

export function partnerFeedUrl(name:string){return '/news?partner='+encodeURIComponent(name);}
// Authors who publish on behalf of a coalition member also appear in that member's feed.
const affiliations:Record<string,string[]>={'Oversight Project':['Kyle Brosnan','Mike Howell']};
export function belongsToPartner(item:PartnerMedia,name:string){return item.partner.toLowerCase()===name.toLowerCase()||(affiliations[name]||[]).some(author=>author.toLowerCase()===item.partner.toLowerCase());}
export function feedPartners(items:PartnerMedia[],names:string[]=[]){return [...new Set([...items.map(item=>item.partner),...names.filter(name=>items.some(item=>belongsToPartner(item,name)))])].sort((a,b)=>a.localeCompare(b));}
