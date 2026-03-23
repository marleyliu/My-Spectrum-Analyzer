from flask import Flask, jsonify
from flask import request  
from flask_cors import CORS 
import numpy as np 
import matplotlib.pyplot as plt


app = Flask(__name__)
cors = CORS(app, origins='*')


class Sinewave: 

    def __init__(self, tones, sampling_rate, cycles, noise_amp):
        #self.amplitude = amplitude 
        #self.frequency = frequency
        self.tones = tones
        self.sampling_rate = sampling_rate
        self.cycles = cycles
        self.noise_amp = noise_amp

    def time_domain(self): 
        #amp = self.amplitude 
        Fs = self.sampling_rate 
        tstep = 1 / Fs
        #f0 = self.frequency
        f0 = self.tones[0]["frequency"]
        if f0 <= 0:
            f0 = 1
        cycles = self.cycles
        noise_amp = self.noise_amp


        N = int((Fs / f0) *cycles) 

        signal = np.zeros(N)
        t = np.linspace(0, (N-1)*tstep, N)
        for tone in self.tones: 
            A = tone["amplitude"]
            f = tone["frequency"]
            signal += A*np.sin(2*np.pi*f*t)

        #signal = amp * np.sin(2*np.pi*f0*t)
        noise = noise_amp * np.random.randn(N)
        y = signal + noise 
        return t, y
        
    def fft(self):

        Fs = self.sampling_rate 

        # call the other method
        t, y = self.time_domain()

        N = len(y)

        X = np.fft.fft(y)

        fstep = Fs / N
        f = np.linspace(0, (N-1)*fstep, N)

        return f, X, np.abs(X)/N

@app.route("/api/users", methods = ['GET'])
def users():
    wave1 = Sinewave([{"amplitude": 2, "frequency": 100}], 2000, 1, 0)
    t, y = wave1.time_domain()

    f, X, X_mag = wave1.fft()

    return jsonify({
        "timedomain_t": t.tolist(),
        "timedomain_y": y.tolist(),
        "fft_f": f.tolist(),
        "fft_Xmag": X_mag.tolist()
    })

@app.route("/api/signal", methods=["POST"])
def generate_signal():

    data = request.get_json()

    #amplitude = data.get("amplitude", 1)
    #frequency = data.get("frequency", 1)
    tones = data.get("tones", [{"amplitude": 1, "frequency": 1}])
    sampling_rate = data.get("sampling_rate", 100)
    cycles = data.get("cycles", 1)
    noise_amp = data.get("noise_amp", 0)

    wave = Sinewave(tones, sampling_rate, cycles, noise_amp)

    t, y = wave.time_domain()
    f, X, X_mag = wave.fft()

    return jsonify({
        "timedomain_t": t.tolist(),
        "timedomain_y": y.tolist(),
        "fft_f": f.tolist(),
        "fft_Xmag": X_mag.tolist()
    })

if __name__ == "__main__":
    app.run(debug = True, port = 8080)