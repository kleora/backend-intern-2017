Back-End Developer 2018
==============================

### Technical

<b>Create a new database on MongoDB (localhost):</b><br />
use DB_NAME -> the database will not be created until we save something<br />

<br />

<b>Create a new collection in a database:</b><br />
db.createCollection("COLLECTION_NAME")<br />

<br />

<b>Add elements into a collection:</b><br />
db.createCollection("posts", { _id : ObjectId("58e1f7e678b4c104bd928dcb"), title : "Test Post", content : 
   "Hello world, this is a new post!", author : "user", timestamp: ISODate("2017-04-02T09:37:34.002Z")} )<br />

