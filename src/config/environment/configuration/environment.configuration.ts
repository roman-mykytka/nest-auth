import { NodeEnvironment } from '../enums/enums';

const environmentConfiguration = () => ({
  app: {
    nodeEnv: process.env.NODE_ENV || NodeEnvironment.DEVELOPMENT,
    port: parseInt(process.env.PORT, 10) || 3000,
  },
});
export { environmentConfiguration };
