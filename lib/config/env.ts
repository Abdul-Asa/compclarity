export function getMainUrl() {
  if (process.env.NODE_ENV === "production" && process.env.AWS_BRANCH === "main") {
    return "https://compclarity.com";
  }

  if (process.env.NODE_ENV === "production" && process.env.AWS_BRANCH === "staging") {
    return "https://staging.d3pn1r5falbsbv.amplifyapp.com";
  }

  return "http://localhost:3000";
}
