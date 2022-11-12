export function inProgress(msg = "") {
  return console.log(`⏳[server]: ${msg}...`);
}

export function isDone() {
  return console.log(`✔️ [server]: done!`);
}

export function haveError() {
  return console.log(`❌[server]: oops, something wrong!`);
}
