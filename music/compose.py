"""Original seamless nautical game cues. No third-party recordings or melodies.
Synthesised plucked strings, recorder-like woodwind, mallets, bowed pads and hand drums.
"""
import numpy as np, wave, json
from pathlib import Path
SR=32000
rng=np.random.default_rng(93215)
THEMES={
'home':dict(title='The Sunken City',step=.245,bars=24,root=50,lead='flute',energy=.65),
'learning':dict(title='Coral Corsairs',step=.215,bars=24,root=50,lead='pluck',energy=.9),
'sharks':dict(title='Beyond the Blue',step=.33,bars=24,root=43,lead='flute',energy=.35),
'writing':dict(title='Pearl Lagoon',step=.34,bars=16,root=62,lead='mallet',energy=.2),
'stories':dict(title='Lanterns in the Deep',step=.31,bars=24,root=50,lead='mallet',energy=.35),
'collection':dict(title='The Captain’s Pearls',step=.24,bars=24,root=55,lead='pluck',energy=.6)}
MOTIF=[[0,7,12,15,14,12],[10,7,3,7,10,7],[8,12,15,12,8,7],[7,11,14,11,7,-1],[0,3,7,12,10,7],[10,14,17,14,10,7],[8,12,15,19,15,12],[7,11,14,19,14,11]]
CHORDS=[(0,3,7),(-2,2,5),(-4,0,3),(-5,-1,2)]
def oscillator(midi,duration,kind):
 f=440*2**((midi-69)/12);t=np.arange(int(duration*SR))/SR
 if kind=='pluck':
  y=sum(np.sin(2*np.pi*f*h*t+.07*h)*np.exp(-t*(1.7+h*.6))/(h**1.45) for h in range(1,9));env=(1-np.exp(-t*280))*np.exp(-t*1.4)
 elif kind=='mallet':
  y=np.sin(2*np.pi*f*t)*np.exp(-t*2.6)+.28*np.sin(2*np.pi*f*2.76*t)*np.exp(-t*6)+.09*np.sin(2*np.pi*f*5.4*t)*np.exp(-t*10);env=(1-np.exp(-t*450))
 elif kind=='flute':
  vib=2*np.pi*f*t+.035*np.sin(2*np.pi*4.8*t);y=np.sin(vib)+.16*np.sin(2*vib)+.045*np.sin(3*vib);env=np.minimum(t/.055,1)*np.minimum(np.maximum(duration-t,0)/.13,1);y*=.91+.035*np.sin(2*np.pi*2.1*t)
 else:
  y=sum(np.sin(2*np.pi*f*h*t+.005*np.sin(2*np.pi*(.7+h*.12)*t))/h**1.7 for h in range(1,7));env=np.minimum(t/.3,1)*np.minimum(np.maximum(duration-t,0)/.6,1)
 return y*env
for key,cfg in THEMES.items():
 step=cfg['step'];duration=cfg['bars']*6*step;N=round(duration*SR);track=np.zeros(N,dtype=np.float64)
 def add(sound,time,amp):
  start=round(time*SR);indices=(start+np.arange(len(sound)))%N;np.add.at(track,indices,sound*amp)
 for bar in range(cfg['bars']):
  chord=CHORDS[bar%4];root=cfg['root'];base=bar*6*step;energy=cfg['energy']
  for n in chord:add(oscillator(root+n,6*step+.55,'pad'),base,.018*(.65+energy))
  for beat in [0,3]:add(oscillator(root+chord[0]-12,step*2.6,'pluck'),base+beat*step,.12)
  # Rolling 6/8 mandolin rhythm under the tune.
  for beat in range(6):
   note=root+chord[beat%3]+(12 if beat%2 else 0)
   add(oscillator(note,step*2,'pluck'),base+beat*step,.028 if key=='writing' else .04)
  motif=MOTIF[bar%8]
  if bar%8 in [6,7]:motif=motif[::-1] if bar>=8 else motif
  for beat,offset in enumerate(motif):
   if key=='writing' and beat%2:continue
   if key=='sharks' and beat in [1,4]:continue
   # Longer phrasing at every fourth-bar cadence, leaving breathing room.
   if bar%4==3 and beat>=4:continue
   length=step*(1.65 if key in ['writing','sharks'] else .86)
   lead_note=root+offset+(12 if key in ['writing','stories'] else 0)
   add(oscillator(lead_note,length,cfg['lead']),base+beat*step,.075 if key=='learning' else .065)
  if key not in ['writing','sharks']:
   for beat in [0,3]:
    t=np.arange(int(.19*SR))/SR;drum=np.sin(2*np.pi*(82*t-90*t*t))*np.exp(-t*22);add(drum,base+beat*step,.075*energy)
   for beat in [2,5]:
    t=np.arange(int(.08*SR))/SR;noise=rng.normal(0,1,len(t));noise=np.r_[0,np.diff(noise)];add(noise*np.exp(-t*70),base+beat*step,.012*energy)
  if bar%8==0:add(oscillator(root+31,1.8,'mallet'),base,.035)
 # Circular early reflections and a subtle stereo field make a seamless loop.
 stereo=np.stack([track,track],axis=1)
 for delay,level in [(.083,.18),(.139,.13),(.251,.09),(.387,.055),(.511,.035)]:
  stereo[:,0]+=np.roll(track,round(delay*SR))*level
  stereo[:,1]+=np.roll(track,round((delay+.023)*SR))*level
 stereo=np.tanh(stereo*1.1);peak=np.max(np.abs(stereo));stereo*=.72/max(peak,.01)
 path=Path('music')/(key+'.wav');pcm=(stereo*32767).astype('<i2')
 with wave.open(str(path),'wb') as w:w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes(pcm.tobytes())
 print(key,cfg['title'],round(duration,2),'seconds','rms',round(float(np.sqrt(np.mean(stereo**2))),3),'peak',round(float(np.max(np.abs(stereo))),3))
Path('music/TRACKS.json').write_text(json.dumps(THEMES,indent=2))
