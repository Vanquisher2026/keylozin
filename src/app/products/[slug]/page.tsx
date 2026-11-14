import ProductDetail from './product-detail';
import { products } from '@/lib/products';

// 静态导出：预生成全部产品页
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductDetail slug={slug} />;
}
