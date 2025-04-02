import { Profile } from "../subcomponents/statistics-tab/profile";

export default async function ProfilePageById({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <Profile slug={slug} />;
}
