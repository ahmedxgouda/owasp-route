export default function DateComponent({ dateString }: { dateString: string }) {
  const date = new Date(dateString);
  return (
    <time dateTime={dateString}>
      {date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
    </time>
  );
}
