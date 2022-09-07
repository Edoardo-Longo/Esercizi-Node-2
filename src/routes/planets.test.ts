import supertest from "supertest";

import { prismaMock } from "../lib/prisma/client.mock";

import app from "../app";

const req = supertest(app);

describe("GET /planets", () => {

    test("Valid request", async () => {
        const planets = [
            {
                "id": 1,
                "name": "Mercury",
                "description": null,
                "diameter": 1234,
                "moons": 12,
                "createAt": "2022-08-09T16:17:03.240Z",
                "updatedAt": "2022-08-09T16:16:28.117Z"
            },
            {
                "id": 2,
                "name": "Venus",
                "description": null,
                "diameter": 5678,
                "moons": 21,
                "createAt": "2022-08-09T16:17:56.907Z",
                "updatedAt": "2022-08-09T16:17:05.999Z"
            },
        ];

        //@ts-ignore
        prismaMock.planet.findMany.mockResolvedValue(planets);

        const res = await req
            .get("/planets")
            .expect(200)
            .expect("Content-Type", /application\/json/)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080")
            .expect("Access-Control-Allow-Credentials", "true");

        expect(res.body).toEqual(planets);
    });
});

describe("GET /planet/:id", () => {

    test("Valid request", async () => {
        const planet = {
                "id": 1,
                "name": "Mercury",
                "description": null,
                "diameter": 1234,
                "moons": 12,
                "createAt": "2022-08-09T16:17:03.240Z",
                "updatedAt": "2022-08-09T16:16:28.117Z"
            }

        //@ts-ignore
        prismaMock.planet.findUnique.mockResolvedValue(planet);

        const res = await req
            .get("/planets/1")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(res.body).toEqual(planet);
    });
    test("Planet does not exist", async () => {
        //@ts-ignore
        prismaMock.planet.findUnique.mockResolvedValue(null);

        const res = await req
            .get("/planets/23")
            .expect(404)
            .expect("Content-Type", /application\/json/);

        expect(res.body.message).toContain("Cannot GET /planets/23");
    })
    test("Invalid planet ID", async () => {

        const res = await req
            .get("/planets/asdf")
            .expect(404)
            .expect("Content-Type", /application\/json/);

        expect(res.body.message).toContain("Cannot GET /planets/asdf");
    })
});

describe("POST /planets", () => {
    test("Valid request", async() => {
        const planet = {
            "id": 3,
            "name": "Mercury",
            "description": null,
            "diameter": 1234,
            "moons": 12,
            "createAt": "2022-08-10T12:28:28.504Z",
            "updatedAt": "2022-08-10T12:28:28.512Z"
        }

        //@ts-ignore
        prismaMock.planet.create.mockResolvedValue(planet);

        const res = await req
            .post("/planets")
            .send({
                "name": "Mercury",
                "diameter": 1234,
                "moons": 12,
            })
            .expect(201)
            .expect("Content-Type", /application\/json/)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080")
            .expect("Access-Control-Allow-Credentials", "true");

        expect(res.body).toEqual(planet);
    });
    test("Invalid request", async() => {
        const planet =
            {
                "diameter": 1234,
                "moons": 12,
            };

        const res = await req
            .post("/planets")
            .send(planet)
            .expect(422)
            .expect("Content-Type", /application\/json/);

        expect(res.body).toEqual({
            errors:{
                body: expect.any(Array)
            }
        });
    });
});

