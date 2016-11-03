interface AuthConfiguration {
    clientID: string,
    domain: string,
    callbackURL: string
}

export const myConfig: AuthConfiguration = {
    clientID: '4icYtFzup1JCMR5LslLYEBsiXy3O3AKQ',
    domain: 'sereno.eu.auth0.com',
    // You may need to change this!
    callbackURL: 'http://localhost:8100/'
};