# Metrix Hungary tesztfeladat - Balogh Zsolt

Ez a repo tartalmazza a megoldásomat, a Metrix Hungary felvételi feladathoz.

## Követelményeknek

- node & npm
- MongoDB
- git

## Futtatás

1. Clone repo:

```
git clone git@github.com:zsolt270/Metrix-TestTask.git
```

2. Packagek feltelepítése:

```
npm i
```

3. Mongodb cluster készítése

4. .env file készítése, server mappán belül az alábbiakkal:

```
PORT = <port number>
DB_CONNECTION_STRING = mongodb+srv://dev:<db_password>@<db_name>.qpdrdfz.mongodb.net/?retryWrites=true&w=majority&appName=<db_name>
DEFAULT_LIST_SIZE = <size of the list>
```

5. Szerver elindítása:

```
npm run start:dev
```

6. A swagger dokumentáció eléréséhez:

```
http://localhost:<PORT>/api-docs
```
