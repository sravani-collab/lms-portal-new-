// app/coursedetail/[id]/page.tsx

import CourseDetailPage from './CourseDetailPage';

export const metadata = {
  title: 'Course Detail',
  description: 'Detailed view of the course including modules and lessons',
};

export default function Page() {
  return <CourseDetailPage />;
}
