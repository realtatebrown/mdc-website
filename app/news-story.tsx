export const stories = [
 { title:'The promise was mass deportation. The policy is carve-outs.', author:'Scott Mechkowski', publisher:'Blaze Media', type:'Opinion', date:'2026-09-30', dateLabel:'September 30, 2026', url:'https://www.theblaze.com/columns/opinion/the-promise-was-mass-deportation-the-policy-is-carve-outs', image:'/assets/news-feature.jpg', alt:'Rally attendees holding Mass Deportation Now signs', credit:'Al Drago / Bloomberg / Getty Images · via Blaze Media', summary:'Former ICE official Scott Mechkowski argues that worksite exemptions are holding back deportations. He calls for stronger employer verification and more capacity to detain and remove illegal aliens.' },
 { title:'Oversight Project expands investigation into deportation data', author:'Oversight Project', publisher:'Oversight Project', type:'Coalition activity', date:'2026-09-21', dateLabel:'September 21, 2026', url:'https://itsyourgov.org/press/oversight-project-initiates-additional-investigation-for-deportation-data', image:'/assets/news-oversight.png', alt:'Oversight Project announcement', credit:'Image: Oversight Project', summary:'Oversight Project is seeking DHS deportation records from May onward. The request follows its July lawsuit for earlier records.' },
 { title:'A Playbook for Mass Deportations', author:'Kyle Brosnan', publisher:'The American Mind', type:'Policy commentary', date:'2026-04-10', dateLabel:'April 10, 2026', url:'https://americanmind.org/memo/a-playbook-for-mass-deportations/', image:'/assets/news-playbook.jpg', alt:'Immigration enforcement in Arizona', credit:'Image via The American Mind', summary:'Kyle Brosnan, general counsel at Oversight Project, explains the coalition’s Playbook and its proposals for worksite enforcement and reporting deportation numbers.' },
];
export const featuredStory = stories[0];
import type { NewsItem } from './content/model';
function displayDate(date:string){return date?new Date(`${date.length===7?date+'-01':date}T12:00:00Z`).toLocaleDateString('en-US',{month:'long',year:'numeric',...(date.length===10?{day:'numeric'}:{}),timeZone:'UTC'}):'';}
export function NewsStory({story,compact=false}:{story:NewsItem;compact?:boolean}){
 return <article className={`news-story${compact?' news-story-compact':''}`}>
  {story.image&&<figure className="news-story-image"><a href={story.url} target="_blank" rel="noopener noreferrer" aria-label={story.title}><img src={story.image} alt={story.alt} loading="lazy" width="1200" height="600" /></a>{story.credit&&<figcaption>{story.credit}</figcaption>}</figure>}
  <div className="news-story-meta"><span>{story.section==='updates'?'Coalition update':'Press coverage'}</span>{story.date&&<time dateTime={story.date}>{displayDate(story.date)}</time>}</div>
  <h2><a href={story.url} target="_blank" rel="noopener noreferrer">{story.title}</a></h2>
  {(story.author||story.publisher)&&<p className="news-story-author">{[story.author,story.publisher].filter(Boolean).join(' · ')}</p>}
  {story.summary&&<p className="news-story-summary">{story.summary}</p>}
  <a className="news-read-link" href={story.url} target="_blank" rel="noopener noreferrer">{story.url.includes('youtube.com/')||story.url.includes('youtu.be/')?'Watch video':story.section==='updates'?'Read the update':'Read the article'}</a>
 </article>;
}
export function NewsGrid({items}:{items:NewsItem[]}){if(!items.length)return null;return <div className="news-editorial"><div className="news-lead"><NewsStory story={items[0]}/></div><div className="news-supporting">{items.slice(1).map(story=><NewsStory key={story.id} story={story} compact/>)}</div></div>;}
