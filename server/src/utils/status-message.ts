export function inProgress(msg = "") {
  console.log(`⏳[server]: ${msg}...`);
}

export function isDone() {
  console.log(`✔️ [server]: done!`);
}

export function haveError() {
  console.log(`❌[server]: oops, something wrong!`);
}
