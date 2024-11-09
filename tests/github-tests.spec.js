// @ts-check
import { test } from "@playwright/test";
import { writeToCSV, fetchPRs } from "../utilities/utils";
import data from "../data/config-data.json";

test("TC04 : Extract open PR details and write to CSV", async () => {
  // Fetch the GitHub-related details from config data.
  const owner = data.repo_owner;
  const repo = data.repo;
  const state = data.state;
  const authToken = data.github_token;

  // Define the headers and name for the CSV file.
  let headers = "Title,Author,Created At\n";
  let fileName = "open_pull_requests.csv";

  // Fetch the open pull request data and write it to CSV file.
  const prData = await fetchPRs(owner, repo, state, authToken);
  writeToCSV(prData, headers, fileName);
});
