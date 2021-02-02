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

// List of DNS Records (Using Namecheap as Backend - Enable and Set in Environment) to Configure on Load
const DNSClient = require("./DnsRegister");
const axios = require("axios");

// DNS Records
const domains = require("./domains.json");
const getDomainRegistrations = async () => {
  const IP = await axios('https://ifconfig.me');
  return domains.map((x) => {x.value = IP.data; return x})
};

module.exports = (async () => {
  // Configure DNS
  DNSClient.setRecords(await getDomainRegistrations());
})();