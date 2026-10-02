"""Genera un único HTML autocontenido a partir de `out/` (después de `npm run build`).

Uso:  python scripts/make-preview.py   ->  preview/jose-romo-landing.html
Incrusta CSS, fuentes, JavaScript e imágenes para que el archivo abra con doble clic.
"""

import base64
import mimetypes
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "out"
DEST = ROOT / "preview" / "jose-romo-landing.html"

mimetypes.add_type("font/woff2", ".woff2")
mimetypes.add_type("image/webp", ".webp")
mimetypes.add_type("image/svg+xml", ".svg")
mimetypes.add_type("application/pdf", ".pdf")


def data_uri(path: Path) -> str:
    mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    return f"data:{mime};base64,{base64.b64encode(path.read_bytes()).decode()}"


def local(url: str) -> Path:
    return OUT / url.split("?")[0].lstrip("/")


html = (OUT / "index.html").read_text(encoding="utf-8")

# Hojas de estilo -> <style>, con las fuentes incrustadas
def inline_css(m: re.Match) -> str:
    css = local(m.group(1)).read_text(encoding="utf-8")
    css = re.sub(
        r"url\((/_next/[^)]+)\)",
        lambda u: f"url({data_uri(local(u.group(1)))})",
        css,
    )
    return f"<style>{css}</style>"

html = re.sub(r'<link rel="stylesheet" href="(/_next/[^"]+\.css)"[^>]*/?>', inline_css, html)

# Precargas que ya no hacen falta
html = re.sub(r'<link rel="preload"[^>]*href="/_next/[^"]+"[^>]*/?>', "", html)

# Scripts -> inline, en el mismo orden
def inline_js(m: re.Match) -> str:
    js = local(m.group(1)).read_text(encoding="utf-8").replace("</script", "<\\/script")
    return f"<script>{js}</script>"

html = re.sub(r'<script src="(/_next/[^"]+\.js)"[^>]*></script>', inline_js, html)

# Imágenes e ícono
for url in set(re.findall(r'(/(?:img|cv)/[\w.-]+)', html)):
    html = html.replace(url, data_uri(local(url)))
html = re.sub(r'href="/icon\.svg[^"]*"', lambda _: f'href="{data_uri(OUT / "icon.svg")}"', html)

DEST.parent.mkdir(exist_ok=True)
DEST.write_text(html, encoding="utf-8")
print(f"{DEST}  ({DEST.stat().st_size / 1024:.0f} KB)")
