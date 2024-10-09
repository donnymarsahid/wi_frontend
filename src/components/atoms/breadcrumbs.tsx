import Link from "next/link";

type Breadcrumb = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  breadcrumbs: Breadcrumb[];
  colorCustom?: boolean;
};

export const Breadcrumbs = ({ breadcrumbs, colorCustom }: BreadcrumbsProps) => {
  return (
    <div
      className={`lg-6 flex h-16  items-center text-blue-400 ${
        !colorCustom ? "bg-gray-100" : ""
      }`}
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={index} className="ps-2 text-xs md:text-xs lg:ps-4">
          {index > 0 && (
            <span className={`mx-2 ${colorCustom ? "text-white" : ""}`}>/</span>
          )}
          {breadcrumb.href ? (
            <Link
              href={breadcrumb.href}
              className={`text-blue-400 hover:underline ${
                colorCustom ? "text-white" : ""
              }`}
            >
              {breadcrumb.label}
            </Link>
          ) : (
            <span className={colorCustom ? "text-white" : "text-gray-600"}>
              {breadcrumb.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
