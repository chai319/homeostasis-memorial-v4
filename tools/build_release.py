"""Package the current local game as a static public site; never alter the source."""
from pathlib import Path
from html.parser import HTMLParser
from concurrent.futures import ThreadPoolExecutor
from PIL import Image
import argparse, hashlib, json, re

parser = argparse.ArgumentParser()
parser.add_argument('--source', required=True, type=Path)
parser.add_argument('--audit', required=True, type=Path)
args = parser.parse_args()
src = args.source.resolve()
dst = Path(__file__).resolve().parents[1]
assert src != dst and src not in dst.parents and dst not in src.parents
args.audit.mkdir(parents=True, exist_ok=True)
sha = lambda b: hashlib.sha256(b).hexdigest()

class Resources(HTMLParser):
    def __init__(self): super().__init__(); self.paths = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        key = 'src' if tag == 'script' else 'href' if tag == 'link' else None
        if key and key in attrs: self.paths.append(attrs[key].split('?')[0])

html = (src/'index.html').read_text()
resources = Resources(); resources.feed(html)
texts = {name: (src/name).read_text() for name in resources.paths}
# These links serve older local save namespaces; they have no saves on the new origin.
html = re.sub(r'<p><a href="v4\.[34]-continue\.html".*?</p>', '', html)
html = re.sub(r'<p id="provisional-save".*?</p>', '', html)
texts['app-v45.js'] = re.sub(r'^if\(\$\("provisional-save"\).*$', '', texts['app-v45.js'], flags=re.M)
manifest = json.loads((src/'performance-assets-v45.json').read_text())
public_assets = [{k: row[k] for k in ['character','act','path']} for row in manifest['assets']]
texts['performance-assets-v45.js'] = '''/* Existing, reviewed performance sprites. */
(function(g){"use strict";const assets=ASSETS;for(const a of assets){g.HM_ASSETS.characters[a.character].acting[a.act]=a.path;}g.HM_PERFORMANCE_ASSETS={assets};})(globalThis);
'''.replace('ASSETS', json.dumps(public_assets, ensure_ascii=False), 1)
cues = json.loads((src/'performance-cues-v45.json').read_text())
public_cues = [{k:v for k,v in row.items() if k != 'reason'} for row in cues['cues']]
texts['performance-cues-v45.js'] = 'window.HM_PERFORMANCE_CUES = '+json.dumps({'version':cues['version'],'cues':public_cues}, ensure_ascii=False)+';\n'

refs = sorted(set(re.findall(r'assets/[A-Za-z0-9_./-]+\.(?:png|mp3)', '\n'.join(texts.values()))))
assert refs and all((src/p).is_file() for p in refs)
assert not any('..' in Path(p).parts for p in refs)

def export(rel):
    source = src/rel
    target = dst/rel
    before = source.read_bytes()
    record = {'source':rel, 'source_sha256':sha(before), 'source_bytes':len(before)}
    if source.suffix == '.png':
        target = target.with_suffix('.webp')
        im = Image.open(source).convert('RGBA')
        target.parent.mkdir(parents=True, exist_ok=True)
        im.save(target, 'WEBP', lossless=True, method=4, exact=True)
        decoded = Image.open(target).convert('RGBA')
        assert im.size == decoded.size and im.tobytes() == decoded.tobytes(), rel
        record['decoded_rgba_identical'] = True
    else:
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(before)
    after = target.read_bytes()
    record.update(path=target.relative_to(dst).as_posix(), bytes=len(after), sha256=sha(after))
    return record

with ThreadPoolExecutor(max_workers=4) as pool:
    exports = list(pool.map(export, refs))
for name, content in texts.items():
    content = re.sub(r'(assets/[A-Za-z0-9_./-]+)\.png', r'\1.webp', content)
    assert '/Users/' not in content and 'CloudStorage' not in content, name
    (dst/name).write_text(content)
(dst/'index.html').write_text(html)
(dst/'.nojekyll').write_text('')

runtime = resources.paths + ['index.html','.nojekyll']
report = {
    'version':'V4.5 performance 2026-10-18, published 2026-10-20',
    'source_game_sha256':sha((src/'game-v4.js').read_bytes()),
    'source_unchanged':True,
    'runtime':[{'path':p,'sha256':sha((dst/p).read_bytes())} for p in runtime],
    'assets':exports,
    'input_asset_bytes':sum(r['source_bytes'] for r in exports),
    'published_asset_bytes':sum(r['bytes'] for r in exports),
    'public_changes':['Lossless PNG to WebP; decoded RGBA identical', 'Local-only legacy save links removed', 'Development provenance omitted from runtime manifests'],
}
(args.audit/'package-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({k:v for k,v in report.items() if k not in ['runtime','assets']}, ensure_ascii=False))
