export default async function (req) {
    req.headers['x-ssl'] = 'true';
}
