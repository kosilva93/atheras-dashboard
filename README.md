

# Atheras Analytics Dashboard

[Atheras Analytics](https://atherasanalytics.com/) has developed a suite of software tools to meet these challenges and enable satellite operators to optimise the design and operation of their next-generation, multi-gateway satellite networks that are becoming essential to deliver high throughput satellite (HTS) services globally.

This project offers a dashboard to interact with the satellite networks.

## Server 

### Set up

To interact with the Atheras server, do the following:

``` bash
# Log into Atheras account
ibmcloud login -sso

# Log into Developement Cluster
ibmcloud ks cluster config -c devCluster --admin

# Set up Port Forwarding
oc port-forward <pod_name> 9000:9000
```

### Usage 

The Server APIs will now be available on `localhost:9000`

## Client

The Atheras Dashboard was created from [CoreUI Free React Admin Template v3](https://github.com/coreui/coreui-free-react-admin-template)

### Set up

1. Clone repo

   ``` bash
   $ git clone https://github.ibm.com/Kevin-Silva/atheras-dashboard.git
   ```

2. Compile Application

   ```bash
   # go into app's directory
   $ cd atheras-dashboard

   # install app's dependencies
   $ npm install
   ```

3. Create a `.env.local` file in `atheras-dashboard` directory with 

   ```bash
   REACT_APP_MAPBOX_API=<mapbox api key>
   ```

4. Start client

   ```bash
   # dev server with hot reload at http://localhost:3000
   $ REACT_APP_PORT=9000 npm start
   ```

### Usage

Navigate to [http://localhost:3000](http://localhost:3000). The app will automatically reload if you change any of the source files.

### Development

As this product is developed, ensure that you have the lastest code from git repo:

```bash
cd <clone source>/atheras-dashboard
git checkout master
git pull
npm install
REACT_APP_PORT=9000 npm start
```

### Build (Optional)

Run `build` to build the project. The build artifacts will be stored in the `build/` directory.

```bash
# build for production with minification
$ npm run build
```

### Directory structure

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```bash
atheras-dashboard
├── public/          #static files
│   └── index.html   #html template
│
├── src/             #project root
│   ├── assets/      #assets - js icons object
│   ├── containers/  #container source - template layout
|   │   ├── _nav.js  #sidebar config
|   │   └── ...      
│   ├── scss/        #user scss/css source
│   ├── views/       #views source
│   ├── App.js
│   ├── App.test.js
│   ├── polyfill.js
│   ├── index.js
│   ├── routes.js    #routes config
│   └── store.js     #template state example 
│
└── package.json
```

## Documentation

[API documentation](https://atherasanalytics.atlassian.net/wiki/spaces/SYS/pages/65571/API+Definition)

[Development documentation box folder](https://ibm.box.com/s/qp6ncf6ym1j56fsb0smcxnv8xz89cqr5)

[Systopia Gitlab](https://gitlab.com/atheras-analytics-dev/systopia-ui)

The documentation for the CoreUI Admin Template is hosted at [CoreUI for React](https://coreui.io/react/)

Video tutorial on how to setup coreui react theme in laravel available [here](https://youtu.be/HVVpbpNUJ8M).
