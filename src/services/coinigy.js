//run "npm install socketcluster-client" in terminal before attempting to use
import socketCluster from 'socketcluster-client';
import config from '../devConfig.js'

// This would be securely saved as environment variables in a real app
const api_credentials =
{
  apiKey: config.coinigyKey,
  apiSecret: config.coinigySecret,
}

const options = {
  hostname: "sc-02.coinigy.com",
  port: "443",
  secure: "true"
};

console.log(options);
const SCsocket = socketCluster.connect(options);


SCsocket.on('connect', function (status) {
  console.log(status);

  SCsocket.on('error', function (err) {
    console.log(err);
  });

  SCsocket.emit("auth", api_credentials, function (err, token) {
    if (!err && token) {
      const scChannel = SCsocket.subscribe("ORDER-BITF--LTC--BTC");
      // const scChannel = SCsocket.subscribe("TICKER");
      // const scChannel = SCsocket.subscribe("TICKER");
      console.log('scChannel', scChannel);
      scChannel.watch(function (data) {
        console.log(data);
      });

      SCsocket.emit("exchanges", null, function (err, data) {
        if (!err) {
          console.log('exchanges', data);
        } else {
          console.log(err)
        }
      });

      SCsocket.emit("channels", "OK", function (err, data) {
        if (!err) {
          console.log('channels', data);
        } else {
          console.log(err)
        }
      });
    } else {
      console.log(err)
    }
  });
});
