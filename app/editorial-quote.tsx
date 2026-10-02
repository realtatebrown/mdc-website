// Draft excerpts and attributions transcribed from the supplied quote sheet.
// Original sources must be checked before approving this draft for public release.
const quotes = {
  platform: { text: "The Republican platform promises to launch the largest deportation operation in the history of the country.", speaker: "President Donald J. Trump", context: "Republican National Convention · July 2024" },
  eisenhower: { text: "Following the Eisenhower model, we will carry out the largest domestic deportation operation in American history.", speaker: "President Donald J. Trump", context: "Iowa and other rallies · 2023–2024" },
  promise: { text: "President Trump made a promise of Mass Deportations and that’s what this country’s gonna get.", speaker: "Tom Homan", context: "February 12, 2026" },
  funding: { text: "I have sent Congress a detailed funding request laying out exactly how we will eliminate these threats to protect our homeland and complete the largest deportation operation in American history…", speaker: "President Donald J. Trump", context: "Address to Congress · March 4, 2025" },
  choice: { text: "We will begin the largest deportation operation in the history of our country because we have no choice.", speaker: "President Donald J. Trump", context: "October 2024 · attribution from the Playbook" },
  orders: { text: "He will immediately sign executive orders sealing the border shut, beginning the largest deportation operation in American history.", speaker: "Stephen Miller", context: "Sunday Morning Futures · December 8, 2024" },
  inauguration: { text: "Upon my inauguration, I will immediately terminate every open-borders policy of the Biden administration, we’ll get it back, and follow the Dwight D. Eisenhower model.", speaker: "President Donald J. Trump", context: "Dubuque, Iowa · September 20, 2023" },
  families: { text: "“Is there a way to carry out mass deportation without separating families?” correspondent Cecilia Vega asked him. “Of course there is,” Homan answered, “families can be deported together.”", speaker: "Tom Homan, interviewed by Cecilia Vega", context: "As quoted in the Playbook", dialogue: true },
  whitehouse: { text: "Through mass deportations, the Trump administration is freeing up resources, revitalizing opportunity, and restoring safety — delivering tangible results that put American citizens first.", speaker: "The White House", context: "January 14, 2026" },
  officers: { text: "ICE Officers are herewith ordered… to do all in their power to achieve the very important goal of delivering the single largest Mass Deportation Program in History.", speaker: "President Donald J. Trump", context: "Truth Social · June 2025" },
  arrests: { text: "Under President Trump’s leadership, we are looking to set a goal of a minimum of 3,000 arrests for ICE every day…", speaker: "Stephen Miller", context: "Fox News with Sean Hannity · May 2025" },
  mandate: { text: "Americans voting overwhelmingly for mass deportation. Congress passed laws requiring it and then passed new legislation to fully fund it.", speaker: "Stephen Miller", context: "X · January 11, 2026" },
  table: { text: "If you’re in the country illegally, you’re not off the table…the biggest deportation operation the country has ever seen.", speaker: "Tom Homan", context: "Chicago event · December 2024" },
};
export type QuoteId = keyof typeof quotes;
export default function EditorialQuote({id, compact=false}: {id:QuoteId; compact?:boolean}) {
  const quote=quotes[id];
  return <figure className={`editorial-quote${compact ? ' editorial-quote-compact' : ''}`}>
    <blockquote><p>{'dialogue' in quote ? quote.text : `“${quote.text}”`}</p></blockquote>
    <figcaption><strong>{quote.speaker}</strong><span>{quote.context}</span></figcaption>
  </figure>;
}
