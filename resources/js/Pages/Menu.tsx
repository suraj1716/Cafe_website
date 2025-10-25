import React from "react";
import { Head, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";

// Define menu item type
interface MenuItem {
    id: number;
    name: string;
    description?: string;
    size?: string;
    price: number;
    image?: string;
}

// Define category type
interface MenuCategory {
    id: number;
    name: string;
    description?: string;
    image?: string;
    menu_items: MenuItem[];
}

// Props from Laravel Inertia
interface Props extends PageProps {
    categories: MenuCategory[];
}

export default function MenuPage() {
    const { categories } = usePage<Props>().props;
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

                {/* Header Section */}
            <div className="text-center py-10">
  <h1 className="text-4xl md:text-5xl font-bold">CAFE</h1>
  <p className="text-orange-500 text-xl md:text-2xl mt-2">Restaurant Menu</p>
  <p className="mt-1 text-xs md:text-sm text-gray-600">
    ESTD 2008 | 100% Roasted Bean | Healthy Homemade Bread
  </p>
</div>

{/* Categories */}
<div className="max-w-6xl mx-auto px-2 sm:px-4 space-y-16">
  {menuCategories.map((category) => {
    const allSizes = Array.from(
      new Set(
        category.menu_items.map((item: MenuItem) => item.size).filter(Boolean)
      )
    ) as string[];

    const itemsByName = [
      ...category.menu_items
        .reduce(
          (map: Map<string, MenuItem[]>, item: MenuItem) => {
            if (!map.has(item.name)) map.set(item.name, []);
            map.get(item.name)!.push(item);
            return map;
          },
          new Map<string, MenuItem[]>()
        )
        .entries(),
    ];

    return (
      <div
        className="bg-slate-50 p-4 sm:p-8 md:p-10"
        key={category.id}
        id={`category-${category.id}`}
      >
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-orange-500 text-left">
              <th className="py-3 px-2 sm:px-4 w-[40%] sm:w-1/2 text-base sm:text-lg font-bold text-gray-800">
                <h2 className="text-2xl sm:text-3xl font-bold pb-1 sm:pb-2">
                  {category.name}
                </h2>
              </th>
              {allSizes.map((size) => (
                <th
                  key={size}
                  className="py-3 px-2 sm:px-4 w-[60px] sm:w-[10px] text-base sm:text-lg font-bold text-orange-500 text-center"
                >
                  {size}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {itemsByName.map(([name, items], index) => (
              <tr
                key={name}
                className={`border-b border-gray-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-slate-100"
                }`}
              >
                {/* Item Name + Description */}
                <td className="py-3 px-2 sm:px-4 align-top w-[40%] sm:w-1/2">
                  <div className="font-semibold text-gray-800 text-sm sm:text-base">
                    {name}
                  </div>
                  {items[0].description && (
                    <div className="text-xs sm:text-sm text-gray-500">
                      {items[0].description}
                    </div>
                  )}
                </td>

                {/* Price Columns */}
                {allSizes.map((size) => {
                  const found = items.find((i: MenuItem) => i.size === size);
                  return (
                    <td
                      key={size}
                      className="py-3 px-2 sm:px-4 text-center font-semibold text-orange-600 text-sm sm:text-base"
                    >
                      {found ? `${found.price}$` : "-"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  })}
</div>

            </div>
        </AuthenticatedLayout>
    );
}
