## IZBERG Automation

A React/Flask website running several scripts

### How to use?

In your terminal, first register your IZBERG token:

```
export IZBERG_TOKEN="YOUR_SECRET_TOKEN"
```

#### Without build:

In two separated Terminal, run on one side at the origin of the repo:

```
npm start
```

and

```
python src/server/server.py
```

Then connect to `localhost:3000` and enjoy the result

#### With build:

First step, create a new production build with:

```
npm run build
```

then you will only have to run the following command until you change the frontend code:

```
python src/server/server.py
```

Finaly connect to `localhost:5000` and enjoy the result
