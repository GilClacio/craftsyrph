import ProjectDetailClient from './ProjectDetailClient';

export default function Page({ params }: { params: { id: string } }) {
  return <ProjectDetailClient params={params} />;
}
