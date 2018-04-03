//run "npm install socketcluster-client" in terminal before attempting to use
import socketCluster from 'socketcluster-client';

const api_credentials =
{
  apiKey: "893f0acc193d534bb23b564e0505e40d",
  apiSecret: "d7fafccb50c423eec7028f1d2e6349fa"
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
