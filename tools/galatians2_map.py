# Galatians 2 map: Syrian Antioch <-> Jerusalem (c. 49 C.E.). Prints inline SVG.
def P(lon,lat): return (round((lon-33.4)*140,1), round((37.3-lat)*150,1))
def pts(l): return ' '.join(f'{x},{y}' for x,y in (P(*p) for p in l))
W,H=P(38.2,30.9)
coast=[(33.4,36.15),(33.9,36.3),(34.3,36.6),(34.6,36.8),(35.0,36.65),(35.6,36.6),(35.95,36.85),(36.17,36.6),(35.9,36.2),(35.8,35.85),(35.78,35.52),(35.9,35.2),(35.84,34.43),(35.5,33.9),(35.37,33.56),(35.2,33.27),(35.0,32.85),(34.9,32.5),(34.75,32.05),(34.55,31.65),(34.45,31.5),(34.2,31.3),(33.8,31.13),(33.4,31.1)]
coast_poly=[(33.4,37.3)]+[]  # sea = west of coast
sea=[(33.4,36.15)]+coast[1:]+[(33.4,31.1)]
cyprus=[(33.0,34.62),(33.6,34.82),(34.08,34.98),(34.59,35.69),(33.8,35.4),(33.4,35.36),(33.4,34.7)]
o=[]
o.append('<defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" style="fill:var(--accent)"/></marker><marker id="ar2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" style="fill:var(--warn)"/></marker></defs>')
o.append(f'<rect x="0" y="0" width="{W}" height="{H}" class="land" stroke="none"/>')
o.append(f'<polygon class="sea" points="{pts(sea)}" style="fill:var(--map-sea);stroke:var(--map-line);stroke-width:1.2"/>')
o.append(f'<polygon class="land" points="{pts(cyprus)}"/>')
gx,gy=P(35.58,32.82); dx,dy=P(35.5,31.45)
o.append(f'<ellipse cx="{gx}" cy="{gy}" rx="5" ry="8" style="fill:var(--map-sea);stroke:var(--map-line)"/>')
o.append(f'<ellipse cx="{dx}" cy="{dy}" rx="5" ry="26" style="fill:var(--map-sea);stroke:var(--map-line)"/>')
regions=[('சிலிசியா',34.1,36.95),('சீரியா',37.3,35.3),('பெனிக்கே',36.25,34.1),('சமாரியா',35.75,32.3),('யூதேயா',35.15,31.15),('சைப்ரஸ்',33.9,35.05)]
for t,lo,la in regions:
  x,y=P(lo,la); o.append(f'<text class="region" x="{x}" y="{y}" text-anchor="middle">{t}</text>')
x,y=P(34.55,33.05); o.append(f'<text class="region" x="{x}" y="{y}" text-anchor="middle" style="font-style:italic;letter-spacing:.2em">மத்தியதரைக் கடல்</text>')
C={'ant':(36.16,36.2),'jer':(35.23,31.78),'phx':(35.95,34.2),'sam':(35.35,32.35),'phx2':(36.35,34.0),'sam2':(35.7,32.6)}
def path(seq,k=0.05):
  ps=[P(*p) for p in seq]
  (x1,y1),(x2,y2)=ps[0],ps[1]; ps[0]=(round(x1+(x2-x1)*k,1),round(y1+(y2-y1)*k,1))
  (x1,y1),(x2,y2)=ps[-2],ps[-1]; ps[-1]=(round(x2-(x2-x1)*k,1),round(y2-(y2-y1)*k,1))
  d=f'M{ps[0][0]},{ps[0][1]}'
  for i in range(1,len(ps)-1):
    mx,my=(ps[i][0]+ps[i+1][0])/2,(ps[i][1]+ps[i+1][1])/2
    d+=f' Q{ps[i][0]},{ps[i][1]} {round(mx,1)},{round(my,1)}' if i<len(ps)-2 else f' Q{ps[i][0]},{ps[i][1]} {ps[-1][0]},{ps[-1][1]}'
  return d
o.append(f'<path class="route" d="{path([C["ant"],C["phx"],C["sam"],C["jer"]])}" marker-end="url(#ar)"/>')
o.append(f'<path class="route" d="{path([C["jer"],(35.6,32.2),(36.2,34.2),C["ant"]])}" marker-end="url(#ar)"/>')
o.append(f'<path class="route r2" d="{path([C["jer"],C["sam2"],(36.7,34.1),C["ant"]])}" marker-end="url(#ar2)"/>')
cities=[('அந்தியோகியா',*C['ant'],'start',10,4,''),('செலூக்கியா',35.93,36.12,'end',-10,14,' sea'),('எருசலேம்',*C['jer'],'end',-10,4,''),('தர்சு',34.9,36.92,'start',10,4,''),('தமஸ்கு',36.3,33.51,'start',10,4,''),('செசரியா',34.89,32.5,'end',-10,4,' sea')]
for t,lo,la,anc,dx_,dy_,c in cities:
  x,y=P(lo,la); o.append(f'<g class="city{c}"><circle cx="{x}" cy="{y}" r="5"/><text x="{x+dx_}" y="{y+dy_}" text-anchor="{anc}">{t}</text></g>')
steps=[(1,36.3,35.3,''),(2,35.95,32.95,''),(3,36.75,33.3,' r2')]
for n,lo,la,c in steps:
  x,y=P(lo,la); o.append(f'<g class="step{c}"><circle cx="{x}" cy="{y}" r="11"/><text x="{x}" y="{y}">{n}</text></g>')
x,y=P(33.55,31.0); o.append(f'<text x="{x}" y="{y}" style="font:500 15px var(--sans);fill:var(--muted)">எளிமைப்படுத்தப்பட்ட வரைபடம் · அளவுக்கு ஏற்றதல்ல</text>')
print(f'<svg class="map-svg" viewBox="0 0 {W} {H}" role="img" aria-label="கலாத்தியர் 2-ல் உள்ள இடங்கள்: அந்தியோகியா – எருசலேம்">'+''.join(o)+'</svg>')
