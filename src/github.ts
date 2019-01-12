import * as KoaRouter from 'koa-router';

//import * as fs from 'fs';
//import * as path from 'path';
import * as rp from 'request-promise-native';

const router = new KoaRouter();

router.get('/api/github.json', async (ctx) => {

    let githubId = ctx.query["id"];
    if (!githubId) {
        ctx.body = { success: false, message: 'Missing Github ID ("id" parameter")'}
        return;
    }

    const slashPos = githubId.indexOf('/');
    if (slashPos > 0) {
        githubId = githubId.slice(0, slashPos);
    }

    const options = {
        headers: { 'User-Agent': 'VectorLogoZone/1.0 (https://www.vectorlogo.zone/)' },
        json: true,
        uri: `https://api.github.com/users/${githubId}`
    };

    try {
        const url = (await rp(options)).avatar_url;

        ctx.body = {
            success: true,
            data: [{url: url, description: "Github Profile Image", source: `https://github.com/${githubId}`}]
        };
    } catch (err) {
        ctx.body = { success: false, message: err.message, err };
    }
});


export { router }