from PIL import Image
from pathlib import Path

FOLDERS = [
    Path("public/images/fresh"),
    Path("public/images/savage"),
]
EXTENSIONS = {".webp", ".jpg", ".jpeg", ".png"}

def center_square_crop(img: Image.Image) -> Image.Image:
    w, h = img.size
    size = min(w, h)
    left = (w - size) // 2
    top  = (h - size) // 2
    return img.crop((left, top, left + size, top + size))

total = converted = skipped = 0

for folder in FOLDERS:
    files = [f for f in folder.iterdir() if f.suffix.lower() in EXTENSIONS]
    print(f"\n{folder}  ({len(files)} files)")
    for src in sorted(files):
        total += 1
        try:
            with Image.open(src) as img:
                w, h = img.size
                if w == h:
                    print(f"  skip  {src.name}  ({w}x{h} already square)")
                    skipped += 1
                    continue
                cropped = center_square_crop(img.convert("RGBA") if img.format == "PNG" else img)
                dest = src.with_suffix(".webp")
                cropped.save(dest, "WEBP", quality=85)
                if dest != src:
                    src.unlink()
                print(f"  ok    {src.name}  {w}x{h} → {cropped.size[0]}x{cropped.size[1]} .webp")
                converted += 1
        except Exception as e:
            print(f"  ERROR {src.name}: {e}")

print(f"\nDone — {converted} converted, {skipped} already square, {total} total")
