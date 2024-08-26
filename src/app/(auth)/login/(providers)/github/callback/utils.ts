export async function getPrimaryEmailData(
  accessToken: string,
): Promise<GitHubEmailResponse> {
  const githubUserEmailResponse = await fetch(
    "https://api.github.com/user/emails",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const githubUserEmails: GitHubEmailResponse[] =
    await githubUserEmailResponse.json();

  const primaryEmailData = githubUserEmails?.find((email) => email.primary);

  return primaryEmailData!;
}

export async function fetchGithubUser(
  accessToken: string,
): Promise<GitHubUserResponse> {
  const response = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return await response.json();
}

export interface GitHubUserResponse {
  id: string;
  login: string;
  avatar_url: string;
}

export interface GitHubEmailResponse {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string | null;
}
