import React from "react";
import { Head, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";

interface MenuItem {
  id: number;
  name: string;
  description?: string;
  size?: string;
  price: number;
  image?: string;
}

interface MenuCategory {
  id: number;
  name: string;
  description?: string;
  image?: string;
  menu_items: MenuItem[];
}

interface Props extends PageProps {
  categories: MenuCategory[];
}

export default function MenuPage() {
  const { categories } = usePage<Props>().props;
  console.log("categories from Inertia:", categories);

  const menuCategories = categories ?? [];

  return (
    <AuthenticatedLayout>
      <div
        className="bg-white text-gray-900 min-h-screen font-sans"
        style={{
          backgroundImage: "url('storage/menu/cafe-bg1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Head title="Menu" />

        <div className="text-center py-10">
          <h1 className="text-5xl font-bold">CAFE</h1>
          <p className="text-orange-500 text-2xl mt-2">Restaurant Menu</p>
          <p className="mt-1 text-sm text-gray-600">
            ESTD 2008 | 100% Roasted Bean | Healthy Homemade Bread
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 space-y-16">
          {menuCategories.map((category) => {
            // 1️⃣ Find all unique sizes for this category
            const allSizes = Array.from(
              new Set(
                category.menu_items.map((item: any) => item.size).filter(Boolean)
              )
            ) as string[];

            // 2️⃣ Group menu items by name
            const itemsByName = Array.from(
              category.menu_items.reduce((map: any, item: any) => {
                if (!map.has(item.name)) map.set(item.name, []);
                map.get(item.name)!.push(item);
                return map;
              }, new Map<string, MenuItem[]>())
            );

            return (
              <div className="bg-slate-50 p-10" key={category.id} id={`category-${category.id}`}>
                {/* Category Header with sizes */}
                <h2 className="text-3xl font-bold border-b border-orange-500 pb-2 mb-6 flex justify-between items-center">
                  <span>{category.name}</span>
                  {allSizes.length > 0 && (
                    <div className="flex space-x-4 text-orange-500 font-bold text-lg">
                      {allSizes.map((size) => (
                        <span key={size}>{size}</span>
                      ))}
                    </div>
                  )}
                </h2>

                {/* Menu items */}
                <div className="space-y-4">
                  {itemsByName.map((name: any, items: any) => (
                    <div
                      key={name}
                      className="flex justify-between items-center border-b border-gray-300 py-2"
                    >
                      <div>
                        <p className="font-semibold">{name}</p>
                        {items[0].description && (
                          <p className="text-gray-500 text-sm">
                            {items[0].description}
                          </p>
                        )}
                      </div>
                      <div className="flex space-x-4 text-orange-500 font-bold">
                        {allSizes.map((size) => {
                          const found = items.find((i: any) => i.size === size);
                          return (
                            <span key={size}>
                              {found ? `${found.price}$` : "-"}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
