import React from "react";
import { json, useActionData, useFetcher } from "react-router-dom";
import { octokit } from "../octokit";

export async function action({ request }) {
  const form = await request.formData();
  const input = form.get("input");

  try {
    const response = await octokit.request(
      "POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches",
      {
        owner: "christophersesugh",
        repo: "react-test-app",
        workflow_id: "main-workflow",
        ref: "main",
        inputs: {
          framework: input,
        },
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    console.log(response);
    return json({ response });
  } catch (error) {
    console.log(error);
    return json({ error });
  }
}

export default function Index() {
  const data = useActionData();
  const fetcher = useFetcher();
  console.log(data?.error);
  return (
    <main className="flex flex-col mx-auto max-w-2xl h-screen place-content-center bg-slate-100">
      <h1 className="text-2xl text-blue-500 text-center">GitHub Actions</h1>
      <div className="max-w-xl w-full mx-auto">
        <fetcher.Form
          action="/?index"
          method="POST"
          className="w-full mt-12 flex flex-col gap-4"
        >
          <h2 className="text-lg">FORM</h2>
          <input
            type="text"
            name="input"
            id="input"
            className="p-2 rounded-md bg-white w-full"
            placeholder="param"
          />
          <button
            type="submit"
            className="bg-purple-500 rounded-md p-2 text-white w-full"
          >
            submit
          </button>
        </fetcher.Form>
      </div>
    </main>
  );
}
