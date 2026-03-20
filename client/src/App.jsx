import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);


function App() {
  const [count, setCount] = useState(0);
  const [array, setArray] = useState([]);
  const [timedomain_y, setTimedomainY] = useState([]);
  const [timedomain_t, setTimedomainT] = useState([]);
  const [fft_f, setfftf] = useState([]);
  const [fft_Xmag, setfftX] = useState([]);
  const [amplitude, setAmplitude] = useState(2);
  const [frequency, setFrequency] = useState(100);
  const [samplingRate, setSamplingRate] = useState(2000);
  const [cycles, setCycles] = useState(1);
  const [noiseAmp, setNoiseAmp] = useState(0);

 
  
  const fetchAPI = async () => {

    const response = await axios.get("http://localhost:8080/api/users")
    setTimedomainY(response.data.timedomain_y);
    setTimedomainT(response.data.timedomain_t); 
    setfftf(response.data.fft_f);
    setfftX(response.data.fft_Xmag);
    
    /*
    console.log(typeof response.data.timedomain_y[0]);
    console.log(typeof response.data.timedomain_y.length);
    console.log(response.data.timedomain_y);
    /* setArray(response.data.users); */

  };

  const sendSignalRequest = async () => {
  try {
    const response = await axios.post("http://localhost:8080/api/signal", {
      amplitude: Number(amplitude),
      frequency: Number(frequency),
      sampling_rate: Number(samplingRate),
      cycles: Number(cycles),
      noise_amp: Number(noiseAmp)
    });

    setTimedomainY(response.data.timedomain_y);
    setTimedomainT(response.data.timedomain_t);
    setfftf(response.data.fft_f);
    setfftX(response.data.fft_Xmag);

  } catch (error) {
    console.error(error);
  }
};

   const timedomain = {
    labels: timedomain_t,
  datasets: [
    {
      label: "Time Signal",
      data: timedomain_y,
      pointRadius: 0,
  borderWidth: 2
    }
  ]
};

const fft = {

  labels: fft_f,
  datasets: [
    {
      label: "Frequency Domain",
      data: fft_Xmag,
      pointRadius: 0,
  borderWidth: 2
    }
  ]
};

const timeOptions = {
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        text: "Time (s)"
      },
      ticks: {
        callback: function(value) {
          return Number(value).toFixed(4);
        }
      }
    },
    y: {
      title: {
        display: true,
        text: "Amplitude"
      },
      ticks: {
        callback: function(value) {
          return value.toFixed(2);
        }
      }
    }
  }
};

const fftOptions = {
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        text: "Frequency (Hz)"
      },
      ticks: {
        callback: function(value) {
          return Number(value).toFixed(0);
        }
      }
    },
    y: {
      title: {
        display: true,
        text: "Magnitude"
      },
      ticks: {
        callback: function(value) {
          return value.toFixed(2);
        }
      }
    }
  }
};

  useEffect(() => {

    fetchAPI();
  },[]);

  return (
    <>

      <h1>Marley's Spectrum Analyzer</h1>

      <div className="card">
      
        <p>
          {/* {array.map((user, index) => (
            <span key = {index}>{user}</span>
          ))} */}

          <Line data={timedomain} options={timeOptions} />
          <Line data={fft} options={fftOptions} />
        </p>
      </div>

    <div style={{ marginTop: "20px" }}>
  
  <div style={{ marginBottom: "10px" }}>
    <label>Amplitude: </label>
    <input
      type="number"
      value={amplitude}
      onChange={(e) => setAmplitude(e.target.value)}
    />
  </div>

  <div style={{ marginBottom: "10px" }}>
    <label>Frequency: </label>
    <input
      type="number"
      value={frequency}
      onChange={(e) => setFrequency(e.target.value)}
    />
  </div>

  <div style={{ marginBottom: "10px" }}>
    <label>Sampling Rate: </label>
    <input
      type="number"
      value={samplingRate}
      onChange={(e) => setSamplingRate(e.target.value)}
    />
  </div>

  <div style={{ marginBottom: "10px" }}>
  <label>Cycles: </label>
  <input
    type="number"
    value={cycles}
    onChange={(e) => setCycles(e.target.value)}
  />
</div>

<div style={{ marginBottom: "10px" }}>
  <label>Noise Amplitude: </label>
  <input
    type="number"
    value={noiseAmp}
    onChange={(e) => setNoiseAmp(e.target.value)}
  />
</div>

  <button onClick={sendSignalRequest}>
    Generate Signal
  </button>

</div>
    </>
  )
}

export default App
