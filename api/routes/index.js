import express from 'express';
import fs from 'fs';
import Utils from '../../utils/util';
const app = express();

fs.readdirSync(__dirname).filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
}).forEach((file) => {
    const routeName = file.split('.')[0];
    if (routeName === 'auth') {
        import(`./${routeName}`).then((route) => {
            app.use(`/${routeName}`, route.default);
        });
    }
    else {
        import(`./${routeName}`).then((route) => {
            app.use(`/${routeName}`, Utils.authorizeBySession, route.default);
        });
    }
});

export default app;