import { WebhookEvent, Video } from '@mux/mux-node';

const mux = new Video({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export default mux;
