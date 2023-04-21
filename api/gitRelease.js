const fetch = require("node-fetch");
const { Configuration, OpenAIApi } = require("openai");

let configuration = new Configuration({});

exports.handler = async (event, context) => {
  const { commitId, GITHUB_REPOSITORY, GITHUB_TOKEN, API_KEY } = JSON.parse(
    event.body
  );

  const lastRelease = await fetch(`https://api.github.com/repos/${GITHUB_REPOSITORY}/releases`)
  const lastReleaseJson = await lastRelease.json()
  const lastReleaseTag = lastReleaseJson[1].tag_name

  async function getCommentsSinceLastRelease(
    owner,
    repo,
    lastReleaseTag,
    token
  ) {
    // Get the SHA of the commit that corresponds to the last release tag
    const releaseResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/releases/tags/${lastReleaseTag}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const release = await releaseResponse.json();
    const lastReleaseSha = release.target_commitish;

    // Get all the comments on the repository since the last release
    const commentsResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/comments?since=${lastReleaseSha}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const comments = await commentsResponse.json();

    return comments;
  }

  const commentArray = await getCommentsSinceLastRelease(GITHUB_REPOSITORY.split('/')[0], GITHUB_REPOSITORY.split('/')[1], lastReleaseJson, GITHUB_TOKEN);
  /* const prompt =
    "Write a release announcement for version 1.3.0 of the nemail-client application, highlighting its new features and improvements.";

  configuration = new Configuration({
    apiKey: API_KEY,
  });

  openai = new OpenAIApi(configuration);
  response = await openai.createCompletion({
    model: "text-davinci-001",
    prompt: prompt,
    temperature: 0.5,
    max_tokens: 512,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.5,
  });

  const comment = `**Automated Commit Review** ${await response.data.choices[0].text.split(
    ":"
  )[0]} \n **Quality Score**: ${await response.data.choices[0].text.split(
    ":"
  )[1]}`;

  const url = `https://api.github.com/repos/${GITHUB_REPOSITORY}/commits/${commitId}/comments`;

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
      Accept: "application/vnd.github.v3+json",
    },
    body: JSON.stringify({
      body: `${comment}`,
    }),
  };

  const githubResponse = await fetch(url, options);
  if (!githubResponse.ok) {
    const text = await githubResponse.text();
    throw new Error(
      `Failed to generate comment: ${githubResponse.status} ${text} \n ${comment}`
    );
  } */

  return {
    statusCode: 200,
    body: `${commentArray}`,
  };
};
