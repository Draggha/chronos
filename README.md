[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

# Chronos
A kind of diary.

Chronos is a weird way to write the name of one of the legendary apocalyptic riders. I used it because he stands for time and enthropy.

Everything erodes given time. Everything once will be forgotten. But Chronos will make sure, that your experiences will survive far longer
than your memories last. Chronos is here to help you persist your experiences and/or thoughts. It will mostly be configured for documenting
pen & paper roleplay experiences, but can also be used in many other kinds of ways.

The following features will be aspired (suggestions welcome!):

+ [ ] Persist your story (make this app run completely locally and offline)
+ [ ] Bring your story in your own timeline (manage time and visualize stories in order of appearance)
+ [ ] Add metadata to your stories, like who was there and what persons or items were important
+ [ ] Manage a chronicle as a group (with authorization and visibility and/or editing restrictions)
+ [ ] Give an option to sync your data to a remote CouchDB


These would be cool ideas, but I still haven't fully decided on them yet:

+ [ ] Add Doodle-like functions so your group can arrange its next meetup without the need to use another platform that just grabs your data (e.g. doodle).
+ [ ] Add collaboration functions (multiple users editing the same document, maybe a chat to discourse) so your group can get better at authoring stuff
+ [ ] Import and Export your data (haven't decided on a format yet, because a sync to a CouchDB could make this feature obsolete)


## Prerequisites
You need the following software:

+ a Git client (duh)
+ [Node.js](http://nodejs.org)
+ [Hoodie](http://hood.ie)
+ [Ember-CLI](https://ember-cli.com/)
+ (optional; not configured yet) [Apache CouchDB](http://couchdb.apache.org/)

Then just do the following:

`npm run init`

and after that you can always start the server with

`npm start`

That should be enough to install all dependencies and get the development version working.