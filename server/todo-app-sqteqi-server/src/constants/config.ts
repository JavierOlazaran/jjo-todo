export const configs = {
    auth: {
        // This should be set by environment in the deploy pipeline. 
        jwtSecret: 'someVerySecureSecretKey',
        jwtExpirationTime: '600s',
    }
}