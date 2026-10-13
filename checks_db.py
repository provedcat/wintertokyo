import sqlite3
from pathlib import Path
c=sqlite3.connect(':memory:')
c.executescript(next(Path('drizzle').glob('*.sql')).read_text())
c.execute("insert into packing (id,title,owner) values ('check','여권','리미')")
assert c.execute('select done,version from packing').fetchone()==(0,1)
assert c.execute("update packing set done=1,version=2 where id='check' and version=1").rowcount==1
assert c.execute("update packing set done=0,version=2 where id='check' and version=1").rowcount==0
assert c.execute('select done,version from packing').fetchone()==(1,2)
print('D1 migration defaults and stale-edit rejection passed.')
