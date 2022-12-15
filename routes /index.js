const userRoute = require('./user/user');

const allRoutes = [userRoute];

const initializeRoute = (app) =>{
    allRoutes.forEach((routes) => {
        app.use(`api/v1/${router.name}`, router.routes);
    });
        return app;
};
module.exports  = {initializeRoute};