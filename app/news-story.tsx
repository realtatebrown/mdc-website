export const stories = [
 { title:'The promise was mass deportation. The policy is carve-outs.', author:'Scott Mechkowski', publisher:'Blaze Media', type:'Opinion', date:'2026-09-30', dateLabel:'September 30, 2026', url:'https://www.theblaze.com/columns/opinion/the-promise-was-mass-deportation-the-policy-is-carve-outs', image:'/assets/news-feature.jpg', alt:'Rally attendees holding Mass Deportation Now signs', credit:'Al Drago / Bloomberg / Getty Images · via Blaze Media', summary:'Former ICE official Scott Mechkowski argues that worksite exemptions and operational bottlenecks are undermining deportation goals. He calls for stronger employer verification and expanded capacity across detention, courts, and removal operations.' },
 { title:'Oversight Project expands investigation into deportation data', author:'Oversight Project', publisher:'Oversight Project', type:'Coalition activity', date:'2026-09-21', dateLabel:'September 21, 2026', url:'https://itsyourgov.org/press/oversight-project-initiates-additional-investigation-for-deportation-data', image:'/assets/news-oversight.png', alt:'Oversight Project announcement', credit:'Image: Oversight Project', summary:'The coalition partner announced a further investigation seeking DHS deportation records from May onward, following its July lawsuit over earlier data. Mike Howell called for detailed public reporting on enforcement outcomes.' },
 { title:'A Playbook for Mass Deportations', author:'Kyle Brosnan', publisher:'The American Mind', type:'Policy commentary', date:'2026-04-10', dateLabel:'April 10, 2026', url:'https://americanmind.org/memo/a-playbook-for-mass-deportations/', image:'/assets/news-playbook.jpg', alt:'Immigration enforcement in Arizona', credit:'Image via The American Mind', summary:'Oversight Project general counsel Kyle Brosnan explains the coalition’s Playbook, including its emphasis on worksite enforcement, coordination across agencies, and consistent reporting of removals.' },
];
export const featuredStory = stories[0];
export function NewsStory({story = featuredStory, compact = false}: {story?:typeof featuredStory;compact?:boolean}) {
 return <article className={`news-story${compact ? ' news-story-compact' : ''}`}>
  <figure className="news-story-image"><a href={story.url} target="_blank" rel="noopener noreferrer" aria-label={story.title}><img src={story.image} alt={story.alt} loading="lazy" width="1200" height="600" /></a><figcaption>{story.credit}</figcaption></figure>
  <div className="news-story-meta"><span>{story.type}</span><time dateTime={story.date}>{story.dateLabel}</time></div>
  <h2><a href={story.url} target="_blank" rel="noopener noreferrer">{story.title}</a></h2>
  <p className="news-story-author">{story.author} · {story.publisher}</p>
  <p className="news-story-summary">{story.summary}</p>
  <a className="news-read-link" href={story.url} target="_blank" rel="noopener noreferrer">Read {story.type === 'Coalition activity' ? 'the announcement' : 'the article'}</a>
 </article>;
}
export function NewsGrid() { return <div className="news-grid">{stories.map(story=><NewsStory key={story.url} story={story} compact />)}</div>; }
