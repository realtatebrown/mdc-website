export const featuredStory = {
 title: 'The promise was mass deportation. The policy is carve-outs.',
 author: 'Scott Mechkowski',
 publisher: 'Blaze Media',
 url: 'https://www.theblaze.com/columns/opinion/the-promise-was-mass-deportation-the-policy-is-carve-outs',
 summary: 'Former ICE official Scott Mechkowski argues that worksite exemptions and operational bottlenecks are undermining deportation goals. He calls for stronger employer verification and expanded capacity across detention, courts, and removal operations.',
};

export function NewsStory() {
 return <article className="news-story">
  <div className="news-story-meta"><span>Opinion</span><span>{featuredStory.publisher}</span><time dateTime="2026-09-30">September 30, 2026</time></div>
  <h2><a href={featuredStory.url} target="_blank" rel="noopener noreferrer">{featuredStory.title}</a></h2>
  <p className="news-story-author">By {featuredStory.author}</p>
  <p className="news-story-summary">{featuredStory.summary}</p>
  <a className="news-read-link" href={featuredStory.url} target="_blank" rel="noopener noreferrer">Read on Blaze Media</a>
 </article>;
}
