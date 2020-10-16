name: Deploy To Firebase

on:
  push:
    branches: [master]

jobs:
  deploy:
    name: Build App
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: '12.x'
      
      - name: Install Dependencies
        run: npm install
      - name: Build App
        run: npm run build

      - name: Deploy to Firebase
        uses: w9jds/firebase-action@master
        with:
          args: deploy --only hosting --project ${{ secrets.PROJECT_ID }}
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
