"""Build the downloadable reading edition from the site's full Playbook text."""
import json, re
from pathlib import Path
from html import escape
from lxml import html, etree
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
ROOT=Path(__file__).resolve().parents[1]
FONT=Path('/usr/share/fonts/truetype/dejavu')
for name, file in [('Body','DejaVuSans.ttf'),('BodyBold','DejaVuSans-Bold.ttf'),('Heading','DejaVuSerif.ttf')]:
 pdfmetrics.registerFont(TTFont(name,str(FONT/file)))
pdfmetrics.registerFontFamily('Body',normal='Body',bold='BodyBold',italic='Body',boldItalic='BodyBold')
styles=getSampleStyleSheet()
styles.add(ParagraphStyle(name='Copy',fontName='Body',fontSize=9.5,leading=14.5,spaceAfter=9,textColor=colors.HexColor('#183249')))
for name,size in [('TitleM',30),('H2M',22),('H3M',14)]:
 styles.add(ParagraphStyle(name=name,fontName='Heading',fontSize=size,leading=size*1.2,spaceBefore=14,spaceAfter=12,keepWithNext=True,textColor=colors.HexColor('#031e36')))
styles.add(ParagraphStyle(name='LabelM',parent=styles['Copy'],fontSize=8,leading=11,textColor=colors.HexColor('#79602e'),keepWithNext=True))
styles.add(ParagraphStyle(name='ListM',parent=styles['Copy'],leftIndent=14,firstLineIndent=-10))
root=html.fragment_fromstring(json.loads((ROOT/'app/playbook/content.json').read_text())['html'],create_parent='main')
flow=[]
def clean(t): return re.sub(r'\s+',' ',t or '').strip()
def inline(el):
 out=escape(el.text or '')
 for child in el:
  if isinstance(child.tag,str):
   value=inline(child)
   if child.tag in ('strong','b'): value='<b>'+value+'</b>'
   elif child.tag=='br': value='<br/>'
   elif child.tag=='a' and child.get('href','').startswith(('https://','http://')): value='<a href="'+escape(child.get('href'),quote=True)+'" color="#79602e">'+value+'</a>'
   out+=value
  out+=escape(child.tail or '')
 return out

def walk(el):
 if not isinstance(el.tag,str): return
 tag=el.tag
 if tag in ('h1','h2','h3','p','li','figcaption','blockquote') and not (tag=='blockquote' and len(el)):
  text=inline(el).strip()
  if text:
   style={'h1':'TitleM','h2':'H2M','h3':'H3M','li':'ListM','figcaption':'LabelM'}.get(tag,'Copy')
   flow.append(Paragraph(('• ' if tag=='li' else '')+text,styles[style]))
 elif tag=='img':
  src=el.get('src',''); path=ROOT/'public'/src.lstrip('/')
  if not path.is_file(): raise ValueError(src)
  pic=Image(str(path)); ratio=min(468/pic.imageWidth,580/pic.imageHeight,1)
  pic.drawWidth=pic.imageWidth*ratio;pic.drawHeight=pic.imageHeight*ratio
  flow.extend([Spacer(1,10),pic,Spacer(1,12)])
 else:
  if clean(el.text): flow.append(Paragraph(escape(clean(el.text)),styles['LabelM']))
  for child in el:
   walk(child)
   if clean(child.tail): flow.append(Paragraph(escape(clean(child.tail)),styles['Copy']))
for el in root:
 if not isinstance(el.tag,str): continue
 if el.get('id') and flow: flow.append(PageBreak())
 walk(el)

def footer(canvas,doc):
 canvas.setStrokeColor(colors.HexColor('#baa16b'));canvas.line(54,40,558,40)
 canvas.setFont('Body',7);canvas.setFillColor(colors.HexColor('#53616f'))
 canvas.drawString(54,28,'Mass Deportation Coalition Playbook · March 30, 2026')
 canvas.drawRightString(558,28,str(doc.page))
output=ROOT/'public/assets/mdc-playbook.pdf'
SimpleDocTemplate(str(output),pagesize=(612,792),rightMargin=60,leftMargin=60,topMargin=48,bottomMargin=58,title='Mass Deportation Coalition Playbook',author='Mass Deportation Coalition').build(flow,onFirstPage=footer,onLaterPages=footer)
print(output)
