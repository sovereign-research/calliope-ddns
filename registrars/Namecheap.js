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
  async function setQuery(merger) {
    // Stringify
    var queryParams = merge({}, merger);
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
        return await setQuery(merger);
      }));
      // Params
      var defParams = {
        apiuser: defaultOptions.user,
        apikey: defaultOptions.apikey,
        username: defaultOptions.user,
        Command: "namecheap.domains.dns.setHosts",
        ClientIp: defaultOptions.clientIp,
        mailType: "MX",
        SLD: records[0].sld,
        TLD: records[0].tld,
      };
      // Fetch
      try {
        let url = "https://api.namecheap.com/xml.response?" +await setQuery(defParams) + "&" + queries.join("&");
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
    setQuery,
  };

  return _that;
})();