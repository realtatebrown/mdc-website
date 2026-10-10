"use client";
import { useState } from "react";
const videoUrl = "https://www.youtube.com/watch?v=XpRlxJxgZ1k";
export default function VideoFeature() {
 const [playing,setPlaying]=useState(false);
 return <article className="video-feature">
  <div className="video-feature-player">{playing ? <iframe src="https://www.youtube-nocookie.com/embed/XpRlxJxgZ1k?autoplay=1" title="Jason Killmeyer on Tomi Lahren Is Fearless" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> : <button type="button" onClick={()=>setPlaying(true)} aria-label="Play Jason Killmeyer’s interview with Tomi Lahren"><img src="/assets/partners/jason-killmeyer.png" alt="Jason Killmeyer" width="1279" height="1917" loading="lazy" /><span className="video-play"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg><span>Watch interview</span></span></button>}</div>
  <div className="video-feature-copy"><span className="section-index">Interview / Tomi Lahren Is Fearless</span><h2>Jason Killmeyer on immigration enforcement</h2><p>Tomi Lahren speaks with former ICE Chief of Staff Jason Killmeyer about deportations, worksite enforcement, and voter frustration.</p><a href={videoUrl} target="_blank" rel="noopener noreferrer">Watch on YouTube</a></div>
 </article>;
}
