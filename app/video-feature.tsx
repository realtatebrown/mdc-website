"use client";
import { useState } from "react";
import type {NewsItem} from './content/model';
const videoUrl = "https://www.youtube.com/watch?v=XpRlxJxgZ1k";
export default function VideoFeature({story}:{story?:NewsItem}) {
 const [playing,setPlaying]=useState(false);
 const url=story?.url||videoUrl;
 const parsed=new URL(url);
 const videoId=parsed.hostname==='youtu.be'?parsed.pathname.slice(1):['www.youtube.com','youtube.com'].includes(parsed.hostname)?parsed.searchParams.get('v'):null;
 if(!videoId||!/^[\w-]{11}$/.test(videoId))return null;
 return <article className="video-feature">
  <div className="video-feature-player">{playing ? <iframe src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`} title={story?.title||"Jason Killmeyer on Tomi Lahren Is Fearless"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> : <button type="button" onClick={()=>setPlaying(true)} aria-label={`Play ${story?.title||"Jason Killmeyer’s interview with Tomi Lahren"}`}><img src={story?.image||"/assets/partners/jason-killmeyer.png"} alt={story?.alt||""} width="1279" height="1917" loading="lazy" /><span className="video-play"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg><span>Watch interview</span></span></button>}</div>
  <div className="video-feature-copy"><span className="section-index">Interview / {story?.publisher||"Tomi Lahren Is Fearless"}</span><h2>{story?.title||"Jason Killmeyer on immigration enforcement"}</h2><p>{story?.summary||"Tomi Lahren speaks with former ICE Chief of Staff Jason Killmeyer about deportations, worksite enforcement, and voter frustration."}</p><a href={url} target="_blank" rel="noopener noreferrer">Watch on YouTube</a></div>
 </article>;
}
