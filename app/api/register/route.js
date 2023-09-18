import { NextResponse } from "next/server";

function connecttoDB() {
  // Read .env file and set environment variables
  require("dotenv").config();

  // Use official mongodb driver to connect to the server
  const { MongoClient, ObjectId } = require("mongodb");

  // New instance of MongoClient with connection string
  // for Cosmos DB
  const url = process.env.COSMOS_CONNECTION_STRING;
  const client = new MongoClient(url);

  return client;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const password = searchParams.get("password");

  let bcrypt = require("bcryptjs");

  let client;

  try {
    client = connecttoDB();

    await client.connect();

    // Database reference with creation if it does not already exist
    const db = client.db(`Database-Nextjs`);
    console.log(`New database:\t${db.databaseName}\n`);

    // Collection reference with creation if it does not already exist
    const collection = db.collection("users");
    console.log(`New collection:\t${collection.collectionName}\n`);

    let cursor = collection.aggregate([
      {
        $match: {
          email: email,
        },
      },
    ]);

    let userFound = await cursor.toArray();

    if (userFound.length === 0) {
      // console.log("user not exist"); throw 1 error here
    } else {
      let passwordHash = userFound[0].password;

      // console.log("PasswordHash is " + passwordHash);

      let result = bcrypt.compareSync(password, passwordHash);

      if (result) {
        // console.log(userFound[0]);
        return NextResponse.json({
          id: userFound[0].email,
          name: userFound[0].name,
          email: userFound[0].email,
        });
      } else {
        // return NextResponse.json();throw second error here
      }

      // console.log("Result is " + result);
    }

    // return NextResponse.json(response);
  } catch (error) {
    // return NextResponse.json(error);
  } finally {
    client.close();
  }
}

export async function POST(request) {
  let client;

  try {
    const user = await request.json();

    client = connecttoDB();

    await client.connect();

    // Database reference with creation if it does not already exist
    const db = client.db(`Database-Nextjs`);
    console.log(`New database:\t${db.databaseName}\n`);

    // Collection reference with creation if it does not already exist
    const collection = db.collection("users");
    console.log(`New collection:\t${collection.collectionName}\n`);

    const response = await collection.insertOne(user);

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(error);
  } finally {
    client.close();
  }
}
