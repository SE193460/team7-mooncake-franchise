const BASE_URL = "https://franchisemooncake.onrender.com/api";

export async function getFranchiseDashboard(token: string) {
  const res = await fetch(`${BASE_URL}/franchiseStaff_dashboard`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard");
  }

  return res.json();
}