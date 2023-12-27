export default function topicsAdaptor(topics: Array<Topic>):
  Array<{
    value: string;
    label: string;
  }> {
  const topicsAdapted = topics.map((topic) => {
    return { value: topic.name, label: topic.name };
  });

  return topicsAdapted
}
