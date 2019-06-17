# Vector Tile Static React App
### by [SoulWeb Solutions](https://soulweb.it)

This project is part of my experiment to build a vector tile static pipeline for `react`.

The tiles were generated with [tippecanoe](https://github.com/mapbox/tippecanoe), starting from `shp`/`mbtiles`/`geojson` data. As example, to convert a `geojson` I run:

`tippecanoe -Z 7 -z 12 -y name -y region -y province -y departement  --output-to-directory regions regions.geojson`

Unfortunately, I can't publish the used tiles.

The tiles must be located under `public/tiles` folder. Before to start the application you must launch the internal [tile-server](#npm run tile-server)

The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and make use of [react-leaflet](https://react-leaflet.js.org/) and [react-leaflet-vectorgrid](https://github.com/mhasbie/react-leaflet-vectorgrid).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run tile-server`

Launch the internal `tile-server`. Your `tile-server` should be available at http://localhost:8000.
