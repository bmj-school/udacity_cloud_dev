import { Router, Request, Response } from 'express';
import { FeedRouter } from './feed/routes/feed.router';
import { UserRouter } from './users/routes/user.router';
// LOGGING
const { loggers } = require('winston')
const logger = loggers.get('my-logger')
logger.info('Logging something in file1.js')

const router: Router = Router();

router.use('/feed', FeedRouter);
logger.info('\tRoute added: /api/v0/feed');
router.use('/users', UserRouter);
logger.info('\tRoute added: /api/v0/users');

router.get('/', async (req: Request, res: Response) => {    
    res.send(`V0`);
});

export const IndexRouter: Router = router;