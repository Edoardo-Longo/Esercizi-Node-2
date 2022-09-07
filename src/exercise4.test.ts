const supertest = require("supertest");
import app from "./exercise4"
const request = supertest(app);

test("GET /", async()=>{
  const response = await request
  .get("/")
  .expect(200)
  .expect("Content-type", /application\/json/);

  expect(response.body).toEqual(
    {json:"Un bel json"}
  );
})