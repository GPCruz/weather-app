!! It's necessary to have Node.js installed to run this code. !!

How to run:
-Clone this repository to a folder on your system
-On the command line, navigate to the root of the cloned repository
-Run the following command:
  
  npm install -g serve (you can skip this one if you already have serve installed)
  npm install
  npm run build
  serve -s build

A browser window will open with the running application.

This application uses google-maps-react to render a map using the Google Maps API and return the coordinates of the pin.

It also uses react-bootstrap to make everything responsive
