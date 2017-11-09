# IZBERG Automation

A React/Flask website running several scripts

## How to use?

### Without build:

In two separated Terminal, run on one side at the origin of the repo:

```
npm start
```

and

```
python src/server/server.py
```

Then connect to `localhost:3000` and enjoy the result

### With build:

First step, create a new production build with:

```
npm run build
```

then you will only have to run the following command until you change the frontend code:

```
python src/server/server.py
```

Finaly connect to `localhost:5000` and enjoy the result

### Warning

You need to set your IZBERG_TOKEN in order to allow scripts to run:

```
export IZBERG_TOKEN = "YOUR_BEARER"
```
