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

// Load Environment Variables
require('dotenv').config()
module.exports = {
  DNS_APIKEY: process.env.DNS_APIKEY,
  DNS_USERNAME: process.env.DNS_USERNAME
};
