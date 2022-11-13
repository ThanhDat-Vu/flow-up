import nProgress from "nprogress";

export default async function waitforit(cb: () => any) {
  nProgress.start();
  try {
    return await cb();
  } catch (err) {
    console.log(err);
  } finally {
    nProgress.done();
  }
}
