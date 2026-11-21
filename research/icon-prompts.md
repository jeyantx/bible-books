# Icon style (chosen: sample D — engraved, two tones)

Generator: `python3 tools/gen_icon.py <out.png> person|place "<description>" "<accent hex>"` (model `gpt-image-2`, 1024², white background; then resize to 256 px with `sips -Z 256`).

Prompt = subject line + shared style line (both in `tools/gen_icon.py`):
- person: "Bust portrait icon of {desc}. First-century Middle-Eastern setting, respectful and historically plausible clothing."
- place: "Small vignette icon of {desc}, as it may have looked in the first century C.E. Compact composition that reads well at small size."
- style: "minimal engraved / woodcut style illustration, two tones only: dark ink (#2a2f36) line work and {accent} as the single accent colour … plain solid white background."

## Accent colour per subject (muted, balanced — keep new ones in this family)
| Subject | File | Accent | Description used |
|---|---|---|---|
| Paul | people/paul.png | #c08a2e ochre | the apostle Paul, a Jewish man in his forties with a short dark beard and receding hairline, robe and cloak, holding a scroll |
| Peter (Cephas) | people/peter.png | #4f7f9a slate blue | the apostle Peter, a sturdy Galilean fisherman in his forties with a full grey-streaked beard and curly hair, simple tunic and mantle |
| James (Jesus' brother) | people/james.png | #6b8a5a sage green | James the half brother of Jesus, a calm Jewish man around forty with a neat dark beard, plain robe and head covering |
| Barnabas | people/barnabas.png | #a0584a terracotta | Barnabas, a warm, kind-faced Levite from Cyprus in his forties with a short beard, robe with a simple striped mantle |
| Ananias | people/ananias.png | #7a6a9a muted violet | Ananias, a faithful disciple in Damascus, older Jewish man with a white beard and head covering, gentle expression |
| Jerusalem | places/jerusalem.png | #c08a2e | Jerusalem with the temple on the hill and city walls |
| Damascus | places/damascus.png | #4f7f9a | Damascus, a walled oasis city with palm trees and a river |
| Arabia | places/arabia.png | #b07a45 sand | the quiet Arabian desert with rocky hills and a lone tent |
| Tarsus | places/tarsus.png | #6b8a5a | Tarsus in Cilicia, a city gate on a river with mountains behind |
| Syrian Antioch | places/antioch.png | #a0584a | Antioch of Syria, colonnaded street and river with mountains |
| Galatia | places/galatia.png | #7a6a9a | the highland region of Galatia, a small town on rolling hills with a Roman road |
