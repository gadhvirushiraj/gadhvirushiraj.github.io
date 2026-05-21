#!/usr/bin/env python3
"""
Fetch arXiv paper abstracts and first-page PNG previews.

Usage:
    pip install pymupdf requests python-frontmatter
    python3 scripts/fetch_paper_assets.py

What it does:
  1. Reads every content/publications/*.md file
  2. Downloads the PDF from arXiv for papers that have an arXiv URL
  3. Converts the first page to a PNG → public/images/paper-previews/{id}.png
  4. Fetches the abstract from the arXiv API
  5. Writes preview_image and abstract back into the markdown frontmatter

Re-running is safe — existing images and abstracts are skipped.
"""

import os
import re
import sys
import time
import urllib.request
import urllib.error
import xml.etree.ElementTree as ET
from pathlib import Path

try:
    import fitz          # pymupdf
except ImportError:
    sys.exit("Missing dependency: pip install pymupdf")

try:
    import frontmatter   # python-frontmatter
except ImportError:
    sys.exit("Missing dependency: pip install python-frontmatter")

# ── paths ─────────────────────────────────────────────────────────────────────

ROOT         = Path(__file__).parent.parent
PUB_DIR      = ROOT / "content" / "publications"
PREVIEW_DIR  = ROOT / "public" / "images" / "paper-previews"
PREVIEW_DIR.mkdir(parents=True, exist_ok=True)

# ── helpers ───────────────────────────────────────────────────────────────────

def extract_id(arxiv_url: str) -> str | None:
    m = re.search(r"arxiv\.org/(?:abs|pdf)/([\w.]+)", arxiv_url)
    return m.group(1) if m else None


def fetch_abstract(arxiv_id: str) -> str | None:
    url = f"https://export.arxiv.org/api/query?id_list={arxiv_id}"
    try:
        with urllib.request.urlopen(url, timeout=10) as r:
            xml = r.read().decode()
        root = ET.fromstring(xml)
        ns   = {"atom": "http://www.w3.org/2005/Atom"}
        el   = root.find(".//atom:entry/atom:summary", ns)
        if el is not None and el.text:
            return " ".join(el.text.split())
    except Exception as e:
        print(f"    abstract fetch failed: {e}")
    return None


def pdf_first_page_png(arxiv_id: str, out_path: Path) -> bool:
    pdf_url = f"https://arxiv.org/pdf/{arxiv_id}"
    pdf_tmp = out_path.with_suffix(".pdf")
    try:
        print(f"    downloading PDF…", end=" ", flush=True)
        urllib.request.urlretrieve(pdf_url, pdf_tmp)
        print("done")

        print(f"    rendering first page…", end=" ", flush=True)
        doc  = fitz.open(pdf_tmp)
        page = doc[0]
        # 2× scale for crisp output
        mat  = fitz.Matrix(2, 2)
        pix  = page.get_pixmap(matrix=mat)
        pix.save(str(out_path))
        doc.close()
        print("done")
        return True
    except Exception as e:
        print(f"failed: {e}")
        return False
    finally:
        if pdf_tmp.exists():
            pdf_tmp.unlink()


# ── main ──────────────────────────────────────────────────────────────────────

def main():
    md_files = sorted(PUB_DIR.glob("*.md"))
    print(f"\nFound {len(md_files)} publication(s)\n" + "─" * 50)

    for md_path in md_files:
        post = frontmatter.load(md_path)

        arxiv_url = post.get("arxiv")
        if not arxiv_url:
            print(f"{md_path.name}: no arXiv URL — skipping\n")
            continue

        arxiv_id = extract_id(arxiv_url)
        if not arxiv_id:
            print(f"{md_path.name}: could not parse ID from {arxiv_url!r} — skipping\n")
            continue

        print(f"▸ {md_path.name}  [{arxiv_id}]")
        changed = False

        # 1. Abstract ─────────────────────────────────────────────────────────
        if post.get("abstract"):
            print("  abstract: already present, skipping")
        else:
            print("  abstract: fetching…", end=" ", flush=True)
            abstract = fetch_abstract(arxiv_id)
            if abstract:
                post["abstract"] = abstract
                changed = True
                print("✓")
            else:
                print("✗")

        # 2. First-page PNG ───────────────────────────────────────────────────
        img_file   = f"{arxiv_id}.png"
        img_disk   = PREVIEW_DIR / img_file
        img_public = f"/images/paper-previews/{img_file}"

        if img_disk.exists():
            print("  preview:  already on disk, skipping")
            if post.get("preview_image") != img_public:
                post["preview_image"] = img_public
                changed = True
        else:
            print("  preview:")
            ok = pdf_first_page_png(arxiv_id, img_disk)
            if ok:
                post["preview_image"] = img_public
                changed = True

        # 3. Write back ───────────────────────────────────────────────────────
        if changed:
            md_path.write_text(frontmatter.dumps(post))
            print("  frontmatter updated ✓")

        print()
        time.sleep(1)   # be polite to arXiv

    print("─" * 50 + "\nDone.\n")


if __name__ == "__main__":
    main()
