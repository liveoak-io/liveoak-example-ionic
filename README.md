LiveOak Ionic Example
=====================

Example of an Ionic application using the LiveOak server.

Installing the application
--------------------------

* Install [Ionic](http://ionicframework.com/getting-started/) and its prerequisites.

* Edit the [index.html](blob/master/www/index.html#L15) and [services.js](blob/master/www/js/services.js#L4) to use your
current IP address.

Setup the application
---------------------
* Add a collection for newly created application (Manual step currently required)

  * Login to [LiveOak Console](http://localhost:8080/admin)
  * Create new (basic type) application called "ionic"
  * Create new collection called "Quiz" in its 
  [storage](http://localhost:8080/admin#/applications/ionic/storage/storage/browse)
  * To pre-populate data, import preferred (japanese hiragana or portuguese) lesson from the "lessons" folder. The
  import option is located in the dropdown menu on the right side of (yet still empty) data table (Next to the "Add column"
  and "Add row" buttons). Don't forget to click save once you imported the json file.


Running the application
-----------------------

* Start your application the same way you would start any ionic application, i.e. after adding android platform and
connecting your smart-phone through USB:

```shell
$ ionic run android
````

About the application
-----------------------

This is an example of [LiveOak](http://liveoak.io/) based app running on [Ionic platform](http://ionicframework.com/).

### Overview

This application is an example of so-called "drill" applications used for studying foreign vocabulary. It is
inspired by the Langdrill application from Linux systems.

### Test

To start learning the vocabulary, click on the "Start Quiz" button. The question (word to be translated) is
printed on the top of the screen. The goal is to select the correct one from all the possible options. Each question
is repeated until you correctly answer it for three times. Once you succeed to answer each question correctly three
times in a row, this question won't be repeated again.

To stop the quiz, click the "Stop Quiz" button.

### Vocabulary

Page used for listing the vocabulary.

### Settings

The settings page has two options:

* Number of choices - number of possible answers to a question.
* Left to Right - Whether the "left" or "right" column is used as a question.
