"""Generate a character/place icon in the site's agreed style (see research/icon-prompts.md).

Usage: python3 tools/gen_icon.py <out.png> person|place "<subject description>" "<accent hex>"
Reads the OpenAI key from $OPENAI_KEY_FILE (default ~/Downloads/openai-key.txt). Never commit the key.
"""
import base64, json, os, sys, urllib.request

STYLE = ("Style: minimal engraved / woodcut style illustration, two tones only: dark ink (#2a2f36) "
         "line work and {accent} as the single accent colour for clothing or key areas, subtle hatching, "
         "classic Bible-study book-illustration feel, simple and dignified, not cartoonish, not colourful. "
         "No text, no halo, no frame, centered, plain solid white background.")
SUBJECT = {
    "person": "Bust portrait icon of {desc}. First-century Middle-Eastern setting, respectful and historically plausible clothing.",
    "place": "Small vignette icon of {desc}, as it may have looked in the first century C.E. Compact composition that reads well at small size.",
}


def main():
    out, kind, desc, accent = sys.argv[1:5]
    key = open(os.environ.get("OPENAI_KEY_FILE", os.path.expanduser("~/Downloads/openai-key.txt"))).read().strip()
    prompt = SUBJECT[kind].format(desc=desc) + " " + STYLE.format(accent=accent)
    body = json.dumps({"model": "gpt-image-2", "prompt": prompt, "size": "1024x1024", "quality": "medium", "n": 1}).encode()
    req = urllib.request.Request("https://api.openai.com/v1/images/generations", data=body,
                                 headers={"Authorization": "Bearer " + key, "Content-Type": "application/json"})
    r = json.load(urllib.request.urlopen(req, timeout=300))
    open(out, "wb").write(base64.b64decode(r["data"][0]["b64_json"]))
    print("ok", out)


if __name__ == "__main__":
    main()
