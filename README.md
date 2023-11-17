I created this using the default react-native setup. The brief didn't mention a preference for expo/default so I just went with default. All of the files I actually made myself are found in the "src" directory + the root App.tsx file. I didn't delete any of the other default files and just left everything as it is apart from some minor config changes.

To run the app run `npm start` in one window and `npm run ios` in another.

You might need to run `npx pod-install` as well.

I developed this using using an iPhone 15 on iOS 17.0 through the Xcode simulator. Have not tested it on Android. Brief didn't mention a preferred platform/device, so I went with my own preference. In a real world situation you would develop/test for multiple devices/OS, but this is just a small coding test, so I didn't.

## 3rd part libraries

I included Nativewind for styling. Nativewind is a react-native version of Tailwindcss. Tailwindcss is my preferred styling option for web development, so I thought i'd use what im comfortable with and include it here as well.

I included react-navigation to handle the navigation of the app. It's a good library, easy to use, and something I have used in the past before.

I used react-native-async-storage for handling the storage to local device.

I have chosen not to use any state management libraries such as redux as I didn't believe this app needed them and I was trying not to over-engineer my solution too much. A simple react context was enough for me.

## Brief

The brief as given to me was:

```
Create a simple note-taking app.
Users should be able to create different notes and link them to a client and a category.
The client and category data should be stored in a JSON file.
The main page of the app should display a FlatList of all existing notes or show a message if there are none.
The available categories to choose from are "Goal Evidence," "Support Coordination," and "Active Duty."
The app should have a button to add new notes. When adding a new note, the user should be able to select a client, choose a category, and enter the note text.
All notes should be stored in local memory and persisted so that they are not lost when the user closes and reopens the app.
Users should be able to edit and delete notes as needed.
```

## Improvements

If I were to spend more time on this app there are a lot of things to improve upon. I'd make sure that when a new note was created, the default data was blank and the user was required to actually input data in before saving it. I'd also add in a cancel changes button to allow the user to revert any changes they've made. I'd add in the date created and date last edited to each note. Some type of sorting/filtering system for displaying the notes on the home screen. Probably also keep track of which user was editing/creating the notes if the intention is to share these notes with multiple users. But that would start requiring an actual database. I'd also tidy up the styling and a whole bunch of other refactors.

Thanks,
Bryce
