import { Breadcrumbs, Link } from "@mui/material";

export default function BreadCrumb({
  path,
  defaultLabel,
}: {
  path: string;
  defaultLabel?: string;
}) {
  const breadcrumb = path
    .split("/")
    .map((item) => {
      if (item.length) {
        return {
          label: item.toUpperCase(),
          route: item,
          active: true,
        };
      }
    })
    .filter(Boolean);
  if (!breadcrumb.length)
    return (
      <Link underline="hover" color="inherit" href="/">
        DASHBOARD
      </Link>
    );

  return (
    <Breadcrumbs>
      {breadcrumb.map((item) => (
        <Link
          key={item?.route}
          underline="hover"
          color="inherit"
          href={item?.route}
        >
          {item?.label}
        </Link>
      ))}
    </Breadcrumbs>
  );
}
