/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

module.exports = (obj) => {
  return (
    obj["location"] != null &&
    obj["location"].protocol != null &&
    obj["location"].host != null &&
    obj["location"].path != null &&
    obj["location"].port != null &&
    obj["location"].origin != null &&
    obj["location"].href != null &&
    obj["siteData"] != null &&
    obj["siteData"].title != null &&
    obj["clientData"].browser != null &&
    obj["clientData"].screenColors != null &&
    obj["clientData"].language != null &&
    obj["clientData"].darkMode != null
  )
}