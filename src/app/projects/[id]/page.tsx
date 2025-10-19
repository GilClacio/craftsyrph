export function generateStaticParams() {
  // Example: statically generate pages for project IDs 1, 2, 3
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ];
}
import ProjectDetailClient from './ProjectDetailClient';

export default function Page({ params }: { params: { id: string } }) {
  return <ProjectDetailClient params={params} />;
}
