import { LinksCollection } from "../db/LinksCollection";
import { Random } from "meteor/random";

Meteor.methods({
  "links.export": function () {
    const link = LinksCollection.findOne({
      _id: Random.choice(
        LinksCollection.find()
          .fetch()
          .map((link) => link._id)
      ),
    });
    if (!link) {
      throw new Meteor.Error("No link found during export");
    }
    return link;
  },
});
