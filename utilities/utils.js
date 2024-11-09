import { Octokit } from "octokit";
import fs from "fs";
import path from "path";
import data from "../data/config-data.json";

/**
 * Fetches pull requests from a GitHub repository.
 * Arguments - owner, repo, state, authToken
 * Returns array of objects containing PR title, author, and creation date.
 */
export async function fetchPRs(owner, repo, state = "open", authToken) {
  // Initialize the Octokit client with authentication token.
  const octokit = new Octokit({
    auth: authToken,
  });

  let allPRs = [];
  let page = 1;
  let hasMorePages = true;

  // Loop through paginated responses to fetch all PRs.
  while (hasMorePages) {
    const response = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
      owner: owner,
      repo: repo,
      state: state,
      per_page: data.per_page,
      page: page,
      headers: {
        "X-GitHub-Api-Version": data.github_api_version,
      },
    });

    // Map the response data to extract relevant PR info.
    const respData = response.data.map((pr) => ({
      title: pr.title,
      author: pr.user.login,
      createdAt: pr.created_at,
    }));

    // If page is empty, break. Else, increment page for next iteration.
    if (respData.length > 0) {
      allPRs = allPRs.concat(respData);
      page++;
    } else {
      hasMorePages = false;
    }
  }

  return allPRs;
}

/**
 * Writes the provided data to a CSV file.
 * The CSV file is generated in 'output' directory.
 * Arguments - data, headers, fileName
 */
export function writeToCSV(data, headers, fileName) {
  // Resolve the path to the 'output' directory.
  const dirPath = path.resolve(__dirname, "../output");
  const filePath = path.join(dirPath, fileName);

  // Check if the directory exists and create it if it doesn't.
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Map the data array to CSV rows.
  const rows = data
    .map(
      (record) => `"${record.title}","${record.author}","${record.createdAt}"`
    )
    .join("\n");

  // Write the CSV data to the file.
  fs.writeFileSync(filePath, headers + rows, {
    encoding: "utf8",
  });
}
