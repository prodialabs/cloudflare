import { createProdia } from "prodia/v2";

export interface Env {
  PRODIA_TOKEN?: string;
};

export default {
  async fetch(request, env) {
    if(env.PRODIA_TOKEN === undefined) {
      throw new Error("`PRODIA_TOKEN` is not set");
    }

    const prodia = createProdia({
      token: env.PRODIA_TOKEN,
    });

    const job = await prodia.job({
      type: "inference.flux.schnell.txt2img.v1",
      config: {
        prompt: "mountain landscape",
        width: 512,
        height: 512,
        steps: 2
      }
    }, {
      accept: "image/jpeg"
    });

    return new Response(await job.uint8Array(), {
      headers: {
        "content-type": "image/jpeg",
      },
    });
  },
} satisfies ExportedHandler<Env>;
