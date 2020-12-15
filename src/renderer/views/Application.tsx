import * as React from 'react';
import {MemoryRouter, Redirect, Route, Switch} from 'react-router-dom';
import styled from '@emotion/styled';

import Footer from 'app/components/Footer';
import Titlebar from 'app/components/Titlebar';
import Devices from 'app/views/devices';
import OverlayConfig from 'app/views/overlayConfig';
import Settings from 'app/views/settings';
import MixMetadata from 'src/renderer/views/mixMetadata';

const Application = () => (
  <MemoryRouter>
    <Titlebar />
    <Frame>
      <Switch>
        <Redirect from="/" to="/status" exact />
        <Route path="/status" component={Devices} />
        <Route path="/overlay-config" component={OverlayConfig} />
        <Route path="/settings" component={Settings} />
        <Route path="/meta-data" component={MixMetadata} />
      </Switch>
    </Frame>
    <Footer />
  </MemoryRouter>
);

const Frame = styled('div')`
  display: flex;
  flex-direction: column;
  background: #fff;
  flex-grow: 1;
`;

export default Application;
