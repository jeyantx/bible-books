def P(lon,lat): return (round((lon-29)*80,1), round((39.8-lat)*95,1))
def pts(l): return ' '.join(f'{x},{y}' for x,y in (P(*p) for p in l))
coast=[(29.0,36.65),(29.1,36.6),(29.6,36.2),(30.15,36.3),(30.5,36.45),(30.55,36.85),(30.7,36.88),(31.4,36.75),(32.0,36.55),(32.5,36.2),(32.8,36.02),(33.3,36.15),(33.9,36.3),(34.3,36.6),(34.6,36.8),(35.0,36.65),(35.6,36.6),(35.95,36.85),(36.17,36.6),(35.9,36.2),(35.8,35.85),(35.78,35.52),(35.9,35.2),(35.84,34.43),(35.5,33.9),(35.37,33.56),(35.2,33.27),(35.0,32.85),(34.9,32.5),(34.75,32.05),(34.55,31.65),(34.45,31.5),(34.2,31.3),(33.8,31.13),(33.1,31.1),(32.3,31.26),(31.8,31.5),(31.0,31.55),(30.4,31.45),(29.9,31.2),(29.0,30.85)]
cyprus=[(32.27,35.1),(32.4,34.75),(33.0,34.62),(33.6,34.82),(34.08,34.98),(34.59,35.69),(33.8,35.4),(33.0,35.36),(32.3,35.17)]
o=[]
o.append('<defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" style="fill:var(--accent)"/></marker><marker id="ar2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" style="fill:var(--warn)"/></marker></defs>')
o.append(f'<rect x="0" y="0" width="880" height="912" class="land" stroke="none"/>')
o.append(f'<polygon class="sea" points="{pts(coast)}" style="fill:var(--map-sea);stroke:var(--map-line);stroke-width:1.2"/>')
o.append(f'<polygon class="land" points="{pts(cyprus)}"/>')
gx,gy=P(35.58,32.82); dx,dy=P(35.5,31.45)
o.append(f'<ellipse cx="{gx}" cy="{gy}" rx="6" ry="9" style="fill:var(--map-sea);stroke:var(--map-line)"/>')
o.append(f'<ellipse cx="{dx}" cy="{dy}" rx="6" ry="30" style="fill:var(--map-sea);stroke:var(--map-line)"/>')
regions=[('கலாத்தியா',32.6,39.35),('சிலிசியா',35.9,37.35),('சீரியா',37.1,35.2),('யூதேயா',34.15,31.0),('அரேபியா',37.4,31.25),('சைப்ரஸ்',33.05,34.95)]
for t,lo,la in regions:
  x,y=P(lo,la); o.append(f'<text class="region" x="{x}" y="{y}" text-anchor="middle">{t}</text>')
x,y=P(31.6,33.6); o.append(f'<text class="region" x="{x}" y="{y}" text-anchor="middle" style="font-style:italic;letter-spacing:.2em">மத்தியதரைக் கடல்</text>')
C={'jer':(35.23,31.78),'dam':(36.3,33.51),'cae':(34.89,32.5),'tar':(34.9,36.92),'ant':(36.16,36.2),'ara':(37.0,31.9)}
def q(a,b,bend):
  (x1,y1),(x2,y2)=P(*a),P(*b); mx,my=(x1+x2)/2,(y1+y2)/2; nx,ny=-(y2-y1),(x2-x1); L=(nx*nx+ny*ny)**.5 or 1
  return f'M{x1},{y1} Q{round(mx+nx/L*bend,1)},{round(my+ny/L*bend,1)} {x2},{y2}'
routes=[(C['jer'],C['dam'],-30,''),(C['dam'],C['ara'],-40,''),(C['ara'],C['dam'],-25,''),(C['dam'],C['jer'],-60,''),(C['jer'],C['cae'],10,''),(C['cae'],C['tar'],60,''),(C['tar'],C['ant'],-25,' r2')]
def shorten(a,b,k=0.06):
  return (a[0]+(b[0]-a[0])*k, a[1]+(b[1]-a[1])*k), (b[0]-(b[0]-a[0])*k, b[1]-(b[1]-a[1])*k)
for a,b,bd,c in routes:
  a2,b2=shorten(a,b); o.append(f'<path class="route{c}" d="{q(a2,b2,bd)}" marker-end="url(#{"ar2" if c else "ar"})"/>')
cities=[('எருசலேம்',*C['jer'],'end',-10,4,''),('தமஸ்கு',*C['dam'],'start',10,4,''),('செசரியா',*C['cae'],'end',-10,4,' sea'),('தர்சு',*C['tar'],'end',-12,-4,''),('அந்தியோகியா',*C['ant'],'start',10,4,''),
 ('பிசீதியாவின் அந்தியோகியா',31.19,38.31,'start',-8,-16,' later'),('இக்கோனியா',32.49,37.87,'start',9,4,' later'),('லீஸ்திரா',32.36,37.58,'end',-9,10,' later'),('தெர்பை',33.36,37.35,'end',-10,8,' later')]
for t,lo,la,anc,dx_,dy_,c in cities:
  x,y=P(lo,la); o.append(f'<g class="city{c}"><circle cx="{x}" cy="{y}" r="5"/><text x="{x+dx_}" y="{y+dy_}" text-anchor="{anc}">{t}</text></g>')
steps=[(1,35.9,32.75,''),(2,36.85,32.75,''),(3,35.45,32.35,''),(4,34.2,34.6,''),(5,35.55,36.35,' r2')]
for n,lo,la,c in steps:
  x,y=P(lo,la); o.append(f'<g class="step{c}"><circle cx="{x}" cy="{y}" r="11"/><text x="{x}" y="{y}">{n}</text></g>')
x,y=P(29.3,30.5); o.append(f'<text x="{x}" y="{y}" style="font:500 16px var(--sans);fill:var(--muted)">எளிமைப்படுத்தப்பட்ட வரைபடம் · அளவுக்கு ஏற்றதல்ல</text>')
print('<svg class="map-svg" viewBox="0 0 880 912" role="img" aria-label="கலாத்தியர் 1-ல் உள்ள இடங்கள்">'+''.join(o)+'</svg>')
