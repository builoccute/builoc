from pathlib import Path
import json,re,sqlite3,subprocess,sys
ROOT=Path(__file__).resolve().parents[1]
errors=[]
required=['functions/api/cms.js','functions/api/admin-auth/bootstrap.js','functions/api/media/upload.js','functions/media/[[path]].js','migrations/0001_bui_loc_cms.sql','wrangler.jsonc','package.json']
for rel in required:
    if not (ROOT/rel).exists(): errors.append('Missing '+rel)
try: json.loads((ROOT/'package.json').read_text())
except Exception as e: errors.append('package.json '+str(e))
try:
    t=(ROOT/'wrangler.jsonc').read_text(); t=re.sub(r'//.*','',t); w=json.loads(t)
    if not w.get('d1_databases'): errors.append('Missing database binding')
    if not w.get('r2_buckets'): errors.append('Missing media bucket binding')
except Exception as e: errors.append('wrangler '+str(e))
try:
    db=sqlite3.connect(':memory:'); db.executescript((ROOT/'migrations/0001_bui_loc_cms.sql').read_text()); db.close()
except Exception as e: errors.append('migration '+str(e))
dist=ROOT/'dist'
if not dist.exists():
    errors.append('Missing dist/ — run npm install and npm run build before production deployment')
else:
    html=dist/'index.html'
    if not html.exists(): errors.append('Missing dist/index.html')
    else:
        h=html.read_text(errors='replace')
        if '/src/main.tsx' in h: errors.append('dist still points to TSX source')
        assets=list((dist/'assets').glob('*.js')) if (dist/'assets').exists() else []
        if not assets: errors.append('No built JavaScript asset found in dist/assets')
        for asset in assets:
            r=subprocess.run(['node','--check',str(asset)],capture_output=True,text=True)
            if r.returncode: errors.append(f'{asset.name} syntax '+r.stderr.strip())
if errors:
    print('RELEASE CHECK FAILED')
    for e in errors: print('-',e)
    sys.exit(1)
print('RELEASE CHECK PASSED')
print('Build output: OK')
print('Database migration: OK')
print('Media binding: OK')
print('Admin/API files: OK')
