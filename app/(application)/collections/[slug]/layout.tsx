import { CategoryFiltersView } from './components/category-filters-view';

export default function CollectionPageLayout({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return <CategoryFiltersView slug={slug}>{children}</CategoryFiltersView>;
}
