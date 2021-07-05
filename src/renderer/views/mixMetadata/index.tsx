import { observer } from 'mobx-react';
import React from 'react';
import store from 'src/shared/store';
import useRandomHistory from 'src/utils/useRandomHistory';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, Legend } from 'recharts'

const MixMetadata = observer(() => {
    const trackHistory = store.mixstatus.trackHistory.slice().reverse();
    const mockTracks = useRandomHistory({ cutoff: 100, updateInterval: 1000 })

    const data = mockTracks.map(track => (
        {
            'rating': track.track.rating,
            'bpm': track.track.tempo
        }
    ))


    return (
        <div style={{ maxHeight: '400px', overflow: 'scroll', padding: '20px' }}>
            <LineChart width={730} height={250} data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="1" />
                <XAxis dataKey="name" interval='preserveEnd' />
                <YAxis dataKey="bpm" />
                <Tooltip />
                <Legend />
                {/* <Line isAnimationActive={false} type="monotone" dataKey="rating" stroke="#8884d8" /> */}
                <Line isAnimationActive={false} type="monotone" dataKey="bpm" stroke="#f84b4b" />
            </LineChart>
            {mockTracks.map(history => (
                <div>
                    <span>{history.track.rating}</span> - <span>{history.track.tempo}</span>
                </div>
            ))}
        </div>
    )
})

export default MixMetadata