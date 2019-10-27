const passport = require('passport');
const { configurePassport } = require('./jwt');
const session = require('./service');
const { defineAbilityFor } = require('./abilities');

module.exports = {
  configure(app) {
    app.post('/session', session.create);

    const secret = '!_^secret.casl.authorization?!';

    app.set('jwt.secret', secret);
    app.set('jwt.issuer', 'CASL.Express');
    app.set('jwt.audience', 'casl.io');
    configurePassport(passport, app);
    app.use(passport.initialize());
    app.use(passport.authenticate('jwt', { session: false, failWithError: true }));
    app.use((req, _, next) => {
      req.ability = defineAbilityFor(req.user);
      next();
    });
  }
};
