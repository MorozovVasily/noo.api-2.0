import { UnauthorizedError } from '../../core/Errors/UnauthorizedError.js';
import { InternalError } from '../../core/Errors/InternalError.js';
function hasSecret(context) {
    if (process.env.WEBHOOK_SECRET === undefined) {
        throw new InternalError('Webhook secret is not set in environment variables');
    }
    if (context.query.secret !== process.env.WEBHOOK_SECRET) {
        throw new UnauthorizedError();
    }
}
export default { hasSecret };
