export default async function page({ params }) {
  const topicId = (await params).topicId;
  return <div>{topicId}</div>;
}
