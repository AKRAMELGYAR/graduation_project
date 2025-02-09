import express from 'express';
import passport from 'passport';
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', (req, res, next) => {
        passport.authenticate('google', (err, data) => {
            if (err) {
                console.log(err);
                return res.redirect('/login');
            }
            const { user, token } = data;
            res.json({ user, token });
        })(req, res, next);
    });

router.get('/login', (req, res) => {
    res.send('Welcome to the login page');
});

router.get('/dashboard', (req, res) => {
    res.send('Welcome to the dashboard');
});

export default router;