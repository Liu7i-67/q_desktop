import { Breadcrumb } from "antd";
import { cn } from "@/utils/tools";
import { Link, useLocation, useNavigate } from "react-router";
import { routerList } from "@/router/router-list";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";

const MyBreadcrumb = () => {
  const BreadcrumbItem = Breadcrumb.Item;
  const location = useLocation();
  const navigate = useNavigate();

  // 递归查找当前路径的面包屑路径
  const findBreadcrumb = (
    routes: any,
    path: string,
    breadcrumbs: any[] = []
  ): any => {
    for (const route of routes) {
      if (path.startsWith(route.key)) {
        const newBreadcrumbs = [...breadcrumbs, route];
        if (route.key === path) {
          return newBreadcrumbs;
        }
        if (route.children) {
          const result = findBreadcrumb(route.children, path, newBreadcrumbs);
          if (result) return result;
        }
      }
    }
    return null;
  };

  // 生成面包屑路径
  const breadcrumbItems = findBreadcrumb(routerList, location.pathname)?.map(
    (route: any, index: number) => {
      const isLast =
        index === findBreadcrumb(routerList, location.pathname).length - 1;

      let item: ItemType = {
        key: route.key,
        title: route.title,
        onClick: () => {
          if (isLast || index == 0) return;
          navigate(route.key);
        },
      };

      return item;
    }
  );

  return <Breadcrumb items={breadcrumbItems} />;
};

export default MyBreadcrumb;
