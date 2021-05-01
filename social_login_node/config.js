let config = {
    PORT: 2004,
    secret: 'secret',
    redisUrl: 'redis://localhost',
    routes: {
        login: '/login',
        logout: '/logout',
        stock: '/stock',
        googleAuth: '/auth/google',
        googleAuthCallback: '/auth/google/callback',
        kakaoAuth: '/auth/kakao',
        kakaoAuthCallback: '/auth/kakao/callback'
    },
    HOST: 'http://localhost:2004'
};

module.exports = config;