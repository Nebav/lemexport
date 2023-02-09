import { Meteor } from "meteor/meteor";
import { LinksCollection } from "/imports/db/LinksCollection";

import "/imports/api/linksMethods";

const insertLink = (urlValue) => LinksCollection.insert({ url: urlValue });

Meteor.startup(() => {
  if (LinksCollection.find().count() === 0) {
    [
      "https://www.lempire.com/",
      "https://www.lemlist.com/",
      "https://www.lemverse.com/",
      "https://www.lemstash.com/",
    ].forEach(insertLink);
  }
});
