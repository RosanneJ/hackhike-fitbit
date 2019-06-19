import { InstrumentInput, InstrumentTypes, InstrumentTypeToNotes } from './instrument.types';
import * as Tone from 'tone';

export class SampleLibrary {
  ext: '.[mp3|ogg]'; // use setExt to change the extensions on all files // do not change this variable //
  onload: null;


  setExt(newExt) {
    for (let i = 0; i <= InstrumentTypes.length - 1; i++) {
      this[InstrumentTypes[i]].forEach((property) => {
        this[InstrumentTypes[i]][property] = this[InstrumentTypes[i]][property].replace(this.ext, newExt);
      });

    }
    this.ext = newExt;
  }


  public load(args: InstrumentInput): Tone.Sampler[] {
    const t: InstrumentInput = args;
    const rt: Tone.Sampler[] = [];

    t.instruments = t.instruments || InstrumentTypes;
    t.onload = t.onload || this.onload;

    // update extensions if arg given
    if (t.ext) {
      if (t.ext !== this.ext) {
        this.setExt(t.ext);
      }
      t.ext = this.ext;
    }

    // if an array of instruments is passed...
    for (let i = 0; i <= t.instruments.length - 1; i++) {
      const instrumentType = t.instruments[i];
      const newT = InstrumentTypeToNotes[instrumentType];
      this.minimizeNumberOfSamplesToLoad(newT, t);

      rt[instrumentType] = new Tone.Sampler(
        newT,
        t.onload,
        '/assets/samples/' + instrumentType + '/');
    }

    return rt;


  }

  minimizeNumberOfSamplesToLoad(newT, t): void {
    // Minimize the number of samples to load
    if (t.minify === true) {
      let minBy = 1;
      if (Object.keys(newT).length >= 17) {
        minBy = 2;
      }
      if (Object.keys(newT).length >= 33) {
        minBy = 4;
      }
      if (Object.keys(newT).length >= 49) {
        minBy = 6;
      }

      const filtered = Object.keys(newT).filter((_, i) => {
        return i % minBy !== 0;
      });
      filtered.forEach((f) => {
        delete newT[f];
      });
    }
  }


}
