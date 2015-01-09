# Chronos
A kind of diary.

Chronos is a weird way to write the name of one of the legendary apocalyptic riders. I used it because he stands for time and enthropy.

Everything erodes given time. Everything once will be forgotten. But Chronos will make sure, that your experiences will survive far longer
than your memories last. Chronos is here to help you persist your experiences and/or thoughts. It will mostly be configured for documenting
pen & paper roleplay experiences, but can also be used in many other kinds of ways.

The following features will be aspired (suggestions welcome!):

+ O Persist your story
+ O Bring your story in your own timeline
+ O Add metadata to your stories, like who was there and what items were important (these will be linked and show a little tooltip teaser)
+ O Manage a chronicle as a group (with authorization and visibility and/or editing restrictions)
+ O Add Doodle-like functions so your group can arrange its next meetup without the need to use another platform that just grabs your data.
+ O Add collaboration functions (multiple users editing the same document, maybe a chat to discourse) so your group can get better at authoring stuff
+ O Import and Export your data
+ O Make this app run completely locally and offline (with an option to sync to remote)

## Prerequesites
You need the following software:

+ Node.js (or io.js)
+ Apache CouchDB
+ Git
+ [Hoodie](http://www.hood.ie)
+ [JSPM](http://www.jspm.io)

Then just do the following:

`
npm install
`

and

`
jspm install
`

That should be enough to get the development version working.

# Creating a new Hoodie App

## Installation

Please refer to the [install guides for OS X, Linux and Windows](http://hood.ie/#installation).

## Plugins

To install a specific plugin, run (in your app's directory):

    $ hoodie install <name>

where `<name>` is one of the Hoodie Plugin.

To uninstall use:

    $ hoodie uninstall <name>

### List of Hoodie Plugins

* users (installed by default)
  - user sign up
  - user sign in
  - password forget
  - change username
  - change password

* email (installed by default)
  - send multipart emails


## Troubleshooting

In case you get npm permission errors, this is most likely down to the
fact that you have prior used the 'sudo' command to install node
modules.

`sudo -H npm yourCommand` should fix this. For slightly more detail,
please check out: [Why you shouldn't use sudo with npm](http://blog.hood.ie/2014/02/why-you-shouldnt-use-sudo-with-npm/)

Make sure that local-tld got installed correctly

    $ NODE_PATH=`npm root -g`
    $ open $NODE_PATH/local-tld

Make sure that paths have been set correctly

    $ echo $NODE_PATH
    $ cat ~/Library/LaunchAgents/ie.hood.local-tld-service.plist

In some situations, you may need to manually update `~/Library/LaunchAgents/ie.hood.local-tld-service.plist` to correctly source your Node installation, particularly if you are using a Node version manager, such as `nvm`.

Check the output of `$ cat ~/Library/LaunchAgents/ie.hood.local-tld-service.plist` for the following:

```
<key>ProgramArguments</key>
<array>
    <string>should equal the output of `$ which node`</string>
    <string>should equal the output of `$ echo $NODE_PATH` + /local-tld/bin/local-tld-service</string>
</array>
```

If these values aren't correct, you'll need to open `~/Library/LaunchAgents/ie.hood.local-tld-service.plist` in a text editor and update the file with the aforementioned values.

If things do not work, try:

    $ launchctl unload ~/Library/LaunchAgents/ie.hood.local-tld-service.plist
    $ launchctl load -Fw ~/Library/LaunchAgents/ie.hood.local-tld-service.plist

If things STILL don't work, try that (but don't tell Jan) ((I saw this! — Jan))

    $ sudo $NODE_PATH/local-tld/bin/local-tld-troubleshoot

**Vhosts**

If you find Hoodie interfering with your vhosts, here's a temporary workaround:

To get your vhosts back: `$ sudo ipfw flush`

To get local-tld back: `$ npm install -g local-tld`

To find out which state you're in: `$ sudo ipfw list`
If this includes something like "00100 fwd 127.0.0.1,5999 tcp from any to me dst-port 80 in", local-tld is currently running and might be blocking your vhosts.

## Deploy to Nodejitsu

You need a Nodejitsu account and the `jitsu` tool installed.

Create a new hoodie app:

    $ hoodie new myapp

Start app locally:

    $ cd myapp
    $ hoodie start

Create a database:

    $ jitsu database create couch myapp

This prints out the URL for your database, something like:

    http://nodejitsudb123456789.iriscouch.com:5984

Go to:

    http://nodejitsudb123456789.iriscouch.com:5984/_utils

In the bottom right, click on "Fix This". Create a new user with the username `admin` and a password of your choice. Remember the password.

Create the Nodejitsu app.

    $ jitsu apps create

Set your database URL as an environment variable:

    $ jitsu env set COUCH_URL http://nodejitsudb1234567890.iriscouch.com:5984
    $ jitsu env set HOODIE_ADMIN_USER admin
    $ jitsu env set HOODIE_ADMIN_PASS <yourpassword>


`<yourpassword>` is the one you set up two steps ago.

Deploy!

    $ jitsu deploy

(wait a minute)

Go to: `http://myapp.jit.su`

Boom.

## Deploy on a regular Linux/UNIX box:

[See deployment.md](deployment.md)

<!--## Deploy dreamcode tl;dr

    $ hoodie new myapp
    $ cd myapp
    $ hoodie start

    $ hoodie remote add nodejitsu
     - jitsu login
     - jitsu database create couch myapp
         - setup couchdb admin
     - jitsu apps create
     - jitsu env set COUCH_URL http://...
     - jitsu env set COUCH_PASS <secret>

    $ hoodie deploy
     - jitsu deploy-->
