/*                                                 *\
** ----------------------------------------------- **
**             Calliope - DDNS Generator   	       **
** ----------------------------------------------- **
**  Copyright (c) 2020-2021 - Kyle Derby MacInnis  **
**                                                 **
**    Any unauthorized distribution or transfer    **
**       of this work is strictly prohibited.      **
**                                                 **
**               All Rights Reserved.              **
** ----------------------------------------------- **
\*                                                 */

const Env = require("../config/env");
const axios = require("axios");

module.exports = (() => {
  // Defaults
  const defaultOptions = {
    user: Env.DNS_USERNAME,
    apikey: Env.DNS_APIKEY,
    clientIp: Env.DNS_IP,
  };

  function merge(a, b) {
    let output = Object.assign(Object.assign({}, a), b);
    return output;
  }

  // Set Host Command with Options Passed in
  async function setHost(options, merger) {
    // Params
    var defParams = {
      apiuser: options.user,
      apikey: options.apikey,
      username: options.user,
      Command: "namecheap.domains.dns.setHosts",
      ClientIp: options.clientIp,
      SLD: options.sld,
      TLD: options.tld,
    };

    var queryParams = merge(defParams, merger);

    // Stringify
    let query = Object.keys(queryParams).map(
      (x) => "" + x + "=" + queryParams[x]
    );
    return query.join("&");
  }

  async function setRecords(records) {
    try {
      let queries = await Promise.all(records.map(async (x, i) => {
        
        console.log("Setting DNS Record :: ", x);

        let merger = {};
        merger[`HostName${i+1}`] = x.host;
        merger[`RecordType${i+1}`] = x.type;
        merger[`Address${i+1}`] = x.value;
        merger[`TTL${i+1}`] = x.ttl;

        let options = merge(defaultOptions, x);
        return await setHost(options, merger);
      }));

      // Fetch
      try {
        let url = "https://api.namecheap.com/xml.response?" + queries.join("&");
        console.log("Calling URL:: ", url)
        let response = await axios.get(url);
        return response;
      } catch (e) {
        console.error(e);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const _that = {
    setRecords,
    setHost,
  };

  return _that;
})();