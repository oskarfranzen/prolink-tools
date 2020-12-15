import { observer } from 'mobx-react';
import React from 'react';
import store from 'src/shared/store';
import useRandomHistory from 'src/utils/useRandomHistory';

const MixMetadata = observer(() => {
    const trackHistory = store.mixstatus.trackHistory.slice().reverse();
    const mockTracks = useRandomHistory({ cutoff: 100, updateInterval: 1000 })

    return <div style={{ maxHeight: '200px', overflow: 'scroll' }}>{mockTracks.map(history => (
        <div>
            <span>{history.track.artist?.name}</span> - <span>{history.track.title}</span>
        </div>
    ))}</div>
})

export default MixMetadata