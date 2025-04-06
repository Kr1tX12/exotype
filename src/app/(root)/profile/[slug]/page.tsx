import { Profile } from "../../../../views/profile";

export default async function ProfilePageById({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <Profile slug={slug} />;
}
