import {sortedNews,type NewsItem} from '../content/model';
export type MediaFormat='articles'|'films'|'interviews';
export type PartnerMedia=NewsItem & {format:MediaFormat;partner:string;runtime?:string};
export const formatLabels:Record<MediaFormat,string>={articles:'Articles',films:'Documentaries & Specials',interviews:'Interviews & Podcasts'};
const legacyDetails:Record<string,{format:MediaFormat;partner:string;runtime?:string;image?:string}>={
 '-i-m-horrified-92-year-old-returns-to-london-after-50-years':{format:'films',partner:'Steven Edginton',runtime:'28 min',image:'https://i.ytimg.com/vi/EYHWpMswzOI/hqdefault.jpg'},
 'the-promise-was-mass-deportation-the-policy-is-carve-outs':{format:'articles',partner:'Scott Mechkowski'},
 'a-playbook-for-mass-deportations':{format:'articles',partner:'Kyle Brosnan · Oversight Project'},
 'jason-killmeyer-tomi-lahren':{format:'interviews',partner:'Jason Killmeyer',image:'https://i.ytimg.com/vi/XpRlxJxgZ1k/hqdefault.jpg'},
 'mike-howell-on-immigration-in-britain-and-the-united-states':{format:'interviews',partner:'Mike Howell · Oversight Project',image:'https://i.ytimg.com/vi/aa86D8-n1JA/hqdefault.jpg'},
};
export function partnerMedia(items:NewsItem[],partnerNames:string[]=[]):PartnerMedia[]{
 const names=new Set(partnerNames.map(name=>name.trim().toLowerCase()));
 const formats:Record<string,MediaFormat>={'Articles':'articles','Documentaries & Specials':'films','Interviews & Podcasts':'interviews'};
 return sortedNews(items).flatMap(item=>{
  if(item.status!=='Published')return [];
  const legacy=legacyDetails[item.id];
  const format=formats[item.category]||legacy?.format||(item.author&&names.has(item.author.toLowerCase())?(item.category==='Interviews'?'interviews':item.section==='press'?'articles':undefined):undefined);
  if(!format)return [];
  const partner=item.author||legacy?.partner;
  if(!partner)return [];
  return [{...item,format,partner,runtime:legacy?.runtime,image:item.image||legacy?.image||''}];
 });
}
