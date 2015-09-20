ionic-public-forum-announcements-dashboard
==========================================

The ionic-public-forum-announcements-dashboard is a dashboard frontend for the <a href="http://www.github.com/wilsonhobbs/ionic-public-forum-announcements">ionic-public-forum-announcements</a> ionic project. It allows you to send announcements in the form of a card to all of your users with ease.

Setup
-----

Setup is easy. First, go into your firebase dashboard and make sure you have enabled users. Add as many users as you would like. Then, change every instance of `<YOUR-FIREBASE-APP>` to the prefix to your Firebase URL. For example, if your URL were `https://www.my-app.firebaseio.com`, then replace `<YOUR-FIREBASE-APP>` with `my-app`. Then, upload everything to a web server and you're all set!

Customization
-------------

If you don't want users to be able to reset their password willy-nilly, then just delete the states in app.js. You can also change the CSS if you want.
