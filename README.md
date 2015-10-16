[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

# Chronos
A kind of diary.

Chronos is a weird way to write the name of one of the legendary apocalyptic riders. I used it because he stands for time and enthropy.

Everything erodes given time. Everything once will be forgotten. But Chronos will make sure, that your experiences will survive far longer
than your memories last. Chronos is here to help you persist your experiences and/or thoughts. It will mostly be configured for documenting
pen & paper roleplay experiences, but can also be used in many other kinds of ways.

The following features will be aspired (suggestions welcome!):

+ [ ] Persist your story
  - CouchDb persistence
  - Add drafts as well as live versions
+ [ ] Manage a chronicle as a group
  - with authorization and visibility and/or editing restrictions
+ [ ] Bring your story in your own timeline
  - a frontend component for managing events on a time stream
  - every chronicle has its own independent timeline
+ [ ] Add metadata to your stories, like who was there and what items were important
  - these will be linked and show a little tooltip teaser
+ [ ] Arrange your groups next meetup without the need to use another platform that just grabs your data.
  - Add some Doodle-like functions
+ [ ] Collaboration functions so your group can get better at authoring stuff
  - multiple users editing the same document
  - a chat for discourse
  - a micro forum (?)
+ [ ] Share your data
  - Import and Export your data
+ [ ] Offline first
  - Make this app run completely local and offline
  - Add an option to sync to remote



## Prerequisites
You need the following software:

+ a Git client (duh)
+ [Node.js](http://nodejs.org)
+ [Apache CouchDB](http://couchdb.apache.org/)
+ [Hoodie](http://hood.ie)
+ [JSPM](http://jspm.io)

Then just do the following:

`
npm install
`

That should be enough to get the development version working.
