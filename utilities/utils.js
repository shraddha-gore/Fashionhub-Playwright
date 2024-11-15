import { Octokit } from "octokit";
import fs from "fs";
import path from "path";
import configData from "../data/config-data.json";

/**
 * Fetches pull requests from a GitHub repository.
 * Arguments - owner, repo, state, authToken
 * Returns array of objects containing PR title, author, and creation date.
 */
export async function fetchPRs(owner, repo, state, authToken) {
  // Initialize the Octokit client with authentication token.
  const octokit = new Octokit({
    auth: authToken,
  });

  // Initialize required variables.
  let allPRs = [];
  let page = 1;
  let hasMorePages = true;

  try {
    // Loop through paginated responses to fetch all PRs.
    while (hasMorePages) {
      const response = await octokit.request(
        "GET /repos/{owner}/{repo}/pulls",
        {
          owner: owner,
          repo: repo,
          state: state,
          per_page: configData.per_page,
          page: page,
          headers: {
            "X-GitHub-Api-Version": configData.github_api_version,
          },
        }
      );

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
  } catch (error) {
    throw new Error(`An unexpected error occurred: ${error.message}`);
  }

  return allPRs;
}

/**
 * Writes the provided data to a CSV file.
 * The CSV file is generated in output-dir directory.
 * Arguments - data, headers, fileName
 */
export function writeToCSV(data, headers, fileName) {
  try {
    // Resolve the path to the output-dir directory.
    const dirPath = path.resolve(__dirname, `../${configData["output-dir"]}`);
    const filePath = path.join(dirPath, fileName);

    // Check if the directory exists and create it if it doesn't.
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Delete the file if it exists.
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
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
  } catch (error) {
    throw new Error(`An unexpected error occurred: ${error.message}`);
  }
}
