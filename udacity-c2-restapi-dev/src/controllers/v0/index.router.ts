import { Router, Request, Response } from 'express';
import { FeedRouter } from './feed/routes/feed.router';
import { UserRouter } from './users/routes/user.router';

// LOGGING
const logger = require('./../../loggerConfig').logger;

const router: Router = Router();

router.use('/feed', FeedRouter);

router.use('/users', UserRouter);

router.get('/', async (req: Request, res: Response) => {    
    res.send(`V0`);
    logger.info("Test logging!");
});

export const IndexRouter: Router = router;