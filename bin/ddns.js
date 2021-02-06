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
// const Namecheap = require("../registrars/Namecheap");
const Env = require("../config/env");
const axios = require("axios");
const Registrar = require("../registrars/index")[Env.DNS_REGISTRAR];

// DNS Records
// const example_com = require("../config/domains/example.com.json");
const kderbyma_com = require("../config/domains/kderbyma.com.json");

// Configure IP Addresses for Domains
const getDomainRegistrations = async (domains) => {
  const IP = await axios('https://ifconfig.me');
  return domains.map((x) => {if(!x.value) x.value = IP.data; return x})
};

// Configure DNS Records
module.exports = (async () => {
  Registrar.setRecords(await getDomainRegistrations(kderbyma_com));
})();
