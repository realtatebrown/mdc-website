import type {PartnerMedia} from './news/partner-media-data';
import {videoEmbed} from './news/partner-media-data';
export default function DocumentaryFeature({story,news=false}:{story?:PartnerMedia;news?:boolean}) {
 if(!story)return null;
 const embed=videoEmbed(story.url);const titleId=news?'partner-feature-title':'documentary-title';
 const split=story.title.indexOf(': ');const title=split>0?story.title.slice(0,split):story.title;const subtitle=split>0?story.title.slice(split+2):'';
 const screen=<>{embed?<iframe src={embed} title={story.title} loading="lazy" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/>:<a href={story.url} target="_blank" rel="noopener noreferrer">{story.image?<img src={story.image} alt={story.alt||story.title} width="640" height="360" loading="lazy"/>:<span className="media-image-fallback">{story.partner}</span>}</a>}</>;
 const copy=<><h2 id={titleId}>{title}{subtitle&&<span className="documentary-subtitle">{subtitle}</span>}</h2><p className="documentary-meta">A film by {story.partner}</p>{story.summary&&<p>{story.summary}</p>}{story.credit&&<p className="documentary-support-credit">{story.credit}</p>}<a className="button" href={story.url} target="_blank" rel="noopener noreferrer">Watch now ↗</a></>;
 if(news)return <section className="partner-news-feature" aria-labelledby={titleId}><div className="partner-feature-image">{screen}</div><div className="partner-feature-copy"><span className="section-index">Featured / Documentary</span>{copy}</div></section>;
 return <section className="documentary-feature documentary-spotlight" id="featured-project" aria-labelledby={titleId}><div className="documentary-spotlight-bar"><span>Featured documentary</span></div><div className="documentary-inner documentary-release"><div className="documentary-screen">{screen}</div><div className="documentary-heading documentary-copy">{copy}</div></div></section>;
}
