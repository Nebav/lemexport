import { Template } from "meteor/templating";

import "./App.html";

Template.mainContainer.onCreated(function () {
  this.links = new ReactiveVar([]);
});

Template.mainContainer.helpers({
  links() {
    return Template.instance().links.get();
  },
});

Template.mainContainer.events({
  "click .export-btn"(event, template) {
    event.preventDefault();

    const exportLoading = async (linkIndex) => {
      Meteor.setTimeout(() => {
        const links = template.links.get();
        links[linkIndex].progress += 5;
        template.links.set(links);
        if (links[linkIndex].progress < 100) {
          exportLoading(linkIndex);
        } else {
          links[linkIndex].loading = false;
          template.links.set(links);
        }
      }, 1000);
    };

    Meteor.call("links.export", function (error, result) {
      if (error) {
        console.log(error.reason);
      } else {
        const updatedLinks = template.links.get();
        updatedLinks.push({ url: result.url, progress: 0, loading: true });
        template.links.set(updatedLinks);
        exportLoading(updatedLinks.length - 1);
      }
    });
  },
});
