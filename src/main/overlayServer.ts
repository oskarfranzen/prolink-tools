import connect from 'connect';
import isDev from 'electron-is-dev';
import httpProxy from 'http-proxy';
import httpStatic from 'node-static';
import socketio from 'socket.io';

import fs from 'fs';
import http from 'http';
import * as path from 'path';

import {WEBSERVER_PORT} from 'src/shared/constants';
import {registerMainWebsocket} from 'src/shared/store/ipc';

const OVERLAY_ROOT = path.resolve(__dirname, 'overlay');

export async function startOverlayServer() {
  const app = connect();
  const httpServer = http.createServer(app);

  // Setup socketio server
  const wss = socketio(httpServer, {serveClient: false});
  registerMainWebsocket(wss);

  const proxy = httpProxy.createProxy();
  const fileServer = new httpStatic.Server(OVERLAY_ROOT);

  const handler: http.RequestListener = isDev
    ? (req, resp) => {
        const path = req.url?.startsWith('/sockjs-node') ? '' : 'overlay/';
        proxy.web(req, resp, {target: `http://127.0.0.1:2003/${path}/`, ws: true});
      }
    : async (req, resp) => {
        const requestUrl = req.url?.replace(/^\//, '');

        const accessErr = await new Promise<NodeJS.ErrnoException | null>(resolve =>
          fs.stat(path.resolve(OVERLAY_ROOT, requestUrl ?? ''), resolve)
        );

        if (requestUrl !== undefined && accessErr !== null) {
          fileServer.serveFile('index.html', 200, {}, req, resp);
        } else {
          fileServer.serve(req, resp);
        }
      };

  app.use(handler);

  // Start listening for connections
  await new Promise<void>(resolve =>
    httpServer.listen(WEBSERVER_PORT, '0.0.0.0', resolve)
  );
}
