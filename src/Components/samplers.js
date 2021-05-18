import * as Tone from 'tone';

//IF UPDATING SAMPLERS, MAKE SURE TO INCLUDE IN LIST AT BOTTOM

export const filter1 = new Tone.Filter(1500, "lowpass");
export const verb1 = new Tone.Reverb({decay:10, wet:0.3});
export const delay1 = new Tone.FeedbackDelay("8n", 0.7);
export const decay1 = 0.5;
export const s1 = new Tone.Sampler({
    volume: -14,
    urls: {
        A1: "A1.mp3",
        A2: "A2.mp3",
    },
    baseUrl: "https://tonejs.github.io/audio/casio/",
}).chain(filter1,verb1,delay1, Tone.Master);

export const filter2 = new Tone.Filter(1500, "lowpass");
export const verb2 = new Tone.Reverb({decay:10, wet:0.3});
export const delay2 = new Tone.FeedbackDelay("4n", 0.7);
export const decay2 = 0.9;
export const s2 =  new Tone.Sampler({
    volume: -20,
    urls: {
        A1: "A1.mp3",
        A2: "A2.mp3",
    },
    baseUrl: "https://tonejs.github.io/audio/salamander/",
}).chain(filter2,verb2,delay2, Tone.Master);

export const filter3 = new Tone.Filter(1500, "lowpass");
export const verb3 = new Tone.Reverb({decay:20, wet:0.95});
export const delay3 = new Tone.FeedbackDelay("2n", 0.7);
export const decay3 = 1.5;
export const s3 =  new Tone.Sampler({
volume: -15,
urls: {
    A2: "A1.mp3",
    A3: "A2.mp3",
},
baseUrl: "https://tonejs.github.io/audio/salamander/",
}).chain(filter3,verb3,delay3, Tone.Master);


export var samplersList = [[filter1,verb1,delay1,s1,decay1],[filter2,verb2,delay2,s2,decay2],[filter3,verb3,delay3,s3,decay3]]