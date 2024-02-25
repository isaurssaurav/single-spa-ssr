# Single SPA SSR Example

![alt text](image.png)

# Setup
```
git clone https://github.com/isaurssaurav/single-spa-ssr.git

cd single-spa-ssr

npm i
```
### 1. SSR Frontend setup

```
cd packages/mf-app-ssr-vue

npm run serve
```

### 2. Copy the URL where the SSR frontend is server and paste it to .env inside `packages/root-config`

### 3. Single SPA root config setup

```
cd package/root-config

npm run serve
```

### 4. open `http:localhost:4000`
Here vue app is served as micro frontend.

