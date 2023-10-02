const request = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../../index');
const Album = require('../../models/albumModel');

describe('Album API tests', () => {

    // VARIABLES
    let response, id;

    const unknownId = '14fc517ca659338c884ec670';

    const data = {
        title: "Album title",
        year: 1900,
        artist: "Artist of the album",
        photoUrl: "www.google.com",
    };

    // FUNCTIONS
    /**
     * Assertion function for testing a successful API route response.
     * 
     * @function handleWorkingRoute
     * @param {Number} status - The expected HTTP status code for the response.
     */
    const handleWorkingRoute = (status) => {

        expect(response.status).toBe(status);

        expect(response.headers['content-type']).toContain('json');

        expect(response.body).toBeInstanceOf(Object);

    };

    /**
     * Assertion function for handling a document not found API response.
     * 
     * @function handleDocumentNotFound
     * @param {String} documentId - The ID of the document that was not found.
     */
    const handleDocumentNotFound = (documentId) => {

        expect(response.status).toBe(404);

        expect(response.body.ok).toBeFalsy();

        expect(response.body.msg).toBe(`The document with ID ${documentId} was not found.`);

    };

    /**
     * Assertion function for handling an empty request body API response.
     * 
     * @function handleEmptyBody
     */
    const handleEmptyBody = () => {

        expect(response.status).toBe(400);

        expect(response.body.ok).toBeFalsy();

        expect(response.body.msg).toBe('All fields of the JSON body are mandatory.');

    };

    /**
     * Assertion function for handling a duplicate album entry API response.
     * 
     * @function handleDuplicateAlbumEntry
     */
    const handleDuplicateAlbumEntry = () => {

        expect(response.status).toBe(400);

        expect(response.body.ok).toBeFalsy();

        expect(response.body.msg).toBe('Duplicate album entry. This album already exists.');

    };

    // TESTS
    afterAll(async () => {

        mongoose.disconnect();

        server.close();

    });

    describe('GET /album', () => {

        beforeAll(async () => {

            const album = new Album(data);

            await album.save();

        });

        beforeEach(async () => {

            response = await request(app).get('/album');

        });

        afterAll(async () => {

            await Album.deleteMany();

        });

        test('The route is working', () => {

            handleWorkingRoute(200);

        });

        test('There is at least one album document stored in the database', () => {

            expect(response.body.ok).toBeTruthy();

            expect(response.body.data.length).toBeGreaterThan(0);

        });

        test('No album documents stored in the database', async () => {

            await Album.deleteMany();

            response = await request(app).get('/album');

            expect(response.status).toBe(404);

            expect(response.body.ok).toBeFalsy();

            expect(response.body.msg).toBe('There are no documents stored in the database.');

        });

    });

    describe('GET /album/:id', () => {

        beforeAll(async () => {

            const album = new Album(data);

            id = (await album.save())._id;

        });

        afterAll(async () => {

            await Album.deleteMany();

        });

        test('The route is working', async () => {

            response = await request(app).get(`/album/${id}`);

            handleWorkingRoute(200);

        });

        test('Album document not found with the provided ID', async () => {

            response = await request(app).get(`/album/${unknownId}`);

            handleDocumentNotFound(unknownId);

        })

    });

    describe('POST /album', () => {

        afterAll(async () => {

            await Album.deleteMany();

        });

        test('The route is working', async () => {

            response = await request(app).post('/album').send(data);

            handleWorkingRoute(201);

        });

        test('At least one field of the JSON body is empty', async () => {

            response = await request(app).post('/album').send({});

            handleEmptyBody();

        });

        test('The album already exists in the database', async () => {

            response = await request(app).post('/album').send(data);

            handleDuplicateAlbumEntry();

        });

    });

    describe('PUT /album/:id', () => {

        const newData = {
            title: "Album title UPDATED",
            year: 1900,
            artist: "Artist of the album",
            photoUrl: "www.google.com",
        };

        beforeAll(async () => {

            const album = new Album(data);

            id = (await album.save())._id;

        });

        afterAll(async () => {

            await Album.deleteMany();

        });

        test('The route is working', async () => {

            response = await request(app).put(`/album/${id}`).send(newData);

            handleWorkingRoute(200);

        });

        test('At least one field of the JSON body is empty', async () => {

            response = await request(app).put(`/album/${id}`).send({});

            handleEmptyBody();

        });

        test('Album document not found with the provided ID', async () => {

            response = await request(app).put(`/album/${unknownId}`).send(data);

            handleDocumentNotFound(unknownId);

        });

        //TODO: test('Document with no modifications' …)

        test('The album already exists in the database', async () => {

            const album = new Album(data);

            await album.save();

            response = await request(app).put(`/album/${id}`).send(data);

            handleDuplicateAlbumEntry();

        });

    });

    describe('DELETE /album/:id', () => {

        beforeEach(async () => {

            const album = new Album(data);

            id = (await album.save())._id;

            response = await request(app).delete(`/album/${id}`);

        });

        test('The route is working', () => {

            handleWorkingRoute(200);

        });

        test('Album document is successfully deleted', () => {

            expect(response.body.ok).toBeTruthy();

            expect(response.body.msg).toBe(`The document with ID ${id} has been successfully deleted.`);

        });

        test('Album document not found with the provided ID', async () => {

            await Album.deleteMany();

            response = await request(app).delete(`/album/${id}`);

            handleDocumentNotFound(id);

        });

    });

    describe('PUT /album/update-score/:id', () => {

        const score = { score: 1 };

        beforeAll(async () => {

            const album = new Album(data);

            id = (await album.save())._id;

        });

        afterAll(async () => {

            await Album.deleteMany();

        });

        test('The route is working', async () => {

            response = await request(app).put(`/album/update-score/${id}`).send(score);

            handleWorkingRoute(200);

        });

        test('Album document not found with the provided ID', async () => {

            response = await request(app).put(`/album/update-score/${unknownId}`).send(score);

            handleDocumentNotFound(unknownId);

        });

        test('The JSON body is empty', async () => {

            response = await request(app).put(`/album/update-score/${id}`).send({});

            expect(response.status).toBe(400);

            expect(response.body.ok).toBeFalsy();

            expect(response.body.msg).toBe('The "score" field in the JSON body is required.');

        });

        test('The "score" array property must contain three elements.', async () => {

            response = await request(app).put(`/album/update-score/${id}`).send(score);

            expect(response.body.data.score.length).toBe(3);

        });

    });

});