describe("PUT /planets/:id", () => {
    test("Valid request", async() => {
        const planet = {
            "id": 3,
            "name": "Mercury",
            "description": null,
            "diameter": 1234,
            "moons": 12,
            "createAt": "2022-08-10T12:28:28.504Z",
            "updatedAt": "2022-08-10T12:28:28.512Z"
        }

        //@ts-ignore
        prismaMock.planet.update.mockResolvedValue(planet);

        const res = await req
            .put("/planets/3")
            .send({
                "name": "Mercury",
                "description": "Lovely planet",
                "diameter": 1234,
                "moons": 12,
            })
            .expect(200)
            .expect("Content-Type", /application\/json/)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080")
            .expect("Access-Control-Allow-Credentials", "true");

        expect(res.body).toEqual(planet);
    });

    test("Invalid request", async() => {
        const planet =
            {
                "diameter": 1234,
                "moons": 12,
            };

        const res = await req
            .put("/planets/23")
            .send(planet)
            .expect(422)
            .expect("Content-Type", /application\/json/);

        expect(res.body).toEqual({
            errors:{
                body: expect.any(Array)
            }
        });
    });

    test("Planet does not exist", async () => {
        //@ts-ignore
        prismaMock.planet.update.mockRejectedValue(new Error("Error"));

        const res = await req
            .put("/planets/23")
            .send({
                "name": "Mercury",
                "description": "Lovely planet",
                "diameter": 1234,
                "moons": 12,
            })
            .expect(404)
            .expect("Content-Type", /application\/json/);

        expect(res.body.message).toContain("Cannot PUT /planets/23");
    });

    test("Invalid planet ID", async () => {

        const res = await req
            .put("/planets/asdf")
            .send({
                "name": "Mercury",
                "description": "Lovely planet",
                "diameter": 1234,
                "moons": 12,
            })
            .expect(404)
            .expect("Content-Type", /application\/json/);

        expect(res.body.message).toContain("Cannot PUT /planets/asdf");
    });

});

describe("DELETE /planet/:id", () => {

    test("Valid request", async () => {
        await req
            .delete("/planets/1")
            .expect(204)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080")
            .expect("Access-Control-Allow-Credentials", "true");
    });

    test("Planet does not exist", async () => {
        //@ts-ignore
        prismaMock.planet.delete.mockRejectedValue(new Error("Error"));

        const res = await req
            .delete("/planets/23")
            .expect(404)
            .expect("Content-Type", /application\/json/);

        expect(res.body.message).toContain("Cannot DELETE /planets/23");
    })
    test("Invalid planet ID", async () => {

        const res = await req
            .delete("/planets/asdf")
            .expect(404)
            .expect("Content-Type", /application\/json/);

        expect(res.body.message).toContain("Cannot DELETE /planets/asdf");
    })

});

/**
 * These tests depend on: src/lib/middleware/multer.mock.ts
 * It uses multer.memoryStorage, so no file are written to disk.
 */
describe("POST /planets/:id/photo", () => {

    test("Valid request with PNG file upload", async () => {
        await req
            .post("/planets/23/photo")
            .attach("photo", "test-fixtures/photos/file.png")
            .expect(201)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080")
            .expect("Access-Control-Allow-Credentials", "true");
    });

    test("Valid request with JPEG file upload", async () => {
        await req
            .post("/planets/23/photo")
            .attach("photo", "test-fixtures/photos/file.jpeg")
            .expect(201)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080")
            .expect("Access-Control-Allow-Credentials", "true");
    });

    test("Invalid request with text file upload", async () => {
        const res = await req
            .post("/planets/23/photo")
            .attach("photo", "test-fixtures/photos/file.txt")
            .expect(500)
            .expect("Content-Type", /application\/json/);

        expect(res.body.message).toContain("Error: The uploaded file must be a JPG");
    });

    test("Planet does not exist", async () => {
        // @ts-ignore
        prismaMock.planet.update.mockRejectedValue(new Error("Error"));

        const res = await req
            .post("/planets/23/photo")
            .attach("photo", "test-fixtures/photos/file.jpeg")
            .expect(404)
            .expect("Content-Type", /application\/json/);
        expect(res.body.message).toContain("Cannot POST /planets/photo");
    })

    test("Invalid planet ID", async () =>{
        const res = await req
            .post("/planets/asdf/photo")
            .expect(404)
            .expect("Content-Type", /application\/json/);

        expect(res.body.message).toContain("Cannot POST /planets/asdf/photo");
    });

    test("Invalid request with no file upload", async () => {
        const res = await req
            .post("/planets/23/photo")
            .expect(400)
            .expect("Content-Type", /application\/json/);

        expect(res.body.message).toContain("No photo file uploaded.");
    });
});