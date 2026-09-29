from pathlib import Path
import json,re,sqlite3,subprocess,sys,zipfile
ROOT=Path(__file__).resolve().parents[1]; errors=[]
for p in ['dist/index.html','dist/app.js','dist/app.css','dist/favicon.svg','functions/api/cms.js','functions/api/admin-auth/bootstrap.js','functions/api/media/upload.js','functions/media/[[path]].js','migrations/0001_bui_loc_cms.sql','wrangler.jsonc']:
    if not (ROOT/p).exists(): errors.append('Missing '+p)
try: json.loads((ROOT/'package.json').read_text())
except Exception as e: errors.append('package.json '+str(e))
try:
    t=(ROOT/'wrangler.jsonc').read_text(); t=re.sub(r'//.*','',t); w=json.loads(t)
    if w['d1_databases'][0]['database_id']!='d562635e-156d-4850-9eed-c88942633193': errors.append('Wrong D1 ID')
    if w['r2_buckets'][0]['bucket_name']!='canhan': errors.append('Wrong R2 bucket')
except Exception as e: errors.append('wrangler '+str(e))
try:
    db=sqlite3.connect(':memory:'); db.executescript((ROOT/'migrations/0001_bui_loc_cms.sql').read_text())
except Exception as e: errors.append('migration '+str(e))
r=subprocess.run(['node','--check',str(ROOT/'dist/app.js')],capture_output=True,text=True)
if r.returncode: errors.append('app.js syntax '+r.stderr)
html=(ROOT/'dist/index.html').read_text()
if '/src/main.tsx' in html: errors.append('dist still points to TSX source')
if '/app.js' not in html: errors.append('dist app.js not linked')
if errors:
 print('RELEASE CHECK FAILED'); [print('-',e) for e in errors]; sys.exit(1)
print('RELEASE CHECK PASSED')
print('Deploy-ready dist: OK')
print('D1 binding: OK')
print('R2 binding: OK')
print('Admin/API files: OK')
