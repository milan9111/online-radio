import React, {useState, useEffect} from 'react';
import { RadioBrowserApi } from 'radio-browser-api';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import defaultLogo from './../sources/logo.jpg';

const Radio = () => {
    const [stations, setStations] = useState();
    const [stationFilter, setStationsFilter] = useState('all');

    useEffect(() => {
       setupApi(stationFilter).then(data => {
           setStations(data)
       })
    }, [stationFilter])

    const setupApi = async (stationFilter) => {
        const api = new RadioBrowserApi(fetch.bind(window), 'My radio app');

        const stations = await api.searchStations({
            language: 'russian',
            tag: stationFilter, 
            limit: 50
        });
        return stations;
    }

    const filters = [
        'rock',
        'hard rock',
        'punk',
        'metal',
        'classic rock',
        'rap',
        'retro',
        'sport', 
        'news'
    ];

    const setDefaultSource = (event) => {
        event.target.src = defaultLogo;
    }

    return (
      <div className="radio">
        <div className="filters">
          {filters.map((filter) => {
            return (
            <span
              className={stationFilter === filter ? "selected" : ""}
              onClick={() => setStationsFilter(filter)}>
              {filter}
            </span>
            )
          })}
        </div>
        <div className='stations'>
            {stations && stations.map((station, index) => {
                return (
                    <div className='station' key={index}>
                        <div className='stationName'>
                            <img className='logo' src={station.favicon} alt="station logo" onError={setDefaultSource} />
                            <div className='name'>
                                {station.name}
                            </div>
                        </div>
                        <AudioPlayer className='player' 
                                     src={station.urlResolved} 
                                     showJumpControls={false} 
                                     layout='stacked' 
                                     customProgressBarSection={[]} 
                                     customControlsSection={['MAIN_CONTROLS', 'VOLUME_CONTROLS']} 
                                     autoPlayAfterSrcChange={false}
                        />
                    </div>
                );
            })}
        </div>
      </div>
    );
}

export default Radio;
